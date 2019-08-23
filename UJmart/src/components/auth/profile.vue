<template>
  
<div>

  <navigation />

  <div class="col-10 col-md-8 mx-auto form bg-dark p-4 text-orange" style="margin-top:60px">

    <h2>
      <span class="float-left"><i class="fa fa-user  d-inline"></i> Profile</span>
      <router-link to="/">
        <span class="float-right btn btn-primary"><i class="fa fa-home" aria-hidden="true"></i> Home</span>
      </router-link>
    </h2>
    <div class="clearfix"></div>
    <hr>

    <div id="accordianId" role="tablist" aria-multiselectable="true" class="text-white">

      <!-- PERSONAL DETAILS -->
      <div class="card grad">
        <div class="card-header" role="tab" id="section1HeaderId">
          <h5 class="mb-0">
            <a data-toggle="collapse" data-parent="#accordianId" href="#section1ContentId" aria-expanded="true" aria-controls="section1ContentId" class="text-white">
              <i class="fa fa-user" aria-hidden="true"></i> Personal Details
            </a>
          </h5>
        </div>
        <div id="section1ContentId" class="collapse in show" role="tabpanel" aria-labelledby="section1HeaderId">
          <div class="card-body grad-4">
            <table class="table table-responsive">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td class="font-weight-light text-white font-italic">{{user.name}}</td>
                </tr>
                <tr>
                  <td>Campus</td>
                  <td class="font-weight-light text-white font-italic">{{user.campus}}</td>
                </tr>
                <tr>
                  <td>Position</td>
                  <td class="font-weight-light text-white font-italic">{{user.pos}}</td>
                </tr>

                <tr>
                  <td>Cell Number</td>
                  <td class="font-weight-light text-white font-italic">{{user.cellNo}}</td>                  

                </tr>
                <tr>
                  <td>WhatsApp Number</td>
                  <td class="font-weight-light text-white font-italic">{{user.whatsAppNo}}</td>                  
                </tr>
                <tr>
                  <td>Email</td>
                  <td class="font-weight-light text-white font-italic">{{user.email}}</td>
                </tr>

              </tbody>
            </table>

          </div>
        </div>
      </div>
      <!-- /CONTACT DETAILS -->

      <!-- MANAGE ACC -->
      <div class="card grad">
        <div class="card-header" role="tab" id="section2HeaderId">
          <h5 class="mb-0">
            <a data-toggle="collapse" data-parent="#accordianId" href="#section2ContentId" aria-expanded="true" aria-controls="section2ContentId" class="text-white">
              <i class="fa fa-gear" aria-hidden="true"></i> Manage Account | <i class="fa fa-id-card" aria-hidden="true"></i> {{user.studentNo}}
            </a>
          </h5>
        </div>
        <div id="section2ContentId" class="collapse in show" role="tabpanel" aria-labelledby="section2HeaderId">
          <div class="card-body grad-4">            

            <div class="col-lg-8 col-md-12">

              <div class="grad-3 p-3 mb-4">
                <h4>Change Password</h4>

                <div class="form-group">
                  <label for="op">Old Password</label>
                  <input type="password" class="form-control"  id="op" v-model="oldPwd">
                </div>

                <div class="form-group">
                  <label for="np">New Password</label>
                  <input type="password" class="form-control" id="np" v-model="newPwd">
                </div>

                <button class="btn btn-block btn-dark" @click="changePwd">Change Password</button>
              </div>

              <div class="grad-2 border p-2">
                

                <button class="btn btn-block btn-info" data-toggle="modal" data-target="#editProfile" @click="setUpdateVals(user)">
                  <i class="fa fa-pen" aria-hidden="true"></i> Edit Profile
                </button>     
                <button class="btn btn-block btn-success" data-toggle="modal" data-target="#editPos" @click="setUpdateVals(user)">
                  <i class="fa fa-pen" aria-hidden="true"></i> Edit Position
                </button> 
                <button class="btn btn-block btn-dark red" data-toggle="modal" data-target="#remAcc">
                  <i class="fa fa-trash" aria-hidden="true"></i> Delete Account
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
      <!-- /MANAGE ACC -->

    </div>
    <!-- /COLUMN CONTAINER -->

    <!-- EDIT PROFILE -->
    <div class="modal fade" id="editProfile" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-pen"></i> Profile</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>


          <div class="modal-body">
            
            <!-- NAME -->
            <div class="form-group">
              <label for="name"><i class="fa fa-tag" aria-hidden="true"></i> Name</label>
              <input v-model="userUpdate.name" type="text" id="name" class="form-control" placeholder="e.g Koketso Maotomabe" aria-describedby="helpName" required>
            </div>

            <!-- CAMPUS -->
            <div class="form-group">
              <label for="campus"><i class="fa fa-university" aria-hidden="true"></i> Campus</label>
              <select class="form-control" id="campus"  v-model="userUpdate.campus" required>
                <option v-for="camp in campuses" :key="camp._id" :value="camp.name">{{camp.name}}</option>
              </select>
              <small id="helpName" class="text-muted">This is the campus where you are to be found</small>
            </div>

            <!-- PHONE -->
            <div class="form-group">
              <label for="cNo"><i class="fa fa-phone" aria-hidden="true"></i> Cellphone No.</label>
              <input v-model="userUpdate.cellNo" type="tel" id="cNo" class="form-control" placeholder="e.g 0712356212" aria-describedby="helpName" required>
              <small id="helpName" class="text-muted">This is the number people will use to call you when selling</small>
            </div>

            <!-- EMAIL -->
            <div class="form-group">
              <label for="sM"><i class="fa fa-envelope-o" aria-hidden="true"></i> Email</label>
              <input v-model="userUpdate.email" type="email" id="sM" class="form-control" placeholder="e.g whatever@example.com" aria-describedby="helpName" required>
            </div>

            <!-- WHATSAPP -->
            <div class="form-group">
              <label for="sWa"><i class="fab fa-whatsapp" aria-hidden="true"></i> WhatsApp No.</label>
              <input v-model="userUpdate.whatsAppNo" type="tel" id="sWa" class="form-control" placeholder="e.g 0623549212" aria-describedby="helpName">
              <small id="helpName" class="text-muted">This is the number people will use to WhatsApp you when you are selling</small>
            </div>


          </div>


          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateProfile">Save</button>
          </div>

        </div>
      </div>
    </div>

    <!-- EDIT POSITION -->
    <div class="modal fade" id="editPos" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-pen"></i> Position</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>


          <div class="modal-body">
            
            <div class="form-group">
              <label for="campus"><i class="fa fa-tag" aria-hidden="true"></i> Position</label>
              <select class="form-control" id="campus"  v-model="userUpdate.pos" required>
                <option value="student">Student</option>
                <option value="employee">Employee</option>
                <option value="other">Other (please specify)</option>
              </select>
              <small id="helpName" class="text-muted">This is what you are, in the <i class="fa fa-university" aria-hidden="true"></i></small>
            </div>

            <!-- IF OTHER -->
            <div class="form-group" v-if="userUpdate.pos == 'other'">
              <label for="other"><i class="fa fa-tag" aria-hidden="true"></i> Specify Position</label>
              <input v-model="posOther" type="tel" id="other" class="form-control" aria-describedby="helpName" spellcheck>
              <small id="helpName" class="text-muted">This is if you chose "other" as your position</small>
            </div>

          </div>


          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updatePos">Save</button>
          </div>

        </div>
      </div>
    </div>
    <!-- /EDIT POSITION -->



  </div>


  <!-- AD DELETE -->
    <div class="modal fade" id="remAcc" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-trash"></i> Account</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            
            <p>Are you sure you want to remove your account? All your ads will be removed and this action is irreversible</p>


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
            <button type="button" data-dismiss="modal" class="btn btn-primary" @click="removeSelf">Yes</button>
          </div>
        </div>
      </div>
    </div>

