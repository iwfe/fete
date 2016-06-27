/* 消息列表 */

<template>
    <div class="msg-list">
        <table class="ui selectable celled table">
            <thead>
                <tr>
                    <th>时间</th>
                    <th>用户名</th>
                    <th>操作</th>
                    <th>描述</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(index, item) in msgList" :class="item.status == 1 ? 'positive' : ''">
                    <td>{{item.createTime}}</td>
                    <td>{{item.userName}}</td>
                    <td>{{item.operation}}</td>
                    <td>{{item.desc}}</td>
                    <td><span class='read-status' :class="{'read':item.status===1}" @click="updateStatus(item._id, index)">{{{item.status | msgStatus}}}</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/babel">

    Vue.filter('msgStatus', (value) => {
        return value == 1 ? '已读' : '未读';
    })
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
                    method: 'GET',
                    body: {toUsers: pageConfig.me._id}
                }).then(res => {
                    this.msgList = res.data;
                });
            },
            updateStatus(msgId, i) {
                fetch('/api/messages', {
                    method: 'PUT',
                    body: JSON.stringify({msgId: msgId})
                }).then(res => {
                    this.msgList[i].status = 1;
                });
            }
        }
    }
</script>

<style lang="sass">
    .msg-list {
        .read-status {
            display: inline-block;
            border: solid 1px #E74C3C;
            background: #E74C3C;
            color: #fff;
            width: 44px;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
            border-radius: 3px;
        }
        .read {
            border: solid 1px #1ABC9C;
            background: #1ABC9C;
        }
    }
</style>
