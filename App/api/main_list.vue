<template>
<div>
  <main-filter></main-filter>
  <div class="main-list">
    <table class="ui table">
        <thead>
            <tr class="line">
                <th @click="changeOrder('title')">描述 <span v-show="orderKey === 'title'">{{orderType === 1 ? '▲' : '▼'}}</span></th>
                <th @click="changeOrder('url')">链接 <span v-show="orderKey === 'url'">{{orderType === 1 ? '▲' : '▼'}}</span></th>
                <th @click="changeOrder('method')">方法 <span v-show="orderKey === 'method'">{{orderType === 1 ? '▲' : '▼'}}</span></th>
                <th @click="changeOrder('lastModify')">最后修改 <span v-show="orderKey === 'lastModify'">{{orderType === 1 ? '▲' : '▼'}}</span></th>
                <th style="width:100px">返回数据预览</th>
            </tr>
        </thead>
        <tbody id="tables">
            <tr track by
                @click="showDetail(item, $event)"
                v-for="item in list | orderBy orderKey orderType"
                :class="{'active': list_active === item, 'line': item.createTime !== item.updateTime}">
                <td>{{item.title}}</td>
                <td>{{item.url}}</td>
                <td><span @click="showJSON">{{item.method}}</span></td>
                <td>{{item.lastModify}}</td>
                <td><a class="mini ui button" href="{{host}}/api/fete_api/{{currentProjectId}}/{{$route.query.prdId}}/mock{{apiRoot}}{{item.url}}" target="_blank" @click="$event.stopPropagation()">预览</a></td>
            </tr>
        </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { tog, add, emptyList, setList, addEvent } from './vuex/action'
import MainFilter from './main_filter.vue'
import { list, listActive, apiRoot } from './vuex/getters.js'
export default {
  components: {
    MainFilter
  },
  vuex: {
    getters: {
      list,
      list_active: listActive,
      apiRoot
    },
    actions: {
      tog, add, emptyList, setList
    }
  },
  data() {
    return {
      host: pageConfig.host,
      currentProjectId: pageConfig.me.project.id,
      orderKey: 'lastModify',
      orderType: -1
    }
  },
  ready() {
    this.getList(this.$route.query.prdId)
  },
  events: {
    reloadApiList(pid) {
      this.getList(pid)
    },
    targetDetail(e) {
      this.showDetail(this.list_active, e)
    }
  },
  methods: {
    getList(pid) {
      this.emptyList()  // empty list first
      fetch('/api/apis', {
        body: { prdId: pid }
      }).then(res => {
        this.setList(res.data.data)
      });
    },
    showJSON(e) {
      this.lockScreen(e);
    },
    showDetail(item, e) {
      this.$parent.$broadcast('slide-menu-open', () => {
        this.$parent.$broadcast('init-code-mirror-all')
        this.$parent.$broadcast('addWindowBeforeunloadOnSlideOpen')
      });
      this.tog(item);
      e.stopPropagation();
    },
    changeOrder(key) {
      if (this.orderKey === key) {
        this.orderType = this.orderType === 1 ? -1 : 1
      } else {
        this.orderKey = key
      }
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
.view:hover{
  color: #2DB7F5;
  cursor: pointer;
}
#tables .line td:first-child {
   border-left: 2px solid #00ee00;
}

</style>
