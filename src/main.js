import App from './App.svelte';
import {SSR, SPA} from '../config/client.cfg';

const app = new App({

   target: document.getElementById( 'app' ),
   hydrate: SSR,
   props: {
      appName: 'dashboard',
      spa: SPA,
      ssr: SSR,
   },
});

window.app = app;

export default app;
