<template>
    <div class="header-wrap clearfix">
        <div class="ui menu">
            <a class="item" href="{{item.link}}" v-if="!item.subMenus" v-for="item in menus">
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
                        <div class="header">Categories</div>
                        <div class="item">Home Goods</div>
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
        attached: function () {
            $('.ui.dropdown').dropdown({on: 'hover'});
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

</style>