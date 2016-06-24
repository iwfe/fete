<template>
    <div>
        <div class="list-item"
            v-for="item in apiList"
            @click="showDetail(item.id, $event)">
            {{item.title}} -- {{item.url}} -- {{item.method}}
        </div>
        <slide-menu></slide-menu>
    </div>
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

<style>

</style>
