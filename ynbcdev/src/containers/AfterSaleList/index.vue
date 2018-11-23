<template>
  <div class="vue_app" style="position: absolute;width: 100%;height: 100%;padding-top:5.4rem;overflow: hidden ">
    <header class="aui-bar aui-bar-nav aui-bar-light " style="position: absolute; top: 0">
      <div>
        <div class="go-back" @click="$router.go(-1)">
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div class="aui-title">{{titleInfor[activeIndex].goodsClassName}}</div>
        <div v-if="false" class="right_icon" @click="search = !search;">
          <a id="order-search" class="search_icon"><i class="icon njfont nj-sousuo"></i></a>
        </div>
      </div>
      <div class="iscroll_list classify_tab second_level" ref="outerEle" style="height: 2.3rem;position: relative">
        <tab-head :titleInfor="titleInfor">
        </tab-head>
      </div>
    </header>

    <div style="width: 100%;height:100%;">

      <!--搜索相关内容展示-->
      <div v-if="false" style="border-bottom: 1px solid rgb(234, 234, 234);" @click="search = !search;">
        <div v-if="fromDate || toDate" class="cjy-searchBar">
          查找日期：
          <span v-if="fromDate"
                style="color:rgb(15, 141, 224);">{{changeTime(fromDate)}} {{ toDate ? "-" : "至今"}}</span>
          <span v-if="toDate" style="color:rgb(15, 141, 224);">{{fromDate ? "" : "至"}}{{changeTime(toDate)}}</span>

        </div>
        <div v-if="keyword" class="cjy-searchBar">
          查找关键词：
          <span style="color:rgb(15, 141, 224);">{{keyword}}</span>
        </div>
      </div>
      <!--搜索相关内容展示 end-->

      <after-sale-list-page v-if="selectData" :lengths="titleInfor.length" :orderInfor="selectData">
      </after-sale-list-page>

      <!--刷新按键-->
      <div v-else-if="isRefresh " class="no_data" style=" width: 100%;height: 50%;padding-top: 5rem">
        <div class="back_home aui-btn aui-btn-outlined" @click.stop="pageRefresh">刷新页面</div>
      </div>
      <!--预约单查询 end-->
    </div>
    <div class="cjy-mask_bj" :style="search ? 'display:block' : 'display:none'" @click="search=false"></div>

    <!--时间picker-->
    <div v-if="false" class="ordersearch_con" :style="search ? 'display:block' : 'display:none'">
      <ul class="aui-list aui-form-list from_con">
        <li>
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              开始时间：
            </div>
            <div class="aui-list-item-input">
              <!-- <input type="text" class="goodscode_input" v-model="startTime" @click="search_flag = true;$refs.pickerel.open();"> -->
              <Date-picker type="datetime" placeholder="选择日期和时间" style="width: 200px"
                           v-model="startTime"></Date-picker>
            </div>
          </div>
        </li>
        <li>
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              结束时间：
            </div>
            <div class="aui-list-item-input">
              <!-- <input type="text" class="goodscode_input" v-model="endTime" @click="search_flag = false;$refs.pickerel.open();"> -->
              <Date-picker type="datetime" placeholder="选择日期和时间" style="width: 200px"
                           v-model="endTime"></Date-picker>
            </div>
          </div>
        </li>
        <li>
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              工单编号：
            </div>
            <div class="aui-list-item-input">
              <input type="text" class="goodscode_input" v-model="searchNum">
            </div>
          </div>
        </li>
      </ul>
      <div class="aui-dialog-footer">
        <div class="aui-dialog-btn" tapmode="" button-index="0" @click="search = !search;">取消</div>
        <div class="aui-dialog-btn" tapmode="" button-index="1" @click="searchFn();search = false;">确定</div>
      </div>
    </div>
    <!--时间picker  end-->
  </div>
</template>

