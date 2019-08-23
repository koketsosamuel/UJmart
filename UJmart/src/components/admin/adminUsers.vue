<template>
  <div>

    <h3><i class="fa fa-users"></i> Users</h3>

    <form class="form-inline my-2 my-lg-0" @submit="search">
      <input class="form-control mr-sm-2" type="search" v-model="query" placeholder="Search" aria-label="Search" required>
      <button 
        class="btn btn-outline-dark my-2 my-sm-0" 
        type="submit">
          <i class="fa fa-search" aria-hidden="true"></i>
      </button>
    </form>

    <div class="list-group mt-3">
      <a href="javascript:void(0)" v-for="user in userS.users" :key="user._id" class="list-group-item list-group-item-action list-group-item-primary" @click="setEditData(user)" >
        <div> 

          <i class="fa fa-user"></i> &nbsp;{{user.name}} <span class="badge badge-primary">{{user.pos}}</span>
          <span class="float-right">
            <p v-if="user._id == authInfo._id" class="m-0 p-1 bg-dark text-white">You</p>
            <div class="btn-group" v-if="user._id != authInfo._id">
              <button class="py-1 btn btn-success" data-toggle="modal" data-target="#userInf"><i class="fa fa-info-circle"></i></button>
              <button class="btn py-1 btn-danger" data-toggle="modal" data-target="#remUser"><i class="fa fa-trash"></i></button>
            </div>
          </span>
          <div class="clearfix"></div>

        </div>
      </a>
    </div>

    <paginate
      :page-count="Number(userS.pages)"
      :click-handler="clickEr"
      container-class="pagination mt-4"
      page-class="page-item"
      page-link-class="page-link text-white bg-primary"
      prev-class="page-item"
      prev-link-class="page-link bg-dark text-white"
      next-class="page-item"
      next-link-class="page-link bg-dark text-white"
      active-class="active disabled font-weight-bold"      
    />

    <div v-if="userS.users.length == 0">
      <h1 class="display-1 text-center">
        <i class="fa fa-user-times" aria-hidden="true"></i>
      </h1>
      <h4 class="text-center">No Users</h4>
    </div>
  

    <!-- USER INFO -->
    <div class="modal fade" id="userInf" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-user"></i> {{ userD.name }} <small class="text-white badge badge-primary">{{ userD.pos }}</small></h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body text-white">
            
            <p><i class="fab fa-whatsapp"></i> {{ userD.whatsAppNo }}</p>
            <p><i class="fa fa-phone"></i> {{ userD.cellNo }}</p>
            <p><i class="fa fa-envelope"></i> {{ userD.email }} </p>
            <p><i class="fa fa-university"></i> {{ userD.campus }}</p>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">CLOSE</button>
          </div>
        </div>
      </div>
    </div>


    <!-- USER DELETE -->
    <div class="modal fade" id="remUser" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-user-times"></i> User</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            
            <p>Are you sure you want to remove <q class="font-weight-bold text-primary">{{userD.name}}</q>?</p>


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
            <button type="button" data-dismiss="modal" class="btn btn-primary" @click="remove">Yes</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {

  name: "adminUsers",
  data() {
    return {
      userD: {
        name: '',
        email: '',
        sNo: '',
        _id: '',
        campus: '',
        pos: '',
        cellNo: '',
        whatsAppNo: '',
      },

      query: null,

      userS: {
        users: [],
        pages: 1,
        page: 1
      }
    }
  },
  methods: {
    ...mapActions(['getUsers']),

    setEditData(user) {

      this.userD._id = user._id
      this.userD.name = user.name
      this.userD.email = user.email
      this.userD.sNo = user.studentNo
      this.userD.campus = user.campus
      this.userD.pos = user.pos

      if(user.whatsAppNo == null) {
        this.userD.whatsAppNo = "Unavailable"
      } else {
        this.userD.whatsAppNo = user.whatsAppNo
      }

      if(user.cellNo == null) {
        this.userD.cellNo = "Unavailable"
      } else {
        this.userD.cellNo = user.cellNo
      }

    },

    search(e) {

      e.preventDefault()
      this.$router.push(`/search/user/${this.query}/1`)

    },
    

    remove() {

      let loader = this.$loading.show()

      this.$axios.delete(`/user/rem/${this.userD._id}`, {
        headers: {
          Authorization: "Bearer " + this.authInfo.token
        }
      })
        .then(res => {

          loader.hide()

          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})         
            this.getUsers(this.users.page)
          }

        })
          .catch(err => {
            this.$toasted.error(err, {icon: "times-circle"})
            loader.hide()
          })
    },

    async clickEr(pageNum) {
      let loader = this.$loading.show()
      await this.getUsers(pageNum)
      loader.hide()
    }

  },
  computed: mapGetters(['users', 'authInfo']),
  async created() {
    await this.getUsers(1)
    this.userS = await this.users
  }


}
</script>

<style>

</style>
