<template>
    <section id="main">
        <div class="list-item"
            v-for="item in apiList"
            @click="showDetail(item.id, $event)">
            {{item.title}} -- {{item.url}} -- {{item.method}}
        </div>
        <slide-menu></slide-menu>
    </section>
</template>

<script type="text/babel">
    import SlideMenu from './components/slide_menu.vue';

    export default {
        components: {
            SlideMenu
        },
        data () {
            return {
                apiList: []
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
