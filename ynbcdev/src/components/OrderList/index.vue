<template>
  <div>
    <ul class="aui-list aui-media-list commodity_list subtotal_list aui-margin-b-15">
      <li class="aui-list-item ">
        <div class="aui-list-item-inner">
          <div class="aui-list-item-text" style="flex-wrap:wrap;">
            <span class="aui-list-item-title ">订单编号：{{orderListInfor.orderNo}}</span>
            <span class="aui-list-item-text">{{changeTime(orderListInfor.createTime)}}</span>
            <span v-if="applyTm&&serviceNo" class="aui-list-item-title">售后编号：{{serviceNo}}</span>
            <span v-if="applyTm&&serviceNo" class="aui-list-item-text">{{changeTime(applyTm)}}</span>

          </div>
        </div>
      </li>

      <order-list-item  :orderInfor="orderInfor" :orderItermInfor="item" v-for="item in orderListInfor.orderDetails">

      </order-list-item>
    </ul>
  </div>
</template>

<script>
  import OrderListItem from './OrderListItem'
  import changeTime from "../../utils/translateDate"

  export default {
    data () {
      return {
        orderInfor:{}
      }
    },
    props: {
      orderListInfor: {
        stype: Object,
        default: () => {
          return {
            orderNo: "000000000000",
            createTime: "yy.MM.dd hh:mm",
            orderDetails: [],

          }
        }
      }
    },
    components: {
      OrderListItem
    },
    created () {
      var logisticsStatus = this.orderListInfor.logisticsStatus
      this.orderInfor = {
        orderNo: this.orderListInfor.orderNo,
        createTime: this.orderListInfor.createTime,
        logisticsStatus:logisticsStatus || logisticsStatus == 0 ? logisticsStatus: "",
        freight:this.orderListInfor.freight || 0
      }

    },
    methods: {
      changeTime
    },
    computed: {
      applyTm () {
        return this.orderListInfor.orderDetails[0]?this.orderListInfor.orderDetails[0].applyTm:""
      },
      serviceNo () {
        return this.orderListInfor.orderDetails[0].serviceNo
      }

    },
    mounted () {
    }
  }
</script>

<style scoped>

  @media screen and (max-width: 322px) {

    .aui-list-item-text, .aui-list-item-title{
      font-size: 13px!important;
    }


  }

</style>
