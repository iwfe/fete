<template>
  <header id="header">
    <top-nav></top-nav>
  </header>
  <section id="main">
    <router-view transition="fadeInDown"></router-view>
  </section>
  <slide-menu v-if="$route.name === 'list'">
    <api-setting></api-setting>
  </slide-menu>
  <sub-slide-menu>
    <output-preview></output-preview>
  </sub-slide-menu>
</template>

<script type="text/babel">
import store from './vuex/store.js'
import TopNav from '../main_vue/top_nav.vue'
import SlideMenu from './components/slide_menu.vue';
import SubSlideMenu from './components/sub_slide_menu.vue';
import ApiSetting from './api_setting.vue';
import OutputPreview from './output_preview.vue';

export default {
  store,
  components: {
    TopNav,
    SlideMenu,
    SubSlideMenu,
    ApiSetting,
    OutputPreview
  }
}
</script>
<style lang="sass">
body {
  font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','\\5FAE\8F6F\96C5\9ED1',Arial,sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #666;
}
@-webkit-keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        -webkit-transform: translateY(0);
    }
}
@keyframes fadeInDown {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.fadeInDown-transition {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
}
.fadeInDown-enter {
    display: block;
}
.fadeInDown-leave {
    display: none;
}
</style>
