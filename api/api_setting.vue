<template>

<div id="api-detail" >
    <h3 class="ui header"><i class="icon settings"></i><div class="content">API设置</div></h3>
    <div class="ui two column middle very relaxed stackable grid">
        <div class="column">
            <div class="ui form">
                <div class="field">
                    <label>接口描述<i class="red">*</i></label>
                    <input type="text" placeholder="一句话描述">
                </div>
                <div class="field">
                    <label>method<i class="red">*</i></label>
                    <select class="ui fluid dropdown">
                        <option value=""></option>
                        <option value="get">get</option>
                        <option value="post">post</option>
                        <option value="put">put</option>
                        <option value="delete">delete</option>
                    </select>
                </div>
                <div class="field">
                    <label>输入数据格式<i class="red">*</i></label>
                    <textarea class="input-param" placeholder="输入数据格式"></textarea>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="ui form">
                <div class="field">
                    <label>接口地址<i class="red">*</i></label>
                    <input type="text" placeholder="接口URL地址">
                </div>

                <div class="field">
                    <label>修改说明<i class="red">*</i></label>
                    <input type="text" placeholder="接口修改说明">
                </div>
                <div class="field">
                    <label>接口修改日志</label>
                    <div class="api-log">
                        <div class="ui list very relaxed">
                            <div class="item">
                                <i class="file icon"></i>
                                <div class="content">
                                    <div class="header">张三</div>
                                    <div class="description">2016-06-18 新增了API</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ui form backData">
        <div class="field">
            <label>返回数据格式<i class="red">*</i></label>
            <textarea class="output-param" placeholder="返回数据格式"></textarea>
        </div>
    </div>


    <div class="operation-button">
        <button class="positive ui button">确定</button>
        <button class="negative ui button">删除</button>
        <button class="ui button">取消</button>
    </div>
</div>
<form>
<textarea id="code" class="input-param" placeholder="输入数据格式" v-el:root></textarea>
<edit-frame></edit-frame>
</form>
</template>

<script text="text/babel">
// const CodeMirror = require('codemirror/lib/codemirror.js')
// require('codemirror/lib/codemirror.css')
import editFrame from './editor_frame.vue'

// require('codemirror/addon/lint/lint.css')
// require('codemirror/mode/javascript/javascript.js')
// require('codemirror/mode/css/css.js')
// require('codemirror/addon/lint/lint.js')
// require('codemirror/addon/lint/json-lint.js')
export default {
  components: {
    editFrame
  },
  ready() {
    // const inputEditor = this.initEditor(document.getElementsByClassName('input-param')[0]);
    // const outputEditor = this.initEditor(document.getElementsByClassName('output-param')[0]);
    // const editor = CodeMirror.fromTextArea(this.$els.root, {
    //   lineNumbers: true,
    //   mode: 'application/json',
    //   gutters: ['CodeMirror-lint-markers'],
    //   lint: true
    // });
  },
  methods: {
    initEditor: function (input) {
      const editorJson = CodeMirror.fromTextArea(input, {
        lineNumbers: true,
        mode: 'application/json',
        gutters: ['CodeMirror-lint-markers'],
        lint: true
      });
      return editorJson;
    },
    isJson: function (str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    },
  }
}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/css">
#api-detail {
    width: 90%;
    margin: 10px auto;
    .red {
        color: red;
    }
    .backData {
        margin-top: 15px;
    }
    .api-log {
        width: 100%;
        height: 190px;
        overflow: auto;
    }
    .operation-button {
        display: flex;
        justify-content: space-between;
        margin: 20px auto 0;
        width: 50%;
    }
}

</style>
