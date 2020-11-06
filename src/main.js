import App from './App.svelte';
import { SSR } from '../config/client.cfg';

const app = new App({

   target: document.getElementById( 'app' ),
   hydrate: SSR,
});

window.app = app;

export default app;
