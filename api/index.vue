<template>
    <header id="header">
        <top-nav></top-nav>
    </header>
    <section id="main">
        <router-view></router-view>
    </section>
</template>

<script type="text/babel">
    import TopNav from './top_nav.vue';
    export default {
        components: {
            TopNav
        },
        data () {
            return {
            }
        },
        props: {},
        ready() {
            
        },
        methods: {

        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" type="text/css">
    .list-item {
        height: 40px;
        line-height: 40px;
        border: 1px solid #eee;
        margin-bottom: -1px;
        cursor: pointer;
        &:hover {
            background-color: #fafafa;
        }
    }
</style>
