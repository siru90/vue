<template>
  <div class="vue_app" style="position: absolute;width: 100%">
    <!--头部-->
    <header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
      <div class="go-back" onClick="javascript:history.back(-1);">
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div class="aui-title">商品详情</div>
      <!--<div class="right_icon">
              <a class="shopping_cart"><i class="icon njfont nj-fenxiang1"></i></a>
          </div>分享暂时隐藏-->
    </header>
    <div v-if="commodityDetail">
      <div style="height:3rem;"></div>
      <!--头部-->
      <!--商品简介-->
      <div class="goods_detail">
        <!--轮换图片展示-->
        <div style="position: relative; width: 100% ;overflow: hidden;">
          <detail-swiper :banner="swiperImgList" v-if="swiperImgList">
          </detail-swiper>
          <img style="position: absolute;z-index:100;top: 0;width: 100%" :src="swiperImgList[0]"
               v-if="swiperImgList.length == 1"/>
        </div>
        <!--轮换图片展示end-->


        <div class="goods_title">
          <h2>
            {{commodityDetail.goodsname}}
          </h2>
          <p><span
            class="prices_text">¥
            <em>{{ goodsPrice}}
            </em>
          </span>&nbsp;
            <del>
              {{commodityDetail.discountprice ? "原价： ¥" + changePrice(commodityDetail.discountprice) : ""}}
            </del>
          </p>
          <div class="aui-row">
            <span
              class="aui-col-xs-4">运费：￥{{ !parseInt(commodityDetail.goodstype) && parseInt(commodityDetail.wsprice) < 299 ? freight : "0"}}</span>
            <span v-if="false" class="aui-col-xs-4">累计售出:63件</span>
            <span v-if="!parseInt(commodityDetail.goodstype)"
                  class="aui-col-xs-4">
                  <span v-if="commodityDetail.stockcount">库存{{commodityDetail.stockcount ? parseInt(commodityDetail.stockcount) : 0}}{{commodityDetail.goodsunit ? commodityDetail.goodsunit : "件"}}</span>
                  <span v-else>已售罄</span>
            </span>
            <span @click="arrivalReminder " style="color:#EA3939" v-if="!commodityDetail.stockcount">到货提醒</span>
          </div>
        </div>
        <div class="aui-content aui-margin-b-15">
          <ul class="aui-list aui-list-in">
            <li id="service_selection" class="aui-list-item"><!--@click="serviceBtn"-->
              <div class="service_selection">
                <!--<em></em>-->
                <span class="text_c_gray">已选</span>
                <dl>
                  <dt>
                    {{(detailsGoodsNum ? detailsGoodsNum : 0) + (commodityDetail.goodsunit ? commodityDetail.goodsunit : "件")}}
                  </dt>
                  <!--<p>增值服务</p>-->
                  <dd v-if="serviceArray ? searchById(serviceArray, 0): false">
                    <font>
                      <i class="icon njfont nj-zhuangpei"></i>
                      {{searchById(serviceArray, 0).name}}&nbsp;&nbsp;¥{{serviceArray ? searchById(serviceArray, 0).price : 0}}
                    </font>
                  </dd>

                  <dd v-if="serviceArray ? searchById(serviceArray, 1): false">
                    <font>
                      <i class="icon njfont nj-lingjian">
                      </i>{{searchById(serviceArray, 1).name}} &nbsp;&nbsp;¥{{serviceArray ? searchById(serviceArray, 1).price : 0}}
                    </font>
                  </dd>
                  <dd v-if="serviceArray ? searchById(serviceArray, 2): false">
                    <font>
                      <i class="icon njfont nj-weixiu">
                      </i>{{searchById(serviceArray, 2).name}} &nbsp;&nbsp;¥{{serviceArray ? searchById(serviceArray, 2).price : 0}}</font>
                  </dd>
                  <dd v-if="serviceArray ? searchById(serviceArray, 3): false">

                    <font>
                      <i class="icon njfont nj-baoyang">
                      </i>{{searchById(serviceArray, 3).name}} &nbsp;&nbsp;¥{{serviceArray ? searchById(serviceArray, 3).price : 0}}
                    </font>
                  </dd>
                </dl>
              </div>
            </li>
            <!--<li id="coupon_brought" class="aui-list-item">-->
            <!--<div class="aui-list-item-arrow discount_con">-->
            <!--<span class="text_c_gray">优惠&nbsp;&nbsp;</span>-->
            <!--<em>满100减5</em>-->
            <!--<em>满200减15</em>-->
            <!--<em>满500减50</em>-->
            <!--</div>-->
            <!--</li>-->
            <li v-if="false && !parseInt(commodityDetail.goodstype)" id="description" class="aui-list-item"
                @click="potdd">
              <div class="aui-list-item-arrow discount_con">
                <span class="text_c_gray">服务&nbsp;&nbsp;</span>
                <font><i class="icon njfont nj-gouxuan"></i>免费配送</font>
                <font><i class="icon njfont nj-gouxuan"></i>48小时退差价</font>
                <font><i class="icon njfont nj-gouxuan"></i>售后无忧</font>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--商品简介end-->
      <!--图文详情-->
      <div class="image_text">
        <h4>图文详情</h4>
        <div class="image_text_con">

          <img v-for=" (item ,index) in detailImgList" :key="item" :src="item" v-if="detailImgList"/>
        </div>
      </div>
      <!--图文详情end-->

      <!--购买数量-->
      <div style="height:4rem;"></div>
      <div class="purchased" style="overflow: visible;z-index: 200">

        <div class="server_icon">
          <shopping-cart style="left:0;margin-top: -0.2rem;position:relative;float: left;top:0"></shopping-cart>
          <!--<a class="shopping_cart"><i class="icon njfont nj-gouwuche"></i><div class="aui-badge">88</div></a>-->
          <div class="icon_line"></div>
          <!-- <a><i class="icon njfont nj-shoucang" :class="{'nj-yishoucang':collect}" @click="changeCollectStuta"></i></a> -->
        </div>
        <!--采购车按钮-->
        <add-btn v-if="goodsId" :pageType="'detail'" :goodsId="parseInt(goodsId)"
                 :gwGoodsItem="translateDetailData(commodityDetail)"></add-btn>
        <!--<div id="add_to_car" class="aui-btn aui-btn-danger aui-btn-sm">加入采购车</div>-->
        <div class="edit_data" style="display: none;">
          <span>购买数量：</span><i class="del_cart"></i><input type="number" value="1"></input><i class="add_to_cart"></i>
        </div>
      </div>
      <!--购买数量 end-->
      <!--服务选择-->

      <!--服务选择 end-->
      <!--服务介绍-->
      <transition name="outerFromBottom">
        <div class="translateOuter" v-show="popupVisible">
        </div>
      </transition>
      <transition name="jFromBottom">
        <div id="service_description" class="purchase_service" style="display: block;z-index: 999999"
             v-if="popupVisible">
          <div class="description_tit">
            服务说明
          </div>

          <ul class="description_list">
            <li>
              <font><i class="icon njfont nj-gouxuan"></i>免费配送</font>
              <p>所有订单免费配送</p>
            </li>
            <li>
              <font><i class="icon njfont nj-gouxuan"></i>48小时退差价</font>
              <p>低价保证，买贵退差价</p>
            </li>
            <li>
              <font><i class="icon njfont nj-gouxuan"></i>售后无忧</font>
              <p>享受“坏单包退”服务</p>
            </li>
          </ul>


          <div class="settle_accounts lijixiadan" style="position: absolute;">
            <div id="close_description" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click="potdd">关闭
            </div>
          </div>
        </div>
      </transition>


      <!--服务介绍 end-->
      <!--领取优惠券-->
      <div id="get_ticket" class="purchase_service">
        <div class="description_tit">
          领券更优惠
        </div>
        <ul class="coupon_list">
          <li>
            <div class="account_money">
              ¥<span>10</span>
            </div>
            <dl>
              <dt>航洋国际店新人10元券</dt>
              <dd>满100元使用</dd>
              <p>过期时间:2017-09-28&nbsp;&nbsp;09:01:22</p>
            </dl>
            <em>领取</em>
          </li>
          <li class="has_brought">
            <div class="account_money">
              ¥<span>10</span>
            </div>
            <dl>
              <dt>航洋国际店新人10元券</dt>
              <dd>满100元使用</dd>
              <p>过期时间:2017-09-28&nbsp;&nbsp;09:01:22</p>
            </dl>
            <em>已领</em>
          </li>
        </ul>
        <div class="settle_accounts lijixiadan">
          <div id="close_coupon" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm">关闭</div>
        </div>
      </div>
      <!--领取优惠券 end-->
    </div>
    <!-- <div v-else="">加载中</div> -->

    <!--展示服务-->
    <goods-service
      ref="goodsService"
      pageType="detail"
      v-if="goodsId" :pageType="'detail'" :goodsId="parseInt(goodsId)"
      :gwGoodsItem="translateDetailData(commodityDetail)">
    </goods-service>
  </div>
