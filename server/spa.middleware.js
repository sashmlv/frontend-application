'use strict';

const fs = require( 'fs' ),
   path = require( 'path' ),
   ROOT = path.resolve( `${ __dirname }/..` ),
   templateStr = fs.readFileSync( `${ ROOT }/dist/index.html`, 'utf8' );

function spaMiddleware( req, res, next ){

   res.send( templateStr );

   return next();
}

module.exports = spaMiddleware;
