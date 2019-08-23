<template>
  <div id="app">

    <!-- INJECTED COMPONENT -->
    <router-view></router-view>

    <div class="footer-container">
      <footer-component />
    </div>

    <router-link to="/addPost">
      <button class="btn orange mr-4 my-2 post-add">Post Ad</button>
    </router-link>

  </div>
</template>

<script>

// importations
import { mapActions, mapGetters } from 'vuex'
import jsCookies from 'js-cookie'

export default {
  name: 'app',

  methods: {
    ...mapActions(['authenticate']),

    auth() {
      let r = this.$route.name
      let protectedRoutes = ["admin","addPost","editPost","managePictures","profile","myAds", "searchUser"]
      let adminRoutes = ["admin", "searchUser"]

      if(!this.authInfo.loggedIn) {

        if(protectedRoutes.includes(r)) {
          this.$toasted.error("Login first", {icon: "times-circle"})
          this.$router.replace("/login")
        }

      } else {

        if(this.authInfo.position != 'admin' && adminRoutes.includes(r)) {
          this.$toasted.error("Not Authorized", {icon: "times-circle"})
          this.$router.replace("/")
        }

      }
    }
  },

  computed: mapGetters(['authInfo']),

  async created() {

    if(jsCookies.getJSON('4u7h3n71c4710n') != undefined){
      await this.authenticate(jsCookies.getJSON('4u7h3n71c4710n').authData)
    }

    this.auth()

  },

  watch: {

    $route() {

      this.auth()

    }

  }
}
</script>

<style>

  * {
    border-radius: 0px !important;
  }

  body {
    min-height: 100%;
    padding-bottom: 90px !important;
  }

  .footer-container {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 80px;
  }

  .cursor {
    cursor: pointer;
  }

  .jumboImage {
    height: 200px;
    vertical-align: middle;
  }

  .orange {
    background: #FF4500 !important;
    color: #fff !important;
    transition: all 0.3s;
  }

  .btn.orange:hover {
    background: rgb(212, 57, 0) !important;
  }

  .text-orange {
    color: #FF4500 !important;
  }

  .btn {
    cursor: pointer;
  }

  body {
    margin-top: 40px !important;
  }

  ::-webkit-scrollbar {
    width: 10px;
    background: #FF4500;
  }

  ::-webkit-scrollbar-thumb {      
    background: #b8b7b7;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #772953;
  }

  .shadow-black {
    text-shadow: #000 2px 2px 2px;
  }

  .shadow-white {
    text-shadow: rgb(255, 255, 255) 1px 1px 1px;
  }

  .shadow-orange {
    text-shadow: #FF4500 2px 2px 1px;
  }
  
  .grad {
    transition: all 0.3s;
    color: #fff;
    text-shadow: #000 2px 2px 2px;
    background: rgba(255, 68, 0, 0.74); /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FF4500,  #00000046); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FF4500, #00000046);
  }

  .grad p {
    text-shadow: #000 0px 0px 0px;
  }

  .grad-2 {
    transition: all 0.3s;
    color: #fff;
    text-shadow: #000 2px 2px 2px;
    background: #6e047c; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #6e047c, #ee49d800); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #6e047c, #00000046);
  }

  .grad-2 p {
    text-shadow: #000 0px 0px 0px;
  }

  .grad-3 {
    transition: all 0.3s;
    color: #fff;
    text-shadow: #000 2px 2px 2px;
    background: rgba(255, 68, 0, 0.582); /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FF4500,  #00000000); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FF4500, #00000000);
  }

  .grad-4 p {
    text-shadow: #000 0px 0px 0px;
  }
  
  .grad-4 {
    transition: all 0.3s;
    color: #fff;
    text-shadow: #000 2px 2px 2px;
    background: #6e047c; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #6e047c, #ee49d800); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #6e047c, #00000000);
  }

  .list-group-item {
    text-shadow: #000 0px 0px 0px;
  }

  .red {
    background: rgba(255, 0, 0, 0.596); /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ff0000, #ee49d800); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ff0000, #570000a4, rgb(235, 0, 0));
    text-shadow: rgb(255, 2, 2) 0px 0px 0px;
    transition: all 0.3s;
    cursor: pointer;
  }

  .red:hover {
    color: rgb(253, 0, 0)
  }
  
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  } 

  .post-add {
    position: fixed !important;
    right: 0;
    bottom: 20px;
    transition: 0.3s all;
    opacity: 0.75;
  }

  .post-add:hover {
    opacity: 1;
  }

  @media (max-width: 576px) {

    .col-md-8.mx-auto h2 span.float-left {
      font-size: 20px;
      margin-top: 5px; 
    }

  }

</style>
