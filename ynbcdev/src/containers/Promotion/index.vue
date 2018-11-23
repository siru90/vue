<template>
  <div class="vue_app" style="position: absolute;width: 100%;height:100%;top:0;padding-top: 5.2rem;overflow: hidden" >
    <div class="fixed_div iscroll_list classify_tab second_level" ref="outerEle">
      <tab-head :titleInfor="titleInfor">
      </tab-head>
    </div>
    <promotion-page :titleInfor="titleInfor" :number=" number" @loadNew ="loadNew"></promotion-page>
    <!--<PageFoot></PageFoot>-->
  </div>
</template>

<script>
  import TabHead from "../../components/TabHead"
  import promotionPage from "./promotionPage.vue"
  import PageFoot from "../../components/PageFoot"
  import axios from "axios"
  import API from '../../utils/url-router'
  import * as rootTypes from "../../store/mutations-type";
  import {mapGetters, mapMutations} from "vuex";
  var {goodsList, H5_HOST_URL, goodsListPage} = API()

  export default {
    data () {
      return {
        number: 5,
        titleInfor: [
          {
            goodsClassId: 0,
            goodsClassName: "品牌大促"
          },
          {
            goodsClassId: 1,
            goodsClassName: "值得买"
          },
          {
            goodsClassId: 2,
            goodsClassName: "超值进口"
          },
          {
            goodsClassId: 3,
            goodsClassName: "热评"
          }
        ], //tapHead中分类的种类
        className: 'goleft',
      }
    },
    components: {
      TabHead,
      promotionPage, //超值促销的页面结构
      PageFoot
    },
    methods: {
      loadNew (){
        this.number +=5 ;
      },

      head(title)
      {
        var that = this
        let options = {
          titlePart: {
            isHome: false,
            title: title
//            that.activeList.goodsclassname
          },
          hasSearch: true,
          handlePart: {
            type: '1',
            handleClick: () => {
            }
          }
        }
        this[rootTypes.SET_HEADER](options)
      },
      ...mapMutations([
        rootTypes.SET_HEADER]),

    },
    mounted () {
      this.head("超值促销")
    }
  }
</script>

<style>

</style>
