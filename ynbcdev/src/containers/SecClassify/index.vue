<template>
  <div class="classgoodsList" lass="vue_app" ref="vue_app"
       style=" top:0rem;position: absolute;width: 100% ;height: 100vh; padding-top:5.2rem;overflow: hidden ">
    <!--导航-->
    <div style="position:fixed;top:3rem;overflow: visible; width: 100%;height:2.2rem;z-index: 10">
      <tab-head v-if="activeList" :titleInfor=" activeList?activeList:null">
      </tab-head>
    </div>

    <!--导航-->

    <!--changeData-->
    <translate-group :lengths="activeList?activeList.length:1" ref="translateGroup" @scrollBottom="loadMores">
      <!--<transition-group :name="className" tag="div">-->
      <!--style="  position: relative" tag="div"-->

      <!--v-for="(list,faindex) in activeList"-->
      <!--v-if="faindex == activeIndex && activeList" :key="faindex"-->
      <!--@touchstart.stop="loadPosition"-->
      <!--@touchend.stop="changeEnd"-->
      <!--@touchmove.prevent="changeMove"-->
      <div style="position:relative">
        <!--分类广告start-->
        <!-- <div class="extension" style="position: relative ;width: 100%; ">
          <img :src="secBanners|| 'static/image/no_data_ad.png'"/>
          <em>共{{resData ? resData.totalCount : 0}}件</em>
        </div> -->
        <!--分类广告 end-->

        <!--<LoadMoreAnimate>-->

        <!--</LoadMoreAnimate>-->
        <!--商品列表-->
        <div class="aui-content aui-margin-b-15" style="min-height:40vh" ref="list">


          <ul class="aui-list aui-media-list wares_list">
            <commodity-list v-if=" showList "
                            v-for="(item,index) in showList"
                            :pagePosY="pagePosY"
                            :pageHeight="pageHeight"
                            :key="item.goodsId"
                            :detailInfor="translateDetailData(item)">

            </commodity-list>
          </ul>
          <div v-if="isShowLoadMore"
               style="color:#9a9a9a ;height:2rem!important;  width: 100%;text-align: center;  line-height: 2rem;vertical-align: middle ; background:white"
               @click.self="changeFloat">
            <LoadMoreAnimate></LoadMoreAnimate>
            加载更多
          </div>


          <!--版权信息-->
          <div v-if="!resData || pageNum * pageSize > resData.totalCount" class="copyright">
            <p>Copyright&copy;2016-2017 All Rights Reseved.</p>
            <p>象翌微链科技发展有限公司</p>
            <!-- <p>客服电话：4008-888-888</p> -->
          </div>

        </div>

        <!--版权信息 end-->
      </div>

      <!--</transition-group>-->
    </translate-group>
  </div>


</template>

