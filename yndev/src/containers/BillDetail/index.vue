<template>
	<div class="vue_app giftCardInstrutAbout myContent" style="position: absolute;width: 100%;">
	
		<!-- <my-header :title="'发票'" :hasTitle="true" :hasBack="true"></my-header> -->
		<header class="aui-bar aui-bar-nav aui-bar-light" style="border-bottom: 0;">
				<div class="go-back"  @click.stop="mGoBack">
					<i></i>
					<i></i>
					<i></i>
				</div>
			<div class="aui-title">{{titles}}</div>
			<div @click.stop="BillNeedKonw" style="margin-right: 3%;font-weight:400;position: absolute;top: 0px;right: 0rem;height: 100%;">
				发票须知
			</div>
		</header>
		<div class="aui-content top_div overhidAbout" style="flex:1;overflow-y:auto;margin-top: 3rem;margin-bottom:0;">
			<!-- 发票类型 -->
			<Bill-Type v-if="ApplyBill"  @showContent="updateContent" :isChooses = "isChooses"></Bill-Type>
			<!-- <div class="aui-content aui-margin-b-15">
				<div class="aui-list aui-list-in">
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-title">发票类型</div>
						</div>
					</li>
					<div class="aui-list">
						<label style="padding-left: 0.2rem;">
							<input class="aui-checkbox" type="checkbox" v-model="isChecked">
							<span>不开发票</span>
						</label>
						<label>
							<input class="aui-checkbox" type="checkbox" v-model="isChecked">
							<span>电子发票</span>
						</label>
					</div>
				</div>
			</div> -->
			<!-- 发票抬头 -->
			<Bill-Rise v-if="isShows"></Bill-Rise>
			<!-- <div class="aui-content aui-margin-b-15">
				<div class="aui-list aui-list-in">
					<ul class="aui-list aui-list-in">
						<li class="aui-list-item">
							<div class="aui-list-item-inner">
								<div class="aui-list-item-title"><a>发票抬头</a></div>
								<div id="co_totalMoney" class="aui-list-item-right"><span>管理</span></div>
							</div>
						</li>
						<li class="aui-list-item" style="border-bottom: 1px solid #eaeaea;padding: 0 0.5rem;">
							<label style="display:inline-block;">
								<input class="aui-checkbox" type="checkbox" v-model="isChecked">
							</label>
							<div style="display:inline-block;">
								<p>象翌微链科技发展有限公司</p>
								<p>91450100595101416N</p>
							</div>
							<p style="display:inline-block;">公司</p>
						</li>
						<li class="aui-list-item" style="border-bottom: 1px solid #eaeaea;padding: 0 0.5rem;">
							<label style="display:inline-block;">
								<input class="aui-checkbox" type="checkbox" v-model="isChecked">
							</label>
							<div style="display:inline-block;">
								<p>李兰</p>
								<p>身份证91450100595101416N</p>
							</div>
							<p style="display:inline-block;">个人</p>
						</li>
						<li class="aui-list-item " style="padding: 0 0.5rem;margin-top:0.5rem;">
							<div class="aui-btn aui-btn-block" style="height:1.75rem;line-height: 1.75rem;">
								<p>+ 新增抬头</p>
								<span></span>
							</div>
						</li>
					</ul>
					<div>
						<ul>
							<li class="aui-list-item">
								<label style="display:inline;">	
									<input class="aui-checkbox" type="checkbox" v-model="isChecked"><span>个人</span>
								</label>
								<label style="display:inline;">	
									<input class="aui-checkbox" type="checkbox" v-model="isChecked"><span>企业</span>
								</label>
								<label style="display:inline;">	
									<input class="aui-checkbox" type="checkbox" v-model="isChecked"><span>是否默认</span>
								</label>
							</li>
							<li class="aui-list-item">
								<div class="aui-list-item-label" style="text-align:left;"><span style="color:red;">*</span>姓名</div>
								<div class="aui-list-item-input">
									<input type="text" placeholder="请输入真实姓名"/>
								</div>
							</li>
							<li class="aui-list-item">
								<div class="aui-list-item-label" style="text-align:left;"><span style="color:red;">*</span> 身份证号</div>
								<div class="aui-list-item-input">
									<input type="text" placeholder="请输入身份证号码"/>
								</div>
							</li>
							<li class="aui-list-item" style="padding-right:.75rem;">
								<div class="aui-btn aui-btn-danger aui-btn-block">
									确认
								</div>
							</li>
						</ul>
					</div>
				</div>

				
			</div> -->
			<!-- 发票内容 -->
			<Bill-Content v-if="isShows"></Bill-Content>
			<!-- <div class="aui-content aui-margin-b-15">	
				<ul class="aui-list aui-list-in">
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
							<div class="aui-list-item-title">发票内容</div>
						</div>
					</li>
					<li class="aui-list-item">
						<div style="display:inline;">	
							<input class="aui-checkbox" type="checkbox" v-model="isChecked"><span>商品明细</span>
						</div>
						<div style="display:inline;">	
							<input class="aui-checkbox" type="checkbox" v-model="isChecked"><span>商品大类</span>
						</div>
					</li>
					<li class="aui-list-item">
						<img src=""/>
					</li>
					<li class="aui-list-item" style="padding-right:.75rem;">
						<div class="aui-btn aui-btn-danger aui-btn-block">
							保存
						</div>
					</li>
				</ul>
			</div> -->
			
			<div v-if="displays" class="aui-list-item" style="padding:0 0.75rem;color:#999999;">
				<div id="" style="display: inline-block;height: 1rem;padding-top: 0.3rem;">
					<img src="../../../static/image/BillImg/u528.png"/>
				</div>
				<div id="" style="display: inline-block;">
					<li style="text-align:left;">温馨提示</li>
				</div>
				<li style="text-align:left;">礼品卡/储值卡支付金额不支持开具发票</li>
				<li style="text-align:left;">仅提供电子发票，用户可自行打印，可在我的订单-查看发票中下载电子发票</li>
			</div>
		</div>
		<Bill-Save v-if="isShows" :types="isShows"></Bill-Save>
		<mt-popup ref="needKonw" v-model="popupVisible" popup-transition="popup-fade" modal="true" closeOnClickModal="true" class="billneedknow">
			<Bill-NeedKnow @switch="isPopupVisible" style="border-radius: 0.4rem;"></Bill-NeedKnow>
		</mt-popup>
	</div>
