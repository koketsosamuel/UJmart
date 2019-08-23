<template>
  <div>

    <h3><i class="fa fa-align-left"></i> Categories</h3>

    <div class="list-group mt-3">
      <a href="javascript:void(0)" v-for="category in categories" :key="category._id" class="list-group-item list-group-item-action list-group-item-primary" @click="setEditData(category)" >
        <div> 

          <i :class="'fas fa fa-' + category.icon"></i> &nbsp;{{category.name}} 
          <span class="float-right">
            <div class="btn-group">
              <button class="btn py-1 btn-success px-3" data-toggle="modal" data-target="#viewCat"><i class="fa fa-info"></i></button>
              <button class="btn py-1 btn-info" data-toggle="modal" data-target="#editCat"><i class="fa fa-pen"></i></button>
              <button class="btn py-1 btn-danger" data-toggle="modal" data-target="#remCat"><i class="fa fa-trash"></i></button>
            </div>
          </span>
          <div class="clearfix"></div>

        </div>
      </a>
    </div>

    <div v-if="categories.length == 0">
      <h1 class="display-1 text-center">
        <i class="fa fa-times-circle" aria-hidden="true"></i>
      </h1>
      <h4 class="text-center">No Categories</h4>
    </div>

    <!-- CATEGORY -->
    <div class="modal fade" id="editCat" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
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
              <input type="icon" v-model="categoryL.name" id="cName" class="form-control" placeholder="" aria-describedby="titleHelp">
            </div>

            <div class="form-group">
              <label for="icon">Icon</label>
              <input type="text" v-model="categoryL.icon" id="icon" class="form-control" placeholder="" aria-describedby="titleHelp">
            </div>

            <div class="form-group">
              <label for="exp">Expires</label>
                <select class="form-control" id="exp" v-model="categoryL.expiration">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
            </div>

            <div class="form-group">
              <label for="expD">Days for expiration</label>
              <input type="number" v-model="categoryL.expirationDays" id="expD" class="form-control" placeholder="" aria-describedby="titleHelp">
            </div>


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="update">Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- CATEGORY DELETE -->
    <div class="modal fade" id="remCat" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-align-left"></i> Category</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            
            <p>Are you sure you want to remove this category?</p>


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
            <button type="button" data-dismiss="modal" class="btn btn-primary" @click="remove">Yes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- CATEGORY VIEW -->
    <div class="modal fade" id="viewCat" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark border-0 text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title text-orange"><i class="fa fa-align-left"></i> Category</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            
            <p>name: {{categoryL.name}}</p>
            <p>icon: {{categoryL.icon}}</p>
            <p>expiration: {{categoryL.expiration}}</p>
            <p v-if="categoryL.expiration == 'yes'">Exp Days: {{categoryL.expirationDays}}</p>


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
import {mapGetters, mapActions} from 'vuex'


export default {

  name: "adminCategories",
  data() {
    return {
      categoryL: {
        name: '',
        icon: '',
        id: '',
        expiration: null,
        expirationDays: null
      }
    }
  },
  methods: {
    ...mapActions(['getCategories']),

    setEditData(categorySingle) {

      this.categoryL.name = categorySingle.name
      this.categoryL.icon = categorySingle.icon
      this.categoryL.id = categorySingle._id
      this.categoryL.expiration = categorySingle.expiration
      this.categoryL.expirationDays = categorySingle.expirationDays

    },

    update() {
      
      let loader = this.$loading.show()

      this.$axios.put(`/category/update/${this.categoryL.id}`, this.categoryL)
        .then(res => {
          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})
            this.categoryL.name = ''
            this.categoryL.icon = ''
            this.categoryL.id = ''
            this.getCategories()
          }

          loader.hide()

        }).catch(err => {
          loader.hide()
          this.$toasted.error(err, {icon: "times-circle"})
        })

    },

    remove() {

      let loader = this.$loading.show()

      this.$axios.delete(`/category/remove/${this.categoryL.id}`)
        .then(res => {
          if(res.data.error) {
            this.$toasted.error(res.data.message, {icon: "times-circle"})
          } else {
            this.$toasted.success(res.data.message, {icon: "check"})
            this.categoryL.name = ''
            this.categoryL.icon = ''
            this.categoryL.id = ''
            this.getCategories()
          }

          loader.hide()

        })
          .catch(err => {
            loader.hide()
            this.$toasted.error(err, {icon: "times-circle"})
          })
    }

  },
  computed: mapGetters(['categories']),
  created() {
    this.getCategories()
  }


}
</script>

<style>

</style>
