'use strict';

const path = require( 'path' ),
   ROOT = path.resolve(`${ __dirname }/..`),
   NODE_ENV = process.env.NODE_ENV || 'development';

const config = {

   DEBUG: true,
   SPA: !! process.env.SPA,
   SSR: !! process.env.SSR,
   HOST: 'localhost',
   PORT: 3000,
   NODE_ENV,
   DEV_SERVER: {

      HOST: 'localhost',
      PORT: 3000,
   },
   PROXY: {

      SOURCE: '/api',
      HOST: 'localhost',
      PORT: 3001,
      PROTOCOL: NODE_ENV === 'production' ? 'https' : 'http',
   },
   ESLINT: {

      PATHS: [

         path.resolve( `${ ROOT }/build` ),
         path.resolve( `${ ROOT }/server.js` ),
         path.resolve( `${ ROOT }/src` ),
      ],
      OPTIONS: {

         extensions: [ '.js', '.svelte', ],
      }
   }
};

if( config.DEBUG ){

   process.env.DEBUG = 'express:*';
};

module.exports = config;
