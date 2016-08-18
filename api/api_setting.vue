<template>
<div id="api-detail" >
  <h3 class="ui header"><i class="icon settings"></i><div class="content">{{apiName?apiName:'新建API'}}</div></h3>
  <div class="container body">
      <div class="ui grid form">
        <div class="four wide column field small">
            <label><i class="red">*</i>标题</label>
            <input type="text" placeholder="一句话描述" v-model="apiData.title">
        </div>
        <div class="seven wide column field">
            <label><i class="red">*</i>URL（首字符请输入/）</label>
            <input type="text" placeholder="接口URL地址" v-model="apiData.url">
        </div>
        <div class="two wide column field">
            <label>method</label>
            <select class="ui dropdown" v-model="apiData.method">
                <option value="GET">get</option>
                <option value="POST">post</option>
                <option value="PUT">put</option>
                <option value="DELETE">delete</option>
            </select>
        </div>
        <div class="three wide column field">
            <label><i class="red">*</i>接口返回值使用output数据</label>
            <div class="ui toggle checkbox" style="margin: 4px;">
              <input type="checkbox" v-model="useOutputJson">
            </div>
        </div>
      </div>

      <div class="ui form">
          <editor-frame :output-model.sync="apiData.output"
                        :output-json.sync="apiData.outputJson"
                        :input-json.sync="apiData.input"
                        :input-model.sync="apiData.inputModel"
                        :is-add.sync="isAdd"
                        :editor-error.sync="editorError"></editor-frame>
          <div class="field">
              <label><i class="red">*</i>修改说明</label>
              <input type="text" class="input-revise" placeholder="接口修改说明" v-model="updateDesc">
          </div>
          <div class="field">
              <label>接口修改日志</label>
              <div class="api-log" :class="{ 'api-log-more-show' : moreLog }">
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
              <a class="api-log-more" @click="showMoreLog" v-show="updateDescList.length > 2">{{!moreLog ? '更多' : '收起'}}</a>
          </div>
      </div>

    <div class="detail-bottom">
      <help></help>
      <button class="primary mini ui button" @click="pageList">上一条</button>
      <button class="positive mini ui button" :class="[sendLoad ? 'loading' : '']" @click="sendData">确定</button>
      <button class="negative mini ui button" :class="[delLoad ? 'loading' : '']" @click="delList">删除</button>
      <button class="mini ui button" @click="closeSlide">取消</button>
      <button class="primary mini ui button" @click="pageList('')">下一条</button>
    </div>

</div>

</template>

