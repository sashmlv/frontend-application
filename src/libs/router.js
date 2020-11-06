import page from 'page';

/**
 * Return router function for spa or ssr
 * @param {object} data
 * @param {boolean} data.spa
 * @param {boolean} data.ssr
 * @param {string} data.pathname - from server side, see App.svelte
 * @return {function} Return router
 **/
function Router({ spa, ssr, pathname }) {

   if( spa ){

      return page;
   }

   if( ssr ){

      /**
       * Router function for ssr
       * this function working on server side and on client side
       * same params like in page.js
       * @param {string} path - target url
       * @param {function} callback - execute this function when target url will match to page url
       * @return {undefined} Return undefined
       **/
      return function router( path, callback ){

         const match = '*' === path ||
            path === ( pathname || window.location.pathname );

         if( match ){

            callback({ path: ( pathname || window.location.pathname )}); // pass path like in page.js -> ctx.path
         }
      };
   }

   return undefined;
}

export default Router;
