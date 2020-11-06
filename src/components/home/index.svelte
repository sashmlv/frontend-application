<script>

   import { read } from '../../stores';

   const appName = read( 'appName' );

</script>

<style>
</style>

<div class='container'>
   <div class='row'>
      <div class='col-md-4 mx-auto text-center p-5'>
         <p class='h4 mb-4' style='color: #20639B;'>Home {appName}!</p>
      </div>
   </div>
</div>
