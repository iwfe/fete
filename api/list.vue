<template>
    <div>

    </div>
</template>

<script type="text/babel">
    export default {
        components: {},
        data () {
            return {
                list: []
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
                    this.list = res.data;
                });
            }
        }
    }
</script>

<style>

</style>
