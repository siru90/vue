
<template>
	<div class="vue_app" style="position: absolute;width: 100%">
		<!--头部-->
		<header class="aui-bar aui-bar-nav aui-bar-light">
		<!--<router-link to='/main/profile'>-->
			<div class="go-back" @click="goUp()">
				<i></i>
				<i></i>
				<i></i>
			</div>
		<!--</router-link>-->
			<div class="aui-title">我的车辆</div>
			<!--<router-link to="/main/addCar">-->
			<div id="add_address" class="aui-pull-right text-del" @click.stop="toAddCar" v-if="$route.query.serviceNo != 4 && $route.query.serviceNo != 5">新增车辆</div>
			<!--</router-link>-->
		</header>
		<!-- <div style="height: 3rem;"></div> -->
		<!--头部-->
		<div class="aui-content top_div">
			<ul class="aui-list aui-media-list address_list">
				<li class="aui-list-item" v-for="(myCar,index) in carArr" @click="carToAddInstall(myCar)">
					<div class="aui-media-list-item-inner">
						<div class="aui-list-item-media">
							<img style="width: 100%;height: 100%;" :src="myCar.carphoto || 'static/image/demo1.png'">
						</div>
						<div class="aui-list-item-inner">
							<div class="aui-list-item-text">
								<div class="aui-list-item-title"><strong>车牌号码：{{myCar.carnumber}}</strong><span class="aui-font-size-14 text_c_gray"></span></div>
							</div>
							<p>发动机号：{{myCar.engineno}}</p>
							<p>智能终端：{{myCar.smartterm == 0?"未安装":"已安装"}} <span v-if="myCar.termno">（{{myCar.termno}}）</span></p>
							<p>车架号码：{{myCar.carframeno}}</p>
						</div>
					</div>
					<div class="edit_address" @click.stop="changeDefaults(index)">
						<div class="aui-pull-left">
							<label><input  class="aui-radio" type="radio"  name="demo1" :checked="myCar.cardefault === 0?false:true">&nbsp;{{myCar.cardefault == 0?"设为默认":"默认车辆"}}</label>
						</div>
						<div class="aui-btn aui-btn-outlined" @click.stop="toUpdataCar(index)"><i class="aui-iconfont aui-icon-edit" ></i>编辑</div>
						<div class="aui-btn aui-btn-outlined" @click.stop="delCarsInfo(index)"><i class="aui-iconfont aui-icon-trash"></i>删除</div>
					</div>
				</li>
				<div id="contorlShow" v-if="haveCarF">
					<div id="disShow">
						<img src="static/image/no_car_img.png" alt="" />
						<p>暂无车辆信息</p>
					</div>
				</div>
				<div id="contorlShow" v-if="haveData">
					<div id="disShow">
						<img src="static/image/no_car_img.png" alt="" />
						<p>暂无车辆信息</p>
					</div>
				</div>
				<!--<router-link to="/main/afterSale">
					<div style="width: 100px;height: 100px;">
						售后
					</div>
				</router-link>
				<router-link to="/main/afterSaleDetail">
					<div style="width: 100px;height: 100px;">
						售后详情
					</div>
				</router-link>-->
				
				<!--<li class="aui-list-item">
					<div class="aui-media-list-item-inner">
						<div class="aui-list-item-media">
							<img src="../../../../static/image/demo1.png">
						</div>
						<div class="aui-list-item-inner">
							<div class="aui-list-item-text">
								<div class="aui-list-item-title"><strong>发动机号：L2B</strong><span class="aui-font-size-14 text_c_gray"></span></div>
							</div>
							<p>品牌型号：宝骏&nbsp;730</p>
							<p>车牌号码：桂AT20I8</p>
							<p>终端编号：888888</p>
						</div>
					</div>
					<div class="edit_address">
						<div class="aui-pull-left">
							<label><input class="aui-radio" type="radio" name="demo1">&nbsp;设为默认</label>
						</div>
						<div class="aui-btn aui-btn-outlined"><i class="aui-iconfont aui-icon-edit"></i>编辑</div>
						<div class="aui-btn aui-btn-outlined"><i class="aui-iconfont aui-icon-trash"></i>删除</div>
					</div>
				</li>-->
			</ul>
		</div>
	</div>
