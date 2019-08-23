<template>
  
  <div>

    <navigation />

    <div class="container">

      <div class="card-info-sm grad-4 m-fix p-2 mb-3">
        <h4 class="card-title">{{adv.name}}</h4>
        <p class="text-white font-italic m-0">Posted {{posted}}</p>
        <p class="m-0 mb-2"> <i :class="category.icon" aria-hidden="true"></i> {{category.name}} | <i class="fa fa-university" aria-hidden="true"></i> {{adv.campus}}</p>
        <h4 class="text-white m-0 d-inline-block bg-primary p-1 pr-3">R {{adv.price}}</h4>
      </div>
      
      <div class="row px-3 mb-4">

          <div class="card text-white bg-secondary border-0 col-lg-8 px-0">
            <div class="flex">
              <img class="cp" v-if="images.length > 0" :src="images[0]" alt="" @click="index = 0">
              <span v-else class="p-4"><i class="fa fa-image fa-4x"></i> <br> No image</span>
            </div>

          </div>
       
      
          <div class="car py-2 grad-2 col-lg-4">

            <a class="btn btn-dark btn-block" v-if="images.length > 1"  @click="index = 0"><i class="fa fa-image"></i> view pictures</a>

            <p class="font-weight-light m-0 alert alert-info my-2 text-white font-weight-normal bg-info">{{adv.description}}</p>

            <div class="alert alert-dark">
              <h4 class="m-0"><i class="fa fa-user"></i> Seller <span class="badge font-weight-light badge-primary">{{seller.pos}}</span></h4>
              <p class="m-0 text-success"><i class="fab fa-whatsapp"></i> {{seller.whatsAppNo}}</p>    
              <p class="m-0 text-info"><i class="fa fas fa-phone"></i> {{seller.cellNo}}</p>   
              <p class="m-0 text-black"><i class="fa fab fa-envelope"></i> {{seller.email}}</p>          
            </div>

            <div>
              <adManager 
                :id="adv._id" 
                :isDone="whenDone" 
                v-if="authInfo.loggedIn && (authInfo._id == adv.seller || authInfo.position == 'admin')" 
              />
            </div>

            <!-- <button class="btn btn-primary mt-3" @click="share"><i class="fa fa-share" aria-hidden="true"></i> Share</button> -->
            
          </div>
      
      </div>

      <vueGallery :images="images" :index="index" @close="index = null"/>
    
      <hr>

      <recentAds />

    </div>

  </div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import config from '../../config/config'
import authService from '../../services/auth'
import vueGallery from 'vue-gallery-slideshow'
import adManager from './adManager'
import getDate from '../../services/dateGet'
import recentAds from './recentAds'

export default {

  name: "singlead",

  components: {
    vueGallery,
    adManager,
    recentAds
  },

  data() {
    return {
      adv: {
        name: '',
        campus: '',
        price: '',
        description: '',
        quantity: null,
        _id: null,
        seller: null,
        category: null
      },

      seller: {
        pos: null,
        email: '',
        whatsAppNo: null,
        cellNo: null
      },

      images: [],

      category: {
        name: null,
        icon: null
      },

      index: null,

      posted: "",

      authorised: false

    }
  },

  methods: {

    ...mapActions(['getAd']),

    setImages(imageArr) {

      this.images = []

      for(let i = 0; i < imageArr.length; i++) {
        this.images.push(config.axiosConf.baseURL+imageArr[i].path)
      }
    },

    async getCategory(cat) {
      let res = await this.$axios.get('/category/one/'+cat)
      this.category.name = res.data.category.name
      this.category.icon = "fas fa fa-" + res.data.category.icon
    },

    whenDone() {
      this.$router.replace("/")
    },

    getSeller(id) {
      this.$axios('/user/seller/'+id)
        .then(res => {

          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {

            this.seller = res.data.seller

          }

        }).catch(err => {
          // toast
          this.$toasted.error(err,{icon: "times-circle"})
        })
    },

    async postLoad() {
      await this.getAd(this.$route.params.adId)
      this.adv = await this.ad
      await this.getCategory(this.adv.category)
      await this.setImages(this.ad.images)
      await this.getSeller(this.adv.seller)
      this.posted = await getDate(this.adv.added)
    }


  },

  computed: mapGetters(['authInfo', 'ad']),


  async created(){

    let loader = this.$loading.show()
    await this.postLoad()
    loader.hide()

  },

  watch: {
    async $route() {
    
      let loader = this.$loading.show()

      await this.postLoad()
      
      scroll(0,0)

      loader.hide()

    }
  }


}
</script>

<style scoped>

  img {
    transition-property: all!important;
    transition-duration: 0.3s!important;
  }

  .card {
    border-radius: 0px !important;
  }

  .alert {
    text-shadow: none;
  }


  .carousel img {
    width: auto;
    max-width: 100%;
    max-height: 100%;

  }

  .modal-body {
    height: 70vh !important;
    overflow: hidden;
  }

  

  @media (min-width: 992px) {
    .card-info {
      position: absolute !important;
      top: 0px !important;
      width: 100%;
      padding-bottom: 20px;
    }

    .card:hover .card-info {
      opacity: 0.5;
    }

    .card {
      max-height: 70vh !important;
      overflow: hidden;
    }

    .card img {
      max-height: 55vh;
      max-width: 100%;
    }

    /* .card-info-sm {
      display: none;
    } */
  }

  @media (max-width: 990.5px) {
    .card {
      max-height: 70vh !important;
      overflow: hidden;
    }

    .card img {
      max-height: 55vh;
      max-width: 100%;
    }

    .card-info {
      display: none;
    }

    
  }

  .m-fix {
      margin-left: 1px;
      margin-right: 1px;
    }

  

</style>
