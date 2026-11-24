/**
 * app/api/v1/docs/route.ts
 *
 * Interactive Swagger UI 5.x Exploration Portal.
 * Serves a zero-dependency HTML document initializing Swagger UI standalone,
 * styled to harmoniously blend with the Soft Blueprint Design System.
 */

export const dynamic = 'force-static';
export const revalidate = 3600;

const swaggerUiHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Documentation & Specification — Rajendra Bist</title>
  <link rel="icon" type="image/png" href="/icon.png">
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-page: #0a0e17;
      --bg-surface-1: #101623;
      --bg-surface-2: #162032;
      --line-hair: rgba(255, 255, 255, 0.08);
      --line-soft: rgba(255, 255, 255, 0.14);
      --line-accent: rgba(56, 189, 248, 0.4);
      --accent: #38bdf8;
      --accent-dim: rgba(56, 189, 248, 0.12);
      --text-primary: #e2e8f0;
      --text-secondary: #94a3b8;
    }

    body {
      margin: 0;
      padding: 0;
      background-color: var(--bg-page);
      color: var(--text-primary);
      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .top-bar-custom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 24px;
      background: var(--bg-surface-1);
      border-bottom: 1px solid var(--line-hair);
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(8px);
    }

    .top-bar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text-primary);
    }

    .top-bar-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 8px;
      border-radius: 999px;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      background: var(--accent-dim);
      border: 1px solid var(--line-accent);
      color: var(--accent);
      font-weight: 600;
    }

    .top-bar-links {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 13px;
    }

    .top-bar-links a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.15s ease;
      font-family: 'Space Grotesk', sans-serif;
    }

    .top-bar-links a:hover {
      color: var(--accent);
    }

    .swagger-ui {
      max-width: 1280px;
      margin: 0 auto;
      padding: 24px 16px 80px;
    }

    .swagger-ui .topbar {
      display: none !important;
    }

    .swagger-ui .info {
      margin: 20px 0 30px;
    }

    .swagger-ui .info .title {
      font-family: 'Space Grotesk', sans-serif;
      color: #f1f5f9;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .swagger-ui .info p,
    .swagger-ui .info li,
    .swagger-ui .info table {
      color: #cbd5e1;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
    }

    .swagger-ui .info code {
      background: rgba(56, 189, 248, 0.1);
      color: #38bdf8;
      border-radius: 4px;
      padding: 2px 5px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
    }

    .swagger-ui .scheme-container {
      background: var(--bg-surface-1);
      box-shadow: none;
      border: 1px solid var(--line-hair);
      border-radius: 10px;
      padding: 16px 20px;
      margin-bottom: 24px;
    }

    .swagger-ui select {
      background: var(--bg-surface-2);
      color: #f1f5f9;
      border: 1px solid var(--line-soft);
      border-radius: 6px;
      padding: 6px 12px;
      font-family: 'JetBrains Mono', monospace;
    }

    .swagger-ui .opblock {
      border-radius: 10px !important;
      border-width: 1px !important;
      margin: 0 0 16px !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
    }

    .swagger-ui .opblock .opblock-summary {
      padding: 12px 16px;
    }

    .swagger-ui .opblock .opblock-summary-method {
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      font-size: 12px;
      min-width: 70px;
      text-align: center;
    }

    .swagger-ui .opblock .opblock-summary-path {
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      font-weight: 600;
    }

    .swagger-ui .opblock-body pre.microlight {
      background: #0d131f !important;
      border-radius: 8px;
      border: 1px solid var(--line-hair);
      font-family: 'JetBrains Mono', monospace !important;
    }

    .swagger-ui table thead tr th,
    .swagger-ui table thead tr td {
      color: #94a3b8;
      border-bottom: 1px solid var(--line-soft);
    }

    .swagger-ui .btn {
      border-radius: 6px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      transition: all 0.15s ease;
    }
  </style>
</head>
<body>
  <header class="top-bar-custom">
    <a href="/" class="top-bar-brand">
      <strong style="font-weight: 700; letter-spacing: -0.02em;">Rajendra Bist</strong>
      <span class="top-bar-badge">OpenAPI 3.1.0</span>
    </a>
    <nav class="top-bar-links">
      <a href="/api/v1/docs.json" target="_blank" rel="noopener noreferrer">Raw JSON (docs.json)</a>
      <a href="/api/health" target="_blank" rel="noopener noreferrer">Health Probe</a>
      <a href="/" target="_blank" rel="noopener noreferrer">&larr; Return to Portfolio</a>
    </nav>
  </header>

  <div id="swagger-ui"></div>

  <script src="https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui-bundle.js" charset="UTF-8"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui-standalone-preset.js" charset="UTF-8"></script>
  <script>
    window.onload = function() {
      window.ui = SwaggerUIBundle({
        url: "/api/v1/docs.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "BaseLayout",
        defaultModelsExpandDepth: 2,
        defaultModelExpandDepth: 2,
        docExpansion: "list",
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        syntaxHighlight: {
          theme: "monokai"
        }
      });
    };
  </script>
</body>
</html>`;

export async function GET() {
  return new Response(swaggerUiHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
