<template>
  <div>
    <div class="header">
      <button class="close-btn" @click="closePanel">close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'output-preview',
  data() {
    return {

    }
  },
  methods: {
    closePanel() {
      this.$parent.$emit('sub-slide-menu-close')
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
