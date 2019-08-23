<template>
  <div>

    <navigation />

    <div class="col-10 col-md-8 mx-auto form bg-dark p-4 text-primary" style="margin-top:60px">

      <h2>
        <span class="float-left"><i class="fa fa-lock d-inline"></i> Reset Password</span>
        <router-link to="/">
          <span class="float-right btn btn-primary"><i class="fa fa-home" aria-hidden="true"></i> Home</span>
        </router-link>
      </h2>
      <div class="clearfix"></div>
      <hr>

      <!-- PWD -->
      <div class="form-group">
        <label for="pwd"><i class="fa fa-lock" aria-hidden="true"></i> Password</label>
        <input v-model="pwd" type="password" id="pwd" class="form-control" placeholder="e.g 212002355" aria-describedby="helpName">
      </div>

      <div class="form-group">
        <label for="pwd2"><i class="fa fa-lock" aria-hidden="true"></i> Confirm Password</label>
        <input v-model="pwd2" type="password" id="pwd2" class="form-control" placeholder="e.g 212002355" aria-describedby="helpName">
      </div>

      <button class="btn btn-primary btn-lg" @click="reset">
        Reset
      </button>

    </div>

    <div class="col-11 col-md-8 mx-auto">
      <h3 class="mb-3">
        <i class="fa fa-archive" aria-hidden="true"></i> Ads
      </h3>
      <random />
    </div>

  </div>
</template>

<script>
import random from "../ads/recentAds"

export default {

  name: "pwdReset",

  data() {

    return {

      pwd: null,
      pwd2: null

    }

  },

  components: {
    random
  },

  methods: {

    reset() {

      

      if(this.pwd != this.pwd2) {
        this.$toasted.error("Passwords do not match", {icon: "times-circle"})
      } else if(this.pwd == null || this.pwd == "") {
        this.$toasted.error("Enter password", {icon: "times-circle"})
      } else {

        let loader = this.$loading.show()

        this.$axios.post("/user/reset/"+this.$route.params.token, {
          pwd: this.pwd
        }).then(res => {

          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})
            this.$router.replace("/login")
          }

          loader.hide()

        }).catch(err => {
          this.$toasted.error(err, {icon: "times-circle"})
          loader.hide()
        })

      }

    }

  }

}
</script>

<style scoped>

</style>
