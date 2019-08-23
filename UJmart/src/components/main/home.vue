<template>
  <div>
    <div class="container pt-2 mt-5 pb-4">

      <navigation /> 
      <notifications />

      <!-- BROWSE -->
      <h3><i class="fa fa-align-left" aria-hidden="true"></i> Categories</h3>
      <hr>

      <categories-grid />

      <h3 class="mt-4"><i class="fa fa-university" aria-hidden="true"></i> Campuses</h3>
      <hr>
      <campus-grid />

      <hr>

      <random />


    </div>


  </div>

</template>

<script>
import campGrid from '../layout/campusesGrid'
import catGrid from '../layout/categoriesGrid'
import random from '../ads/recentAds'

export default {

  name: "home",

  components: {
    "campus-grid": campGrid,
    "categories-grid": catGrid,
    random
  }

}
</script>

<style>

</style>
