
<template>
	<!--头部-->
	<div class="vue_app" style="position: absolute;width: 100%;height:100%;">
		<header class="aui-bar aui-bar-nav aui-bar-light">
			<router-link to="/afterSale" replace>
				<div class="go-back">
					<i></i>
					<i></i>
					<i></i>
				</div>
			</router-link>
			<div class="aui-title">申请售后服务</div>
		</header>
		<div style="padding-bottom:2.3rem;">
			<div style="height:3rem;"></div>
			<div class="centent top_div">
				<!--商品列表-->
				<div class="aui-content">
					<ul class="aui-list aui-media-list commodity_list subtotal_list">
						<li class="aui-list-item">
							<div class="aui-media-list-item-inner">
								<div class="aui-list-item-media">
									<img :src="shopObj.goodsImg || 'static/image/demo1.png'">
								</div>
								<div class="aui-list-item-inner suggest">
									<h3>{{shopObj.goodsName}}</h3>
									<p>数量：{{shopObj.goodsNum}}</p>
									<p>价格：￥{{shopObj.goodsPrice}}/{{shopObj.goodsUnit?shopObj.goodsUnit:'个'}}</p>
								</div>
							</div>
						</li>
						<li class="message_list" style="position: relative;padding: 0 0.75rem;padding-bottom: 0.75rem;" v-if="orderServeList"> <!--v-if="orderServeList"-->
							<div class="aui-list-item-arrow01 server_show" style="background-color: #fff2f2;padding: 0.2rem 0.5rem;">
								<div style="margin-left: 0.5rem;" class="aui-list-item-arrow_1" v-for="(server,index) in orderServeList" :key="index">
									<h4>[服务]</h4>
									<dl>
										<dd>
											<font>{{server.serveName}}</font>
											<span>¥{{server.servePrice}}×{{server.serveNum}}</span>
										</dd>
										<!--<dd>
											<font>全保换新1年</font>
											<span>¥88.8×2</span>
										</dd>-->
									</dl>
								</div>

								<!--<div style="margin-left: 15;" class="aui-list-item-arrow_2">
									<h4>[赠品]</h4>
									<dl>
										<dd>
											<font>赠品名称</font>
											<span>¥9.8×1</span>
										</dd>
									</dl>
								</div>-->
							</div>
						</li>
						<!-- 组合商品 -->
						<li class="message_list" style="position: relative;padding: 0 0.75rem;padding-bottom: 0.75rem;" v-if="subGoodsList"> <!--v-if="orderServeList"-->
							<div class="aui-list-item-arrow01 server_show" style="background-color: #fff2f2;padding: 0.2rem 0.5rem;">
								<div style="margin-left: 0.5rem;" class="aui-list-item-arrow_1" v-for="(subGood,index) in subGoodsList" :key="index">
									<dl>
										<dd>
											<font>{{subGood.goodsName}}</font>
											<span>¥{{subGood.goodsPrice}} x {{subGood.goodsNum*shopObj.goodsNum}}</span>
										</dd>
									</dl>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div style="margin-bottom:0 !important" class="aui-content aui-margin-b-15">
				<ul class="aui-list aui-list-in">
					<li class="aui-list-item aui-content aui-list aui-form-list">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-label" style="width:30%;">售后类型：</div>
							<div class="aui-list-item-input">
								<p style="color: #333;">{{aftermarkettype}}</p>
							</div>
						</div>
					</li>
					<li class="aui-list-item aui-content aui-list aui-form-list">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-label" style="width:30%;">{{this.aftermarkettype == '退款'?'退款':'退货'}}数量：</div>
							<div class="aui-list-item-input">
								<p>可退数量：{{canBackNum}}</p>
							</div>
							<div class="edit_data" style="bottom:0.4rem;">
								<i class="del_cart" @click="delCount"></i><span  ref="money">{{actureBackNum}}</span><i @click.stop="addCount" class="add_to_cart"></i>
							</div>																		
						</div>
					</li>
					<li class="aui-list-item aui-content aui-list aui-form-list">
						<div class="aui-list-item-inner" style=" white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
							<div class="aui-list-item-label" style="width:30%;">退款金额：</div>
							<div class="aui-list-item-input">
								<!--<input type="number" placeholder="最多￥200，含发货邮费￥6.00">-->
								<p><span class="aui-text-danger"><strong>￥{{refundamount}}</strong></span>（实际退款金额以审核为准）</p>
							</div>
						</div>
					</li>
					<!--@click="showBackReasonList"-->
					<li class="aui-list-item"  @click.stop="showPopup1">
						<div class="aui-list-item-inner aui-list-item-arrow" style=" white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
							<div class="aui-list-item-title">
								{{this.aftermarkettype == '退款'?'退款':'退货'}}原因：
								
							</div>
							<p>{{upLoaddata.serviceReason?upLoaddata.serviceReason:'请选择'}}</p>
						</div>
					</li>

					<!--<li class="aui-list-item  checkeB" v-if="showBackReason">
						<p v-for="(item,index) in backMoneyReason"  @click="changeCheckFlag(item,index)" key="index">
							<input type="checkbox"  v-model ="item.flag" />{{item.case}}
						</p>
					</li>-->
					<li class="aui-list-item aui-content aui-list aui-form-list">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-label" style="width:30%;">{{this.aftermarkettype == '退款'?'退款':'退货'}}说明：</div>
							<div class="aui-list-item-input">
								<!--@click.stop="showPopupReason"-->
								<input type="text" placeholder="选填" v-model="reasonmsg">
								<!--<textarea id="status" name="status" rows="6" cols="40" v-on:input="sshow"></textarea>-->
							</div>
						</div>
					</li>
					<!--@click="showpackingCaseList"-->
					<!--<li class="aui-list-item" v-if="aftermarkettype =='退货退款' "  @click.stop="showPopup2">
						<div class="aui-list-item-inner aui-list-item-arrow">
							<div class="aui-list-item-title">包装情况：</div>
							<p>请选择</p>
						</div>
					</li>-->
					<li class="aui-list-item aui-content aui-list aui-form-list" v-if="aftermarkettype =='退货退款' ">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-label" style="width:30%;">包装情况：</div>
							<div class="aui-list-item-input">
								<label v-for="(pack,index) in packingCase" style="margin-left:0.1rem;" :key='index'><input class="aui-radio" type="radio" name="demo1" @click.stop="changePacking(index)" :checked="pack.flag"> {{pack.case}}</label>
								<!--<label><input class="aui-radio" type="radio" name="demo1"> 包装损坏</label>-->
							</div>
						</div>
					</li>
					<!--<li class="aui-list-item packingCase" v-if="showpackingCase">
						<p v-for="(item1,index) in packingCase"  key="index">
							<input type="checkbox"  v-model ="item1.flag" />{{item1.case}}
						</p>
					</li>-->
				</ul>
				<img-UpLoad ref="imgUp" :customFn="getImgUrl" :toast="false" :autoClear="false"  v-if="aftermarkettype =='退货退款' "></img-UpLoad>
				<!--<ul class="aui-list aui-list-in" v-if="aftermarkettype =='退货退款' ">
					<li class="aui-list-item aui-content aui-list aui-form-list">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-label" style="width:30%;">提交凭证：</div>
							<div class="aui-list-item-input">
								<p>最多可上传5张</p>
							</div>
						</div>
					</li>

					<li class="aui-list-item aui-list-item-middle aui-margin-b-15">
						<div class="aui-card-list-content-padded aui-border-b aui-border-t aui-padded-l-0 aui-padded-t-0">
							<div class="aui-row aui-row-padded">
								<div class="aui-col-xs-4">
									<img src="static/image/demo1.png" />
								</div>
								<div class="aui-col-xs-4">
									<img src="static/image/demo1.png" />
								</div>
								<div class="aui-col-xs-4">
									<img src="static/image/demo1.png" />
								</div>
								<div class="aui-col-xs-4">
									<img src="static/image/demo1.png" />
								</div>
								<div class="aui-col-xs-4">
									<img src="static/image/suneee-btn.png" />
								</div>
							</div>
						</div>
					</li>
				</ul>-->
			</div>
			<!--底部按钮-->

			<div style="padding:0.5rem;" class="settle_accounts">
				<div style="background:#970000 !important" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" tapmode  @click.stop="upMethod">提交申请</div>
			</div>
		</div>
		<popup v-model="popupVisible" position="bottom">
			<div id="purchase_service" >
				<!--class="purchase_service"-->
				<div class="spec_middle">

					<div class="value_added1">
						<div style="padding:0.5rem 0">
							选择{{this.aftermarkettype == '退款'?'退款':'退货'}}原因
						</div>
						<ul class="aui-list aui-media-list top_div aui-list-header" style="margin-bottom:0;padding:0 0 3.5rem;max-height:20rem;overflow-y:auto">
							
							<li v-for="(item,index) in backMoneyReason" :key="index" class="aui-list-item" style="padding-left:0;">
								<div class="aui-list aui-media-list commodity_list">       <!--backMoneyReason-->
									<div class="aui-list-item-inner " >
										<label class="aui-pull-left" ><input class="aui-checkbox" type="checkbox" @click.stop="changeCheckFlag(index)" :checked="item.flag">&nbsp;{{item.case}} </label>
									</div>																				<!--:checked="index === reasonCheckedIndex"-->
			                    </div>
							</li>
					    </ul>
				    </div>

			    </div>
			    <div class="settle_accounts lijixiadan settle_accounts_1" @click.stop="getBackReason">
				    <div id="confirm" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm">确定</div>
			    </div>
			</div>
		</popup>
		
		<!--<div class="aui-mask aui-mask-in" style="display: none;"></div>-->

		<popup v-model="popupVisible2"  position="bottom">
			<div id="purchase_service02" >

				<div class="spec_middle">

					<div class="value_added">
						<ul class="aui-list aui-media-list top_div aui-list-header" style="margin-bottom:0;">
							<div>
								选择包装情况
							</div>
							<li class="aui-list-item" style="padding-left:0;">
								<div class="aui-list aui-media-list commodity_list">
									<div class="aui-list-item-inner " v-for="(pack,index) in packingCase" :key="index">
										<label class="aui-pull-left"><input class="aui-checkbox" type="checkbox" name="demo1" @click.stop="changePacking(index)" :checked="pack.flag"> {{pack.case}}</label>
									</div>
			                    </div>
							</li>
					    </ul>
				   </div>
			    </div>
			    <div class="settle_accounts lijixiadan settle_accounts_2">
				    <div id="confirm" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click.stop="getPackingCheck">确定</div> <!-- @click="getPackingCheck"-->
			    </div>
			</div>
		</popup>
		<popup v-model="popupReason" pop-transition="popup-fade">
			<div>
				{{reasonmsg}}
			</div>
		</popup>

	</div>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex';
	import axios from "axios";
	import { Popup, MessageBox } from 'mint-ui';
	import ImgUpLoader from '../ImgUpload/index';
	import {Toast} from "../../utils/toast2";
	import {showLoading, hideLoading} from "../../utils/loading";
