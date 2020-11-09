'use strict';

const path = require( 'path' ),
   ROOT = path.resolve(`${ __dirname }/..`);

const config = {

   DEBUG: true,
   SPA: !! process.env.SPA,
   SSR: !! process.env.SSR,
   HOST: 'localhost',
   PORT: 3000,
   NODE_ENV: process.env.NODE_ENV || 'development',
   DEV_SERVER: {

      HOST: 'localhost',
      PORT: 3000,
      PROXY: {

         SOURCE: '/api',
         TARGET: 'http://localhost:3001/api',
      }
   },
   ESLINT: {

      PATHS: [

         path.resolve( `${ ROOT }/build` ),
         path.resolve( `${ ROOT }/server.js` ),
         path.resolve( `${ ROOT }/src` ),
      ],
      OPTIONS: {

         extensions: [ '.js', '.svelte', ]
      }
   }
};

if( config.DEBUG ){

   process.env.DEBUG = 'express:*';
};

module.exports = config;
