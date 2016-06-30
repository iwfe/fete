<template>
    <div class="editor-wrap">
      <div class="input-frame">
        <form>
          <textarea v-el:input v-model="inputData"></textarea>
        </form>
      </div>
      <div class="test">
      </div>
      <div class="table">
        <table-item :model="inputModel"></table-item>
      </div>
    </div>
</template>

<script type="text/babel">
import tableItem from './table-item.vue'
const CodeMirror = require('codemirror/lib/codemirror.js')
require('codemirror/lib/codemirror.css')
require('codemirror/addon/lint/lint.css')
require('codemirror/mode/javascript/javascript.js')
require('codemirror/mode/css/css.js')
require('jsonlint/lib/jsonlint.js')
require('codemirror/addon/lint/lint.js')
require('codemirror/addon/lint/json-lint.js')
export default {
  components: {
    tableItem
  },
  data() {
    return {
      inputData: '',
      inputModel: {},
      inputEditor: {},
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
        console.log(self.inputModel.aa);
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
    setTimeout(() => {
      self.inputEditor = self.initEditor(self.$els.input);
      self.inputEditor.on('change', (cm, obj) => {
        self.inputData = $.trim(self.getInputData());
      });
    }, 100)
  },
  methods: {
    initEditor(dom) {
      const editor = CodeMirror.fromTextArea(dom, {
        lineNumbers: true,
        mode: 'application/json',
        gutters: ['CodeMirror-lint-markers'],
        lint: true
      })
      return editor;
    },
    getInputData() {
      const self = this;
      return self.inputEditor.getValue();
    },
    isJson(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  }
}
</script>
<style media="screen" lang="sass">
  .editor-wrap{
    /* padding-left:100px; */
    .input-frame{
      width:50%;
      border:1px solid;
      border-color:rgb(221,221,221);
    }
  }
</style>
