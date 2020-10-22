'use strict';

const webpack = require( 'webpack' ),
   { merge } = require( 'webpack-merge' ),
   path = require( 'path' ),
   webpackCommon = require( './webpack.common' ),
   CopyPlugin = require( 'copy-webpack-plugin' ),
   ROOT = path.resolve( `${ __dirname }/..` );

module.exports = merge( webpackCommon, {

   entry: {

      index: './src/App.svelte',
   },
   output: {

      libraryTarget: 'commonjs',
      path: `${ ROOT }/dist/server/`,
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
                  generate: 'ssr',
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
               from: 'index.html',
               context: `${ ROOT }/public`,
               to: '../',
            },
         ]
      }),
   ],
});
