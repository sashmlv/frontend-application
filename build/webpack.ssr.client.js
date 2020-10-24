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

                  emitCss: true,
                  hotReload: false,
                  hydratable: true,
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

               `${ ROOT }/dist/client/index.html`,
               `${ ROOT }/dist/client/favicon.ico`,
            ],
         },
      }),
      new CopyPlugin({

         patterns: [
            {
               from: './',
               context: `${ ROOT }/public`,
            },
         ]
      }),
   ],
});
