<template>
  <div class="order_list_div" style="position: absolute;width: 100%">

    <!--头部-->
    <header class="aui-bar aui-bar-nav aui-bar-light">
      <router-link to="/main/profile">
        <div class="go-back">
          <i></i>
          <i></i>
          <i></i>
        </div>
      </router-link>
      <div class="aui-title">优惠券</div>
    </header>
    <div style="height:3rem;"></div>
    <!--订单tab滚动切换模块-->
    <div class="fixed_div iscroll_list classify_tab second_level" style="position: static;height: 2.4rem;">
      <!--<div class="aui-tab" id="tab">-->
      <!--<div class="aui-tab-item aui-active" @click="discu = true; dis = true;">全部</div>-->
      <!--<div class="aui-tab-item" @click="discu = false;dis = true;">未使用（{{req.length}}）</div>-->
      <!--<div class="aui-tab-item" @click="dis = false;discu = true">已过期（{{res.length}}）</div>-->
      <!--<div class="sideline"></div>-->
      <!--</div>-->
      <discount-head :titleInfor="tapHead"></discount-head>
    </div>

    <!--订单tab切换模块end-->
    <div class="centent">
      <!--商品列表-->
      <ul class="coupon_list" v-if="total.length != 0">
        <div v-show="dis">

          <li v-for="item in req" v-show="req.length != 0" @click="item.goodsid && turn(item.vouchertype,item.goodsid)">
            <div class="account_money">
              ¥<span>{{item.voucheramount}}</span>
            </div>
            <dl>
              <dt>{{item.vouchername}}</dt>
              <dd>满{{item.minuseamount}}元使用</dd>
              <p>过期时间:{{item.enddate}}</p>
              <p>{{item.servicename}}</p>
            </dl>
            <em>可用</em>
          </li>
          <div v-if="req.length == 0 && index != 0 && index != 2" class="font">
            <img src="static/image/no_data.png">
            <p>暂无数据</p>
            <div class="back_home aui-btn aui-btn-outlined" @click="$router.push('/main/home')">逛逛首页</div>
          </div>
        </div>
        <div v-show="disc">
          <li v-for="index in red" class="be_overdue" v-if=" red.length != 0">
            <div class="account_money">
              ¥<span>{{index.voucheramount}}</span>
            </div>
            <dl>
              <dt>{{index.vouchername}}</dt>
              <dd>满{{index.useamount}}元使用</dd>
              <p>过期时间:{{index.enddate}}</p>
            </dl>
            <em>已用</em>
          </li>
          <div v-if="red.length == 0 && index != 0 && index != 1" class="font no_data">
            <img src="static/image/no_data.png">
            <p>暂无数据</p>
            <div class="back_home aui-btn aui-btn-outlined" @click="$router.push('/main/home')">逛逛首页</div>
          </div>
        </div>
        <div v-show="discuss">
          <li v-for="index in ref" class="be_overdue" v-show="ref.length != 0">
            <div class="account_money">
              ¥<span>{{index.voucheramount}}</span>
            </div>
            <dl>
              <dt>{{index.vouchername}}</dt>
              <dd>满{{index.useamount}}元使用</dd>
              <p>过期时间:{{index.enddate}}</p>
            </dl>
            <em>已用</em>
          </li>
          <div v-if="ref.length == 0 && index != 0 && index != 2" class="font">
            <img src="static/image/no_data.png">
            <p>暂无数据</p>
            <div class="back_home aui-btn aui-btn-outlined" @click="$router.push('/main/home')">逛逛首页</div>
          </div>
        </div>
        <div v-show="discu">
          <li v-for="index in res" class="be_overdue" v-if=" res.length != 0">
            <div class="account_money">
              ¥<span>{{index.voucheramount}}</span>
            </div>
            <dl>
              <dt>{{index.vouchername}}</dt>
              <dd>满{{index.useamount}}元使用</dd>
              <p>过期时间:{{index.enddate}}</p>
            </dl>
            <em>已过期</em>
          </li>
          <div v-if="res.length == 0 && index != 0 && index != 1" class="font no_data">
            <img src="static/image/no_data.png">
            <p>暂无数据</p>
            <div class="back_home aui-btn aui-btn-outlined" @click="$router.push('/main/home')">逛逛首页</div>
          </div>
        </div>
      </ul>
      <div v-else class="font no_data">
        <img src="static/image/no_data.png">
        <p>暂无数据</p>
        <div class="back_home aui-btn aui-btn-outlined" @click="$router.push('/main/home')">逛逛首页</div>
      </div>


      <!--商品列表 end-->
    </div>
  </div>
