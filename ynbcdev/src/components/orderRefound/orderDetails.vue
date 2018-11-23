
<template>
	<div class="vue_app" style="position: absolute;width: 100%">
		<header class="aui-bar aui-bar-nav aui-bar-light">
			<router-link :to="{path:'/main/order?orderReturn=1'}">
				<div class="go-back">
					<i></i>
					<i></i>
					<i></i>
				</div>
			</router-link>
			<div class="aui-title">退押金详情</div>
		</header>
		<!-- <div style="height:3rem;"></div> -->

		<div class="centent" v-if="show">
			
			<div class="order_logistics_box" v-for="(val, index) in orderInfo.data" v-show="val.serviceType == 3">
				<ul class="aui-list aui-media-list commodity_list subtotal_list" @click = "select(index)">
					<li class="aui-list-item">
					    <div class="aui-list-item-inner" :class="num.includes(index) ? 'aui-list-item-arrow_1' : 'aui-list-item-arrow'">
					      <div class="aui-list-item-text">
					        <div class="aui-list-item-title">订单编号：{{val.orderNo}}</div>
					      </div>
					      <div class="aui-list-item-text">
					        退押单号：{{val.serviceNo}}
					      </div>
					    </div>
					</li>
				</ul>
				<transition-group  name="fade">	
					<div class="delivery_box" v-if="val.approvalOrder" :key="index" :class="{hiddren:!(num.includes(index))}">
						<ul class="delivery_list" >
							<li :class="{start:i==0}" v-for="(item,i) in val.approvalOrder">
								<i class="line_icon"></i>
								<p>{{item.approvalStateStr}}</p>
								<div class="time">{{getTime(item.approvalDate)}}</div>
							</li>
						</ul>
					</div>
					<ul class="aui-list aui-media-list commodity_list subtotal_list aui-margin-b-15" :key="index"  :class="{hiddren:!(num.includes(index))}">
						<li class="aui-list-item">
							<div class="aui-list-item-inner">
								<div class="aui-list-item-text">
									<div class="aui-list-item-text">申请类型：退押金</div>
								</div>
								<div class="aui-list-item-text">
									<div class="aui-list-item-text">退款金额：{{val.applyAmount}}</div>
								</div>
								<div class="aui-list-item-text">
									<div class="aui-list-item-text">终端编号：{{val.terminalNumber}}</div>
								</div>
								<div class="aui-list-item-text">
									<div class="aui-list-item-text">申请时间：{{getTime(val.applyTm)}}</div>
								</div>

							</div>
						</li>
					</ul>
				</transition-group>
			</div>
		</div>
		<div v-else class="no_data">
			<img src="static/image/no_data.png" alt="">
			<p>暂无相关数据</p>
		</div>
	</div>
</template>
<script>
	import {orderRefoundDetails_1,orderRefoundDetails_2, getUserInfoAgain} from '../config/getData.js'
	import {Toast} from "../../utils/toast2.js"
	import {mapGetters, mapMutations, mapActions} from "vuex"
	import axios from 'axios'

	export default {
		data(){
			return{
				flag: false,//
				num: [],//
				arr:[],
				orderInfo: [],//
				approval: [],
				show: '',
			}
		},
		created(){
			this.initData();
		}
		,
		computed: {
		  ...mapGetters('xhModules', [
		    'userInfo',
		    'sessionId',
		    'login'
		  ])
		}
		,
		methods: {
			...mapActions('xhModules', [
			  'getUserInfo'
			])
			,
			...mapMutations('xhModules', [
			  'USER_INFO',
			  'LOGO_OUT',
			  'LOGO_IN'
			])
			,
			async initData(){
				//页面刷新加载用户数据
				let response = await getUserInfoAgain(this.sessionId);
				if (response.returncode === 0) {
				  this.LOGO_OUT(false);
				  return
				}

				this.USER_INFO(response.data[0]);
				this.LOGO_IN(true);


				let orderNo = this.$route.query.refoundInfo.orderNo;
				let [req, res] = await Promise.all([orderRefoundDetails_1(orderNo), orderRefoundDetails_2(orderNo)]);

				// let req = await orderRefoundDetails(this.$router.query.refoundInfo.orderNo);
				if(req.data.returnCode === 0 || res.data.returnCode === 0) {
					Toast({
					  message: req.errmsg,
					  iconClass:"aui-iconfont aui-icon-warn",
					  duration: 500
					});
					return
				} 

				for (let i of req.data) {
					// console.log(i.serviceType)
					if(Number(i.serviceType) == 3 ){
						this.show = true;
						console.log(i.serviceType)
						for(let j of res.data[0]){
							if(i.serviceNo == j.serviceNo)
								this.approval.push(j);
						}
						i.approvalOrder = this.approval;
						this.approval = [];
					}
					
				}
				this.orderInfo = req;
				console.log(this.orderInfo.data)	
				// this.show = this.orderInfo.data.length;
				this.num.push(0)
				// for(let i of this.orderInfo.data.keys()){
				// 	this.num.push(i);
				// }
			},
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
			select(param){
				if(!this.num.includes(param)) {
					this.num.push(param);
				} else {
					this.num.splice(this.num.indexOf(param),1);
				}
			}
		}
	}
</script>

<style scoped>
	.aui-list-item-arrow:before {
		
		width: 0.8rem;
		height: 0.8rem;
		border-left: none;
		border-bottom: none;
		border-top: 1px solid #dddddd;
		border-right: 1px solid #dddddd;
	}
	.aui-list-item-arrow_1:before {
		content: '';
		position: absolute;
		top: 50%;
		right: 0.75rem;
		margin-top: -0.2rem;
		background: transparent;
		border: 1px solid #dddddd;
		z-index: 2;
		-webkit-border-radius: 0;
		border-radius: 0;
		-webkit-transform: rotate(-135deg);
		transform: rotate(-135deg);
		width: 0.8rem;
		height: 0.8rem;
		border-right: none;
		border-top: 1px solid #dddddd;
		border-bottom: none;
		border-left: 1px solid #dddddd;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: all .5s ease;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0
	}
	.no_data{
		text-align: center;
    	padding: 1rem;
	}
	.hiddren{display:none}
</style>