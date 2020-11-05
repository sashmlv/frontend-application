import App from './App.svelte';
import { SSR, SPA, SPA_HASHBANG } from '../config/client.cfg';

const app = new App({

   target: document.getElementById( 'app' ),
   hydrate: SSR,
   props: {
      appName: 'dashboard',
      spa: SPA,
      spaHashbang: SPA_HASHBANG,
      ssr: SSR,
   },
});

window.app = app;

export default app;
