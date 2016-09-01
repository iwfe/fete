<template>
  <div id="api-detail">
    <editor-frame :output-model.sync="apiData.output"
                  :output-json.sync="apiData.outputJson"
                  :input-json.sync="apiData.input"
                  :input-model.sync="apiData.inputModel"
                  :is-add.sync="isAdd"
                  :editor-error.sync="editorError">
    </editor-frame>
  </div>
</template>

<script>
  import { tog } from './vuex/action'
  import editorFrame from './editor/editor_frame.vue'

  export default {
    components: {
      editorFrame
    },
    data() {
      return {
        apiData: pageConfig.api.data,
        isAdd: false,
        editorError: {}
      }
    },
    vuex: {
      actions: {
        tog
      }
    },
    ready() {
      $('#header').remove()
      // console.log(JSON.parse(JSON.stringify(this.apiData)))
      this.tog({ id: 123 })
      this.$broadcast('init-code-mirror-all')
    }
  }
</script>
