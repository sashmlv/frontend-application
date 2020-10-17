<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Index from './components/Index.svelte';
  import About from './components/About.svelte';
  export let url = '';
  export let appName;
</script>

<Router url='{url}'>
  <nav>
    <Link to='/'>Index</Link>
    <Link to='about'>About</Link>
  </nav>
  <div>
    <Route path='/'><Index appName={appName} /></Route>
    <Route path='about'><About appName={appName} /></Route>
  </div>
</Router>
