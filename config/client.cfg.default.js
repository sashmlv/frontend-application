'use strict';

const config = {

   SPA: !! process.env.SPA,
   SPA_HASHBANG: !! process.env.SPA_HASHBANG,
   SSR: !! process.env.SSR,
};

module.exports = config;
