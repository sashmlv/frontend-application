'use strict';

const {

   ROOT,
   HOST,
   PORT,
} = require( './api.config' ),
   jsonServer = require( 'json-server' ),
   server = jsonServer.create(),
   middlewares = jsonServer.defaults({
      static: `${ ROOT }/api/public`,
   }),
   db = require( `${ ROOT }/api/db.js` ),
   router = jsonServer.router( db ),
   routes = require( './routes' );

server.use( middlewares );
server.use( jsonServer.bodyParser );
server.use( routes );
server.use( router );
server.listen(

   PORT,
   HOST,
   _=> console.log( `JSON server listen at: ${ HOST }:${ PORT }`),
);
