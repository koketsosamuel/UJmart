<template>
  
  <div>

    <div class="">
      
      <div class="row text-center">

        <div class="col-md-3 py-4 col-6">
          <div class="card h-100 bg-dark text-white">
            <div class="card-body">
              <h5 class="text-primary py-1">Users</h5>
              <i class="fa fa-users fa-4x"></i>
              <h2 class="font-weight-light text-primary">{{totals.users}}</h2>
            </div>
          </div>
        </div>


        <div class="col-md-3 py-4 col-6">
          <div class="card h-100 bg-dark text-white">
            <div class="card-body">
              <h5 class="text-primary py-1">Ads</h5>
              <i class="fa fa-archive fa-4x"></i>
              <h2 class="font-weight-light text-primary">{{totals.ads}}</h2>
            </div>
          </div>
        </div>

        <div class="col-md-3 py-4 col-6">
          <div class="card h-100 bg-dark text-white">
            <div class="card-body">
              <h5 class="text-primary py-1">Campuses</h5>
              <i class="fa fa-university fa-4x"></i>
              <h2 class="font-weight-light text-primary">{{totals.campuses}}</h2>
            </div>
          </div>
        </div>

        <div class="col-md-3 py-4 col-6">
          <div class="card h-100 bg-dark text-white">
            <div class="card-body">
              <h5 class="text-primary py-1">Categories</h5>
              <i class="fa fa-align-left fa-4x"></i>
              <h2 class="font-weight-light text-primary">{{ totals.categories }}</h2>
            </div>
          </div>
        </div>



      </div>

      

    </div>

  </div>

</template>

<script>
import {mapGetters} from 'vuex'

export default {

  name: "totals",

  data() {
    return {

      totals: {
        ads: "N/A",
        campuses: "N/A",
        categories: "N/A",
        users: "N/A"
      }

    }
  },

  computed: mapGetters(['authInfo']),

  async created() {

    let res = await this.$axios.get("/totals/", {
      headers: {
        Authorization: "Bearer " + this.authInfo.token
      }
    })
    
    this.totals = res.data

  }

}
</script>

<style>

</style>
