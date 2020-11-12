'use strict';

const fs = require( 'fs' ),
   path = require( 'path' ),
   ROOT = path.resolve( `${ __dirname }/..` );

if( ! fs.existsSync( `${ ROOT }/config/server.config.js` )){

   throw new Error( 'Config not found' );
};

const {

   HOST,
   PORT,
   NODE_ENV,
   SPA,
   SPA_HASHBANG,
   SSR,
   PROXY,
} = require( `${ ROOT }/config/server.config` ),
   {
      ENABLED: P_ENABLED,
      HOST: P_HOST,
      PORT: P_PORT,
      PROTOCOL: P_PROTOCOL,
   } = PROXY,
   express = require( 'express' ),
   app = express(),
   server = require( 'http' ).createServer( app ),
   log = require( 'pino' )(),
   pino = require( 'express-pino-logger' )(),
   proxy = require( './proxy' ),
   spaMiddleware = SPA && require( './spa.middleware' ),
   ssrMiddleware = SSR && require( './ssr.middleware' );

server.on( 'error', err => log.error( err ));

if( SSR && SPA || ! SSR && ! SPA ){

   throw new Error( 'Please set config parameter for buld SPA or SSR' );
};

if( SSR && ! fs.existsSync( `${ ROOT }/dist/server` )){

   throw new Error( 'Please build server application before' );
};

const serve = SSR ? `${ ROOT }/dist/client` : SPA ? `${ ROOT }/dist` : undefined,
   spaSrr = SSR ? ssrMiddleware : SPA ? spaMiddleware : undefined;

app.use( pino );

if( P_ENABLED ){

   app.use( proxy );
}

app.use( '/', express.static( serve ));
app.get( '*', spaSrr );

app.use(( err, req, res, next ) => {

   log.error( err );

   if( res.headersSent ) {

      return next( err );
   }

   return res.status( 500 ).send( 'Internal server error' );
});

server.listen(

   PORT,
   HOST,
   _=> log.info( `Server listen at: ${ HOST }:${ PORT }, NODE_ENV: ${ NODE_ENV }`),
);