//	import api from "../../api/index.js";
	const api = window.api;

	export default  {
		data(){
			return {
				hadBillChangeToWb: true,	// true:已转维保
				depositAmount:null,
				eFlag:0,//是否为押金单
				userSessionid:null,
				popupVisible:false,
				popupVisible2:false,
				popupReason:false,
				aftermarkettype:'',
				refundamount:'',
				reasonmsg:'',
				canBackNum:10,  //可退货数量
				actureBackNum:10, //申请退货数量
				showBackReason:false,
				showpackingCase:false,
				upFlag:false,
				imgStatus:{},
				shopObj:{},
				backMoneyReasonId:null,
				orderServeList:null,
				subGoodsList:null,
				parentNo:null, //总单号
				afterSaleInfoAll:null,//售后单信息
				orderInfo:null, //总订单信息
				backMoneyState:null,
				backMoneyReason:[
					{case:'买错了，重新购买',flag:false},
					{case:'买多了，取消部分',flag:false},
					{case:'不想买了',flag:false},
					{case:'已买了其他替代商品',flag:false},
					{case:'其他原因',flag:false},
					{case:'商品质量有问题（需要上传照片）',flag:false},
					{case:'商品与描述不符（需要上传照片）',flag:false},
					{case:'商品有破损（需要上传照片）',flag:false},
					{case:'包装不完整（需要上传照片）',flag:false},
					{case:'无理由退货',flag:false},
					{case:'不满意配送时间或配送人员',flag:false},
					{case:'商品未收到',flag:false},
					{case:'其他原因',flag:false},
				],
				backMoneyReason2:[],
				packingCase:[
					{case:'包装完整',flag:false},
					{case:'包装不完整',flag:false}
				],
				//用于发起请求
				upLoaddata:{
					"serviceType": "2", //售后类型
		            "serviceReason": null, //退货退款原因
		            "serviceDesc": null, //退货退款描述
		            "userPhone": "13826020035", //联系电话
		            "applyTm": null,  //申请时间
//		            "voucherPhoto": null, //图片凭证
//		            "packing": null, //包装情况
		            "goodsId": null, //商品id
		            "goodsName": null, //商品名称
		            "orderNo": null, //订单编号
		            "enterpriseId": 138, //企业Id
		            "applyAmount": null, //申请金额
		            "goodsQuantity": null, //商品数量
		            "goodsImg":'',
		            "goodsSpec":'',
		            "goodsServernos":'', //服务单号
				}
			}
		},
		components:{
			 "popup": Popup,
			 "imgUpLoad":ImgUpLoader
		},
		watch:{
			actureBackNum(newValue, oldValue) {
				this.actureBackNumData = newValue;
			},
			orderInfo(newVal,oldVal){
				
			}
		},
		methods:{
			// 判断是否已转维保
			hadChagneToWbStatus() {
				const { goodsType, parentOrderNo } = this.shopObj
				if (goodsType != 3) {
					this.hadBillChangeToWb = false
					return
				}
				axios({
					url: window.api.local_host + "/maintenanceProgramme/getShopOneRecordById",
					method: 'get',
					params: {
						enterpriseid: window.api.enterpriseid,
						billno: parentOrderNo
					},
					headers: {
						sessionId: window.localStorage.getItem("sessionId")
					}
				}).then(res => {
					if (res.data.returncode == 1) {
						console.log("订单已转维保")
						this.hadBillChangeToWb = true
						return
					}
					// if (res.data.data[0].code === "数据不存在！!") {
					// 	this.hadBillChangeToWb = false
					// }
					this.hadBillChangeToWb = false
				}).catch(e => {
					this.hadBillChangeToWb = false
					console.log("查询是否已转维保失败")
					console.log(e)
				})
				
			},
			//确定是退货退款还是退款
			getServerType(){
//				console.log('=====================----+++++------------+++++++++++++++=======');
				let obj = this.$route.query;
//				console.log(obj.goodsType,'商品');
				let status = obj.logisticsStatus;
//				console.log(obj.logisticsStatus,'logisticsStatus');	
				console.log(obj.logisticsStatus)
				let isGroupFlg = true			// true 表示不包含虚拟商品
				if (obj.goodsType == 3) {
					for (const iterator of obj.subGoodsList) {
						// 说明包含了虚拟商品 不能退货
						if (iterator.goodsType == 1) {
							isGroupFlg = false
							break
						}
					}
				} 
				
				if(status == 0 || obj.goodsType == 1 || (obj.goodsType == 3 && !isGroupFlg)){
//					console.log(11111111);
					this.upLoaddata["serviceType"] = "1";
					this.aftermarkettype = "退款";
				}else if(status == 2 && isGroupFlg){
//					console.log(22222222);
					this.upLoaddata["serviceType"] = "2";
					this.aftermarkettype = "退货退款";
				}
				this.showReason();
			},
			//调用图片上传回调   发起退货退款申请
			getImgUrl(res){
//				console.log(res,'tupian');
				this.imgStatus = res;
			
//				console.log(this.imgStatus);
				if(res.data){
					this.upLoaddata.voucherPhoto = res.data.join(',');
				}
//				console.log(this.upLoaddata.voucherPhoto,'拼接');
				this.updataApplication();
			},
			//上传图片 调用插件
			upMethod(){
				if (this.shopObj.goodsType == 3 && this.hadBillChangeToWb) {
					MessageBox.alert("该订单关联的服务工单已被服务商受理，无法申请售后，请联系客服处理")
					return
				}
				if(this.aftermarkettype=='退货退款'){
					this.upLoadImg();
				}else{
					this.updataApplication();
				}
			},
			showPopup1(){
				this.popupVisible = true;
			},
			showPopupReason(){
				this.popupReason = true;
			},
			showReason(){
				if(this.aftermarkettype == '退款'){
					this.backMoneyReason.splice(5,13);
					return this.backMoneyReason;
				}else if(this.aftermarkettype == '退货退款'){
					this.backMoneyReason.splice(0,5);
//					this.backMoneyReason[0].case = "无理由退款";
					return this.backMoneyReason;
					                                                       
				}
			},
			//获取申请退款金额
			getRefundamount(){
				let routeObj = this.$route.query;
				//计算优惠券后的商品单价（优惠券后台均摊到单个商品）
				let singePrice = Number(routeObj.realTotalValue)/Number(routeObj.goodsNum);
//				console.log(singePrice);
				if(this.aftermarkettype == '退货退款'){
					this.refundamount = (singePrice * this.actureBackNum).toFixed(2);  
				}else if(this.aftermarkettype == '退款'){
						
					
					if(Number(this.actureBackNum) == Number(routeObj.canAfterSaleNum)){

						if(this.backMoneyState === 0){
							this.refundamount = (singePrice * this.actureBackNum + Number(routeObj.freight)).toFixed(2);
//							console.log(this.backMoneyState,'1222222');
//							console.log(this.refundamount,'this.refundamount');
//							console.log(singePrice * this.actureBackNum,'singePrice * this.actureBackNum')
						}else{
							this.refundamount = (singePrice * this.actureBackNum).toFixed(2);
						}
					}else{
						this.refundamount = (singePrice * this.actureBackNum).toFixed(2);
					}
				}
//				console.log(this.eFlag,'走走偶u');
				if(this.eFlag == '1'){
					 console.log('-----====’')
					 this.refundamount = this.depositAmount * this.actureBackNum;
					 console.log('退押金年’')
				}
				
			},
			//是否退运费控制函数    实体商品退完了，就给用户退运费（虚拟商品不存在运费）
			
			backFreight(){
//				afterSaleInfoAll:null,//售后单信息
//				orderInfo:null, //总订单信息
				var arr = this.afterSaleInfoAll;
				//该订单中进行过售后的售后单信息  如果为空未进行过售后
				var afterSale = [];
				
				for(let i = 0; i < this.afterSaleInfoAll.length; i++){
					//进行过售后
					if(arr[i].parentOrderno == this.parentNo){
						afterSale.push(arr[i]);
					}
				}

				//申请售后的实体商品数量
				var afterSaleCount = 0;
				//获取申请售后的实体商品数量
				for(let j = 0; j < afterSale.length; j++){
//					console.log("//获取申请售后的实体商品数量", afterSale[j]);
					if(parseInt(afterSale[j].goodsType)==0){
//						console.log("//获取申请售后的实体商品数量1111");
						afterSaleCount += Number(afterSale[j].goodsQuantity);
					}
				}
				//获取总订单中的实体商品数量
//				console.log(this.orderInfo);
				let orderList = this.orderInfo[0].childOrderList;

				let goodsNum = 0;
				orderList.forEach(item => {
					item.orderDetails.forEach(item2 => {
						if(item2.goodsType == 0 || item2.goodsType == 3){
							goodsNum += item2.goodsNum;
						}
					})
				});
//				console.log(66666666666666666);
				if(goodsNum == (afterSaleCount + parseInt(this.actureBackNum))){
					//退完了
					return 0;
				}else{
					//没退完
					return 1;
				}	
			},
			//获取佳玉传的商品详情和售后类型、可退数量
			getQuery(){
				let obj = this.$route.query;
				this.shopObj = this.$route.query;
				console.log(this.shopObj,'shop');
				this.canBackNum = obj.canAfterSaleNum;//可退货数量
				this.actureBackNum = obj.canAfterSaleNum;

				if(obj.orderServeList){
					
//					console.log(999999999999, obj.orderServeList==false)
					this.orderServeList = JSON.parse(obj.orderServeList);									
					if(this.orderServeList.length){
						this.upLoaddata.goodsServernos = this.orderServeList[0].serveId;
					}

				}
//				console.log(this.$route.query.createTime);
				
				
				//获取总单号 查询总单信息
				this.parentNo = obj.parentOrderNo;
//				console.log(this.parentNo,'总单')

			},
			getUserInfo(){
				if(window.localStorage.getItem('sessionId')){
					 this.userSessionid = window.localStorage.getItem('sessionId');
				}
//				console.log(userSessionid);
				if(this.userSessionid && this.userInfo != null){
//					console.log(this.userInfo);
//					this.userphone = this.userInfo.phone;
//					this.enterpriseid = this.userInfo.enterpriseid;
					this.upLoaddata["userPhone"] = this.userInfo.phone;
					this.upLoaddata["enterpriseId"] = this.userInfo.enterpriseid;

				}

				this.upLoaddata["goodsQuantity"] = this.actureBackNum;
				this.upLoaddata["serviceDesc"]  = this.reasonmsg;
				//售后申请时间
				this.upLoaddata["applyTm"] = new Date().getTime();
//				this.upLoaddata["serviceReason"]
				let obj = this.$route.query;
//				console.log("obj=======",obj)
				this.upLoaddata["goodsName"] = obj.goodsName;
				this.upLoaddata["goodsImg"] = obj.goodsImg;
				this.upLoaddata["orderNo"] = obj.orderNo;
//				console.log(this.upLoaddata["orderNo"]);
				let status = obj.logisticsStatus;
//				console.log(obj.logisticsStatus,'logisticsStatus');
				
				this.upLoaddata["goodsId"] = obj.goodsId;
				this.upLoaddata["goodsType"] = obj.goodsType;
				this.upLoaddata["createTime"] = obj.createTime;
//				if(this.orderServeList != null){
//					this.upLoaddata["normalGoodsId"] =this.orderServeList[0].serveNo;
//				}

				this.upLoaddata["applyAmount"] = this.refundamount;
				if(obj.goodsUnit){
					this.upLoaddata["goodsSpec"] = '￥' + obj.goodsPrice + '/' + obj.goodsUnit;
				}else{
					this.upLoaddata["goodsSpec"] = '￥' + obj.goodsPrice;
				}
			},
			delCount(){
				let count = this.actureBackNum;
				if(count > 1 && count <= this.canBackNum){
					this.actureBackNum--;
				}
				this.getRefundamount();
//				console.log(this.actureBackNum);
			},
			addCount(){
				let count = this.actureBackNum;
				if(count > 0 && count < this.canBackNum){
					this.actureBackNum++;
				}
				this.getRefundamount();
//				console.log(this.actureBackNum);
			},
			changeCheckFlag(index){

//				if (this.reasonCheckedIndex === index) {
//					this.reasonCheckedIndex = -1;
//					return;
//				}
//				this.reasonCheckedIndex = index;
				for(let i = 0; i < this.backMoneyReason.length;i++){
					if(!this.backMoneyReason[i].flag){
						if(i == index){
							this.backMoneyReason[i].flag = true;
						}else{
							this.backMoneyReason[i].flag = false;
						}
					}else{
						this.backMoneyReason[i].flag = false;
					}
				}
			},
			getBackReason(){
				
				for(let i = 0; i < this.backMoneyReason.length;i++){
					if(this.backMoneyReason[i].flag){
						this.upLoaddata.serviceReason = this.backMoneyReason[i].case;
						this.backMoneyReasonId = i;
					}
				}

				this.popupVisible = false;

			},
			//获取packing参数    实现checked选中的值，点击切换
			changePacking(index){
//				console.log(123456);
				for(let i = 0; i < this.packingCase.length;i++){
					if(!this.packingCase[i].flag){
						if(i == index){
							this.packingCase[i].flag = true;
							this.upLoaddata.packing = Number(i);
						}else{
							this.packingCase[i].flag = false;
						}
					}else{
						this.packingCase[i].flag = false;
					}
				}

				if(this.packingCase[0].flag == false && this.packingCase[1].flag == false){
					this.upLoaddata.packing = null;
				}

			},
//			getPackingCheck(){
//
//				for(let i = 0; i < this.packingCase.length;i++){
//					if(this.packingCase[i].flag){
//						this.upLoaddata.packing = this.packingCase[i].case;
//					}
//				}
//				this.popupVisible2 = false;
//			},

			//提交请求前校验
			checkInfo(){

				var obj = this.upLoaddata;
				
				if(this.aftermarkettype == "退货退款"){
					//部分原因需要上传图片
					var flag = false;
					if( this.backMoneyReasonId == 0 ||
						this.backMoneyReasonId == 1 ||
						this.backMoneyReasonId == 2 ||
						this.backMoneyReasonId == 3 ||
						this.upLoaddata.packing == '包装不完整'){
	
						flag = true;
					}

					if(!obj.serviceReason){
						Toast({
		                        message: '请选择申请原因',
		                        iconClass: "aui-iconfont aui-icon-close",
		                        duration: 1000
		                });
		                return;
					}else if(obj.packing == null || obj.packing == undefined){
						Toast({
		                        message: '请选择包装情况',
		                        iconClass: "aui-iconfont aui-icon-close",
		                        duration: 1000
		                });
		                return;
					}else if(this.imgStatus.status == 2 && flag){

		                Toast({
		                        message: '请上传商品图片',
		                        iconClass: "aui-iconfont aui-icon-close",
		                        duration: 1000
		                });
//		                console.log(this.upFlag,'是否请求2');
						return;
					}else if(this.imgStatus.status == 0 && flag){
//						console.log('图片验证')
						Toast({
		                        message: '上传图片失败',                                                                                                                                                             
		                        iconClass: "aui-iconfont aui-icon-close",
		                        duration: 1000
		                });
//		                console.log(this.upFlag,'是否请求0');
		                return;
					}else if(Number(this.actureBackNum) > Number(this.canBackNum) || Number(this.actureBackNum) < 0){
						Toast({
		                        message: '申请数量有误',
		                        iconClass: "aui-iconfont aui-icon-close",
		                        duration: 1000
		                });
		                return;
					}else{
						this.upFlag = true;
						return;
					}
					
					
					
				}else if(this.aftermarkettype == "退款"){
					if(!obj.serviceReason){
						Toast({
		                        message: '请选择申请原因',
		                        iconClass: "aui-iconfont aui-icon-close",
		                        duration: 1000
		                });
		                return;
					}else if(Number(this.actureBackNum) > Number(this.canBackNum) || Number(this.actureBackNum) <= 0){
						Toast({
		                        message: '申请数量有误',
		                        iconClass: "aui-iconfont aui-icon-close",
		                        duration: 1000
		                });
		                return;
					}else{
//						console.log(12346)
						this.upFlag = true;
						return;
					}	
				}
			},
			//上传图片
			upLoadImg(){
				this.$refs.imgUp.upload();
			},
			updataApplication(){
				this.getUserInfo();
				this.checkInfo();
				
				if(window.localStorage.getItem('sessionId')){
					 this.userSessionid = window.localStorage.getItem('sessionId');
				}
//				let url = 'http://172.19.5.136:8112/afterSales/insertOrUpdateAfterSales';
				let url = api.local_host+"/afterSales/insertOrUpdateAfterSales";
				
				let config = {
					url: url,
					headers: {
//						this.userSessionid
//						4409883a17dd4721812b804d4741c6da
						'sessionId': this.userSessionid,
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					data:this.upLoaddata,
					method:"POST"
				};
				console.log(this.upLoaddata,'请求参数');
//				console.log(this.upFlag);
				//9/11 19：49
//				if(this.refundamount == 0){
//					this.upFlag = false;
//					Toast({
//	                        message: '金额不为0',
//	                        iconClass: "aui-iconfont aui-icon-close",
//	                        duration: 1000
//	                    });
//				}
//				
				if(this.upFlag){
//					console.log(9999999);
					showLoading();
					axios(config).then((res)=>{
//						console.log(res,'status');
						if(res.data.returncode === 1){
							Toast({
			                        message: '申请已提交',
			                        iconClass: "aui-iconfont aui-icon-correct",
			                        duration: 1000
			                   });
							hideLoading();
			                this.$router.replace('/afterSale');
//			                console.log(9999);
						}else{
							let alerMessage="系统错误，请稍后再试";
							if(res.data.errmsg.indexOf("组合商品") > 0 ) {
								alerMessage='该订单关联的服务工单已被服务商受理，无法申请售后，请联系客服处理';
							}
							Toast({
			                        message: alerMessage,
			                        iconClass: "aui-iconfont aui-icon-close",
			                        duration: 1000
			                    });
							hideLoading();
							
						}
					}).catch((err)=>{
						hideLoading();	
					})
				}
			},
			/*获取售后单信息 getAfterSale()  =>   获取订单信息getOrderInfo() => 计算是否要退运费 backFreight() => 计算总退款金额*/
			//获取售后单信息
			getAfterSale(){
				//省悟
//				let url = "http://172.19.5.136:8112/afterSales/selectAfterSales/1127684370832207";
				let url = api.local_host+"/afterSales/selectAfterSalesList"+'?'+"token="+new Date().getTime();
				if(window.localStorage.getItem('sessionId')){
					 this.userSessionid = window.localStorage.getItem('sessionId');
				}
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
					this.afterSaleInfoAll = res.data.data;
					this.getOrderInfo();
//					console.log(this.afterSaleInfoAll,'售后单');
				})
			},
			
			//获取订单信息
			getOrderInfo() {
				let sess = window.localStorage.getItem('sessionId');
				// /order/selectOrderDetailYN/
				let url = window.api.local_host + '/order/selectOrderDetailYN/' + this.parentNo;
				let config = {
					url: url,
					headers: {
						'sessionId': sess,
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				};
	
				axios(config).then(res => {
					this.orderInfo = res.data.data;
//					console.log(res.data.data[0].childOrderList[0].protocolType,'danllllll')
					
					this.eFlag = res.data.data[0].childOrderList[0].protocolType ;
					if(res.data.data[0].orderTicketList[0]){
						this.depositAmount = res.data.data[0].orderTicketList[0].deposit;
					}
					
					this.backMoneyState = this.backFreight();
					//获取退款金额信息
//					console.log(this.backMoneyState,'this.backMoneyState');
					this.getRefundamount();
					console.log(res.data.data,'订单');
				})
			},
		},
		beforeDestroy(){
			this.upFlag = false;
		},
		computed: {
			...mapGetters("zxModules", [

			]),
			...mapGetters("xhModules", [
				"userInfo"
			]),
			//此方法并未使用 
			actureBackNumData: {
				set: function (value) {
					this.actureBackNum = value;
				},
				get: function () {
					if (parseInt(this.actureBackNum) < 0) {
//						console.log("小于0");
						return this.canBackNum;
					} else if (parseInt(this.actureBackNum) > this.canBackNum) {
//						console.log("da于0");
						return this.canBackNum;
					} else {
						return this.actureBackNum;
					}
				}
			}
		},
		async created(){
			
			this.getServerType();
			this.getQuery();
			this.getAfterSale();
			this.hadChagneToWbStatus()
			
		}
	}
</script>

<style scoped="scoped">
	.checkeB{

	}
	.checkeB{
		display: block;
	}
	.packingCase{
		-webkit-justify-content: space-between;
   		justify-content: flex-start;
   		/*margin-left:1rem;*/
	}
	.packingCase input{
		margin-top:0.5rem;
		margin-left:3rem;
	}
	.mint-popup{
		width: 100%;
	}
	.message_list{
		padding:0;
		/*padding-right:0 ;*/
	}
	.server_show::after{
		border: 0px solid;
	}
	#purchase_service .aui-media-list .aui-list-item-inner{
		display: inline-block;
	}
</style>

