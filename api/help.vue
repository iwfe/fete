<template>
<button style="position: relative;z-index: 100;background:Violet;color:#fff;" class="mini ui button" :class="{'active': active}" @click="active=!active">帮助
  <div class="documents">
    <h2 class="document_title">常用mock规则</h2>
    <div class="document_main">
      <center>string</center>
      <div>|2:<span class="fr">随机2个字符</span></div>
      <div>|2-6:<span class="fr">随机2-6个字符</span></div>
      <div>:@city()<span class="fr">随机城市名</span></div>
      <div>:@word(1,10)<span class="fr">随机1-10个字符</span></div>
      <div>:@cword(4,4)<span class="fr">随机1-6个汉子</span></div>
      <div>:@cname(1,6)<span class="fr">姓名</span></div>
      <div>:@date("yyyy-MM-dd")<span class="fr">日期字符</span></div>
      <div>:@time()<span class="fr">时间</span></div>
      <div>:@ip()<span class="fr">Ip地址</span></div>
      <div>:/^13[0-9]\d{8}|15[89]\d{8}/<span class="fr">手机号</span></div>
      <center>Number</center>
      <div>|123.3:<span class="fr">保留3位小数</span></div>
      <div>|123.1-10:<span class="fr">随机保留1-10位小数</span></div>
      <div>|1-100.1-10:<span class="fr">范围1-100,1-10位小数</span></div>
      <div>|1:[1,2,3,4]<span class="fr">随机数组中的1位</span></div>
      <div>:100<span class="fr">固定的常量</span></div>
      <center>Boolean</center>
      <div>:false<span class="fr">false</span></div>
      <div>|1-2:<span class="fr">true or false</span></div>
      <center>Array</center>
      <div>|4:<span class="fr">4次</span></div>
      <div>|1-4:['m']<span class="fr">随机1-4次m</span></div>
    </div>
    <a href="http://mockjs.com/examples.html" target="_blank">more&gt;</a>
  </div>
</button>
</template>
<script>
export default {
  data() {
    return {
      active: false
    }
  }
}
</script>
<style lang="less">
.documents{
  cursor:default;
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
  h2{
    color: #fff;
    background: Violet;
    padding: 0 12px;
  }
  a{
    color: #fff;position:absolute;right:12px;top:0;
  }
  .document_main > div{
    padding: 0 12px;line-height: 24px;font-weight:400;
  }
  .fr{
    float: right;
  }
  .document_main > div:hover{
    background: Violet;
    color: #fff;
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
  border-top: 12px solid #fff;
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