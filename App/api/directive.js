/**
* @Author: chenjiangsong
* @Date:   2016-07-05 22:07:00
* @Email:  chenjiangsong.sh@superjia.com
* @Last modified by:   chenjiangsong
* @Last modified time: 2016-07-06 14:07:08
*/
const CodeMirror = require('codemirror/lib/codemirror.js');
require('codemirror/lib/codemirror.css');
require('codemirror/addon/lint/lint.css');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/css/css.js');
require('jsonlint/lib/jsonlint.js');
require('codemirror/addon/lint/lint.js');
require('codemirror/addon/lint/json-lint.js');

Vue.directive('codemirror', {
  twoWay: true,
  bind: function () {
      // 请自行初始化CodeMirror, 可使用 $(this.el).data('codemirror')
    let readOnly = false;
    if (this.arg === 'readonly') {
      readOnly = true;
    }
    console.log(11);
    const editor = CodeMirror.fromTextArea(this.el, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      lint: true,
      readOnly: readOnly
    })
    this.editor = editor;

    this.editor.on('change', () => {
      this.set(this.editor.getValue());
    });
  },
  update: function (value, oldValue) {
    // this.silent = true;
    // this.editor.setValue(this.vm.$data[this.raw]);
    // this.silent = false;
    this.editor.setValue(value || this.el.value);
  }
});
