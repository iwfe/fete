/* 消息列表 */
<template>
    <section id="main">
    <div class="msg-list">
        <table class="ui selectable celled table">
            <thead>
                <tr>
                    <th>时间</th>
                    <th>用户名</th>
                    <th>操作</th>
                    <th>描述</th>
                    <th>状态<button class="ui basic button all-read" @click="updateStatusBatch()"><i class="icon user"></i>全部已读</button>
                        <button class="ui basic button all-read" @click="add()">add msg</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(index, item) in msgList" :class="item.status == 1 ? 'positive' : ''">
                    <td>{{item.createTime}}</td>
                    <td>{{item.userName}}</td>
                    <td>{{item.operation}}</td>
                    <td>{{item.desc}}</td>
                    <td><span class='read-status' :class="{'read':item.status===1}" @click="updateStatus(item._id, index, item.status)">{{{item.status | msgStatus}}}</span></td>
                </tr>
            </tbody>
        </table>
        <div class="ui modal small">
          <div class="header">Header</div>
        </div>
    </div>
    </section>
</template>

<script type="text/babel">
  // require('./socket/server.js')
  // require('./socket/client.js')

  Vue.filter('msgStatus', (value) => {
    return value === 1 ? '已读' : '未读';
  })
  export default {
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
          body: { toUsers: pageConfig.me._id }
        }).then(res => {
          this.msgList = res.data;
        });
      },
      updateStatus(msgId, i, status) {
        if (status === 1) return;
        fetch('/api/messages', {
          method: 'PUT',
          body: JSON.stringify({ msgId: msgId })
        }).then(res => {
          this.msgList[i].status = 1;
        });
      },
      updateStatusBatch() {
        // 全部已读
        // $('.small.modal').modal('show');
        if (confirm('确定要全部已读吗？')) {
          fetch('/api/messages', {
            method: 'PUT',
            body: JSON.stringify({ msgId: null })
          }).then(res => {
            this.msgList.forEach((item) => {
              item.status = 1;
            })
          });
        }
      },
      add() {
        socket.on('news', (data) => {
          alert(data);
          socket.emit('news', 'newsss');
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
            cursor: pointer;
        }
        .read {
            border: solid 1px #1ABC9C;
            background: #1ABC9C;
            cursor: default;
        }
        .all-read {
            margin-left: 10px;
            font-size: 12px;
            padding: 5px 10px;
        }
    }
</style>
