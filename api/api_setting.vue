<template>
<div id="api-detail" >
  <h3 class="ui header"><i class="icon settings"></i><div class="content">新建API</div></h3>
  <div class="container body">
      <div class="ui two column middle very relaxed stackable grid">
          <div class="column">
              <div class="ui form">
                  <div class="field">
                      <label>标题<i class="red">*</i></label>
                      <input type="text" placeholder="一句话描述" v-model="title">
                  </div>
                  <div class="field">
                      <label>method<i class="red">*</i></label>
                      <select class="ui fluid dropdown" v-model="method">
                          <option value="GET">get</option>
                          <option value="POST">post</option>
                          <option value="PUT">put</option>
                          <option value="DELETE">delete</option>
                      </select>
                  </div>
                  <div class="field">
                      <label>输入数据格式<i class="red">*</i></label>
                      <textarea class="input-param" placeholder="输入数据格式" v-model="input"></textarea>
                  </div>
              </div>
          </div>
          <div class="column">
              <div class="ui form">
                  <div class="field">
                      <label>接口地址<i class="red">*</i></label>
                      <input type="text" placeholder="接口URL地址" v-model="url">
                  </div>

                  <div class="field">
                      <label>修改说明<i class="red">*</i></label>
                      <input type="text" placeholder="接口修改说明" v-model="updateDesc">
                  </div>
                  <div class="field">
                      <label>接口修改日志</label>
                      <div class="api-log">
                          <div class="ui list very relaxed">
                              <div class="item">
                                  <i class="file icon"></i>
                                  <div class="content">
                                      <div class="header">张三</div>
                                      <div class="description">2016-06-18 新增了API</div>
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
        <button class="positive ui button" @click="sendData">确定</button>
        <button class="negative ui button">删除</button>
        <button class="ui button" @click="closeSlide">取消</button>
    </div>
    <editor-frame></editor-frame>
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
      userId: state => state.userId
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
      title: '',
      method: 'GET',
      input: '',
      url: '',
      updateDesc: '',
      output: ''
    }
  },
  events: {
    getDetail() {
      if (this.list_active && this.list_active.id) {
        console.log(this.list_active.id);
      }
    }
  },
  methods: {
    sendData() {
      const apiData = {
        title: this.title,
        method: this.method,
        input: this.input,
        url: this.url,
        output: [this.output],
        status: this.status,
        updateDescList: [{ updateTime: new Date(), userName: this.userName, updateDesc: this.updateDesc }],
        createTime: new Date(),
        prdId: '111',
        productId: '222',
        teamId: '333'
      }
      fetch('/api/apis', {
        body: { apiData },
        method: 'POST'
      }).then(res => {
        if (res.code === 200) {
          this.$dispatch('slide-menu-close');
        }
      })
    },
    closeSlide() {
      this.$dispatch('slide-menu-close');
    },
    getdata() {
      fetch('/api/apis', {
        body: { prdId: this.list_active.id },
        method: 'Get'
      }).then(res => {
        console.log(res.data);
      })
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
