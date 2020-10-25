'use strict';

const fs = require( 'fs' ),
   ROOT = __dirname;

if( ! fs.existsSync( `${ ROOT }/config.js` )){

   throw new Error( 'Config not found' );
};

const {

   HOST,
   PORT,
   NODE_ENV,
   SPA,
   SSR,
} = require( `${ ROOT }/config` ),
   path = require( 'path' ),
   util = require( 'util' ),
   express = require( 'express' ),
   app = express(),
   server = require( 'http' ).createServer( app ),
   log = require( 'pino' )(),
   pino = require('express-pino-logger')(),
   data = { appName: 'dashboard' };

server.on( 'error', err => log.error( err ));

if( SSR && SPA || ! SSR && ! SPA ){

   throw new Error( 'Please set config parameter for buld SPA or SSR' );
};

if( SSR && ! fs.existsSync( `${ ROOT }/dist/server` )){

   throw new Error( 'Please build server application before' );
};

const index = SSR ? require( `${ ROOT }/dist/server` ).default : undefined,
   serve = SPA ? `${ ROOT }/dist` : SSR ? `${ ROOT }/dist/client` : undefined,
   templatePath = SPA ? `${ ROOT }/dist/index.html` : SSR ? `${ ROOT }/dist/server/index.html` : undefined,
   templateStr = fs.readFileSync( templatePath, 'utf8' );

app.use( pino );
app.use( '/', express.static( serve ));

if( SPA ){

   app.get( '*', ( req, res, next ) => {

      res.send( templateStr );
   });
}
else if( SSR ){

   /* get template parts */
   let parts = templateStr.split( '<!--HEAD-->' );

   const beforeHead = parts[ 0 ];

   parts = parts[ 1 ].split( '<!--STYLE-->' );

   const beforeStyle = parts[ 0 ];

   parts = parts[ 1 ].split( '<!--HTML-->' );

   const beforeHtml = parts[ 0 ],
      afterHtml = parts[ 1 ];

   app.get( '*', ( req, res, next ) => {

      const { head, html, css, } = index.render({

         url: req.url,
         spa: SPA,
         ssr: SSR,
         ...data
      });

      res.send( `${ beforeHead }${ head }${ beforeStyle }${ css && css.code ? css.code : '' }${ beforeHtml }${ html }${ afterHtml }`);

      return next();
   });
};

app.use(( err, req, res, next ) => {

   log.error( err );

   if( res.headersSent ) {

      return next( err );
   }

   return res.status( 500 ).send( 'Internal Server Error' );
});

server.listen(

   PORT,
   HOST,
   _=> log.info( `Server listen at: ${ HOST }:${ PORT }, NODE_ENV: ${ NODE_ENV }`),
);
