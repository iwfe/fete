<template>
    <div>
        <div v-for="item in apiList">
            {{item.title}} -- {{item.url}} -- {{item.method}}
        </div>
    </div>
</template>

<script type="text/babel">
    import TopNav from './top_nav.vue';

    export default {
        components: {},
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
            }
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" type="text/css">

</style>
