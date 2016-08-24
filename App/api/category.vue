<template>
  <div class="two wide column field api-sign">
    <label>接口分类</label>
    <input type="text" placeholder="接口分类" @focus="cateShow=true" @blur="blurInput($event)" v-model="category">
    <div class="ui raised segments api-category" v-show="cateShow && categories.length">
      <div class="ui segment category" v-for="item in categories" @click="chooseCate(item)">
        <p>{{item}}</p>
      </div>
    </div>
  </div>
</template>
<script lang="babel">

  export default {
    props: {
      category: {
        type: String,
        default: '',
        twoWay: true,
        required: true
      },
      categories: {
        type: Array,
        default: function() {
          return [];
        },
        required: true
      }
    },
    data() {
      return {
        cateShow: false
      }
    },
    methods: {
      blurInput(e) {
        // 延迟300毫秒，让click事件先执行
        setTimeout(() => {
          this.cateShow = false;
        }, 300)
      },
      chooseCate(item) {
        this.category = item;
        this.cateShow = false;
      }
    }
  }
</script>
<style lang="sass" scoped>
  .api-sign {
    position: relative;
  }
  .api-category {
    position: absolute;
    z-index: 100;
    margin-top: 12px;
  }
  .api-category::before {
    position:absolute;
    left: calc(50% - 6px);
    top: -12px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 12px solid rgba(34,36,38,.15);
    content:'';
    display:block;
    width:0;
    height:0;
  }
  .api-category::after {
    position:absolute;
    left: calc(50% - 6px);
    top: -9px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 10px solid #fff;
    content:'';
    display:block;
    width:0;
    height:0;
  }
  .category {
    padding: 0.4rem 0.6rem;
    font-weight: 400;
    p {
      margin: 0;
    }
    &:hover {
      color: #2db7f5;
    }
  }
</style>
