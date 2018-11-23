<template>
  <div style="background:#8aa9e9">
      <div>
          <img src="static/image/actImage/topbanner.png" alt="">
      </div>
      <!-- <div class="big-title">
          <div class="sub-title">
              <span style="color:#920000">象谱商城</span>
              <span>100%正品配件</span>
              <span>配件优惠</span>
              <span>售后无忧</span>
          </div>
      </div>
      <div class="mid-part">

      </div> -->
      <!-- <ul class="actgoods-list">
          <li class="actgoods-item" v-for="(item, index) in goodsList" :key="index">
              <p class="act-goodsname">{{item.goodsName}}</p>
              <div class="act-goodsimg">
                  <div class="cut-price">
                      <p>直降</p>
                      <p>￥{{(item.goodsOrPrice - item.goodsActPrice).toFixed(2)}}</p>
                  </div>
                  <img v-lazy="item.goodsImgUrl" alt="">
              </div>
              <div class="act-goodsprice">
                  <div class="act-goodsorprice">
                        <s>{{item.goodsOrPrice}}</s>
                        <p>活动价</p>
                  </div>
                  <div class="act-goodsnowprice">
                      ￥{{Number(item.goodsActPrice).toFixed(2)}}
                  </div>
              </div>
              <div class="act-goods-handler">
                  <div @click="gotoGoodsDetail(item.goodsCode)" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm payEnable act-goods-btn">
                      立即购买
                  </div>
              </div>
          </li>
      </ul> -->
        <ul class="actgoods-list">
          <li @click="gotoGoodsDetail(item.goodsCode)" class="actgoods-item" v-for="(item, index) in goodsList" :key="index">
              <img v-lazy="item.goodsImgUrl" alt="">
          </li>
      </ul>
      <!-- <div class="act-goodsbottom">
          <div class="act-bottom-title">“ 新版上线，你来我减 ” 活动规则</div>
          <ul>
              <li>1.活动有效期：2018年7月26日~7月31日</li>
              <li>2.促销商品仅限本活动指定商品</li>
              <li>3.参与活动商品仅限于线上订单并在线支付的订单</li>
              <li>4.本活动只针对于普通消费用户</li>
              <li>5.活动商品具体价格以商品详情页为准</li>
          </ul>
      </div> -->
      <div>
          <img src="static/image/actImage/bottom.png" alt="">
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
    props: {
        goodsList: {
            type: Array,
            default: function() {
                return []
            }
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
            title: "新版上线你来我减"
          },
          hasSearch: false,
          handlePart: {
            type: '1',
            handleClick: () => {
            }
          }
        }
        this[rootTypes.SET_HEADER](options)
      },
      gotoGoodsDetail(goodsCode) {
          console.log(goodsCode)
          this.$router.push({path: "/detail/" + goodsCode})
      }

    },
    computed: {
    },
    created () {
      this.head()

    },
    mounted () {
      this.head()
      document.querySelector('body').id = "activePage"
    },
    beforeDestroy() {
      document.querySelector('body').id = ""
    },
  }
</script>

<style>
    #activePage .act-goodsbottom .act-bottom-title {
        font-size: 14px;
        margin-bottom: 0.1rem;
    }
    #activePage .act-goodsbottom li {
        line-height: 1rem;
    }
    #activePage .act-goodsbottom {
        background: #4468d8;
        color: #ffffff;
        padding: 0.5rem;
        font-size: 12px;
    }
    #activePage .act-goods-handler {
        height: 1.1rem;
        
        padding: 0 0.5rem;
    }
    #activePage .act-goods-handler .act-goods-btn{
        line-height: 1.1rem;
        height: 100%;
        font-size: 12px;
        background-color: #c41212 !important;
    }
    #activePage .act-goodsprice {
        width: 100%;
        height: 1.5rem;
        display: flex
    }
    #activePage .act-goodsnowprice {
        line-height: 1.5rem;
        font-size: 16px;
        color: #c41212;
        font-weight: 700;
    }
    #activePage .act-goodsprice .act-goodsorprice {
        height: 100%;
        line-height: 1;
        text-align: center;
    }
    #activePage .act-goodsprice .act-goodsorprice p,.act-goodsprice .act-goodsorprice s {
        font-size: 10px;
    }
    #activePage .act-goodsprice .act-goodsorprice p:nth-child(2) {
        color: #000000;
        font-weight: 700;
    }
    #activePage .actgoods-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    #activePage .actgoods-list .actgoods-item {
        width: 47%;
        background: #ffffff;
        margin-bottom: 0.5rem;
        /* padding: 0.5rem; */
        position: relative;
        height: 67vw;
    }
    #activePage .actgoods-list .actgoods-item img {
        width: 100%;
        height: 100%;
    }
    #activePage .cut-price {
        width: 2.7rem;
        height: 2.7rem;
        border-radius: 1.5rem;
        background: #c41212;
        text-align: center;
        line-height: initial;
        position: absolute;
        transform: scale(0.6);
        left: 0;
        top: 0;
    }
    #activePage .cut-price p:nth-child(1) {
        margin-top: 10px;
    }
    #activePage .cut-price p {
        font-size: 12px;
        color: #ffffff;
    }
    #activePage .act-goodsname {
        color: #000000;
        display: -webkit-box;    
        -webkit-box-orient: vertical;    
        -webkit-line-clamp: 2;    
        overflow: hidden; 
        line-height: initial;
        height: 37px;
        word-break: break-all;
    }
    #activePage .act-goodsimg {
        width: 100%;
        position: relative;
        height: 24vh;
    }
    #activePage .act-goodsimg img {
        width: 100%;
    }
    #activePage .mid-part {
        width: 100%;
        height: 3rem;
    }
    #activePage .sub-title {
        width: 90%;
        height: 24px;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0 0 2.4vw #ababab;
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translate(-50%,0);
        font-size: 12px;
        line-height: 24px;
        display: flex;
        justify-content: space-around;
        color: #333333;
        font-weight: 700;
    }
    #activePage .big-title {
        width: 100%;
        height: 100vw;
        background: green;
        position: relative;
    }
    #activePage #header-tt {
        height: 2.75rem !important;
        line-height: 2.75rem !important;
        
    }

   #activePage header .aui-title {
       width: 70% !important;
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
