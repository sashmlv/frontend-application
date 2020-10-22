'use strict';

const webpack = require( 'webpack' ),
   { merge } = require( 'webpack-merge' ),
   webpackCommon = require( './webpack.common' ),
   path = require( 'path' ),
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

      new webpack.DefinePlugin({

         'process.env.SSR': JSON.stringify( process.env.SSR )
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
