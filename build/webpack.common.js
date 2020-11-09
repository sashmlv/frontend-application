'use strict';

const webpack = require( 'webpack' ),
   fs = require( 'fs' ),
   path = require( 'path' ),
   MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ),
   ROOT = path.resolve( `${ __dirname }/..` );

if( ! fs.existsSync( `${ ROOT }/config/server.config.js` )) {

   throw new Error( 'Config not found' );
};

const {

   SPA,
   SSR,
   NODE_ENV,
   DEV_SERVER,
} = require( `${ ROOT }/config/server.config` ),
   { PROXY } = DEV_SERVER,
   production = NODE_ENV === 'production';

module.exports = {

   mode: production ? 'production' : 'development',
   devtool: production ? false: 'source-map',
   devServer: {

      host: DEV_SERVER.HOST,
      port: DEV_SERVER.PORT,
      // writeToDisk: true,
      historyApiFallback: SPA ? true : { index: `/server/`, },
      proxy: {

         [ PROXY.SOURCE ]: PROXY.TARGET,
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
