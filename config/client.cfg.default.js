'use strict';

const config = {

   SPA: !! process.env.SPA,
   SSR: !! process.env.SSR,
};

module.exports = config;
