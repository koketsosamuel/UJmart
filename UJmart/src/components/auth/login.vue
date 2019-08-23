<template>
  
  <div>

  <div class="col-10 col-md-8 mx-auto form bg-dark p-4 text-primary" style="margin-top:60px">

    <h2>
      <span class="float-left"><i class="fa fa-user d-inline"></i> Login</span>
      <router-link to="/">
        <span class="float-right btn btn-primary"><i class="fa fa-home" aria-hidden="true"></i> Home</span>
      </router-link>
    </h2>
    <div class="clearfix"></div>
    <hr>

    <!-- STUDENT NO -->
    <div class="form-group">
      <label for="sNo"><i class="fa fa-graduation-cap" aria-hidden="true"></i> Student No. | <i class="fa fa-id-card"></i> number on your UJ card</label>
      <input v-model="sNo" type="text" id="sNo" class="form-control" placeholder="e.g 212002355" aria-describedby="helpName">
    </div>


    <div class="form-group">
      <label for="pwd"><i class="fa fa-lock" aria-hidden="true"></i> Password</label>
      <input v-model="pwd" type="password" id="pwd" class="form-control">
    </div>

    <button class="btn orange btn-lg" @click="login">Login</button>

    <div class="alert mt-4 border-primary" role="alert">
      <router-link to="/register"><a href="#" class="btn btn-info btn-sm text-white">Register</a></router-link> | <a href="javascript:void(0)" class="font-underline text-underline" data-toggle="modal" data-target="#pwdReset">Forgot password? </a>
    </div>

  </div>


  <!-- MODAL -->
  <div class="modal fade" tabindex="-1" role="dialog" id="pwdReset">
  <div class="modal-dialog" role="document">
    <div class="modal-content bg-dark border-0">
      <div class="modal-header border-0">
        <h5 class="modal-title text-orange">Reset Password</h5>
        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- STUDENT NO -->
        <div class="form-group text-orange">
          <label for="sNoMod"><i class="fa fa-graduation-cap" aria-hidden="true"></i> Student No. | <i class="fa fa-id-card"></i> number on your UJ card</label>
          <input v-model="sNoReset" type="text" id="sNoMod" class="form-control" placeholder="e.g 212002355" aria-describedby="helpName">

          <div class="text-dark font-italic text-muted">
            <p>You will receive an email with a link, and the link will expire in 10 minutes</p>
          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="resetLink">Submit</button>
      </div>
    </div>
  </div>
</div>

</div>

</template>

<script>

// import modules
import {mapActions} from 'vuex'
import jsCookies from 'js-cookie'

export default {

  name: "login",
  data(){

    return {
      sNo: '',
      pwd: '',
      sNoReset: ''
    }

  },


  methods: {

    ...mapActions(['authenticate']),

    // login method
    login(){

      this.$axios.post('/user/login', {studentNo: this.sNo, password: this.pwd})
        .then(res => {

          // if error 
          if(res.data.error) {
            this.$toasted.error(res.data.message,{icon: "times-circle"})
          }  else {

            // cookie setting
            jsCookies.set('4u7h3n71c4710n', {token: res.data.token, authData: res.data.authData}, {expires: 9000})

            // auth 
            this.authenticate(res.data.authData)

            this.$toasted.success("Logged In", {icon: "check-circle"})

            // redirection
            this.$router.push('/')


          }
          

        }).catch(err => {
          // toast
          // console.log(err)
          this.$toasted.error(err,{icon: "times-circle"})
        })

        

    },

    resetLink() {

      if(this.sNoReset.length > 0) {

        let loader = this.$loading.show()

        this.$axios.post("/user/resetlink", {sNo: this.sNoReset})
        .then(res => {

          loader.hide()

          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon:"times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon:"check"})
          }

        }).catch(err => {
          loader.hide()          
          this.$toasted.error(err, {icon:"times-circle"})
        })
      } else {
        this.$toasted.error("Enter Student number / number on your UJ access card", {icon:"times-circle"})
      }

    }

  }

}
</script>

<style scoped>
  .form {
    margin-bottom: 60px;
  }
</style>
