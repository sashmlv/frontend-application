<script>
   import { onMount } from 'svelte';
   import Home from './components/home';
   import About from './components/about';
   import page from './libs/page';

   export let appName, spa, ssr;

   let router, current;

   onMount( async _=> {

      router = await page({ spa, ssr });
      router('/', _=> ( current = Home ))
      router('/about', _=> ( current = About ))
      router.start && router.start({ hashbang: spa });
   });
</script>

<nav>
   <a href='/'>Home</a>
   <a href='/about'>About</a>
</nav>

<svelte:component this='{current}' appName='{appName}' />
