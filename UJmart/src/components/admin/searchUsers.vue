<template>
  
  <div>

    <navigation />

    <div class="container">
      <h3><i class="fa fa-search"></i> {{$route.params.search}} </h3>

      <div class="list-group mt-3">
        <a href="javascript:void(0)" v-for="user in users" :key="user._id" class="list-group-item list-group-item-action list-group-item-primary" @click="setEditData(user)" >
          <div> 

            <i class="fa fa-user"></i> &nbsp;{{user.name}} 
            <span class="float-right">
              <div class="btn-group">
                <button class="py-1 btn btn-success" data-toggle="modal" data-target="#userInf"><i class="fa fa-info-circle"></i></button>
                <button class="btn py-1 btn-danger" data-toggle="modal" data-target="#remUser"><i class="fa fa-trash"></i></button>
              </div>
            </span>
            <div class="clearfix"></div>

          </div>
        </a>
      </div>

      <div v-if="users.length == 0">
        <h1 class="display-1 text-center">
          <i class="fa fa-user-times" aria-hidden="true"></i>
        </h1>
        <h4 class="text-center">No Users Found</h4>
      </div>

      <paginate
        v-if="pages > 1"
        :page-count="pages"
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
import {mapGetters} from 'vuex'

// 

export default {

  name: "searchusers",

  data() {
    return {
      users: [],
      page: 1,
      pages: 1,
      class: "",
      userD: {
        _id: null,
        pos: null,
        campus: null, 
        sNo: null,
        email: null,
        whatsAppNo: null,
        cellNo: null
      }
    }
  },

  methods: {

    async getSearchRes() {

      let loader = this.$loading.show()

      let res = await this.$axios.get(`/user/find/${this.$route.params.search}/${this.$route.params.page}`, {
        headers: {
          Authorization: "Bearer " + this.authInfo.token
        }
      })
      
      this.pages = res.data.pages
      this.page = res.data.page
      this.users = res.data.users

      loader.hide()

    },

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

    async clickEr(p) {

      this.$router.push('/search/ad/'+this.$route.params.search+"/"+p)      

    },

    remove(i) {

      let loader = this.$loading.show()

      this.$axios.delete(`/user/rem/${this.userD._id}`, {
        headers: {
          Authorization: "Bearer " + this.authInfo.token
        }
      })
        .then(res => {

          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})         
            this.users.splice(i, 1)
          }

          loader.hide()

        })
          .catch(err => {
            this.$toasted.error(err, {icon: "times-circle"})
            loader.hide()
          })
    }

  },

  computed: mapGetters(['authInfo']),

  watch: {
    async $route() {
      let loader = this.$loading.show()
      await this.getSearchRes()
      loader.hide()
    }
  },

  async created() {

    let loader = this.$loading.show()
    await this.getSearchRes()
    loader.hide()

  }

}
</script>

<style scoped>

</style>
