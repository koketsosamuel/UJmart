<template>
  
  <div>

    <div class="col-md-8 mx-auto bg-dark text-primary p-4 form">
      
      <h2>
        <span class="float-left"><i class="fa fa-pen d-inline" aria-hidden="true"></i>&nbsp;Edit Ad</span>
        <router-link to="/">
          <span class="float-right btn btn-primary"><i class="fa fa-home" aria-hidden="true"></i> Home</span>
        </router-link>
        <div class="clearfix"></div>
      </h2>
      <hr>

      <!-- NAME -->
      <div class="form-group">
        <label for="name"><i class="fa fa-tag" aria-hidden="true"></i> Name of Ad</label>
        <input type="text" id="name" v-model="post.name" class="form-control">
      </div>

      <!-- DESCR -->
      <div class="form-group">
        <label for="desc"><i class="fa fa-tag" aria-hidden="true"></i> Description</label>
        <textarea id="desc" class="form-control" v-model="post.description"></textarea>
      </div>

      <!-- CATEGORY -->
      <div class="form-group">
        <label for="cat"><i class="fa fa-cube" aria-hidden="true"></i> Category</label>
        <select class="form-control" id="cat" v-model="post.category">
          <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
        </select>
      </div>


      <!-- PRICE -->
      <div class="form-group">
        <label for=""><i class="fa fa-money" aria-hidden="true"></i> Price</label>
        <input type="number" id="price" class="form-control" v-model="post.price" placeholder="e.g 122"> 
        <small id="fileHelpId" class="form-text text-muted">No need to put in the "R"</small>      
      </div>

      
      <button type="button" class="btn orange btn-lg mt-4" @click="update">Update</button>

    </div>

  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import jsCookie from 'js-cookie'

export default {


  name: "addPost",
  data(){
    return {
      post: {

        name: "",
        description: "",
        category: "",
        price: null

      }
    }
  },
  methods: {

    ...mapActions(['getCategories', 'getCampuses', 'getAd']),

    update() {

      let loader = this.$loading.show()

      this.$axios.put('/ad/update/'+ this.$route.params.adId, this.post, {
        headers: {
          Authorization: "Bearer " +  this.authInfo.token
        }
      }).then(res => {

        loader.hide()

        if(res.data.error) {
          this.$toasted.error(res.data.message, {icon: "times-circle"})
        } else {

          this.$router.replace('/ad/'+this.$route.params.adId)
          this.$toasted.success(res.data.message, {icon: "success"})

        }
      }).catch(err => {
        this.$toasted.error(err, {icon: "times-circle"})
        loader.hide()
      })

    }



  },

  computed: mapGetters(['authInfo', 'categories', 'campuses', 'ad']),

  async created() {
    let loader = this.$loading.show()
    await this.getCategories()
    this.getCampuses()
    await this.getAd(this.$route.params.adId)
    this.post = await this.ad
    loader.hide()

  }


}


</script>

<style scoped>

  .imageUpload {
    cursor: pointer;
    transition: all 0.3s;
    line-height: 100%;
    vertical-align: middle !important;
  }

  ul li {
    font-size: 12px;
    margin: 0px;
    min-height: 35px;
    padding: 1.5px
  }

  ul li:nth-child(odd) {
    background: rgb(180, 6, 166)
  }

  ul {
    list-style: none;
    padding: 0;
  }

</style>
