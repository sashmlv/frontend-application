'use strict';

const webpack = require( 'webpack' ),
   MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ),
   CopyPlugin = require( 'copy-webpack-plugin' ),
   {CleanWebpackPlugin} = require( 'clean-webpack-plugin' ),
   fs = require( 'fs' ),
   path = require( 'path' ),
   ROOT = path.resolve( `${__dirname}/..` );

if( ! fs.existsSync( `${ROOT}/config.js` )) {

   throw new Error( 'Config not found' );
};

const {NODE_ENV} = require( `${ROOT}/config` ),
   production = NODE_ENV === 'production';

module.exports = {

   mode: production ? 'production' : 'development',
   devtool: production ? false: 'source-map',
   devServer: {

      port: 3000
   },
   entry: {

      index: './src/main.js'
   },
   resolve: {

      alias: {

         svelte: path.resolve( 'node_modules', 'svelte' )
      },
      extensions: [ '.mjs', '.js', '.svelte' ],
      mainFields: [ 'svelte', 'browser', 'module', 'main' ]
   },
   output: {

      path: `${ROOT}/dist/client/`,
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
         {
            test: /\.css$/,
            use: [

               MiniCssExtractPlugin.loader,
               'css-loader'
            ]
         }
      ]
   },
   plugins: [

      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({

         'process.env.SSR': JSON.stringify(process.env.SSR)
      }),
      new MiniCssExtractPlugin({

         filename: 'css/[name].css'
      }),
      new CopyPlugin({

         patterns: [
            {
               from: 'node_modules/bootstrap/dist'
            },
            {
               from: 'index.html',
               context: `${ROOT}/public`,
               // to: '../',
            },
            // {
            //    from: '*.css',
            //    context: `${ROOT}/public`,
            //    to: 'css/'
            // },
         ]
      }),
   ],
};
