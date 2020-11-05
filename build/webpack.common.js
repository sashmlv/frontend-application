'use strict';

const webpack = require( 'webpack' ),
   fs = require( 'fs' ),
   path = require( 'path' ),
   MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ),
   ROOT = path.resolve( `${ __dirname }/..` );

if( ! fs.existsSync( `${ ROOT }/config/server.cfg.js` )) {

   throw new Error( 'Config not found' );
};

const {

   SPA,
   SSR,
   HOST,
   PORT,
   NODE_ENV,
} = require( `${ ROOT }/config/server.cfg` ),
   production = NODE_ENV === 'production';

module.exports = {

   mode: production ? 'production' : 'development',
   devtool: production ? false: 'source-map',
   devServer: {

      host: HOST,
      port: PORT,
      historyApiFallback: {

         index: `/server/`,
      },
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

         'process.env.SPA': JSON.stringify( SPA ),
         'process.env.SSR': JSON.stringify( SSR )
      }),
      new MiniCssExtractPlugin({

         filename: 'css/[name].css'
      }),
   ],
};