</template>

<script>

	import {mapGetters } from 'vuex'
	import {mapActions} from 'vuex'
	import router from 'vue-router'
	import {MessageBox} from 'mint-ui'
	import {Toast} from '../../../utils/toast2'

	var route = new router();

	export default  {
		data() {
			return {
				haveCarF:false,
				carArr:[],
				chooseInfo:'默认车辆',
				getCarPram:{},
				sub:null,
				haveData: false
			}
		},
		methods:{
			goUp(){
			
//				console.log(this.$router.query.serviceNo,'bbbbbbbb');
				if(this.$route.query.serviceNo != undefined){  //传0过来可能会隐式转换为false
					
//					console.log(this.$route.query.serviceNo,'bbbbbbb');
					let serviceNo = this.$route.query.serviceNo;
					let id = this.$route.query.serviceId;
					let addressDetails = this.$route.query.addressDetails;
					let sub = this.$route.query.sub;
					let serviceId = this.$route.query.serviceId;
					let orderDate = this.$route.query.orderDate;
					let province = this.$route.query.province;
					let username = this.$route.query.username;
					let phone = this.$route.query.phone;
					let address = this.$route.query.address;

//					console.log(sub)
					this.$router.push({path:'/main/addInstall',query:{  serviceNo:serviceNo,
																		serviceId:id,
																		addressDetails:addressDetails,
																		serviceId:serviceId,
																		orderDate:orderDate,
																		memo:this.$route.query.memo,
																		sub:sub,
																		username:username,
																		phone:phone,
																		address:address
																	}});
					return;
				}

				this.$router.push('/main/profile');
			},
			carToAddInstall(myCar){
//				console.log(989898989)
				if(this.$route.query.serviceNo != undefined || this.$route.query.serviceId != undefined){
					this.$router.push({path:'/main/addInstall',query:{
						othsid:myCar.othsid,
						serviceNo:this.$route.query.serviceNo,
						serviceId:this.$route.query.serviceId,
						sub:this.$route.query.sub,
						addressDetails:this.$route.query.addressDetails,
						memo:this.$route.query.memo,
						orderDate:this.$route.query.orderDate,
						order:this.$route.query.order,
						username:this.$route.query.username,
					 	phone:this.$route.query.phone,
						address:this.$route.query.address
					}});
				}

			},
			changeTurnInstall(){
				if(this.$route.query.turnInstall===0){
					this.turnInstall = this.$route.query.turnInstall;
				}
			},
			getCarsArr(){
				this.haveCarF = this.getHaveCar;
				let aa = [];
				if(this.$route.query.serviceNo == 4 || this.$route.query.serviceNo == 5) {
					this.getCarInfo.forEach((index) => {
						this.car && this.car.forEach((inde) => {
							if(index.termno && index.othsid !== inde) {
								aa.includes(index) ? '' : aa.push(index);
								// aa.push(index);
							}
						})
					})

					this.carArr = aa;
					console.log(this.carArr.entries)
					
					if(!this.carArr.length) {
						this.haveData = true;
					}
				} else {
					this.carArr = this.getCarInfo;	
				}
			},
			//编辑车辆页面方法
			toUpdataCar(index){
				//此处如果用 创建路由对象路由过去 会没有历史记录 有bug   index标志当前车辆
//				this.$router.push('/main/addCar/'+index);
				if(this.$route.query.serviceNo != undefined){
					this.$router.push({path:'/main/addCar/'+index,query:{flag:1}})
				}else{
					this.$router.push('/main/addCar/'+index);
				}
			},
			toAddCar(){
				if(this.$route.query.serviceNo != undefined){
					this.$router.push('/main/addCar/'+100);
				}else{
					this.$router.push('/main/addCar/'+1000);
				}
			},
			/*
			 * 发送请求的方法
			 **/
			getCarsObj(){
				//调用获取车辆的方法，获取数据

				var obj = {};
				if(window.localStorage.getItem('sessionId')){
					var userSessionid = window.localStorage.getItem('sessionId');
				}

				try{
					if(userSessionid && this.userInfo != null){

						obj["enterpriseid"] = this.userInfo.enterpriseid;
						obj["phone"] = this.userInfo.phone;
						this.getCarsIn(obj).then((data)=>{
//							console.log(data);
						});
					}
				}catch(e){
//					console.info(e);
				}
				//临时改动
//				obj["enterpriseid"] = 138;
//				obj["phone"] = 18028742302;
				//临时改动
//				this.getCarsIn(obj);
			},
			delCarsInfo(index){
				//type="delete" 控制删除
//				console.log('删除车辆方法被调用');
				let obj = {}
				obj["othsid"] = this.carArr[index].othsid;
				obj.type = "DELETE";
				obj["mobile"] = this.userInfo.phone;
				obj["enterpriseid"] = this.userInfo.enterpriseid;
				MessageBox.confirm('是否删除车辆？').then((action)=>{
//					console.log(action,'过去');
					this.actionChangeCarInfo(obj).then(()=>{
						let code = this.getServerCode;
						if(code == "0"){
							Toast({
		                        message: '删除成功',
		                        iconClass: "aui-iconfont aui-icon-correct",
		                        duration: 1000
		                   });
						}else{
							Toast({
		                        message: '删除失败',
		                        iconClass: "aui-iconfont aui-icon-close",
		                        duration: 1000
		                    });
						}
					});
				},(action)=>{
//					console.log(action,'原地');
				});

//				console.info('删除车辆发送请求',obj);
			},
			changeDefaults(index){
				//type="updata"
//				var obj = this.carArr[index];
				let obj = {};
				obj.type = "UPDATE";
				obj["othsid"] = this.carArr[index].othsid;
				obj["mobile"] = this.userInfo.phone;
				obj["enterpriseid"] = this.userInfo.enterpriseid;
				obj["cardefault"] = 1;
				this.actionChangeCarInfo(obj).then(() =>{
					let code = this.getServerCode;
					if(code == "0"){
						Toast({
	                        message: '修改成功',
	                        iconClass: "aui-iconfont aui-icon-correct",
	                        duration: 1000
	                    });
//						route.push('/main/car');
					}else{
						Toast({
	                        message: '修改失败',
	                        iconClass: "aui-iconfont aui-icon-close",
	                        duration: 1000
	                    });
					}
				});
//				console.info("设置为默认车辆",obj);
			},
			...mapActions("zxModules",[
				"getCarsIn","actionChangeCarInfo"
			])
		},
		computed: {
			...mapGetters("zxModules", [
				"getCarInfo",'getHaveCar','getServerCode'
			]),
			...mapGetters("xhModules", [
				"userInfo",
				"car"
			]),
		},
		created() {
			//请求车辆信息

			this.carInfo = this.$route.query.carArr;
			// console.log('this.carInfo', this.carInfo);
			this.getCarsObj();
			this.getCarsArr();
			this.changeTurnInstall();


//			if(this.$route.query.sub){
//				this.sub = this.$route.query.sub;
//			}
			
		},
		watch: {
			getCarInfo(){
				this.getCarsArr();
			},
		}
	}

</script>
<style scoped="scoped">
	#contorlShow{
		position: relative;
		width: 100%;
		text-align: center;
	}
	#disShow{
		width: 50%;
		height: 50%;
		text-align: center;
		margin-top:4em;
		display: inline-block;
	}
	#disShow img{
		margin: 0 auto;
	}
	#disShow p{
		margin-top:2em;
	}
</style>

