<template>
    <div id="_path">
        <span>满懿企业号 ></span>
        <span>产品百科 ></span>
        <span> prd1.2</span>
        <div class="btn">http://www.baidu.com/<a>复制</a></div>
    </div>
</template>

<script type="text/babel">
export default {
  components: {

  },
  data() {
    return {

    }
  },
  props: {},
  ready() {
  },
  methods: {

  }
}
</script>

<style>
#_path{
  line-height: 28px;height: 40px;
  border-bottom: 1px dashed #ddd;
  color: #999;
}
#_path .btn{
  border-radius: 5px;
  float:right;
  padding: 0 16px;
  font-size: 12px;
}
#_path .btn a{
  cursor: pointer;
  padding: 10px 12px;
  margin-left: 12px;
  border-radius: 5px;
  font-size: 14px;
  border:1px dotted #ddd;
}
#_path .color{
  cursor: pointer;
  color: #2DB7F5;
}
#_path .color:hover{
  border:1px solid #ddd;
}
#_path .btn:active{
  color: red;
  cursor: pointer;
  border-color: red;
}
#_path span{
  color: #999;
  margin-left: 12px;
}
</style>
