<template>
    <div class="header-wrap clearfix">
        <div class="ui secondary pointing menu">
            <a class="item" :class="{'active': item.key === 'api'}" v-link="{path: item.link}" v-if="!item.subMenus" v-for="item in menus">
                {{item.text}}
            </a>
            <div class="ui pointing dropdown link item" v-if="item.subMenus" v-for="item in menus">
                <span class="text">{{item.text}}</span>
                <i class="dropdown icon"></i>
                <div class="menu">
                    <a class="item" href="{{subItem.link}}" v-for="subItem in item.subMenus">{{subItem.text}}</a>
                </div>
            </div>

            <div class="right menu">
                <a class="item">消息</a>
                <div class="ui pointing dropdown link item">
                    <span class="text" v-text="username"></span>
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
        replace: false,
        attached () {
            $('.ui.dropdown').dropdown({transition: 'drop', on: 'hover'});
        },
        data () {
            return {
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
        border: none;
        font-size: 12px;

        > .item {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            line-height: 47px;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;

            &:hover {
                color: $blue !important;
                border-bottom: 2px solid $blue;
            }
        }
    }
    .item.active {
        font-weight: normal !important;
        border-color: $blue !important;
    }
</style>