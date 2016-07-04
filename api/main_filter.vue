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
      <button class="mini ui right floated button add-btn" @click="add">新建API</button>
      <div class="url-info">
        当前项目URL：<span>{{host}}/fete_api/{{currentProject.id}}</span>
      </div>
      <div class="url-info">
        当前PRD URL：<span>{{host}}/fete_api/{{currentProject.id}}/{{currentPrd.id}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { add, changeFilter } from './vuex/action'
export default {
  name: 'main-filter',
  vuex: {
    actions: {
      add,
      changeFilter
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
      host: pageConfig.host
    }
  },
  attached() {
    $('.main-filter .ui.dropdown').dropdown({ on: 'hover' })
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
      }
    })
  },
  methods: {
    changePrdApi(pid) {
      this.changeFilter({ prdId: pid })
      this.$parent.$emit('reloadApiList', pid)
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
</style>
