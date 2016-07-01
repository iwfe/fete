<template>
<div>
  <main-filter></main-filter>
  <div class="main-list">
    <table class="ui grey table">
        <thead>
            <tr class="line">
                <th>描述</th>
                <th>链接</th>
                <th>方法</th>
            </tr>
        </thead>
        <tbody>
            <tr track by
                @click="showDetail(item, $event)"
                v-for="item in list"
                :class="{'active': list_active === item}">
                <td>{{item.title}}</td>
                <td>{{item.url}}</td>
                <td><span @click="showJSON">{{item.method}}</span></td>
            </tr>
        </tbody>
    </table>
  </div>
</div>
</template>

<script type="text/babel">
  import { tog, add } from './vuex/action'
  import MainFilter from './main_filter.vue'

  export default {
    components: {
      MainFilter
    },
    vuex: {
      getters: {
        list: state => state.list,
        list_active: state => state.list_active
      },
      actions: {
        tog,
        add
      }
    },
    ready() {
      this.getList();
    },
    methods: {
      getList() {
        fetch('/api/apis', {
          body: { prdId: '111' }
        }).then(res => {
          res.data.forEach(v => {
            this.add(v);
          });
        });
      },
      showJSON(e) {
        this.lockScreen(e);
      },
      showDetail(item, e) {
        this.$parent.$broadcast('slide-menu-open');
        this.$parent.$broadcast('getDetail');
        this.tog(item);
        e.stopPropagation();
      },
      lockScreen(e) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }
</script>

<style>
.main-list{
  padding-top: 12px;
  overflow: auto;
}
.ui.table {
  border-radius: 0;
}
</style>
