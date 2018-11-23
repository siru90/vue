<template>
  <div class="cjy-app" style="height: 100%;position: absolute;width: 100%;overflow: visible"
       :style=" {'padding-top':from?'5.25rem' :'6.75rem'}">
    <!--头部-->
    <header v-if="from" class="aui-bar aui-bar-nav aui-bar-light">
      <div class="go-back" @click="$router.go(-1)">
        <i></i>
        <i></i>
        <i></i>
      </div>


      <div class="commodity_search search_result">

        <div class="aui-searchbar-input" @click=" $router.replace('/searchbar')">
          <i class="icon njfont nj-sousuo"></i>
          <input type="search" :placeholder="keyword" id="search-input">
          <div class="aui-searchbar-clear-btn">
            <i class="aui-iconfont aui-icon-close"></i>
          </div>
        </div>

      </div>

      <shopping-cart style="top:50%;transform:translate(0,-50%)"></shopping-cart>
    </header>
    <header v-else
            class="aui-bar aui-bar-nav aui-bar-light"
            style="height: 4.5rem">

      <div class=" search_result" style="top: 0">
        商品推荐
      </div>

      <div id="search" class="aui-searchbar searchbar"
           style="width: 100%;position:absolute;top: 2.25rem ;display: flex;padding:0.25rem 0.75rem ; background: #F4F4F4;border-top:1px solid rgb(234, 234, 234)">
        <div data-v-90c5bbea="" class="aui-searchbar-input aui-border-radius" style="width: 85%;">
          <i data-v-90c5bbea="" class="icon njfont nj-sousuo">
          </i>
          <input type="search"
                 placeholder="想买什么"
                 id="search-input"
                 autofocus="autofocus"
                 style="font-weight: normal"
                 v-model="newWord">
          <div data-v-90c5bbea="" style="display: block;" @click="claearWord" class="aui-searchbar-clear-btn"><i
            data-v-90c5bbea=""
            class="aui-iconfont aui-icon-close">

          </i>
          </div>
        </div>
        <div @click="searchShop"
             style="font-weight: 400; height: 1.6rem"
             class="aui-searchbar-btn aui-text-info animate-left">搜索
        </div>
      </div>
      <!--</div>-->

      <shopping-cart style="margin-top: 0.5rem;top: -0.3rem;"></shopping-cart>
    </header>
    <!--头部-->

    <!--排序-->
    <div class="search_tab" :style="{'top': from? '8vh' :  '4.5rem'}">
      <li class="aui-col-xs-4" :class="{'active' :activeOrder== 0}" @click="changeOrder(0)"><span>最新</span></li>
      <li class="aui-col-xs-4" :class="{'active' :activeOrder== 1}" v-show="orderPrice == 1" @click=" changeOrder(1)">
        <span>价格↑</span></li>
      <li class="aui-col-xs-4" :class="{'active' :activeOrder== 2}" v-show="orderPrice == 2" @click=" changeOrder(2)">
        <span>价格↓</span></li>
      <li class="aui-col-xs-4" :class="{'active' :activeOrder== 3}" v-show="orderSell == 3 " @click=" changeOrder(3)">
        <span>销量↑</span></li>
      <li class="aui-col-xs-4" :class="{'active' :activeOrder== 4}" v-show="orderSell == 4" @click=" changeOrder(4)">
        <span>销量↓</span></li>
    </div>
    <!--价格、销售可以顺倒序切换排序-->

    <!--商品列表-->
    <div style="width: 100%; height: 100%;position:absolute;top:0rem" ref="outer">
      <VerticalScroll @scrollBottom="changeFloat">
        <div class="aui-content aui-margin-b-15" style="position: relative; top:0;" list
             :style=" {'padding-top':from?'5.25rem' :'6.75rem'}">
          <ul class="aui-list aui-media-list wares_list" style="">
            <commodity-list v-if="showList &&showList.length>0"
                            v-for="item in showList"
                            :pagePosY="pagePosY"
                            :pageHeight="pageHeight"
                            :key="item.goodsid"
                            :detailInfor="translateDetailData(item)">

            </commodity-list>
          </ul>
          <div v-if="isShowLoadMore"
               style="color:#9a9a9a ;height:2rem!important;  width: 100%;text-align: center;  line-height: 2rem;vertical-align: middle ; background:white">
            <LoadMoreAnimate></LoadMoreAnimate>
            加载更多
          </div>
          <div v-if="totalPageCount == pageNum"
               style="color:#9a9a9a  ;height:2rem!important;  width: 100%;text-align: center; line-height: 2rem;vertical-align: middle; background: white">
            -主人到底了-
          </div>

          <!--版权信息-->
          <div v-if="totalPageCount == pageNum" class="copyright">
            <p>Copyright&copy;2016-2017 All Rights Reseved.</p>
            <p>象翌微链科技发展有限公司</p>
            <!-- <p>客服电话：4008-888-888</p> -->
          </div>
          <!--版权信息 end-->
        </div>
      </VerticalScroll>
    </div>
  </div>
</template>

