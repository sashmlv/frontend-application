'use strict';

const config = {

   SPA: !! process.env.SPA,
   SSR: !! process.env.SSR,
   HOST: 'localhost',
   PORT: 3000,
   NODE_ENV: process.env.NODE_ENV || 'development',
   DEBUG: true,
};

if( config.DEBUG ){

   process.env.DEBUG = 'express:*';
};

module.exports = config;
