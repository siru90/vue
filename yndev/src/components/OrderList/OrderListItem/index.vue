<template>
  <li class="aui-list-item">
    <div class="aui-list-item" style="padding: 0">
      <div class="aui-media-list-item-inner">
        <div class="aui-list-item-media">
          <img src="static/image.demo1.png" v-lazy="orderItermInfor.goodsImg||'static/image/demo1.png'">
        </div>
        <div class="aui-list-item-inner suggest">
          <h3>{{orderItermInfor.goodsName || " "}}</h3>
          <p>{{orderItermInfor.goodsModel ? '型号：' + orderItermInfor.goodsModel : "&nbsp;"}}</p>
          <p>{{'数量：' + goodsNum}}</p>
        </div>
      </div>
    </div>
    <div class="aui-list-item">
      <div class="aui-list-item-inner">
        <div class="aui-list-item-text">
          <div class="aui-list-item-title">
            <span :style="{color: stateColor}" class="cjy-font-size">
              <!--{{orderItermInfor.serviceState == 13 ? '退款中' : "&nbsp;"}}-->
               {{orderItermInfor.serviceState ? orderItermInfor.serviceStateName : "&nbsp;"}}
            </span>
          </div>


          <div class="edit_address" style="margin-bottom:0;border-bottom:0;padding:0">

            <div v-if="serviceState == 4 && orderItermInfor.serviceType == 2 "
                 class="aui-btn aui-btn-outlined aui-btn-danger" @click="goToUpdateMassage">
              上传退货信息
            </div>

            <div v-if="orderType == 0" class="aui-btn aui-btn-outlined aui-btn-danger" @click="goToAfterSale">
              申请售后
            </div>

            <div v-if="orderType == 1" id="return_details" class="aui-btn aui-btn-outlined aui-list-item-title"
                 @click="goToDetail">
              查看详情
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>

</template>

<script>

  export default {
    data () {
      return {}
    },
    beforeCreate () {
      this.orderSubNo = this.$route.query.orderSubNo || ""
    },

    methods: {
      //上传退货信息
      goToUpdateMassage () {
        this.$router.replace({path: "/postLogisticsInfo", query: this.upDataInfor})
      },
      //去到详情页面
      goToDetail () {
        this.$router.replace({path: "/main/afterSaleDetail", query: this.routerInfor})
      },
      //去到退货界面
      goToAfterSale () {
        this.$router.replace({path: "/main/afterSale", query: this.routerInfor})
      }
    },
    computed: {
      //订单类型
      orderType (){
        return this.$store.state.jyModules.classifyIndex
      },
      //售后详情传递信息
      routerInfor (){
        console.log(this.orderItermInfor)
        var routerInfor = Object.assign(this.orderItermInfor, this.orderInfor)
        console.log(this.orderItermInfor)
        console.log(this.orderInfor)
        routerInfor.orderServeList = routerInfor.orderServeList ? JSON.stringify(routerInfor.orderServeList) : "";
        routerInfor.orderSubNo = this.orderSubNo
        for (var key in routerInfor) {
          routerInfor[key] = routerInfor[key] || routerInfor[key] == 0 ? routerInfor [key] : ""
        }

        return routerInfor
      },
      //上传退货信息
      upDataInfor () {
        var routerInfor = this.routerInfor
        var upDataInfor = {
          userPhone: routerInfor.userPhone || "",//电话号码
          orderNo: routerInfor.orderNo || "", // 订单编号
          serviceNo: routerInfor.serviceNo || "", // 售后单编号
          goodsId: routerInfor.goodsId || "", // 商品Id
          goodsName: routerInfor.goodsName || "", //商品名称
          goodsNum: routerInfor.goodsQuantity || "", //退货数量
          orderSubNo: this.orderSubNo
        }

        return upDataInfor
      },
      //售后状态
      serviceState () {
        var serviceState = this.orderItermInfor.serviceState || 0
        return serviceState
      },
      //文字显示的颜色
      stateColor () {
        var stateColorList = new Map([
          [0, "black"],
          [1, "#0f8de0"],//审核中
          [2, "#0f8de0"],//审核通过
          [3, "#e51c23"],//审核拒绝
          [4, "#0f8de0"],//待商家确认包裹
          [5, "#0f8de0"],//退货审核通过
          [6, "#e51c23"],//退货审核拒绝
          [7, "#0f8de0"],//待退款
          [8, "#e51c23"],//审核拒绝
          [9, "#0f8de0"],  //退款成功
          [10, "#0f8de0"],//退款失败请联系商家
          [11, "#0f8de0"],
          [12, "#0f8de0"],
          [13, "#0f8de0"],
          [14, "#0f8de0"],//服务商审核通过
          [15, "#e51c23"]// 服务商审核拒绝
        ])
        var serviceState = parseInt(this.serviceState)
        return stateColorList.get(serviceState) || "#0f8de0"

      },

      // 数量展示
      goodsNum () {
        var orderInfor = this.orderItermInfor
        return orderInfor.goodsQuantity || orderInfor.canAfterSaleNum || 1
      }
    }
    ,


    props: {
      orderInfor: {
        type: Object,
        default: () => {
          return {
            orderNo: "000000000000",
            createTime: "yy.MM.dd hh:mm",
          }
        }
      }
      ,
      orderItermInfor: {
        type: Object,
        default: () => {
          return {}
        }
      }

    }
  }
</script>

<style scoped>

  @media screen and (max-width: 322px) {
    .aui-btn {
      height: 1.4rem !important;
      line-height: 1.4rem;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      font-size: 10px !important;
    }

    .cjy-list-item-title {
      font-size: 18px !important;
    }

    .cjy-font-size {

      font-size: 12px !important;
    }
  }
</style>
