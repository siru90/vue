<template>
  <div @touchstart="checkTouchStart" @touchend="checkTouchEnd" style="height: 7.5rem;" v-if="goodsList" ref="mScroll">
    <banner style="width:100%; height: 100%; position:relative;" :bounce="true">
      <ul class="scroller_list cate_list"
          ref="cjyUl"
          style="height:9.5rem; padding: 0.75rem ;float: left;display:block;display: flex ;min-width: 100%;position: relative">

        <li :key="index" v-for="(val,index) in showList" style="height:100%;">
          <img src="static/image/demo1.png" v-lazy="val.mainPic" @click='jumpEvent(val)'/>
          <h3>{{val.goodsName ? val.goodsName : " "}}</h3>
          <p><span class="prices_text ">¥<em
            :style="{'font-size':priceFontSize}">{{val.goodsPrice ? parseFloat(val.goodsPrice).toFixed(2) : "&nbsp;"}}</em></span>
            <span
              v-if="val.goodsUnit " :style="{'font-size':priceFontSize}">/{{val.goodsUnit}}</span></p>
        </li>


        <li v-if="routerWay" style=" width: 1rem!important;height: 100%;">
        </li>

        <router-link v-if="routerWay" tag="li" :class="{'cjy-detail' :!isLowVersion}" class="cjy-more"
                     :to="routerWay">
          <div class="cjy-text-box"
               style="">
            <span class="cjy-text-center" style="color: white">套餐详情</span>
            <!--<i class="icon njfont nj-xianghou"></i>-->
          </div>
          <img v-if="false"
               src="static/image/slide.png"
               style="height: 100%;width: auto;margin: 0"/>
        </router-link>
      </ul>
    </banner>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex";
  import Banner from '@/components/BannerScroll'
  //  import  UpdataCart from '@/real-components/UpdateCart'
  import axios from  'axios'
  import API from '@/utils/url-router'
  import  {translateDetailData}from '@/utils/translateDetailData'
  var {goodsList} = API()
  export default {
    props: {
      goodsList: {
        type: Array,
        default: () => []
      },
      finalListtow: {
        type: Object,
        default: null
      },
      routerWay: {
        type: Object,
        default: null
      },
      scrollTop: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        top: 0,
        isLowVersion: false,
        priceFontSize: '',
        goodsData: [], //存储商品详情数据
        queryIdList: [],
      }
    },
    components: {
      Banner,
    },
    watch: {
      scrollTop  () {
        this.scrollOnChange()
      }
    },
    computed: {
      ...mapGetters('xxy', [
        "getscrollTop",
        "getstoptouch"
      ]),
      showList () {
        var goodsList = this.goodsData
        var showList = goodsList.map((item) => {
          return translateDetailData(item)
        })
        return showList
      },
    },
    methods: {
      jumpEvent(item) {
        setTimeout(() => {
          // 跳到商品详情
          this.$router.push({path: '/detail/' + (item.goodsCode || item.goodsNo)})
        }, 300);

      },
      checkTouchStart(e) {
        this.touchStartObj = {
          pageX: e.touches[0].pageX,
          pageY: e.touches[0].pageY
        }
      },
      checkTouchEnd(e) {
      },
      queryDateFromNet () {
        let ids = this.queryIdList.join(',')
        if (ids) {
          this.queryIdList = []
          axios.get(goodsList + "&goodscode=" + ids).then((res) => {
            let dataSource = res.data.data
            this.refreshGoodsData(dataSource)

          })
        } else {
          this.queryIdList = []
        }
      },

      //将数据做本地缓存
      saveLocal (data) {
        let goodsDataFromLocal = sessionStorage.getItem('homeGoodsData')
        goodsDataFromLocal = goodsDataFromLocal ? JSON.parse(goodsDataFromLocal) : []

        data.map((list) => {
          var findIndex = goodsDataFromLocal.findIndex((item) => {
            return list.goodscode === item.goodscode
          })
          if (findIndex !== -1) {
            goodsDataFromLocal.splice(findIndex, 1, list)
          } else {
            goodsDataFromLocal.push(list)
          }
        })
        sessionStorage.setItem('homeGoodsData', JSON.stringify(goodsDataFromLocal))
      },

      //更新数据渲染列表
      refreshGoodsData (data) {
        var goodsData = this.goodsData
        data.map((list) => {
          var index = goodsData.findIndex((item) => {
            return list.goodscode === item.goodscode
          })
          if (index !== -1) {
            goodsData.splice(index, 1, Object.assign(list, goodsData[index]))
          }
        })
        this.goodsData = goodsData
        this.saveLocal(goodsData)
      },
      // 从本地获取数据
      queryGoodsDataFromLocal () {
        var goodsList = this.goodsList
        var goodsDataFromLocal = sessionStorage.getItem('homeGoodsData')
        goodsDataFromLocal = goodsDataFromLocal ? JSON.parse(goodsDataFromLocal) : []
        var goodsDetailList = []
        var queryIdList = []
        goodsList.map((list, index) => {
          var canFind = goodsDataFromLocal.find((item) => {
            return list.goodsNo == item.goodscode &&  item.goodsid
          })
          if (canFind) {
            goodsDetailList.push(canFind)
          } else {
            goodsDetailList.push({
              goodscode: list.goodsNo,
              mainPic: list.image
            })
            queryIdList.push(list.goodsNo)
          }
        })
        this.queryIdList = queryIdList
        this.goodsData = goodsDetailList
      },

      scrollOnChange() {
        var cjyUl = this.$refs.cjyUl
        var top = cjyUl.getBoundingClientRect().top
        if (top < 1200) {
          this.queryDateFromNet()
        }
      },
    },
    created() {
      this.queryGoodsDataFromLocal()

    },
    mounted() {
      this.$nextTick(() => {
        this.scrollOnChange()
      })
    }
  }
</script>

<style>
  /*.see_more {*/
  /*width: 13vw !important;*/
  /*!*border-radius: 0 !important;*!*/
  /*!*	position: absolute;*!*/
  /*padding-left: 10px;*/
  /*margin-right: 0.5rem;*/
  /*}*/

  .scroller_list .see_more {
    height: 6rem;
    float: right !important;
    writing-mode: unset;
  }

  .scroller_list li {
    width: 5rem;
  }

  .scroller_list li img {
    height: 4.5rem;
    width: 4.5rem;
  }

  .cjy-more {
    height: 100% !important;
    width: 2rem !important;
    padding: 0 0 0 0;
    vertical-align: middle;
    text-align: center;
    position: absolute;
    right: 0;
  }

  .cjy-text-box {
    width: 1.2rem;
    height: 5rem;
    position: absolute;
    right: 0;
    top: 40%;
    transform: translatey(-50%);
    font-size: 0.7rem;
    line-height: 0.8rem;
    border-radius: 0.9rem 0 0 0.9rem;
    background: rgb(100, 100, 100);
    opacity: 0.5
  }

  .cjy-text-center {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 0.6rem;
    transform: translate(-50%, -50%);
  }

  .cjy-text-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }
</style>
