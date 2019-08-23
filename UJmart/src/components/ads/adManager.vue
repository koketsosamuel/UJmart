<template>
  <div>

    <div class="btn-groupg">

      <router-link :to="'/editpost/'+id">
        <button class="btn py-1 btn-info" title="Edit this ad"><i class="fa fas fa-pen"></i> <span class="sm"> Edit Post</span></button>
      </router-link>

      <router-link :to="'/managepics/'+id">
        <button class="btn py-1  btn-dark" title="Add or remove images"><i class="fa fa-image"></i> <span class="sm"> Manage Images</span></button>
      </router-link>

      <button class="btn py-1 btn-danger" data-toggle="modal" data-target="#remAd" title="Remove this ad"><i class="fa fa-trash"></i> <span class="sm"> Remove Ad</span></button>
    </div>

      <!-- AD DELETE -->
      <div class="modal fade" id="remAd" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content bg-dark border-0 text-white">
            <div class="modal-header border-0">
              <h5 class="modal-title text-orange"><i class="fa fa-trash"></i> Ad</h5>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              
              <p>Are you sure you want to remove this Ad?</p>


            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
              <button type="button" data-dismiss="modal" class="btn btn-primary" @click="remove">Yes</button>
            </div>
          </div>
        </div>
      </div>
      <!-- /AD DELETE -->


</div>
</template>

<script>
import authService from '../../services/auth'
import { constants } from 'crypto';

export default {

  name: "adManager",
  props: ['id', 'isDone'],
  data() {
    return {

    }
  },
  methods: {

    remove() {

      let loading = this.$loading.show()

      this.$axios.delete('/ad/rem/'+this.id, {
        headers: {
          Authorization: authService.getAxiosAuthHeader
        }
      }).then(res => {
        
        loading.hide()

        if(res.data.error) {
          this.$toasted.error(res.data.message, {icon: "times-circle"})
        } else {
          this.isDone()
          this.$toasted.success(res.data.message, {icon: "check"})
        }
      }).catch(err => {

        this.$toasted.error(err, {icon: "times-circle"})
        loading.hide()        
      })

    }

  }

}
</script>

<style>

</style>
