'use strict';

const fs = require( 'fs' ),
   path = require( 'path' ),
   { greenBright, redBright, underline } = require( 'chalk' ),
   ROOT = path.resolve( `${ __dirname }/..` ),
   webpackSpa = require( './webpack.spa' ),
   webpackSsrServer = require( './webpack.ssr.server' ),
   webpackSsrClient = require( './webpack.ssr.client' );

const { SPA, SSR } = require( `${ ROOT }/config/server.cfg` );

if( SSR && SPA || !SSR && !SPA ) {

   throw new Error( redBright('Please set config parameter for buld SPA or SSR' ));
};

SPA && console.log( greenBright.underline( 'Building SPA' ));
SSR && console.log( greenBright.underline( 'Building SSR' ));

const webpackConfig = [

   ...( SPA ? [ webpackSpa ] : []),
   ...( SSR ? [ webpackSsrServer ] : []),
   ...( SSR ? [ webpackSsrClient ] : []),
];

module.exports = webpackConfig;