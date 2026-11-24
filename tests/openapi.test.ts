import { describe, expect, it } from 'vitest';
import { openApiDocument } from '../app/docs/openapi';
import { GET as getDocsJson } from '../app/api/v1/docs.json/route';
import { GET as getDocsHtml } from '../app/api/v1/docs/route';

describe('Modular OpenAPI 3.1 Code-as-Spec Architecture', () => {
  it('1. Root Document Specification & Metadata', () => {
    expect(openApiDocument.openapi).toBe('3.1.0');
    expect(openApiDocument.info.title).toContain('Rajendra Bist');
    expect(openApiDocument.info.version).toBe('1.0.0');
    expect(openApiDocument.info.contact.email).toBe('rajendrabist396@gmail.com');
    expect(openApiDocument.servers.length).toBeGreaterThanOrEqual(2);
    expect(openApiDocument.servers.some((s) => s.url.includes('bistrajendra.com.np'))).toBe(true);
  });

  it('2. Domain Tags & Feature Slice Coverage', () => {
    const tagNames = openApiDocument.tags.map((t) => t.name);
    expect(tagNames).toContain('AI Assistant');
    expect(tagNames).toContain('Communications');
    expect(tagNames).toContain('System & Health');
    expect(tagNames).toContain('Syndication & Feeds');
    expect(tagNames).toContain('API Platform & Documentation');
  });

  it('3. Real Endpoint Registrations (Zero Hallucination)', () => {
    const paths = Object.keys(openApiDocument.paths);
    expect(paths).toContain('/api/health');
    expect(paths).toContain('/api/chat');
    expect(paths).toContain('/api/contact');
    expect(paths).toContain('/rss.xml');
    expect(paths).toContain('/api/v1/docs.json');
    expect(paths).toContain('/api/v1/docs');
  });

  it('4. Health Probe (/api/health) Contract Verification', () => {
    const health = (openApiDocument.paths as any)['/api/health'].get;
    expect(health.summary).toBeDefined();
    expect(health.operationId).toBe('getHealthStatus');
    expect(health.security).toEqual([]);
    expect(health.responses['200']).toBeDefined();
    expect(health.responses['200'].headers['Cache-Control']).toBeDefined();
  });

  it('5. Contact Hub (/api/contact) Schema Binding & Error Taxonomy', () => {
    const contact = (openApiDocument.paths as any)['/api/contact'].post;
    expect(contact.operationId).toBe('submitContactForm');
    expect(contact.requestBody).toBeDefined();

    // Check requestBody examples in OpenAPI 3.1 named format
    const jsonReq = contact.requestBody.content['application/json'];
    expect(jsonReq.examples).toBeDefined();
    expect(jsonReq.examples.RealisticExample).toBeDefined();
    expect(jsonReq.examples.RealisticExample.value.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(jsonReq.examples.RealisticExample.value.message.length).toBeGreaterThanOrEqual(20);

    // Verify error code mappings
    const responses = contact.responses;
    expect(responses['200']).toBeDefined();
    expect(responses['400']).toBeDefined();
    expect(responses['403']).toBeDefined();
    expect(responses['413']).toBeDefined();
    expect(responses['429']).toBeDefined();
    expect(responses['503']).toBeDefined();
    expect(responses['429'].headers['Retry-After']).toBeDefined();
  });

  it('6. AI Assistant (/api/chat) Streaming & Failover Model Semantics', () => {
    const chat = (openApiDocument.paths as any)['/api/chat'].post;
    expect(chat.operationId).toBe('streamChatResponse');
    expect(chat.requestBody).toBeDefined();

    const jsonReq = chat.requestBody.content['application/json'];
    expect(jsonReq.examples).toBeDefined();

    // Verify stream response headers (X-Session-Id, X-Request-Id, X-Model-Used)
    const streamRes = chat.responses['200'];
    expect(streamRes.content['text/plain']).toBeDefined();
    expect(streamRes.headers['Content-Type']).toBeDefined();
    expect(streamRes.headers['X-Session-Id']).toBeDefined();
    expect(streamRes.headers['X-Request-Id']).toBeDefined();
    expect(streamRes.headers['X-Model-Used']).toBeDefined();

    // Error codes
    expect(chat.responses['400']).toBeDefined();
    expect(chat.responses['403']).toBeDefined();
    expect(chat.responses['413']).toBeDefined();
    expect(chat.responses['429']).toBeDefined();
    expect(chat.responses['502']).toBeDefined();
    expect(chat.responses['503']).toBeDefined();
    expect(chat.responses['504']).toBeDefined();
  });

  it('7. Global Components & Schemas Consistency', () => {
    const schemas = openApiDocument.components.schemas as Record<string, any>;
    expect(schemas.ErrorResponse).toBeDefined();
    expect(schemas.ValidationErrorDetail).toBeDefined();
    expect(schemas.PaginationMeta).toBeDefined();
    expect(schemas.ContactRequest).toBeDefined();
    expect(schemas.ContactResponse).toBeDefined();
    expect(schemas.ChatRequest).toBeDefined();
    expect(schemas.ChatMessageItem).toBeDefined();
    expect(schemas.HealthResponse).toBeDefined();

    const responses = openApiDocument.components.responses as Record<string, any>;
    expect(responses.ValidationError).toBeDefined();
    expect(responses.ForbiddenOrigin).toBeDefined();
    expect(responses.RateLimited).toBeDefined();
  });

  it('8. Route Mounting: /api/v1/docs.json Handler', async () => {
    const res = await getDocsJson();
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('application/json');
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');

    const json = await res.json();
    expect(json.openapi).toBe('3.1.0');
    expect(json.paths['/api/contact']).toBeDefined();
    expect(json.paths['/api/chat']).toBeDefined();
    expect(json.paths['/api/health']).toBeDefined();
  });

  it('9. Route Mounting: /api/v1/docs Interactive UI Handler', async () => {
    const res = await getDocsHtml();
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/html');

    const html = await res.text();
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('SwaggerUIBundle');
    expect(html).toContain('/api/v1/docs.json');
    expect(html).toContain('Rajendra Bist');
  });
});
