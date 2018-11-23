
<template>
	<div class="vue_app" style="position: absolute;width: 100%">
		<header class="aui-bar aui-bar-nav aui-bar-light">
			<router-link :to="{path:'/afterSale',query:{activeIndex:1,orderSubNo:$route.query.orderSubNo}}" replace>
				<div class="close_page">
					<i></i>
					<i></i>
					<i></i>
				</div>
			</router-link>
			<div class="aui-title">售后详情</div>
		</header>
		<div style="height:3rem;"></div>

		<div class="centent" v-if="afterSaleInfo">
			<!--物流信息-->
			<div class="order_logistics_box">
				<div class="delivery_box" v-if="returnStatus.length != 0">
					<ul class="delivery_list" >
						<li :class="{start:index==0}" v-for="(item,index) in returnStatus">
							<i class="line_icon"></i>
							<p>{{item.approvalStateStr}}</p>
							<div class="time">{{item.approvalDateStr}}</div>
						</li>
						<!--<li>
							<p>审核同意</p>
							<i class="line_icon"></i>
							<p>提交申请</p>
							<div class="time">2016-10-28 22:04:42</div>
						</li>-->
					</ul>
				</div>
				<ul class="aui-list aui-media-list commodity_list subtotal_list aui-margin-b-15">
					<li class="aui-list-item">
						<div class="aui-media-list-item-inner">
							<div class="aui-list-item-media">
								<img :src="shopingObj.goodsimg || 'static/image/demo1.png'">
							</div>
							<div class="aui-list-item-inner suggest">
								<!--<h3>商品标题最多可显示两行商品标题最多可显示两行</h3>-->
								<h3>{{afterSaleInfo.goodsName?afterSaleInfo.goodsName:''}}</h3>
								<p>规格：{{afterSaleInfo.goodsSpec}}</p>
								<p>数量：{{afterSaleInfo.goodsQuantity}}</p>
							</div>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-text">
								<div class="aui-list-item-text">售后类型：{{afterSaleInfo.serviceType==1?"退款":"退货退款"}}</div>
							</div>
							<div class="aui-list-item-text">
								<div class="aui-list-item-text">申请金额：￥ {{afterSaleInfo.applyAmount}}</div>
							</div>
							<div class="aui-list-item-text">
								<div class="aui-list-item-text" v-if="afterSaleInfo.serviceType==2">退货编号：{{afterSaleInfo.serviceNo}}</div>
								<div class="aui-list-item-text" v-if="afterSaleInfo.serviceType==1">退款编号：{{afterSaleInfo.serviceNo}}</div>
							</div>
							<div class="aui-list-item-text">
								<!--<div class="aui-list-item-text">申请时间：2017-09-05&nbsp;21：24：23</div>-->
								<div class="aui-list-item-text">申请时间：{{getTime(afterSaleInfo.applyTm)}}</div>

							</div>
							<div class="aui-list-item-text">
								<!--<div class="aui-list-item-text">退货说明：退货原因退货原因退货原因退货原因...</div>-->
								<div class="aui-list-item-text" v-if="afterSaleInfo.serviceType==2">退货原因：{{afterSaleInfo.serviceReason}}</div>
								<div class="aui-list-item-text" v-if="afterSaleInfo.serviceType==1">退款原因：{{afterSaleInfo.serviceReason}}</div>
							</div>
							<div class="aui-list-item-text" v-if="afterSaleInfo.serviceType==2">
								<div class="aui-list-item-text">包装情况：{{afterSaleInfo.packing==0?"包装完整":"包装不完整"}}</div>
							</div>
							<div class="aui-list-item-text" v-if="afterSaleInfo.serviceType==2">
								<div class="aui-list-item-text">退货凭证：</div>
							</div>
							<div class="aui-card-list-content-padded aui-border-b aui-border-t aui-padded-0">
								<!---->
								<div class="aui-row aui-row-padded" style="display:flex;flex-flow:row wrap;">
									<!--class="aui-col-xs-4"-->
									<div class="aui-col-xs-4 imgItem"  @click.stop="getImgCover(imgUrl)"  v-for="imgUrl in getImg" style="padding-bottom: 33.33333333%;height: 0;overflow: hidden;">
										<img :src="imgUrl || 'static/image/demo1.png'" />
										<!--<div :style="{backgroundImg:`url(${imgUrl || 'static/image/demo1.png'})`}" class="backgroundShowPic">asadasdaasas</div>-->
									</div>
								</div>
							</div>

						</div>
					</li>
				</ul>
				<ul class="aui-list aui-media-list commodity_list subtotal_list">
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-text">
								<div class="aui-list-item-text">店铺名称：{{afterSaleInfo.shopName}}</div>
							</div>
							<div class="aui-list-item-text">
								<div class="aui-list-item-text">实际金额：{{afterSaleInfo.realityAmount}}</div>
							</div>
							<div class="aui-list-item-text">
									<!--退货原因-->
								<div class="aui-list-item-text">{{afterSaleInfo.serviceType==1?'退款':'退货'}}说明：{{afterSaleInfo.serviceDesc}}</div>
							</div>
							<div class="aui-list-item-text">
								<!--<div class="aui-list-item-text">回复时间：2017-09-05&nbsp;21：24：23</div>-->
								<div class="aui-list-item-text">回复时间：{{getTime(afterSaleInfo.replyTm)}}</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<!--物流信息 end-->
		</div>
		<!--图片弹出层-->
		<div v-if="checkIMg" @click.stop="hideImgCover" class="showImg" :style="{'width': zxPageWidth+'px','height':zxPageHeight+'px'}">
			<!--遮罩-->
			<div class="zxCover" :style="{'width': zxPageWidth+'px','height':zxPageHeight+'px'}"></div>
			<img class="centerImg" :src="coverImg"/>
		</div>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex';
	import axios from "axios";
