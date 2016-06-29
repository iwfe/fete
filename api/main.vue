<template>
  <section id="container">
    <path></path>
    <bar></bar>
    <list></list>
    <slide-menu v-if="$route.name === 'list'">
      <api-setting></api-setting>
    </slide-menu>
  </section>
</template>

<script type="text/babel">
import store from './vuex/store.js'
import List from './list.vue'
import Bar from './bar.vue'
import Path from './path.vue'
import SlideMenu from './components/slide_menu.vue';
import ApiSetting from './api_setting.vue';

export default {
  store,
  components: {
    List,
    Path,
    Bar,
    SlideMenu,
    ApiSetting
  },
  ready() {

  },
  events: {
    open() {
      this.$parent.$broadcast('slide-menu-open');
      this.$broadcast('getDetail');
    }
  }
}
</script>
