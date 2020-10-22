<script>
   import {Router, Link, Route} from 'svelte-routing';
   import Home from './components/Home.svelte';
   import About from './components/About.svelte';
   export let url = '';
   export let appName, SPA;
   const hash = SPA ? '/#' : '';
</script>

<Router url='{url}' hash="{SPA}">
  <nav>
    <Link to="/">Home</Link>
    <Link to="{hash}/about">About</Link>
  </nav>
  <div>
    <Route path='/'><Home appName="{appName}"/></Route>
    <Route path='{hash}/about'><About appName="{appName}"/></Route>
  </div>
</Router>
