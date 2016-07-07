<template>
    <div class='editor-wrap'>
      <div class="field">
          <label><i class="red">*</i>输入数据格式</label>
          <!-- <textarea class="input-param" placeholder="输入数据格式" v-codemirror="apiData.input"></textarea> -->
          <textarea v-el:inputeditor ></textarea>
      </div>
      <div class="field">
          <label><i class="red">*</i>返回数据格式</label>
          <div class='input-frame'>
            <form>
              <!-- <textarea v-codemirror='inputData'></textarea> -->
              <textarea v-el:outputeditor ></textarea>
            </form>
          </div>
          <div class='save-button' @click='revertMock'>
            保存
          </div>
          <div class='mock-frame'>
            <!-- <textarea v-codemirror:readonly='mockData'></textarea> -->
            <textarea v-el:mockeditor ></textarea>
          </div>
          <div class='' v-if='outputModel.length'>
            <div class='table-tr table-head'>
              <ul class='clearfix-sp'>]
                <li class='td-key' style='text-align:center'>属性</li>
                <li class='td-datatype'>数据类型</li>
                <li class='td-remark'>含义</li>
                <li class='td-mock'>mock规则</li>
              </ul>
            </div>
            <table-item :model='output' :is-child=false :loop=1 v-for='output in outputModel'></table-item>
          </div>
          <!-- <textarea class="output-param" placeholder="返回数据格式" v-model="apiData.output[0]"></textarea> -->
      </div>
      <!-- <div class='input-frame'>
        <form>
          <textarea v-codemirror='inputData'></textarea>
          <textarea v-el:output-editor></textarea>
        </form>
      </div>
      <div class='save-button' @click='revertMock'>
        保存
      </div>
      <div class='mock-frame'>
        <textarea v-codemirror:readonly='mockData'></textarea>
      </div>
      <div class='' v-if='inputModel'>
        <div class='table-tr table-head'>
          <ul class='clearfix-sp'>]
            <li class='td-key' style='text-align:center'>属性</li>
            <li class='td-datatype'>数据类型</li>
            <li class='td-remark'>含义</li>
            <li class='td-mock'>mock规则</li>
          </ul>
        </div>
        <table-item :model='output' :is-child=false :loop=1 v-for='output in outputModel'></table-item>
      </div> -->
    </div>
</template>

<script type='text/babel'>
import tableItem from './table-item.vue'
import util from '../common/util.js'
require('./directive.js');
const mock = require('mockjs');
import { listActive } from './vuex/getters.js'

const o = [
  {
    key: 'status',
    comment: '状态位',
    dataType: 'String',
    mock: '1212',
    children: null
  },
  {
    key: 'msg',
    comment: '提示信息',
    dataType: 'String',
    mock: '',
    children: null
  },
  {
    key: 'data',
    comment: '数据',
    dataType: 'Array',
    mock: '',
    children: [
      {
        key: 'c2',
        comment: '啊哈哈',
        dataType: 'Object',
        mock: '',
        children: [
          {
            key: 'vc',
            comment: 'vc啊哈哈',
            dataType: 'String',
            mock: ''
          }
        ]
      },
      {
        key: 'c3',
        comment: 'hehe',
        dataType: 'Array',
        mock: '',
        children: [
          {
            key: 'v1',
            comment: 'v1hehe',
            dataType: 'String',
            mock: '',
          },
          {
            key: 'v2',
            comment: 'v2hehe',
            dataType: 'String',
            mock: '',
          }
        ]
      }
    ]
  }
];

const i = {
  status: '正确为1，错误非1',
  msg: '报错报错报错',
  data: [
    {
      c2: {
        vc: '11'
      },
      c3: {
        v1: '1',
        v2: '2'
      }
    }
  ]
}

