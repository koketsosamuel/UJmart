<template>
  
  <div>

    <navigation />

    <div class="container">
      <h3><i class="fa fa-search"></i> {{$route.params.search}} </h3>

      <ul class="list-group">
        <li
          class="list-group-item grad-2 border-0"
          v-for="ad in ads"
          :key="ad._id"
        >
          <router-link :to="'/ad/'+ad._id">
            <p class="m-0 float-left cursor text-white">
              <i class="fa fa-tag"></i> {{ad.name}}&nbsp;| <i class="fa fa-calendar" aria-hidden="true"></i> <span class="font-italic"> Posted {{getDate(ad.added)}}</span>
            </p>
          </router-link>

          <span class="float-right large-dev">
            <adManager 
              :id="ad._id" 
              :isDone="doneManaging" 
              :auth="true"
              v-if="authInfo.loggedIn && (authInfo._id == ad.seller || authInfo.position == 'admin')"
            />
          </span>
          <div class="clearfix"></div>
        </li>
      </ul>

      <paginate
        v-if="pages > 1"
        :page-count="pages"
        :click-handler="clickEr"
        container-class="pagination mt-4"
        page-class="page-item"
        page-link-class="page-link text-white bg-primary"
        prev-class="page-item"
        prev-link-class="page-link bg-dark text-white"
        next-class="page-item"
        next-link-class="page-link bg-dark text-white"
        active-class="active disabled font-weight-bold"
      />

    </div>


  </div>

</template>

<script>
import {mapGetters} from 'vuex'
import moment from 'moment'
import adManager from './adManager'

// 

export default {

  name: "searchAds",

  components: {
    adManager
  },

  data() {
    return {
      ads: [],
      adsAll: [],
      perPage: 10,
      page: 1,
      pages: 1,
      class: ""
    }
  },

  methods: {

    async getSearchRes() {

      let loader = this.$loading.show()
      let res = await this.$axios.get("/ad/find/"+this.$route.params.search+"/"+ this.$route.params.page)
      
      this.pages = res.data.pages
      this.page = res.data.page
      this.ads = res.data.ads

      loader.hide()


    }, 

    async clickEr(p) {

      this.$router.push('/search/ad/'+this.$route.params.search+"/"+p)      

    },

    doneManaging() {
      this.getSearchRes()
    },

    getDate(date) {
      return moment(date).fromNow()
    },

  },

  computed: mapGetters(['authInfo']),

  watch: {
    async $route() {
      let loader = this.$loading.show()
      await this.getSearchRes()
      scroll(0,0)
      loader.hide()
    }
  },

  async created() {

    let loader = this.$loading.show()
    await this.getSearchRes()
    loader.hide()

  }

}
</script>

<style scoped>

</style>
