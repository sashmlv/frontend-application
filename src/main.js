import App from './App.svelte';
import {SSR, SPA} from '../config.js';

const app = new App({

   target: document.getElementById('app'),
   hydrate: SSR,
   props: {
      appName: 'Dashboard',
      SPA,
   }
});

window.app = app;

export default app;
