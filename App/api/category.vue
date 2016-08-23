<template>
  <div class="two wide column field api-sign">
    <label>接口分类</label>
    <input type="text" placeholder="接口分类" @focus="cateShow=true" @blur="cateShow=false" v-model="category">
    <div class="ui raised segments api-category" v-show="cateShow">
      <div class="ui segment category" v-for="item in categories" @click="category=item">
        <p>{{item}}</p>
      </div>
    </div>
  </div>
</template>
<script lang="babel">
  export default {
    props: {
      categories: {
        type: Array,
        default: function() {
          return [];
        },
        required: true
      },
      category: {
        type: String,
        default: '',
        twoWay: true,
        required: true
      }
    },
    data() {
      cateShow: false
    }
  }
</script>
<style lang="sass">
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
  top: -10px;
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
    color: #fff;
    background: #666;
  }
}
</style>
