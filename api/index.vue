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
            this.getList();
        },
        methods: {
            getList () {
                fetch('/api/apis', {
                    body: {prdId: '111'}
                }).then(res => {
                    this.apiList = res.data;
                });
            },
            showDetail (id, e) {
                this.$broadcast('slide-menu-open');
                e.stopPropagation();   // 阻止冒泡
            }
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
