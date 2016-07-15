/* 导入数据 */
<template>
  <section id="main">

    <div class="ui grid form" style="padding: 10px 0 0 30px;">
      <div class="five wide column field small">
          <label> 团队ID</label>
          <select v-model="teamId">
            <option v-for="item in teamData" :value="item.id">{{item.name}}</option>
          </select>

      </div>
      <div class="five wide column field small">
          <label> 项目ID</label>
          <select v-model="projectId">
            <option v-for="item in projectData" :value="item.id">{{item.name}}</option>
          </select>
      </div>
      <div class="five wide column field small">
          <label> prdId</label>
          <select v-model="prdId" >
            <option v-for="item in prdData" :value="item.id">{{item.name}}</option>
          </select>
      </div>


      <div class="five wide column field small">
          <label> 工程名</label>
          <input type="text" placeholder="工程名" v-model="root">
      </div>
      <div class="five wide column field small">
          <label> old prdId</label>
          <input type="text" placeholder="多个以逗号隔开" v-model="oldPrdId">
      </div>
      <!-- <p>root:<input type="input" name="root" v-model="root"></p>
      <p>teamId:<input type="input" name="teamId" v-model="teamId"></p>
      <p>projectId:<input type="input" name="projectId" v-model="projectId"></p>
      <p>prdId:<input type="input" name="root" v-model="prdId"></p> -->
      <div class="five wide column field small" style="line-height: 111px; padding: 0;">
        <button class="mini ui button add-btn" @click="importdb">导入API</button>
      </div>

      <div>
        <textarea rows="3" cols="200" v-model="result"> </textarea>
      </div>
    </div>
  </section>
</template>

<script type="text/babel">

  export default {
    data() {
      return {
        teamData: [],
        projectData: [],
        prdData: [],
        root: 'weixinEnt',
        teamId: '',
        projectId: '',
        prdId: '',
        oldPrdId: '',
        result: ''
      }
    },
    ready() {
      this.getSelects();
    },
    watch: {
      teamId: 'getProjectData',
      projectId: 'getPrdData'
    },
    methods: {
      getSelects() {
        const self = this;
        // team dropdown list
        fetch('/team/data').then(res => {
          if (res.code === 200) {
            self.teamData = res.data
            // self.teamId = self.teamData[0].id
          }
        })
      },
      getProjectData() {
        const self = this;
        // project dropdown list
        fetch('/project/data', {
          body: { teamId: self.teamId }
        }).then(res => {
          if (res.code === 200) {
            self.projectData = res.data
            self.projectId = self.projectData.length > 0 ? self.projectData[0].id : ''
          }
        })
      },
      getPrdData() {
        // prd dropdown list
        const self = this;
        fetch('/prd/data', {
          body: { projectId: self.projectId }
        }).then(res => {
          if (res.code === 200) {
            self.prdData = res.data
            self.prdId = self.prdData.length > 0 ? self.prdData[0].id : ''
          }
        })
      },
      importdb() {
        const self = this;
        if (!self.teamId || !self.projectId || !self.prdId || !self.oldPrdId) {
          alert('请先填写数据');
          return;
        }
        fetch('importdata', {
          method: 'PUT',
          body: { root: self.root, teamId: self.teamId, projectId: self.projectId, prdId: self.prdId, oldPrdId: self.oldPrdId }
        }).then((res) => {
          if (res.code === 200) {
            self.result = `新增API成功：${res.data.count}`;
          } else {
            self.result = '新增API失败，请重试！';
          }
        }, (res) => {
          self.result = res.message;
        });
      }

    }
  }
</script>

<style lang="sass">

</style>
