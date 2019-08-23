<template>
  <div>

  <div class="col-10 col-md-8 mx-auto form bg-dark p-4 text-primary">

    <h2>
      <span class="float-left"><i class="fa fa-user-plus d-inline"></i> Register</span>
      <router-link to="/">
        <span class="float-right btn btn-primary"><i class="fa fa-home" aria-hidden="true"></i> Home</span>
      </router-link>
    </h2>
    <div class="clearfix"></div>
    <hr>

    <form @submit="register">

      <!-- NAME -->
      <div class="form-group">
        <label for="name"><i class="fa fa-tag" aria-hidden="true" ></i> Name</label>
        <input v-model="name" type="text" id="name" class="form-control" placeholder="e.g Koketso Maotomabe" aria-describedby="helpName" required>
      </div>


      <!-- STUDENT NO -->
      <div class="form-group">
        <label for="sNo"><i class="fa fa-graduation-cap" aria-hidden="true"></i> Student No. | <i class="fa fa-id-card"></i> number on your UJ card</label>
        <input  v-model="studNoLogNo" type="text" id="sNo" class="form-control" placeholder="e.g 212002355" aria-describedby="helpName" required>
        <small id="helpName" class="text-muted">used for logging in</small>
      </div>

      <!-- CAMPUS -->
      <div class="form-group">
        <label for="campus"><i class="fa fa-building" aria-hidden="true"></i> Campus</label>
        <select class="form-control" id="campus"  v-model="campus" required>
          <option v-for="camp in campusesFront" :key="camp._id" :value="camp.name">{{camp.name}}</option>
        </select>
        <small id="helpName" class="text-muted">This is the campus where you are to be found</small>
      </div>

      <!-- POSITION -->
      <div class="form-group">
        <label for="pos"><i class="fa fa-tag" aria-hidden="true"></i> Position</label>
        <select class="form-control" id="pos"  v-model="pos" required>
          <option value="student">Student</option>
          <option value="employee">Employee</option>
          <option value="other">Other (please specify)</option>
        </select>
        <small id="helpName" class="text-muted">This is what you are, in the <i class="fa fa-university" aria-hidden="true"></i></small>
      </div>

      <!-- IF OTHER -->
      <div class="form-group" v-if="pos == 'other'">
        <label for="other"><i class="fa fa-tag" aria-hidden="true"></i> Specify Position</label>
        <input v-model="posOther" type="tel" id="other" class="form-control" aria-describedby="helpName" spellcheck>
        <small id="helpName" class="text-muted">This is if you chose "other" as your position</small>
      </div>

      <!-- PHONE -->
      <div class="form-group">
        <label for="cNo"><i class="fa fa-phone" aria-hidden="true"></i> Cellphone No.</label>
        <input v-model="cellNo" type="tel" id="cNo" class="form-control" placeholder="e.g 0712356212" aria-describedby="helpName" required>
        <small id="helpName" class="text-muted">This is the number people will use to call you when selling</small>
      </div>

      <!-- EMAIL -->
      <div class="form-group">
        <label for="sM"><i class="fa fa-envelope" aria-hidden="true"></i> Email</label>
        <input v-model="email" type="email" id="sM" class="form-control" placeholder="e.g whatever@example.com" aria-describedby="helpName" required>
      </div>

      <!-- WHATSAPP -->
      <div class="form-group">
        <label for="sWa"><i class="fab fa-whatsapp" aria-hidden="true"></i> WhatsApp No.</label>
        <input v-model="whatsApp" type="tel" id="sWa" class="form-control" placeholder="e.g 0623549212" aria-describedby="helpName">
        <small id="helpName" class="text-muted">This is the number people will use to WhatsApp you when you are selling</small>
      </div>


      <div class="form-group">
        <label for="pwd"><i class="fa fa-lock" aria-hidden="true"></i> Password</label>
        <input v-model="pwd" type="password" id="pwd" class="form-control" required>
        <small id="helpName" class="text-muted">length should be atleast 4 charecters long</small>
      </div>

      <div class="form-group">
        <label for="pwd2"><i class="fa fa-lock" aria-hidden="true"></i> Confirm Password</label>
        <input v-model="pwd2" type="password" id="pwd2" class="form-control" required>
        <small id="helpName" class="text-muted">length should be atleast 4 charecters long</small>
      </div>

      <button class="btn orange btn-lg" type="submit">Register</button>
    
    </form>

    <div class="alert mt-4 border-primary" role="alert">
      <strong>Already registered? </strong> <router-link to="/login"><a class="alert-link text-white btn btn-info btn-sm">Login</a></router-link>
    </div>

  </div>

</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {

  name : "register",
  data() {
    return {

      name: '',
      campus: '',
      studNoLogNo: '',
      cellNo: '',
      email: '',
      whatsApp: '',
      pwd: '',
      pwd2: '',
      posOther: '',
      pos: '',
      campusesFront: [
        {name: "APK", _id: 0}, 
        {name: "APB", _id: 1}, 
        {name: "DFC", _id: 2}, 
        {name: "SWC", _id: 3}
      ]

    }
  },

  methods: {

    ...mapActions(['getCampuses']),

    register(e) {

      let position = this.pos

      e.preventDefault()

      // password matching
      if(this.pwd !== this.pwd2) {
        this.$toasted.error("Passwords do not match", {icon: "times-circle"})
        return false
      }

      // password length
      if(this.pwd.length < 4) {
        this.$toasted.error("Passwords should atleast be 4 charecters long", {icon: "times-circle"})
        return false
      }

      if(this.pos == 'other') {
        position = this.posOther
      }

      this.$axios.post('/user/register', {
        name: this.name,
        studentNo: this.studNoLogNo,
        email: this.email,
        password: this.pwd,
        whatsAppNo: this.whatsApp,
        cellNo: this.cellNo,
        campus: this.campus,
        pos: position
      }).then(res => {

        if(!res.data.error) {
          this.$toasted.success(res.data.message, {icon: "check-circle"})
          this.$router.push('/login')
        } else {
          this.$toasted.error(res.data.message, {icon: "times-circle"})
        }
        
      }).catch (err => {
        this.$toasted.error(err, {icon: "times-circle"})
      }) 

    },

    

  },

  computed: mapGetters(['campuses']),

  async created() {
    await this.getCampuses()
    if(this.campuses.length > 0) {
      this.campusesFront = this.campuses
    }
  }

}
</script>


<style scoped>

  .form {
    margin-bottom: 60px;
  }

  @media (max-width: 768px) {
    .form {

      margin-top: -60px !important;
      margin-bottom: 0px !important;

    }
  }


</style>
