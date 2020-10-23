<script>
   import { onMount } from 'svelte';
   import Home from './components/Home.svelte';
   import About from './components/About.svelte';

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
      page.start = _=>_;
      initRouter();
   };

   function initRouter() {

      page('/', _=> ( current = Home ))
      page('/about', _=> ( current = About ))
      page.start({ hashbang: SPA });
   };
</script>

<nav>
   <a href='/'>Home</a>
   <a href='/about'>About</a>
</nav>

<svelte:component this='{current}' appName='{appName}' />
