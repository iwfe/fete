<template>
    <div>
        <vue-nav></vue-nav>
        api page!
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
