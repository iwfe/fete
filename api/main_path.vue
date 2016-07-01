<template>
    <div id="main_path">
        <selects></selects>
        <div class="btn">http://www.baidu.com/<a>复制</a></div>
    </div>
</template>

<script type="text/babel">
import selects from './main_path_select.vue'
export default {
  components: {
    selects
  },
  data() {
    return {
      select: ''
    }
  },
  props: {},
  ready() {
    fetch('/api/dropdown').then(res => {
      console.log(res)
    });
  },
  methods: {

  }
}
</script>

<style lang="sass">
#main_path{
  line-height: 28px;height: 40px;
  border-bottom: 1px dashed #ddd;
  color: #999;
  .btn{
    border-radius: 5px;
    float:right;
    padding: 0 16px;
    font-size: 12px;
    a{
      cursor: pointer;
      padding: 10px 18px;
      margin-left: 12px;
      border-radius: 5px;
      font-size: 14px;
      border:1px dotted #ddd;
    }
    a:hover{
      color: #2DB7F5;
      font-weight: 900;
    }
  }
  .btn:active{
    color: red;
    cursor: pointer;
    border-color: red;
  }
}


</style>
