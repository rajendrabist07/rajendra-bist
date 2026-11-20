import { NextRequest } from 'next/server';

const ALLOWED_STATIC_HOSTS = new Set([
  'bistrajendra.com.np',
  'www.bistrajendra.com.np',
  'localhost',
  '127.0.0.1',
]);

/**
 * Validates request origin against trusted hosts.
 * Accepts:
 * - Request host (`host` header)
 * - `x-forwarded-host`
 * - Canonical hosts (`bistrajendra.com.np`, `www.bistrajendra.com.np`)
 * - Localhost / 127.0.0.1 in development/testing
 * - Project's own `*.vercel.app` preview hosts when `VERCEL_ENV !== "production"`
 * - Requests without origin/referer (curl, server-to-server, smoke tests)
 */
export function isRequestOriginAllowed(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const targetHeader = origin || referer;

  if (!targetHeader) {
    return true; // Non-browser clients, automated scripts, curl
  }

  let targetHost: string;
  try {
    const parsed = new URL(targetHeader);
    targetHost = parsed.host.toLowerCase();
  } catch {
    return false;
  }

  // Remove port if present for hostname checks
  const targetHostname = targetHost.split(':')[0];

  // 1. Static allowed domains
  if (ALLOWED_STATIC_HOSTS.has(targetHostname)) {
    return true;
  }

  // 2. Request host header match
  const reqHost = req.headers.get('host')?.toLowerCase();
  if (reqHost && (targetHost === reqHost || targetHostname === reqHost.split(':')[0])) {
    return true;
  }

  // 3. X-Forwarded-Host header match (behind edge proxy/CDN)
  const forwardedHost = req.headers.get('x-forwarded-host')?.toLowerCase();
  if (forwardedHost) {
    const firstForwarded = forwardedHost.split(',')[0].trim();
    if (targetHost === firstForwarded || targetHostname === firstForwarded.split(':')[0]) {
      return true;
    }
  }

  // 4. Vercel Preview Deployments (*.vercel.app when VERCEL_ENV !== "production")
  const isVercelProduction = process.env.VERCEL_ENV === 'production';
  if (!isVercelProduction && targetHostname.endsWith('.vercel.app')) {
    // Only accept vercel.app domains associated with this portfolio
    if (targetHostname.includes('rajendra-bist') || targetHostname.includes('portfolio')) {
      return true;
    }
  }

  return false;
}
