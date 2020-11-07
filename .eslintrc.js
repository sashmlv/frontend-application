'use strict';

module.exports = {

   extends: [

      'plugin:sonarjs/recommended',
      'eslint-config-3-spaces',
   ],
   parserOptions: {

      ecmaVersion: 12,
      sourceType: 'module',
   },
   env: {

      es6: true,
      browser: true,
   },
   plugins: [

      'svelte3',
      'sonarjs',
   ],
   overrides: [
      {
         files: [ '*.svelte' ],
         processor: 'svelte3/svelte3',
      }
   ],
   ignorePatterns: [ 'public' ],
};
