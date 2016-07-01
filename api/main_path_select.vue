<template>
<div class="ui selection dropdown" tabindex="0">
  <input name="gender" type="hidden" value="default">
  <i class="dropdown icon"></i>
  <div class="default text">Select a value</div>
  <div class="menu transition hidden" tabindex="-1">
    <div class="item" data-value="0">Value</div>
    <div class="item" data-value="1">Another Value</div>
  </div>
</div>
</template>

<script type="text/babel">
export default {
  components: {

  },
  props: {

  },
  ready() {

  },
  methods: {

  }
}
</script>

<style lang="sass">
.path_select{
  padding: 0 12px;
  float: left;
  .path_select_list{

  }
}
</style>
