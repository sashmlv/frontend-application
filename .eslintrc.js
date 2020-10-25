'use strict';

module.exports = {

   extends: 'eslint-config-3-spaces',
   parserOptions: {

      ecmaVersion: 2019,
      sourceType: 'module',
   },
   env: {

      es6: true,
      browser: true,
   },
   plugins: [

      'svelte3',
   ],
   overrides: [
      {
         files: [ '*.svelte' ],
         processor: 'svelte3/svelte3',
      }
   ],
};
