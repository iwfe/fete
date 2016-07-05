<template>
    <div class="editor-wrap">
      <div class="input-frame">
        <form>
          <textarea v-el:input v-model="inputData"></textarea>
        </form>
      </div>
      <div class="save-button" @click="revertMock">
        保存
      </div>
      <div class="mock-frame" v-if="showMock">
        <textarea v-el:mock></textarea>
      </div>
      <div class="" v-if="inputModel">
        <div class="table-tr table-head">
          <ul class="clearfix-sp">]
            <li class="td-key" style="text-align:center">属性</li>
            <li class="td-remark">含义</li>
            <li class="td-datatype">数据类型</li>
            <li class="td-mock">mock规则</li>
          </ul>
        </div>
        <!--<table-item :model="inputModel" :is-child=false></table-item>-->
        <!--<table-item :model="outputModel" :is-child=false :loop=1></table-item>-->
        <table-item :model="output" :is-child=false :loop=1 v-for="output in outputModel"></table-item>
      </div>
    </div>
</template>

<script type="text/babel">
import tableItem from './table-item.vue'
import util from '../common/util.js'
const CodeMirror = require('codemirror/lib/codemirror.js');
require('codemirror/lib/codemirror.css');
require('codemirror/addon/lint/lint.css');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/css/css.js');
require('jsonlint/lib/jsonlint.js');
require('codemirror/addon/lint/lint.js');
require('codemirror/addon/lint/json-lint.js');
const mock = require('mockjs');
export default {
  components: {
    tableItem
  },
  props: {
    outputModel: {
      type: Array,
      default: [],
      twoWay: true
    },
    showMock: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputData: '',
      inputModel: '',
      inputEditor: {},
      mockEditor: {},
      testModel: {
        a: '1',
        b: {
          b1: '2',
          b2: '3'
        }
      }
    }
  },
  watch: {
    inputData(val) {
      const self = this;
      if (val && self.isJson(val)) {
        console.log('yes, is json');
        self.inputModel = JSON.parse(val.replace(/[\s\r\n]/, ''));
        self.outputModel = self.revertFormat(self.inputModel);
      } else {
        console.log('no, is not json');
      }

      if (!val) {
        self.inputModel = '';
      }
    }
  },
  filters: {
    deepGet(key) {
      console.log(key);
    }
  },
  ready() {
    const inputFrame = this.$els.input;
    const self = this;
    const mockFrame = this.$els.mock;

    setTimeout(() => {
      self.inputEditor = self.initEditor(inputFrame);
      self.inputEditor.on('change', (cm, obj) => {
        self.inputData = $.trim(self.getInputData());
      });
    }, 100)
    // self.inputEditor.setSize('auto', 'auto');

    self.mockEditor = self.initEditor(mockFrame, true);
    // setTimeout(() => {
    //   mockFrame.value = JSON.stringify(js, null, 2);
    //   self.mockEditor = self.initEditor(mockFrame, true);
    // }, 1000);
  },
  methods: {
    /**
     * 初始化codeMirror编辑区
     * @param dom
       */
    initEditor(dom, readOnly) {
      const editor = CodeMirror.fromTextArea(dom, {
        lineNumbers: true,
        mode: 'application/json',
        gutters: ['CodeMirror-lint-markers'],
        lint: true,
        readOnly: readOnly ? 'nocursor' : false
      })
      return editor;
    },
    /**
     * 获取输入数据
     * @returns {*}
       */
    getInputData() {
      const self = this;
      return self.inputEditor.getValue();
    },
    /**
     * 校验输入数据是否为json
     * @param str
     * @returns {boolean}
       */
    isJson(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    },
    /**
     * 校验Object
     * @param val
     * @returns {Boolean}
       */
    isObject(val) {
      return _.isObject(val);
    },
    /**
     * 将inputModel的每个字段转化成api接口字段output的数组元素
     * @param inputModel
     * @returns {{key: *, comment: string, dataType: string, mock: string, children: Array}}
       */
    revertFormat(inputModel) {
      const self = this;
      const output = [];
      let children = '';
      let comment = '';
      let dataType = '';
      _.each(inputModel, (value, key) => {
        const _dataType = vueCommon.getDataType(value);
        switch (_dataType) {
          case 'Object':
            children = self.revertFormat(value);
            comment = '';
            dataType = 'Object';
            break;
          case 'Array':
            children = self.revertFormat(value[0]);
            comment = '';
            dataType = 'Array';
            break;
          default:
            comment = value;
            children = null;
            dataType = _dataType;
            break;
        }
        output.push({
          key: key,
          comment: '',
          dataType: dataType,
          mock: '',
          children: children
        });
      })
      return output;
    },
    /**
     * 校验value是否为对象或数组(是的话则为称呼为folder)
     * @param obj
       */
    isFolder(obj) {
      let returnData = '';
      if (_.isArray(obj) || _.isObject(obj)) {
        returnData = true;
      } else {
        returnData = false;
      }
      return returnData;
    },
    revertMock() {
      const self = this;
      console.log(self.outputModel);
      this.$parent.$parent.$parent.$broadcast('sub-slide-menu-open')
      const mockModel = util.mockTree2MockTemplate(self.outputModel);
      const mockData = mock.mock(mockModel);

      self.mockEditor.setValue(JSON.stringify(mockData, null, 2));
    }
  }
}
</script>
<style media="screen" lang="sass">
  .editor-wrap{
    li{
      list-style:none;
    }
    .input-frame{
      display:inline-block;
      width: 45%;
      /* height:300px; */
      border: 1px solid rgb(221,221,221);
    }
    .mock-frame{
        display:inline-block;
        width:45%;
        border:1px solid rgb(221,221,221)
    }
    .save-button{
      display:inline-block;
      width:8%;
      height:40px;
      line-height:40px;
      background-color:#ccc;
      text-align:center;
    }
    .table-head{
      font-weight: bold;
    }
  }
</style>
