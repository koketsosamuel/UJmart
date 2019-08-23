<template>
  <div>

    <div class="footer" >
      <div class="container p-4">
        <h4 class="text-orange shadow-white">&copy;UJ mart</h4>
      </div>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

  .footer {    
    background: #6e047c; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FF4500, #ee49d83f); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, rgba(255, 68, 0, 0.226), #6e047c);
    height: 80px;
    color: #FF4500 !important;
    transition: all 0.3s;
  }

  .footer:hover {
    background: -webkit-linear-gradient(to right, #FF4500, #ee49d83f); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, rgb(255, 68, 0), #6e047c);
  }

  

</style>
