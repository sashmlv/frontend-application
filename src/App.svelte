<script>
   import { onMount } from 'svelte';
   import Home from './components/home';
   import Menu from './components/menu';
   import Signin from './components/signin';
   import About from './components/about';
   import page from './libs/page';

   export let appName, spa, spaHashbang, ssr;

   let router, component, props = {};

   onMount( async _=> {

      router = await page({ spa, ssr });
      router(( ctx, next ) => {
         props.appName = appName;
         props.pathname = spa ? ctx.path : window.location.pathname;
         return next();
      });
      router( '/', _=> ( component = Home ));
      router( '/signin', _=> ( component = Signin ));
      router( '/about', _=> ( component = About ));
      router.start && router.start({ hashbang: spa && spaHashbang });
   });
</script>

<Menu {...props}/>

<svelte:component this='{component}' {...props}/>
