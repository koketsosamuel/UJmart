<template>
  <div>

     <div class="row px-3">

        <div class="col-12 col-sm-12 col-md-8 text-center shadow-orange shadow-black col-lg-8 mb-4">
          <router-link to="/browseads/1/all/all">
            <div class="campus h-100 py-4 bg-dark">
              <h1 class="text-white"><i class="fa fa-building" aria-hidden="true"></i></h1>
              <p class="text-white shadow-black font-weight-bold">All</p> 
            </div>
          </router-link>
        </div>

        <!-- campus -->
        <div v-for="campus in campuses" :key="campus._id" class="col-6 col-sm-6 col-md-4 col-lg-4 text-center shadow-orange mb-4 shadow-black col-lg-3">
          <router-link :to="'/browseads/1/all/'+campus.name">
            <div class="campus h-100 bg-dark p-4 w-100">
              <h1 class="text-white"><i class="fa fa-building" aria-hidden="true"></i></h1>
              <p class="text-white shadow-black font-weight-bold">{{campus.name}}</p> 
            </div>
          </router-link>
        </div>
        <!-- campus END -->


      </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {


  name: 'campuses',

  methods: mapActions(['getCampuses']),

  computed: mapGetters(['campuses']),

  created() {
    this.getCampuses()
  }


}
</script>

<style scoped>

  .campus {
    background: #772953ad;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: #FF4500 5px 5px 0px;
  }

  .campus:hover {
    background: #772953d0;
    box-shadow: #772953 0px 0px 19px;
    text-decoration: none !important;
  }


</style>
