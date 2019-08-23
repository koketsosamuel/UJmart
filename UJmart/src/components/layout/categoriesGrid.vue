<template>
  <div>

     <div class="row px-3">

        <div class="col-6 col-sm-6 col-md-4 text-center text-white shadow-black col-lg-3 mb-4">
          <router-link to="/browseads/1/all/all">
            <div class="category h-100 py-4 grad">
              <h1><i class="fa fas fa-cubes" aria-hidden="true"></i></h1>
              <p class="text-black font-weight-bold">All</p> 
            </div>
          </router-link>
        </div>

        <!-- CATEGORY -->
        <div v-for="category in categories" :key="category._id" class="cat-sm col-6 col-sm-6 col-md-4 text-center text-white mb-4 shadow-black col-lg-3">
          <router-link :to="'/browseads/1/'+category._id+'/all'">
            <div class="category h-100 p-4 w-100 grad">
              <h1><i :class="'fa fas fa-'+category.icon" aria-hidden="true"></i></h1>
              <p class="text-black font-weight-bold">{{category.name}}</p> 
            </div>
          </router-link>
        </div>
        <!-- CATEGORY END -->


      </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {


  name: 'categories',

  methods: mapActions(['getCategories']),

  computed: mapGetters(['categories']),

  created() {
    this.getCategories()
  }


}
</script>

<style scoped>

  .category {
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: #772953 15px 15px 10px;
    text-transform: capitalize;
  }

  .category:hover {
    box-shadow: #FF4500 0px 0px 10px;
  }

  @media (max-width: 320px) {
    .cat-sm {
      font-size: 0.8em;
      font-weight: lighter !important;
    }
  }

 


</style>
