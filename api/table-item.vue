<template>
    <!-- <div class="table-item-wrap">
      <div class="" v-for="(key,value) in model" >
        <ul class="" style="background-color:#ebf5df;border-bottom:2px solid #fff">
          {{key}}
        </ul>
        <div class="" v-if="isObject(value)" style="background-color:#d4d4aa">
          <table-item :model="value"></table-item>
        </div>
      </div>
    </div> -->
    <table>
        <tr v-for="(key, value) in model">
          <td>{{key}}</td>
        </tr>
        <tr>
          <table-item :model="value" v-if="isObject(value)"></table-item>
        </tr>
    </table>
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
<style media="screen" lang="sass">
  .table-item-wrap{
    color:#999;
  }
</style>
