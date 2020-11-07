import App from './App.svelte';
import { ssr } from './stores';

const app = new App({

   target: document.getElementById( 'app' ),
   hydrate: ssr,
});

window.app = app;

export default app;
