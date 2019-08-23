<template>
  <div>

    <h3><i class="fa fa-bell"></i> Notifications</h3>

    <div class="list-group mt-3">
      <a href="javascript:void(0)" v-for="notification in notifications" :key="notification._id" class="list-group-item list-group-item-action list-group-item-primary" @click="setEditData(notification)" >
        <div> 

          <i class="fa fa-bell"></i> &nbsp;{{notification.title}} 
          <span class="float-right">
            <div class="btn-group">
              <button class="btn py-1 btn-info" data-toggle="modal" data-target="#upNot"><i class="fa fa-pen"></i></button>
              <button class="btn py-1 btn-danger" data-toggle="modal" data-target="#remNot"><i class="fa fa-trash"></i></button>
            </div>
          </span>
          <div class="clearfix"></div>

        </div>
      </a>
    </div>

    <div v-if="notifications.length == 0">
      <h1 class="display-1 text-center">
        <i class="fa fa-times-circle " aria-hidden="true"></i>
      </h1>
      <h4 class="text-center">No Notifications</h4>

    </div>

    <!-- NOTIFICATION -->
    <div class="modal fade" id="upNot" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
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
            <button type="button" class="btn btn-primary" @click="update" data-dismiss="modal">Add</button>
          </div>
        </div>
      </div>
    </div>
    

    <!-- notification DELETE -->
    <div class="modal fade" id="remNot" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-align-left"></i> Notification</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            
            <p>Are you sure you want to remove this notification?</p>


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

  name: "adminCampuses",
  data() {
    return {
      notification: {
        title: '',
        shortDesc: '',
        notification: '',
        id: ''
      }
    }
  },
  methods: {
    ...mapActions(['getNotifications']),

    setEditData(not) {

      this.notification.title = not.title
      this.notification.shortDesc = not.shortDesc
      this.notification.notification = not.notification
      this.notification.id = not._id

    },

    update() {
      
      let loader = this.$loading.show()

      this.$axios.put(`/notification/update/${this.notification.id}`, this.notification)
        .then(res => {
          
          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})
            this.notification.title = ''
            this.notification.shortDesc = ''
            this.notification.notification = ''
            this.notification.id = ''
            this.getNotifications()
          }

          loader.hide()          

        }).catch(err => {

          this.$toasted.error(err, {icon:"times-circle"})
          loader.hide()

        })

    },

    remove() {

      let loader = this.$loading.show()

      this.$axios.delete(`/notification/remove/${this.notification.id}`)
        .then(res => {
          
          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {
            
            this.$toasted.success(res.data.message, {icon: "check"})
            this.notification.title = ''
            this.notification.shortDesc = ''
            this.notification.notification = ''
            this.notification.id = ''
            this.getNotifications()

          }

          loader.hide()

        })
          .catch(err => {
            
            this.$toasted.error(err, {icon: "times-circle"})
            loader.hide()

          })
    }

  },
  computed: mapGetters(['notifications']),
  created() {
    this.getNotifications()
  }


}
</script>

<style>

</style>
