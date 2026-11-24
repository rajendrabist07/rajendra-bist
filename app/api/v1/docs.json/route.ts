/**
 * app/api/v1/docs.json/route.ts
 *
 * OpenAPI 3.1.0 Raw Specification Route.
 * Serves the aggregated, feature-sliced OpenAPI document in standard JSON format
 * for consumption by Swagger UI, Postman, automated linters, and type generators.
 */

import { NextResponse } from 'next/server';
import { openApiDocument } from '@/app/docs/openapi';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  return NextResponse.json(openApiDocument, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
