/**
 * app/docs/openapi.ts
 *
 * Root OpenAPI 3.1 Specification Aggregator.
 * Follows the Modular "Code-as-Spec" Architecture:
 * - Aggregates feature-sliced domain modules
 * - Exposes standardized global components (schemas, error envelopes, security schemes)
 * - Directly consumable by Swagger UI, Postman, and type-generation tools.
 */

import { healthPaths, healthSchemas } from './features/health.docs';
import { chatPaths, chatSchemas } from './features/chat.docs';
import { contactPaths, contactSchemas } from './features/contact.docs';
import { systemPaths, systemSchemas } from './features/system.docs';

export const openApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'Rajendra Bist — Engineering Portfolio & AI Systems API',
    version: '1.0.0',
    description: `
## ⚡ System Architecture & API Platform

Production API platform supporting the engineering portfolio of **Rajendra Bist** (Full-Stack Developer & Backend Systems Engineer, New Delhi, India). Built on **Next.js 15.5 App Router**, **Node.js 22 LTS**, and **TypeScript 5.7 strict mode**.

---

### 🏛️ Core Design Principles
1. **Modular "Code-as-Spec" Architecture:** Pure, type-safe feature modules bound directly to runtime validation schemas without noisy inline controller annotations.
2. **Defensive Validation Boundaries:** Every mutating route (\`/api/contact\`, \`/api/chat\`) enforces strict runtime input sanitization, control-character rejection, and payload size bounds (maximum 10 KB).
3. **Resilient Provider Chains:** AI endpoints execute an automated multi-model failover ladder (\`gemini-2.5-flash\` ➡️ fallback models) with strict upstream timeouts and untrusted prompt bounding.
4. **Zero-Trust Telemetry:** Background audit logging to MongoDB Atlas utilizes non-blocking promises with 2-second timeouts and native TTL indices (30–90 days).

---

### 🛡️ Error Code Taxonomy & Envelopes
All error responses adhere to the uniform \`ErrorResponse\` contract:

\`\`\`json
{
  "ok": false,
  "code": "INVALID_INPUT",
  "message": "Detailed description of the validation failure",
  "contactEmail": "rajendrabist396@gmail.com"
}
\`\`\`

| Error Code | HTTP Status | Description & Mitigation |
| :--- | :--- | :--- |
| \`INVALID_INPUT\` | **400 / 413** | Schema validation failure (Zod) or payload exceeding 10 KB limit. |
| \`FORBIDDEN_ORIGIN\` | **403** | Inbound request origin does not match authorized production or preview hostnames. |
| \`RATE_LIMITED\` | **429** | Token bucket exhausted. Check \`Retry-After\` response header for wait duration. |
| \`PROVIDER_ERROR\` | **502** | Upstream AI model execution failed across all available fallback models. |
| \`ASSISTANT_OFFLINE\` | **503** | Server-side API key configuration is missing or invalid. |
| \`SERVICE_UNAVAILABLE\` | **503** | Transient downstream communication failure with external delivery services. |
| \`PROVIDER_TIMEOUT\` | **504** | Upstream provider took longer than 15,000 ms to emit initial response chunks. |

---

### 🔐 Security & Access Control
- **Same-Origin Verification:** Browser fetch requests must originate from trusted domains (\`bistrajendra.com.np\`, \`www.bistrajendra.com.np\`, \`localhost\`). Non-browser scripts (curl, automated monitors) without origin headers are evaluated cleanly.
- **Distributed Rate Limiting:** Enforced via Upstash Redis REST with cryptographic IP hashing (\`IP_HASH_SECRET\`) and seamless in-memory fallback.
- **Content Security Policy (CSP):** All responses are emitted alongside strict CSP Report-Only headers preventing unauthorized framing and object execution.
    `,
    contact: {
      name: 'Rajendra Bist',
      email: 'rajendrabist396@gmail.com',
      url: 'https://www.bistrajendra.com.np',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },

  servers: [
    {
      url: 'https://www.bistrajendra.com.np',
      description: 'Production Canonical Origin (Vercel Edge Network)',
    },
    {
      url: 'http://localhost:3000',
      description: 'Local Development Server',
    },
  ],

  tags: [
    {
      name: 'AI Assistant',
      description: 'Streaming interactions powered by Google Gemini with multi-model failover and injection defense',
    },
    {
      name: 'Communications',
      description: 'Contact form ingestion, anti-spam honeypot filtering, and transactional email dispatch via Resend',
    },
    {
      name: 'System & Health',
      description: 'Infrastructure liveness probes, edge network status, and runtime verification diagnostics',
    },
    {
      name: 'Syndication & Feeds',
      description: 'Dynamic RSS 2.0 XML feeds covering engineering case studies and technical articles',
    },
    {
      name: 'API Platform & Documentation',
      description: 'OpenAPI 3.1.0 specifications and interactive Swagger UI developer portal',
    },
  ],

  paths: {
    ...healthPaths,
    ...chatPaths,
    ...contactPaths,
    ...systemPaths,
  },

  components: {
    securitySchemes: {
      sameOrigin: {
        type: 'apiKey',
        in: 'header',
        name: 'Origin',
        description: 'Standard HTTP Origin or Referer header evaluated against authorized domain whitelist',
      },
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Reserved for administrative instrumentation or authenticated internal API calls',
      },
    },

    schemas: {
      ErrorResponse: {
        type: 'object',
        required: ['ok', 'code', 'message', 'contactEmail'],
        description: 'Universal error envelope returned across all API failure conditions',
        properties: {
          ok: {
            type: 'boolean',
            description: 'Always false on error conditions',
            example: false,
          },
          code: {
            type: 'string',
            enum: [
              'INVALID_INPUT',
              'FORBIDDEN_ORIGIN',
              'RATE_LIMITED',
              'ASSISTANT_OFFLINE',
              'PROVIDER_TIMEOUT',
              'PROVIDER_ERROR',
              'SERVICE_UNAVAILABLE',
            ],
            description: 'Machine-readable error categorization code',
            example: 'INVALID_INPUT',
          },
          message: {
            type: 'string',
            description: 'Human-readable diagnostic description of the failure reason',
            example: 'Message length capped at 600 characters',
          },
          contactEmail: {
            type: 'string',
            format: 'email',
            description: 'Administrator fallback email for user escalation',
            example: 'rajendrabist396@gmail.com',
          },
          errors: {
            type: 'array',
            description: 'Optional granular field-level validation issue breakdown',
            items: {
              $ref: '#/components/schemas/ValidationErrorDetail',
            },
          },
        },
      },

      ValidationErrorDetail: {
        type: 'object',
        required: ['field', 'message'],
        description: 'Field-level validation constraint breach descriptor',
        properties: {
          field: {
            type: 'string',
            description: 'Target JSON property path that failed schema assertion',
            example: 'message',
          },
          message: {
            type: 'string',
            description: 'Specific validation rule message emitted by Zod',
            example: 'Message must be at least 20 characters',
          },
        },
      },

      PaginationMeta: {
        type: 'object',
        required: ['total', 'page', 'limit', 'totalPages'],
        description: 'Standard pagination metadata envelope for collection queries',
        properties: {
          total: {
            type: 'integer',
            description: 'Total number of records matching query filter',
            example: 42,
          },
          page: {
            type: 'integer',
            description: 'Current 1-indexed page number',
            example: 1,
          },
          limit: {
            type: 'integer',
            description: 'Maximum item count requested per page',
            example: 10,
          },
          totalPages: {
            type: 'integer',
            description: 'Total calculated pages available',
            example: 5,
          },
        },
      },

      ...healthSchemas,
      ...chatSchemas,
      ...contactSchemas,
      ...systemSchemas,
    },

    responses: {
      ValidationError: {
        description: 'Inbound payload failed Zod schema constraints or violated input boundary rules',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
            examples: {
              ValidationError: {
                summary: 'Zod validation error example',
                value: {
                  ok: false,
                  code: 'INVALID_INPUT',
                  message: 'Name must be at least 2 characters',
                  contactEmail: 'rajendrabist396@gmail.com',
                },
              },
            },
          },
        },
      },

      ForbiddenOrigin: {
        description: 'Cross-origin request rejected by the same-origin validation policy',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
            examples: {
              ForbiddenOrigin: {
                summary: 'Cross-origin rejection example',
                value: {
                  ok: false,
                  code: 'FORBIDDEN_ORIGIN',
                  message: 'Cross-origin requests are not allowed.',
                  contactEmail: 'rajendrabist396@gmail.com',
                },
              },
            },
          },
        },
      },

      PayloadTooLarge: {
        description: 'Request body exceeds the maximum 10 KB limit',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
            examples: {
              PayloadTooLarge: {
                summary: 'Body size cap exceeded example',
                value: {
                  ok: false,
                  code: 'INVALID_INPUT',
                  message: 'Request payload exceeds 10 KB limit.',
                  contactEmail: 'rajendrabist396@gmail.com',
                },
              },
            },
          },
        },
      },

      RateLimited: {
        description: 'Client breached allocated token-bucket query frequency',
        headers: {
          'Retry-After': {
            description: 'Seconds until the client is authorized to retry',
            schema: {
              type: 'string',
              example: '1800',
            },
          },
        },
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
            examples: {
              RateLimited: {
                summary: 'Rate limit breach example',
                value: {
                  ok: false,
                  code: 'RATE_LIMITED',
                  message: 'Rate limit exceeded. Please wait before retrying.',
                  contactEmail: 'rajendrabist396@gmail.com',
                },
              },
            },
          },
        },
      },

      ServiceUnavailable: {
        description: 'Downstream integration service is currently offline or unreachable',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
            examples: {
              ServiceUnavailable: {
                summary: 'Service offline example',
                value: {
                  ok: false,
                  code: 'SERVICE_UNAVAILABLE',
                  message: 'Message forwarding is currently unavailable. Please reach out directly.',
                  contactEmail: 'rajendrabist396@gmail.com',
                },
              },
            },
          },
        },
      },

      GatewayTimeout: {
        description: 'Upstream AI or external provider timed out',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
            examples: {
              GatewayTimeout: {
                summary: 'Provider timeout example',
                value: {
                  ok: false,
                  code: 'PROVIDER_TIMEOUT',
                  message: 'The AI service timed out while generating a response. Please try again.',
                  contactEmail: 'rajendrabist396@gmail.com',
                },
              },
            },
          },
        },
      },
    },
  },
};
