'use strict';

const webpack = require( 'webpack' ),
   { merge } = require( 'webpack-merge' ),
   path = require( 'path' ),
   webpackCommon = require( './webpack.common' ),
   RemovePlugin = require( 'remove-files-webpack-plugin' ),
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
      publicPath: '/server/',
   },
   module: {

      rules: [
         {
            test: /\.svelte$/,
            use: {

               loader: 'svelte-loader',
               options: {

                  generate: 'ssr',
                  hotReload: false,
                  emitCss: false,
                  css: false,
               }
            }
         },
      ]
   },
   plugins: [

      new RemovePlugin({

         before: {

            root: `${ ROOT }/dist`,
            log: true,
            test: [{

               folder: '.',
               recursive: true,
               method: path => {

                  const result = /\/dist\/client\/?/.test( path ) ? false :
                     /\/dist\/server$/.test( path ) ? false :
                     /\/dist\/server\/index\.html$/.test( path ) ? false :
                     true;

                  return result;
               },
            }],
         },
      }),
      new CopyPlugin({

         patterns: [
            {
               /*
                * we need only template for render, the rest assets will served from client build
                */
               from: './index.html',
               context: `${ ROOT }/src/public`,
            },
         ]
      }),
   ],
});
