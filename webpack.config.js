'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin'),
   CopyPlugin = require('copy-webpack-plugin'),
   path = require('path'),
   mode = process.env.NODE_ENV || 'development',
   production = mode === 'production';

module.exports = {

   mode,
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

      path: __dirname + '/dist',
      filename: '[name].js',
      chunkFilename: '[name].[id].js'
   },
   module: {
      rules: [
         {
            test: /\.svelte$/,
            use: {
               loader: 'svelte-loader',
               options: {
                  emitCss: true,
                  hotReload: true
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

      new MiniCssExtractPlugin({

         filename: '[name].css'
      }),
      new CopyPlugin({

         patterns: [

            { from: 'public' },
         ]
      }),
   ],
   devtool: production ? false: 'source-map'
};
