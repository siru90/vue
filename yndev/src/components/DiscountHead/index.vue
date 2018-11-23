<template>
  <div>
    <!--首页tab滚动切换模块 可左右滑动切换-->
    <!--<div class=" cjy-scroll " style="overflow-x: scroll;height: 2.5rem ">-->
    <ul class="cjy-list1">
      <li style="width: 0;height:100%;">
        <div class="change-bar1" ref="changeBar"></div>
        <div class="bottom-line1"></div>
      </li>
      <li :key="index" class="cjy-tab-item2" v-for="(item, index) in titleInfor"
          :class="{'active-list':activeList == index}" @click="changeIndex(index)" ref="titleLi">{{item.goodsClassName}}
      </li>
    </ul>


  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {}
    },
    created () {

    },
    props: {
      titleInfor: {
        type: Array,
        //传入的数据如下 分类名称必传
        default: [{
          goodsClassName: "全部",
          code:0
        }, {
          goodsClassName: "未使用",
          code:1
        }, {
          goodsClassName: "已过期",
          code:2
        }]
      },
      isRouter: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    watch: {
      activeList () {
        this.changeBottom()
      },

      titleInfor(){
      }
    },
    methods: {
      changeBottom () {
        var changeBar = this.$refs.changeBar
        var index = this.activeList
        changeBar.style.width = document.body.offsetWidth/this.titleInfor.length+ "px"
        changeBar.style.webkitTransform = `translatex(${index * 100}%)`
        if (this.isRouter) {
          this.$router.push("/main/install?serviceNo=" + this.activeList)
        }
      },


      //将所index值传入Vuex  获取index的方法为 this.$store.state.jyModules.classifyIndex 直接复制不谢
      changeIndex(index){
        this.$store.dispatch('changeClassifyIndex', index)
      },

    },

    computed: {
      activeList (){

        return this.$store.state.jyModules.classifyIndex
      }
    },
    mounted () {
      setTimeout(
        () => {
          this.changeBottom()
        }, 20
      )
    },
    updated () {

    }
  }
</script>

<style scoped>
  .classify_select {
    position: fixed !important;
    right: 0;
    top: 3rem;
  }

  .cjy-tab-item2 {
    padding: 0 0.3rem;
    height: 100%;
    flex-grow:1;
    float: left;
    line-height: 2.2rem;
    text-align: center;
    overflow: hidden;
    text-overflow: clip;
    word-break: break-all;
    white-space: inherit;
    border-bottom: 2px solid transparent;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 0.7rem;
  }

  .active-list {
    color: #0f8de0;;
  }

  .change-bar1 {
    background: #0f8de0;
    height: 2px;
    width: 33.33%;
    position: absolute;
    z-index: 2;
    bottom:0;
    -webkit-transition: 0.4s;
    -moz-transition: 0.4s;
    -ms-transition: 0.4s;
    -o-transition: 0.4s;
    transition: 0.4s;
  }

  .cjy-list1 {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;

  }

  .bottom-line1 {
    background: rgb(234, 234, 234);
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
  }
</style>
