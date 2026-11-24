/**
 * app/docs/helpers.ts
 *
 * OpenAPI 3.1 Code-as-Spec Reusable DSL Helpers.
 * Provides composable, type-safe schema transformers, response envelope wrappers,
 * and error builders that strictly bind to the real portfolio runtime contracts.
 */

export interface OpenAPISchema {
  type?: string | string[];
  format?: string;
  description?: string;
  properties?: Record<string, OpenAPISchema>;
  items?: OpenAPISchema;
  required?: string[];
  enum?: (string | number | boolean)[];
  default?: unknown;
  example?: unknown;
  examples?: unknown[];
  nullable?: boolean;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  pattern?: string;
  additionalProperties?: boolean | OpenAPISchema;
  oneOf?: OpenAPISchema[];
  anyOf?: OpenAPISchema[];
  allOf?: OpenAPISchema[];
  $ref?: string;
}

export interface NamedExample<T = unknown> {
  summary?: string;
  description?: string;
  value: T;
}

export interface OpenAPIRequestBody {
  description?: string;
  required?: boolean;
  content: {
    [mediaType: string]: {
      schema: OpenAPISchema;
      examples?: Record<string, NamedExample>;
    };
  };
}

export interface OpenAPIResponse {
  description: string;
  headers?: Record<
    string,
    {
      description: string;
      schema: OpenAPISchema;
    }
  >;
  content?: {
    [mediaType: string]: {
      schema: OpenAPISchema;
      examples?: Record<string, NamedExample>;
    };
  };
}

/**
 * Creates an OpenAPI 3.1 RequestBody with modern named examples.
 */
export function body(
  schema: OpenAPISchema,
  samplePayload?: Record<string, unknown>,
  description?: string,
  exampleName = 'RealisticExample'
): OpenAPIRequestBody {
  return {
    description: description || 'HTTP request payload adhering to the runtime validation schema',
    required: true,
    content: {
      'application/json': {
        schema,
        ...(samplePayload
          ? {
              examples: {
                [exampleName]: {
                  summary: 'Production-accurate sample request body',
                  value: samplePayload,
                },
              },
            }
          : {}),
      },
    },
  };
}

/**
 * Wraps an entity or data schema in the standard application success envelope.
 */
export function envelope(
  dataSchema: OpenAPISchema,
  sampleData?: unknown,
  description = 'Successful operation returning domain data envelope',
  exampleName = 'SuccessResponse'
): OpenAPIResponse {
  const schema: OpenAPISchema = {
    type: 'object',
    required: ['ok', 'data'],
    properties: {
      ok: {
        type: 'boolean',
        description: 'Operation execution status indicator',
        example: true,
      },
      data: dataSchema,
      meta: {
        type: 'object',
        description: 'Optional execution metadata, timestamp, or pagination descriptors',
        properties: {
          timestamp: {
            type: 'string',
            format: 'date-time',
            example: '2026-11-24T10:30:00.000Z',
          },
          requestId: {
            type: 'string',
            format: 'uuid',
            example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          },
        },
      },
    },
  };

  return {
    description,
    content: {
      'application/json': {
        schema,
        ...(sampleData !== undefined
          ? {
              examples: {
                [exampleName]: {
                  summary: 'Sample response payload wrapped in standard success envelope',
                  value: {
                    ok: true,
                    data: sampleData,
                    meta: {
                      timestamp: '2026-11-24T10:30:00.000Z',
                      requestId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                    },
                  },
                },
              },
            }
          : {}),
      },
    },
  };
}

/**
 * Generates concise responses for non-data operations (e.g. status confirmation, message dispatch).
 */
export function messageOnly(
  description: string,
  message: string,
  statusCode = 200,
  extra?: Record<string, unknown>,
  exampleName = 'ConfirmationResponse'
): OpenAPIResponse {
  const schema: OpenAPISchema = {
    type: 'object',
    required: ['ok', 'message'],
    properties: {
      ok: {
        type: 'boolean',
        description: 'Operation success status flag',
        example: true,
      },
      code: {
        type: 'string',
        description: 'Granular machine-readable status code',
        example: (extra?.code as string) || 'DELIVERED',
      },
      message: {
        type: 'string',
        description: 'Human-readable outcome description',
        example: message,
      },
      contactEmail: {
        type: 'string',
        format: 'email',
        description: 'Fallback administrator contact email',
        example: 'rajendrabist396@gmail.com',
      },
    },
  };

  return {
    description,
    content: {
      'application/json': {
        schema,
        examples: {
          [exampleName]: {
            summary: description,
            value: {
              ok: true,
              code: (extra?.code as string) || 'DELIVERED',
              message,
              ...extra,
            },
          },
        },
      },
    },
  };
}

/**
 * Standard error response generator referencing the global ErrorResponse schema
 * with modern OpenAPI 3.1 named examples and optional response headers (e.g. Retry-After).
 */
export function errorResponse(
  description: string,
  sampleCode: string,
  sampleMessage: string,
  headers?: Record<string, { description: string; schema: OpenAPISchema }>
): OpenAPIResponse {
  return {
    description,
    ...(headers ? { headers } : {}),
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ErrorResponse',
        },
        examples: {
          [sampleCode]: {
            summary: description,
            value: {
              ok: false,
              code: sampleCode,
              message: sampleMessage,
              contactEmail: 'rajendrabist396@gmail.com',
            },
          },
        },
      },
    },
  };
}

/**
 * Generates multipart/form-data schemas supporting binary file uploads along with metadata text fields.
 */
export function multipartBody(
  fieldsSchema: Record<string, OpenAPISchema>,
  fileConfig: {
    fieldName: string;
    description: string;
    required?: boolean;
    allowedMimeTypes?: string[];
  }
): OpenAPIRequestBody {
  const properties: Record<string, OpenAPISchema> = {
    ...fieldsSchema,
    [fileConfig.fieldName]: {
      type: 'string',
      format: 'binary',
      description: `${fileConfig.description}${
        fileConfig.allowedMimeTypes ? ` (Allowed types: ${fileConfig.allowedMimeTypes.join(', ')})` : ''
      }`,
    },
  };

  const requiredFields = Object.keys(fieldsSchema).filter(
    (key) => fieldsSchema[key].nullable !== true
  );
  if (fileConfig.required) {
    requiredFields.push(fileConfig.fieldName);
  }

  return {
    description: 'Multipart form-data body containing binary file stream and associated metadata',
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties,
          required: requiredFields.length > 0 ? requiredFields : undefined,
        },
      },
    },
  };
}

/**
 * Generates an OpenAPI response definition for real-time streaming text (e.g., LLM chunked response).
 */
export function textStreamResponse(
  description: string,
  sampleChunk: string,
  customHeaders?: Record<string, { description: string; schema: OpenAPISchema }>
): OpenAPIResponse {
  return {
    description,
    headers: {
      'Content-Type': {
        description: 'Streamed MIME type with UTF-8 character encoding',
        schema: { type: 'string', example: 'text/plain; charset=utf-8' },
      },
      'Cache-Control': {
        description: 'Directs proxies and CDNs to disable buffering and caching of streamed chunks',
        schema: { type: 'string', example: 'no-cache, no-transform' },
      },
      ...customHeaders,
    },
    content: {
      'text/plain': {
        schema: {
          type: 'string',
          description: 'UTF-8 encoded streaming text chunks delimited by standard network buffers',
          example: sampleChunk,
        },
        examples: {
          StreamSample: {
            summary: 'Initial chunked token stream emitted by AI assistant',
            value: sampleChunk,
          },
        },
      },
    },
  };
}
