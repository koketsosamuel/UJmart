import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from './store'
import config from './config/config'
import toasted from 'vue-toasted'
import loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import paginate from 'vuejs-paginate'
 

// AXIOS SETUP
Vue.prototype.$axios = axios.create(config.axiosConf)

// COMPONENTS
import home from './components/main/home.vue'
import nav from './components/layout/nav.vue'
import notifications from './components/layout/notifications.vue'
import login from './components/auth/login.vue'
import register from './components/auth/register.vue'
import addPost from './components/ads/addPost.vue'
import browseAds from './components/ads/browseAds.vue'
import footerComponent from './components/layout/footer.vue'
import admin from './components/admin/admin.vue'
import myads from './components/ads/myads.vue'
import singleAd from './components/ads/singleAd.vue'
import profile from './components/auth/profile.vue'
import four04 from './components/main/404'
import editPost from './components/ads/editPost.vue'
import picManage from './components/ads/picManage.vue'
import searchAds from './components/ads/searchAds'
import vm from 'vue-simple-markdown'
import 'vue-simple-markdown/dist/vue-simple-markdown.css'
import searchUsers from './components/admin/searchUsers.vue'
import resetPwd from './components/auth/resetPwd.vue'


// COMPONENTS SETUP
Vue.config.productionTip = false
Vue.component('navigation', nav)
Vue.component('notifications', notifications)
Vue.component('footer-component', footerComponent)
Vue.component('paginate', paginate)

// MIDDLEWARE
Vue.use(VueRouter)
Vue.use(toasted, {position: "bottom-left", iconPack: "fontawesome", duration: 5000})
Vue.use(vm)
Vue.use(loading,{
  isFullScreen: false,
  canCancel: false,
  loader: "bars",
  color: "#FF4500",
  height: 200,
  width: 200,
  backgroundColor: "#6e047c",
  zIndex: 7000,
  opacity: 1
})


// MY ROUTES
const routes = [
  
  {
    path: "/ad/:adId",
    component: singleAd,
    alias: '/adv',
    name: "singleAd"
  },
  {
    path: '/', 
    component: home,
    name: "home"
  },
  {
    path: '/login', 
    component: login,
    name: "login"
  },
  {
    path: '/register', 
    component: register,
    name: "register"
  },
  {
    path: '/addpost', 
    component: addPost,
    name: "addPost"
  },
  {
    path: "/editpost/:adId",
    component: editPost,
    name: "editPost"
  },
  {
    path: "/managepics/:adId",
    component: picManage,
    name: "managePictures"
  }
  ,
  {
    path: '/browseads/:page/:cat/:camp', 
    component: browseAds,
    name: "browseAds"
  },
  {
    path: '/admin', 
    component: admin,
    name: "admin"
  },
  {
    path: "/myads",
    component: myads,
    name: "myAds"
  },
  {
    path: "/profile",
    component: profile,
    name: "profile"
  },
  {
    path:"/search/ad/:search/:page",
    component: searchAds,
    name: "searchAd"
  },
  {
    path:"/search/user/:search/:page",
    component: searchUsers,
    name: "searchUser"
  },
  {

    path: "/pwdreset/:token",
    component: resetPwd,
    name: "passwordReset"

  },
  {
    path: "*",
    component: four04,
    name: "notFound"
  }

]


let router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

// 
new Vue({
  router,
  store,
  render: h => h(App)
  
}).$mount('#app')
