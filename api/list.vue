<template>
    <section id="main">
        <div class="list-item"
            v-for="item in apiList"
            @click="showDetail(item._id, $event)">
            {{item.title}} -- {{item.url}} -- {{item.method}}
        </div>
        <button class="ui icon button">
            <i class="cloud icon"></i>
        </button>
    </section>
</template>

<script type="text/babel">
    export default {
        components: {
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
                this.$parent.$broadcast('slide-menu-open');
                e.stopPropagation();   // 阻止冒泡

                // just for test
                fetch('/api/apis', {
                    method: 'POST',
                    body: {
                        name: '中文',
                        apiId: id
                    }
                }).then(res => {
                    console.log(res);
                });
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
