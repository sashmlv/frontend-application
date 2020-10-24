'use strict';

const webpack = require( 'webpack' ),
   { merge } = require( 'webpack-merge' ),
   webpackCommon = require( './webpack.common' ),
   path = require( 'path' ),
   RemovePlugin = require( 'remove-files-webpack-plugin' ),
   CopyPlugin = require( 'copy-webpack-plugin' ),
   ROOT = path.resolve( `${ __dirname }/..` );

module.exports = merge( webpackCommon, {

   entry: {

      index: './src/main.js'
   },
   output: {

      path: `${ ROOT }/dist/client/`,
      filename: '[name].js',
      chunkFilename: '[name].[id].js',
   },
   module: {
      rules: [
         {
            test: /\.svelte$/,
            use: {

               loader: 'svelte-loader',
               options: {

                  hydratable: true,
                  hotReload: false,
                  emitCss: true,
                  css: false,
               }
            }
         },
      ]
   },
   plugins: [

      new RemovePlugin({

         before: {

            root: `${ ROOT }/dist/client`,
            log: true,
            test: [
               {
                  folder: '.',
                  method: _=> true,
                  recursive: true,
               }
            ],
            exclude: [

               `${ ROOT }/dist/client/favicon.ico`,
            ],
         },
      }),
      new CopyPlugin({

         patterns: [
            {
               from: './',
               context: `${ ROOT }/public`,
               globOptions: {

                  /*
                   * for SSR we have dynamic template, not client index.html file,
                   * so we will make requests to the server each time,
                   * ( express route will give response to us each time )
                   */
                  ignore: [ '**/index.html' ],
               },
            },
            {
               from: 'node_modules/bootstrap/dist'
            },
         ]
      }),
   ],
});
