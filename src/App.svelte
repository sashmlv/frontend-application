<script>
   import { onMount } from 'svelte';
   import Home from './components/home';
   import About from './components/about';

   export let url;
   export let appName;
   export let SPA;
   export let SSR;

   let page, current;

   if( SPA ){

      onMount( async _=> {

         page = ( await import( 'page' )).default;
         initRouter();
      });
   }
   else if( SSR ){

      page = ( path, callback ) => ( url === path && callback());
      initRouter();
   };

   function initRouter() {

      page('/', _=> ( current = Home ))
      page('/about', _=> ( current = About ))
      page.start && page.start({ hashbang: SPA });
   };
</script>

<nav>
   <a href='/'>Home</a>
   <a href='/about'>About</a>
</nav>

<svelte:component this='{current}' appName='{appName}' />
