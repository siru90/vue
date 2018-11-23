<template>
	<!--头部-->
	<div class="vue_app" style="position: absolute;width: 100%">
		<header class="aui-bar aui-bar-nav aui-bar-light">
			<!-- <router-link to="/afterSale" replace> -->
				<div class="go-back" @click="$router.go(-1)">
					<i></i>
					<i></i>
					<i></i>
				</div>
			<!-- </router-link> -->
			<div class="aui-title">申请退押金</div>
		</header>
		<!-- <div style="height:3rem;"></div> -->
		<div class="centent top_div">
			<!--商品列表-->
			<div class="aui-content">
				<ul class="aui-list aui-media-list commodity_list subtotal_list">
					<li class="aui-list-item">
						<div class="aui-media-list-item-inner">
							<div class="aui-list-item-media">
								<img :src="data.goodsImg ? data.goodsImg :'static/image/demo1.png'">
							</div>
							<div class="aui-list-item-inner suggest">
								<h3>{{data.goodsName}}</h3>
								<p>商品押金：{{data.depositAmount}}</p>
								<p>购买数量：{{data.goodsNum}}</p>
							</div>
						</div>
					</li>
	
				</ul>
			</div>
		</div>
		<div class="aui-content aui-margin-b-15">
			<ul class="aui-list aui-list-in">
				<li class="aui-list-item aui-content aui-list aui-form-list">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label" style="width:30%;">售后类型：</div>
						<div class="aui-list-item-input">
							<p>退押金</p>
						</div>
					</div>
				</li>
				<li class="aui-list-item aui-content aui-list aui-form-list">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label" style="width:30%;">退款数量：<span style="margin-left:20px;">1</span></div>
						<div class="" style="">
							<p>（一次只能退换一台）</p>
						</div>
						<div class="" style="margin-right:15px;">
							<p style="color:red;">可退数量：{{data.canAfterSaleNum}}</p>
						</div>															
					</div>
				</li>
				<li class="aui-list-item aui-content aui-list aui-form-list">
					<div class="aui-list-item-inner" style=" white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
						<div class="aui-list-item-label" style="width:30%;">退款金额：</div>
						<div class="aui-list-item-input">
							<!--<input type="number" placeholder="最多￥200，含发货邮费￥6.00">-->
							<p><span class="aui-text-danger">￥{{data.canAfterSalePrice}}</span>（实际退款金额以审核为准）</p>
						</div>
					</div>
				</li>
				<li class="aui-list-item aui-content aui-list aui-form-list">
					<div class="aui-list-item-inner" style=" white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
						<div class="aui-list-item-label" style="width:30%;">终端编号：</div>
						<div class="aui-list-item-input">
							<input type="text" placeholder="" v-model="input">
							<p><span style="word-breal:normal;white-space:normal;">为避免退回押金失败或周期延长，请务必填写正确的终端编号。</span></p>
						</div>
					</div>
				</li>
			</ul>		
		</div>
		<div class="settle_accounts fixed_div aui-card-list-content-padded aui-border-b aui-border-t">
			<div class="aui-btn aui-btn-block aui-btn-danger" @click="submit">提交申请</div>
		</div>
	</div>
</template>
<script>
	import {orderRefound, getUserInfoAgain} from '../config/getData.js'
	import {Toast} from "../../utils/toast2.js"
	import {mapGetters, mapMutations, mapActions} from "vuex"
	import axios from 'axios'

	export default {
		data(){
			return {
				data: null,
				input: null
			}
		},
		created() {
			this.data = this.$route.query.refound,
			this.initData();
		},
		computed: {
		  ...mapGetters('xhModules', [
		    'userInfo',
		    'sessionId',
		    'login'
		  ])
		}
		,
		methods:{
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
			},
			async submit(){
				// console.log(/^[A-Za-z0-9]{1,40}$/gi.test(this.input))
				if(!this.input || !(/^[A-Za-z0-9]{1,50}$/gi.test(this.input))){

					Toast({
					  message: '请正确填写终端编号！',
					  iconClass:"aui-iconfont aui-icon-warn",
					  duration: 500
					});
					return
				}
				let dataInfo = {
					applyAmount :String(this.data.canAfterSalePrice) || '',
					applyTm :(new Date).getTime(),
					createTime:this.data.createTime || '',
					enterpriseId:String(window.api.enterpriseId),
					goodsId:this.data.goodsId || '',
					goodsImg:this.data.goodsImg || '',
					goodsName:this.data.goodsName || '',
					goodsQuantity:1,
					goodsServernos:"",
					goodsSpec: String(this.data.goodsPrice) || '',
					goodsType:this.data.goodsType || '',
					orderNo:this.data.orderNo || '',
					serviceDesc:"",
					serviceReason:"哈哈",
					serviceType:"3",//3为退押金
					userPhone:this.data.userAccount || '',
					terminalNumber: this.input || '',		
				}
				// console.log(dataInfo)
				let config = {
					url: window.api.local_host + '/afterSales/insertOrUpdateAfterSales',
					method: 'post',
					data: JSON.stringify(dataInfo),
					headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'sessionId': this.sessionId}
				}
				let req = await axios(config)
				// console.log('req',11111)
				if(req.data.returnCode == 0) {
					Toast({
					  message: req.data.errmsg,
					  iconClass:"aui-iconfont aui-icon-warn",
					  duration: 500
					});
					return
				}
				if(req.data.returnCode === 1) {
					this.$router.push({path:'/main/order', query:{orderReturn:1}})
				}
			}
		}
	}
</script>
<style scoped>
	input {
		border: 1px solid #ccc;
	    height: 1.5rem;
	    border-radius: 6px;
	    width: 12rem;
	    margin-top: 0.8rem;
	}

</style>