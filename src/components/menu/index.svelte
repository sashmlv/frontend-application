<script>

   import { onDestroy } from 'svelte';
   import { path } from '../../stores';

   let pathVal;

   const unsubscribe = path.subscribe( val => {

      pathVal = val;
   });

   onDestroy( unsubscribe );

</script>

<style>
</style>

<div class='container'>
   <div class='row'>
      <div class='col-md-4 mx-auto'>
         <nav class='navbar navbar-expand-sm navbar-dark bg-primary'>
            <div class='container-fluid'>
               <div class='collapse navbar-collapse justify-content-md-center'>
                  <ul class='navbar-nav'>
                     <li class='nav-item active'>
                        <a href='/' class='nav-link {pathVal === "/" ? "active" : ""}'>Home</a>
                     </li>
                     <li class='nav-item'>
                        <a href='/signin' class='nav-link {pathVal === "/signin" ? "active" : ""}'>Signin</a>
                     </li>
                     <li class='nav-item'>
                        <a href='/about' class='nav-link {pathVal === "/about" ? "active" : ""}'>About</a>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </div>
   </div>
</div>