</div>
  
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

// exportation
export default {

  name: "profile",

  data() {
    return {

      user: {
        name: null,
        campus: null,
        pos: null,
        cellNo: null,
        whatsAppNo: null,
        email: null,
        studentNo: null,
        _id: null
      },

      oldPwd: "",

      userUpdate: {
        name: "null",
        campus: null,
        pos: null,
        cellNo: null,
        whatsAppNo: null,
        email: null,
        studentNo: null
      },

      newPwd: "",
      posOther: ""

    }

  },

  methods: {

    ...mapActions(['getCampuses', "DeAuth"]),

    getUser(){
      this.$axios.get('/user/profile', {
          headers: {
            Authorization: "Bearer " + this.authInfo.token
          }
        })
        .then(res => {

          this.user = res.data.profile

        })
        .catch(err => {
          this.$toasted.error(err, {icon: "times-circle"})
        })
    },

    changePwd() {


      if(this.newPwd.length < 4 || this.oldPwd.length < 4) {
        this.$toasted.error("password must atleast be 4 charecters long", {icon: "times-circle"})
      } else {

        let loader = this.$loading.show()

        this.$axios.post('/user/passwordchange', {oldPwd: this.oldPwd, newPwd: this.newPwd},{
          headers: {
            Authorization: "Bearer " + this.authInfo.token
          }
        }).then(res => {

          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})
            this.oldPwd = ""
            this.newPwd = ""
          }

          loader.hide()

        })
        .catch(err => {
          this.$toasted.error(err, {icon: "times-circle"})
          loader.hide()
        })

      }
    },

    setUpdateVals(values) {
      this.userUpdate.name = values.name
      this.userUpdate.campus = values.campus
      this.userUpdate.cellNo = values.cellNo
      this.userUpdate.email = values.email
      this.userUpdate.whatsAppNo = values.whatsAppNo
      this.userUpdate.pos = values.pos
    },

    updateProfile() {

      let loader = this.$loading.show()

      this.$axios.post('/user/profileupdate', {values: this.userUpdate, update: "profile"}, axiosOpts).then(res => {
        
        if(res.data.error) {
          this.$toasted.error(res.data.message, {icon: "times-circle"})
        } else {
          this.$toasted.success(res.data.message, {icon: "check"})
          this.getUser()
        }

        loader.hide()

      }).catch(err => {
        this.$toasted.error(err, {icon: "times-circle"})
        loader.hide()
      })
    },

    updatePos() {
      // carefully set postion
      let position = this.userUpdate.pos
      let positionOther = this.posOther

      function getPos() {


        if(position == 'other') {
          return positionOther
        } else {
          return position
        }
      }

      let loader = this.$loading.show()

      this.$axios.post('/user/profileupdate', {values: {pos: getPos()}, update: "position"}, axiosOpts)
        .then(res => {

          if(res.data.error) {
          this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})
            this.getUser()
          }

          loader.hide()

        })
        .catch(err => {

          this.$toasted.error(err, {icon: "times-circle"})

          loader.hide()

        })

    },

    removeSelf() {

      let loader = this.$loading.show()

      this.$axios.delete('/user/rem/'+this.user._id, {
          headers: {
            Authorization: "Bearer " + this.authInfo.token
          }
        })
        .then(res => {

          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})
            this.DeAuth()
            this.$router.replace("/")
          }

          loader.hide()

        }).catch(err => {
          loader.hide()
          this.$toasted.error(err, {icon: "times-circle"})
        })

    }

  },
  // end of methods

  async created() {

    let loader = this.$loading.show()

    await this.getUser()
    await this.getCampuses()

    loader.hide()

  },

  async beforeMount() { 
    await this.getCampuses()
    await this.getUser()
    return false
  },

  computed: mapGetters(['campuses', 'authInfo'])


}
</script>

<style scoped>

  table tr {
    border: 0px solid #000;
  }

  .card, .card-body table tr {
    border-radius: 0px !important;
    text-shadow: #000 0px 0px 0px;
    color: #fff;
  }

  .grad {
    text-shadow: #000 0px 0px 0px;
  }

  .grad-4 {
    border-right: 10px solid #FF4500;
    text-shadow: rgb(255, 255, 255) 0px 0px 0px;
  }
 



</style>
