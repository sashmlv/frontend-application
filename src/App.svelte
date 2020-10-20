<script>
   import {Router, Link, Route} from 'svelte-routing';
   import Home from './components/Home.svelte';
   import About from './components/About.svelte';
   export let url = '';
   export let appName;
</script>

<Router url='{url}'>
  <nav>
    <Link to='/'>Home</Link>
    <Link to='about'>About</Link>
  </nav>
  <div>
    <Route path='/'><Home appName="{appName}"/></Route>
    <Route path='about'><About appName="{appName}"/></Route>
  </div>
</Router>
