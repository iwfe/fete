<template>
<div id="_list">
    <table class="table">
        <thead>
            <tr class="line">
                <th style="width:1%;"></th>
                <th>描述</th>
                <th>链接</th>
                <th>方法</th>
                <th style="width:10%;color:#999">共{{list.length}}个</th>
            </tr>
        </thead>
        <tbody>
            <tr
                @click="tog(item)"
                v-for="item in list"
                :class="{'active': list_active === item}">
                <td><input type="checkbox" /></td>
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
/*
<tr v-for="item in apiList" @click="showDetail(item._id, $event)">
    <td><input type="checkbox" /></td>
    <td>{{item.title}}</td>
    <td>{{item.url}}</td>
    <td>{{item.method}}</td>
    <td>查看</td>
</tr>
 */

import {tog,add} from './vuex/action'
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
        getList () {
            fetch('/api/apis', {
                body: {prdId: '111'}
            }).then(res => {
                res.data.forEach(v => {
                    this.add(v);
                });
            });
        },
        showDetail (id, e) {
            this.$parent.$broadcast('slide-menu-open');
            e.stopPropagation();
            e.parentDefault();
            fetch('/api/apis', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: '中文',
                    apiId: id
                })
            }).then(res => {
                console.log(res);
            });
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
    width: 100%;
}
.table tr:nth-of-type(odd){background:#f5f5f5;}
.table th{
    color: #2DB7F5;
    background: #fff;
}
.table td,.table th{
    line-height: 40px;
    padding: 0 12px;
}
.table tr.active{
    background: #2DB7F5;
    color: #fff;
}
.line{
    border-bottom: 1px dotted #ddd;
}
</style>
