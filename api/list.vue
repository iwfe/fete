<template>
<div id="_list">
    <table class="table">
        <thead>
            <tr class="line">
                <th style="width:1%;"></th>
                <th>描述</th>
                <th>链接</th>
                <th>方法</th>
                <th style="width:10%;color:#999">共{{list?list.length:0}}个</th>
            </tr>
        </thead>
        <tbody>
            <tr track by
                @click="showDetail(item, $event)"
                v-for="item in list"
                :class="{'active': list_active === item}">
                <td>{{item._id}}</td>
                <td>{{item.title}}</td>
                <td>{{item.url}}</td>
                <td>{{item.method}}</td>
                <td>查看</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script type="text/babel">
  import { tog, add } from './vuex/action'
  export default {
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
            console.log(v);
            this.add(v);
          });
        });
      },
      showDetail(item, e) {
        this.$dispatch('open');
        this.tog(item);
        e.stopPropagation();
      }
    }
  }
</script>

<style>
#_list{
  padding-top: 12px;
  overflow: hidden;
  border-left: 1px dashed #ddd;
  min-height: 350px;
}
.table{
  margin: 0 12px;
  text-align: left;
}
.table tr:nth-of-type(even){background:#f5f5f5;border-radius: 5%;}
.table td,.table th{
  line-height: 36px;
  padding: 0 6px;
}
.table tr.active{
  background: #2DB7F5;
  color: #fff;
}
.line{
  border-bottom: 1px dotted #ddd;
}
</style>
