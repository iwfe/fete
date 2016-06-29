<template>
    <div class="editor-wrap">
      <textarea name="name" rows="8" cols="40" v-el:input></textarea>
    </div>
</template>
<script type="text/babel">
const CodeMirror = require('codemirror/lib/codemirror.js')
require('codemirror/lib/codemirror.css')

export default {
  ready() {
    const editor = CodeMirror.fromTextArea(this.$els.input, {
      lineNumbers: true,
      mode: 'text/html',
      // gutters: ['CodeMirror-lint-markers'],
      // lint: true
    });
  }
}
</script>
<style media="screen" lang="sass">

</style>
