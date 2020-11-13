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

const config = {

   NODE_ENV,
   DEBUG_EXPRESS: env.DEBUG_EXPRESS,
   SPA: env.SPA,
   SSR: env.SSR,
   HOST: env.HOST,
   PORT: env.PORT,
   DEV_SERVER: {

      HOST: env.DEV_SERVER_HOST,
      PORT: env.DEV_SERVER_PORT,
   },
   PROXY: { // node proxy

      SOURCE: '/api',
      HOST: env.PROXY_HOST,
      PORT: env.PROXY_PORT,
      PROTOCOL: NODE_ENV === 'production' ? 'https' : 'http',
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