export default {
  vuex: {
    getters: {
      list_active: listActive,
    }
  },
  components: {
    tableItem
  },
  props: {
    outputModel: {
      type: Array,
      default() {
        return [];
      },
      twoWay: true
    },
    showMock: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    outputJson: {
      type: Object,
      default() {
        return {}
      },
      twoWay: true
    }

  },
  data() {
    return {
      /*
      输入数据模型
       */
      inputEditor: {},
      inputData: '',
      inputModel: '',
      /**
       * outputEditor 返回数据编辑框对象
       * outputJson 返回数据编辑框取到的值
       *
       */
      outputEditor: {},
      outputData: '',
      mockEditor: {},
      testModel: {
        a: '1',
        b: {
          b1: '2',
          b2: '3'
        }
      },
      testData: '',
      mockData: 'lalla',
      parants: '',
      editorReady: false
    }
  },
  watch: {
    outputData(val) {
      const self = this;
      if (val && self.isJson(val)) {
        console.log('yes, is json');
        self.outputJson = JSON.parse(val.replace(/[\s\r\n]/, ''));
        self.outputModel = self.revertFormat(self.outputJson, []);
        console.log(JSON.stringify(self.outputModel));
      } else {
        console.log('no, is not json');
      }

      if (!val) {
        self.inputModel = '';
      }
    },
    list_active(v) {
      const self = this;
      // if (!v.id) {
      //   self.outputJson = {};
      //   self.outputModel = [];
      //   console.log('hehe');
      // } else {
      //   console.log(self.outputEditor);
      // }
    }
  },
  filters: {
    deepGet(key) {
      console.log(key);
    }
  },
  ready() {
    const self = this;
    // if (self.outputJson) {
    //   console.log(self.outputJson);
    //   self.inputData = JSON.stringify(self.outputJson, null, 2);
    // }
    // if (self.isAdd) {
    //   self.outputJson = {};
    //   self.outputModel = [];
    // }
    // self.outputEditor.setValue(111);
  },
  events: {
    'init-code-mirror-all'() {
      const self = this;
      if (self.editorReady) {
        return;
      }
      const inputEditorDom = self.$els.inputeditor;
      const outputEditorDom = self.$els.outputeditor;
      const mockEditorDom = self.$els.mockeditor;
      self.inputEditor = self.initEditor(inputEditorDom);
      self.outputEditor = self.initEditor(outputEditorDom);
      self.outputEditor.on('change', (cm, obj) => {
        self.outputData = $.trim(self.getEditorData('output'))
      });
      self.mockEditor = self.initEditor(mockEditorDom);
      self.editorReady = true;
      if (!self.list_active.id) {
        self.outputJson = {};
        self.outputModel = [];
      }
      self.setEditorData('output', self.outputJson);
    },
    'remove-code-mirror-all'() {
      self.editorReady = false;
    }
  },
  methods: {
    initEditor(dom, readOnly) {
      const editor = CodeMirror.fromTextArea(dom, {
        lineNumbers: true,
        mode: 'application/json',
        gutters: ['CodeMirror-lint-markers'],
        lint: true,
        readOnly: readOnly ? 'nocursor' : false
      });

      return editor;
    },
    getEditorData(editor) {
      const self = this;
      return self[`${editor}Editor`].getValue();
    },
    setEditorData(editor, value) {
      const self = this;
      const jsonStr = JSON.stringify(value, null, 2);
      self[`${editor}Editor`].setValue(jsonStr);
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
    revertFormat(inputModel, parents) {
      const self = this;
      const output = [];
      let children = '';
      let comment = '';
      let dataType = '';
      let mockModel = '';
      let child = '';
      _.each(inputModel, (value, key) => {
        const _dataType = util.getDataType(value);
        switch (_dataType) {
          case 'Object':
            child = self.comparison(key, parents, self.outputModel, 0)
            parents.push(key);
            children = self.revertFormat(value, parents);
            comment = child.comment;
            dataType = 'Object';
            mockModel = child.mock;
            parents.pop();
            break;
          case 'Array':
            child = self.comparison(key, parents, self.outputModel, 0)
            parents.push(key);
            children = self.revertFormat(value[0], parents);
            comment = child.comment;
            dataType = 'Array';
            mockModel = child.mock;
            parents.pop();
            break;
          default:
            if (o.length > 0) {
              child = self.comparison(key, parents, self.outputModel, 0)
              comment = child.comment || '';
              children = child.children || null;
              mockModel = child.mock || '';
              dataType = _dataType;
            } else {
              comment = value;
              children = null;
              dataType = _dataType;
              mockModel = '';
            }

            break;
        }
        const tmp = {
          key: key,
          comment: comment,
          dataType: dataType,
          mock: mockModel,
          children: children
        }
        output.push(tmp);
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
      const mockModel = util.mockTree2MockTemplate(self.outputModel);
      const mockData = mock.mock(mockModel);
      self.setEditorData('mock', mockData);
      // self.mockData = JSON.stringify(mockData, null, 2);
    },
    comparison(key, parents, output, loop) {
      const self = this;
      let child = '';
      const parentKey = parents[loop];
      if (parentKey) {
        output = self.findChild(parentKey, output).children;
        loop++;
        child = self.comparison(key, parents, output, loop);
      } else {
        child = self.findChild(key, output)
      }
      return child;
    },
    findChild(key, output) {
      let v = '';
      _.each(output, (item) => {
        if (item.key === key) {
          v = item;
        }
      });
      return v;
    }
  }
}
</script>
<style media='screen' lang='sass'>
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
