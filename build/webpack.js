'use strict';

const fs = require( 'fs' ),
   path = require( 'path' ),
   ROOT = path.resolve( `${ __dirname }/..` ),
   webpackSpa = require( './webpack.spa' ),
   webpackSsrServer = require( './webpack.ssr.server' ),
   webpackSsrClient = require( './webpack.ssr.client' );

const { SPA, SSR } = require( `${ ROOT }/config` );

if( SSR && SPA || !SSR && !SPA ) {

   throw new Error( 'Please set config parameter for buld SPA or SSR' );
};

module.exports = [

   ...( SPA ? [ webpackSpa ] : []),
   ...( SSR ? [ webpackSsrServer ] : []),
   ...( SSR ? [ webpackSsrClient ] : []),
];