</template>

<script>
//	import MyHeader from "../header";
	import BillType from "../../components/BillType";
	import BillRise from "../../components/BillRise";
	import BillContent from "../../components/BillContent";
	import BillNeedKnow from "../../components/BillNeedKnow";
	import BillSave from "../../components/BillSave";
	import axios from "axios";
	import { mapState, mapGetters, mapMutations } from "vuex";
	import { Popup } from 'mint-ui';
//	import ButtonToTop from '../../real-components/ButtonToTopForTest';
	export default {
		data(){
			return {
				aboutData:null,
				// isChecked:'',
				popupVisible:false,//发票须知的控制变量
				isShows:false,//content显示状态的控制变量
				displays:true,
				titles:"",//头部标题
				isChooses:"",
				ApplyBill:true,//控制billtype显示or隐藏
			}
		},
		props: {
			sendOrder: {
				type: Function,
				default: () => {}
			},
		},
		components:{
//			"my-header":MyHeader,
			"Bill-Type":BillType,
			"Bill-Rise":BillRise,
			"Bill-Content":BillContent,
			"Bill-NeedKnow":BillNeedKnow,
			"Bill-Save":BillSave,
//			ButtonToTop,
			'mt-popup': Popup,
			
		},
		computed: {
	      getVals() {
	            return this.$store.state.hzh.vals;
	        },
	        getBillBtn() {
	            return this.$store.state.hzh.SaveBillBtn;
	        },
	    
	    },
		methods: {
			//回到顶部
			goTop() {
				this.$refs.verticalScroll.goTop()
			},
			mGoBack(){
//				this.$router.push({path:"/confirmorder"})
				window.history.back();
			},
			//发票须知
			BillNeedKonw(){
				// this.$refs.needKonw.showCover()
				this.popupVisible = true;
				console.log("nihaoa",this.popupVisible)
			},
			//不开发票与电子发票勾选的状态值
			updateContent(data){
				console.log(data,"data11111111")
				this.isShows = data.CheckedElect;//改变了父组件的值 
				this.displays =  data.isChecked;
			},
			isPopupVisible(data){
				console.log("switch",data)
				this.popupVisible = data.isPopupVisible;
			}

		},
		created(){
			console.log(this.$router.history.current.query,"6666666",)
			let getVal = this.$router.history.current.query;
			let BillBtn = this.$router.history.current.query.BillBtns;
			let goodsId = this.$router.history.current.query.goodsId;
			if(getVal.datas){
				this.titles = '开票申请';
				this.displays = false;
				this.isShows = true;
				this.isChooses = true;
				this.ApplyBill = false;
			}else{
				this.titles = '发票';
				this.displays = true;
				this.isShows = false;
				this.isChooses = false;
				this.ApplyBill = true;
			}
			if(goodsId && goodsId.length != 0){
				this.displays = false;
				this.isShows = true;
				this.isChooses = true;
			}
			if(this.getVals == "real"){
				console.log("查看vuex里面的vals",this.getVals)
				this.isShows = true;
				this.displays =  false;
				this.isChooses = true;
				this.$store.dispatch('hzh/PutAValue','')
			}
			if(BillBtn == "tures"){
				this.isChooses = true;
				this.isShows = true;
				this.displays =  false;
				console.log("查看vuex里面的getBillBtn")
			}
			
		},
		mounted() {
			// this.getAboutdata();
			// console.log(888888)
			
		},
	}
</script>

<style>
	h4{
		text-align: center;
	}
	.overhidAbout{
		overflow: hidden;
	}
	
	.giftCardInstrutAbout .concent {
		padding: 0rem 0.5rem;
		text-align: left;
	}
	.giftCardInstrutAbout .concent .detail{
		background-color: #fff;
		padding: 0.5rem 0.75rem 1.5rem 0.75rem;
	}
	.myContent{
		width: 100%;
	    height: 100%;
	    display: flex;
	    flex-direction: column;
	    justify-content: space-between;
	}
	.billneedknow{
		width: 85%;
		height: 50%;
		border-radius: 0.4rem;
		/*overflow: hidden;
		overflow-y: auto;*/
	}
</style>



