<template>
  <div>

    <navigation />
    <div class="container">
      
      <h1><i class="fa fa-pen float-left d-inline" aria-hidden="true"></i> Admin</h1>

      
      <adminActions />
      <adminTotals />

      <div>

        <nav class="nav grad-2 shadow-black">
          <a class="nav-link text-white" href="javascript:void(0)" @click="view = 'adminUsers'">Users</a>
          <a class="nav-link text-white" href="javascript:void(0)" @click="view = 'adminCategories'">Categories</a>
          <a class="nav-link text-white" href="javascript:void(0)" @click="view = 'adminCampuses'">Campuses</a>
          <a class="nav-link text-white" href="javascript:void(0)" @click="view = 'adminNotifications'">Notifications</a>
          
        </nav>

        <div class="grad p-2 mb-4">
          <component :is="view" />
        </div>

      </div>

    </div>

  </div>
</template>


<script>

import adminCategories from './adminCategories'
import adminCampuses from './adminCampuses'
import adminNotifications from './adminNotifications'
import adminActions from './adminActions'
import adminTotals from './totals'
import adminUsers from './adminUsers'
import {mapActions} from 'vuex'

export default {

  name: "admin",
  data() {
    return {
      view: 'adminUsers'
    }
  },
  components: {
    adminCategories,
    adminCampuses,
    adminNotifications,
    adminTotals,
    adminActions,
    adminUsers
  },

  methods: mapActions(['getUsers']),

  async created() {
    let loader = this.$loading.show()
    await this.getUsers(1)
    loader.hide()
  }
  

}
</script>

<style>

  body {
    margin-top: 80px !important;
  }

</style>
