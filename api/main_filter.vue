<template>
  <div class="main-filter">
    <div class="ui breadcrumb">
      <div class="section grey">全部团队</div>
      <div class="divider"> / </div>
      <div class="section">
        <div class="ui inline dropdown">
          <div class="text">{{currentTeam.name}}</div>
          <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item"
              data-text="{{item.name}}"
              href="/project?teamId={{item.id}}"
              v-for="item in teamData">{{item.name}}</a>
          </div>
        </div>
      </div>
      <div class="divider"> / </div>
      <div class="section">
        <div class="ui inline dropdown">
          <div class="text">{{currentProject.name}}</div>
          <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item"
              data-text="{{item.name}}"
              href="/prd?projectId={{item.id}}"
              v-for="item in projectData">{{item.name}}</a>
          </div>
        </div>
      </div>
      <div class="divider"> / </div>
      <div class="active section">
        PRD：
        <div class="ui inline dropdown">
          <div class="text">{{currentPrd.name}}</div>
          <i class="dropdown icon"></i>
          <div class="menu">
            <a class="item"
              data-text="{{item.name}}"
              v-link="{name: 'list', query: {prdId: item.id}}"
              @click="changePrdApi(item.id)"
              v-for="item in prdData">{{item.name}}</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="mini ui right floated button add-btn" @click="addCallback">新建API</button>
      <a href="/static/document/API管理平台操作手册.pdf" target="_blank" title="API管理平台操作手册" class="mini ui right floated user-help"><i class="help circle icon"></i></a>
      <div class="url-info">
        当前项目URL：
        <span class="copy-btn" data-clipboard-target="#copyable_project_url" id="copyable_project_url">{{host}}/api/fete_api/{{currentProject.id}}/mock/</span>
      </div>
      <div class="url-info">
        当前PRD URL：
        <span class="copy-btn" data-clipboard-target="#copyable_prd_url" id="copyable_prd_url">{{host}}/api/fete_api/{{currentProject.id}}/{{currentPrd.id}}/mock/</span>
      </div>
      <div class="url-info">
        工程名：
        <input type="text" v-model="apiRoot" @keyup.enter="changeApiRoot" @blur="changeApiRoot">
      </div>
    </div>
  </div>
</template>

<script>
import { prdDataList } from './vuex/getters'
import { add, changeFilter, setPrd } from './vuex/action'
export default {
  name: 'main-filter',
  vuex: {
    getters: {
      prdDataList
    },
    actions: {
      add,
      changeFilter,
      setPrd
    }
  },
  data() {
    return {
      teamData: [],
      projectData: [],
      prdData: [],
      currentTeam: pageConfig.me.team,
      currentProject: pageConfig.me.project,
      currentPrd: pageConfig.me.prd,
      host: pageConfig.host,
      apiRoot: ''
    }
  },
  attached() {
    $('.main-filter .ui.dropdown').dropdown({ on: 'hover' })
    const clipboard = new Clipboard('.copy-btn')
    clipboard.on('success', e => {
      // console.info('Action:', e.action)
      // console.info('Text:', e.text)
      // console.info('Trigger:', e.trigger)

      // e.clearSelection()
      toastr.info('已复制到剪贴板！', '', { positionClass: 'toast-top-center' })
    })
  },
  ready() {
    // set vuex state
    this.changeFilter({
      teamId: pageConfig.me.team.id,
      projectId: pageConfig.me.project.id,
      prdId: pageConfig.me.prd.id
    })

    // team dropdown list
    fetch('/team/data').then(res => {
      if (res.code === 200) {
        this.teamData = res.data
      }
    })

    // project dropdown list
    fetch('/project/data', {
      body: { teamId: this.currentTeam.id }
    }).then(res => {
      if (res.code === 200) {
        this.projectData = res.data
      }
    })

    // prd dropdown list
    fetch('/prd/data', {
      body: { projectId: this.currentProject.id }
    }).then(res => {
      if (res.code === 200) {
        this.prdData = res.data
        this.setPrd(res.data)
      }
    })

    // get apiRoot from an api record, by prdId
    fetch('/api/getLatestApi', {
      body: {
        prdId: pageConfig.me.prd.id
      }
    }).then(res => {
      this.apiRoot = res.data.root
      this.changeFilter({ apiRoot: this.apiRoot })
    }).catch(err => {
      // console.log(err.response.message)
    })
  },
  methods: {
    changePrdApi(pid) {
      this.changeFilter({ prdId: pid })
      this.$parent.$emit('reloadApiList', pid)
    },
    changeApiRoot() {
      fetch('/api/apiRoot', {
        method: 'PATCH',
        body: {
          prdId: pageConfig.me.prd.id,
          apiRoot: this.apiRoot
        }
      }).then(res => {
        toastr.success(res.data)
      })
      this.changeFilter({ apiRoot: this.apiRoot })
    },
    addCallback() {
      this.add()
      this.$parent.$emit('targetDetail')
    }
  }
};
</script>

<style lang="sass" scoped>
  .ui.breadcrumb {
    width: calc(100% + 30px);
    margin: 0 -15px 10px;
    padding: 0 15px 15px;
    border-bottom: 1px solid #e9e9e9;
    font-size: 12px;
    &.grey {
      color: #999;
    }
  }
  .ui.inline.dropdown > .text {
    font-weight: normal;
  }
  .url-info {
    margin-bottom: 10px;
    input {
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
  .add-btn {
    color: #fff;
    background-color: #2db7f5;
    border-color: #2db7f5;
    &:hover {
      background-color: #57c5f7;
      border-color: #57c5f7;
      color: #fff;
    }
  }
  .user-help {
    display: inline-block;
    float: right;
    line-height: 1rem;
    .icon {
      text-decoration: blink;
      color: rgba(45,183,245,0.6);
      line-height: 2rem;
      font-size: 1.2rem;
    }

    .icon:hover {
      color: rgba(45,183,245,0.4);
    }
  }
</style>
