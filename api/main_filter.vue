<template>
  <div class="main-filter">
    <div class="ui breadcrumb">
      <a class="section">当前位置</a>
      <div class="divider"> / </div>
      <div class="section">
        团队：
        <div class="ui inline dropdown">
          <div class="text">{{currentTeam.name}}</div>
          <i class="dropdown icon"></i>
          <div class="menu">
            <div class="item"
              data-text="{{item.name}}"
              @click="changeTeam(item)"
              v-for="item in teamData">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="divider"> / </div>
      <div class="section">
        项目：
        <div class="ui inline dropdown">
          <div class="text">{{currentProject.name}}</div>
          <i class="dropdown icon"></i>
          <div class="menu">
            <div class="item"
              data-text="{{item.name}}"
              @click="changeProject(item)"
              v-for="item in projectData">{{item.name}}</div>
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
            <div class="item"
              data-text="{{item.name}}"
              @click="currentPrd = item"
              v-for="item in prdData">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="mini ui right floated button" @click="addApi">新建API</button>
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
export default {
  name: 'main-filter',
  data() {
    return {
      teamData: [],
      currentTeam: {},
      currentProject: {},
      currentPrd: {},
      host: pageConfig.host
    }
  },
  computed: {
    projectData() {
      return this.currentTeam.projects
    },
    prdData() {
      return this.currentProject.prds
    }
  },
  attached() {
    $('.main-filter .ui.dropdown').dropdown()
  },
  ready() {
    const self = this

    fetch('/api/dropdown').then(res => {
      if (res.code === 200) {
        self.teamData = res.data

        // if there is a prdId in query string
        if (self.$route.query.prdId) {
          self.currentTeam = _.filter(self.teamData, teamItem => {
            return _.some(teamItem.projects, projectItem => {
              return _.some(projectItem.prds, { id: self.$route.query.prdId })
            })
          })[0]
        } else {
          self.currentTeam = self.teamData[0]
        }
        if (self.currentTeam.id && self.currentTeam.projects) {
          self.currentProject = self.currentTeam.projects[0]
          if (self.currentProject.id && self.currentProject.prds) {
            self.currentPrd = self.currentProject.prds[0]
          }
        }
      }
    })
  },
  methods: {
    changeTeam(item) {
      this.currentTeam = item
      this.projectData = this.currentTeam.projects
      this.currentProject = this.projectData[0] || {}
      if (this.currentProject.prds) {
        this.prdData = this.currentProject.prds
        this.currentPrd = this.prdData[0] || {}
      }
    },
    changeProject(item) {
      this.currentProject = item
      this.prdData = this.currentProject.prds
      this.currentPrd = this.prdData[0] || {}
    },
    addApi(e) {
      this.$parent.$parent.$broadcast('slide-menu-open')
      e.stopPropagation();
    }
  }
};
</script>

<style lang="css" scoped>
  .ui.breadcrumb {
    width: calc(100% + 30px);
    margin: 0 -15px 10px;
    padding: 0 15px 15px;
    border-bottom: 1px solid #e9e9e9;
  }
  .ui.inline.dropdown > .text {
    font-weight: normal;
  }
  .url-info {
    margin-bottom: 10px;
  }
</style>
