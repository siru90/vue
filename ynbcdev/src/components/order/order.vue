<template>
  <div class="order_list_div" style="position: absolute;width: 100% ;top:3rem;">

    <!--头部-->
    <header class="aui-bar aui-bar-nav aui-bar-light">
      <div @click="goback" style="width: 100%;height:2.75rem;position:relative">

          <div style="top:53%;transform: translate(0,-50%)" class="go-back">
            <i></i>
            <i></i>
            <i></i>
          </div>
   
        <div style="height:2.75rem;line-height:2.75rem;top:0" class="aui-title">{{number==0?"全部订单" : (number==1?"未付款订单" : (number==2?"待配送订单" :(number==3?"配送中订单" :(number==4?"已签收订单" :'' )))) }}</div>
      </div>
        
            
      <repair-head if="headList" :titleInfor="headList">
        
      </repair-head>
          <!-- <div class="aui-badge">3</div> -->
    </header>
    <div style="height:3.8rem; top: 7rem;position: fixed;width: 100%; z-index=999">
    </div>

    <div class="centent"  style="position:relative;margin-top: 2.17rem;">
      <!--商品列表-->
      <div class="aui-content">
        <transition-group :name="animateClassName">
          <ul class="aui-list aui-media-list commodity_list subtotal_list" v-for="(item, index) in data" :key="index">
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                  <div class="aui-list-item-text">
                    <div class="aui-list-item-title">订单编号：{{item.orderNo}}</div>
                    <div class="aui-list-item-right"><span class="aui-text-danger">{{orderStatus(item)}}</span></div>
                  </div>
                  <div class="aui-list-item-text">  
                    <div class="aui-list-item-text">
                      {{getTime(item.createTime)}}
                    </div>
                    <router-link id="aLink" :to="{ path: '/aftersale', query: { activeIndex: 1, orderSubNo: item.orderNo }}" v-show="item.status === 2 || item.status === 4">
                        {{item.status === 2 ? '部分退款' : (item.status === 4 ? '部分退货退款' : '')}}
                    </router-link>
                  </div>
                </div>
            </li>
          
            <li class="aui-list-item" :key="num" v-for="(son, num) in item.orderDetails">
            	<router-link :to="{ path: '/main/orderDetails', query: { shopId: item.parentOrderNo, orderStatus: number ,orderNo:item.orderNo, types:orderStatus(item),confirmTime:item.confirmTime,canInvoice:item.canInvoice,}}">
	              <div class="aui-media-list-item-inner">
	                <div class="aui-list-item-media">
	                  <img :src="son.goodsImg || 'static/image/demo1.png'">
	                </div>
	                <div class="aui-list-item-inner suggest">
	                  <h3>{{son.goodsName}}</h3>
	                  <p>型号： {{son.goodsModel||''}}</p>
	                  <p>单价：￥{{son.goodsPrice.toFixed(2) || ''}}{{son.goodsUnit?'/':''}}{{ son.goodsUnit || ''}}&nbsp;&nbsp;&nbsp;
	                    <!--<del>￥{{son.totalMinis || ''}}</del>-->
	                  </p>
	                </div>
	                <div class="subtotal">
	                  <span>￥{{son.goodsPrice.toFixed(2)}}</span>
	                  <p>x{{son.goodsNum || ''}}</p>
	                </div>
	              </div>
	            </router-link>  
            </li>
            <li class="aui-list-item">
              <div class="total_text">共{{add(item.orderDetails)}}件商品，共计：￥<span>{{item.realPay.toFixed(2)}}</span>(邮费：￥{{item.freight.toFixed(2)}})</div>
            </li>
            <li class="edit_address">
              <!--<div class="aui-btn aui-btn-outlined" v-show="item.payStatus === 0 && item.status !== 1" @click="lookUpBills(item.orderNo);">
                查看发票
              </div>-->
              <Bill-lookUp v-if="orderStatus(item) == '已签收' && item.hasInvoice == '1'" :hasInvoice="item.hasInvoice" :orderNo="item.orderNo" :ParentOrderNo="item.parentOrderNo" :creTime = "item.createTime" class=" aui-btn-outlined" style="border: 0;display: inline;"></Bill-lookUp>
              <!--<div class="aui-btn aui-btn-outlined" v-show="item.payStatus === 0 && item.status !== 1" @click="exploitBills(item.orderNo);">
                开票申请
              </div>-->
              <!--<span id="">
              	{{item.canInvoice}}
              </span>-->
              <Bill-apply  v-if="orderStatus(item) == '已签收' && item.hasInvoice == '0' && item.realPay.toFixed(2) != 0" :canInvoice="item.canInvoice"
              	:hasInvoice="item.hasInvoice" :orderNo="item.orderNo"  :ParentOrderNo="item.parentOrderNo" :configTime="item.confirmTime"
              	 class="aui-btn-outlined" style="border: 0;display: inline;">
              	 
              </Bill-apply>
              <div class="aui-btn aui-btn-outlined" v-show="item.payStatus === 0 && item.status !== 1" @click="cancelOrderAction(item.orderNo);">
                取消采购单
              </div>
              
              <!-- <router-link :to="{ path: '/main/orderRefoundDetails', query: this.refoundInfo}"> -->
                <!-- item.logisticsStatus === 2 -->
                <div class="aui-btn aui-btn-outlined" v-show="item.logisticsStatus === 2 &&  item.protocolType === 1" @click="turn(2,item)">
                  查看退押详情
                </div>
              <!-- </router-link> -->
              <!-- <router-link :to="{ path: '/main/orderRefound', query: this.refound}"> -->

                <div class="aui-btn aui-btn-outlined" v-show="item.logisticsStatus === 2 && item.protocolType === 1 && item.canRefundDeposit" @click="turn(1,item)">
                  退押金
                </div>
              <!-- </router-link> -->
              
              <router-link :to="{ path: '/main/orderDetails', query: { shopId: item.parentOrderNo, orderStatus: number ,orderNo:item.orderNo, types:orderStatus(item),confirmTime:item.confirmTime,canInvoice:item.canInvoice}}">
																								
                <div class="aui-btn aui-btn-outlined"
                     v-show="item.payStatus === 1 || item.payStatus === 2 || item.payStatus === 3 || item.logisticsStatus === 1 || item.status === 1">
                  查看订单
                </div>
              </router-link>
              <router-link :to="{name: isAndroid ? 'pay' : 'ios_pay',params:{money:item.realPay,orderNo:item.parentOrderNo}}">
                <div id="order_payment" class="aui-btn aui-btn-danger aui-btn-outlined" v-show="item.payStatus === 0 && item.status !== 1">马上支付
                </div>
              </router-link>
              <router-link :to="{name:'logistics',params:{imgurl: img(item.orderDetails),orderNo:item.orderNo}}">
                <div id="order_payment" class="aui-btn aui-btn-danger aui-btn-outlined" v-show="item.logisticsStatus === 1">查看物流
              </div>
              </router-link>
              <div id="order_payment" class="aui-btn aui-btn-danger aui-btn-outlined"
                   v-show="item.logisticsStatus === 1" @click="checkInfo(item.parentOrderNo, item.orderNo)">确认收货
              </div>
              
            </li>
          </ul>
        </transition-group>
      </div>
      <!--商品列表 end-->
    </div>
    <div style="height:5rem;"></div>
		<!--订单页是空的-->
    <div class="no_data" v-if="showBgImage">
        <img src="static/image/no_order.png"/>
        <p>订单里没有东西哦，快去挑选吧~</p>
        <div class="back_home aui-btn aui-btn-outlined" @click.stop="goHome">逛逛首页</div>
    </div>
    
    <!--订单页是空的 end-->
  </div>
