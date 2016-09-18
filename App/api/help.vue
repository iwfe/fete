<template>
<div class="mini ui button" style="position:relative;z-index:100;background:Violet;color:#fff;" :class="{'active': active}" @click="active=!active">帮助
  <div class="documents">
    <h2 class="document_title">常用mock规则</h2>
    <div class="document_main">
      <center>string</center>
      <div v-for="item in string" :data-copytarget="'#twitter' + $index" ><input type="text" readonly="readonly" class="btn" :id="'twitter' + $index" :value="item.name"/><span class="fr">{{item.tips}}</span></div>
      <center>Number</center>
      <div v-for="item in number" :data-copytarget="'#twitters' + $index" ><input type="text" readonly="readonly" class="btn" :id="'twitters' + $index" :value="item.name"/><span class="fr">{{item.tips}}</span></div>
      <center>Boolean</center>
      <div v-for="item in boolean" :data-copytarget="'#twitteres' + $index"><input type="text" readonly="readonly" class="btn" :id="'twitteres' + $index"  :value="item.name" /><span class="fr">{{item.tips}}</span></div>
      <center>Array or Object</center>
      <div v-for="item in array" :data-copytarget="'#twittera' + $index"><input type="text" readonly="readonly" class="btn" :id="'twittera' + $index" :value="item.name" /><span class="fr">{{item.tips}}</span></div>
    </div>
    <a href="http://mockjs.com/examples.html" target="_blank">more&gt;</a>
  </div>
</div>
</template>
<script>
const _string = [{
  name: '|2:',
  tips: '随机2个字符'
}, {
  name: '|2-6:',
  tips: '随机2-6个字符'
}, {
  name: ':@city()',
  tips: '随机城市名'
}, {
  name: ':@word(1,10)',
  tips: '随机1-10个字符'
}, {
  name: ':@cword(1,4)',
  tips: '随机1-6个汉字'
}, {
  name: ':@cname()',
  tips: '姓名'
}, {
  name: ':@date("yyyy-MM-dd")',
  tips: '日期字符'
}, {
  name: ':@time()',
  tips: '时间'
}, {
  name: ':@ip()',
  tips: 'Ip地址'
}, {
  name: ':/^13[0-9][0-9]{8}|15[89][0-9]{8}/',
  tips: '手机号'
}]

const _number = [{
  name: '|123.3:',
  tips: '保留3位小数'
}, {
  name: '|123.1-10:',
  tips: '随机保留1-10位小数'
}, {
  name: '|1-100.1-10:',
  tips: '范围1-100,1-10位小数'
}, {
  name: '|1:[1,2,3,4]',
  tips: '随机数组中的1位'
}, {
  name: ':100',
  tips: '固定的常量'
}]

const _boolean = [{
  name: ':false',
  tips: 'false'
}, {
  name: '|1-2:',
  tips: 'true or false'
}]
const _array = [{
  name: '|4:',
  tips: '4次'
}, {
  name: '|1-4:["m"]',
  tips: '随机1-4次m'
}]

export default {
  data() {
    return {
      active: false,
      string: _string,
      number: _number,
      boolean: _boolean,
      array: _array
    }
  },
  ready() {
    const clipboard = new Clipboard('.btn')
    clipboard.destroy()
  },
  methods: {
    showHelp() {
      this.active = true
    }
  }
}

</script>
<style lang="less">
.documents{
  cursor: default;
  text-align: left;
  line-height: 30px;
  color: #666;
  width: 300px;
  border-radius: 6px;
  position: absolute;
  left: -150px;
  margin-left: 23px;
  background: #fff;
  bottom: 12px;
  border: 2px solid Violet;
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transition: all .25s ease;
  transition: all .25s ease;
  -webkit-transform-origin: 154px bottom;
  transform-origin: 154px bottom;
  opacity: 0;
  .fr{
    pointer-events: none;
  }
  h2{
    color: #fff;
    background: Violet;
    padding: 0 12px;
  }
  a{
    color: #fff;position:absolute;right:12px;top:0;
  }
  .document_main > div{
    padding: 0 12px;line-height: 24px;height:24px;font-weight:400;
  }
  .document_main > div:hover{
    background: Violet;
    color: #fff;
  }
  .document_main input{
    pointer-events: none;
    border: 0 none;
    background: transparent;
  }
  .fr{
    float: right;
  }
  center{
    color: Violet;
    background: #f6f6f6;
  }
}
.document_title{
  font-size:12px;margin:0;text-align:left;height:30px;line-height:30px;
}
.documents:after{
  position:absolute;
  left: 50%;
  bottom: -10px;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 11px solid #fff;
  content:'';
  display:block;
  width:0;
  height:0;
}
.documents:before{
  position:absolute;
  left: 50%;
  bottom: -14px;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 12px solid Violet;
  content:'';
  display:block;
  width:0;
  height:0;
}
.button.active .documents{
  opacity: 1;
  bottom: 44px;
  transform: scale(1);
  -webkit-transform: scale(1);
}
</style>