import App from './App.svelte';

const app = new App({

   target: document.getElementById('app'),
   hydrate: true,
   props: {
      appName: 'Dashboard'
   }
});

window.app = app;

export default app;