</template>

<script>
  import {getAllOrder, cancelOrder, confirmOrder, getUserInfoAgain, getOrderResultCheckInfo} from "../config/getData.js"
  import {mapGetters, mapMutations, mapActions} from "vuex"
  import {MessageBox, TabContainer, TabContainerItem} from 'mint-ui'
  import {Toast} from '../../utils/toast2.js'
  import RepairHead from "../repairHead"
  import {showLoading, hideLoading} from "../../utils/loading";
  import BillLookUp from "../../components/BillLookUp";
  import BillApply from "../../components/BillApply";

  export default {
    data () {
      return {
        data: [],
        isiOS: null,
        isAndroid: null,
        order: [],
        list: ['全部', '待付款', '待配送', '配送中', '已签收'],
        headList: [{
          goodsClassNum: "",
          goodsClassName: '全部'
        }, {
          goodsClassNum: "",
          goodsClassName: '待付款'
        }, {
          goodsClassNum: "",
          goodsClassName: '待配送'
        }, {
          goodsClassNum: "",
          goodsClassName: '配送中'
        }, {
          goodsClassNum: "",
          goodsClassName: '已签收'
        }],
        range: null,
        move: true,
        animateClassName: "slide-left",
        number: null,//从profile 入口
        title: null,
        numberTurn: null,//订单内部切换
        refound: null,//跳转退押金页面
        refoundInfo: null,//跳转退押金详情
        showBgImage: false,
      }
    }
    ,
    beforeDestroy() {
      hideLoading();
    },
    async created() {
      showLoading()
    	await this.getUserInfo();
    	await this.initData();

    	this.number = this.$route.query.orderStatus || 0;

    	this.status();
    	this.$store.dispatch('changeClassifyIndex', this.number);
      await this.getNum (this.$store.state.jyModules.classifyIndex);

      hideLoading()

    },
    components: {
    	RepairHead,
    	"Bill-apply":BillApply,
			"Bill-lookUp":BillLookUp,
    }
    ,
    computed: {
      ...mapGetters('xhModules', [
        'sessionId',
        'login',
        'userInfo'
      ]),
      num () {
      	return this.$store.state.jyModules.classifyIndex;
      },

    }
    ,
    watch: {
    	num (newdd, olddd) {
          // console.log(this.$store.state.jyModules.classifyIndex)
    			if(newdd - olddd > 0){
    				this.animateClassName = "slide-right"
    			}else{
    				this.animateClassName = "slide-left"
    			}
        	this.number = this.$store.state.jyModules.classifyIndex;
        	this.status();
    			this.getNum ();
    	}
      
    },
    methods: {
      goback() {
        this.$router.back();
      },
    	...mapActions('xhModules', [
    	  'getUserInfo'
    	])
    	,
    	...mapMutations('xhModules',[
    		'USER_INFO',
    		'LOGO_OUT',
    		'LOGO_IN'
    	])
    	,
    	//去首页，逛逛首页
			goHome() {
				this.$router.push({path: "/"});
			},
    	async initData() {
    		let res = await getUserInfoAgain(this.sessionId);
    		if (res.returncode === 0) {
    		   this.LOGO_OUT(false);
    		   return
    		}
    		this.USER_INFO(res.data[0]);
    		this.LOGO_IN(true);

    	}
    	,
      async getNum () {
      	showLoading();
      	let u = navigator.userAgent;
      	this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android
      	this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);


        if (!this.login) {
          this.$router.push({path: '/login'});
          return
        }

        let res = await getAllOrder(this.number);
        if(res.returncode == 0){
        	Toast({
        	  message: res.errmsg,
        	  iconClass:"aui-iconfont aui-icon-close",
        	  duration: 500
        	});
        }
        if(res.data == null){
        	Toast({
        	  message: "没有数据",
        	  iconClass:"aui-iconfont aui-icon-close",
        	  duration: 500
        	});
        } 
        this.data = [];
        //过滤退押金
        if(this.$route.query.orderReturn) {
        //order标识改变data
          for(let i of res.data){
            if(i.protocolType === 1) {
              this.data.push(i);
            }
          }
          console.log(this.data,"订单里面的数据111");
          if(!this.data.length) {
            this.showBgImage = true;
          } else{
            this.showBgImage = false;            
          }
          hideLoading();
          return
        } 
        
        if(this.$store.state.jyModules.classifyIndex != 0){
          for(let i of res.data) {
            if(i.status !== 3 && i.status !== 5){
              this.data.push(i);
            }

          }
        } else {
          this.data = res.data;
        }
        hideLoading();
        if(!this.data.length) {
          this.showBgImage = true;
        } else{
          this.showBgImage = false;          
        }
        console.log(this.data,"订单里面的数据2222");
      }
      ,
      status() {
      	switch(this.number){
      		case 0:
      		this.number = 0;
      		this.title = "全部订单";
      		break;
      		case 1:
      		this.number = 1;
      		this.title = "未付款订单";
      		break;
      		case 2:
      		this.number = 2;
      		this.title = "待配送订单";
      		break;
      		case 3:
      		this.number = 3;
      		this.title = "配送中订单";
      		break;
      		case 4:
      		this.number = 4;
      		this.title = "已签收订单";
      		break;
      	}
      }
      ,
//    //查看发票
//    lookUpBills(val){
//    		console.log("zhouxinsjhige111")
//    		this.$router.push({name:'/main/BillParticulars'})	  
//    },
//    //开票申请
//    exploitBills(val){
//    		console.log("zhouxinsjhige6666")
//    		let item = "exploitBills";
//    		this.$router.push({name:'BillDetail',query:{datas:item}})	
//    },
      async cancelOrderAction(val) {
        let result = await MessageBox.confirm('确定执行此操作?');

        if (!result) return;

      
        let res = await cancelOrder(val);

        if (res.returncode == 0) {
          Toast({
            message: res.errmsg,
            iconClass:"aui-iconfont aui-icon-close",
            duration: 500
          });
        }

        if(res.returncode == 1 || res.returncode == '1') {
        	Toast({
        	  message:"订单取消成功",
        	  iconClass:"aui-iconfont aui-icon-correct",
        	  duration: 500
        	});
        }

        this.getNum (this.$store.state.jyModules.classifyIndex);
      }
      ,
      //转换时间格式
      getTime(param){
        let date = new Date(param);
        let year = date.getFullYear();
        let month = checkTime(date.getMonth() + 1);
        let day = checkTime(date.getDate());
        let hour = checkTime(date.getHours());
        let min = checkTime(date.getMinutes());
        let sec = checkTime(date.getSeconds());

        function checkTime(i) {
          if (i < 10) {
            i = '0' + i;
          }
          return i;
        }

        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
      }
      ,
      async checkInfo(val, val_1){
        let req = await getOrderResultCheckInfo(val);
        if(req.data[0].code == 0){
          MessageBox.confirm('该订单尚有工单未完结，是否确认收货！').then(action => {
            this.turnConfirm(val_1);
          });
        }
        if(req.data[0].code == 1 || req.data[0].code == -1){
          this.turnConfirm(val_1);
        }
      }
      ,
      async turnConfirm(val) {
      	let res = await confirmOrder(val);
      	if(res.returncode == '0') {
      		Toast({
  			   message: res.errmsg,
  			   iconClass:"aui-iconfont aui-icon-close",
  			   duration: 500
  			});
			   return;
      	}
      	if(res.returncode == '1' || res.returncode == 1) {
      		Toast({
      		  message: '确认收货成功！',
      		  iconClass:"aui-iconfont aui-icon-correct",
      		  duration: 500
      		});
      		this.$store.dispatch('changeClassifyIndex', 4);	
      	}

      }
      ,
      img (param) {
        let arr = [];
        param.forEach((key, value) => 
          arr.push(key.goodsImg)
        )
        return arr
      }
      ,
      add(val){
        let  j = null;
        for(let i of val){
          j += i.goodsNum;
        }
        return j;
      },
      turn(flag,param) {
        console.log(param)
        this.refound = {
          goodsImg: param.orderDetails[0].goodsImg,
          goodsNum: param.orderDetails[0].goodsNum,
          goodsPrice: param.orderDetails[0].goodsPrice,
          goodsName: param.orderDetails[0].goodsName,
          canAfterSaleNum: param.orderDetails[0].canAfterSaleNum,
          canAfterSalePrice: Number(param.depositAmount)/Number(param.orderDetails[0].goodsNum),//押金总额除以商品数量
          orderNo: param.orderNo,
          goodsId: param.orderDetails[0].goodsId,
          goodsType: param.orderDetails[0].goodsType,
          userAccount: param.userAccount,
          createTime: param.createTime,
          depositAmount: param.depositAmount
        }
        console.log(this.refound)
        this.refoundInfo = {
          orderNo: param.orderNo
        }
        if(flag == 1) {
          this.$router.push({path:'/main/orderRefound', query:{refound: this.refound}})
        }
        if(flag == 2) {
          this.$router.push({path:'/main/orderRefoundDetails', query:{refoundInfo: this.refoundInfo}})
        }
      },
      orderStatus(item){
        return item.status ===5 && item.protocolType === 1 ? '已退押金' :
                  ( item.status === 1 ? '已取消':
                  (item.status === 3 ? '已退款' : 
                  (item.status === 5 ? '退货退款' : 
                  (item.payStatus === 0 ? '待付款' : 
                  (item.logisticsStatus === 0 ? '待配送' : 
                  (item.logisticsStatus === 1 ? '配送中' : 
                  (item.logisticsStatus === 2 ? '已签收' : '')))))))
      }
    }
    ,
		mounted(){

		}

  }
</script>
<style scoped="">
  .slide-fade-enter-active {
    transition: all .18s ease;
  }

  .slide-fade-leave-active {
    transition: all .18s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(100%);
  }
  .slide-left-enter-active, .slide-right-leave-active,.slide-left-leave-active, .slide-right-enter-active{
  	    transition: all .18s ease;
  }
  .slide-left-enter, .slide-right-leave-to{
  	transform: translateX(100%);
  }
  .slide-left-leave-to, .slide-right-enter{
	transform: translateX(-100%);
  }
  #aLink{
    color: #0f8de0;
    text-decoration: underline;
    float: left;
  }
  .aui-content {
    background:#f5f5f5;
  }
</style>
