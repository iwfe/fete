<template>
    <div id="_path">
        <span>满懿企业号 ></span>
        <span>产品百科 ></span>
        <span> prd1.2</span>
        <a class="btn">复制</a>
        <div class="url">http://www.baidu.com/</div>
    </div>
</template>

<script type="text/babel">
export default {
    components: {

    },
    data () {
        return {

        }
    },
    props: {},
    ready() {
    },
    methods: {

    }
}
</script>

<style>
#_path{
    line-height: 28px;height: 40px;
    border-bottom: 1px dashed #ddd;
}
#_path .btn{
    color: #2DB7F5;
    float:right;
    padding: 0 16px;
    border:1px dashed #2DB7F5;
}
#_path .btn:hover{
    color: red;
    cursor: pointer;
    border-color: red;
}
#_path .url{
    float:right;
    margin-right:12px;
}
#_path span{
    color: #999;
    margin-left: 12px;
}
</style>
