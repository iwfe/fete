<template>
    <div class="sub-slide-menu">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        open: false
      }
    },
    ready() {
      $('html').click(() => {
        this.$emit('sub-slide-menu-close')
      })
      $('.sub-slide-menu').click((e) => {
        e.stopPropagation()
      })
    },
    events: {
      'sub-slide-menu-open': function () {
        if (!this.open) {
          $('.sub-slide-menu').transition({
            animation: 'slide left',
            onComplete: () => {
              if (typeof cb === 'function') {
                cb()
              }
            }
          })
          this.open = true
        }
      },
      'sub-slide-menu-close': function () {
        if (this.open) {
          $('.sub-slide-menu').transition('slide left')
          this.open = false
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
    .sub-slide-menu {
        display: none;
        position: fixed;
        right: 50%;
        top: 0;
        width: 25%;
        height: 100%;
        background-color: #fff;
        -webkit-box-shadow: 0px 0px 3px 2px rgba(0,0,0,.2);
        -moz-box-shadow: 0px 0px 3px 2px rgba(0,0,0,.2);
        box-shadow: 0px 0px 3px 2px rgba(0,0,0,.2);
        overflow:auto;
        z-index: 99;
    }
</style>
