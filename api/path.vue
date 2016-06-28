<template>
    <div id="_path">
        <span>满懿企业号 ></span>
        <span>产品百科 ></span>
        <span> prd1.2</span>
        <a class="btn">http://www.baidu.com/<span class="color">点击复制</span></a>
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
}
#_path .color{
    cursor: pointer;
    color: #2DB7F5;
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
