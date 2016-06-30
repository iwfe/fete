<template>
    <div class="header-wrap clearfix">
        <div class="ui secondary pointing menu">
            <a class="item" href="{{item.link}}" v-if="!item.subMenus && !item.isVueLink" v-for="item in menus">
                {{item.text}}
            </a>
            <div class="ui dropdown link item" v-if="item.subMenus" v-for="item in menus">
                {{item.text}}
                <div class="menu">
                    <a class="item" href="{{subItem.link}}" v-for="subItem in item.subMenus">{{subItem.text}}</a>
                </div>
            </div>
            <!-- <a class="item" v-link="{name: 'list', activeClass: 'active'}">API</a> -->
            <a class="item" href="/api">API</a>

            <div class="right menu">
                <a class="item msg-span"  href="/message">消息 (<span class="msg-count">0</span>)</a>
                <div class="ui pointing dropdown link item">
                    {{username}}
                    <i class="dropdown icon"></i>
                    <div class="menu">
                        <a class="item" href="/user/profile">个人设置</a>
                        <a class="item" href="/logout">退出</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
  import menus from '../layout/menu';

  export default Vue.extend({
    name: 'top-nav',
    replace: true,
    attached() {
      $('.ui.dropdown').dropdown({ transition: 'drop', on: 'hover' });
    },
    data() {
      return {
        userId: pageConfig.me._id,
        username: pageConfig.me.username,
        menus: menus
      }
    },
    methods: {}
  })
</script>

<style lang="sass" rel="stylesheet/scss" type="text/css">
    $blue: #2db7f5;

    .ui.secondary.pointing.menu,
    .right.menu {
        border: none !important;
        font-size: 12px;

        .item {
          height: 100%;
        }
        > .item {
            width: 64px;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            line-height: 47px;
            align-items: center;
            justify-content: center;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;

            &:hover {
                color: $blue !important;
                border-bottom: 2px solid $blue;
            }
        }
        .msg-span{
          width: 100px;
        }
    }
    .item.active {
        font-weight: normal !important;
        border-color: $blue !important;
    }
    .dropdown.active {
        background-color: #eaf8fe !important;
    }
</style>
