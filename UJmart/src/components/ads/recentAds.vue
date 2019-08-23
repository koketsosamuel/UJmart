<template>
  
  <div>

    <div class="row mb-4 px-3">

      <div class="col-lg-4 col-sm-6 p-0 mb-4" v-for="ad in ads" :key="ad._id" >
        
        <div class="card h-100 orange mx-1">

          <div class="flex bg-dark" @click="goTo(ad._id)">
            <img :src="baseUrl + ad.images[0].path" alt="">  
          </div>
        

          <div class="row">
            <div class="col-6">
              <div class="price d-block p-2 text-dark font-weight-bold" @click="goTo(ad._id)">
                R {{ad.price}}
              </div>
            </div>
            <div class="col-6">
              <div class="campus text-white d-block p-2 text-right" @click="goTo(ad._id)">
                <i class="fa fa-building"></i> {{ad.campus}}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import config from '../../config/config'

export default {

  name: "recentAds",

  data() {

    return {

      ads: [],
      count: 0,
      baseUrl: null

    }

  },

  methods: {

    async getRecentAds() {

      let res = await this.$axios.get(`/ad/recent`)
      this.ads = res.data.ads
    },

    goTo(id) {
      this.$router.push("/ad/"+id)
    }

  },

  async created() {
    await this.getRecentAds()
    this.baseUrl = config.axiosConf.baseURL
  },

  watch: {

    $route: function () {
      this.getRecentAds()
      this.baseUrl = config.axiosConf.baseURL
    }

  }

  


}
</script>

<style scoped>

.col-lg-4 {
  cursor: pointer;
}

.col-lg-4 img {
  max-width: 100%;
  max-height: 200px;
}

</style>
