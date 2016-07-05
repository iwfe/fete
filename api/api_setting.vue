<template>
<div id="api-detail" >
  <h3 class="ui header"><i class="icon settings"></i><div class="content">新建API</div></h3>
  <div class="container body">
      <div class="ui grid form">
        <div class="six wide column field small">
            <label>标题<i class="red">*</i></label>
            <input type="text" placeholder="一句话描述" v-model="apiData.title">
            <div v-show="titleError" class="ui pointing red basic label">请输入API标题</div>
        </div>
        <div class="seven wide column field">
            <label>URL（首字符请输入/）<i class="red">*</i></label>
            <input type="text" placeholder="接口URL地址" v-model="apiData.url">
            <div v-show="urlError" class="ui pointing red basic label">请输入API地址</div>
        </div>
        <div class="three wide column field">
            <label>method<i class="red">*</i></label>
            <select class="ui dropdown" v-model="apiData.method">
                <option value="GET">get</option>
                <option value="POST">post</option>
                <option value="PUT">put</option>
                <option value="DELETE">delete</option>
            </select>
        </div>
      </div>

      <div class="ui form">
          <div class="field">
              <label>输入数据格式<i class="red">*</i></label>
              <textarea class="input-param" placeholder="输入数据格式" v-model="apiData.input"></textarea>
          </div>

      <!-- </div> -->

      <!-- <div class="ui form backData"> -->
          <div class="field">
              <label>返回数据格式<i class="red">*</i></label>
              <!-- <textarea class="output-param" placeholder="返回数据格式" v-model="apiData.output[0]"></textarea> -->
              <editor-frame :output-model.sync="apiData.output" :show-mock='true'></editor-frame>
          </div>
          <div class="field">
              <label>修改说明</label>
              <input type="text" class="input-revise" placeholder="接口修改说明" v-model="updateDesc">
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

    <div class="detail-bottom">
        <button class="positive mini ui button" :class="[sendLoad ? 'loading' : '']" @click="sendData">确定</button>
        <button class="negative mini ui button" :class="[delLoad ? 'loading' : '']" @click="delList">删除</button>
        <button class="mini ui button" @click="closeSlide">取消</button>
    </div>

</div>
<!-- <editor-frame :output-model.sync="apiData.output" :show-mock=true></editor-frame> -->

</template>

<script text="text/babel">

import { add, del } from './vuex/action'
import editorFrame from './editor_frame.vue'
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
      add,
      del
    }
  },
  components: {
    editorFrame
  },
  data() {
    return {
      updateDesc: '',
      updateDescList: [],
      titleError: false,
      urlError: false,
      sendLoad: false,
      delLoad: false,
      apiData: {
        title: '',
        method: 'GET',
        input: '',
        url: '',
        output: ['']
      }
    }
  },
  events: {
    getDetail() {
      // 防止list_active没有来的及更新
      setTimeout(() => {
        console.log(this.list_active.id);
        if (this.list_active.id && this.list_active.id !== 1) {
          this.getdata()
        }
      }, 300)
    }
  },
  methods: {
    /**
     * 发送数据
     * @desc 修改以及新建API都是用同一种方法
     * @return {[type]} [description]
     */
    sendData() {
      this.sendLoad = true;
      // 判断是否输入格式正确
      if (!this.apiData.title) {
        // 未输入标题
        this.titleError = true;
        toastr.error('请输入API标题！')
        this.sendLoad = false
        return
      } else if (!this.apiData.url) {
        // 未输入url地址
        this.urlError = true
        toastr.error('请输入URL地址！')
        this.sendLoad = false
        return
      }

      // 判断是新增还是修改接口
      let status = 1
      if (this.list_active.id) {
        console.log(this.list_active.id)
        status = 2
      }
      // 定义最基本的数据结构
      const apiData = this.apiData;
      _.extend(apiData, {
        status: status,
        prdId: this.prdId,
        productId: this.productId,
        teamId: this.teamId
      });
      // 如果是新增接口
      if (status === 1) {
        _.extend(apiData, {
          updateDescList: [{ updateTime: new Date(), userName: this.userName, updateDesc: this.updateDesc }],
          createTime: new Date(),
        });
        fetch('/api/apis', {
          body: { apiData },
          method: 'POST'
        }).then((res) => {
          if (res.code === 200) {
            if (this.list_active) {
              _.extend(this.list_active, res.data)
            }
            toastr.success('新增API成功！')
            window.setTimeout(this.closeSlide, 300)
          } else {
            toastr.error('新增API失败，请重试！');
          }
          this.sendLoad = false;
        }, () => {
          this.sendLoad = false;
          toastr.warning('网络异常，请重试！');
        });
      } else {
        // 如果是修改结构，则修改原数据中的updateTime以及修改说明字段
        apiData.updateTime = new Date();
        apiData.updateDescList.push({ updateTime: new Date(), userName: this.userName, updateDesc: this.updateDesc })
        fetch(`/api/apis/${this.list_active.id}`, {
          body: { apiData },
          method: 'PUT'
        }).then(res => {
          if (res.code === 200) {
            toastr.success('修改API成功！')
            this.resetData();
            // 弹出层提示出现之后再关闭组件
            window.setTimeout(this.closeSlide, 300)
          } else {
            toastr.error('API修改失败，请重试！')
          }
          this.sendLoad = false;
        })
      }
    },
    closeSlide() {
      // 关闭弹窗之后清空list_active并将id设置为1，解决下一次点击本次修改的弹出窗没有数据
      this.$dispatch('slide-menu-close')
    },
    resetData() {
      _.extend(this, {
        updateDesc: '',
        updateDescList: [],
        apiData: {
          title: '',
          method: 'GET',
          input: '',
          url: '',
          output: ['']
        }
      });
    },
    getdata() {
      fetch(`/api/apis/${this.list_active.id}`, {
        method: 'GET'
      }).then(res => {
        _.extend(this.apiData, res.data);
        this.updateDescList = res.data.updateDescList;
        this.updateDescList.forEach(v => {
          v.updateTime = v.updateTime.substr(0, 10);
        })
      })
    },
    delList() {
      this.delLoad = true;
      fetch(`/api/apis/${this.list_active.id}`, {
        method: 'DELETE'
      }).then(res => {
        if (res.code === 200) {
          toastr.success('成功删除API！');
          this.del();
        } else {
          toastr.error('删除API失败，请重试！');
        }
        this.delLoad = false;
      });
      window.setTimeout(this.closeSlide, 300);
    }
  }
}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/css">
#api-detail {
    position: relative;
    height: 100%;
    padding: 0 0 0 5px;
    overflow-x: hidden;
    .ui.header {
      height: 50px;
      margin: 0;
      padding: 8px;
      box-shadow: 1px 3px #eee;
    }
    .container.body{
      height:calc(100% - 105px);
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
        height: auto;
        overflow: auto;
    }
    .detail-bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        padding: 10px;
        text-align: center;
        border-top: 1px solid #eee;
    }
    .ui[class*="very relaxed"].list:not(.horizontal)>.item{
      padding: 0;
    }
    .ui.form input[type=text]{
      padding: .4rem .6rem;
    }
    .ui.grid>.column:not(.row), .ui.grid>.row>.column{
      padding-right: 0.1rem;
    }
    .ui.form select{
      height: 32px;
    }
}

</style>
