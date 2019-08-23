<template>
  <div>


    <div class="row">

        <div class="form-group col-6">
          <label for=""><i class="fa fa-align-left" aria-hidden="true"></i> Category:&nbsp;</label>
          <select class="form-control" v-model="category">
            <option value="all">All Categories</option>
            <option
              v-for="category in categories" 
              :key="category._id"
              :value="category._id"
            >
              {{category.name}}
            </option>
            
          </select>
        </div>
        

        
        <div class="form-group col-6">
          <label for=""><i class="fa fa-university" aria-hidden="true"></i> Campus:&nbsp;</label>
          <select class="form-control" v-model="campus">
            <option value="all">All Campuses</option>
            <option 
              v-for="campus in campuses" 
              :key="campus._id"
              :value="campus.name"
            >
              {{campus.name}}
            </option>
            
          </select>
        </div>


    </div>

    <div class="row">

      <div 
        class="col-lg-6 col-md-6 p-0 px-2 my-1"
        v-for="ad in allAds.ads"
        :key="ad._id"
        @click="$router.push('/ad/'+ad._id)"
      >
        <div class="row grad-3 h-100 mx-1 p-0 cursor">
          <div class="col-6 m-0 p-0">
            <div class="img-cont flex">
              <img :src="baseUrl+ad.images[0].path" alt="" v-if="ad.images.length > 0">
              <p v-else class="py-5 m-0">
                <i class="fa fa-image fa-4x" aria-hidden="true"></i>
                <br>
                No image
              </p>
            </div>

          </div>
          <div class="col-6 bg-dark h-100">
            <h5 class="font-weight-light my-1">{{ad.name}}</h5>
            <p class="font-italic m-0">Posted {{getDate(ad.added)}} </p>
            <p class="font-italic m-0"><i class="fa fa-university" aria-hidden="true"></i> {{ad.campus}} </p>
            <h6 class="badge badge-primary mt-2 font-weight-light">R {{ad.price}}</h6>
          </div>
        </div>
      </div>
      

    </div>

    <paginate
      v-if="allAds.pages > 1"
      :page-count="allAds.pages"
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

    <div v-if="allAds.ads.length == 0">
      <h1 class="text-center py-5">
        <i class="fa fa-box-open fa-2x" aria-hidden="true"></i>
        <br> No ads found
      </h1>
    </div>



  </div>
</template>

<script>
import moment from 'moment'
import config from '../../config/config'
import {mapActions, mapGetters} from 'vuex'

let opts = {
  page: 1,
  category: "all",
  campus: "all"
}

export default {

  name: "allAdds",
  data() {
    return {

      baseUrl: config.axiosConf.baseURL,
      page: 1,
      category: "all",
      campus: "all"

    }


  }, 

  computed: mapGetters(['categories', 'campuses', 'allAds']),

  methods: {

    ...mapActions(['getCategories', 'getCampuses', 'getAllAds']),

    getDate(date) {
      return moment(date).fromNow()
    },

    clickEr(pageNum) {
      opts.page = pageNum
      this.getAllAds(opts)
    },

    boom() {
      window.alert('dd')
    }

  },

  async created() {
    
    let loader = this.$loading.show()

    opts.campus = await this.$route.params.page
    this.campus = await this.$route.params.page

    opts.category = await this.$route.params.cat
    this.category = await this.$route.params.cat

    opts.campus = await this.$route.params.camp
    this.campus = await this.$route.params.camp

    await this.getAllAds(opts)
    await this.getCategories()
    await this.getCampuses()

    loader.hide()

  },

  watch : {
    
    category: async function () {

      let loader = this.$loading.show()

      opts.category = this.category
      opts.page = 1
      await this.getAllAds(opts)

      loader.hide()

    },

    campus: async function() {

      let loader = this.$loading.show()

      opts.campus = this.campus
      opts.page = 1
      await this.getAllAds(opts)

      loader.hide()

    }

  }

}
</script>

<style scoped>

  .img-cont {
    max-height: 200px !important;  
    overflow: hidden !important;
  }

  .img-cont img {
    max-width: 100%;
    max-height: 200px;
  }

  h6 {
    font-size: 16px !important;
  }

  .row {
    overflow: hidden;
  }


  .row.grad-3 {

    height: 200px !important;

  }

  

</style>
