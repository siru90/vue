<template>
	<div id="addCar">
		<header style="display:block;z-index:999 !important;" class="aui-bar aui-bar-nav aui-bar-light">
				<div class="go-back" @click="showMsg">
					<i></i>
					<i></i>
					<i></i>
				</div>
			<div class="aui-title">{{handleType === 0 ? "新增车辆" : "编辑车辆"}}</div>
		</header>
		<div class="addCarContent">
			<div class="drivingLicence">
				<div class="drivingLicenceContent">
					<input v-if="deviceType === 'A'" capture="camera" @change="uploadCarImg" id="uploadImg" type="file" accept="image/*">
					<input v-else @change="uploadCarImg" id="uploadImg" type="file" accept="image/*">
					<i class="njfont nj-paizhao"></i>
					<p>点击并上传真实有效的行驶证！</p>
					<img :src="drivingLicenceImgUrl" alt="">
				</div>
			</div>
			<p class="drivingLicenceWord"><span>识别结果</span>（如遇识别失败，可手工输入行驶证信息）</p>
			<div class="drivingLicenceDetail">
				<dir class="drivingLicenceDetailTitle">
					中华人民共和国机动车行驶证
				</dir>
				<form>
					<dir class="formItem">
						<label>车牌号码<span class="required">*</span></label>
						<input v-model="carnumber" @change="carNumberChange" type="text">
					</dir>
					<dir class="formItem">
						<label>车辆类型</label>
						<input v-model="cartypename" type="text">
					</dir>
					<dir class="formItem">
						<label>所有人</label>
						<input v-model="ownername" type="text">
					</dir>
					<dir class="formItem">
						<label>住址</label>
						<input v-model="owneraddress" type="text">
					</dir>
					<dir class="formItem">
						<label>使用性质</label>
						<input v-model="usetypes" type="text">
					</dir>
					<dir class="formItem">
						<label>品牌型号</label>
						<input v-model="brandsnums" type="text">
					</dir>
					<dir class="formItem">
						<label>车辆识别代码</label>
						<input v-model="carframeno" type="text">
					</dir>
					<dir class="formItem">
						<label>发动机号码</label>
						<input v-model="engineno" type="text">
					</dir>
					<dir class="formItem">
						<label>注册日期</label>
						<input v-model="regdate" placeholder="输入正确日期,格式xxxx-xx-xx" type="text">
					</dir>
					<dir class="formItem">
						<label>发证日期</label>
						<input v-model="certificationtime" placeholder="输入正确日期,格式xxxx-xx-xx" type="text">
					</dir>
				</form>
			</div>
			<div class="drivingLicenceWord relatedTerminal">
				<span>终端编号</span>
				<input v-model="teleptleno" disabled readonly type="text">
				<button @click="searchTerminalMsg">
					关联终端
				</button>
			</div>
		</div>

		<div class="addCarBottom">
			<div @click="save(true)" class="saveAdnContinue" :class="pendingStatus ? 'pendingbtn' : '' ">
				保存并继续添加
			</div>
			<div @click="save(false)" class="save" :class="pendingStatus ? 'pendingbtn' : '' ">
				保存
			</div>
		</div>
	</div>	
