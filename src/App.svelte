<script>

   import Home from './components/home';
   import Menu from './components/menu';
   import Signin from './components/signin';
   import About from './components/about';
   import Router from './libs/router';
   import { spa, ssr, spaHashbang, path, } from './stores';

   export let pathname; // server side var

   let component, router = Router({spa, ssr, pathname});

   router( '*', ( ctx, next) => {

      path.set( ctx.path );
      next && next();
   });
   router( '/',  _=> ( component = Home ));
   router( '/signin', _=> ( component = Signin ));
   router( '/about', _=> ( component = About ));

   if( spa ) {

      router.start({ hashbang: spa && spaHashbang });
   }

</script>

<Menu />

<svelte:component this='{component}' />