</template>
<script>

  import {getDiscount_detail, getDiscount_other, getUserInfoAgain} from "../../config/getData.js"
  import {mapActions, mapGetters, mapMutations} from "vuex"
  import RepairHead from "../../repairHead"
  // import api from "../../../api/index.js"
  import DiscountHead from "../../DiscountHead"
  import {MessageBox} from 'mint-ui'
  //vouchertype
  //线上2
  //线下1
  //终端3
  //配件6

  export default {
    data() {
      return {
        data: null,
        req: '',
        res: '',
        ref: '',
        red: '',
        total: '',
        type: null,
        dis: true,//可用
        disc: true,//已锁定未使用
        discu: true,//已过期
        discuss: true,//已用
        index: null,
        tapHead: [{goodsClassName: "全部", code: 0}, {goodsClassName: "未使用", code: 1}, {
          goodsClassName: "已过期",
          code: 2
        }],
      }
    }
    ,
    components: {
      DiscountHead
    },
    async beforeMount() {
      // console.log('beforeounted');
      await this.getUserInfo();
      await this.initData();
      this.SET_HEADER({
        titlePart: {
          isHome: false,
          title: '优惠券'
        },
        hasSearch: false,
        handlePart: {
          type: '1',
          handleClick: () => {
          }
        }
      })
    }
    ,
    computed: {
      ...mapGetters('xhModules', [
        'userInfo'
      ]),
      activeIndex() {
        this.index = this.$store.state.jyModules.classifyIndex;
        return this.$store.state.jyModules.classifyIndex
      },
      isNoData () {
        if (this.dis) {
          return this.req && this.req.length ? false : true;
        }
        else if (this.discu) {
          return this.res && this.res.length ? false : true;
        }
        else if (this.discuss) {
          return this.ref && this.ref.length ? false : true;
        } else {
          return true
        }
      },
      sessionId () {
        return this.$store.state.xhModules.sessionId ? this.$store.state.xhModules.sessionId : ''

      }
    }
    ,
    methods: {
      ...mapActions('xhModules', [
        'getUserInfo'
      ])
      ,
      ...mapMutations([
        'SET_HEADER',
      ])
      ,
      ...mapMutations('xhModules', [
        'USER_INFO',
        'ClEAR_SESSIONID',
        'LOGO_OUT',
        'LOGO_IN',
        'CLEAR_INFO'
      ])
      ,
      async initData() {
        let response = await getUserInfoAgain(this.sessionId);
        if (response.returncode === 0) {

          this.LOGO_OUT(false);
          return
        }

        this.LOGO_IN(true);
        this.USER_INFO(response.data[0]);

        //优惠券使用明细

        // let discount_data_detail = {
        // 	url: api.mall_sale_host + 'couponManagement/getuservoucherlist?enterpriseid='+this.userInfo.enterpriseid+'&mobile='+this.userInfo.phone,
        // 	headers: {'Content-Type':'application/json', 'Accept' : 'application/json'}
        // }
        // let res = await getDiscount_detail(discount_data_detail);


        //优惠券剩余;getvouchermesslist
        let date = new Date().getTime();
        let discount_data_other = {

          url: window.api.mall_sale_host + 'couponManagement/getvouchermesslist?enterpriseid=' + window.api.enterpriseId + '&mobile=' + this.userInfo.phone + "&token=" + date,

          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        }
        let req = await getDiscount_other(discount_data_other);

        let reqData = [];//未使用
        let resData = [];//过期
        let refData = [];//使用
        let redData = [];//已锁
        let nowDate = new Date().getTime();
        for (let i of req) {
          if(i.remainamount > 0) {
            if(nowDate > Date.parse(i.enddate)) {
              resData.push(i);
            }

            if(nowDate <= Date.parse(i.enddate)) {
              if(i.billno) {
                redData.push(i);
              } else {
                reqData.push(i);
              }
           }
          }
          if (i.remainamount <= 0) {
            refData.push(i);
          }
        }
        this.req = reqData;//未使用
        this.res = resData;//过期
        this.ref = refData;//使用
        this.red = redData;//已锁
        this.total = [...this.req, ...this.res, ...this.ref, ...this.red];
      },
      init(){
        if (this.sessionId) {
          return
        }
        MessageBox.alert('请登录后再查看优惠券', '操作失败').then(
          () => {
            this.$router.push({path: "/login", query: {"page": "/main/discount"}})
          }
        )
      },
      turn(param, val) {
        if(param === 3) {
          this.$router.push('/searchresult?keyword=终端&from=phone&code=' + val)
        }
        if(param === 6) {
          this.$router.push('/searchresult?keyword=配件&from=phone&code=' + val)
        }
        if(param === 1) {
          return
        }
      }

    },
    watch: {
      total(newData){
        this.tapHead[0].goodsClassName = `全部(${newData ? newData.length : 0})`
      }
      ,
      req (newData) {
        this.tapHead[1].goodsClassName = `未使用(${newData ? newData.length : 0})`
      },
      res (newData) {
        this.tapHead[2].goodsClassName = `已过期(${newData ? newData.length : 0})`
      },
      activeIndex (newData) {
        switch (newData) {
          case  0:
            this.discu = true;
            this.dis = true;
            this.discuss = true;
            this.disc = true;
            break;
          case 1:
            this.discu = false;
            this.dis = true;
            this.disc = false;
            this.discuss = false;
            break;
          case 2:
            this.discu = true;
            this.dis = false;
            this.disc = false;
            this.discuss = false;
            break;
        }
      }
    },
    created() {
      this.$store.dispatch('changeClassifyIndex', 0)
    }
  }
</script>
<style scoped>
  .order_list_div {
    background: #f5f5f5;
  }

  .font {
    text-align: center;
  }
</style>
