<template>
	<!--头部-->
	<div class="container">

	<header class="aui-bar aui-bar-nav aui-bar-light">
		<!-- {path:'/main/order', query:{orderStatus: num}} -->
	<!-- <router-link :to="$rou"> -->
		<div class="go-back" @click="turn">
			<i></i>
			<i></i>
			<i></i>
		</div>
	<!-- </router-link>	 -->
		<div class="aui-title">采购单详情</div>
		 <div  class="aui-pull-right text-del" @click="turnInstall" v-if="protocolType">查看工单</div>
	</header>
	<!-- <div style="height:3rem;"></div> -->
	<div class="centent" >
		<!--订单状态-待付款-->
		<!-- <div class="order_status" v-if="arr.payStatus == 0">
			<div class="aui-pull-left">
				<h3>待付款</h3>
				<p>请在30分钟内进行支付</p>
			</div>
			<div class="aui-pull-right">
				<i class="icon njfont nj-daifukuan1"></i>
				<em></em>
			</div>
		</div> -->
		<!--订单状态-待付款end-->
		<!--订单状态-待配送-->     <!-- v-if="item.logisticsStatus === 0"-->  <!--style="display: none;"-->
		<!-- <div class="order_status" v-if="arr.payStatus == 2 && !arr.selfExtract" >
			<div class="aui-pull-left">
				<h3>{{logisticsStatus}}</h3>
				<p>点击查看物流信息</p>
			</div>
			<div class="aui-pull-right">
				<i class="icon njfont nj-daipeisong1"></i>
				<em></em>
			</div>
		</div> -->
		<!--订单状态-待配送end-->
		<!--订单状态-配送中-->   <!-- v-else-if="item.logisticsStatus === 1"-->
		<!-- <div class="order_status" v-else-if="arr.payStatus == 2 && !arr.selfExtract">
			<div class="aui-pull-left">
				<h3>{{logisticsStatus}}</h3>
				<p>正在送货途中</p>
			</div>
			<div class="aui-pull-right">
				<i class="icon njfont nj-peisongzhong1"></i>
				<em></em>
			</div>
		</div> -->
		<!--订单状态-配送中end-->
		<!--订单状态-已签收-->       <!-- v-else="item.logisticsStatus === 2"-->    <!--style="display: none;"-->
		<!-- <div class="order_status" v-else-if='item.payStatus == 2 && !arr.selfExtract' >
			<div class="aui-pull-left">
				<h3>{{logisticsStatus}}</h3>
				<p>您的包裹已确认签收</p>
			</div>
			<div class="aui-pull-right">
				<i class="icon njfont nj-yiqianshou1"></i>
				<em></em>
			</div>
		</div> -->
		<!--订单状态-已签收end-->

		<!-- v-for="(item,index) in arr.childOrderList" key="index+item" -->
		<div class="aui-content">
			<ul class="aui-list aui-media-list top_div">
				<!--goodsType 0 代表正常商品  1代表虚拟商品-->
				<!-- <li class="aui-list-item" v-if="!isSelfExtract  && item.orderDetails[0].goodsType==0">
					<div class="aui-media-list-item-inner">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-peisongzhong"></i>
						</div>
						<div class="aui-list-item-inner aui-list-item-arrow">
							<div class="aui-list-item-text">
								<div class="aui-list-item-title"><strong class="aui-text-success">{{logisticsStatus}}</strong><span class="aui-font-size-14 text_c_gray"></span></div>
							</div>
							<p>{{getTime(item.createTime)}}</p>
						</div>
					</div>
				</li> -->
				<!--<li class="aui-list-item">
					<div class="aui-media-list-item-inner">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-shijian"></i>
						</div>
						<div class="aui-list-item-inner">
							<div class="aui-list-item-text">
								<div class="aui-list-item-title">送达时间：<span id="picker3">今天 11:00-11:30</span></div>
							</div>
						</div>
					</div>
				</li>-->
				<li class="aui-list-item">
					<div class="aui-media-list-item-inner">
						<div class="aui-list-item-label-icon">
							<i class="icon njfont nj-dizhi"></i>
						</div>
						<div class="aui-list-item-inner">
							<div class="aui-list-item-text">
								<div class="aui-list-item-title"><strong>收货人：{{childOrderList.receiverName}}</strong><span class="aui-font-size-14 text_c_gray"></span></div>
								<!-- <div class="aui-list-item-right aui-font-size-14">{{getTime(arr.createTime)}}</div> -->
							</div>
							<p><span class="aui-label aui-label-info">地址</span>&nbsp;{{childOrderList.deliveryAddress}}</p>
						</div>
					</div>
				</li>
			</ul>
			<!--商品-->   

			<div id="orderDiv">
				<ul class="aui-list aui-media-list orderInfo" >
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
		                    <strong>配送方式：{{arr.selfExtract ? '自提' : '卖家发货'}}</strong>
							<p>买家留言：{{arr.note?arr.note:''}}</p>
		               </div>
					</li>	
				</ul>
				<ul class="aui-list aui-media-list orderInfo" v-if="arr.selfExtract">
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-text">                                             
								<div class="aui-list-item-title" ref="ordercopy" >自提仓库信息：<span class="aui-font-size-14 text_c_gray"></span></div>
							</div>
							<!-- <p>服务商编号：{{arr.selfExtract.facilitatorCode}}</p> -->
		                    <p>名称：{{arr.selfExtract.facilitatorName}}</p>
							<p>地址：{{arr.selfExtract.facilitatorAddress}}</p>
							<p>联系人：{{arr.selfExtract.linkman}}</p>
							<p>联系电话：{{arr.selfExtract.linkmanPhone}}</p>
		               </div>
					</li>	
				</ul>
				<ul  class="aui-list aui-media-list orderInfo ">
					<li class="aui-list-item">
					<!-- <div class="pic aui-list-item-inner"><img src="../../../static/image/demo1.png" height="300" width="300"><span>12件商品</span></div> -->
						<div class="aui-list-item-inner">
							<div class="aui-list-item-text">                                             <!--{{item.orderNo}}-->
									<div class="aui-list-item-title" ref="ordercopy" >订单编号：<span id="data">{{arr.parentOrderNo}}</span><span class="aui-font-size-14 text_c_gray"></span></div>
									<div class="aui-list-item-right aui-font-size-14 btn" ref="mycopy" :data-clipboard-text="arr.parentOrderNo"><div @click="starCopy" class="aui-btn aui-btn-outlined">复制</div></div>
							</div>
		                    <p>下单时间：{{getTime(arr.createTime)}}</p>
		                    <p v-if="childOrderList.payFinishTm">付款时间：{{getTime(childOrderList.payFinishTm)}}</p>
		                    <p v-if="arr.selfExtract">自提时间：{{getTime(arr.selfExtract.extractTime)}}</p>
		                    <!--<p>配送时间：{{getTime(item.payFinishTm)}}</p>-->
		               </div>
					</li>
				</ul>
			<div  v-for="(item,index) in arr.childOrderList" key="index+item" class="server_show">
				<ul class="aui-list aui-media-list commodity_list subtotal_list aui-margin-b-15">
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
							<div class="aui-pull-left">订单编号：</div>
							<div class="aui-pull-left text_c_gray">{{item.orderNo}}</div>
							<div class="aui-pull-right text_c_gray">共{{add(item.orderDetails)}}件</div>
						</div>
					</li>
				</ul>
				<ul class="aui-list aui-media-list commodity_list subtotal_list aui-margin-b-15" v-for="(detail, hh) in item.orderDetails">
					
						<li class="aui-list-item" @click="getGoodsCode(detail.goodsCode)">
							<div class="aui-media-list-item-inner">
								<div class="aui-list-item-media">
									<img :src="detail.goodsImg || 'static/image/demo1.png'">
								</div>
								<div id="overStyle" class="aui-list-item-inner suggest">
									<h3>{{detail.goodsName}}</h3>
									<p>型号：{{detail.goodsModel||''}}</p>					<!--此处为原价	暂时未维护-->
									<p>单价：￥{{Number(detail.goodsPrice).toFixed(2)}}{{detail.goodsUnit?'/':''}}{{ detail.goodsUnit || ''}}&nbsp;&nbsp;&nbsp;<!--<del>￥98.8</del>--></p>
								</div>
								<div class="subtotal">
									<span>￥{{Number(detail.totalValue).toFixed(2)}}</span>
									<p>x{{detail.goodsNum}}</p>
								</div>
							</div>
						</li>

					<div :class="{server_show:detail.hasService}" class="server_show server_show_1">
						<div id="service_select" class="gift_list" v-for="server in detail.orderServeList">
							<h4>[服务]</h4>
							<dl>
								<dd>
									<font>{{server.serveName}}</font>
									<span>¥{{Number(server.servePrice).toFixed(2)}}×{{server.serveNum}}</span>
								</dd>
							</dl>
						</div>

					</div>
					<!-- <router-link :to="{name:'logistics',params:{imgurl: [detail.goodsImg],orderNo:item.orderNo}}" v-if="detail.goodsType == 0">
						<div id="order_payment" class="aui-btn aui-btn-danger aui-btn-outlined" v-show="item.logisticsStatus === 1 || item.payStatus === 2">查看物流
						</div>
					</router-link> -->
				</ul>
			</div>	
				<ul class="aui-list aui-media-list commodity_list subtotal_list aui-margin-b-15">
					<li class="aui-list-item">
						<div class="total_list">
							<span>商品总价</span>
							<font>￥{{Number(totalPay).toFixed(2)}}</font>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="total_list">
							<span>大客户折扣金额</span>
							<font>￥{{Number(totalMinis).toFixed(2)}}</font>
						</div>
					</li>
					<li class="aui-list-item">
						<div class="total_text">实付金额：<span class="prices_text">¥<em>{{Number(realPay).toFixed(2)}}</em></span><span>（邮费：¥ {{Number(arr.totalFreight).toFixed(2)}}）</span></div>
					</li>
				</ul>
			</div>
			
			<!-- <ul  class="aui-list aui-media-list orderInfo" v-if="getOrderBill && getOrderBill.serialNumber">
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div style="height: 2.2rem;">
	                        <div style="float:left;line-height: 2.2rem;">
	                            <div style="text-align: left;">发票状态:</div>
	                        </div>
	                        <div style="float:left;line-height:2.2rem;margin-left: 0.3rem;" v-if="getOrderBill.url">已开票</div>
                    		<div style="float:left;line-height:2.2rem;margin-left: 0.3rem;" v-if="!getOrderBill.url">开票中</div>
	                        <div  class="" style="text-align: right;float:right;" v-if="getOrderBill.url">
			                    <div class="lookBill" @click='lookBill'style="float:inline-block;">
			                        <a :href='getOrderBill.url'>查看发票</a>
			                    </div>
			                    <div class="setMeail" @click="setEmail" style="display:inline-block;">发送邮箱</div>
		                	</div>
	                    </div>
						<div style="">
	                        <div style="display:inline-block;line-height: 2.2rem;">
	                            <div style="text-align: left;">发票抬头:</div>
	                        </div>
	                        <div style="display:inline-block;line-height:2.2rem;margin-left: 0.3rem;">{{getOrderBill.orderInvoiceTitle.personalName?getOrderBill.orderInvoiceTitle.personalName:getOrderBill.orderInvoiceTitle.companyName}}</div>
	                    </div>
	                    
	                    <div  v-if="getOrderBill.orderInvoiceTitle && getOrderBill.orderInvoiceTitle.invoicesTitleType == '1'">
	                        <div style="display:inline-block;line-height: 2.2rem;">
	                            <div style="text-align: left;">身份证号:</div>
	                        </div>
	                        <div style="display:inline-block;line-height:2.2rem;">{{getOrderBill.orderInvoiceTitle.idNumber}}</div>
	                    </div>
	                    <div v-if="getOrderBill.orderInvoiceTitle && getOrderBill.orderInvoiceTitle.invoicesTitleType == '2'">
	                        <div style="display:inline-block;line-height: 2.2rem;">
	                            <div style="text-align: left;">税号:</div>
	                        </div>
	                        <div style="display:inline-block;line-height:2.2rem;">{{getOrderBill.orderInvoiceTitle.dutyParagraphNo}}</div>
	                    </div>
	                    <div>
	                        <div style="display:inline-block;line-height: 2.2rem;">
	                            <div style="text-align: left;">发票内容:</div>
	                        </div>
	                        <div style="display:inline-block;line-height:2.2rem;">{{getOrderBill.invoiceContext}}</div>
	                    </div>
						<div>
	                        <div style="display:inline-block;line-height: 2.2rem;">
	                            <div style="text-align: left;">订单编号:</div>
	                        </div>
	                        <div id="orders" style="display:inline-block;line-height:2.2rem;margin-right: 20%;">{{orderID}}</div>
	                    </div>
					</div>
				</li>
			</ul> -->
			
			<!-- <ul class="aui-list aui-media-list" v-if="getOrderBill.length == 0 && !types">
				<li class="aui-list-item">
					发票状态:<span style="margin-left: 0.5rem;">未开票</span>
					<span style="color:#9a9a9a;font-size: 0.55rem;">
						(订单签收后，可补开)
					</span>
				</li>
			</ul> -->
			
			<!-- <ul class="aui-list aui-media-list" v-if="getOrderBill.length == 0 && types">
				<li class="aui-list-item" style="padding-right: 0.5rem;">
					<span style="float: left;line-height: 1.8rem;">
						发票状态:<span style="margin-left: 0.5rem;">未开票</span>
					</span>
					<span v-if="canInvoices && Number(realPay).toFixed(2) != 0" style="float: right;">
						<div class="aui-btn aui-btn-outlined" @click.stop="exploitBills()">
					       	 开票申请
					    </div>
					</span>
				</li>
			</ul> -->
			<!-- <ul class="aui-list aui-media-list" v-if="getOrderBill.length != 0 && !getOrderBill.serialNumber ">
				<li class="aui-list-item" v-if="!types">
					发票状态:<span style="margin-left: 0.5rem;">开票中</span>
					
				</li>
			
				<li class="aui-list-item" v-if="types">
					<div class="aui-list-item-inner">
						<div style="height: 2.2rem;">
	                        <div style="float:left;line-height: 2.2rem;">
	                            <div style="text-align: left;">发票状态:</div>
	                        </div>
                    		<div style="float:left;line-height:2.2rem;margin-left: 0.3rem;">开票中</div>
	                        <div  class="" style="text-align: right;float:right;" v-if="getOrderBill[0].url">
			                    <div class="lookBill" @click='lookBill'style="float:inline-block;">
			                   
			                        <a :href='getOrderBill[0].url'>查看发票</a>
			                    </div>
			                    <div class="setMeail" @click="setEmail" style="display:inline-block;">发送邮箱</div>
		                	</div>
	                    </div>
						<div style="">
	                        <div style="display:inline-block;line-height: 2.2rem;">
	                            <div style="text-align: left;">发票抬头:</div>
	                        </div>
	                        <div style="display:inline-block;line-height:2.2rem;margin-left: 0.3rem;">{{getOrderBill[0].orderInvoiceTitle.personalName ? 
	                        	getOrderBill[0].orderInvoiceTitle.personalName : getOrderBill[0].orderInvoiceTitle.companyName}}</div>
	                        
	                    </div>
	                    
	                    <div  v-if="getOrderBill[0].orderInvoiceTitle && getOrderBill[0].orderInvoiceTitle.invoicesTitleType == '1'">
	                        <div style="display:inline-block;line-height: 2.2rem;">
	                            <div style="text-align: left;">身份证号:</div>
	                        </div>
	                        <div style="display:inline-block;line-height:2.2rem;">{{getOrderBill[0].orderInvoiceTitle.idNumber}}</div>
	                    </div>
	                    <div v-if="getOrderBill[0].orderInvoiceTitle && getOrderBill[0].orderInvoiceTitle.invoicesTitleType == '2'">
	                        <div style="display:inline-block;line-height: 2.2rem;">
	                            <div style="text-align: left;">税号:</div>
	                        </div>
	                        <div style="display:inline-block;line-height:2.2rem;">{{getOrderBill[0].orderInvoiceTitle.dutyParagraphNo}}</div>
	                    </div>
	                    <div>
	                        <div style="display:inline-block;line-height: 2.2rem;">
	                            <div style="text-align: left;">发票内容:</div>
	                        </div>
	                        <div style="display:inline-block;line-height:2.2rem;">{{getOrderBill[0].invoiceContext}}</div>
	                    </div>
						<div>
	                        <div style="display:inline-block;line-height: 2.2rem;">
	                            <div style="text-align: left;">订单编号:</div>
	                        </div>
	                        <div id="orders" style="display:inline-block;line-height:2.2rem;margin-right: 20%;">{{orderID}}</div>
	                       
	                    </div>
					</div>
				</li>
			</ul> -->
			<!--<span>{{getOrderBill[0].rid}}</span>-->
		</div>
		<!--商品列表 end-->
		<mt-popup ref="BillDetail" v-model="popupVisible" popup-transition="popup-fade" modal="true" closeOnClickModal="true" class="setEmail">
			<Bill-SetEmail  @hideModal="updateType" :orderNos="getOrderBill.orderNo ? getOrderBill.orderNo:''" :parentOrderNo = "orderID ? orderID : ''"></Bill-SetEmail>
		</mt-popup>
	</div>
	<!-- <div style="height:3rem;"></div> -->
	</div>
