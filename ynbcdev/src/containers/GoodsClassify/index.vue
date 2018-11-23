<template>
  <div lass="vue_app" style="position: absolute;width: 100%">

    <!--头部-->
    <!--头部-->
    <!--导航-->
    <tab-head v-if="startList" :titleInfor=" startList?startList.secList:null">
    </tab-head>
    <!--导航-->

    <!--changeData-->
    <transition-group :name="className" tag="div" style="position: relative">
      <div style="position: absolute;top:0; width: 100%; min-height: 30rem;padding-top:2.2rem"
           v-for="(list,faindex) in startList.secList"
           v-if="faindex == classifyIndex && startList" :key="faindex"
           @touchstart="loadPosition"
           @touchend="changeEnd"
           @touchmove="changeMove">

        <!--分类广告start-->
        <div class="extension" style="position: relative ;width: 100%; ">
          <img v-if="secBanners" :src="secBanners?secBanners:'static/image/no_data_banner'"/>
          <em>共{{showList[faindex] ? showList[faindex].length : 0}}件</em>
          <!--显示分类商品件数-->
        </div>
        <!--分类广告 end-->
        <!--商品列表-->
        <div class="aui-content aui-margin-b-15">
          <ul class="aui-list aui-media-list wares_list">
            <commodity-list v-if="showList&& index<= floatNum "
                            v-for="(item,index) in showList[faindex] "
                            :key="item.goodsId"
                            :detailInfor="changeData(item)"
                            :floatNum = "floatNum"
            ></commodity-list>
          </ul>
          <div  v-if="showList[faindex] && floatNum < showList[faindex].length" style="color:#0f8de0 ;height:2rem!important;  width: 100%;text-align: center" @click="changeFloat">点击查看更多内容</div>
          <div v-else style="color:#0f8de0 ;height:2rem!important;  width: 100%;text-align: center" @click="changeFloat">没有更多内容</div>
        </div>
      </div>
    </transition-group>
  </div>


</template>

<script>
  import axios from "axios"
  import commodityList from "../../components/CommodityList"
  import API from '../../utils/url-router'
  import tabHead from "../../components/TabHead"
  import * as rootTypes from "../../store/mutations-type";
  import {mapGetters, mapMutations} from "vuex";
  import queryClassBanner from "../../utils/queryClassBanner"
  import ButtonToTop from "../../components/ButtonToTop"
  import {showLoading, hideLoading} from "../../utils/loading";
