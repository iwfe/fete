<template>
  <div class="table-item-wrap" >
    <div class="table-tr" :class="getLoopClass(loop)">
      <ul class="clearfix-sp" :class="{'folder':model.children}">

        <li class="td-key"><i class="icon-plus"><span v-if="showChild">-</span><span v-else>+</span></i>{{model.key}}</li>

        <li class="td-datatype">{{model.dataType}}
          <slot></slot>
        </li>

        <li class="td-remark">
          <comment-input :value.sync="model.comment" :class="getCommentInputClass"></comment-input>
          <input class="mock-input comment-input" v-model="model.comment" @click.stop="showInput('comment')">
        </li>

        <li class="td-mock" v-if="type=='output'">
          <comment-input :value.sync="model.mock" :class="getMockInputClass"></comment-input>
          <input class="mock-input" v-model="model.mock" @keyup.enter="revertMock" @click.stop="showInput('mock')">
        </li>

        <li class="td-mock" v-if="type=='input'">
          <input type="checkbox" v-model="model.require" class="mock-input require-checkbox">
          <label for="checkbox" v-if="model.require" class="require-label">必需</label>
          <label for="checkbox" v-if="!model.require" class="require-label">非必需</label>
        </li>
      </ul>
      <div v-if="model.children && showChild" class="children">
        <table-item :model="model" :is-child=true :loop='loop+1' v-for="(index,model) in model.children" :type="type" :index1st="index1st" :index2nd="index+1"></table-item>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import util from '../../common/util.js'
  import CommentInput from './comment_input.vue'
  export default {
    name: 'table-item',
    components: {
      CommentInput
    },
    props: {
      model: Object,
      index1st: Number,
      isChild: Boolean,
      loop: Number,
      type: String,
      index2nd: {
        type: Number,
        default: 0
      }
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
      getCommentInputClass() {
        return `comment-${this.type}-${this.index1st}-${this.index2nd}`
      },
      getMockInputClass() {
        return `mock-${this.type}-${this.index1st}-${this.index2nd}`
      }
    },
    ready() {
      // $('.comment-input-wrap').addClass('commentHide')
    },
    events: {
      showInput: 'showInput'
    },
    methods: {
      isFolder(obj) {
        const dataType = util.getDataType(obj);
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
      },
      toggleInput() {
        const self = this;
        // self.showCommentInput = !self.showCommentInput;
      },
      getLoopClass(loop) {
        const self = this;
        return `table-loop-${self.loop}`
      },
      revertMock() {
        const self = this;
        self.$dispatch('revertMock');
      },
      showInput(textareaType) {
        let thisInput;
        if (textareaType === 'comment') {
          thisInput = $(`.${this.getCommentInputClass}`)
        } else {
          thisInput = $(`.${this.getMockInputClass}`)
        }
        $('.comment-input-wrap').removeClass('commentShow')
        if (thisInput.hasClass('commentShow')) {
          thisInput.removeClass('commentShow')
        } else {
          thisInput.addClass('commentShow')
          thisInput.find('.comment-textarea').focus()
        }
      }
    }
  }
</script>
<style media="screen" lang="sass">
    .commentShow{
        display:block !important;
    }
        .commentHide{
            display:none
        }
        .table-tr{
          &>ul{
            font-size: 0;
            width:100%!important;
            &>li{
              height: 30px;
              line-height: 30px;
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
            position:relative;
            width: 30%;
          }
          .td-datatype{
            width: 10%;
            font-weight: bold;
          }
          .td-mock{
            position:relative;
            width: 35%;
          }
          .td-mock a {
            color: #333
          }
          .mock-input{
            display: inline-block;
            width: 100%;
            height: 100%;
            background-color: transparent!important;
            border: 0!important;
            &:focus{
              outline: none;
            }
          }
          .require-checkbox{
            width:auto;
          }
          .require-label{
            display:inline-block;
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
