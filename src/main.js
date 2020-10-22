import App from './App.svelte';
import {SSR} from '../config.js';

const app = new App({

   target: document.getElementById('app'),
   hydrate: SSR,
   props: {
      appName: 'Dashboard',
   }
});

window.app = app;

export default app;
