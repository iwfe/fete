<template>
  <div class="comment-input-wrap" @click.stop="returnFalse">
      <textarea v-model="value" class="comment-textarea"></textarea>
      <div class="close-btn" ><i class="remove icon" @click.stop="showInput"></i></div>
      <div class="triangle"></div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: String,
        default: '',
        twoWay: true
      },
      type: {
        type: String,
        default: 'comment'
      }
    },
    methods: {
      returnFalse() {
        return false
      },
      showInput() {
        this.$dispatch('showInput')
      }
    }
  }
</script>
<style media="screen" lang="sass">
  .comment-input-wrap{
    position:absolute;
    width:100%;
    height:200px;
    border:1px solid #ccc;
    background-color:#fff;
    bottom:53px;
    z-index:999;
    border-radius:3px;
    box-shadow:0 0 15px #888888;
    padding-right:5px;
    display:none;
    .comment-textarea{
      max-height:none !important;
      display:block;
      width:100% !important;
      height:100% !important;
      outline:none !important;
      resize: none !important;
      border:none !important;
      background-color:#fff !important;
    }
    .close-btn{
      width:20px;
      height:20px;
      position:absolute;
      top:0;
      right:2px;
      cursor:pointer;
    }
    .triangle{
      width:0;
      height:0;
      border-width:16px;
      border-style:solid;
      border-color:#fff transparent  transparent  transparent ;
      position:absolute;
      left:10px;
    }
  }
</style>
