<template>
    <!--<div class="table-item-wrap" >
      <div class="table-tr" v-for="(key, value) in model">
        <ul class="clearfix-sp" :class="{'files':isChild}">
          <li class="td-key" :class="{'folder':isFolder(value)}" @click="toggle"><i class="icon-plus"><span v-if="showChild">-</span><span v-else>+</span></i>{{key}}</li>
          <li class="td-remark"><span v-if="getDataType(value)==='String'">{{value}} </span></li>
          <li class="td-datatype">{{getDataType(value)}}</li>
          <li class="td-mock"><input class="mock-input" v-model=""></li>
        </ul>
        <div v-if="isFolder(value) && showChild" >
          <table-item :model="value | revertType" :is-child=true></table-item>
        </div>
      </div>
    </div>-->

    <!--<div class="table-item-wrap" >
      <div class="table-tr" v-for="item in model" :class="getLoopClass(loop)">
        <ul class="clearfix-sp" :class="{'folder':item.children}">
          <li class="td-key" @click="toggle"><i class="icon-plus"><span v-if="showChild">-</span><span v-else>+</span></i>{{item.key}}</li>
          <li class="td-remark" @click="toggleInput"><input class="mock-input comment-input" v-model="item.comment"></li>
          <li class="td-datatype">{{item.dataType}}</li>
          <li class="td-mock"><input class="mock-input" v-model="item.mock"></li>
        </ul>
        <div v-if="item.children" class="children">
          <table-item :model="item.children" :is-child=true :loop='loop+1'></table-item>
        </div>
      </div>
    </div>-->

  <div class="table-item-wrap" >
    <div class="table-tr" :class="getLoopClass(loop)">
      <ul class="clearfix-sp" :class="{'folder':model.children}">
        <li class="td-key"><i class="icon-plus"><span v-if="showChild">-</span><span v-else>+</span></i>{{model.key}}</li>
        <li class="td-remark" @click="toggleInput"><input class="mock-input comment-input" v-model="model.comment"></li>
        <!--<li class="td-datatype">{{model.dataType}}</li>-->
        <li class="td-datatype">{{model.dataType}}
            <!-- <select class="ui search dropdown datatype-search">
              <option value="">{{model.dataType}}</option>
              <option value="String">String</option>
              <option value="Object">Object</option>
              <option value="Array">Array</option>
              <option value="Number">Number</option>
              <option value="Boolean">Boolean</option>
            </select> -->
        </li>
        <li class="td-mock"><input class="mock-input" v-model="model.mock"></li>
      </ul>
      <div v-if="model.children && showChild" class="children">
        <table-item :model="model" :is-child=true :loop='loop+1' v-for="model in model.children"></table-item>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'table-item',
    props: {
      model: Object,
      isChild: Boolean,
      loop: Number
    },
    data() {
      return {
        showChild: true,
        showCommentInput: false
      }
    },
    filters: {
      revertType(obj) {
        const dataType = this.getDataType(obj);
        let returnData = '';
        if (dataType === 'Object') {
          returnData = obj;
        } else {
          returnData = obj[0];
        }
        return returnData;
      }
    },
    computed: {

    },
    ready() {
//      console.log(this.model);
      $('.datatype-search').dropdown();
    },
    methods: {
      isFolder(obj) {
        const dataType = this.getDataType(obj);
        let returnData = '';

        if (dataType === 'Object' || dataType === 'Array') {
          returnData = true;
        } else {
          returnData = false;
        }

        return returnData;
      },
      getDataType(obj) {
        const dataType = Object.prototype.toString.call(obj);
        switch (dataType) {
          case '[object String]':
            return 'String';
          case '[object Number]':
            return 'Number';
          case '[object Array]':
            return 'Array';
          case '[object Object]':
            return 'Object';
          case '[object Boolean]':
            return 'Boolean';
          default:
            return null;
        }
      },
      toggle() {
        const self = this;
        self.showChild = !self.showChild;
//        console.log('哈哈哈')
      },
      toggleInput() {
        const self = this;
        self.showCommentInput = !self.showCommentInput;
      },
      getLoopClass(loop) {
        const self = this;
        return `table-loop-${self.loop}`
      }
    }
  }
</script>
<style media="screen" lang="sass">
    .table-tr{
      &>ul{
        font-size: 0;
        width:80%;
        &>li{
          height: 24px;
          line-height: 24px;
          text-align: center;
          /*display: inline-block;*/
          float: left;
          font-size: 12px;
          background-color: #ddf0ed;
          border: 1px solid #fff;
        }
      }
      .td-key{
        text-align: left;
        text-indent: 20px;
        position: relative;
        width: 25%;
      }
      .folder{
        font-weight: bold;
        .icon-plus{
          display: inline-block;
        }
      }

      .icon-plus{
        display: none;
        position: absolute;
        font-style: normal;
        top: 0;
        left: -15px;
      }
      .td-remark{
        width: 30%;
      }
      .td-datatype{
        width: 10%;
        font-weight: bold;
      }
      .td-mock{
        width: 35%;
      }
      .mock-input{
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: 0;
        &:focus{
          outline: none;
        }
      }
      .files{
        &>li{
          background-color: #6C8CD5;
        }
        .td-key{
          text-indent: 40px;
        }

      }
    }


    .clearfix-sp {
      *zoom: 1;
      &:before,
      &:after {
        display: table;
        content: "";
        line-height: 0;
      }
      &:after {
        clear: both;
      }
    }

    .table-loop-2{
      &>ul>li{
        background-color: #FAFAD2;
      }
      .td-key{
        text-indent: 40px;
      }
    }
    .table-loop-3{
      &>ul>li{
        background-color: #eeeeff;
      }
      .td-key{
        text-indent: 60px;
      }
    }
    .datatype-search{
      width: 100%;
      height: 100%;
    }
</style>
