'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin'),
   CopyPlugin = require('copy-webpack-plugin'),
   {CleanWebpackPlugin} = require('clean-webpack-plugin'),
   path = require('path'),
   mode = process.env.NODE_ENV || 'development',
   production = mode === 'production';

module.exports = {

   mode,
   devtool: production ? false: 'source-map',
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
               context: path.resolve(__dirname, 'public'),
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
