<template>
    <div class="slide-menu">
        <slot></slot>
    </div>
    <div class="sub-slide-mask" v-show="open"></div>
</template>

<script>
  import { blurList } from '../vuex/action'
  export default {
    data() {
      return {
        open: false
      }
    },
    vuex: {
      actions: {
        blurList
      }
    },
    ready() {
      // $('html').click(() => {
      //   this.$emit('slide-menu-close');
      // });
      $('.slide-menu').click((e) => {
        e.stopPropagation();
      });
    },
    events: {
      'slide-menu-open': function (cb) {
        if (!this.open) {
          $('.slide-menu').transition({
            animation: 'slide left',
            onComplete: () => {
              if (typeof cb === 'function') {
                cb()
              }
            }
          })
          this.open = true;
        }
      },
      'slide-menu-close': function () {
        if (this.open) {
          $('.slide-menu').transition('slide left');
          this.open = false;
        }
        this.blurList();
      }
    }
  }
</script>

<style lang="sass"  scoped>
.sub-slide-mask{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(000, 000, 000, 0.4);
}
  .slide-menu {
    display: none;
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
    z-index: 100;
  }
  @media screen and (max-width: 1680px) {
    .slide-menu {
      width: 70%;
    }
  }
  @media screen and (max-width: 1480px) {
    .slide-menu {
      width: 75%;
    }
  }
  @media screen and (max-width: 1280px) {
    .slide-menu {
      width: 80%;
    }
  }
</style>