</template>
<script>
import { MessageBox } from 'mint-ui'
import axios from 'axios';
import {showLoading, hideLoading} from "../../../../utils/loading.js";
import {Toast} from '../../../../utils/toast2'
import { upLoadImg, imageRecognition, getTerminalInfo,saveCar } from './http.js' 
import { mapGetters } from 'vuex'
import { sleep } from '../../../../utils/sleep.js'
import dayjs from "dayjs"
export default {
	data() {
		return {
			deviceType: "A",	//A: 安卓， I：ios
			handleType: (this.$route.params.id == 1000 || this.$route.params.id == 100) ? 0 : 1,				//0新增 1编辑
			pendingStatus: false,
			drivingLicenceImgUrl: "",
			teleptleno: "",			//终端编号

			carnumber: "",			//车牌号码
			cartypename: "",		//车辆类型
			ownername: "",			//所有人
			owneraddress: "",		//住址
			usetypes: "",			//使用性质
			brandsnums: "",			//品牌型号
			carframeno: "",			//车辆识别代码
			engineno: "",			//发动机号
			regdate: "",			//注册日期
			certificationtime: "",	//发证日期

			smartterm: "",			//是否绑定终端
			frameNum: "",			//
			lastmandate: ""	,		//上次保养时间
			othsid: ""
		}
	},
	computed: {
		...mapGetters("xhModules", [
				"userInfo",
		]),
		...mapGetters("zxModules", [
			"getCarInfo"
		])
	},
	methods: {
		resetData(carMsg) {
			this.pendingStatus = false,
			this.drivingLicenceImgUrl = carMsg.carphoto,
			this.teleptleno = carMsg.termno,
			this.carnumber = carMsg.carnumber,
			//this.cartypename = carMsg.cartype,
			this.cartypename = carMsg.cartypename,
			this.ownername = carMsg.ownername,
			this.owneraddress = carMsg.owneraddress,
			this.usetypes = carMsg.usetypes,
			//this.brandsnums = carMsg.brandstype,
			this.brandsnums = carMsg.brandsnums,
			this.carframeno = carMsg.carframeno,
			this.engineno = carMsg.engineno,
			this.regdate = carMsg.regdate ? dayjs(carMsg.regdate).format("YYYY-MM-DD") : "" ,
			this.certificationtime = carMsg.certificationtime,
			this.smartterm = carMsg.smartterm,
			this.frameNum = carMsg.frameNum,
			this.lastmandate = carMsg.lastmandate,
			this.othsid = carMsg.othsid
		},
		showMsg(){
			MessageBox.confirm('确定执行此操作？').then((action)=>{
				this.$router.go(-1);
			},(action)=>{
			});
		},
		setCarMsg(r) {
			const {
				address,
				brandtype,
				carno,
				cartype,
				engineno,
				holder,
				issuedate,
				regdate,
				usecharacter,
				vin
			} = r 
			this.carnumber = carno
			this.cartypename = cartype
			this.ownername = holder
			this.owneraddress = address
			this.usetypes = usecharacter
			this.brandsnums = brandtype
			this.carframeno = vin
			this.engineno = engineno
			this.regdate = regdate
			this.certificationtime = issuedate
		},
		async uploadCarImg(e) {
			const date = new Date().getTime();
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append("file",file)
			
			showLoading()
			try {
				const res =  await upLoadImg(formData)
				this.drivingLicenceImgUrl = res.visitPath
				const r =  await imageRecognition(res.downloadPath)
				this.setCarMsg(r.data)
				
			} catch (error) {
				console.log(error)
				MessageBox({
					title: '提示',
					message: '行驶证识别失败，请稍后重试或在下方手动输入车辆信息',
					showCancelButton: false
				});
				document.getElementById("uploadImg").value = null
			}
			document.getElementById("uploadImg").value = null
			hideLoading()
		},
		async searchTerminalMsg() {
			if (!this.carnumber) {
				Toast({
					message: '请输入车牌号',
					iconClass: "aui-iconfont aui-icon-close",
					duration: 1000
				});
				return
			}
			showLoading()
			try {
				const r = await getTerminalInfo(this.carnumber)
				this.teleptleno = r.teleptleno
			} catch (error) {
				Toast({
					message: '未查询到关联终端',
					iconClass: "aui-iconfont aui-icon-close",
					duration: 1000
				});
			}
			hideLoading()
			
		},
		async save(whtherContinue) {
			if (this.pendingStatus) {
				return
			}
			const postCarData = {
				enterpriseid: window.api.enterpriseid,
				brandstype: this.cartypename,
				vipid: this.userInfo.vipid,
				vipname: this.userInfo.vipname,
				carnumber: this.carnumber,
				engineno: this.engineno,
				termno: this.teleptleno,		//终端号
				smartterm: this.smartterm,    // 是否绑定终端
				frameNum: this.frameNum,
				cardefault: 0,			//是否设为默认车辆
				regdate:this.getDataStr(this.regdate),
				lastmandate: this.lastmandate,
				carphoto: this.drivingLicenceImgUrl,			//车辆图片
				othsid: this.othsid,				//biaoshi
				type: this.handleType === 0 ? "INSERT" : "UPDATE",	//操作类型
				carframeno: this.carframeno,
				cartypename: this.cartypename,
				ownername: this.ownername,
				owneraddress: this.owneraddress,
				usetypes: this.usetypes,
				brandsnums: this.brandsnums,
				certificationtime: this.getDataStr(this.certificationtime),
				mobile: this.userInfo.phone
			}
			if(!this.validator(postCarData)) {
				return
			}
			showLoading()
			try {
				this.pendingStatus = true
				await saveCar(postCarData)
				Toast({
                    duration: 1000,
                    message: "操作成功",
                    iconClass: "aui-iconfont aui-icon-correct"
                });
				
				if (!whtherContinue) {
					hideLoading()
					await sleep(1000)
					if (this.$route.query.flag == 1) {
						window.history.back();
					}else{
						//this.$router.push({path: '/main/car'});
						this.$router.back()
					}
					return
				}
				this.resetData({})
			} catch (error) {
				console.log(error)
				Toast({
					message: '操作失败',
					iconClass: "aui-iconfont aui-icon-close",
					duration: 1000
				});
			}
			this.pendingStatus = false
			hideLoading()
		},
		validator(postData) {
			if (!postData.carnumber) {
				Toast({
					message: '请输入车牌号',
					iconClass: "aui-iconfont aui-icon-close",
					duration: 1000
				});
				return false
			}
			if (!this.userInfo) {
				MessageBox.alert('登录信息失效，请重新登录！').then(action => {
					this.$router.push({"path": "/login", query: {page: "new"}});
				});
				return false
			}
			return true
		},
		getDataStr(str) {
			if (/\-/.test(str) || !str) {
				return str
			}
			let result = ""
			for(let i = 0; i < str.length; i++) {
				result+=str[i]
				if (i == 3 || i ==5) {
					result+="-"
				}
			}
			return result
		},
		carNumberChange(){
			this.teleptleno = null;
		}
	},
	created() {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		if (isAndroid) {
			this.deviceType = "A"
		} else {
			this.deviceType = "I"
		}
		if (this.handleType === 1) {
			this.resetData(this.getCarInfo[this.$route.params.id])
		}
		
	},
	
}
</script>
<style>
	#addCar .pendingbtn {
		opacity: 0.4;
	}
	#addCar {
		background: #ffffff;
		height: 100%;
		position: relative;
	}
	#addCar .addCarContent {
		padding: 0.7rem;
		padding-top: 3.45rem;
		height: calc(100% - 14vw);
		overflow-x: hidden;
		overflow-y: auto;
	}
	#addCar .drivingLicence {
		width: 100%;
		height: 50vw;
	}
	#addCar .drivingLicence .drivingLicenceContent {
		width: 100%;
		height: 100%;
		background: #ededed;
		position: relative;
		border-radius: 5px;
		text-align: center;
	}
	#addCar .drivingLicence .drivingLicenceContent  i {
		font-size: 4rem;
		color: #999999;
		line-height: 6rem;
	}
	#addCar .drivingLicence .drivingLicenceContent input {
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 998;
		position: absolute;
		left: 0;
		top: 0;
	}
	#addCar .drivingLicence .drivingLicenceContent p {
		position: absolute;
		width: 100%;
		bottom: 0.8rem;
		left: 0;
		text-align: center;
		font-size: 0.8rem;
	}
	#addCar .drivingLicence .drivingLicenceContent img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	#addCar .drivingLicenceWord {
		line-height: 2rem;
	}
	#addCar .drivingLicenceWord span {
		color: #666666;
		font-weight: bold;
	}
	#addCar .drivingLicenceDetail {
		background: #ededed;
		padding: 0.4rem;
		border-radius: 5px;
	}
	#addCar .drivingLicenceDetailTitle {
		text-align: center;
		padding-left: 0;
		font-size: 14px;
	}
	#addCar .drivingLicenceDetail .formItem {
		padding-left: 0;
		font-size: 14px;
		overflow: hidden;
		height: 1.4rem;
		line-height: 1.4rem;
	}
	#addCar .drivingLicenceDetail .formItem label {
		float: left;
		color: #666666;
	}
	#addCar .drivingLicenceDetail .formItem input {
		background: #ffffff;
		float: right;
		width: 65%;
		height: 100%;
		line-height: 1.4rem;
		text-align: right;
		padding: 0 0.4rem;
		color: #999999;
	}
	#addCar .relatedTerminal input {
		width: 45%;
		display: inline-block;
		background: #ededed;
		margin: 0.2rem;
		height: 1.4rem;
		border-radius: 4px;
		padding: 0 0.4rem;
		color: #999999;
	}
	#addCar .relatedTerminal button {
		outline: 0;
		border: 0;
		background: #EA3939;
		color: #ffffff;
		float: right;
		margin-top: 0.25rem;
		padding: 0 0.6rem;
		line-height: 1.5rem;
	}
	#addCar .addCarBottom {
		width: 100%;
		height: 14vw;
	}
	#addCar .addCarBottom .saveAdnContinue {
		float: left;
		width: 50%;
		height: 100%;
		background: #0f8de0;
		text-align: center;
		line-height: 14vw;
		color: #ffffff;
		font-size: 14px;
		opacity: 1;
		transition: all 0.2s;
		font-size: 5vw;
	}
	#addCar .addCarBottom .save {
		float: left;
		width: 50%;
		height: 100%;
		background: rgb(151, 0, 0);
		text-align: center;
		line-height: 14vw;
		color: #ffffff;
		font-size: 14px;
		opacity: 1;
		transition: all 0.2s;
		font-size: 5vw;
	}
	#addCar .addCarBottom .pendingbtn {
		opacity: 0.4;
	}
</style>