</template>

<script>
  import {Toast} from '../../utils/toast2'
  import {MessageBox} from 'mint-ui'
  import detailSwiper from "../../components/Swiper";
  import baseScroll from "../../components/BaseScroll"
  import API from "../../utils/url-router"
  import shoppingCart from "../../components/CartShowNum"
  import axios from "axios"
  import addBtn from "../../components/CartBtnToADD"
  import animBall from "../../components/AnimateBall"
  import {mapGetters, mapMutations} from "vuex";
  import {showLoading, hideLoading} from "../../utils/loading";
  import GoodsService from "../../components/GoodsService"
  import {translateDetailData} from "../../utils/translateDetailData"

  var {goodsList, queryCollect, insertCollect, deleteCollect} = API()

  export default {
    data () {
      return {
        //商品code
        goodsCode: null,
        //商品列表
        list: null,
        //商品的收藏状态
        collect: false,
        //商品的状态
        discountData: null,
        //商品详情
        commodityDetail: null,
        //商品Id
        goodsId: null,
        //服务介绍的开关按钮
        popupVisible: false

      }
    },
    components: {
      detailSwiper,
      baseScroll,
      shoppingCart,
      addBtn,
      GoodsService
    },
    created () {
      this.goodCode = this.$route.params.code
      this.loadAnimate()
    },
    mounted () {
      this.getDetailInfor()
      //  获取商品的详情信息
    },
    updated() {
    },
    methods: {
      // 获取时间
      getNowFormatDate() {  
          var date = new Date();  
          var seperator1 = "-";  
          var seperator2 = ":";  
          var month = date.getMonth() + 1;  
          
          var strDate = date.getDate();  
          if (month >= 1 && month <= 9) {  
              month = "0" + month;  
          }  
          if (strDate >= 0 && strDate <= 9) {  
              strDate = "0" + strDate;  
          }  
            
          var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate  
                  + " " + date.getHours() + seperator2 + date.getMinutes()  
                  + seperator2 + date.getSeconds();  
          return currentdate;  
      },
      // 到货提醒
      arrivalReminder() {
        var that = this
        
        if (!this.sessionId) {
          MessageBox.alert('请登录后再操作', '操作失败').then(
            () => {
              console.log({path: "login", query: "/detail/" + that.goodCode})

              this.$router.push({path: "/login", query: {"page": "/detail/" + this.goodCode}})
            }
          )
          return
        }
        
        const arrivalReminderData = {
          goodscode: this.commodityDetail.goodscode,
          goodsname: this.commodityDetail.goodsname,
          cellphone: this.userInfo.phone,
          inputtime: this.getNowFormatDate()
        }
        // 一个奇怪的接口
        axios({
          url: window.api.mall_storage_host + 'pubArrivalNotice/add',
          method: 'post',
          params: arrivalReminderData,
          headers:{
            sessionId: this.sessionId
          }
        }).then(res => {
          console.log(res)
          if (res.data.returnCode === 0) {
                Toast({
                    duration: 1000,
                    message: "提交失败",
                    iconClass: "aui-iconfont aui-icon-close"
                });
                return
          }
          Toast({
                duration: 1000,
                message: "请求已提交",
                iconClass: "aui-iconfont aui-icon-correct"
            });
        }).catch(e => {
          Toast({
                duration: 1000,
                message: "提交失败",
                iconClass: "aui-iconfont aui-icon-close"
            });
        })

        //alert("到货提醒")
      },
      loadAnimate() {
        showLoading()
        setTimeout(() => {
          hideLoading()
          this.noData = true
        }, 5000)
      },
      translateDetailData,//适用于数据转化
      serviceBtn() {
        this.$refs.goodsService.showService();
      },
      searchById(data, id){
        return data.find((item) => {
          return parseInt(item.type) == parseInt(id)
        })
      },
      //操作服务按钮

      potdd() {
        this.popupVisible = !this.popupVisible
      },
      //转化为2为小数
      changePrice (data) {
        return parseFloat(data).toFixed(2)
      },
      //转化传入的格式
      changeCollectStuta () {
        var that = this
        console.log(that.goodCode)
        if (!this.sessionId) {
          MessageBox.alert('请登录后再收藏', '操作失败').then(
            () => {
              console.log({path: "login", query: "/detail/" + that.goodCode})

              this.$router.push({path: "/login", query: {"page": "/detail/" + this.goodCode}})
            }
          )
          return
        }

        this.collect = !this.collect
        if (this.collect) {
          axios({
            headers: {"sessionId": that.sessionId},
            url: insertCollect,
            method: "post",
            data: {"goodsId": that.goodsId},
          }).then(() => {
            Toast({
              message: "收藏成功",
              iconClass: 'aui-iconfont aui-icon-correct'
            });
          })
        } else {
          axios({
            url: deleteCollect,
            headers: {"sessionId": that.sessionId},
            method: "post",
            data: {"goodsId": that.goodsId},
          }).then(() => {
            Toast({
              message: "移除成功",
              iconClass: 'aui-iconfont aui-icon-correct'
            });
          })
        }

      },
      //获取详情信息
      getDetailInfor () {
        var that = this
        const options = {
          url: goodsList + "goodscode=" + this.goodCode + "&token=" + new Date().getTime(),
          method: 'get',
          headers: {
              sessionId: window.localStorage.getItem('sessionId')
          }
        }
        axios(options).then((data) => {
          //将详情信息添加到变量中
          var res = data.data
          if (res.returnCode == 0 || res.data.length == 0) {
            MessageBox.alert('您查看的商品已经沉入大海', '操作失败').then(
              () => {
                this.$router.push({path: "/main/classify"})
              }
            )
            return
          }
          this.commodityDetail = res.data[0]
          hideLoading()
          //  查找商品id并保存
          this.goodsId = this.commodityDetail.goodsid

        }).then(() => {
            // 判定是否登录
            if (this.sessionId) {
              //  如果登录那么就查询是否收藏
              axios({
                  url: queryCollect,
                  method: "post",
                  headers: {"sessionId": that.sessionId},
                  data: {}
                }
              )
                .then(
                  (data) => {
                    //  比对申请回来的数据
                    var data = data.data
                    if (data.returncode == 0) {
                      return
                    }
                    if (!data.data[0]) {
                      var isInit = false
                    } else {
                      var isInit = data.data[0].find((item) => {
                        return item.goodsid == this.goodsId
                      })
                    }
                    if (isInit) {
                      that.collect = true
                    } else {
                      that.collect = false
                    }
                  }
                )
            }
          }
        )
      }
    },
    watch: {
      detailsGoodsNum () {
      }
    },
    computed: {
      freight() {
        return window.api.freight;
      },
      goodsPrice () {
        var goodsWsprice = this.commodityDetail.wsprice ? parseFloat(this.commodityDetail.wsprice).toFixed(2) : 0
        return goodsWsprice
      },
      //获取轮播路数据
      swiperImgList () {
        var commodityDetail = this.commodityDetail
        console.log(commodityDetail, '>>>>>>>>>>>>.')
        if (commodityDetail) {
          var urlListArray = commodityDetail.urllist.filter((item) => {
            return parseInt(item.Imgurltype) == 0 || parseInt(item.imgurltype) == 0

          })
          if (urlListArray.length > 0) {
            var imgList = urlListArray.map((item) => {
              return item.imgurl
            })
            console.log('ffffffff', imgList)
            return imgList
          }
        }
        return ["static/image/demo1.png"]
      },
      //获取详情图片
      detailImgList()
      {
        var commodityDetail = this.commodityDetail
        console.log('imageType更新代码')
        if (commodityDetail) {
          var urlListArray = commodityDetail.urllist.filter((item) => {
            return parseInt(item.Imgurltype) == 2 || parseInt(item.imgurltype) == 2
          })
          if (urlListArray.length > 0) {
            var imgList = urlListArray.map((item) => {
              return item.imgurl
            })
            return imgList
          }
        }
        return ["static/image/demo1.png"]
      },
      //获取详情登陆id
      sessionId(){
        var sessionId = this.$store.state.xhModules.sessionId ? this.$store.state.xhModules.sessionId : ''
        return sessionId
      },
      //郭伟的模块
      ...mapGetters("gwModules", [
        "detailsGoodsNum",
        "serviceArray"
      ]),
      ...mapGetters("xhModules", [
          "userInfo",
      ]),

    },
  }
</script>

<style>
  .swiper-pagination-bullet {
    margin: 0 0.15rem;
  }
</style>
<style scoped>


  .jFromBottom-enter-active, .jFromBottom-leave-active {
    transition: 0.2s;
  }

  .jFromBottom-leave-to, .jFromBottom-enter {
    -webkit-transform: translatey(100%);
    -moz-transform: translatey(100%);
    -ms-transform: translatey(100%);
    -o-transform: translatey(100%);
    transform: translatey(100%);
    opacity: 1;
  }

  .outerFromBottom-enter-active, .outerFromBottom-leave-active {
    transition: 0.2s;
  }

  .outerFromBottom-leave-to, .outerFromBottom-enter {
    background: rgba(0, 0, 0, 0);
    opacity: 0;
  }

  .translateOuter {
    position: fixed;
    top: 0;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100rem
  }
</style>
