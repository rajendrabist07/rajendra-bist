/**
 * app/docs/features/system.docs.ts
 *
 * Feature documentation module for Syndication Feeds (RSS 2.0) and API Meta documentation.
 * Bound to the runtime behavior of `app/rss.xml/route.ts` and `app/api/v1/docs/route.ts`.
 */

import { OpenAPISchema } from '../helpers';

export const systemSchemas: Record<string, OpenAPISchema> = {
  DocumentationMeta: {
    type: 'object',
    required: ['openapi', 'info', 'paths'],
    description: 'OpenAPI 3.1 root documentation specification object',
    properties: {
      openapi: {
        type: 'string',
        example: '3.1.0',
      },
      info: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Rajendra Bist API' },
          version: { type: 'string', example: '1.0.0' },
        },
      },
    },
  },
};

export const systemPaths = {
  '/rss.xml': {
    get: {
      tags: ['Syndication & Feeds'],
      summary: 'Main portfolio and engineering RSS 2.0 XML feed',
      description:
        'Generates a dynamically aggregated RSS 2.0 XML document containing all published architectural case studies, technical articles, and system release announcements.',
      operationId: 'getMainRssFeed',
      security: [],
      responses: {
        200: {
          description: 'Valid RSS 2.0 XML document stream',
          headers: {
            'Content-Type': {
              description: 'XML MIME type with standard character set',
              schema: { type: 'string', example: 'application/xml; charset=utf-8' },
            },
            'Cache-Control': {
              description: 'Cache control directives for web feed readers and aggregators',
              schema: { type: 'string', example: 's-maxage=3600, stale-while-revalidate' },
            },
          },
          content: {
            'application/xml': {
              schema: {
                type: 'string',
                description: 'XML encoded RSS 2.0 channel with items and enclosure links',
                example: '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0">...</rss>',
              },
            },
          },
        },
      },
    },
  },

  '/api/v1/docs.json': {
    get: {
      tags: ['API Platform & Documentation'],
      summary: 'Raw OpenAPI 3.1.0 JSON specification',
      description:
        'Returns the complete, modular OpenAPI 3.1.0 specification as an unopinionated JSON document. Compatible with Swagger UI, Postman collections, Orval/openapi-typescript code generators, and automated linting suites.',
      operationId: 'getOpenApiSpecification',
      security: [],
      responses: {
        200: {
          description: 'OpenAPI 3.1.0 specification object',
          headers: {
            'Content-Type': {
              description: 'Standard JSON content type',
              schema: { type: 'string', example: 'application/json; charset=utf-8' },
            },
            'Access-Control-Allow-Origin': {
              description: 'Allows cross-origin access for external developer portals and tooling',
              schema: { type: 'string', example: '*' },
            },
          },
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DocumentationMeta',
              },
            },
          },
        },
      },
    },
  },

  '/api/v1/docs': {
    get: {
      tags: ['API Platform & Documentation'],
      summary: 'Interactive Swagger UI explorer portal',
      description:
        'Renders the interactive Swagger UI standalone web portal pre-configured to visualize and test endpoints against `/api/v1/docs.json`. Supports dark/light mode, live execution, and request tracing.',
      operationId: 'getSwaggerUiPortal',
      security: [],
      responses: {
        200: {
          description: 'Interactive HTML document initializing Swagger UI 5.x',
          headers: {
            'Content-Type': {
              description: 'HTML document MIME type',
              schema: { type: 'string', example: 'text/html; charset=utf-8' },
            },
          },
          content: {
            'text/html': {
              schema: {
                type: 'string',
                description: 'Full HTML markup bootstrapping Swagger UI bundle',
              },
            },
          },
        },
      },
    },
  },
};
