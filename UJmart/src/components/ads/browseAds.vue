<template>
  <div>
    
    <navigation />

    <div class="container mb-5">
      <allAds />
    </div>

  </div>
</template>

<script>
import allAds from './allAds'
import {mapActions, mapGetters} from 'vuex'

export default {

  name: 'browseAds',

  components: {
    allAds
  }
  
  
}
</script>

<style>

</style>