<script>
  import API from '../../utils/url-router'
  import commodityList from "../../components/CommodityList"
  import shoppingCart from "../../components/CartShowNum"
  import axios from "axios"
  import {showLoading, hideLoading} from "../../utils/loading";
  import {translateDetailData} from "../../utils/translateDetailData"
  import LoadMoreAnimate from '../../components/LoadMoreAnimate'
  import VerticalScroll from '../../components/VerticalScroll'

  var {goodsList, queryGoodsPage, H5_HOST_URL, enterpriseId} = API()

  export default {
    data() {
      return {
        keyword: null,
        resultData: null,
        activeOrder: 0,
        orderPrice: 1,
        orderSell: 3,
        goodsId: '',
        pageNum: 1,
        pageSize: 5,
        totalPageCount: 0,
        resData: null,
        showList: [],
        newWord: '',
        from: '',
        isLoad:false,
        isShowLoadMore: false
      }
    },
    components: {
      commodityList,
      shoppingCart,
      VerticalScroll,
      LoadMoreAnimate
    },
    watch: {
      showList(data) {
      },
      newList(newData) {
        if (this.showList.length < this.pageNum * this.pageSize) {
          this.showList = this.showList.concat(newData)
        }
      },
      activeOrder() {
        var showData = this.showList
        if (showData && showData.length > 0) {
          switch (this.activeOrder) {
            case 0:
              showData.sort(function (a, b) {
                return b.goodsid - a.goodsid
              });
              break
            case 1:
              showData.sort(function (a, b) {
                return a.wsprice - b.wsprice
              });
              break
            case 2:
              showData.sort(function (a, b) {
                return b.wsprice - a.wsprice
              });
              break
            case 3:
              showData.sort(function (a, b) {
                var sell = a.sell ? "sell" : "wsprice"
                return b[sell] - a[sell]
              });
              break
            case 4:
              showData.sort(function (a, b) {
                var sell = a.sell ? "sell" : "wsprice"
                return a[sell] - b[sell]
              });
              break
            default:
              break;
          }
          this.showList = showData
        }
      }


    },
    computed: {
      pagePosY() {
        var list = this.$refs['list']
        var top = 0
        var post = this.$store.state.cjy.pagePosY
        if (list) {
          var top = list.offsetTop
        }
        return post - top
      },
      pageHeight() {
        var outerheight = this.$refs.outer
        if (outerheight) {
          return outerheight.offsetHeight
        }
        return 0
      },
      queryConfig() {
        var goodsId = this.goodsId
        var keyword = this.keyword
        var key = 'keyword'
        var value = keyword
        if (goodsId) {
          key = 'goodsid'
          value = goodsId
        }

        if (!keyword && !goodsId) {
          return null
        }

        var queryConfig = {
          url: queryGoodsPage,
          method: 'get',
          params: {
            start: 0,
            enterpriseid: enterpriseId,
            length: this.pageSize,
            isPage: true,
            pageNum: this.pageNum,
            [key]: value
          }
        }
        return queryConfig
      },

      //展示数据将返回数据 按照规则排序
      showData() {
        var showData = this.showList
        if (showData && showData.length > 0) {
          switch (this.activeOrder) {
            case 0:
              showData.sort(function (a, b) {
                return b.goodsid - a.goodsid
              });
              break
            case 1:
              showData.sort(function (a, b) {
                return a.wsprice - b.wsprice
              });
              break
            case 2:
              showData.sort(function (a, b) {
                return b.wsprice - a.wsprice
              });
              break
            case 3:
              showData.sort(function (a, b) {
                var sell = a.sell ? "sell" : "wsprice"
                return b[sell] - a[sell]
              });
              break
            case 4:
              showData.sort(function (a, b) {
                var sell = a.sell ? "sell" : "wsprice"
                return a[sell] - b[sell]
              });
              break
            default:
              break;
          }
          return showData
        } else {
          return null
        }
      },

      // 详情商品列表
      newList() {
        if (this.resData) {
          return this.resData.results
        } else {
          return []
        }
      }
    },

    methods: {
      searchShop() {
        this.keyword = this.newWord
        this.pageNum = 1
        this.showList = []
        this.queryDetail()

      },
      claearWord() {
        this.newWord = ''
      },
      //数据转化
      translateDetailData,
      //更改排序编码
      changeOrder(selfOrder) {
        if (this.activeOrder == selfOrder) {
          switch (selfOrder) {
            case 0:
              ;
              break;
            case 1:
              this.activeOrder = 2
              this.orderPrice = 2
              break;
            case 2:
              this.activeOrder = 1
              this.orderPrice = 1
              break;
            case 3:
              this.activeOrder = 4
              this.orderSell = 4
              break;
            case 4:
              this.activeOrder = 3
              this.orderSell = 3
              break;
            default:
              ;
              break;
          }
        } else {
          this.activeOrder = selfOrder
        }

      },
      //跳转到搜索页
      goToSearchBar() {
        this.$router.push("/searchBar")
      },
      loadAnimate() {
        showLoading()
        setTimeout(() => {
          hideLoading()
          this.noData = true
        }, 5000)
      },
      queryDetail() {
        var config = this.queryConfig
        console.log(config, '..............')
        if (!config) {
          return
        }

        this.loadAnimate()
        axios(config).then((res) => {
          res = res.data
          this.isLoad = true
          if (!res.returnCode) {
            return
          }
          var resData = res.data[0]
          console.log(resData, '------')
          this.totalPageCount = resData.totalPageCount
          hideLoading()
          this.isShowLoadMore = false
          this.resData = resData
        })


      },

      changeFloat() {
        console.log('ffffffffffffffffff', this.totalPageCount)

        if (this.totalPageCount <= this.pageNum) {
          return
        }
        this.pageNum++
        this.isShowLoadMore = true
        this.queryDetail()
      },

    },
    created() {
//      var keyword = this.$route.params.keyword
      var keyword = this.$route.query.keyword
      this.from = this.$route.query.from || ''
//      this.keyword = keyword.replace(/^keyword=/g, '')
      this.keyword = keyword
      this.newWord = this.keyword
      var code = this.$route.query.code
      this.goodsId = code
      this.queryDetail()

    }

  }
</script>

<style scoped>
  .aui-col-xs-4 {
    font-size: 0.7rem;
  }

  body {
    overflow: hidden;
  }
  /* 搜索页 */
  .search_result {
    top: 50%;
    transform: translate(0,-50%);
  }
</style>
