module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:react/recommended',
        'plugin:jsx-runtime/strict',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'jsx-runtime', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        semi: ['error', 'always', { omitLastInOneLineBlock: false }],
        'comma-dangle': ['error', 'never'],
        quotes: ['error', 'single'],
        'react/prop-types': [0],
        indent: ['error', 'tab'],
    },
    overrides: [
        {
            files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
            processor: 'tsx-eslint-processor-prettier',
        },
    ],
    settings: {
        prettier: {
            tabWidth: 4,
            singleQuote: true,
            trailingComma: 'es5',
        },
    },
};

// export default [
//   {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
//   {languageOptions: { globals: globals.browser}},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
//   pluginReact.configs["jsx-runtime"],
//   {
//     rules: {
//         'semi': ['error', 'always', { 'omitLastInOneLineBlock': false}],
//         'comma-dangle': ['error', 'never'],
//         quotes: ['error', 'single'],
//         'react/prop-types': [0],
//         'indent': ['error', 'tab']
//     }
//   }
// ];
