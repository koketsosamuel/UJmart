<template>
  
  <div>

    <!-- TOOLBAR -->
    <div class="btn-group alert grad d-block mb-0 border-0">
      <router-link to="/addpost">
        <div class="btn btn-success"><i class="fa fa-plus"></i> Ad</div>
      </router-link>
      <div class="btn btn-info" data-toggle="modal" data-target="#addCat"><i class="fa fa-plus"></i> Category</div>
      <div class="btn btn-warning" data-toggle="modal" data-target="#addCampus"><i class="fa fa-plus"></i> Campus</div>
      <div class="btn btn-danger" data-toggle="modal" data-target="#addNot"><i class="fa fa-plus"></i> Notification</div>
    </div>

    <!-- NOTIFICATION -->
    <div class="modal fade" id="addNot" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-bell"></i> Notification</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" v-model="notification.title" id="title" class="form-control" placeholder="" aria-describedby="titleHelp">
            </div>

            <div class="form-group">
              <label for="sDesc">Short Description</label>
              <textarea id="sDesc" class="form-control" v-model="notification.shortDesc" cols="30" rows="2" maxlength="200"></textarea>
            </div>

            <div class="form-group">
              <label for="notification">Notification</label>
              <textarea id="not" v-model="notification.notification" cols="30" rows="5" class="form-control"></textarea>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addNotification" data-dismiss="modal">Add</button>
          </div>
        </div>
      </div>
    </div>

    <!-- CATEGORY -->
    <div class="modal fade" id="addCat" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-align-left"></i> Category</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            
            <div class="form-group">
              <label for="cName">Name</label>
              <input type="icon" v-model="category.name" id="cName" class="form-control" placeholder="" aria-describedby="titleHelp">
            </div>

            <div class="form-group">
              <label for="icon">Icon</label>
              <input type="text" v-model="category.icon" id="icon" class="form-control" placeholder="" aria-describedby="titleHelp">
            </div>

            <div class="form-group">
              <label for="exp">Expires</label>
                <select class="form-control" id="exp" v-model="category.expiration">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
            </div>

            <div class="form-group">
              <label for="expD">Days for expiration</label>
              <input type="number" v-model="category.expirationDays" id="expD" class="form-control" placeholder="" aria-describedby="titleHelp">
            </div>


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addCategory">Save</button>
          </div>
        </div>
      </div>
    </div>


    <!-- CAMPUSES -->
    <div class="modal fade" id="addCampus" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-university"></i> Campus</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            
            <div class="form-group">
              <label for="campus">Campus</label>
              <input type="icon" v-model="campus" id="campus" class="form-control" placeholder="" aria-describedby="titleHelp">
            </div>


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" @click="addCampus" class="btn btn-primary" data-dismiss="modal">Add</button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {mapActions} from 'vuex'

export default {

  data() {
    return {
      notification: {
        title: '',
        shortDesc: '',
        notification: ''
      },

      category: {
        name: '',
        icon: '',
        expiration: "yes",
        expirationDays: 120
      },

      campus: ''
    }
  },

  methods: {
    ...mapActions(['getCategories', 'getCampuses', 'getNotifications']),

    addCategory() {

      let loader = this.$loading.show()

      this.$axios.post('/category/add', this.category)
        .then(res => {

          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon:"times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})
            this.category.name = ""
            this.category.icon = ""
            this.getCategories()
          }

          loader.hide()

        })

        .catch(err => {
          this.$toasted.error(err, {icon:"times-circle"})
          loader.hide()
        })


    },

    addCampus() {
      
      let loader = this.$loading.show()

      this.$axios.post('/campus/add', {name: this.campus})
        .then(res => {

          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon:"times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})
            this.campus = ""
            this.getCampuses()
          }

          loader.hide()

        })

        .catch(err => {
          this.$toasted.error(err, {icon:"times-circle"})
          loader.hide()
        })
    },

    addNotification() {

      let loader = this.$loading.show()

      this.$axios.post('/notification/add', this.notification)
        .then(res => {

          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon:"times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})
            this.notification.title = ""
            this.notification.shortDesc = ""
            this.notification.notification = ""
            this.getNotifications()
          }

          loader.hide()

        })

        .catch(err => {
          this.$toasted.error(err, {icon:"times-circle"})
          loader.hide()
        })
    }



  }


}
</script>

<style>

</style>
