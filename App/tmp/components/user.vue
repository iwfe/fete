<template>
<div id="user">
  <div class="pic"></div>
</div>
<div class="main">
  <div class="user_list">
    <div class="user_title">账户设置</div>
    <ul>
      <li @click="active = 'info'" :class="{'active': active === 'info'}">个人信息</li>
      <li @click="active = 'password'" :class="{'active': active === 'password'}">修改密码</li>
    </ul>
  </div>
  <div class="user_main">
    <div v-show="active === 'info'" class="cont">
      <div class="user_title" style="text-align: left;">个人信息</div>
      <form id="info" action="" method="post">
        <ul>
          <li>
            <input type="text" class="text" placeholder="姓名" />
          </li>
          <li>
            <input type="radio" class="magic-radio" id="sexMale" name="sex" value="MALE" checked="checked">
            <label for="sexMale">男</label>
            <input type="radio" class="magic-radio" id="sexFemale" name="sex" value="FEMALE">
            <label for="sexFemale">女</label>
          </li>
          <li style="padding-top:24px;text-align:center;"><span class="btn">保存</span></li>
          <li style="padding-left:142px;color:red;padding-top:12px;">错误信息</li>
        </ul>
      </form>
    </div>
    <div v-show="active === 'password'" class="cont">
      <div class="user_title" style="text-align: left;">修改密码</div>
      <form id="info" action="" method="post">
        <ul>
          <li>
            <input type="text" class="text" placeholder="旧密码" />
          </li>
          <li>
            <input type="text" class="text" placeholder="新密码" />
          </li>
          <li>
            <input type="text" class="text" placeholder="重复一遍新密码" />
          </li>
          <li style="padding-top:24px;text-align:center;"><span class="btn">保存</span></li>
          <li style="padding-left:142px;color:red;padding-top:12px;">错误信息</li>
        </ul>
      </form>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      src: '',
      active: 'password'
    }
  },
  ready() {
    //
  }
}
</script>
<style lang="less">
body{padding: 0;font:12px/1.5 tahoma,arial,Hiragino Sans GB,Microsoft Yahei;}
.btn{
  display: inline-block;
  box-sizing: border-box;
  min-width: 120px;
  height: 50px;
  line-height: 50px;
  padding: 0 12px;
  font-size: 18px;
  color: #fff;
  text-align: center;
  border: 0;
  border-radius: 3px;
  background-color: #2DB7F5
}
.btn:hover{color:#fff;background-color: #2DB7F5;cursor: pointer;}
.btn_invert{line-height:28px;color:#00b38a;border:1px solid #00b38a;background-color:#fff}
.btn_invert:hover{color:#fff;background-color:#00b38a}
.btn_cancel{line-height:30px;color:#fff;border:0;background-color:#d4d6d9}
.btn_cancel:hover{color:#fff;background-color:#d4d6d9}
.btn_disable{line-height:30px;color:#fff;border:0;background-color:#d4d6d9;cursor:default}
.btn_disable:hover{color:#fff;background-color:#d4d6d9}
.mod-user{font-size: 14px;height: 100%;padding-top: 140px;box-sizing: border-box;color: #666;}
#user{
  color: #333;
  padding: 12px 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: #333;
}
#user .pic{
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background: #ccc;
}
.user_title{
  text-align: center;
  color: #999;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
}
.user_list{
  width: 200px;
  height: 100%;
  background: #FAFAFA;
  float: left;
}
.user_list li{
  height: 48px;
  line-height: 48px;
  padding-left: 12px;
  position: relative;
}
.user_list li.active,.user_list li:hover{
  cursor: pointer;
  background: #f0f0f0;
}
.user_list li.active:after,.user_list li:hover:after {
  border-left-color: #f0f0f0;
}
.user_list li:before{
  position:absolute;
  right: 12px;
  top: 50%;
  margin-top: -5px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 7px solid #000;
  content: '';
  display:block;
  width:0;
  height:0;
}
.user_list li:after{
  position:absolute;
  right: 13px;
  top: 50%;
  margin-top: -5px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 7px solid #FAFAFA;
  content: '';
  display:block;
  width:0;
  height:0;
}
.user_list i{
  width: 12px;
  line-height: 14px;
  height: 14px;
  float: left;
  padding-left: 12px;
}
.user_main{
  height: 100%;
  overflow: hidden;
  padding-left: 36px;
}
.user_main li{
  height: 48px;
  line-height: 48px;
}
.user_main .text{
  display: block;
  box-sizing: border-box;
  width: 700px;
  height: 40px;
  padding: 12px;
  font-size: 14px;
  color: #555;
  line-height: 14px;
  border: 1px solid #ededed;
  border-radius: 3px;
  margin-top: 4px;
  float: left;
  transition: border .2s ease-in 0s;
}

.main{
  margin: 0 auto;
  width: 1000px;
  height: 100%;
}
.magic-radio+label{margin-right:40px;color:#555}
.magic-radio+label:hover{color:#333}
.magic-radio:checked+label{color:#333}

.magic-radio{position:absolute;display:none}
.magic-radio[disabled]{cursor:not-allowed}
.magic-radio+label{
  position:relative;
  display:inline-block;
  padding-left:28px;
  margin-right:20px;
  cursor:pointer;
  vertical-align:middle;
  font-size:16px;
  line-height:16px
}
.magic-radio+label:before{
  position:absolute;
  top:0;
  left:0;
  display:inline-block;
  width:14px;
  height:14px;
  content:'';
  border:1px solid #ededed
}
.magic-radio+label:after{
  position:absolute;
  display:none;
  content:''
}
.magic-radio[disabled]+label{
  cursor:not-allowed;color:#ededed
}
.magic-radio[disabled]+label:hover,
.magic-radio[disabled]+label:before,
.magic-radio[disabled]+label:after{cursor:not-allowed}
.magic-radio[disabled]+label:hover:before{
  border:1px solid #ededed;
}
.magic-radio[disabled]+label:before{
  border-color:#ededed
}
.magic-radio:checked+label:after{
  display:block
}
.magic-radio+label:before{
  border-radius:50%
}
.magic-radio+label:after{
  top:4px;
  left:4px;
  width:8px;
  height:8px;
  border-radius:50%;
  background: #2DB7F5
}
.magic-radio:checked+label:before{
  border:1px solid #2DB7F5
}
.magic-radio:checked[disabled]+label:before{
  border:1px solid #c6ece3
}
.magic-radio:checked[disabled]+label:after{
  background:#c6ece3
}
.cont{
  height: 100%;
  padding-left: 24px;
  background: #FAFAFA;
}
</style>
