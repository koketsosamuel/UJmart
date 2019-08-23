<template>
   
    <nav class="navbar navbar-expand-lg navbar-primary bg-primary fixed-top border-dark orange">
      <div class="container text-white">

        <!-- NAME -->
        <router-link to="/">
          <a class="navbar-brand text-white p-2 bg-dark font-weight-light"><span class="text-primary font-weight-bold">UJ</span>mart</a>
        </router-link>


        <button class="btn bg-black text-white font-weight-bold navbar-toggle" data-target="#my-nav" data-toggle="collapse" aria-controls="my-nav" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fa fa-bars" aria-hidden="true"></i> MENU
        </button>
        <div id="my-nav" class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">

            <router-link to="/" exact>
              <li class="nav-item">
                <a class="nav-link text-dark font-weight-bold" href="javascript: void(0)"><i class="fa fa-home" aria-hidden="true"></i> Home<span class="sr-only">(current)</span></a>
              </li>
            </router-link>

            <router-link to="/browseads/1/all/all">
              <li class="nav-item mr-4">
                <a href="javascript: void(0)" class="nav-link text-dark font-weight-bold">Browse Ads</a>
              </li>
            </router-link>


            
            <!-- USER LINK -->
            <li class="nav-item">
              <div class="dropdown">
                <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-user"></i>&nbsp;&nbsp;
                  <span v-if="authInfo.loggedIn">{{authInfo.position}}</span>
                  <span v-else>Login</span>
                </button>


                <div class="dropdown-menu mt-2 py-0 border-dark" aria-labelledby="dropdownMenuButton">

                  <router-link to="/profile" v-if="authInfo.loggedIn"> 
                    <a class="dropdown-item" href="javascript: void(0)"><i class="fa fa-user"></i> Profile</a>
                  </router-link>

                  <router-link to="/myads" v-if="authInfo.loggedIn">
                    <a class="dropdown-item" href="javascript: void(0)"><i class="fa fa-cube"></i> My Ads</a>
                  </router-link>

                  <router-link to="/admin" v-if="authInfo.loggedIn && authInfo.position == 'admin'"> 
                    <a class="dropdown-item" href="javascript: void(0)"><i class="fa fa-user-lock"></i> Admin Panel</a>
                  </router-link>

                  <router-link to="/" v-if="authInfo.loggedIn"> 
                    <a class="dropdown-item" href="javascript: void(0)" @click="logout"><i class="fa fa-sign-out-alt"></i> Logout</a>
                  </router-link>

                  <router-link to="/register" v-if="!authInfo.loggedIn">
                    <a class="dropdown-item" tabindex="-1" aria-disabled="true" href="javascript: void(0)"><i class="fa fa-user-plus" aria-hidden="true"></i> Register</a>
                  </router-link>

                  <router-link to="/login" v-if="!authInfo.loggedIn">
                    <a class="dropdown-item" tabindex="-1" aria-disabled="true" href="javascript: void(0)"><i class="fa fa-user" aria-hidden="true"></i> Login</a>
                  </router-link>

                </div>


              </div>
            </li>


          </ul>

          <router-link to="/addPost">
            <button class="btn btn-dark mr-4 my-2">Post Ad</button>
          </router-link>
          

          <form class="form-inline my-2 my-lg-0" @submit="search">
              <input class="form-control mr-sm-2" type="search" v-model="query" placeholder="Search Ads" aria-label="Search Ads" required>
              <button 
                class="btn btn-outline-dark my-2 my-sm-0" 
                type="submit">
                  <i class="fa fa-search" aria-hidden="true"></i>
              </button>
          </form>


        </div>



      </div>

      

    </nav>
</template>

<script>

// importations
import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'navigation',

  data() {

    return {

      query: null

    }

  },

  methods: {

    ...mapActions(['DeAuth']),

    logout() {
      this.DeAuth()
      this.$toasted.success("Logged Out", {icon: "check"})
    },

    search(e) {

      e.preventDefault()
      this.$router.push('/search/ad/'+this.query+"/"+1)

    }
    
  },

  computed: mapGetters(['authInfo'])

}
</script>

<style scoped>

  @media (min-width: 992px) {

    .navbar-toggle {
      display: none !important;
    }

    ul .active li {

      background: rgba(255, 255, 255, 0.39); 
      color: antiquewhite !important;
      border: rgb(162, 2, 255) solid 1px;

    }

  }


  body {
    /* margin-bottom: -1000px; */
    margin-top: 60px !important;
  }

  .bg-black {
    background: #000;
  }

  .active {
    color: rgb(94, 94, 94) !important;
  }


</style>
