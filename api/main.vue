<template>
    <section id="main">
        <path></path>
        <bar></bar>
        <list></list>
    </section>
</template>

<script type="text/babel">
import List from './list.vue'
import Bar from './bar.vue'
import Path from './path.vue'
export default {
    components: {
        List,
        Path,
        Bar
    },
    ready(){

    },
    events:{
        open(){
            this.$parent.$broadcast('slide-menu-open');
        }
    }
}
</script>
