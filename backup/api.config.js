'use strict';

const path = require( 'path' ),
   ROOT = path.resolve( `${ __dirname }/..` );

const config = {

   ROOT,
   HOST: 'localhost',
   PORT: 3301,
   DEBUG: true,
};

module.exports = config;
