<template>
	<div class="vue_app" style="position: absolute;width: 100%">
		<!--头部-->
		<header class="aui-bar aui-bar-nav aui-bar-light">
			<div @click="showMsg" class="go-back">
				<i></i>
				<i></i>
				<i></i>
			</div>
			<div class="aui-title">{{changeMyCar}}</div>
			<div class="aui-pull-right text-del" @click="saveCarInfo">保存</div>
		</header>
		<div style="height: 3rem;"></div>
		<!--头部-->
		<div class="aui-content top_div">
			<ul class="aui-list aui-form-list aui-margin-b-15">
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">车牌号码</div>
						<div class="aui-list-item-input">
							<input type="text" placeholder="输入车牌号码" v-model="carObj.carnumber">
						</div>
					</div>
				</li>
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">发动机号<font class="required">*</font></div>
						<div class="aui-list-item-input">
							<input type="text" placeholder="输入发动机型号" v-model="carObj.engineno">
						</div>
					</div>
				</li>
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">智能终端<font class="required">*</font></div>
						<div class="aui-list-item-input">                            
							<label><input class="aui-radio" type="radio" name="demo1" @click="changeChecked(1)" id="myChecked"  :checked="1 === checkedFlag"> 已安装</label> &nbsp;&nbsp;
							<label><input class="aui-radio" type="radio" name="demo1" @click="changeChecked(0)"  :checked="0 === checkedFlag"> 未安装</label>
						</div>
					</div>
				</li>
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">终端编号</div>
						<div class="aui-list-item-input">
							<input type="text" placeholder="输入智能车载终端编号" v-model="carObj.termno">
						</div>
					</div>
				</li>
				
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">车架号码 </div>
						<div class="aui-list-item-input">
							<input type="text" placeholder="输入车架号码" v-model="carObj.carframeno">
						</div>
					</div>
				</li>
			</ul>
			<ul class="aui-list aui-media-list address_list">
				<li class="aui-list-item">
					<div class="aui-card-list-content-padded">
						<div><strong>车辆图片</strong><span class="aui-font-size-14 text_c_gray"></span></div>
						
						<vue-clip :options="options" :on-sending="sending">
						    <template slot="clip-uploader-action">
						    	<div class="myposition">
						    		<div class="dz-message"><strong>车辆图片</strong><span class="aui-font-size-14 text_c_gray"></span></div>
						    	</div>
						    </template>
						    <template slot="clip-uploader-body" scope="props">
						     	<div id="showImg">
						     	    <div class="car_img">
								      	<div id="mydiv" v-for="(file,index) in props.files"> 
								      		<img style="width: 100%;height: 100%;" :src="file.dataUrl" v-if=" index+1 == props.files.length">
								      	</div>
								      	<span class="upImg" v-if="props.files.length == 0">上传车辆图片</span>
							        </div>
						     	</div>
						    </template>
						</vue-clip>  
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	
	import {mapGetters,mapMutations,mapActions } from 'vuex'
	import {MessageBox, Popup, Picker, DatetimePicker } from 'mint-ui'
	import VueClip from 'vue-clip'
	import Vue from 'vue'
	import axios from 'axios'
	import router from 'vue-router'
	import api from '../../../../api/index.js'
	import {Toast} from '../../../../utils/toast2'

	var route = new router();
	Vue.use(VueClip);
	export default  {
		data() {
			return {
				changeMyCar:"编辑车辆",
				addCarsArr:[],
				carObj:{},
				code:null,
				checkedFlag:1,
				checkedFlagState:null,
				carInfoNull:{
					brandstype:'', //品牌型号
					enterpriseid:'',//企业id
					vipid:'',//会员ID
					vipname:'',//会员姓名
					carnumber:'',//车牌号
					engineno:'', //发动机号
					termno:'', //终端编号
					smartterm:'', //智能终端
					frameNum:'',  //车架号码
					cardefault:'',    //默认车辆
					regdate:'',//注册激活日
					lastmandate:'' ,//上次保养日期
					carphoto:'' , //车辆图片
					othsid:'',  //车辆唯一标志
					type:'' 
					//insert updata delete
				},
				options: {
		           url: '/upload',
		           paramName: 'file',
				},
				fileImgUrl: ""
		       
			}
		},
		watch:{
			checkedFlag:function(){
				 this.checkedFlagState = 0;
				 return;
			}
		},
		methods:{
			changeChecked(type){
				this.checkedFlag = type;
				this.carObj.smartterm = type;	
			},
			getCarsArr(){
//				console.info(this.getCarInfo);
//				获取vuex中用户车辆信息
				this.addCarsArr = this.getCarInfo;
//				console.info(this.getCarInfo);
			},
//			获取当前车辆
			nowingCar(){
				let index = this.$route.params;;
//				console.log(index);
				let obj = {};
				//1000代表需要新增车辆 其他代表需要编辑车辆信息
				if(index.id == 1000 || index.id == 100){
					this.changeMyCar = "新增车辆";
					obj = this.carInfoNull;
				}else {
					obj = this.addCarsArr[index.id];
					this.checkedFlag = obj.smartterm;  //将智能终端的值带过去
				}
				this.carObj = obj;
//				console.info(this.carObj);
			},
			showMsg(){
	            MessageBox.confirm('确定执行此操作？').then((action)=>{
//					console.log(action,'过去');
//					window.history.go(-1);
					this.$router.go(-1);
//					console.log('----------------------------8888')
				},(action)=>{
//					console.log(action,'原地');
				});
			},
			async saveCarInfo(){
				//type = "insert"
//				console.log('调用编辑车辆或保存车辆方法');
				
				let ajaxFlag = true;
				let arr = this.addCarsArr;
				if(this.changeMyCar == "编辑车辆"){
					this.carObj.type = "UPDATE";
					this.carObj["mobile"] = this.userInfo.phone;
					this.carObj["enterpriseid"] = this.userInfo.enterpriseid;
					this.carObj["smartterm"] = this.checkedFlag;
//					console.log(this.carObj);
					//临时改动
//					this.carObj["enterpriseid"] = 138;
//					this.carObj["mobile"] = 18028742302;	
					//临时改动
//					console.log(this.carObj,"编辑车辆请求即将发送");
					this.actionChangeCarInfo(this.carObj).then(()=>{
//						console.log('编辑车辆发送请求');
						let code = this.getServerCode; 
						if(code == "0"){
							Toast({
		                        message: '修改成功',
		                        iconClass: "aui-iconfont aui-icon-correct",
		                        duration: 1000
		                    });
		                    
		                     let flag = '';
		                   //100表示从工单页面跳转过来
		                    if (this.$route.query.flag == 1) {
//		                    	console.log(88888885555)
		                    	flag = 0;
//								route.push({path: '/main/car', query: {serviceNo: flag}});
								window.history.back();
		                    }else{
		                    	route.push({path: '/main/car'});
		                    }
//							route.push('/main/car');
							
							
						}else{
							Toast({
		                        message: '修改失败',
		                        iconClass: "aui-iconfont aui-icon-close",
		                        duration: 1000
		                    });
						}
					});
				}else if(this.changeMyCar == "新增车辆"){
					/*
					 * 非空相等验证
					 **/
//					console.log('新增车辆开始');
					let enginenoFlag = this.carInfoNull.engineno !='';
					let carnoSqu = true;
					let enginenoSqu = true;
				
					
					if(!enginenoFlag){
//						console.info('发动机号不能为空');
						Toast({
	                        message: '发动机号不能为空',
	                        iconClass: "aui-iconfont aui-icon-close",
	                        duration: 1000
	                    });
					}
					
//					if(arr != undefined || arr != "undefined"){
//						for(let i = 0; i < arr.length; i++){
//							if(arr[i].carnumber == this.carObj.carnumber){
//								carnoSqu = false;
//							}
//							if(arr[i].engineno == this.carObj.engineno){
//								enginenoSqu = false;
//							}
//						}
//					}
					
					
					ajaxFlag = enginenoFlag && carnoSqu && enginenoSqu;
					if(ajaxFlag){
						this.carObj.type = "INSERT";
						this.carObj["mobile"] = this.userInfo.phone;
						this.carObj["enterpriseid"] = this.userInfo.enterpriseid;                                                                                                                                                                                                                                                                                                                                                                                     
						this.carObj["cardefault"] = 0;
//						console.log(this.checkedFlagState); 
						if(this.checkedFlagState == null){
							this.carObj["smartterm"] = 0;
						}

//						console.info(this.carObj,"新增车辆发送请求");
					    this.actionChangeCarInfo(this.carObj).then(data=>{
					    	let code = this.getServerCode 
							if(code == "0"){
//								console.log(1);
								Toast({
			                        message: '新增成功',
			                        iconClass: "aui-iconfont aui-icon-correct",
			                        duration: 1000
			                    });
			                    let flag = '';
			                   //100表示从工单页面跳转过来
			                    if (this.$route.params.id == 100) {
			                    	flag = 0;
//									route.push({path: '/main/car', query: {serviceNo: flag}});
									window.history.back();
			                    }else{
			                    	route.push({path: '/main/car'});
			                    }

							}else{
								Toast({
			                        message: '新增失败',
			                        iconClass: "aui-iconfont aui-icon-close",
			                        duration: 1000
			                    });
							}
					    });
					}
				}

			},
			async sending (file, xhr, formData) {
	            // formData.append('_csrf', '<token>')
	            let  date = new Date().getTime();
	            formData.append("file", file.name);
	            formData.append("name", "file");
	            formData.append('Content-Type',file.type);
				//	            http://files.scn.weilian.cn:40899
//								console.log("------------------------", file);
				//				console.log(formData);
	            let config = {
	            	url: api.mall_file_host+'/upload?token='+ date,
	            	method: 'post',
	            	data: formData
	            }
	            axios(config).then(res => {
	            	if(res.code == 200) {
	            		Toast({
		                        message: '图片上传成功',
		                        iconClass: "aui-iconfont aui-icon-correct",
		                        duration: 1000
		                    });
	            	}
					//	            	console.log(res);
	            	this.carObj.carphoto = res.data.visitPath;	
	            });
			},
			//图片事件发生变化
			// fileChange(event) {
			// 	let file;
			// 	if (event.target.files) {
			// 		file = event.target.files[0];
			// 	}
			// 	if (file) {
			// 		let reader = new FileReader();
			// 		reader.onload = event => {
			// 			// this.$refs.fileImg.$el.src = event.target.result;
			// 			this.fileImgUrl = event.target.result;
			// 			//上传图片
			// 			let formData = new FormData();
			// 			formData.append("file", file);
			// 			let config = {
			// 				url: api.mall_file_host + '/upload',
			// 				method: 'post',
			// 				data: formData
			// 			}
			// 			axios(config).then(res => {
			// 				console.log("上传图片的结果", res);
			// 				if(res.code == 200) {
			// 					// Toast({
			// 					// 	message: "图片成功",
			// 					// 	position: 'middle',
			// 					// 	duration: 2000
			// 					// });
			// 				}
			// 				//	            	console.log(res);
			// 				this.carObj.carphoto = res.data.visitPath;	
			// 			});

			// 		}
			// 		reader.readAsDataURL(file);
			// 	}	
			// },
			...mapActions("zxModules",[                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
				"getCarsIn","actionChangeCarInfo",'setCarphoto'
			])
		},
		computed: {
			...mapGetters("zxModules", [
				"getCarInfo","getServerCode"
			]),
			...mapGetters("xhModules", [
				"userInfo"
			])
		},
		created() {
			this.getCarsArr();
			this.nowingCar();
//			console.info(this.$route.query.serviceNo,'sssssssssssss')
		}
	}
	
</script>

<style scoped="scoped">
  #myposition{
  	position: relative;
  }
  .dz-message{
  	position: absolute;
  	width: 100%;
  	height: 60vw;
  	z-index: 20;
  	background: red;
  	opacity: 0;
  }
  #mydiv{
  	position: absolute;
  	right: 0.75rem;
  	left: 0.75rem;
  	height: 60vw;
  }
 
</style>