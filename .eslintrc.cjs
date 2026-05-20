module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2024: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
}
