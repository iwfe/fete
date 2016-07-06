<template>
    <div class='editor-wrap'>
      <div class='input-frame' >
        <form>
          <textarea v-codemirror='inputData'></textarea>
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
      </div>
    </div>
</template>

<script type='text/babel'>
import tableItem from './table-item.vue'
import util from '../common/util.js'
require('./directive.js');
const mock = require('mockjs');

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
      },
      testData: '',
      mockData: 'lalla',
      parants: ''
    }
  },
  watch: {
    inputData(val) {
      const self = this;
      if (val && self.isJson(val)) {
        console.log('yes, is json');
        self.inputModel = JSON.parse(val.replace(/[\s\r\n]/, ''));
        self.outputModel = self.revertFormat(self.inputModel, []);
        console.log(JSON.stringify(self.outputModel));
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
    const self = this;
    // const a = self.revertFormat(i, []);
    // console.log(JSON.stringify(a));
    // console.log(_.extend(a, o));
    // console.log(_.keys(i));
  },
  methods: {

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
      // let initParents = parents;
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
            console.log(parents);
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
        // console.log(tmp);
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
      // this.$parent.$parent.$parent.$broadcast('sub-slide-menu-open')
      const mockModel = util.mockTree2MockTemplate(self.outputModel);
      const mockData = mock.mock(mockModel);
      self.mockData = JSON.stringify(mockData, null, 2);
    },
    comparison(key, parents, output, loop) {
      // console.log(key, parents);
      const self = this;
      let child = '';
      const parentKey = parents[loop];
      if (parentKey) {
        // console.log(parentKey);
        // console.log('before', output);
        output = self.findChild(parentKey, output).children;
        // console.log('after', output);
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
