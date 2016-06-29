<template>
  <div id="_bar">
    <div @click="add" class="add active">新建</div>
    <div @click="del" class="del">删除</div>
  </div>
</template>

<script type="text/babel">
  import { add, del } from './vuex/action'
  export default {
    vuex: {
      actions: {
        add,
        del
      }
    },
    ready() {

    }
  }
</script>

<style>
#_bar{
    float: left;
    height: 100%;
    padding: 12px;
    min-height: 350px;
}
#_bar div{
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    font-weight: 900;
    padding: 0 12px;
    margin-bottom: 10px;
}
#_bar div:hover{
    color: #2DB7F5;
}
#_bar div.active{
    border-radius: 6%;
    color: #fff;
    background: #2DB7F5;
    cursor: pointer;
}
</style>
