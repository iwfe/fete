/* 消息列表 */

<template>
    <div>
        <div v-for="item in msgList">
            {{item.createTime}}：{{item.userName}} {{item.operation}} {{item.desc}} -- {{item.status}}
        </div>
    </div>
</template>

<script type="text/babel">
    export default{
        data() {
            return {
                msgList: []
            }
        },
        ready() {
            this.getMsgList();
        },
        methods: {
            getMsgList() {
                fetch('/api/messages', {
                    body: {toUsers: pageConfig.me._id}
                }).then(res => {
                    this.msgList = res.data;
                });
            }
        }
    }
</script>

<style lang="sass">

</style>
