<template>
    <div class="">
      <div class="" v-for="(key,value) in model" >
        <div class="" style="border:1px solid #ccc">
          {{key}}
        </div>
        <div class="" v-if="isObject(value)" style="padding-left:20px">
          <table-item :model="value"></table-item>
        </div>
      </div>
    </div>
</template>
<script type="text/babel">
  export default {
    name: 'table-item',
    props: {
      model: Object
    },
    ready() {
      console.log(this.model);
    },
    methods: {
      isObject(value) {
        return _.isObject(value);
      }
    }
  }
</script>
