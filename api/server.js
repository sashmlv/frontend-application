'use strict';

const {

   ROOT,
   HOST,
   PORT,
} = require( './config' ),
   jsonServer = require( 'json-server' ),
   server = jsonServer.create(),
   middlewares = jsonServer.defaults(),
   db = require( `${ ROOT }/api/db.js` ),
   router = jsonServer.router( db );

server.use( middlewares );
server.use( router );
server.listen(
   PORT,
   HOST,
   _=> console.log( `JSON server listen at: ${ HOST }:${ PORT }`),
);