var {goodsList, H5_HOST_URL} = API()
  export default {
    data () {
      return {
        className: 'goleft',
        classInfor: null,
        startCode: null,
        secBanners: null,
        items: 5,
        pageSize :5,
        oldIndex: 0,
        noData: false,// 控制无数据时显示
        floatNum: 5,
        swiperOption: {
          speed: 2000,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          paginationElement: 'li',
          uniqueNavElements: false
        },
        swiperSlides: null
      }
    },
    components: {commodityList, tabHead, ButtonToTop},
    computed: {
      //商品分类图片
      classifyImageList () {
        return this.$store.state.jyModules.classifyImageList
      },
      //商品分类列表
      classifyList () {
        return this.$store.state.jyModules.classifyList
      },
      //一级分类列表
      startList () {
        var classifyImageList = this.classifyImageList
        //通过 一级分类code 查找分类classid
        if (this.classifyList && classifyImageList) {
          //查找出该页面的一级分类
          var obj = this.classifyList.find((item) => {
            return item.goodsclasscode == this.startCode
          })
          this.head(obj.goodsclassname)
//          if(classifyImageList){
//          var classifyCodeName = this.classifyImageList[this.startCode].categoryFlag
          this.secBanners = this.classifyImageList[this.startCode] ? this.classifyImageList[this.startCode].image : "static/image/no_data_ad.png"
          //修改耳机分类下的图片
//          this.getSecbanners(classifyCodeName)
          //找出查询二级分类banner的label
//          }
          axios.get(goodsList + 'goodsclasscode=' + this.startCode).then((data) => {
            var data = data.data
            this.classInfor = data.data
          })
          return obj
        } else {
          return ""
        }
      },
      //展示所需的数据
      showList () {
        var index = this.classifyIndex
        if (this.startList && this.classInfor) {
          var listOrder = this.startList.secList
          var classInfor = this.classInfor
          var showList = [classInfor]
          for (var i = 1; i < listOrder.length; i++) {
            var goodsClassId = listOrder[index].goodsClassId
            var everyList = this.classInfor.filter((item) => {
              return parseInt(item.goodsclassid) == parseInt(goodsClassId)
            })
            showList.push(everyList)
          }
//          hideLoading()
          return showList
        } else {
          return []
        }

      },
      classifyIndex () {
        return this.$store.state.jyModules.classifyIndex
      }
    },

    methods: {
      changeFloat (){
        this.floatNum += this.pageSize
      },

      //加载动画
      loadAnimate () {
        showLoading()
        setTimeout(() => {
          hideLoading()
          this.noData = true
        }, 2000)
      },

      //初始化查询列表
      // 初始化ClassifyImageList数据
      getClassifyImageList () {
        var classifyImageList = this.$store.state.jyModules.classifyImageList
        if (!classifyImageList) {
          this.$store.dispatch("getClassImage")
        }
      },
      getCodeName(classifyImageList) {
        this.CodeName = classifyImageList[this.startCode]
      },
      //初始化图片
      showClassifyPic (index) {
        if (!this.classifyImageList) {
          return ""
        }
        if (index == 0) {
          return this.classifyImageList[this.startCode]
        } else {
          return ""
        }
      },
      //获取信息
      getSecData () {
        return
      },
      //数据转化
      changeData ({goodsid, goodscode, goodsname, wsprice, goodsunit, prodarea, enterprisename, urllist, stockcount, goodstype, saleqty, goodsmodel, discountprice}) {
        var newData = {
          goodsCode: goodscode,
          goodsId: goodsid,
          goodsName: goodsname,
          goodsPrice: wsprice ? wsprice : 0,
          goodsUnit: goodsunit,
          city: prodarea,
          stockCount: stockcount,
          shopName: enterprisename,
          goodsType: goodstype ? goodstype : 0,
          goodsModel: goodsmodel,
          lable: null,
          mainPic: null,
          normalPrice: discountprice ? discountprice : "0.1"
        }
        var mainPic = urllist.find((item) => {
          return parseInt(item.Imgurltype) == 0
        })

        newData.mainPic = mainPic ? mainPic.imgurl : "static/image/demo1.png";
        return newData
      },

      //记录位置手指放下的位置
      loadPosition (e)  {
        this.startX = e.targetTouches[0].pageX
        this.startY = e.targetTouches[0].pageY
      },


      //改变Activeindex
      changeEnd (e) {
        var X = this.endX - this.startX;
        var Y = this.endY - this.startY;
        if (Math.abs(X) > Math.abs(Y) && Math.abs(X) > 100 && this.startX > 50) {
          if (X > 0) {
            var index = Math.max(0, this.classifyIndex - 1)
          } else {
            var index = Math.min(this.startList.secList.length - 1, this.classifyIndex + 1)
          }
          this.$store.dispatch('changeClassifyIndex', index)
        }
      },

      //手指移动
      changeMove (e)  {
        this.endX = e.targetTouches[0].pageX;
        this.endY = e.targetTouches[0].pageY;
      },

      ...mapMutations([
        rootTypes.SET_HEADER]),
      //设置头部
      head (title) {
        var that = this
        let options = {
          titlePart: {
            isHome: false,
            title: title
//            that.startList.goodsclassname
          },
          hasSearch: false,
          handlePart: {
            type: '1',
            handleClick: () => {
            }
          }
        }
        this[rootTypes.SET_HEADER](options)
      }
    },

    watch: {
      $route () {
        this.loadAnimate()
        this.startCode = this.$route.params.code
        this.$store.dispatch("changeClassifyIndex", 0)
//        window.location.reload();
      },
      classifyIndex () {
        if (this.classifyIndex - this.oldIndex > 0) {
          this.className = "goleft"
        } else {
          this.className = "goright"
        }
        this.oldIndex = this.classifyIndex
        this.floatNum = this.pageSize
      }
    },
    created () {
      this.getClassifyImageList()
      this.startCode = this.$route.params.code
      this.$store.dispatch("getClassifyList", this.startCode)
//      showLoading()
      this.loadAnimate()
    },
    mounted () {
//      this.$store.dispatch("getSecbanners", "CrankLink")
//      this.getClassImage
    },

  }
</script>

<style scoped>
  .swiper-pagination {
    position: absolute;
    bottom: 0.6rem;
    left: 0;
    right: 0;
    z-index: 99;
  }

  .swiper-pagination-bullet {
    margin: 0 0.18rem;
    background: #c7c7c7;
    width: 6px;
    height: 6px;
  }

  .swiper-pagination-bullet-active {
    background: limegreen;
  }

  .home_margin_bottom {
    position: relative;
  }

  .goleft-enter-active, .goleft-leave-active, .goright-enter-active, .goright-leave-active {
    transition: all 0.5s;
  }

  .goleft-enter, .goright-leave-to {
    transform: translatex(100%);
    opacity: 0.8
  }

  .goleft-leave-to, .goright-enter {
    transform: translatex(-100%);
    opacity: 0.8
  }
</style>
