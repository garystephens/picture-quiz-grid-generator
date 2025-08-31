/* global module */

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    plugins: ['react', 'react-hooks'],
    env: {
        browser: true,
        es6: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
        },
    },
    globals: {
        $: 'readonly',
        gtag: 'readonly',
    },
    rules: {
        'no-undef': 'error',
    },
};