<script text="text/babel">
import Help from './help.vue'
import util from '../common/util.js'
import { add, del, tog, removeEvent } from './vuex/action'
import editorFrame from './editor_frame.vue'
import { list, listActive, userId, prdId, projectId, teamId, listIndex, apiRoot, prdDataList } from './vuex/getters.js'
require('./directive.js')
export default {
  vuex: {
    getters: {
      list,
      list_active: listActive,
      userId,
      prdId,
      projectId,
      teamId,
      listIndex,
      apiRoot,
      prdDataList
    },
    actions: {
      add,
      del,
      tog
    }
  },
  components: {
    editorFrame,
    Help
  },
  data() {
    return {
      prdId: '',
      prdVer: '',
      apiName: '',
      updateDesc: '',
      updateDescList: [],
      sendLoad: false,
      delLoad: false,
      userName: pageConfig.me.username,
      useOutputJson: false,
      apiData: {
        title: '',
        method: 'GET',
        input: {},
        inputModel: [],
        url: '/',
        outputJson: {},
        output: [],
        useOutputJson: false
      },
      codemirrorReady: false,
      isAdd: true,
      editorError: {},
      root: '',
      moreLog: false,
      importantDataHasModify: false,
      apiDataCopy: {}
    }
  },
  watch: {
    // 变量语义化
    // ajax写在action
    list_active(api) {
      this.isAdd = true;
      $('#api-detail .body').scrollTop(0)
      if (api.id) {
        this.moreLog = false
        this.getdata();
      } else {
        this.resetData();
      }
    }
  },
  attached() {
    $('.ui.checkbox').checkbox()
  },
  methods: {
    /**
     * 校验输入数据是否为json
     * @param str
     * @returns {boolean}
       */
    isJson(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    },
    validate() {
      const urlRegExp = /^[\w\-\/\.]*(?:|\/|\.do)$/
      let urlValid = false
      urlValid = urlRegExp.test(this.apiData.url)
      if (!this.apiData.title) {
        // 未输入标题
        toastr.error('请输入API标题！')
        this.sendLoad = false
      } else if (!this.apiData.url) {
        // 未输入url地址
        toastr.error('请输入URL地址！')
        this.sendLoad = false
      } else if (!urlValid) {
        toastr.error('请输入正确的URL！')
        this.sendLoad = false
      } else if (this.editorError.status !== 1) {
        this.sendLoad = false
        toastr.error(this.editorError.msg)
      } else if (!this.verifyModifyImportant() && !this.updateDesc) {
        toastr.error('请输入接口修改说明！')
        this.sendLoad = false
      }

      if (this.sendLoad === false) {
        return true
      }
      return false
    },
    verifyModifyImportant() {
      const copy = this.apiDataCopy
      const api = this.apiData

      if (api.title !== copy.title) {
        return false
      }

      if (api.url !== copy.url) {
        return false
      }

      if (api.method !== copy.method) {
        return false
      }

      if (JSON.stringify(api.input) !== JSON.stringify(copy.input)) {
        return false
      }
      if (JSON.stringify(api.outputJson) !== JSON.stringify(copy.outputJson)) {
        return false
      }

      return true
    },
    /**
     * 发送数据
     * @desc 修改以及新建API都是用同一种方法
     * @return {[type]} [description]
     */
    sendData() {
      this.sendLoad = true
      // 判断是否输入格式正确
      const validator = this.validate()
      if (validator) {
        this.sendLoad = false
        return
      }
      // 判断是新增还是修改接口
      let status = 1
      if (this.list_active.id) {
        status = 2
      }
      // 定义最基本的数据结构
      const apiData = this.apiData;
      const updateArr = this.list_active.lastModify.split(' ')
      const date = new Date()
      let time = ''
      time = `${date.toISOString().slice(0, 10)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      _.extend(apiData, {
        status: status,
        prdId: this.prdId,
        projectId: this.projectId,
        teamId: this.teamId,
        root: this.apiRoot,
        updateDesc: this.updateDesc,
        lastModify: `${time} ${updateArr[2]} ${this.updateDesc}`,
        useOutputJson: this.useOutputJson
      })
      console.log(apiData);
      // 如果是新增接口
      if (status === 1) {
        fetch('/api/apis', {
          body: {
            apiData,
            prdId: this.prdId
          },
          method: 'POST'
        }).then((res) => {
          if (this.list_active) {
            _.extend(this.list_active, res.data)
          }
          toastr.success('新增API成功！')
          window.setTimeout(this.closeSlide, 300)
          this.sendLoad = false;
        });
      } else {
        fetch(`/api/apis/${this.list_active.id}`, {
          body: {
            apiData,
            prdId: this.prdId
          },
          method: 'PUT'
        }).then(res => {
          // 后台返回全局处理，返回的200
          toastr.success('修改API成功！')
          // 弹出层提示出现之后再关闭组件
          window.setTimeout(this.closeSlide, 300)
          _.extend(this.list_active, apiData)
          this.sendLoad = false;
        })
      }
    },
    closeSlide() {
      this.$dispatch('slide-menu-close', () => {
        this.$dispatch('remove-code-mirror-all')
      })
      removeEvent()
      // this.resetData()
    },
    resetData() {
      this.apiName = ''
      this.updateDesc = ''
      this.updateDescList = []
      this.apiData = {
        id: '',
        title: '',
        method: 'GET',
        input: {},
        url: '/',
        output: []
      }
    },
    getdata() {
      fetch(`/api/apis/${this.list_active.id}`, {
        method: 'GET',
        body: {
          prdId: this.prdId
        }
      }).then(res => {
        this.apiData = _.extend(this.apiData, res.data)
        this.useOutputJson = this.apiData.useOutputJson
        this.apiName = res.data.title
        this.updateDescList = res.data.updateDescList
        this.updateDescList.forEach(v => {
          const ut = v.updateTime;
          if (typeof ut === 'string') {
            v.updateTime = ut.substr(0, 10)
          } else {
            v.updateTime = util.formateDate(ut, '%F %T')
          }
        })
        this.isAdd = false;
        this.apiDataCopy = {
          title: res.data.title,
          url: res.data.url,
          method: res.data.method,
          input: res.data.input,
          outputJson: res.data.outputJson,
          useOutputJson: !!res.data.useOutputJson
        }
        console.log(this.apiData.useOutputJson, '#####')
      })
    },
    delList() {
      if (confirm('确定要删除此API？')) {
        if (this.list_active.id) {
          this.delLoad = true;
          fetch(`/api/apis/${this.list_active.id}`, {
            method: 'DELETE',
            body: {
              prdId: this.prdId
            }
          }).then(res => {
            toastr.success('成功删除API！');
            this.del();
            this.delLoad = false;
          });
        } else {
          this.del()
        }
        window.setTimeout(this.closeSlide, 300);
      }
    },
    pageList(leo) {
      let i = this.listIndex
      let obj = {}
      if (leo) {
        obj = i > 0 ? this.list[--i] : this.list[this.list.length - 1]
      } else {
        obj = i < this.list.length - 1 ? this.list[++i] : this.list[0]
      }
      if (!obj.id) {
        this.resetData()
      }
      this.tog(obj)
    },
    showMoreLog() {
      this.moreLog = !this.moreLog
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
    i.red{
      margin-right: 5px;
    }
    .red {
        color: red;
    }
    .backData {
        margin-top: 15px;
    }
    .api-log {
        width: 100%;
        max-height: 72px;
        overflow: hidden;
    }
    .api-log-more-show {
      overflow: auto;
      max-height: none;
    }
    .api-log-more {
      font-size: 12px;
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
      .button {
        margin-right: 10px;
      }
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
    .ui.header,.ui.form input[type=text],.ui.form select,.ui.form .field>label,.ui.form textarea:not([rows]),.ui.list .list>.item .header, .ui.list>.item .header,.ui.list .list>.item .description, .ui.list>.item .description{
      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
      font-size: 12px;
      line-height: 1.5;
      color: #666;
      font-weight: 400;
    }
}
</style>
