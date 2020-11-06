import { read } from '../stores';
import page from 'page';

/**
 * Router for spa and ssr
 **/
export default read( 'spa' ) ? page :
   read( 'ssr' ) ? ( path, callback ) => ( path === window.location.pathname && callback()) :
   undefined;
