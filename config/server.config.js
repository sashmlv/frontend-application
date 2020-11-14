'use strict';

const path = require( 'path' ),
   fs = require( 'fs' ),
   dotenv = require( 'dotenv' ),
   ROOT = path.resolve(`${ __dirname }/..`),
   env = dotenv.parse( fs.readFileSync( `${ ROOT }/.env` )),
   NODE_ENV = process.env.NODE_ENV || env.NODE_ENV || 'development';

for( const key in env ) {

   if( process.env.hasOwnProperty( key )) {

      continue;
   }

   process.env[ key ] = env[ key ];
}

env.SPA = process.env.SPA || env.SPA;
env.SSR = process.env.SSR || env.SSR;

const config = {

   NODE_ENV,
   DEBUG_EXPRESS: env.DEBUG_EXPRESS,
   SSL_ENABLED: env.SSL_ENABLED === 'true',
   SSL_KEY: env.SSL_KEY,
   SSL_CRT: env.SSL_CRT,
   SPA: env.SPA,
   SSR: env.SSR,
   HOST: env.HOST,
   PORT: env.PORT,
   PROXY: { // node proxy

      HOST: env.PROXY_HOST,
      PORT: env.PROXY_PORT,
      SSL: NODE_ENV === 'production' || env.PROXY_SSL === 'true',
      ENABLED: env.PROXY_ENABLED === 'true',
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

module.exports = config;
