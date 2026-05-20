import eslintPluginReact from 'eslint-plugin-react'

export default [
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                process: 'readonly',
                module: 'writable',
            },
        },
        plugins: {
            react: eslintPluginReact,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'no-unused-vars': 'off',
        },
        settings: {
            react: { version: 'detect' },
        },
    },
]

