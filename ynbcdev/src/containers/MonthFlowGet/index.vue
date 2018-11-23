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
				<div class="aui-title">领流量</div>
			</header>
			<div style="height: 3rem;"></div>
			<div class="aui-content">
				<div class="flowGettitlt">
					<span class="getflowyuan" @click="getFlow">{{ifchargedata}}</span>
					<p><span v-if="ifcharge==0 || ifcharge==1">本月已领取月度赠送流量</span><span v-if="ifcharge==0">，</span><span v-if="ifcharge==0" class="gouse" @click="jumpEventRecharge">去充值</span></p>
				</div>
				<div class="flowGetRule">
					<h3>领取规则</h3>
					<div>
						<div style="float: left;">
							<p style="height: 2.1rem;">1.</p>
							<p style="height: 1.05rem;">2.</p>
							<p style="height: 2.1rem;">3.</p>
						</div>
						<div style="float:left;width: 95%;">
							<p>月固定赠送流量包由翌能免费提供，具体流量数额以实际领取结果为准。</p>
							<p>每个用户每个月只能用大礼包充值一次。</p>
							<p>月领取的流量大礼包在当月（自然月）内充值有效，领取后如不为终端充值，过期自动作废。</p>
						</div>
						<!--<div style="clear: both;"></div>-->
					</div>
				</div>
			</div>
		</div>
		<Recharge ref="recharge"></Recharge>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	import { Toast } from "../../utils/toast2";
	import Recharge from "../../components/Recharge";
	import axios from 'axios'
	import { mapGetters, mapMutations } from "vuex";
	import { getUserInfoAgain } from '../../components/config/getData.js'
	export default {
		props: {

		},
		data() {
			return {
				vipid: "",
				enterpriseid: "",
				ifcharge: null,
				receiveflow: "",
				monthdtlid: "",
				ifdistribute: null,
				ifauditdistribute: null,
			}
		},
		components: {
			Recharge,
		},
		computed: {
			...mapGetters("gwModules", [
				"getCurrentRechargeResult"
			]),
			userInfo() {
				return this.$store.state.xhModules.userInfo
			},
			ifchargedata() {
				if(this.ifdistribute == 2 || this.ifcharge == 0 || this.ifcharge == 1) {
					return '已领取'
				} else if(this.ifdistribute == 1 || this.ifauditdistribute == 0) {
					return '领流量'
				}
			},
		},
		methods: {
			...mapMutations("xhModules", [
				"USER_INFO",
				"LOGO_IN",
				"LOGO_OUT",
			]),
			//返回上一个页面
			goBack() {
				 this.$router.replace({'path': 'profile'});
			},
			//获取用户相关信息
			async getsessionvipid() {
				var sessionId = localStorage.getItem('sessionId');
				if(this.userInfo) {
					this.vipid = this.userInfo.vipid
					this.enterpriseid = this.userInfo.enterpriseid
					this.getMonthFlow()
				} else {
					let response = await getUserInfoAgain(sessionId);
					if(response.returncode === 0) {
						this.LOGO_OUT(false);
						return
					}
					this.LOGO_IN(true);
					this.USER_INFO(response.data[0]);
					this.vipid = response.data[0].vipid
					this.enterpriseid = response.data[0].enterpriseid
					this.getMonthFlow()
				}
			},
			//获取用户流量相关信息
			getMonthFlow() {
				let config = {
					url: api.mall_base_host + 'flowMonthDtl/ifGetMonthFlow',
					method: 'GET',
					params: {
						'enterpriseid': this.enterpriseid,
						'vipid': this.vipid,
					},
				};
				axios(config).then((res) => {
					this.ifauditdistribute = res.data.data[0].ifauditdistribute
					this.ifdistribute = res.data.data[0].ifdistribute
					this.ifcharge = res.data.data[0].flowMonthDtl.ifcharge
					this.receiveflow = res.data.data[0].flowMonthDtl.receiveflow
					this.monthdtlid = res.data.data[0].flowMonthDtl.monthdtlid
				})
			},
			//点击领取
			getFlow() {
				if(this.ifauditdistribute == 0) {
					Toast({
						message: "活动未开启",
						type: 'warn',
						duration: 2000
					})
					return
				} else if(this.ifauditdistribute == 1) {
					if(this.ifcharge == 0 || this.ifcharge == 1) {
						return
					}
					let config = {
						url: api.mall_base_host + 'flowMonthDtl/saveFlowMonthDtl',
						method: 'GET',
						params: {
							'enterpriseid': this.enterpriseid,
							'vipid': this.vipid,
						},
					};
					axios(config).then((res) => {
						if(res.data.returnCode == 1) {
							var flowdata = res.data.data[0]
							this.receiveflow = flowdata.receiveflow
							this.monthdtlid = flowdata.monthdtlid
							var flowdataAlet = {
								state: 1,
								successTitle: "领取成功",
								number: this.receiveflow,
								rechargeParams: {
									monthdtlid: this.monthdtlid
								}
							}
							this.$refs.recharge.rToast(flowdataAlet)
							if(this.getCurrentRechargeResult) {
								this.getMonthFlow()
							} else {
								this.ifcharge = flowdata.ifcharge
							}
						} else {
							Toast({
								message: '活动结束，领取失败',
								iconClass: "aui-iconfont aui-icon-close",
								duration: 1000
							});
						}
					})
				}
			},
			jumpEventRecharge() {
				this.$router.push({
					path: 'trafficTopUp',
					query: {
						item: {
							receiveflow: this.receiveflow,
							monthdtlid: this.monthdtlid
						}
					}
				})
			},

		},
		watch: {

		},
		created() {
			var sessionId = localStorage.getItem('sessionId');
			if(!sessionId || sessionId == 'undefined') {
				Toast({
					message: "请先登录。",
					type: 'warn',
					duration: 2000
				})
				this.$router.replace({'path': '/login',query:{page:'MonthFlowGet'}});  
			}
		},
		mounted() {
			this.getsessionvipid()
		}
	}
</script>

<style scoped="scoped">
	.flowGettitlt {
		height: 12rem;
		text-align: center;
		background: url(../../../static/image/flowbanner.png) no-repeat center;
		background-size: cover;
	}
	
	.getflowyuan {
		display: inline-block;
		color: #0F8DE0;
		font-size: 1rem;
		margin-top: 1rem;
		height: 6.5rem;
		width: 6.5rem;
		line-height: 6.5rem;
		background: url(../../../static/image/getflowyuan.png) no-repeat center;
		background-size: cover;
	}
	
	.flowGettitlt p {
		color: #fff;
		margin-top: 0.3rem;
	}
	
	.flowGettitlt p .gouse {
		color: #FCD21D;
	}
	
	.flowGetRule {
		background-color: #fff;
		padding: 2rem 1rem 8.5rem 1rem;
	}
	
	.flowGetRule h3 {
		text-align: center;
		margin-bottom: 1rem;
	}
	
	.flowGetRule h3::before,
	.flowGetRule h3::after {
		content: '';
		height: 1px;
		width: 1.8rem;
		background: #a9a9a9;
		display: inline-block;
		margin: 0.3rem 1rem;
	}
</style>