<template>
    <div class="slide-menu">
        <slot></slot>
    </div>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        open: false
      }
    },
    ready() {
      $('html').click(() => {
        this.$emit('slide-menu-close');
      });
      $('.slide-menu').click((e) => {
        e.stopPropagation();
      });
    },
    events: {
      'slide-menu-open': function () {
        if (!this.open) {
          $('.slide-menu').transition('slide left');
          this.open = true;
        }
      },
      'slide-menu-close': function () {
        if (this.open) {
          $('.slide-menu').transition('slide left');
          this.open = false;
        }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" type="text/css">
    .slide-menu {
        /* display: none; */
        position: fixed;
        right: 0;
        top: 0;
        width: 60%;
        height: 100%;
        background-color: #fff;
        -webkit-box-shadow: 0px 0px 3px 2px rgba(0,0,0,.2);
        -moz-box-shadow: 0px 0px 3px 2px rgba(0,0,0,.2);
        box-shadow: 0px 0px 3px 2px rgba(0,0,0,.2);
        overflow:auto;
    }
</style>
