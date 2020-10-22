'use strict';

const express = require( 'express' ),
   fs = require( 'fs' ),
   path = require( 'path' ),
   util = require( 'util' ),
   app = express(),
   server = require( 'http' ).createServer( app ),
   ROOT = __dirname;

if( ! fs.existsSync( `${ROOT}/config.js` )) {

   throw new Error( 'Config not found' );
};

const {
   HOST,
   PORT,
   NODE_ENV,
   SPA,
   SSR,
} = require( `${ROOT}/config` );

const data = { appName: 'dashboard' };

if( SSR && SPA || !SSR && !SPA ) {

   throw new Error( 'Please set config parameter for buld SPA or SSR' );
};

const index = SSR ? require( `${ROOT}/dist/server` ).default : undefined;

if( SSR && ! fs.existsSync( `${ROOT}/dist/server` )) {

   throw new Error( 'Please build server application before' );
};

// template = fs.readFileSync();

server.on( 'error', err => console.log( err ));

const serve = SPA ? `${ROOT}/dist` : SSR ? `${ROOT}/dist/client` : undefined;

( async _=> {

   app.use( '/', express.static( serve ));

   app.get( '*', ( req, res, next ) => {

      console.log( req.url );

      if( SPA ) {

         res.send(`
<!doctype html>
<html>
<head>
   <meta charset='utf8'>
   <meta name='viewport' content='width=device-width'>
   <title>ssr app</title>
</head>
<body>
   <div id='app'></div>
   <script src='index.js'></script>
</body>
</html>
      `);
      }
      else if( SSR ) {

         const { head, html, css, } = index.render({ url: req.url, ...data });

         res.send(`
<!doctype html>
<html>
<head>
   <meta charset='utf8'>
   <meta name='viewport' content='width=device-width'>
   <title>ssr app</title>
   ${head}
</head>
<body>
   <style>
      ${css && css.code ? css.code : ''}
   </style>
   <div id='app'>
      ${html}
   </div>
   <script src='index.js'></script>
</body>
</html>
      `);
      }

      return next();
   });

   server.listen(
      PORT,
      HOST,
      _=> console.log(`Server listen at: ${HOST}:${PORT}, NODE_ENV:${NODE_ENV}`),
   );
})();
