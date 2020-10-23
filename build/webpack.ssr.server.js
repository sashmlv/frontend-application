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
      globalObject: 'this',
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

      new CopyPlugin({

         patterns: [
            {
               from: './',
               context: `${ ROOT }/public`,
               to: '../',
            },
         ]
      }),
   ],
});
