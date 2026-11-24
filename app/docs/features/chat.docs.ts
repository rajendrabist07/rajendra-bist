/**
 * app/docs/features/chat.docs.ts
 *
 * Feature documentation module for the AI Engineering Assistant API.
 * Bound to the runtime behavior of `app/api/chat/route.ts` and `lib/api-schemas.ts`.
 */

import { body, errorResponse, textStreamResponse, OpenAPISchema } from '../helpers';

export const chatSchemas: Record<string, OpenAPISchema> = {
  ChatMessageItem: {
    type: 'object',
    required: ['role', 'content'],
    description: 'Historical conversational turn between user and assistant',
    properties: {
      role: {
        type: 'string',
        enum: ['user', 'assistant'],
        description: 'Speaker participant identity role',
        example: 'user',
      },
      content: {
        type: 'string',
        minLength: 1,
        maxLength: 2000,
        description: 'Verbatim content string of the conversational turn',
        example: 'What architecture is Sovereign built on?',
      },
    },
  },

  ChatRequest: {
    type: 'object',
    required: ['message'],
    description: 'Inbound chat query payload with optional conversational context',
    properties: {
      message: {
        type: 'string',
        minLength: 1,
        maxLength: 600,
        pattern: '^[^\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]+$',
        description:
          'Primary user question regarding Rajendra Bist, technical architecture, or projects. Preprocessed to accept legacy aliases `question` or `prompt`.',
        example: 'What projects has Rajendra built?',
      },
      question: {
        type: 'string',
        maxLength: 600,
        description: 'Alternative alias for message, automatically mapped and trimmed at runtime.',
        example: 'What projects has Rajendra built?',
      },
      prompt: {
        type: 'string',
        maxLength: 600,
        description: 'Alternative alias for message, automatically mapped and trimmed at runtime.',
        example: 'What projects has Rajendra built?',
      },
      history: {
        type: 'array',
        maxItems: 6,
        items: {
          $ref: '#/components/schemas/ChatMessageItem',
        },
        description: 'Prior conversational turns (capped at the last 6 turns to preserve context budget). Empty placeholders are filtered automatically.',
        example: [
          {
            role: 'user',
            content: 'Hello, are you Rajendra Bist’s portfolio assistant?',
          },
          {
            role: 'assistant',
            content: 'Yes, I am. I can answer inquiries regarding Rajendra’s engineering projects, systems design, and full-stack technical background.',
          },
        ],
      },
      sessionId: {
        type: 'string',
        minLength: 1,
        maxLength: 120,
        description: 'Client session identifier used to aggregate multi-turn conversations in audit logs.',
        example: 'sess_f83a71b2-45e9-4e58-9a3c-b12e75f92c10',
      },
    },
  },
};

export const chatPaths = {
  '/api/chat': {
    post: {
      tags: ['AI Assistant'],
      summary: 'Stream portfolio assistant interaction via Google Gemini',
      description:
        'Dispatches visitor inquiries to an automated Google Gemini failover chain (`gemini-2.5-flash` ➡️ `gemini-flash-latest` ➡️ `gemini-2.0-flash` ➡️ `gemini-1.5-flash`) grounded strictly in verified portfolio facts.\n\n' +
        '**Key Engineering Capabilities:**\n' +
        '- **Streaming Token Generation:** Streams raw text chunks over `text/plain; charset=utf-8` using `Transfer-Encoding: chunked`.\n' +
        '- **Prompt Injection Defenses:** Wraps dynamic user prompts inside strict `<untrusted>` XML delimiter envelopes with explicit model grounding rules.\n' +
        '- **Multi-Model Failover:** Automatically switches to secondary models on 404/502 provider errors.\n' +
        '- **Telemetry Persistence:** Asynchronously logs completed conversational turns to MongoDB Atlas with a 30-day TTL index without blocking stream completion.\n' +
        '- **Rate Limiting:** Enforces a token-bucket rate limit of 30 queries per hour per cryptographic IP hash.',
      operationId: 'streamChatResponse',
      security: [],
      parameters: [
        {
          name: 'X-Session-Id',
          in: 'header',
          required: false,
          description: 'Client-provided conversational session identifier',
          schema: {
            type: 'string',
            example: 'sess_f83a71b2-45e9-4e58-9a3c-b12e75f92c10',
          },
        },
      ],
      requestBody: body(
        { $ref: '#/components/schemas/ChatRequest' },
        {
          message: 'What projects has Rajendra built?',
          history: [],
          sessionId: 'sess_f83a71b2-45e9-4e58-9a3c-b12e75f92c10',
        },
        'Inbound chat prompt and conversational context'
      ),
      responses: {
        200: textStreamResponse(
          'Active readable stream delivering UTF-8 encoded text chunks directly from the Gemini model',
          'Rajendra has engineered three featured projects:\n\n* **Sovereign**: A multi-tenant B2B SaaS platform...',
          {
            'X-Session-Id': {
              description: 'Active session identifier assigned or persisted across conversational turns',
              schema: { type: 'string', example: 'sess_f83a71b2-45e9-4e58-9a3c-b12e75f92c10' },
            },
            'X-Request-Id': {
              description: 'Unique UUID assigned to this invocation for distributed tracing and diagnostic telemetry',
              schema: { type: 'string', format: 'uuid', example: 'd3b07384-d113-4638-9cb5-9922e92c6e41' },
            },
            'X-Model-Used': {
              description: 'Exact Gemini model variant that successfully served the stream after failover resolution',
              schema: { type: 'string', example: 'gemini-2.5-flash' },
            },
          }
        ),
        400: errorResponse(
          'Input validation error (e.g., empty message, string exceeding 600 characters, control character breach)',
          'INVALID_INPUT',
          'Message length capped at 600 characters'
        ),
        403: errorResponse(
          'Same-origin validation policy rejection for cross-origin browser requests',
          'FORBIDDEN_ORIGIN',
          'Forbidden: request origin is not permitted.'
        ),
        413: errorResponse(
          'Inbound payload exceeds the maximum 10 KB (10,240 bytes) network limit',
          'INVALID_INPUT',
          'Payload exceeds 10 KB limit.'
        ),
        429: errorResponse(
          'Rate limit breached (maximum 30 queries per hour per IP hash)',
          'RATE_LIMITED',
          'Rate limit exceeded (30 queries / hour). Please wait before asking another question.',
          {
            'Retry-After': {
              description: 'Time in seconds remaining before the rate limit bucket refreshes',
              schema: { type: 'string', example: '1800' },
            },
          }
        ),
        502: errorResponse(
          'Upstream generative AI provider error (all fallback models in the chain were exhausted)',
          'PROVIDER_ERROR',
          'AI provider service error. All model fallbacks failed. Please email rajendrabist396@gmail.com directly.'
        ),
        503: errorResponse(
          'AI Assistant offline due to missing or invalid GEMINI_API_KEY environment configuration',
          'ASSISTANT_OFFLINE',
          'AI Assistant is currently offline (GEMINI_API_KEY unconfigured). Please email rajendrabist396@gmail.com directly.'
        ),
        504: errorResponse(
          'Upstream Google Gemini API timed out after 15,000 ms of inactivity',
          'PROVIDER_TIMEOUT',
          'The AI service timed out while generating a response. Please try again.'
        ),
      },
    },
  },
};
