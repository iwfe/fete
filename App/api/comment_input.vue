<template>
  <div class="comment-input-wrap">
      <textarea v-model="value"></textarea>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: String,
        default: '',
        twoWay: true
      }
    }
  }
</script>
<style media="screen" lang="sass">
  .comment-input-wrap{
    position:absolute;
    width:100%;
    /* height:100px; */
    border:2px solid Violet;
    background-color:#fff;
    bottom:35px;
    z-index:999;
    border-radius:3px;
    textarea{
      width:100%;
      height:100%;
      outline:none;
    }
  }
</style>
