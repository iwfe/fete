<template>
    <header id="header">
        <top-nav></top-nav>
    </header>
    <router-view transition="fadeInDown"></router-view>
    <slide-menu v-if="$route.name === 'list'"><api-setting></api-setting></slide-menu>
</template>

<script type="text/babel">
    import store from './vuex/store.js'
    import TopNav from './top_nav.vue';
    import SlideMenu from './components/slide_menu.vue';
    import ApiSetting from './api_setting.vue';
    export default {
        store,
        components: {
            TopNav,
            SlideMenu,
            ApiSetting
        },
        data () {
            return {
            }
        },
        props: {},
        ready() {},
        methods: {}
    }
</script>

<style lang="sass" rel="stylesheet/scss" type="text/css">
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
