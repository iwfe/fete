<template>
  <header id="header">
    <top-nav></top-nav>
  </header>
  <section id="main">
    <router-view></router-view>
  </section>
  <slide-menu v-if="$route.name === 'list'">
    <api-setting></api-setting>
  </slide-menu>
</template>

<script type="text/babel">
import store from './vuex/store.js'
// import List from './main_list.vue'
// import Bar from './main_bar.vue'
// import Path from './main_path.vue'
import TopNav from '../main_vue/top_nav.vue'
import SlideMenu from './components/slide_menu.vue';
import ApiSetting from './api_setting.vue';

export default {
  store,
  components: {
    // List,
    // Path,
    // Bar,
    // MainFilter,
    TopNav,
    SlideMenu,
    ApiSetting
  },
  ready() {

  },
  events: {
    // open() {
    //   this.$parent.$broadcast('slide-menu-open');
    //   this.$broadcast('getDetail');
    // }
  }
}
</script>
<style lang="sass">
body {
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #666;
}
</style>
