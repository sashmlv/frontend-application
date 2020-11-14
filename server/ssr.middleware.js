'use strict';

const fs = require( 'fs' ),
   path = require( 'path' ),
   ROOT = path.resolve(`${ __dirname }/..`),
   index = require( `${ ROOT }/dist/server` ).default,
   templateStr = fs.readFileSync( `${ ROOT }/dist/server/index.html`, 'utf8' );

/* get template parts */
let parts = templateStr.split( '<!--HEAD-->' );

const beforeHead = parts[ 0 ];

parts = parts[ 1 ].split( '<!--STYLE-->' );

const beforeStyle = parts[ 0 ];

parts = parts[ 1 ].split( '<!--HTML-->' );

const beforeHtml = parts[ 0 ],
   afterHtml = parts[ 1 ];

function ssrMiddleware( req, res, next ){

   const { head, html, css, } = index.render({

      pathname: req.url,
   });

   res.send( `${ beforeHead }${ head }${ beforeStyle }${ css && css.code ? css.code : '' }${ beforeHtml }${ html }${ afterHtml }`);

   return next();
}

module.exports = ssrMiddleware;
