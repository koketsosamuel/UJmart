<template>
  <div>

    <navigation />
  
    <div class="col-8 mx-auto text-center grad-2 p-5">
      
      <h1><i class="fa fa-question-circle fa-2x" aria-hidden="true"></i></h1>
      <h1 class="display-4">404</h1>
      <p class="alert alert-primary">whatever was here could have been deleted or it does not exist... Just go to the home page</p>
    
      <router-link to="/">
        <h1 class="btn btn-lg btn-primary"><i class="fa fa-home fa-2x" aria-hidden="true"></i> <br> Home</h1>
      </router-link>

    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
