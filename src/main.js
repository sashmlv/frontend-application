import App from './App.svelte';
import {SSR, SPA} from '../config.js';

const app = new App({

   target: document.getElementById( 'app' ),
   hydrate: SSR,
   props: {
      url: window.location.pathname,
      appName: 'Dashboard',
      SPA,
      SSR,
   },
});

window.app = app;

export default app;
