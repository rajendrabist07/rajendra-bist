/**
 * app/docs/features/contact.docs.ts
 *
 * Feature documentation module for the Contact & Communication hub.
 * Bound to the runtime behavior of `app/api/contact/route.ts` and `lib/api-schemas.ts`.
 */

import { body, errorResponse, messageOnly, OpenAPISchema } from '../helpers';

export const contactSchemas: Record<string, OpenAPISchema> = {
  ContactRequest: {
    type: 'object',
    required: ['name', 'email', 'message'],
    description: 'Validated contact form submission payload',
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        maxLength: 80,
        pattern: '^[^\\x00-\\x1F\\x7F]+$',
        description: 'Sender full name or organization name (control characters strictly disallowed)',
        example: 'Sarah Chen',
      },
      email: {
        type: 'string',
        format: 'email',
        maxLength: 254,
        description: 'Sender valid RFC 5322 electronic mail address for follow-up communication',
        example: 'sarah.chen@innovate-ai.io',
      },
      message: {
        type: 'string',
        minLength: 20,
        maxLength: 2000,
        pattern: '^[^\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]+$',
        description: 'Inquiry details, architectural questions, or job proposal description (minimum 20 characters)',
        example:
          'Hi Rajendra, we reviewed your Sovereign multi-tenant SaaS architecture and would love to discuss a Senior Backend / Systems Engineer opportunity with our team.',
      },
      _hp: {
        type: 'string',
        description: 'Hidden honeypot field designed to intercept automated spam bots. Submissions with non-empty values are silently accepted without dispatching email.',
        example: '',
      },
      company_url: {
        type: 'string',
        description: 'Secondary hidden honeypot trap field. Submissions containing this field are silently marked as delivered without external forwarding.',
        example: '',
      },
      isTest: {
        type: 'boolean',
        description: 'Synthetic testing flag used by automated CI smoke suites to validate delivery pipelines without triggering live recipient mailboxes.',
        example: false,
      },
    },
  },

  ContactResponse: {
    type: 'object',
    required: ['ok', 'code', 'message'],
    description: 'Successful delivery confirmation payload',
    properties: {
      ok: {
        type: 'boolean',
        description: 'Operation success status flag',
        example: true,
      },
      code: {
        type: 'string',
        enum: ['DELIVERED'],
        description: 'Uniform confirmation code indicating successful dispatch or bot trap capture',
        example: 'DELIVERED',
      },
      message: {
        type: 'string',
        description: 'Human-readable transmission outcome statement',
        example: 'Message delivered. Rajendra will respond to your email shortly.',
      },
    },
  },
};

export const contactPaths = {
  '/api/contact': {
    post: {
      tags: ['Communications'],
      summary: 'Dispatch contact form inquiry to Rajendra Bist',
      description:
        'Validates client input, mitigates spam using dual-layer honeypot fields (`_hp`, `company_url`), dispatches a transactional HTML notification email via the Resend API with exponential retry backoff, and writes telemetry logs to MongoDB Atlas with a 90-day TTL retention index.\n\n' +
        '**Security Policies:**\n' +
        '- **Same-Origin Enforcement:** Requires origin/referer matching authorized hostnames or non-browser script signatures.\n' +
        '- **Rate Limiting:** Capped at 5 submissions per hour per cryptographic IP hash using Upstash Redis token bucket with in-memory fallback.\n' +
        '- **Payload Size:** Enforces strict 10 KB (10,240 bytes) request body limit.\n' +
        '- **Spam Mitigation:** Silent failure mode for honeypot triggers to prevent bot fingerprinting.',
      operationId: 'submitContactForm',
      security: [],
      requestBody: body(
        { $ref: '#/components/schemas/ContactRequest' },
        {
          name: 'Sarah Chen',
          email: 'sarah.chen@innovate-ai.io',
          message:
            'Hi Rajendra, we reviewed your Sovereign multi-tenant SaaS architecture and would love to discuss a Senior Backend / Systems Engineer opportunity with our team.',
          _hp: '',
          company_url: '',
          isTest: false,
        },
        'Contact form submission data complying with Zod runtime schema constraints'
      ),
      responses: {
        200: {
          description: 'Message successfully forwarded via Resend and logged to telemetry database (or silently trapped by honeypot)',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ContactResponse',
              },
              examples: {
                Delivered: {
                  summary: 'Live email transmission successful',
                  value: {
                    ok: true,
                    code: 'DELIVERED',
                    message: 'Message delivered. Rajendra will respond to your email shortly.',
                  },
                },
                HoneypotTrapped: {
                  summary: 'Automated spam bot silently absorbed',
                  value: {
                    ok: true,
                    code: 'DELIVERED',
                    message: 'Message delivered.',
                  },
                },
              },
            },
          },
        },
        400: errorResponse(
          'Input validation failure (e.g. name < 2 chars, message < 20 chars, control characters detected, or malformed JSON)',
          'INVALID_INPUT',
          'Message must be at least 20 characters.'
        ),
        403: errorResponse(
          'Cross-origin request rejected by the same-origin validation policy',
          'FORBIDDEN_ORIGIN',
          'Cross-origin requests are not allowed.'
        ),
        413: errorResponse(
          'Request payload body exceeds the hard 10 KB (10,240 bytes) safety threshold',
          'INVALID_INPUT',
          'Request payload exceeds 10 KB limit.'
        ),
        429: errorResponse(
          'Rate limit exceeded (maximum 5 submissions per hour per IP hash)',
          'RATE_LIMITED',
          'Rate limit exceeded (5 submissions / hour). Please email directly.',
          {
            'Retry-After': {
              description: 'Duration in seconds until the client is permitted to retry',
              schema: { type: 'string', example: '3600' },
            },
          }
        ),
        503: errorResponse(
          'Downstream email forwarding service (Resend) and telemetry database writes both failed',
          'SERVICE_UNAVAILABLE',
          'Message forwarding is currently unavailable. Please reach out directly to rajendrabist396@gmail.com.'
        ),
      },
    },
  },
};
