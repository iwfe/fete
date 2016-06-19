<template>
    <div>
        <vue-nav></vue-nav>
        api page!
        <!-- Colored FAB button with ripple -->
        <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
            <i class="material-icons">add</i>
        </button>
    </div>
</template>

<script type="text/babel">
    import mdl from 'material-design-lite/material.js'
    import VueNav from './vue_nav.vue';

    export default {
        components: {
            VueNav
        },
        data () {
            return {
            
            }
        },
        props: {
            
        },
        ready() {
            this.$nextTick(function(){
                componentHandler.upgradeAllRegistered();
            });
        },
        methods: {
            
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss" type="text/css">
    
</style>