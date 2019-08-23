<template>
  
  <div>


    <div id="carouselId" class="carousel slide bg-dark mb-4" data-ride="carousel">
      <ol class="carousel-indicators" id="indicators">
        <li v-for="(notification, index) in nots" :key="notification._id" data-target="#carouselId" :data-slide-to="index" :class="notification.class"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div v-for="notification in nots" :key="notification._id" :class="'carousel-item p-4 text-primary '+notification.class">
         
          <div class="text-left p-4 truncate">
            <h5><i class="fa fa-bell" aria-hidden="true"></i> {{notification.title}}</h5>
            <small class="text-muted m-0">posted {{notification.created}}</small>
            <p class="m-0 mb-1">{{notification.shortDesc}}</p>

            <button class="btn orange my-0" @click="setEditData(notification)" data-toggle="modal" data-target="#viewNot">Read More</button>
          </div>
        </div>

        <div v-if="notifications.length <= 0" class="carousel-item p-4 text-primary active">
         
          <div class="text-left p-4 truncate">

            <h5><i class="fa fa-bell" aria-hidden="true"></i> Welcome</h5>
            <small class="text-muted m-0"></small>
            <p class="m-0 mb-1">UJmart is aimed at centralizing market to students, employees and anyone in UJ</p>

            <button class="btn orange my-0">Read More</button>

          </div>
        </div>
        
      </div>
    </div>

    <!-- NOTIFICATION -->
    <div class="modal fade" id="viewNot" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-bell"></i> {{notification.title}}</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body bg-white">
            
            
            <vue-simple-markdown :source="notification.notification"></vue-simple-markdown>
          

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>



  </div>

</template>

<script>
import moment from 'moment'

export default {

  name: "notifications",

  data(){
    return {

      notifications: [],
      nots: [],

      notification: {
        title: null,
        notification: "null",
        shortDesc: null,
        created: null
      }

    }
  },

  methods: {

    getNotifications() {

      this.$axios.get('/notification/all')
        .then(res => {

          // console.log(res.data)
          this.notifications = res.data.notifications
          
          for(let i = 0; i < this.notifications.length; i++) {

            let values = {
              title: this.notifications[i].title,
              shortDesc: this.notifications[i].shortDesc,
              created: moment(this.notifications[i].created).fromNow(),
              class: "",
              notification: this.notifications[i].notification
            }

            // make first notification active
            if(i == 0) {
              values.class = values.class + " active"
            }

            this.nots.push(values)

          }

        })
     
    },


    setEditData(notification) {

      this.notification.title = notification.title
      this.notification.shortDesc = notification.shortDesc
      this.notification.notification = notification.notification
      this.notification.created = notification.created

    }

  },

  created() {

    this.getNotifications()

  }

}
</script>

<style>

  .carousel {

    height: 230px !important;
    transition: all 0.4s;
   

  }

  .truncate {
    width: 100%;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  small {
    font-size: 16px;
  }



</style>
