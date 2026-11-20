module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npx next start -p 3005 -H 127.0.0.1',
      startServerReadyPattern: 'Ready in',
      url: ['http://127.0.0.1:3005/'],
      numberOfRuns: 3,
      settings: {
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
        },
        throttlingMethod: 'simulate',
        chromeFlags: '--headless --no-sandbox --disable-gpu --disable-dev-shm-usage',
      },
    },
    assert: {
      aggregationMethod: 'median-run',
      assertions: {
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'categories:best-practices': ['error', { minScore: 1.0 }],
        'categories:seo': ['error', { minScore: 1.0 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        'categories:performance': ['warn', { minScore: 0.95 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'total-blocking-time': ['warn', { maxNumericValue: 150 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
