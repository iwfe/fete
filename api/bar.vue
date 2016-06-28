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
    padding-right: 12px;
    padding-top: 12px;
    min-height: 350px;
}
#_bar div{
    letter-spacing: 6px;
    height: 40px;
    cursor: pointer;
    line-height: 40px;
    padding: 0 16px 0 20px;
    font-weight: 900;
}
#_bar div:hover{
    color: #2DB7F5;
}
#_bar div.active{
    border-radius: 5px;
    color: #fff;
    background: #2DB7F5;
    cursor: pointer;
    font-size: 16px;
}
</style>
