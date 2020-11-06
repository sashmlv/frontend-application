<script>

   import Home from './components/home';
   import Menu from './components/menu';
   import Signin from './components/signin';
   import About from './components/about';
   import router from './libs/router';
   import { read, path } from './stores';

   let component,
      spa = read( 'spa' ),
      spaHashbang = read( 'spaHashbang' );

      router( '*', ( ctx, next) => ( path.set( ctx.path ), next()));
      router( '/', _=> ( component = Home ));
      router( '/signin', _=> ( component = Signin ));
      router( '/about', _=> ( component = About ));

      if( spa ) {

         router.start({ hashbang: spa && spaHashbang });
      }

</script>

<Menu />

<svelte:component this='{component}' />
