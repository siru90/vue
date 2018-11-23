<template>
  <div>

    <!--图片展示div-->
    <!-- <div class="aui-slide-node extension">
      <img src="static/image/allBanner.jpg"/>
    </div> -->
    <!--表格div-->

    <div id="classify-content" class="classification">
      <div class="aui-row">
        <router-link tag="div" :to="{path:'goodsclass/'+item.goodsclasscode}" v-if="showInfor && item.usestatus == '1' " class="aui-col-xs-4" v-for="item in showInfor" >
          <div class="cjy-pic-outer" style="overflow: hidden"  :style="{backgroundImage: `url('static/image/demo1.png')` }">
            <img :src="item.imgurl?item.imgurl:'static/image/demo1.png'"/>
          </div>
          <div class="aui-grid-label" style="padding-top: 0.3rem">{{item.goodsclassname}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  // import Hello from './components/Hello'
  import * as rootTypes from "../../store/mutations-type";
  import {mapGetters, mapMutations} from "vuex";
  export default {
    data () {
      return {
      }
    },
    components: {},
    methods: {
      ...mapMutations([
        rootTypes.SET_HEADER]),
      head () {
        var that = this
        let options = {
          titlePart: {
            isHome: false,
            title: "首页"
          },
          hasSearch: true,
          handlePart: {
            type: '1',
            handleClick: () => {
            }
          }
        }
        this[rootTypes.SET_HEADER](options)
      }

    },
    computed: {
      classifyData () {
        return this.$store.state.cateList || this.$store.state.jyModules.classifyList
      },
      showInfor(){
        if(this.classifyData){
        var classifyData = this.classifyData.filter((item) => {
          return item.level == 1 && item.usestatus == 1
        })
          console.log(classifyData ,'//////////////')
          classifyData = classifyData.sort( (a,b) => {
            return  parseInt(a.goodsclasscode) - parseInt(b.goodsclasscode)
          })

        return classifyData
        }else{
          return []
        }
    }
    },
    created () {
      this.head()
      this.$store.dispatch('getClassifyList')

    },
    mounted () {
      this.head()
      document.querySelector('body').id = "classify"
    },
    beforeDestroy() {
      document.querySelector('body').id = ""
    },
  }
</script>

<style>
  .cjy-pic-outer{
    width:100%;
    height:0;
    padding-bottom: 100%;

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .aui-slide-node.extension {
    height: 17.54vh;
    padding-left: 3.2vw;
    padding-right: 3.2vw;
    padding-top: 1.8vh;
    margin-bottom: 0;
    padding-bottom: 1.8vh;
    background: #ffffff;
  }
  .aui-slide-node.extension img {
    border-radius: 1vw;
  }
  .classification {
    border-top: 0;
    border-bottom: 0;
    margin-bottom: 0;
  }
  #classify-content .cjy-pic-outer img {
    background: #ffffff;
  }
  /* #classify .classify-item img{
    width: 60%;
  }
  #classify .classify-item {
    background: #666666;
    margin-bottom: 0.5rem;
    position: relative;
    height: 5rem;
  }
  #classify .aui-col-xs-6:nth-child(odd) .classify-item{
    margin-right: 0.25rem
  }
  #classify .aui-col-xs-6:nth-child(even) .classify-item{
    margin-left: 0.25rem
  }
  #classify .classify-item .aui-grid-label{
    font-size: 0.8rem;
    position: absolute;
    right: 0.5rem;
    bottom: 0;
    color: #ffffff;
  }
  #classify header {
    background: #333333 !important;
    border-bottom: 0;
    color: #ffffff;
  }
  #classify #app {
    background: #333333 !important;
  }
  #classify .burger i {
    background-color: #ffffff;
  }
  #classify .nj-gouwuche {
    color: #ffffff !important;
  }
  #classify #classify-content {
    background: #333333;
  }
  #classify .nj-sousuo{
    color: #ffffff !important;
  }
  .cjy-pic-outer{
    width:100%;
    height:0;
    padding-bottom: 100%;

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .aui-slide-node.extension {
    height: 17.54vh;
    padding-left: 3.2vw;
    padding-right: 3.2vw;
    padding-top: 1.8vh;
    margin-bottom: 0;
    padding-bottom: 1.8vh;
    background: #ffffff;
  }
  .aui-slide-node.extension img {
    border-radius: 1vw;
  }
  .classification {
    border-top: 0;
    border-bottom: 0;
    margin-bottom: 0;
  }
  #classify-content .cjy-pic-outer img {
    background: #ffffff;
  } */
</style>
