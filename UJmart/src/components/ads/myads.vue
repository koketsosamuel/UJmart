<template>
  
  <div>


    <navigation />

    <div class="container">

      <h3>My Ads</h3>

      <ul class="list-group">
        <li
          class="list-group-item grad-2 border-0"
          v-for="ad in myAds.ads"
          :key="ad._id"
        >
          <p class="m-0 float-left cursor" @click="viewAd(ad._id)">
            <i class="fa fa-tag"></i> {{ad.name}}&nbsp;| <i class="fa fa-calendar" aria-hidden="true"></i> <span class="font-italic"> Posted {{getDate(ad.added)}}</span>
          </p>

          <span class="float-right large-dev">
            <adManager :id="ad._id" :isDone="doneManaging" :auth="true" />
          </span>
          <div class="clearfix"></div>
        </li>
      </ul>

      <div v-if="myAds.ads.length == 0">
        <h1 class="display-1 text-center">
          <i class="fa fa-cubes fa-2x" aria-hidden="true"></i>
          <br> No Ads
        </h1>
      </div>

    </div>


  </div>

</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import moment from 'moment'
import adManager from './adManager'
import jsCookies from 'js-cookie'

export default {
  name: "myads",
  data() {
    return {
      ad: {
        _id: null,
        name: null,
        images: [],
        price: null
      },

      id: null
    }
  },
  components: {
    adManager
  },
  methods: {
    ...mapActions(['getMyAds']),

    viewAd(id) {
      this.$router.push('/ad/'+id)
    },

    getDate(date) {
      return moment(date).fromNow()
    },

    doneManaging() {
      this.getMyAds()
    }

  },
  computed: mapGetters(['myAds']),
  async created() {

    let loader = this.$loading.show()
    await this.getMyAds()
    loader.hide()

  }
}


</script>

<style>

  @media (max-width: 992px) {

    .large-dev {
      display: none !important;
    }

  }

</style>
