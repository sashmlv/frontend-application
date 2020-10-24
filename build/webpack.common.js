'use strict';

const webpack = require( 'webpack' ),
   MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ),
   CopyPlugin = require( 'copy-webpack-plugin' ),
   fs = require( 'fs' ),
   path = require( 'path' ),
   ROOT = path.resolve( `${ __dirname }/..` );

if( ! fs.existsSync( `${ ROOT }/config.js` )) {

   throw new Error( 'Config not found' );
};

const { NODE_ENV } = require( `${ ROOT }/config` ),
   production = NODE_ENV === 'production';

module.exports = {

   mode: production ? 'production' : 'development',
   devtool: production ? false: 'source-map',
   devServer: {

      port: 3000
   },
   resolve: {

      alias: {

         svelte: path.resolve( 'node_modules', 'svelte' )
      },
      extensions: [ '.mjs', '.js', '.svelte' ],
      mainFields: [ 'svelte', 'browser', 'module', 'main' ]
   },
   module: {
      rules: [
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

      new webpack.DefinePlugin({

         'process.env.SPA': JSON.stringify( process.env.SPA ),
         'process.env.SSR': JSON.stringify( process.env.SSR )
      }),
      new MiniCssExtractPlugin({

         filename: 'css/[name].css'
      }),
      new CopyPlugin({

         patterns: [
            {
               from: 'node_modules/bootstrap/dist'
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
