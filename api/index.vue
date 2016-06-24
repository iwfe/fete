<template>
    <div>
        <div class="list-item"
            v-for="item in apiList"
            @click="showDetail(item.id, $event)">
            {{item.title}} -- {{item.url}} -- {{item.method}}
        </div>
        <list></list>
        <slide-menu></slide-menu>
    </div>
</template>

<script type="text/babel">
    import TopNav from './top_nav.vue';
    import SlideMenu from './components/slide_menu.vue';
    import List from './list.vue';
    export default {
        components: {
            SlideMenu,
            List
        },
        data () {
            return {
                apiList: []
            }
        },
        props: {},
        ready() {
            new TopNav().$mount('#header');

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
