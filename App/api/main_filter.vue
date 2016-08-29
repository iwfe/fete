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
              @click="changePrdApi(item)"
              v-for="item in prdData">{{item.name}}</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="mini ui right floated button add-btn" @click="addCallback">新建API</button>
      <div class="ui inline dropdown right floated button basic blue mini" v-show="exceptMePrdData.length">
        <div class="text">选择拉取版本</div>
        <i class="dropdown icon"></i>
        <div class="menu">
          <a class="item"
            data-text="{{item.name}}"
            @click="setOriginPrd(item)"
            v-for="item in exceptMePrdData">{{item.name}}</a>
        </div>
      </div>
      <div class="ui mini right floated button basic blue" @click="syncPRD" v-show="exceptMePrdData.length">拉取PRD</div>
      <a href="/api/j2j" target="_blank" title="Java转Json" class="mini ui right floated user-help"><i class="coffee icon"></i></a>
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
      <div class="url-info" v-show="categories.length">
        接口分类：
        <button class="ui basic button mini" :class="cateActive == '全部' ? 'green' : 'secondary'" @click="changeCategory('全部')">全部</button>
        <button class="ui basic button mini" v-for="item in categories" :class="cateActive == item ? 'green' : 'secondary'" @click="changeCategory(item)">{{item}}</button>
      </div>
    </div>
  </div>

  <div class="ui basic modal">
    <i class="close icon"></i>
    <div class="header">
      Archive Old Messages
    </div>
    <div class="image content">
      <div class="image">
        <i class="archive icon"></i>
      </div>
      <div class="description">
        <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
      </div>
    </div>
    <div class="actions">
      <div class="two fluid ui inverted buttons">
        <div class="ui cancel red basic inverted button">
          <i class="remove icon"></i>
          No
        </div>
        <div class="ui ok green basic inverted button">
          <i class="checkmark icon"></i>
          Yes
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { add, changeFilter, setPrdList, setCateActive, setOriginPrd, setExceptPrd } from './vuex/action'
import { prdList, categories, cateActive, originPrd, exceptMePrdData } from './vuex/getters'
require('./filter.js')
export default {
  name: 'main-filter',
  vuex: {
    getters: {
      prdList,
      categories,
      cateActive, // 标识页面所选择的分
      originPrd,
      exceptMePrdData
    },
    actions: {
      add,
      changeFilter,
      setPrdList,
      setCateActive,
      setOriginPrd,
      setExceptPrd
    }
  },
  data() {
    return {
      teamData: [],
      projectData: [],
      prdData: [],
      filterPrdData: [],
      currentTeam: pageConfig.me.team,
      currentProject: pageConfig.me.project,
      currentPrd: pageConfig.me.prd,
      host: pageConfig.host,
      apiRoot: '',
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
    this.fetchTeam()

    // project dropdown list
    this.fetchProject()

    // prd dropdown list
    this.fetchPrd()

    // get apiRoot from an api record, by prdId
    this.fetchLatestApi()
  },
  methods: {
    fetchTeam() {
      fetch('/team/data').then(res => {
        if (res.code === 200) {
          this.teamData = res.data
        }
      })
    },
    fetchProject() {
      fetch('/project/data', {
        body: { teamId: this.currentTeam.id }
      }).then(res => {
        if (res.code === 200) {
          this.projectData = res.data
        }
      })
    },
    fetchPrd() {
      fetch('/prd/data', {
        body: { projectId: this.currentProject.id }
      }).then(res => {
        if (res.code === 200) {
          this.prdData = res.data
          this.setExceptPrd(this.prdData, 'name', this.currentPrd.name)
          // this.filterPrdData = this.$options.filters.exceptBy(this.prdData, this.currentPrd.name)
          this.setPrdList(res.data)
        }
      })
    },
    fetchLatestApi() {
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
    changeCategory(item) {
      this.setCateActive(item);
    },
    changePrdApi(item) {
      const pid = item.id
      const name = item.name
      this.changeFilter({ prdId: pid })
      this.setExceptPrd(this.prdData, 'name', name)
      // this.filterPrdData = this.$options.filters.exceptBy(this.prdData, name)
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
    addCallback(e) {
      this.add()
      this.$parent.$emit('targetDetail', e)
    },
    syncPRD() {
      if (!this.originPrd) {
        toastr.error('请先选择需拉取的PRD版本！')
        return false
      }
      if (confirm(`确定要拉取 ${this.originPrd.name} 的版本并将新增api同步到本版本吗？`)) {
        fetch('/api/apis/pull', {
          body: {
            prdId: pageConfig.me.prd.id,
            originPrdId: this.originPrdId
          }
        }).then(res => {
          toastr.success(res.data)
          this.$parent.$emit('reloadApiList', this.currentPrd.id)
        });
      }
      return true
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
  .ui.button {
    padding: .4rem .8rem;
  }
</style>
