'use strict';

const path = require( 'path' ),
   ROOT = path.resolve( `${ __dirname }/..` ),
   { PROXY } = require( `${ ROOT }/config/server.config` ),
   {
      HOST,
      PORT,
      PROTOCOL,
   } = PROXY;

const HTTP = PROTOCOL === 'http' ? require( 'http' ) :
   PROTOCOL === 'https' ? require( 'https' ) :
   undefined;

function proxy( req, res, next ){

   if( req.url.indexOf( '/api' ) === 0 ){

      return req.pipe(

         HTTP.request(
            {
               host: HOST,
               port: PORT,
               headers: req.headers,
               method: req.method,
               path: req.url,
            },
            response => {
               res.writeHead( response.statusCode, response.headers );
               response.pipe( res );
            }
         )
      );
   }

   return next();
}

module.exports = proxy;
