import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs["jsx-runtime"],
  {
    rules: {
        'semi': ['error', 'always', { 'omitLastInOneLineBlock': false}],
        'comma-dangle': ['error', 'never'],
        quotes: ['error', 'single'],
        'react/prop-types': [0],
        'indent': ['error', 'tab']
    }
  }
];