<template>
  <div>

    <!--图片展示div-->
    <div class="aui-slide-node extension">
      <img src="static/image/allBanner.jpg"/>
    </div>
    <!--表格div-->

    <div id="classify-content" class="classification">
      <div class="aui-row">
        <router-link :key="index" tag="div" :to="{path:'goodsclass/'+item.goodsclasscode}" v-if="showInfor && item.usestatus == '1' " class="aui-col-xs-4" v-for="(item,index) in showInfor" >
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
            title: "商品分类"
          },
          hasSearch: false,
          handlePart: {
            type: '',
            handleClick: () => {
            }
          }
        }
        this[rootTypes.SET_HEADER](options)
      }

    },
    computed: {
      classifyData () {
        return this.$store.state.cateList
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
            this.$store.dispatch('jyy/getHomeClassList')
            return []
          }
      }
    },
    created () {
      this.head()
    },
    mounted () {
      this.head()
    }
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
</style>
