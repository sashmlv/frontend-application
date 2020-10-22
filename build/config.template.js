'use strict';

module.exports = {

   SPA: process.env.SPA === 'true',
   SSR: process.env.SSR === 'true',
   HOST:'localhost',
   PORT: 3000,
   NODE_ENV: process.env.NODE_ENV || 'development',
};
