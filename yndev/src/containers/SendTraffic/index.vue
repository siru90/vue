<template>
	<div>
		<div class="vue_app" style="position: absolute;width: 100%">
			<!--头部-->
			<header class="aui-bar aui-bar-nav aui-bar-light">
				<div class="go-back" @click.stop="goBack">
					<i></i>
					<i></i>
					<i></i>
				</div>
				<div class="aui-title">我的流量</div>
			</header>

			<div style="height: 3rem;"></div>
			<div style="position:fixed;top:2.75rem;overflow: visible; width: 100%;height:2.2rem;z-index: 10">
				<tab-head :titleInfor="headList">

				</tab-head>
			</div>
			<div class="centent" style="position:relative;margin-top: 2.5rem;">
				<div class="aui-content">
					<!--<translate-test :lengths="3" ref="translateGroup">-->
					<transition-group :name="animateClassName">
							<ul class="aui-list aui-media-list address_list top_div" :key="1">
								<li class="aui-list-item" v-for="(item,index) in flowInitData" :key="index" style="padding-left:0.75rem;background: none;border-top: 0;">
									
									<div class="aui-media-list-item-inner">
										<!--<div class="aui-list-item-media">
											<img :src="'static/image/demo1.png'">
										</div>-->
										<ul class="delivery_list" style="width: 0;height: 100%;position: absolute;left: 0.75rem;top: 0.7rem;">
											<li>
												<i class="line_icon"></i>
											</li>
										</ul>
										<div class="aui-list-item-inner" style="width: 100%;padding-bottom: 0;">
											<p v-if="item.fullSend" style="padding-bottom: 0.5rem;">订单编号：{{item.orderno}}</p>
											
											<p v-else style="padding-bottom: 0.5rem;">{{getTime()}}时间：{{getTimeNewDate(item.receivetime)}}</p>
											<div style="background: #FFFFFF;width: 100%;position: relative;">
												<div style="padding: 0.3rem;">
													<p><span class="getFlowTitle">{{flowName()}}：</span><span class="getFlowContent">{{item.receiveflow || item.flow || 0}} m</span><span v-if="activeNum == 3" class="getFlowContent">/{{item.remainFlow}}m</span></p>
													<p v-if="item.ifcharge == 1 || activeNum == 3 ">终端编号：{{item.terminalno}}</p>
													<p v-if="item.ifcharge == 1 || activeNum == 3 ">车牌号码：{{item.plateno}}</p>
												</div>                   
												<!--//ifcharge是否充值 0 未充值  1 已充值  isvalid  1是有效  0是无效-->
												<span class="addMoneyBtn" v-if="item.ifcharge == 0 && activeNum != 3 && item.isvalid == 1" @click="toSendMoney(item)">去充值</span>
												<!-- 傻鸟后端同一个接口给的字段竟然不一样 -->
												<span v-if="!item.rechargestatus && item.fullSend" class="addMoneyBtn"  @click="toSendMoney(item)">去充值</span>
											</div>
										</div>
									</div>
								</li>
							</ul>
						<!--</div>-->
					</transition-group>
					<!--</translate-test>-->
				</div>
			</div>
			<recharge ref="Recharge"></recharge>
			<!--头部-->
		</div>
		 <!--暂无数据时显示-->
	        <div id="contorlShow" v-if="!initData || !initData.length">
				<div id="disShow">
					<img src="../../../static/image/no_data.png" alt="" />
					<p>暂无流量信息</p>
					<!--<p @click="toGetZhongDuan">获取终端</p>-->
				</div>
			</div>
	</div>
</template>
<script>
	//import {gwToast} from "../../utils/toast";
	//import { MessageBox } from 'mint-ui';
	//import {Toast} from "../../utils/toast2";
