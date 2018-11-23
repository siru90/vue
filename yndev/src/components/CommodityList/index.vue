<template>
  <li v-if="detailInfor" class="cjy-opacity " :class="{'cjy-appear':isShow}" ref="listItem">
    <div class="aui-list-item" style="position: relative;" >
      <div class="aui-media-list-item-inner">
        <div class="aui-list-item-media" style="overflow: hidden ;padding: 0;margin-top:0.5rem " @click="goWhere()">
          <img src="static/image/demo1.png" v-lazy="detailInfor.mainPic">
        </div>
        <div class="suggest yn_title">
          <h3 @click="goWhere()" >{{detailInfor.goodsName && detailInfor.goodsName}}</h3>
          <p @click="goWhere()">{{detailInfor.goodsModel ? "型号:" + detailInfor.goodsModel : "&nbsp;"}}
          </p>
          <p class="sale_price"  @click="goWhere()">
            <span>¥<em>{{detailInfor.goodsPrice ? parseFloat(detailInfor.goodsPrice).toFixed(2) : "0"}}</em></span>
            <del>{{detailInfor.normalPrice ? "￥" + parseFloat(detailInfor.normalPrice).toFixed(2) : "0"}}</del>
          </p>
        </div>
        <cart-num :gwGoodsItem="detailInfor" :goodsId="parseInt(detailInfor.goodsId)"
                  style=" transform: translate(-1rem,-0.3rem)">

        </cart-num>
      </div>
    </div>
  </li>
</template>

<script>
  import cartNum from '../CartIconToADD'

  export default {
    data () {
      return {}
    },
    watch: {
      detailInfor(newData){
      },
    },
    methods: {
      goWhere () {
        var code = this.detailInfor.goodsCode
        this.$router.push("/detail/" + code)
      }
    },
    props: {
      detailInfor: {
        type: Object,
        default: {
          goodsCode: "goodscode",
          goodsId: "goodsid",
          goodsName: "goodsname",
          goodsPrice: "wsprice",
          goodsUnit: "goodsunit",
          city: "prodarea",
          shopName: "enterprisename",
          saleqty: "saleqty",
          goodsModel: "goodsmodel",
          goodsType: 0,
          normalPrice: "1.00",
          lable: null,
          mainPic: null
        }
        ,
        floatNum: {
          type: Number,
          default: 30
        }
      },
      pagePosY: {
        type: Number,
        default: 0
      },
      pageHeight: {
        type: Number,
        default: 0
      },
      closeOpacity: {
        type: Boolean,
        defalut: false
      }
    },

    computed: {
      height () {
        var listItem = this.$refs.listItem
        if (listItem) {
          var height = listItem.offsetTop
          return height
        }
        return 0

      },
      isShow () {
        if (this.closeOpacity) {
          return true
        }
        var height = 0
        var listItem = this.$refs.listItem
        if (this.$refs.listItem) {
          height = listItem.offsetTop
        }
        var pagePosY = this.pagePosY
        var pageHeight = this.pageHeight
        var isShow = height + 100 > pagePosY && pagePosY > height - pageHeight + 200
//        console.log('pagePosY', pagePosY, 'pageHeight', pageHeight, 'height', height,'isShow',isShow)

        return isShow
      }
    },
    components: {cartNum},
    created () {
    }

  }
</script>

<style scoped>
  .cjy-opacity {
    transition: opacity 2s;
    opacity: 0.2;
  }

  .cjy-appear {
    transition: opacity 2s;
    opacity: 1;
  }
</style>
