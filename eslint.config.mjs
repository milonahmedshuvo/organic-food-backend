// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,

  {
    languageOptions: {
        globals: {
            ...global.node
        },
    }
},
  {
    rules: {
        "no-unused-vars": "warn",
        "no-undef": "warn",
        "prefer-const": "error",
        "no-console" : "warn"
    }
},
{
  ignores:["**/node_modules/", "**/dist/"]
}
);