//	import TabHead from "../../components/TabHead";
	import TabHead from "./zxHeader.vue";
	import TranslateTest from "../../components/TranslateTest";
	import Recharge from "../../components/Recharge";
	import { mapGetters, mapMutations } from "vuex";
	import axios from 'axios';
	export default {
		props: {

		},
		data() {
			return {
				headList: [{
						goodsClassId: "1",
						goodsClassName: "签到流量"
					},
					{
						goodsClassId: "2",
						goodsClassName: "流量大礼包"
					},
					{
						goodsClassId: "4",
						goodsClassName: "满送流量"
					},
					{
						goodsClassId: "3",
						goodsClassName: "终端流量"
					},
					
				],
				initData:[],  // 视图渲染数组
				checkinFlowList:[], // 签到流量
				monthFlowList:[], // 月度流量
				zhongDuanList:[], //终端流量
				fullSendFlow:[],  // 满送流量
				animateClassName: "slide-left",
				activeNum:0
			}
		},
		components: {
			"TabHead": TabHead,
			"TranslateTest": TranslateTest,
			"Recharge":Recharge
		},
		computed: {
			num () {
		      	return this.$store.state.jyModules.classifyIndex;
		    },
//		    getDataAgin(){
//		    	return this.$store.state.gwModules.getCurrentRechargeResult;
//		    },
		    flowInitData(){
		    	return this.initData;
		    },
		    ...mapGetters("xhModules", [
				"userInfo"
			]),	
			...mapGetters("gwModules", [
				"getCurrentRechargeResult"
			]),
		},
		methods: {
			//返回上個人中心页
			goBack() {
//				window.history.back();
				this.$router.push('profile')
			},
			changeInitData(num){
				if(num == 0){
					this.initData = this.checkinFlowList;
					
				}else if(num == 1){
//					console.log(this.monthFlowList,'这是子的季节')
					this.initData = this.monthFlowList;
				}else if (num == 2) {
					this.initData = this.fullSendFlow
				}
				else{
					console.log(this.zhongDuanList,44444)
					this.initData = this.zhongDuanList;
				}
			},
			//是否充值过
			async sendMoneyFlag(){
				let isFirstRecharge = await this.$store.dispatch('gwModules/queryRechargeInfo');
				return isFirstRecharge;
			},
			//去充值点击事件
			async toSendMoney(item){
				
				let flag = await this.$store.dispatch('gwModules/queryRechargeInfo');
				if(flag) {
					this.$router.push({path:'trafficTopUp',query:{item:item}});
				} else {
					//整个对象传过去 下个页面有哪个id就会取哪个id
					this.$refs.Recharge.rToast({state: 2,rechargeParams:item});
				}
			},
			//显示不同的时间前缀
			getTime(){
				if(this.activeNum == 0){
					return '签到';
				}else if(this.activeNum == 1){
					return '领取';
				}else if(this.activeNum == 3){
					return '更新';
				} else if (this.activeNum == 2) {
					return "获得"
				}
			},
			//显示流量信息
			flowName(){
				if(this.activeNum == 0 || this.activeNum == 1 || this.activeNum == 2){
					return '获得流量';
				}else if(this.activeNum == 3){
					return '本月已用流量/可用流量';
				}
			},
			//保持回复原样
			noChange() {
				let query = this.$route.query.num;
				if(query) {
					this.$store.state.jyModules.classifyIndex = query;
				} else {
					this.$store.state.jyModules.classifyIndex = 0;
				}
			},
			//首次进来给 initDate 赋值
			firstInitDate(){
				if(this.activeNum == 0){
					this.initData = this.checkinFlowList;
				}else if(this.activeNum == 1){
					this.initData = this.monthFlowList;
				}else if(this.activeNum == 3){
					this.initData = this.zhongDuanList;
				}else if (this.activeNum == 2) {
					this.initData = this.fullSendFlow
				}
			},
			//获取当月最后一天  此方法未调用 采用后台的isvalid字段 1 有效
			getCurrentMonthLast(){
				var date = new Date();
				var currentMonth = date.getMonth();
				var nextMonth =++ currentMonth;
				var nextMonthFirstDay = new Date(date.getFullYear(),nextMonth,1);
				var oneDay = 1000*60*60*24;
//				var startTime = date.setDate(1).getTime();  
				var endTime = new Date(nextMonthFirstDay-oneDay).getTime();
				console.log(endTime,'月结束时间');
//				console.log(new Date(nextMonthFirstDay-oneDay),startTime,'888588585855');
//				console.log(time.getTime(),'332323时间戳');
				//当天开始时间和结束时间 的时间戳
				var start = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime();
				var end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1).getTime();
				
				console.log(start,end,'时间戳');
			},
			//获取满送流量
			getfullSendFlow() {
				
				let url = window.api.mall_sale_host + 'sale/getFlowInfoByVipid'
				//let url = 'http://test.sale.scn.weilian.cn/sale/getFlowInfoByVipid?enterpriseid=138&vipid=1192203'
				let params = {
					vipid:this.userInfo.vipid,
					enterpriseid:window.api.enterpriseid
				}
				const axoption = {
					method: 'get',
					url:url,
					params
				}
				axios(axoption).then(res => {
					let arr = []
					
					try {
						arr = res.data.data[0]
					} catch (e) {
						
					}
					arr.forEach(e => {
						e.fullSend = true
						e.ifcharge = e.rechargestatus
						e.terminalno = e.terminalnum
						e.plateno = e.platenum
					});
					this.fullSendFlow = arr
				}).catch(err => {
					console.log(err)
					
				})
			},
			//获取签到和月固定流量信息				
			getMonthAndQian(){
				let url = window.api.mall_base_host + 'flowCheckin/queryCheckinAndMonthFlowInfo';
				let params = {
					vipid:this.userInfo.vipid,
					enterpriseid:window.api.enterpriseid
				}
				let config = {
					method:'GET',
					url:url,
					params
				}
				axios(config).then((res)=>{
					console.log(res.data.returnCode,'接口获取信息');
					if(res.data.returnCode == 1){
						this.checkinFlowList = res.data.data[0].checkinFlowList;
						this.monthFlowList = res.data.data[0].monthFlowList;
						
						//模拟数据
//						let arr1 =  [{
//								"receiveflow": 16,
//								"receivetime":'xxx',
//								"terminalno":'xxx',
//								"ifcharge": 1,
//								"checkindtlid":55
//							},{
//								"receiveflow": 16,
//								"receivetime":'xxx',
//								"terminalno":'xxx',
//								"plateno":'xxx',
//								"ifcharge": 1,
//								"checkindtlid":55
//							},{
//								"receiveflow": 16,
//								"receivetime":'xxx',
//								"terminalno":'xxx',
//								"plateno":'xxx',
//								"ifcharge": 2,
//								"checkindtlid":55
//							},			
//						]
//						let arr2 =  [{
//								"receiveflow": 16,
//								"receivetime":'xxx',
//								"terminalno":'xxx',
//								"ifcharge": 1,
//								"monthdtlid":55
//							},{
//								"receiveflow": 16,
//								"receivetime":'xxx',
//								"terminalno":'xxx',
//								"plateno":'xxx',
//								"ifcharge": 1,
//								"monthdtlid":55
//							},{
//								"receiveflow": 16,
//								"receivetime":'xxx',
//								"terminalno":'xxx',
//								"plateno":'xxx',
//								"ifcharge": 2,
//								"monthdtlid":55
//							},			
//						]
//						this.monthFlowList = arr2;
//						this.checkinFlowList = arr1;
						this.firstInitDate();
					}
					
				})
			},
			//转换时间格式
		    getTimeNewDate(param){
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
		
//		        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
		        return year + '-' + month + '-' + day;
		      },
			//获取终端流量信息
		    async getZhongDuan(){
				let url = window.api.mall_base_host + 'flowMonthDtl/getCarMsgMore';
				let params = {
					vipid:this.userInfo.vipid,
					enterpriseid:window.api.enterpriseid,
					ucid: (await this.$store.dispatch("gwModules/queryUcUserInfo")).userId
				}
				let config = {
					method:'GET',
					url:url,
					params
				}
				axios(config).then((res)=>{
					console.log(res.data.returnCode);
					if(res.data.returnCode == 1){
						console.log(res.data.data[0],'终端流量信息');
						if(res.data.data[0]){
							var obj = {};
							if(res.data.data[0].dtuFlowUsed){
								obj.receiveflow = res.data.data[0].dtuFlowUsed.used_flow;  // 本月已用流量
								obj.remainFlow = res.data.data[0].dtuFlowUsed.remain_flow;  // 本月可用流量
								obj.receivetime = res.data.data[0].dtuFlowUsed.flow_time;   //更新时间
							}
							obj.terminalno = res.data.data[0].terminalno;  //终端号
							obj.plateno = res.data.data[0].plateno;  // 车牌号
							this.zhongDuanList.push(obj);
						}
//						this.zhongDuanList = res.data.data[0].zhongDuanList;
					}
					
				})
				
//				{
//	                "dtu_id": "123456",
//	                "flow_time": 1517046361631,
//	                "used_flow": 23,
//	                "remain_flow": 123,
//					"terminalno":'xxx',
//					"plateno":'xxx'
//	            }
//				let arr =  [
//					{
//						"receiveflow": 16,
//						"receivetime":'xxx',
//						"terminalno":'xxx',
//						"plateno":'xxx'
//					}		
//				]
//				this.zhongDuanList = arr;
				this.firstInitDate();
			}
		},
		watch: {
			num(newdd, olddd) {
				console.log(this.$store.state.jyModules.classifyIndex,'55')
				if(newdd - olddd > 0) {
					this.animateClassName = "slide-right"
				} else {
					this.animateClassName = "slide-left"
				}
				this.activeNum = this.$store.state.jyModules.classifyIndex;
				this.changeInitData(this.$store.state.jyModules.classifyIndex);
			},
			
			getCurrentRechargeResult(newVal,oldVal){
				console.log(newVal,'是否充值成功')
		    	if(newVal){
		    		this.getMonthAndQian();
					this.getZhongDuan();
					this.noChange();
					this.getfullSendFlow()
					this.$store.commit("gwModules/setCurrentRechargeResult", false);
		    	}
			}

		},
		created(){
			this.getfullSendFlow()
			this.getMonthAndQian();
			this.getZhongDuan();
			this.noChange();
			
		},
		mounted(){
			this.activeNum = this.$store.state.jyModules.classifyIndex;
//			this.getCurrentMonthLast();
		}
	}
