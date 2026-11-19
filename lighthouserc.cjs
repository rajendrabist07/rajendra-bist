module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npx next start -p 3005 -H 127.0.0.1',
      startServerReadyPattern: 'Ready in',
      url: [
        'http://127.0.0.1:3005/',
        'http://127.0.0.1:3005/projects/sovereign',
        'http://127.0.0.1:3005/blog/pgvector-vs-external-vector-db',
      ],
      numberOfRuns: 5,
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
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
