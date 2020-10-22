'use strict';

module.exports = {

   SPA: !! process.env.SPA,
   SSR: !! process.env.SSR,
   HOST:'localhost',
   PORT: 3000,
   NODE_ENV: process.env.NODE_ENV || 'development',
};
