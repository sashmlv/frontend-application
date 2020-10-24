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
   data = { appName: 'dashboard' };

if( SSR && SPA || ! SSR && ! SPA ){

   throw new Error( 'Please set config parameter for buld SPA or SSR' );
};

const index = SSR ? require( `${ ROOT }/dist/server` ).default : undefined;

if( SSR && ! fs.existsSync( `${ ROOT }/dist/server` )){

   throw new Error( 'Please build server application before' );
};

server.on( 'error', err => console.log( err ));

const serve = SPA ? `${ ROOT }/dist` : SSR ? `${ ROOT }/dist/client` : undefined,
   templateStr = fs.readFileSync( `${ ROOT }/dist/index.html`, 'utf8' );

/* get template parts */
let parts = templateStr.split( '<!--HEAD-->' );

const beforeHead = parts[ 0 ];

parts = parts[ 1 ].split( '<!--STYLE-->' );

const beforeStyle = parts[ 0 ];

parts = parts[ 1 ].split( '<!--HTML-->' );

const beforeHtml = parts[ 0 ],
   afterHtml = parts[ 1 ];

app.use( '/', express.static( serve ));

if( SPA ){

   const spaTemplate = `${ beforeHead }${ beforeStyle }${ beforeHtml }${ afterHtml }`;

   app.get( '*', ( req, res, next ) => {

      console.log( req.url );

      res.send( spaTemplate );

      return next();
   });
}
else if( SSR ){

   app.get( '*', ( req, res, next ) => {

      console.log( req.url );

      const { head, html, css, } = index.render({ url: req.url, SPA, SSR, ...data });

      res.send( `${ beforeHead }${ head }${ beforeStyle }${ css && css.code ? css.code : '' }${ beforeHtml }${ html }${ afterHtml }`);

      return next();
   });
};

server.listen(

   PORT,
   HOST,
   _=> console.log( `Server listen at: ${ HOST }:${ PORT }, NODE_ENV: ${ NODE_ENV }`),
);
