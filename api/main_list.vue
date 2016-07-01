<template>
<div>
  <main-filter></main-filter>
  <div class="main-list">
    <table class="ui table">
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
    events: {
      reloadApiList() {
        this.getList()
      }
    },
    methods: {
      getList() {
        fetch('/api/apis', {
          body: { prdId: this.$route.query.prdId }
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
  border: none;
}
.table td,
.table th {
  line-height: 30px;
  padding: 0 6px;
}
.table thead {
  background: #f7f7f7;
}
.ui.table thead tr:first-child > th:first-child {
  border-top-left-radius: 5px;
}
.ui.table thead tr:first-child > th:last-child {
  border-top-right-radius: 5px;
}
.ui.table tr th {
  border-bottom: none;
}
.ui.table tr td {
  border-top: none;
  border-bottom: 1px solid rgba(34, 36, 38, 0.1);
}
.ui.table tbody tr:hover,
.ui.table tbody tr.active {
  background-color: #eaf8fe !important;
}
</style>