<script>
  import tabHead from "../../components/TabHead"
  import commodityList from "../../components/CommodityList"
  import TranslateGroup from "../../components/TranslateTest"
  import axios from "axios"
  import  api from '../../utils/url-router'
  import * as rootTypes from "../../store/mutations-type";
  import {mapGetters, mapMutations} from "vuex";
  //  import queryClassBanner from "../../utils/queryClassBanner"
  import ButtonToTop from "../../components/ButtonToTop"
  import {showLoading, hideLoading} from "../../utils/loading";
  import {translateDetailData} from "../../utils/translateDetailData"
  import LoadMoreAnimate from '../../components/LoadMoreAnimate'

  var {goodsList, H5_HOST_URL, goodsListPage, enterpriseId, queryGoodsPage} = api()

  export default {
    data () {
      return {
        className: 'goleft',
        classInfor: null,
        startCode: null,
        items: 5,
        oldIndex: 0,
        pageSize: 5,
        startIndex: 0,
        showList: [],
        pageNum: 1,
        resData: null,
        sortrule: "desc",
        noData: false,// 控制无数据时显示
        floatNum: 30,
        timeList: [],
        isShowLoadMore: false
      }
    },
    components: {commodityList, tabHead, ButtonToTop, TranslateGroup, LoadMoreAnimate},
    beforeCreate () {
      this.$store.dispatch('changeClassifyIndex', 0)
    },

    created () {
      var classifyList = this.$store.state.jyModules.classifyList

      this.getClassifyImageList()
      this.startCode = this.$route.params.code
      if (!classifyList) {
        this.$store.dispatch("getClassifyList", this.startCode)
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.head(this.classifyName)
        var time = 0

        function loadPosition() {
          setTimeout(() => {
            time++
            document.body.scrollTop = 600
            if (document.body.scrollTop == 300 || time > 100) {
              return
            }
            loadPosition()
          }, 30)
        }

//        loadPosition()
      })

    },
    beforeRouteLeave (to, from, next) {
      var pagePosition = {
        pageName: "goodsClass",
        fromPage: this.$route.path,
        toPage: to.fullPath,
        activeIndex: this.activeIndex,
        position: document.body.scrollTop
      }
      this.$store.dispatch("savePagePosition", pagePosition)
      next()
    },
    computed: {
      pagePosY () {
        var list = this.$refs['list']
        var top = 0
        var outerheight = this.$refs['vue_app']
        var post = this.$store.state.cjy.pagePosY
        if (list) {
          var top = list.offsetTop
        }
        return post - top
      },
      pageHeight (){
        var outerheight = this.$refs['vue_app']
        if (outerheight) {
          return outerheight.offsetHeight
        }
        return 0
      },
      //商品分类图片
      classifyImageList () {
        return this.$store.state.jyModules.classifyImageList
      },
      secBanners () {
        if (this.classifyImageList) {
          return this.classifyImageList[this.startCode] ? this.classifyImageList[this.startCode].image : "static/image/no_data_banner.png"
        }
        return "static/image/no_data_banner.png"
      },
      //商品分类列表
      classifyList () {
        return this.$store.state.jyModules.classifyList
      },
      //展示所需的数据
      activeList () {
        if (this.classifyList && this.startCode) {
          var activeList = this.classifyList.find((item) => {
            return item.goodsclasscode == this.startCode
          })
          this.classifyName = activeList ? activeList.goodsclassname : ""
          this.head(this.classifyName)
          return activeList.secList
        } else {
          return null
        }
      },

      // 当前的tapbar
      activeIndex () {
        return this.$store.state.jyModules.classifyIndex

      },

      // 获取当前商品分类编码
      goodsClassCode () {
        if (this.activeIndex != 0 && this.activeList) {
          return this.activeList[this.activeIndex].goodsClassCode
        } else {
          return this.startCode
        }
      },

      //计算信息
      queryConfig () {
        var queryConfig = `start=0&length=${this.pageSize}&pageNum=${this.pageNum}&goodsclasscode=${this.goodsClassCode}&sortrule=${this.sortrule}`

        queryConfig = {
          url: queryGoodsPage,
          method: 'get',
          params: {
            start: 0,
            enterpriseid: enterpriseId,
            length: this.pageSize,
            isPage: true,
            pageNum: this.pageNum,
            goodsclasscode: this.goodsClassCode
          },
          headers: {
              sessionId: window.localStorage.getItem('sessionId')
          }
        }


        return queryConfig
      },

      // 详情商品列表
      newList () {
        if (this.resData) {
          return this.resData.results
        } else {
          return []
        }
      },

    },


    methods: {
      showLoadMoreAnimat () {
        this.isShowLoadMore = true
      },
      hideLoadMoreAnimat() {
        this.isShowLoadMore = false
      },
      loadMores (){


        var resData = this.resData
        if (resData && this.pageNum * this.pageSize < resData.totalCount) {
          this.pageNum++
          this.showLoadMoreAnimat()
        }
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
      //获取分页数据的方法
      getShowList () {
        if (this.pageNum == 1) {
          this.loadAnimate()
          document.body.scrollTop = 0
          this.showList = []
        }
        else {
          this.showLoadMoreAnimat()
        }
        var config = this.queryConfig
//        axios.get(goodsListPage + config + "&token=" + new Date().getTime())
        axios(config)
          .then(
            (res) => {
              res = res.data
              hideLoading()
              this.hideLoadMoreAnimat()
              this.resData = res.data[0]
            }
          )
      },
      //数据转化
      translateDetailData,

      //记录位置手指放下的位置
      loadPosition (e)  {
        this.tiemList = []
        this.startX = e.changedTouches[0].clientX
        this.startY = e.changedTouches[0].clientY
        this.oldX = this.startX
        this.oldY = this.startY
        this.startTime = new Date()

        this.endTime = this.startTime
      },

      //手指移动
      changeMove (e)  {

        var newX = e.changedTouches[0].clientX
        var newY = e.changedTouches[0].clientY
        var moveX = newX - this.oldX
        var moveY = newY - this.oldY
        this.timeList.unshift({time: new Date().getTime(), move: moveY})
        this.timeList.length > 5 && this.timeList.pop()
        if (Math.abs(moveY) / Math.abs(moveX) > 1) {
          document.body.scrollTop = document.body.scrollTop - moveY
        }
        this.oldX = newX
        this.oldY = newY

      },
      //改变Activeindex
      changeEnd (e) {
        var endX = e.changedTouches[0].clientX
        var endY = e.changedTouches[0].clientY
        var X = endX - this.startX;
        var Y = endY - this.startY;
        if (Math.abs(X) > Math.abs(Y) && Math.abs(X) > 100 && this.startX > 50) {

          if (X > 0) {
            var index = Math.max(0, this.activeIndex - 1)
          } else {
            var index = Math.min(this.activeList.length - 1, this.activeIndex + 1)
          }
          this.$store.dispatch('changeClassifyIndex', index)
          var ggactive = this.$store.state.jyModules.classifyIndex
        }
        if (this.timeList.length < 3) {
          this.timeList = []
          return
        }

        var startTime = this.timeList[0].time
        var v = (this.timeList[0].move + this.timeList[0].move) / (this.timeList[0].time - this.timeList[1].time) / 4
        this.timeList = []
        var contentY = document.body.scrollTop
        this.endMove(v, startTime - 1, contentY)
      },

      //入缓动机制
      endMove (v, startTime, contentY) {

        var dir = v > 0 ? 1 : -1; //加速度方向
        var deceleration = dir * 0.001;
        var duration = v / deceleration; // 速度消减至0所需时间
        var dist = v * duration / 2; //最终移动多少
        var that = this

        function inertiaMove() {
          that.scrollTop = document.body.scrollTop
          var nowTime = new Date().getTime();
          var t = nowTime - startTime;
          var nowV = v - t * deceleration;
          // 速度方向变化表示速度达到0了
          if (dir * nowV < 0 || t > 500) {
            return;
          }
          var moveY = (v + nowV) / 2 * t;
          var content = (contentY - moveY);

          document.body.scrollTop = content
          if (document.body.scrollTop == that.scrollTop) {
            return
          }
          setTimeout(inertiaMove, 10);
        }

        inertiaMove()
      }
      ,
      ...mapMutations([
        rootTypes.SET_HEADER]),
      //设置头部
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
      }
    }
    ,

    watch: {
      $route()
      {
        this.loadAnimate()
        this.startCode = this.$route.params.code
        this.showList = []
        this.$store.dispatch("changeClassifyIndex", 0)
        this.$store.commit('cjy/CHANGE_PAGE_POS_Y', 0)
        if (!this.classifyList) {
          this.$store.dispatch("getClassifyList", this.startCode)
        }
//        window.location.reload();
      }
      ,
      activeIndex(newData, oldData)
      {
        if (newData - oldData > 0) {
          this.className = "goleft"
        } else {
          this.className = "goright"
        }
        this.floatNum = 30
//        document.body.scrollTop = 0
        this.pageNum = 1
      }
      ,
      //监听config的数据变化并重新申请数据
      queryConfig()
      {
        this.getShowList()
      }
      ,
      newList(newData)
      {
        this.showList = this.showList.concat(newData)
      }
    },

//    updated () {
//      this.$nextTick((item) => {
//        this.$refs.translateGroup.refresh()
//      })
//    }
  }
</script>

<style scoped>

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
