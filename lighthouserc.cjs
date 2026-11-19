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
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }],
      },
    },
  },
};
