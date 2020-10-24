/**
 * Router for spa and ssr
 * @param {object} data
 * @param {boolean} data.spa
 * @param {boolean} data.ssr
 * @return {function} Return page router
 **/
export default async function router({ spa, ssr }) {

   const page = spa ? ( await import( 'page' )).default :
      ssr ? ( path, callback ) => ( path === window.location.pathname && callback()) :
      undefined;

   return page;
};
