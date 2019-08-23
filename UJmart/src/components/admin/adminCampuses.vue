<template>
  <div>

    <h3><i class="fa fa-building"></i> Campuses</h3>

    <div class="list-group mt-3">
      <a href="javascript:void(0)" v-for="campus in campuses" :key="campus._id" class="list-group-item list-group-item-action list-group-item-primary" @click="setEditData(campus.name, campus._id)" >
        <div> 

          <i class="fa fa-building"></i> &nbsp;{{campus.name}} 
          <span class="float-right">
            <div class="btn-group">
              <button class="btn py-1 btn-info" data-toggle="modal" data-target="#editCamp"><i class="fa fa-pen"></i></button>
              <button class="btn py-1 btn-danger" data-toggle="modal" data-target="#remCamp"><i class="fa fa-trash"></i></button>
            </div>
          </span>
          <div class="clearfix"></div>

        </div>
      </a>
    </div>

    <div v-if="campuses.length == 0">
      <h1 class="display-1 text-center">
        <i class="fa fa-times-circle" aria-hidden="true"></i>
      </h1>
      <h4 class="text-center">No Campuses</h4>
    </div>

    <!-- campus -->
    <div class="modal fade" id="editCamp" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-building"></i> Campus</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            
            <div class="form-group">
              <label for="cName">Name</label>
              <input type="icon" v-model="campus.name" id="cName" class="form-control" placeholder="" aria-describedby="titleHelp">
            </div>


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="update">Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- campus DELETE -->
    <div class="modal fade" id="remCamp" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-building"></i> campus</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            
            <p>Are you sure you want to remove this campus?</p>


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
      campus: {
        name: '',
        id: ''
      }
    }
  },
  methods: {
    ...mapActions(['getCampuses']),

    setEditData(name, id) {

      this.campus.name = name
      this.campus.id = id

    },

    update() {
      
      let loader = this.$loading.show()

      this.$axios.put(`/campus/update/${this.campus.id}`, {name: this.campus.name})
        .then(res => {

          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})
            this.campus.name = ''
            this.campus.id = ''
            this.getCampuses()
          }

          loader.hide()

        }).catch(err => {
            loader.hide()
            this.$toasted.error(err, {icon: "times-circle"})
          })

    },

    remove() {

      let loader = this.$loading.show()

      this.$axios.delete(`/campus/remove/${this.campus.id}`)
        .then(res => {

          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})
            this.campus.name = ''
            this.campus.id = ''
            this.getCampuses()
          }

          loader.hide()

        })
          .catch(err => {
            loader.hide()
            this.$toasted.error(err, {icon: "times-circle"})
          })
    }

  },
  computed: mapGetters(['campuses']),
  created() {
    this.getCampuses()
  }


}
</script>

<style>

</style>
