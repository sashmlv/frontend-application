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
   SSL_ENABLED,
   SSL_KEY,
   SSL_CRT,
} = require( `${ ROOT }/config/server.config` ),
   pinoOpts = NODE_ENV !== 'production' ?  {

      prettyPrint: {

         colorize: true,
         errorProps: '*',
      }
   } : {},
   express = require( 'express' ),
   app = express(),
   log = require( 'pino' )( pinoOpts ),
   pino = require( 'express-pino-logger' )( pinoOpts ),
   proxy = require( './proxy' ),
   spaMiddleware = SPA && require( './spa.middleware' ),
   ssrMiddleware = SSR && require( './ssr.middleware' );

const server = NODE_ENV === 'production' || SSL_ENABLED ? require( 'https' ).createServer({

      key: fs.readFileSync( `${ ROOT }/certs/${ SSL_KEY }` ),
      cert: fs.readFileSync( `${ ROOT }/certs/${ SSL_CRT }` ),
   }, app ) : require( 'http' ).createServer( app );

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

if( PROXY.ENABLED ){

   app.use( proxy );
}

app.use( '/', express.static( serve ));
app.get( '*', spaSrr );

app.use(( err, req, res, next ) => {

   log.error( err );

   if( res.headersSent ){

      return next( err );
   }

   return res.status( 500 ).send( 'Internal server error' );
});

server.listen(

   PORT,
   HOST,
   _=> log.info( `Server listen at: ${ HOST }:${ PORT }, NODE_ENV: ${ NODE_ENV }`),
);
