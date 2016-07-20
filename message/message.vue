/* 消息列表 */
<template>
    <section id="main">
    <div class="msg-list">
        <table class="ui selectable celled table">
            <thead>
                <tr>
                    <th width="20%">时间</th>
                    <th width="10%">用户名</th>
                    <th width="10%">平台</th>
                    <th width="10%">操作</th>
                    <th>描述</th>
                    <th style="width: 16%;">状态<button class="ui basic button all-read" @click="updateStatusBatch()"><i class="icon user"></i>全部已读</button>
                    <!-- <button class="ui basic button all-read" @click="addMsg">add</button></th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(index, item) in msgList" :class="item.status !== 0 ? 'positive' : ''">
                    <td>{{item.createTime}}</td>
                    <td>{{item.userName}}</td>
                    <td>{{item.platform}}</td>
                    <td>{{item.action}}</td>
                    <td>{{item.actionDetail.message}}</td>
                    <td>
                      <span v-if="item.actionDetail.btns && item.status===0" v-for="btn in item.actionDetail.btns" class='read-status read mbtn' :class="btn.style ? btn.style : ''"
                          @click="doAjax(btn, item.id, index)"
                        >
                        <a v-if="btn.type === 'link'" href="{{btn.linkUrl}}">{{btn.text}}</a>
                        <em v-else>{{btn.text}}</em>
                      </span>
                      <!-- 未读 -->
                      <span v-if="!item.actionDetail.btns && item.status === 0" class='read-status' @click="updateStatus(item.id, index, item.status)">{{item | msgStatus}}</span>
                      <!-- 已读 -->
                      <span v-if="item.status != 0" class='read-status read' :class="{invited: item.action === 'invited'}" >{{item | msgStatus}}</span>

                    </td>
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

  Vue.filter('msgStatus', (message) => {
    const { status, resultText } = message;
    const statusMap = { 0: '未读', 1: '已读', 2: '已操作' };
    return !resultText ? statusMap[status] : resultText;
  });
  const username = pageConfig.me.username;
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
        fetch('/message/messages', {
          method: 'GET',
          body: { userId: username }
        }).then((res) => {
          this.msgList = res.data;
        });
      },
      // newStatus: 0未读, 1已读, 2已操作
      updateStatus(msgId, i, curStatus, newStatus, resultText) {
        if (curStatus !== 0) return; // 不是未读

        if (!newStatus) newStatus = 1;
        if (resultText === 1 || !resultText) resultText = '已读';

        fetch('/message/messages', {
          method: 'PUT',
          body: JSON.stringify({ userId: username, msgId: msgId, status: newStatus, resultText: resultText })
        }).then((res) => {
          this.msgList[i].status = 1;
          this.msgList[i].resultText = resultText;
        });
      },
      updateStatusBatch() {
        // 全部已读
        // $('.small.modal').modal('show');
        if (confirm('确定要全部已读吗？')) {
          fetch('/message/messages', {
            method: 'PUT',
            body: JSON.stringify({ userId: username, msgId: null, status: 1 })
          }).then(res => {
            this.msgList.forEach((item) => {
              if (item.action !== 'invited') {
                item.status = 1;
                item.resultText = '已读';
              }
            });
          });
        }
      },
      /**
       * 处理邀请信息
       * @param type 1:接受，2，拒绝
       * @param actionDetail 对象：{ team: { id:'xxx', name: 'xxx' } }
       */
      doAjax(btnInfo, msgId, i) {
        const self = this;
        const ajaxInfo = btnInfo.ajax;
        const resultText = btnInfo.resultText;
        if (!ajaxInfo || !ajaxInfo.url) return;
        fetch(ajaxInfo.url, {
          method: ajaxInfo.method ? ajaxInfo.method : 'GET',
          body: ajaxInfo.body ? ajaxInfo.body : {}
        }).then(res => {
          console.log(`===${resultText}`);
          self.updateStatus(msgId, i, 0, 2, resultText)
        });
      }
      // ,
      // addMsg() {
      //   let msg = { userName: 'jade', msgType: '1', platform: 'api', platformId: '576b401056e121e6c9ef082b', action: 'add', actionDetail: { message: '新增消息接口' } };
      //   msg = {
      //     userName: 'jade',   // 操作人姓名
      //     msgType: '0',   // 消息类型：系统(0)，提醒(1)
      //     platform: 'team',    // 平台类型(team, project, prd, api)
      //     platformId: '4dOaCN',   // 平台Id
      //     action: 'invited', // 操作 (如：add, update, delete,invited)
      //     actionDetail: {
      //       message: 'lancui, 邀请你加入全新项目组',
      //       btns: [{
      //         text: '接受',
      //         type: 'ajax',
      //         style: 'primary',
      //         ajax: {
      //           url: '/team/member/invited/accept',
      //           method: 'post',
      //           body: {
      //             teamId: '4dOaCN',
      //           }
      //         }
      //       }, {
      //         text: '拒绝',
      //         type: 'link',
      //         style: 'danger',
      //         linkUrl: 'http://www.baidu.com'
      //       }]
      //     }, // 操作描述
      //     // createTime: new Date, // 创建时间
      //     // toUsers: [{
      //     //   userId: 'lancui', // 提醒用户ID
      //     //   status: 0 // 0未读, 1已读
      //     // }]
      //   };
      //   fetch('/message/messages', {
      //     method: 'POST',
      //     body: JSON.stringify({ msgData: msg })
      //   }).then(res => {
      //     this.getMsgList();
      //   });
      // }

    }
  }
</script>

<style lang="sass">
    .msg-list {
        padding: 10px 15px;
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
        .mbtn {
           cursor: pointer;
           margin-right: 5px;
        }
        .primary {
          border: solid 1px #21BA45;
          background: #21BA45;
        }
        .warning {
          border: solid 1px #ff7701;
          background: #ff7701;
        }
        .danger {
          border: solid 1px #DB2828;
          background: #DB2828;
        }
        .invited {
          border: solid 1px #81c784;
          background: #81c784;
        }
        .all-read {
            margin-left: 10px;
            font-size: 12px;
            padding: 5px 10px;
        }
        em {
          font-style: normal;
        }
        a:-webkit-any-link {
          color: #fff;
          text-decoration: initial;
          cursor: auto;
      }
    }
</style>
