<template>
<div id="api-detail" >
  <h3 class="ui header"><i class="icon settings"></i><div class="content">新建API</div></h3>
  <div class="container body">
      <div class="ui two column middle very relaxed stackable grid">
          <div class="column">
              <div class="ui form">
                  <div class="field">
                      <label>标题<i class="red">*</i></label>
                      <input type="text" placeholder="一句话描述" v-model="apiData.title">
                  </div>
                  <div class="field">
                      <label>method<i class="red">*</i></label>
                      <select class="ui fluid dropdown" v-model="apiData.method">
                          <option value="GET">get</option>
                          <option value="POST">post</option>
                          <option value="PUT">put</option>
                          <option value="DELETE">delete</option>
                      </select>
                  </div>
                  <div class="field">
                      <label>输入数据格式<i class="red">*</i></label>
                      <textarea class="input-param" placeholder="输入数据格式" v-model="apiData.input"></textarea>
                  </div>
              </div>
          </div>
          <div class="column">
              <div class="ui form">
                  <div class="field">
                      <label>接口地址（首字符请输入/）<i class="red">*</i></label>
                      <input type="text" placeholder="接口URL地址" v-model="apiData.url">
                  </div>

                  <div class="field">
                      <label>修改说明<i class="red">*</i></label>
                      <input type="text" placeholder="接口修改说明" v-model="updateDesc">
                  </div>
                  <div class="field">
                      <label>接口修改日志</label>
                      <div class="api-log">
                          <div class="ui list very relaxed">
                              <div class="item" v-for="list in updateDescList">
                                  <i class="file icon"></i>
                                  <div class="content">
                                      <div class="header">{{list.userName}}</div>
                                      <div class="description">{{list.updateTime}} {{list.updateDesc}}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="ui form backData">
          <div class="field">
              <label>返回数据格式<i class="red">*</i></label>
              <textarea class="output-param" placeholder="返回数据格式" v-model="output"></textarea>
          </div>
      </div>
  </div>

    <div class="operation-button">
        <button class="positive ui loading button" @click="sendData">确定</button>
        <button class="negative ui button" @click="delList">删除</button>
        <button class="ui button" @click="closeSlide">取消</button>
    </div>
    <!-- <editor-frame></editor-frame> -->
</div>
</template>

<script text="text/babel">

import { tog, add, del } from './vuex/action'

export default {
  vuex: {
    getters: {
      list: state => state.list,
      list_active: state => state.list_active,
      userName: state => state.userName,
      userId: state => state.userId,
      prdId: state => state.prdId,
      productId: state => state.productId,
      teamId: state => state.teamId
    },
    actions: {
      tog,
      add,
      del
    }
  },
  components: {},
  data() {
    return {
      updateDesc: '',
      updateDescList: [],
      apiData: {
        title: '',
        method: '',
        input: '',
        url: '',
        output: ['']
      }
    }
  },
  watch: {
    'list_active.id'() {
      if (this.list_active && this.list_active.id) {
        this.getdata()
      }
    }
  },
  methods: {
    sendData() {
      // 判断是新增还是修改接口
      let status = 1;
      if (this.list_active.id) {
        status = 2;
      }
      const apiData = this.apiData;
      _.extend(apiData, {
        status: status,
        updateDescList: [{ updateTime: new Date(), userName: this.userName, updateDesc: this.updateDesc }],
        createTime: new Date(),
        prdId: this.prdId,
        productId: this.productId,
        teamId: this.teamId
      });
      // 如果是新增接口
      if (status === 1) {
        fetch('/api/apis', {
          body: { apiData },
          method: 'POST'
        }).then(res => {
          if (res.code === 200) {
            if (this.list_active) {
              this.list_active.title = apiData.title;
              this.list_active.url = apiData.url;
              this.list_active.method = apiData.method;
            }
            toastr.success('新增API成功！');
            toastr.options = {
              closeButton: true
            };
            window.setTimeout(this.closeSlide, 300);
          } else {
            toastr.error('新增API失败，请重试！');
            toastr.options = {
              closeButton: true
            };
          }
        })
      } else {
        fetch(`/api/apis/${this.list_active.id}`, {
          body: { apiData },
          method: 'PUT'
        }).then(res => {
          if (res.code === 200) {
            toastr.success('修改API成功！');
            toastr.options = {
              closeButton: true
            };
            window.setTimeout(this.closeSlide, 300);
          } else {
            toastr.error('API修改失败，请重试！');
            toastr.options = {
              closeButton: true
            };
          }
        })
      }
    },
    closeSlide() {
      this.$dispatch('slide-menu-close');
    },
    getdata() {
      fetch(`/api/apis/${this.list_active.id}`, {
        method: 'GET'
      }).then(res => {
        _.extend(this.apiData, res.data);
        this.updateDescList = res.data.updateDescList;
        this.updateDescList.forEach(v => {
          v.updateTime = v.updateTime.substring(0, 10);
        })
      })
    },
    delList() {
      fetch(`/api/apis/${this.list_active.id}`, {
        method: 'DELETE'
      }).then(res => {
        if (res.code === 200) {
          toastr.success('成功删除API！');
          toastr.options = {
            closeButton: true
          };
          this.del();
        } else {
          toastr.error('删除API失败，请重试！');
          toastr.options = {
            closeButton: true
          };
        }
      });
      window.setTimeout(this.closeSlide, 300);
    }
  }
}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/css">
#api-detail {
    width: 96%;
    height:94%;
    margin: 10px auto 0;
    .container.body{
      height:calc(100% - 100px);
      overflow-x:hidden;
      overflow-y:auto;
      padding:10px;
    }
    .red {
        color: red;
    }
    .backData {
        margin-top: 15px;
    }
    .api-log {
        width: 100%;
        height: 190px;
        overflow: auto;
    }
    .operation-button {
        display: flex;
        justify-content: space-between;
        margin: 10px auto 10px;
        width: 50%;
    }
}

</style>
