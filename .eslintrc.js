/* global module */

module.exports = {
    extends: 'eslint:recommended',
    env: {
        browser: true,
        es6: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 9,
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: ['plugin:react/recommended'],
    globals: { $: 'readonly' },
    rules: {
        'no-undef': 'error',
    },
};
