<template>
	<div class="vue_app" style="position: absolute;width: 100%">
		<!--头部-->
		<header class="aui-bar aui-bar-nav aui-bar-light">
		<div @click="goBack" replace>
			<div class="go-back">
				<i></i>
				<i></i>
				<i></i>
			</div>
		</div>
			<div class="aui-title">工单详情</div>
		</header>
		<div style="height: 3rem;"></div>
		<!--头部-->
		<div v-if="flag">
		<div class="aui-content top_div">
			<ul class="aui-list aui-media-list address_list top_div">
				<li class="aui-list-header">
					车辆信息
	            </li>
				<li class="aui-list-item">
					<div class="aui-media-list-item-inner">
						<div class="aui-list-item-media">
							<img :src="carPhoto?carPhoto:'static/image/demo1.png'">
							<!-- <img src="static/image/demo1.png"> -->
						</div>
						<div class="aui-list-item-inner">
							<div class="aui-list-item-text">
								<div class="aui-list-item-title"><strong>车牌号码：{{data.carno}}</strong><span class="aui-font-size-14 text_c_gray"></span></div>
							</div>
							<p>发动机号：{{data.engineno}}</p>
							<p>智能终端：{{data.smartterm == 0 ? '未安装' : '已安装(终端号'+ (data.teamno ? data.teamno : '') +')'}}</p>
							<p>车架号码：{{data.carframeno}}</p>
						</div>
					</div>
				</li>
			</ul>
			<ul class="aui-list aui-list-in aui-margin-b-15" v-if="param != 4 && param != 5">
				<li class="aui-list-header">
	              	  服务商信息
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">服务商</div>
	                    <div class="aui-list-item-right">{{name}}</div>
	                </div>
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">地址</div>
	                    <div class="aui-list-item-right">{{address}}</div>
	                </div>
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">联系人</div>
	                    <div class="aui-list-item-right">{{member}}</div>
	                </div>
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">联系电话</div>
	                    <div class="aui-list-item-right">{{phone}}</div>
	                </div>
	            </li>
			</ul>
			<ul class="aui-list aui-list-in aui-margin-b-15">
				<li class="aui-list-header">
	              	  服务选择
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">服务类型</div>
	                    <div class="aui-list-item-right">{{installNo ? (data.installtype == 0 ? '终端安装服务' : '配件安装服务'): maintenanceno ? (data.maintenancetype == 0 ? '维修服务' : '保养服务' ) : removeno ? (data.removetype == 0 ? '终端维修服务' : '终端拆除服务') : ''}}</div>
	                    <!-- <div class="aui-list-item-right">{{(installNo  == 0 ? )}</div> -->
	                </div>
	            </li>
	            <!--<li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">服务方式</div>
	                    <div class="aui-list-item-right">{{data.serviceMethods}}</div>
	                </div>
	            </li>-->
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">预约服务日期</div>
	                    <div v-if="data" class="aui-list-item-right">{{translateDate(data.orderdate)}}</div>
	                </div>
	            </li>
			</ul>
			<ul class="aui-list aui-list-in aui-margin-b-15">
				<li class="aui-list-header">
	              	  安装回执
	            </li>
				<li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">终端编号</div>
	                    <div class="aui-list-item-right">{{data.teamno}}</div>
	                </div>
	            </li>
				<li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">车牌号码</div>
	                    <div class="aui-list-item-right">{{data.carno}}</div>
	                </div>
	            </li>
	            <li class="aui-list-item" v-if='this.$route.query.param == 0'>
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">车辆类型</div>
	                    <div class="aui-list-item-right">{{data.cartype}}</div>
	                </div>
	            </li>
				<li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">发动机号</div>
	                    <div class="aui-list-item-right">{{data.engineno}}</div>
	                </div>
	            </li>
	            <li class="aui-list-item">
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">车架号</div>
	                    <div class="aui-list-item-right">{{data.carframeno}}</div>
	                </div>
	            </li>
				<li class="aui-list-item" v-if='this.$route.query.param == 0'>
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">变速箱型号</div>
	                    <div class="aui-list-item-right">{{data.gearbox}}</div>
	                </div>
	            </li>
				<li class="aui-list-item" v-if='this.$route.query.param == 0'>
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">轮胎型号</div>
	                    <div class="aui-list-item-right">{{data.tiresize}}</div>
	                </div>
	            </li>
	            <li class="aui-list-item" v-if='this.$route.query.param == 0'>
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">行驶总里程</div>
	                    <div class="aui-list-item-right"></div>
	                </div>
	            </li>
				<li class="aui-list-item" v-if='false'>
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">上次保养里程</div>
	                    <div class="aui-list-item-right"></div>
	                </div>
	            </li>
				<li class="aui-list-item" v-if='false'>
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">保养日期</div>
	                    <div class="aui-list-item-right">{{data.maintendate == null ? '' : getTime(data.maintendate)}}</div>
	                </div>
	            </li>
				<li class="aui-list-item" v-if='this.$route.query.param == 0'>
	                <div class="aui-list-item-inner">
	                    <div class="aui-list-item-title">购车日期</div>
	                    <div class="aui-list-item-right">{{data.buydate == null ? '' : getTime(data.buydate)}}</div>
	                </div>
	           </li>
			</ul>
			<ul class="aui-list aui-list-in aui-margin-b-15" >
				<li class="aui-list-header">
	              	  服务描述
	            </li>
	            <li class="aui-list-item">
	              	 <textarea name=""  disabled="disabled"  rows="" cols="">{{data.memo?data.memo:''}}</textarea>
	            </li>
	        </ul>
			<ul class="aui-list aui-media-list address_list aui-margin-b-15" v-if='this.$route.query.param == 0'>
				<li class="aui-list-item">
					<div class="aui-card-list-content-padded">
						<div class="aui-list-item-text">
							<div class="aui-list-item-title"><strong>45度整车全景照</strong></div>
						</div>
						<div class="car_img">
						<div class="img">
							<img :src="data.photo ? data.photo.split(',')[0] : ''"  alt="">
							<span v-if="!data.photo">车辆图片</span>
						</div>

						</div>

					</div>
				</li>
			</ul>
			<ul class="aui-list aui-media-list address_list" v-if='this.$route.query.param == 0'>
				<li class="aui-list-item">
					<div class="aui-card-list-content-padded">
						<div class="aui-list-item-text">
							<div class="aui-list-item-title"><strong>终端安装效果照</strong></div>
						</div>
						<div class="car_img">
						<div class="img">
							<img :src="data.photo ? data.photo.split(',')[1] : ''" alt="">
							<span v-if="!data.photo">车辆图片</span>
						</div>

						</div>
					</div>
				</li>
			</ul>
			<ul class="aui-list aui-media-list address_list" v-if='this.$route.query.param == 1 || this.$route.query.param == 2 ||this.$route.query.param == 3'>
				<li class="aui-list-item">
					<div class="aui-card-list-content-padded">
						<div class="aui-list-item-text">
							<div class="aui-list-item-title"><strong>服务照片：</strong></div>
						</div>
						<div class="car_img">
						<div class="img">
							<img :src="data.photo ? data.photo.split(',')[0] : ''" class="myImg" alt="">
							<span>服务照片</span>
						</div>

						</div>
					</div>
				</li>
			</ul>
		</div>
		<div style="height:5rem;"></div>
		</div>
		<div v-else>
			<img src="static/image/no_good.png" class="img">
			<p class="word">暂无数据</p>
		</div>
	</div>
</template>
<script>
	import {getInstall, getMaintain, getService, getUserInfoAgain,getCarInfo, getTerminalMaintenanceinfo, getTerminalDismantleinfo} from '../config/getData.js'
	import axios from 'axios'
	import {mapGetters, mapMutations, mapActions} from "vuex"
	export default {
		data(){
			return {
				installNo: null,
				maintenanceno: null,
				removeno: null,
				data: '',
				flag: true,
				member: null,
				phone: null,
				carPhoto : null,
				address: null,
				name:null,

			}
		}
		,
		created(){
			this.installNo = this.$route.query.installno;
			this.maintenanceno = this.$route.query.maintenanceno;
			this.removeno = this.$route.query.removeno;
			this.param = this.$route.query.param;
		}
		,
		async mounted(){
			await this.init();
			await this.initData(5)//5为全部
			
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
		 	translateDate (date) {
	        // if(parseInt(this.param) < 2){
	        //   // return date.split(".")[0]
	        //   console.log(date)
	        // }else{
				// console.log(date)
				if(date==null){
	          		return 
				}
	          var da = new Date(date)
	          var year = da.getFullYear();
	          var month = da.getMonth()+1;
	          var date = da.getDate();
	          var houer = da.getHours() < 10?"0" + da.getHours() : da.getHours()
	          var minit = da.getMinutes() < 10?"0" + da.getMinutes() : da.getMinutes()
	          var sec = da.getSeconds() < 10?"0" + da.getSeconds() : da.getSeconds()
	          return [year, month, date].join("-") +" " + [houer, minit, sec].join(":")
	        // }

	      	},
			goBack () {
			    this.$router.go(-1)
	      	},
	      	async init(){
	      		//页面刷新加载用户数据
	      		let response = await getUserInfoAgain(this.sessionId);
	      		if (response.returncode === 0) {
	      		  this.LOGO_OUT(false);
	      		  return
	      		}

	      		this.USER_INFO(response.data[0]);
	      		this.LOGO_IN(true);
	      	}
	      	,
			async initData(val) {
				let res = null;
				if(this.maintenanceno) {
					 
					 res = await getMaintain(this.maintenanceno);
				}
				if( this.installNo) {
					if(this.param == 0){
						res = await getInstall(0+"/"+this.installNo);
					}
					if(this.param == 1){
						
					 	res = await getInstall(1+"/"+this.installNo);
					}
				}
				if(this.removeno) {
					if(this.param == 4) {
					  res = await getTerminalMaintenanceinfo(this.removeno);
					  res.data[0].removetype = '0';
					}

					if(this.param == 5){
					  res = await getTerminalDismantleinfo(this.removeno);
					}
				}
				if(res.data == '' ){
					this.flag = false;
				}
				this.data = res.data[0];
				console.log('this.data',this.data)
				//服务商
				if(this.data.serviceid){
					let service_data = {
					    "enterpriseid": String(window.api.enterpriseId),
					    "serviceid":String(this.data.serviceid)
					};
					let service_config = {
						url: window.api.mall_base_host + 'service/findServiceProviderInfoByServiceId',
						method:'post',
						data:JSON.stringify(service_data),
						headers: {'Content-Type':'application/json', 'Accept' : 'application/json'}
					};
					let req = await axios(service_config);
					// console.log('req',req)
					this.name = req.data.serviceList.name
					this.member = req.data.serviceList.contactor
					this.phone = req.data.serviceList.telepone
					this.address = req.data.serviceList.address
				}


				//获得车辆
				let date = new Date().getTime();
				let result = await axios.get(window.api.mall_base_host + "clientotherinfo/getvipcarinfo?enterpriseid=" + window.api.enterpriseId + "&phone=" + this.userInfo.phone+"&token=" + date).then(result => {
				  return result.data.data.carlist
				});
				if(!result)return
				for (let i of result) {
					// console.log('car')
					if(i.othsid == this.data.vehicleid) {
						this.carPhoto = i.carphoto;
					}
				}

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
			showImage(val){
				// console.log(val.indexOf(','))
			  if(val) {
			    if(val.indexOf(',') !== -1){
			      let i = null;
			      return val.substr(0,i);
			    } else {
			      return val;
			    }
			  } else {
			    return 'static/image/demo1.png'
			  }

			}
			,
			async getCar() {
			  

			}
		}
	}
</script>
<style scoped>
	.img{
		margin: auto;
		margin-top: 0rem;
	}
	.word{
		font-size: 18px;
		text-align: center;
	}
	.img{
		position: relative;
	 	height: 60vw;
	}
	.img>span{
		position: absolute;
		z-index: 10;

	}
	.img>img{
		position: absolute;
		z-index: 20;
	}
	
</style>
