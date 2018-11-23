<template>

  <div style="width:100%;height:100%;position:relative">
    <translate-group :lengths="titleInfor.length" style="width: 100%;height:100%;">

      <div v-for="(classify, index) in titleInfor"
           v-if="index == activeIndex"
           :key="classify.goodsClassId"
           style="position: absolute;width: 100%; height:100%;" ref="Bscroll">

        <div style="width: 100%;">
          <!--分类广告-->
          <!-- <div class="extension" style="width:100%;">
            <img src="static/image/demo1.png"/>
            <em>共39件</em>
          </div> -->
          <!--分类广告 end-->
          <!--优惠券领取-->
          <banner tabClassName="coupon_collection">
            <ul id="scroller" class="scroller_list coupon_collectio" @touchend.stop>
              <discount-list :discountInfor="item" v-for="item in 10">
                <commodity-promotion></commodity-promotion>
              </discount-list>
            </ul>
          </banner>
          <!--优惠券领取 end-->
          <!--商品列表-->
          <div class="aui-content aui-margin-b-15">
            <ul class="aui-list aui-media-list promotion_list">
              <li is="CommodityPromotion" v-for="item in number+index*3"></li>
            </ul>
          </div>
          <!--商品列表 end-->
          <!--<page-foot></page-foot>-->
          <div v-if="isfalse">正在加载</div>

        </div>

        <!--<div>正在加载...</div>-->

      </div>
    </translate-group>
  </div>

</template>

<script>
  import Banner from "../../components/banner"
  import CommodityPromotion from "../../components/CommodityPromotion"
  import TranslateGroup from "../../components/TransitionPromotion"
  import PageFoot from "../../components/PageFoot"
  import DiscountList from "../../components/DiscountList"
  import queryClassBanner from "../../utils/queryClassBanner"
  import axios from "axios"
  import Bscroll from "better-scroll"
  import {showLoading, hideLoading} from "../../utils/loading";
  import {translateDetailData} from "../../utils/translateDetailData"
  export default {
    data () {
      return {
        isfalse: false,
        isloading: false
      }
    },

    components: {
      Banner,//优惠券左右滑动组件
      CommodityPromotion,//优惠商品展示组件
      TranslateGroup, //左右滑动组件
      DiscountList, // 优惠券展示组件
      PageFoot // 页脚
    },
    props: {
      //传递分类名称的参数
      titleInfor: {
        type: Array,
        default: [
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
        ]
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
      number: {
        type: Number,
        default: 5
      }
    },
    methods: {
      //加载更多数据
      loadingMoreDate () {

      },
      //创建Bscroll组件
      createdBanner () {
        var bScroll = this.$refs.Bscroll[0]
        this.Bscroll = new Bscroll(bScroll, {
          bounce: true,
          startY: 0,
          probeType: 2,
        })

        this.Bscroll.maxScrollY = -this.Bscroll.scrollerHeight + bScroll.offsetHeight

        this.Bscroll.on('touchend', (pos) => {
          var bScroll = this.$refs.Bscroll[0]
          // 下拉动作
          if (pos.y < this.Bscroll.maxScrollY + 30 && !this.isloading) {
            this.isfalse = true
            this.isloading = true
            this.Bscroll.scrollTo (0,-this.Bscroll.scrollerHeight + bScroll.offsetHeight - 20)
            setTimeout(() => {
              this.Bscroll.finishPullUp
              this.isloading = false
              this.$emit("loadNew")
              this.isfalse = false
            }, 2000)
          }
        })

        console.log(this.Bscroll)

      },
      // 刷新Bscroll组件
      BannerRefresh () {
        var bScroll = this.$refs.Bscroll[0]
        this.Bscroll.refresh()
        this.Bscroll.maxScrollY = -this.Bscroll.scrollerHeight + bScroll.offsetHeight
console.log("000000000000000",this.Bscroll)
      },
    },

    watch: {
      activeIndex () {
//        this.createdBanner()
        console.log("============", this.Bscroll)
        this.$nextTick( () => {
          this.Bscroll.destroy()
          this.createdBanner()
        })

      }
    },

    computed: {
      //冲vuex获取当前的页面index
      activeIndex () {
        return this.$store.state.jyModules.classifyIndex
      }
    },

    mounted () {
      this.$nextTick(() => {
        this.createdBanner()
      })

    },

    updated () {

      this.$nextTick(() => {
        if (this.Bscroll) {

          this.BannerRefresh()
        } else {
          this.createdBanner()
        }
      })
//      this.Bscroll.refresh()
    }
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
