'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin'),
   CopyPlugin = require('copy-webpack-plugin'),
   {CleanWebpackPlugin} = require('clean-webpack-plugin'),
   path = require('path'),
   dotenv = require('dotenv'),
   ROOT = path.resolve(`${__dirname}/..`),
   NODE_ENV = process.env.NODE_ENV || 'development',
   production = NODE_ENV === 'production';

let env = dotenv.config({path: `${ROOT}/.env`});

if (env.error) {

   throw env.error;
}

env = env.parsed;
env.NODE_ENV = NODE_ENV;

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

         svelte: path.resolve('node_modules', 'svelte')
      },
      extensions: ['.mjs', '.js', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main']
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
               /**
                * MiniCssExtractPlugin doesn't support HMR.
                * For developing, use 'style-loader' instead.
                * */
               production ? MiniCssExtractPlugin.loader : 'style-loader',
               'css-loader'
            ]
         }
      ]
   },
   plugins: [

      new CleanWebpackPlugin(),
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
               to: '../',
            },
            // {
            //    from: '*.css',
            //    context: path.resolve(__dirname, 'public'),
            //    to: 'css/'
            // },
         ]
      }),
   ],
};
