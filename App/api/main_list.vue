<template>
<div>
  <main-filter></main-filter>
  <div class="main-list">
    <table class="ui table">
        <thead>
            <tr class="line">
                <th @click="changeOrder('title')">描述 <span v-show="orderKey === 'title'">{{orderType === 1 ? '▲' : '▼'}}</span></th>
                <th v-show="categories.length" @click="changeOrder('category')">接口分类 <span v-show="orderKey === 'category'">{{orderType === 1 ? '▲' : '▼'}}</th>
                <th @click="changeOrder('url')">链接 <span v-show="orderKey === 'url'">{{orderType === 1 ? '▲' : '▼'}}</span></th>
                <th @click="changeOrder('method')">方法 <span v-show="orderKey === 'method'">{{orderType === 1 ? '▲' : '▼'}}</span></th>
                <th @click="changeOrder('lastModify')">最后修改 <span v-show="orderKey === 'lastModify'">{{orderType === 1 ? '▲' : '▼'}}</span></th>
                <th v-show="exceptMePrdData.length && originPrd"></th>
                <th style="width:100px">返回数据预览</th>
            </tr>
        </thead>
        <tbody id="tables">
            <tr track by
                @click="showDetail(item, $event)"
                v-for="item in list | orderBy orderKey orderType"
                :class="{'active': list_active === item, 'line': item.createTime !== item.updateTime}"
                v-show="cateActive == item.category || cateActive == '全部'">
                <td>{{item.title}}</td>
                <td v-show="categories.length">{{item.category}}</td>
                <td>{{item.url}}</td>
                <td><span @click="showJSON">{{item.method}}</span></td>
                <td>{{item.lastModify}}</td>
                <td v-show="exceptMePrdData.length && originPrd"><a class="mini ui blue basic button" @click.stop="pullApi(item)">拉取</a></td>
                <td><a class="mini ui button" href="{{host}}/api/fete_api/{{currentProjectId}}/{{$route.query.prdId}}/mock{{apiRoot}}{{item.url}}" target="_blank" @click="$event.stopPropagation()">预览</a></td>
            </tr>
        </tbody>
    </table>
  </div>
</div>
</template>

<script>
import { tog, add, emptyList, setList, addEvent, setCategories } from './vuex/action'
import MainFilter from './main_filter.vue'
import { list, listActive, apiRoot, cateActive, originPrd, exceptMePrdData, categories } from './vuex/getters.js'
export default {
  components: {
    MainFilter
  },
  vuex: {
    getters: {
      list,
      list_active: listActive,
      apiRoot,
      cateActive,
      originPrd,
      exceptMePrdData,
      categories
    },
    actions: {
      tog, add, emptyList, setList, setCategories
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
    },
    emptyList: 'emptyList',
    setList: 'setList',
    setCategories: 'setCategories',
    currentPrdData() {
      return this.list
    }
  },
  methods: {
    getList(pid) {
      this.emptyList()  // empty list first
      fetch('/api/apis', {
        body: { prdId: pid }
      }).then(res => {
        this.setList(res.data.data)
        this.setCategories(res.data.categories)
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
    },
    pullApi(api) {
      if (!this.originPrd) {
        toastr.error('请先选择需拉取的PRD版本！')
        return false
      }
      console.log(api)
      if (confirm(`确定要拉取 ${this.originPrd.name} 版本的接口\n\n"${api.title}"\n\n\的数据并同步覆盖到本版本吗？`)) {
        fetch('/api/apis/pullone', {
          body: {
            prdId: this.$route.query.prdId,
            id: api.id,
            originPrdId: this.originPrdId
          }
        }).then(res => {
          toastr.success(res.data)
          this.getList(this.$route.query.prdId)
        })
      }
      return true
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
