/**
 * app/docs/features/health.docs.ts
 *
 * Feature documentation module for system health, uptime, and infrastructure readiness probes.
 * Bound to the runtime behavior of `app/api/health/route.ts`.
 */

import { OpenAPISchema } from '../helpers';

export const healthSchemas: Record<string, OpenAPISchema> = {
  HealthResponse: {
    type: 'object',
    required: ['ok'],
    description: 'System health probe confirmation payload',
    properties: {
      ok: {
        type: 'boolean',
        description: 'True when all underlying Edge runtime routines and network interfaces are operational',
        example: true,
      },
    },
  },
};

export const healthPaths = {
  '/api/health': {
    get: {
      tags: ['System & Health'],
      summary: 'System health check probe',
      description:
        'Zero-dependency infrastructure probe returning `{ ok: true }` with strict cache-invalidation headers. Used by Vercel Edge health monitors, external uptime pingers, and continuous deployment smoke verification suites to assert container and runtime liveness.',
      operationId: 'getHealthStatus',
      security: [],
      responses: {
        200: {
          description: 'Application server and Edge runtime are healthy and accepting inbound requests',
          headers: {
            'Cache-Control': {
              description: 'Strict cache-invalidation directives preventing edge proxies from caching probe status',
              schema: {
                type: 'string',
                example: 'no-cache, no-store, must-revalidate',
              },
            },
          },
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/HealthResponse',
              },
              examples: {
                Healthy: {
                  summary: 'Standard healthy system output',
                  value: {
                    ok: true,
                  },
                },
              },
            },
          },
        },
        503: {
          description: 'Edge runtime is degraded or incapable of dispatching responses',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              examples: {
                ServiceUnavailable: {
                  summary: 'System degraded failure',
                  value: {
                    ok: false,
                    code: 'SERVICE_UNAVAILABLE',
                    message: 'System runtime is experiencing severe degradation.',
                    contactEmail: 'rajendrabist396@gmail.com',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
