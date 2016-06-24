/* 消息列表 */

<template>
    <div>
        <div v-for="item in msgList">
            {{item.createTime}}：{{item.userName}} {{item.operation}} {{item.desc}} -- {{item.status}}
        </div>
    </div>
</template>

<script type="text/babel">
    import TopNav from './top_nav.vue';
    export default{
        data() {
            return {
                msgList: []
            }
        },
        components:{
            TopNav
        },
        ready() {
            new TopNav().$mount('#header');
            this.getMsgList();
        },
        methods: {
            getMsgList() {
                fetch('/api/messages', {
                    body: {userId: pageConfig.me._id}
                }).then(res => {
                    this.msgList = res.data;
                });
            }
        }
    }
</script>

<style lang="sass">

</style>
