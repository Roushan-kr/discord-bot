import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
// import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginPrettierRecommended from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  // {
  //   plugins: {
  //     jsdoc: jsdoc,
  //   },
  // },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
  { ignores: ['.node_modules/*', 'dist/*'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

export {
  // Any other config imports go at the top
  eslintPluginPrettierRecommended,
};
