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

if( ! fs.existsSync( `${ROOT}/dist/server` )) {

   throw new Error( 'Please build server application before' );
};

const {
   HOST,
   PORT,
   NODE_ENV,
} = require( `${ROOT}/config` ),
   index = require( `${ROOT}/dist/server` ).default;

// template = fs.readFileSync();

app.use('/', express.static( `${ROOT}/dist/client` ));

server.on( 'error', err => console.log( err ));

( async _=> {

   app.use( '/', ( req, res, next ) => {

      console.log( req.url );

      const data = { appName: 'dashboard' };

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

      return next();
   });

   server.listen(
      PORT,
      HOST,
      _=> console.log(`Server listen at: ${HOST}:${PORT}, NODE_ENV:${NODE_ENV}`),
   );
})();
