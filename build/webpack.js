'use strict';

const dpv = require( 'dotenv-parse-variables' ),
   fs = require( 'fs' ),
   path = require( 'path' ),
   ROOT = path.resolve( `${__dirname}/..` ),
   webpackSpa = require( './webpack.spa' ),
   webpackSsrServer = require( './webpack.ssr.server' ),
   webpackSsrClient = require( './webpack.ssr.client' );

if( ! fs.existsSync( `${ROOT}/config.js` )) {

   throw new Error( 'Config not found' );
};

const { SPA, SSR } = require( `${ROOT}/config` );

if( SSR && SPA || !SSR && !SPA ) {

   throw new Error( 'Please set env parameter for buld SPA or SSR' );
};

module.exports = [
   ...( SPA ? [ webpackSpa ] : []),
   ...( SSR ? [ webpackSsrServer ] : []),
   ...( SSR ? [ webpackSsrClient ] : []),
];