</script>

<style scoped="scoped">
	.slide-fade-enter-active {
		transition: all .18s ease;
	}
	
	.slide-fade-leave-active {
		transition: all .18s ease;
	}
	
	.slide-fade-enter,
	.slide-fade-leave-to {
		transform: translateX(100%);
	}
	
	.slide-left-enter-active,
	.slide-right-leave-active,
	.slide-left-leave-active,
	.slide-right-enter-active {
		transition: all .18s ease;
	}
	
	.slide-left-enter,
	.slide-right-leave-to {
		transform: translateX(100%);
	}
	
	.slide-left-leave-to,
	.slide-right-enter {
		transform: translateX(-100%);
	}
	.addMoneyBtn{
		position: absolute; 
		top: 50%; 
		right: 0;
		transform: translateY(-50%);
	    border: 1px solid;
	    border-radius: 0.2rem;
	    margin-right: 0.5rem;
	    padding: 0.1rem 0.2rem;
	    color: #169BD5;
	    background-color: #FFFFFF;
	    white-space: nowrap;
	}
	.delivery_list li .line_icon {
	    display: block;
	    width: 0.4rem;
	    height: 0.4rem;
	    background: #ccc;
	    border-radius: 100%;
	    -webkit-border-radius: 100%;
	    position: absolute;
	    left: -1.25rem;
	    top: 0px;
	}
	.delivery_list{
		border-left: 1px solid #ccc;
	}
	/*暂无数据样式*/
	#contorlShow{
		position: absolute;
	    top: 50%;
	    transform: translateY(-50%);
	}
	#disShow{
		/*width: 50%;*/
		height: 50%;
		margin: 0 auto;
	}
	#disShow img{
		width: 50%;
		margin: 0 auto;
	}
	#disShow p{
		text-align: center;
		margin-top:1.5em;
	}
	.getFlowTitle{
		color: black;
	}
	.getFlowContent{
		 color: #169BD5;
	}
</style>