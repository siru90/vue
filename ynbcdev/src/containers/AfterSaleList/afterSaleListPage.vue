<template>

  <div class="aftrer-sale-list-page" style="width:100%; height: 100%;position:relative; overflow: scroll" ref="scrollOuter">
    <translate-group :lengths="lengths">
      <div v-for="(classify, index) in lengths"
           v-if="index == activeIndex"
           :key="classify"
           style="position: absolute;width: 100% ;min-height:100%;padding-bottom: 0;"
           ref="listOuter">
        <!--订单列表-->
        <div class="aui-content aui-margin-b-15" style="">
          <order-list-item v-if="index < pageSize*pageNum" :orderListInfor="item"
                           v-for="(item, index) in orderInfor"></order-list-item>

        </div>
        <!--订单列表 end-->

        <div v-if="orderInfor.length <= 0" class="centent">
          <div class="no_data">
            <img src="static/image/no_data.png">
            <p>暂无相关数据</p>
          </div>
        </div>
        <div v-else-if=" pageSize*pageNum > orderInfor.length "
             style="color:#0f8de0 ;height:2rem!important;  width: 100%;text-align: center; line-height: 2rem;vertical-align: middle; background: white">
          没有更多内容
        </div>
        <div v-else
             style="color:#0f8de0 ;height:2rem!important;  width: 100%;text-align: center; line-height: 2rem;vertical-align: middle; background: white"
             @click="loadMore">
          点击加载更多
        </div>
      <page-foot></page-foot>
      </div>

    </translate-group>
    <button-to-top v-if="elements" :elements="elements"></button-to-top>
  </div>

</template>

<script>
  import OrderListItem from "../../components/OrderList"
  import TranslateGroup from "../../components/TranslateGroup"
  import DiscountList from "../../components/DiscountList"
  import ButtonToTop from "../../components/ButtonToTop"

  import queryClassBanner from "../../utils/queryClassBanner"
  import PageFoot from "../../components/PageFoot"
  import axios from "axios"
  import {showLoading, hideLoading} from "../../utils/loading";
  import {translateDetailData} from "../../utils/translateDetailData"
  export default {
    data () {
      return {
        pageSize: 20,
        pageNum: 1,
        elements: null
      }
    },
    components: {
      OrderListItem,//优惠商品展示组件
      TranslateGroup, //左右滑动组件
      PageFoot,
      ButtonToTop
    },
    props: {
      //传递分类名称的参数
      lengths: {
        type: Number,
        default: 2,
      },
      discountList: {
        type: Array,
        default: () => {
          return [{
            isReceived: false,
            allPrice: parseInt(100),
            offPrice: parseInt(6)
          },
            {
              isReceived: false,
              allPrice: parseInt(100),
              offPrice: parseInt(5)
            }
          ]
        }
      },
      orderInfor: {
        type: Array,
        default: () => {

          return [{
            createTime: 1504762012423,
            orderNo: "1326620124242203",
            orderDetails: [{
              facilitatorCode: null,
              facilitatorId: null,
              goodsCode: "0021234",
              goodsId: 116174,
              goodsImg: "static/image/classify/1.png",
              goodsModel: "TCL3.0",
              goodsName: "终端商品",
              goodsNum: 1,
              goodsPrice: 0.01,
              goodsSpec: "台",
              goodsType: 0,
              goodsUnit: "台",
              hasService: 1,
              isScore: 0,
              orderNo: "1326620124242203",
              orderServeList: null,
              rid: 2501,
              status: 0,
              totalValue: 0.01
            }]
          }]
        }
      }
    },
    methods: {
      loadMore () {
        this.pageNum++
      },
    },
    watch: {
      activeIndex () {
        this.pageNum = 1
      }
    },
    computed: {
      //冲vuex获取当前的页面index
      activeIndex () {
        return this.$store.state.jyModules.classifyIndex
      },
      showOrder(){
        return this.orderInfor
      }
    },
    mounted () {
      this.elements = this.$refs.scrollOuter
      this.$refs.scrollOuter.addEventListener("scroll" , () => {
      })
    },
  }
</script>

<style>
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

  .coupon_collection {
    width: auto;
    height: 3.8rem;
  }
</style>