//	import api from "../../api/index.js";

	const api = window.api;

	export default {
		data(){
			return {
				afterSaleInfo:{},
				returnStatus:[],
//				serverType:'退货退款',
				serviceNo:null,
				userSessionid:null,
				shopingObj:{
					unit:'',
					goodsSpec:'',
					goodsImg:''
				},
				getImg:[],
				checkIMg:false,
				coverImg:'',
			}
		},
		methods:{
			//显示遮罩层
			getImgCover(imgUrl){
//				console.log(imgUrl,'cover');
				this.checkIMg = true;
				this.coverImg = imgUrl;
			},
			//隐藏遮罩层
			hideImgCover(){
				this.checkIMg = false;
				this.coverImg = '';
			},
			getCusImg(str){
				 if(str){
				 	this.getImg = str.split(',');
				 }
//				 console.log(this.getImg.length,'length');
			},
			getAfterSale(){
				//省悟
//				let url = "http://172.19.5.136:8112/afterSales/selectAfterSales/1127684370832207";
				let url = api.local_host+"/afterSales/selectAfterSales/"+this.serviceNo;
			//	   	console.log(url);
//					this.serviceNo
				let config = {
					url: url,
					headers: {
//						4409883a17dd4721812b804d4741c6da
						'sessionId': this.userSessionid,
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					method:"GET"
				};
				axios(config).then((res)=>{
					this.afterSaleInfo = res.data.data[0];
					this.getCusImg(this.afterSaleInfo.voucherPhoto);
				})
			},
			getReturnStatus(){
				//志道
				let url = api.local_host+"/afterSales/qryAfterSalesApproval/"+this.serviceNo;
//				let url = "http://172.19.5.136:8112/afterSales/qryAfterSalesApproval/1127684370832207";
//				this.serviceNo
			//	   	console.log(url);
				let config = {
					url: url,
					headers: {
//						4409883a17dd4721812b804d4741c6da
						'sessionId': this.userSessionid,
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					method:"GET"
				};
				axios(config).then((res)=>{
//					console.log(res.data.data[0],'getReturnStatus');
					this.returnStatus = res.data.data[0];
				})
			},
			getQuery(){
//				console.log(this.$route.query);
				let obj = this.$route.query;

				this.shopingObj.unit = obj.goodsUnit;
				this.shopingObj.goodsSpec = obj.goodsSpec;
				this.shopingObj.goodsimg = obj.goodsImg;
				this.serviceNo = obj.serviceNo;
//				console.log(this.shopingObj.goodsimg)
				if(window.localStorage.getItem('sessionId')){
					 this.userSessionid = window.localStorage.getItem('sessionId');
				}
//				console.log(1,this.orderNo,this.shopingObj.goodsimg,this.shopingObj.goodsSpec,this.shopingObj.unit)
			},
			//转换时间格式
			getTime(param){

			  if(param){
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
			   }else{
			   	  return '';
			   }
			}
		},
		created() {
			this.getQuery();
			this.getAfterSale();
			this.getReturnStatus();
		},
		computed: {
			zxPageHeight(){
				return window.screen.height;
			},
			zxPageWidth(){
				return window.screen.width;
			}
		},
	}
</script>

<style scoped="scoped">
	.showImg{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
	.zxCover{
		position: absolute;
		top: 0;
		left: 0;
		background: black;
		opacity: 0.5;
	}
	.centerImg{
		position: absolute;
		top: 40%;
	}
</style>

