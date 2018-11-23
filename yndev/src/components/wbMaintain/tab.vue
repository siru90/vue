<template>

  <div class="cjy-main">  
    <!--维保先锋 保养导航-->
    <ul class="cjy-list1">
      <li :style="{width:rwidth}" class="cjy-tab-item1" v-for="(item, index) in titleInfor" :key="index" :goodsclassid="getClassCode(item)"
         :class="{'active-list':actindex == index}"  @click="changeIndex(index)" ref="titleLi">{{item.goodsClassName}}  
      </li>
    </ul>
  </div>
</template>
<script>
// emit: tabsChange(index) 选中的tab改变时触发此事件,第一次进入会自动触发一次
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
          actindex: 0,
      }
    },
    created () {
        
    },
    props: {
      titleInfor: {
        type: Array,
        //传入的数据如下 分类名称必传
        default: [{
          goodsClassId: "",
          goodsClassName: "分类",
          goodsClassNum: "",
        }]
      },

    },
    components: {
        
    },
    watch: {
      actindex (v,a) {
        this.changeBottom()
      },
      titleInfor(){
      }
    },
    methods: {
      getClassCode(item) {
        return item.goodsClassCode || item.goodsClassId
      },
      changeBottom () {
        var index = this.actindex
        var goodsClassId = this.$refs.titleLi[index].getAttribute("goodsclassid");
        var goodsClassName = this.$refs.titleLi[index].getAttribute("goodsclassname");
        this.$emit('tabsChange', index, goodsClassId);
      },
      changeIndex(index){
        this.actindex = index;
      },
    },

    computed: {
      rwidth() {
        return 100/this.titleInfor.length + '%'
      },
      borderStyleA(){
          return {
              "border-bottom": this.borderSytle == 1 ? "1px dotted #ededed" : "1px  solid #ededed"
          }
        }
    },
    mounted () {
      setTimeout(
        () => {
            if (this.$route.query.act) {
                this.actindex = this.$route.query.act
            } else {
                this.changeBottom()
            }

        },20
      )
    },
    updated () {

    }
  }
</script>

<style scope>
  .cjy-main{
      height: 1.7rem; border-bottom:1px solid rgb(234, 234, 234); background: #fff;
  }
  .classify_select {
    position: fixed !important;
    right: 0;
    top: 3rem;
  }

  .cjy-tab-item1 {
    padding: 0 0.3rem;
    /* width: 33.3%; */
    height: 100%;
    float: left;
    line-height: 1.7rem;
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
    position: relative;
  }

  .active-list {
    /*border-bottom: 2px solid #0f8de0;*/
    color: #EA3939;
  }

  .change-bar {
    background: #EA3939;
    height: 100%;
    /* width: 33.3%; */
    position: absolute;
    z-index: 2;
    -webkit-transition: 0.4s;
    -moz-transition: 0.4s;
    -ms-transition: 0.4s;
    -o-transition: 0.4s;
    transition: 0.4s;
  }

  .cjy-list1 {
    /*display: flex;*/
    position: relative;
    width: 100%;
    height: 100%;

  }

  .cjy-outer {
    width: 100%;
    position: fixed;
    top: 3rem;
    height: 2.3rem;
    z-index: 1;
    background: white;
    border-bottom: 1px solid rgb(234, 234, 234);
  }

  .cjy-scroll {
    position: relative;
    height: 100%;
    top: 3rem;
  }

  .aui-col-xs-3 {
    font-size: 0.7rem;
  }

  .nav-window-enter-active, .nav-window-leave-active {
    transition: all 0.5s;
  }

  .nav-window-enter, .nav-window-leave-to {
    transform: translatey(-100%);
    opacity: 0;
  }

  .bottom-line {
    background: rgb(234, 234, 234);
    width: 100%;
    height: 0.5px;
    position: absolute;
    bottom: 0;
  }
  .aui-badge{
    left: 70%;
  }

</style>
