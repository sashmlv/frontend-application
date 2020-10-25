'use strict';

const { ESLint } = require( 'eslint' ),
   { ESLINT } = require( '../config' );

(async _=> {

   try {

      const eslint = new ESLint( ESLINT.OPTIONS ),
         results = await eslint.lintFiles( ESLINT.PATHS ),
         formatter = await eslint.loadFormatter( 'stylish' ),
         resultText = formatter.format( results );

      console.log( resultText );
   }
   catch( err ) {

      process.exitCode = 1;

      console.error( err );
   };
})();