</template>

<script>
import { willPay, selectSpStInstallListByOrderid, selectSpFxMaintenanceListByOrderid } from '../config/getData.js'
import { Toast } from '../../utils/toast2.js'
//import api from '../../api/index.js'
import axios from 'axios'
import moment from 'moment';
import Clipboard from 'clipboard';
import { mapState, mapGetters, mapMutations } from "vuex";
import { Popup ,MessageBox} from 'mint-ui';
import BillSetEmail from "../../components/BillSetEmail";
import api from "../../api";
export default {
	data() {
		return {
			orderID: '',
			arr: '',
			goodsArr: [],
			orderServeList: null,
			logisticsStatus: '',
			serviceCount: 0,
			num: null,
			orderNum: null,
			isSelfExtract:true,
			orderInvoice:null,
			invoice_type:'',
			invoice_title:'',
			totalMinis: 0,//总共减免
			totalPay: 0 ,//总金额
			realPay: 0 ,//实付
			childOrderList: '',
			totalNum:null,//商品总数
			protocolType: false,//包含的工单类型
			protocol: '',
			popupVisible : false,
			types:'',//是哪一类型的订单详情
			real:"",//判断是否开票过7天的标识
			canInvoices:"",
			return: '',
		}
	},
	async created() {
		await this.getOrderId();
		await this.isInstallInfo();
		await this.getOrderInfo();
		this.canInvoices = this.$router.history.current.query.canInvoice;
		this.getBillhead();
		if(this.$router.history.current.query.orderStatus == 4 || this.$router.history.current.query.types == "已签收"){
			this.types = true;
		}else{
			this.types = false;
		}
		
//		if(this.$router.history.current.query.types == "已签收"){
//			this.types = true;
//		}else{
//			this.types = false;
//		}
		// alert(1)
	},
	components:{
//		"my-header":MyHeader,
        // ButtonToTop,
        'mt-popup': Popup,
        "Bill-SetEmail": BillSetEmail,
	},
	computed: {
	    ...mapGetters('hzh', [
	        'saveBillshead',
	    ]),
	    getOrderBill() {
//	    	return this.$store.dispatch('hzh/GetOrderBills');//GetOrderBills
            return this.$store.state.hzh.orderBills;
        },
	    
	},
	methods: {
		 // 复制成功
	    onCopy(e){
	    	MessageBox.alert('复制成功')
	      	console.log(e);
	    },
	    // 复制失败
	    onError(e){
//	      	alert("失败");
			MessageBox.alert('复制失败')
	    },
		lookBill(){
			
		},
		setEmail() {
//          this.popupVisible = true;
            MessageBox.prompt('请输入邮箱地址').then(({ value, action }) => {
			  	//邮箱验证
				var regEmail=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if(!regEmail.test(value)){
	                MessageBox.alert("邮箱格式不正确")
	                return;
	            }
	        	var sessionId = localStorage.getItem('sessionId');
	            let email = value;
	            let parentOrderNo = this.$router.history.current.query.shopId;
	            console.log("nihaoa122121",this.parentOrderNo)
	            var url = window.api.local_host + api.setEmail + parentOrderNo +"/"+ email;
	//			var url = "http://test.mall.yn.weilian.cn"+ api.deleteBills;
	            var config = {
	               url :url,
	//             data:datas,
	               method:"PUT",
	               headers: {'sessionId': sessionId, 'Content-Type':'application/json', 'Accept' : 'application/json'},
	            }
	            axios(config).then((res) => {
	                console.log("guojilaoa666666666666", res)
	                if(res.data.returnCode === 1){
	                    MessageBox.alert("发送成功").then(action => {
	//					  	this.$store.dispatch('hzh/GetBillheads');//查询发票抬头
	//					  	this.$router.push('/main/HeadManagement');
//						  	this.deteles();
						});
	                    
	                }else if(res.data.returnCode === 0){
	                	MessageBox.confirm(res.data.errmsg)
	//              	.then(action => {
	//	                   this.$router.push('/login');
	//	                });
	                }
	            
	            })
			});
        },
        updateType(data) {
			this.popupVisible = data.detele;//改变了父组件的值 
		},
		ismobile(test){
			var u = navigator.userAgent, app = navigator.appVersion;
		    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
			    if(window.location.href.indexOf("?mobile")<0){
				    try{
				        if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
				        	return '0';
				        }else{
				        	return '1';
				        }
				    }catch(e){}
			    }
		    }else if( u.indexOf('iPad') > -1){
		        return '0';
		    }else{
		        return '1';
		    }
		},
		starCopy(){
			let num = this.ismobile(1);
			console.log("复制",num)
			if(num == '0'){
				if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) { //ios  
		            var copyDOM = document.querySelector('#data');  //要复制文字的节点    
		            var range = document.createRange();
		            // 选中需要复制的节点    
		            range.selectNode(copyDOM);  
		            // 执行选中元素    
		            window.getSelection().addRange(range);    
		            // 执行 copy 操作    
		            var successful = document.execCommand('copy');   
		            try {      
		                var msg = successful ? 'successful' : 'unsuccessful';   
		            } catch(err) {      
		            } 
		            if(msg){
		            	Toast({
								message: '复制成功',
								iconClass: "aui-iconfont aui-icon-correct",
								duration: 1000
							});
		            }
		            // 移除选中的元素    
		            window.getSelection().removeAllRanges();    
		        } 
			}
	              
		},
		starCopys(){
			let num = this.ismobile(1);
			if(num == '0'){
				if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) { //ios  
		            var copyDOM = document.querySelector('#orders');  //要复制文字的节点    
		            var range = document.createRange();
		            // 选中需要复制的节点    
		            range.selectNode(copyDOM);  
		            // 执行选中元素    
		            window.getSelection().addRange(range);    
		            // 执行 copy 操作    
		            var successful = document.execCommand('copy');   
		            try {      
		                var msg = successful ? 'successful' : 'unsuccessful';   
		            } catch(err) {      
		            } 
		            if(msg){
		            	Toast({
								message: '复制成功',
								iconClass: "aui-iconfont aui-icon-correct",
								duration: 1000
							});
		            }
		            // 移除选中的元素    
		            window.getSelection().removeAllRanges();    
		        } 
			}
	              
		},
		getRef() {
			let num = this.ismobile(1);
            if(true){
            	const clipboard = new Clipboard('.btn');
				if(Clipboard.isSupported()) {
					clipboard.on('success', function(e) {
						Toast({
								message: '复制成功',
								iconClass: "aui-iconfont aui-icon-correct",
								duration: 1000
							});
						clipboard.destroy();
					});
					clipboard.on('error', function(e) {
						Toast({
		                        message: '复制失败',
		                        iconClass: "aui-iconfont aui-icon-close",
		                        duration: 1000
		                    });
					});
				} 

            }
		},
		async fetchData() {

			let res = await willPay(this.$route.query.shopId);
			if(res.returncode == 0) {
				Toast({
					message: res.errmsg,
					iconClass:"aui-iconfont aui-icon-close",
					duration: 500
				});

				return
			}
		},
		getTime(data) {
			if(data != null ||data != undefined){
				return moment(data).format('YYYY.MM.DD HH:mm');
			}
			
		},
		async isInstallInfo(){
			let [res, req ,ref] = await Promise.all([selectSpStInstallListByOrderid(0+"/"+this.orderID),selectSpStInstallListByOrderid(1+"/"+this.orderID), selectSpFxMaintenanceListByOrderid(this.orderID)]);

			if(res.data.length || ref.data.length || req.data.length){
				this.protocolType = true;
				if(res.data.length)this.protocol = res.data[0].installtype;
				if(req.data.length)this.protocol = req.data[0].installtype;
				if(ref.data.length)this.protocol = ref.data[0].maintenancetype+2;
			};

		}
		,
		turnInstall(){
			console.log(this.protocol);
			this.$router.push({path:'/main/install',query:{serviceNo:this.protocol,parentNo:this.arr.parentOrderNo}});
		},
		getOrderId() {
			this.orderID = this.$route.query.shopId;
			this.num = this.$route.query.orderStatus;
			this.return = this.$route.query.orderRefound;
		},
	 	getOrderInfo() {
			let sess = window.localStorage.getItem('sessionId');
			// /order/selectOrderDetailYN/
			let url = window.api.local_host + '/order/selectOrderDetailYN/' + this.orderID;
			let config = {
				url: url,
				headers: {
					'sessionId': sess,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			};

			axios(config).then(res => {
				this.arr = res.data.data[0];
				this.childOrderList = res.data.data[0].childOrderList[0];
				for(let i of this.arr.childOrderList){
					this.totalPay += i.totalPay;
					this.totalMinis += i.totalMinis;
					this.realPay += i.realPay;
				}
			})
		},
		getOrder() {
			return this.orderNum;
		},
		getGoodsCode(val){
				this.$router.push('/detail/'+val);
		}
		,
		add(val){
			let  j = null;
			for(let i of val){
				j += i.goodsNum;
			}
			return j;
		},
		turn(){
			this.$router.go(-1);
		},
		//查询发票抬头
        getBillhead(){
        	console.log("有没有执行啊********")
        	let data = this.$router.history.current.query.shopId;
        	this.$store.dispatch('hzh/GetOrderBills',data);
        	
        },
        async exploitBills(){
        	
			let shopId = this.$router.history.current.query.shopId;
			let orderNo = this.$router.history.current.query.orderNo;
			let confirmTime = this.$router.history.current.query.confirmTime;
			let canInvoice = this.$router.history.current.query.canInvoice;

			if(!canInvoice){
				MessageBox.alert("该订单不能开票")
				return;
			}
//			await this.getTimes(confirmTime);
			if(this.real){
				return;
			}
	      	this.$router.push({name:'BillDetail',query:{datas:orderNo,parentOrderNo:shopId}})
        },
        //判断是否是开票申请7天后
		getTimes(item){
			console.log("item的值",item)
			//获取当前时间戳
			var timestamp = new Date().getTime();
			var configTime = item;
			var differData = timestamp - configTime;
			//计算毫秒
			var sorc = differData/1000;
			//计算分钟数
			var mins = sorc/60;  
			//计算小时数
			var hours = mins/60; 
			console.log("differData11111",sorc,mins,hours)
			
			if(mins < 30){
				this.real = true;
				MessageBox.alert("确认收货七天之后才能补开发票")
			}
			
		},
	},
	watch: {
		arr() {
			setTimeout(() => {
				//console.log(this.$refs);
				this.getRef();
			}, 20);
		},
		getOrderBill(newdata,olddata){
			return newdata
		}
	}
	,
		
}
</script>
<style scoped="scoped">
.container{
	background: #eaeaea;;
}
#orderDiv .aui-margin-b-15 {
	margin-bottom: 0 !important;
}

.orderInfo {
	margin-top: 0.75rem;
	/*margin-bottom: 0.75rem;*/
}

#overStyle h3 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
.server_show_1 {
	width: 92%;
	margin: auto;
}
.server_show::after {
		background-color: #fff2f2;
		border: none;
	}

.install {
	position: absolute !important;
	right: 1rem;
	top:0.4rem;
}
.total_text {
	padding-right: 0;
}
.lookBill{
    border: 1px solid rgb(153, 153, 153);
    border-radius: 0.34rem;
    width: 3.2rem;
    height: 1.5rem;
    display: inline-block;
    line-height: 1.5rem;
    text-align: center;
}
.setMeail{
    border: 1px solid rgb(153, 153, 153);
    border-radius: 0.34rem;
    width: 3.2rem;
    height: 1.5rem;
    display: inline-block;
    line-height: 1.5rem;
    text-align: center;
}	
.copy{
	border: 1px solid rgb(153, 153, 153);
	width: 2.2rem;
	height: 1.4rem;
	display: inline-block;
	text-align: center;
	line-height: 1.4rem;
	border-radius: 0.34rem;
	margin-left: 20%;
}
.setEmail{
    width: 80%;
	height: 30%;
	border-radius: 0.4rem;
}
</style>