<script>
  import TabHead from "../../components/DiscountHead"
  import afterSaleListPage from "./afterSaleListPage.vue"
  import axios from "axios"
  import API from '../../utils/url-router'
  import * as rootTypes from "../../store/mutations-type";
  import {Toast} from '../../utils/toast2'
  import changeTime from "../../utils/translateDate"
  import {mapGetters, mapMutations} from "vuex";
  import {showLoading, hideLoading} from "../../utils/loading";
  import {getOrder, querySubmitedInfor} from "../../utils/getInforFun"
  var {goodsList, H5_HOST_URL, goodsListPage} = API()
  export default {
    data () {
      return {
        titleInfor: [
          {
            goodsClassId: 0,
            goodsClassName: "申请售后"
          },
          {
            goodsClassId: 1,
            goodsClassName: "申请记录"
          }
        ], //tapHead中分类的种类
        orderInfor: null,
        search: false,
        fromDate: "",
        toDate: "",
        keyword: null,
        isRefresh: false

      }
    },

    components: {
      TabHead,
      afterSaleListPage, //超值促销的页面结构
    },
    beforeCreate () {
      //修改index狀態
      var beforIndex = this.$route.query.activeIndex || 0
      if (beforIndex == 1) {
        this.$store.dispatch("changeClassifyIndex", 1)
      } else {
        this.$store.dispatch("changeClassifyIndex", 0)
      }

    },
    created () {
      var keyword = this.$route.query.orderSubNo || ""
      this.keyword = keyword
      this.init()

    },

    methods: {
      pageRefresh (){
        this.isRefresh = false
        this.init()
      },
      changeTime,// 日期转换
      async init () {
        this.animateLodding()
        this.initStateList()
        await this.getOrderInfor()
      },
      //创建状态查询表
      initStateList () {
        //根据状态值 获取状态名称
        var stateList = new Map(
          [
            [0, ""],
            [1, "已提交申请"],
            [2, "申请成功"],
            [3, "申请失败"],
            [4, "运营审批通过"],
            [5, "运营审批拒绝"],
            [6, "退货申请提交"],
            [7, "退货审核通过"],
            [8, "退货审核拒绝"],
            [9, "财务通过"],
            [10, "财务拒绝"],
            [11, "退款中"],
            [12, "退款成功"],
            [13, "退款中"],
            [14, "服务商审核通过"],//服务商审核通过
            [15, "服务商审核拒绝"],// 服务商审核拒绝
          ])
        this.stateList = stateList
      },
      //获取商品的可售后的列表
      async getOrderInfor () {
        this.queryAnAfterSaleInfor()
        this.querySubmitedInfor()
      },
      //整理可售后的列表信息
      async queryAnAfterSaleInfor () {
        var anAfterSaleInfor = []
        anAfterSaleInfor.push(this.quertDisSubmitInfor())
        this.anAfterSaleInfor = anAfterSaleInfor
      },

      //申请可售后的订单信息并保存
      async quertDisSubmitInfor() {
        var res = await getOrder(2, this.sessionId)
        if (res.returncode == 0) {
          Toast({
            message: res.errmsg,
            iconClass: "aui-iconfont aui-icon-close"
          })
          return
        }
        var data = res.data.sort((a, b) => {
          return b.createTime - a.createTime
        })

        this.orderInfor = data
      },

      //申请已售后的列表信息获取 "f9493bafb80e4729aab3c291fbf9bccf"
      async querySubmitedInfor (){
        var res = await querySubmitedInfor("", this.sessionId)
        if (res.returncode == 0) {
          Toast({
            message: res.errmsg,
            iconClass: "aui-iconfont aui-icon-close"
          })

          return
        }
        res = res.data
        res = res.filter((item) => {
          return item.serviceType != '3'
        })
        this.afterSaledInfor = this.afterSaleHistory(res)
      },

      //已申请售后数据数据格式转换
      afterSaleHistory(data) {
        var afterSaledInfors = []
        var data = data.sort((a, b) => {
          return b.applyTm - a.applyTm
        })
        for (var afterSaledInfor of data) {
          afterSaledInfor.serviceStateName = this.stateList.get(parseInt(afterSaledInfor.serviceState || 0))

          var retAfterSaledInfor = {
            orderDetails: [afterSaledInfor],
            orderNo: afterSaledInfor.orderNo || "00000000",
            createTime: afterSaledInfor.createTime || new Date().getTime(),
            logisticsStatus: this.logisticsStatus || 1,
          }

          afterSaledInfors.push(retAfterSaledInfor)
        }
        return afterSaledInfors
      },

      //加载动画
      animateLodding () {
        this.setTimeOut && clearTimeout(this.setTimeOut)
        showLoading()
        var that = this
        this.setTimeOut = setTimeout(() => {
          Toast({
            message: "加载超时",
            iconClass: "aui-iconfont aui-icon-close"
          })

          hideLoading()
//          setTimeout(() => {
//            that.$router.go(-1)
//          }, 1000)
          console.log('ok')
          this.isRefresh = true

        }, 5000)
      },
      clearnLoading () {
        var timeOut = this.setTimeOut
        hideLoading()
        clearTimeout(timeOut)
        console.log('+++++++++', timeOut)

      },
      //通过keywords 申请书
      selectByKeyWords (value) {
        var keyword = this.keyword //用于筛选的关键字
        return value.filter((item) => {  //通过关键字来筛选数据
          var isreturn = false   // 创建一个变量用于鉴定是否需要返回这项数据
          isreturn = isreturn || item.orderNo == keyword  //如果匹配到订单号

          var returnItem = item.orderDetails.filter((item) => {//查找子每条商品中是不是有对应匹配的属性
            var tag = new RegExp(keyword, "g")
            var istrue = tag.test((item).goodsName)
            istrue = istrue || (item.serviceNo && item.serviceNo == keyword)
            istrue = istrue || ((item.goodsModel) && tag.test((item).goodsName))
            return istrue
          })
          isreturn = isreturn || returnItem.length > 0
          return isreturn
        })
      }
    },
    watch: {},
    computed: {
      //获取当前所在页面的index
      activeIndex () {
        if (this.$store.state.jyModules.classifyIndex == 0) {
          this.keyword = ""
        }
        return this.$store.state.jyModules.classifyIndex
      },
      //获取sessionId
      sessionId () {
        return this.$store.state.xhModules.sessionId
      },
      //整理显示数据
      protoData () {
        var activeIndex = this.activeIndex
        var orderInfor = this.orderInfor
        var afterSaledInfor = this.afterSaledInfor
        if (activeIndex == 0) {
          orderInfor && this.clearnLoading()
          return orderInfor
        } else if (activeIndex == 1) {
          afterSaledInfor && this.clearnLoading()
          return afterSaledInfor
        }
        else {
          return null
        }


      },
      selectData  () {
        if (this.protoData) {
          var selectData = this.protoData
          selectData = this.keyword ? this.selectByKeyWords(selectData) : selectData
          return selectData
        }
        return null
      },
      showData (){
      }
    },
    beforeDestroy (){
      var setTimeOuts = this.setTimeOut
      hideLoading()
      clearTimeout(setTimeOuts)
    }
  }
</script>

<style>
  .cjy-bscroll-wrapper {
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    /*overflow: auto;*/
  }

  .cjy-searchBar {
    height: 2rem;
    line-height: 2rem;
    vertical-align: middle;
    padding-left: 0.7rem
  }

  .cjy-mask_bj {
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 500;
  }
</style>

