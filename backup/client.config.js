'use strict';

const config = {

   SPA: !! process.env.SPA,
   SPA_HASHBANG: true,
   SSR: !! process.env.SSR,
};

module.exports = config;
