<template>
	 <div>
		<div style="position: relative; left: 0px;padding-top:2.55rem;"><!--头部-->
			<header class="aui-bar aui-bar-nav aui-bar-light">
				<div class="go-back" @click="goBack">
					<i></i>
					<i></i>
					<i></i>
				</div>
				<div class="aui-title">上传退货信息</div>
			</header>
			<div style="" class="addresseeMsg">			
				<p class="addresseeMsg-note">温馨提示：退货时请按以下地址回寄</p>
				<ul class="addresseeMsg-form">
					<li>
						<span style="float:left">收件人</span>
						<span style="float:right">right</span>
					</li>
					<li>
						<span style="float:left">联系电话</span>
						<span style="float:right">right</span>
					</li>
					<li>
						<span style="float:left">回寄地址</span>
						<span style="float:right">right</span>
					</li>
				</ul>
			</div>
			<div class="aui-content aui-margin-b-15">
				<ul class="aui-list aui-list-in">
					<li class="aui-list-item">
						<div class="aui-list-item-inner aui-list-item-arrow" style="display:flex;justify-content:flex-start;">
							<div class="aui-list-item-title" style="padding-right: 0.25rem;">物流公司：<font class="required">*</font></div>
							<input v-model="companyName" style="padding-left: 0.4rem;" placeholder="请填写物流公司名称" type="text"/>
							<p id="picker1" v-if="false">请选择</p>
						</div>
					</li>
					
					<li class="aui-list-item aui-content aui-list aui-form-list">
						<div class="aui-list-item-inner" style="padding-right:1.5rem;">
							<div class="aui-list-item-label">物流单号：<font class="required">*</font></div>
							<div class="aui-list-item-input">
								<input placeholder="请填写物流单号" style="padding-left: 0.4rem;" v-model="logisticsNo" type="text">
							</div>
								<i style="padding-right: 0.6rem;" class="icon njfont nj-saoyisao" v-if="false"></i>
						</div>
					</li>
					

				</ul>
				<img-upload ref="upload" :customFn="uploadImgCallback" :loading="false" :toast="false" :autoClear="false"></img-upload>

			</div>
			<!--底部按钮-->
			<div style="height:4rem;"></div>
			<div class="settle_accounts lijixiadan">
				<div class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click="submit">提交物流信息</div>
			</div>
		</div>
	</div> 
</template>
<script>
	import ImgUpload from "../../components/ImgUpload";
	import {postLogisticsInfo, regRules} from "../../utils/postLogisticsInfo";
	import Validator from "../../utils/validator";
	import {Toast} from "../../utils/toast2";
	import {showLoading, hideLoading} from "../../utils/loading";
	export default {
		props: {

		},
		data () {
			return {
				companyName: "",
				imgUrlArray: [],
				no: "",
			}
		},
		computed: {
			serviceNo() {
				// return "1127684370832207";
				return this.$route.query.serviceNo;
			},
			logisticsCompany() {
				return this.companyName;
			},
			//物流单号
			logisticsNo: {
				get: function () {
					// console.log(this.no);
					return this.no;
				},
				set: function (value) {
					this.no = value;
				},
			},
			logisticsPhoto() {
				return this.imgUrlArray.join(",");
			},
			//
			orderSubNo() {
				return this.$route.query.orderSubNo;
			}
		},
		methods: {
			//返回上一页
			goBack() {
				this.$router.replace({path: "/afterSale", query: {activeIndex: 1, orderSubNo: this.orderSubNo}});
			},
			submit() {
				showLoading();
				this.$refs.upload.upload();
			},
			uploadImgCallback(data) {
				if (data.status) {
					
					//上传图片成功
					// console.log(data.data);
					this.imgUrlArray = data.data;
					let errorMsg = this.validatorForm();
					if (errorMsg) {
						hideLoading();
						return;
					}
					let callback = (data) => {
						console.log(data);
						hideLoading();
						if (data.returncode) {
							this.successToast("信息提交成功");
							setTimeout(() => {
								this.$refs.upload.deleteImg();
								this.goBack();
							}, 1000);
						} else {
							this.failToast(data.errmsg);
						}
						
					}
					let errFn = () => {
						hideLoading();
						this.failToast("信息提交失败");
					}
					let params = {
						serviceNo: this.serviceNo,
						logisticsCompany: this.logisticsCompany,
						logisticsNo: this.logisticsNo,
						logisticsPhoto: this.logisticsPhoto
					}
					postLogisticsInfo(params, callback, errFn);
				} else {
					//图片上失败
					hideLoading();
					this.failToast("图片上传失败");
				}
			},
			//显示成功Toast
            successToast(msg) {
                Toast({
                    duration: 1000,
                    message: msg,
                    iconClass: "aui-iconfont aui-icon-correct"
                });
            },
            //显示失败Toast
            failToast(msg) {
                Toast({
                    duration: 1000,
                    message: msg,
                    iconClass: "aui-iconfont aui-icon-close"
                });
			},
			//配置表单校验
			validatorForm() {
				let v = new Validator();
				// console.log("this.logisticsCompany", this.logisticsCompany)
				v.adds(this.logisticsCompany, [["notEmpty", "物流公司名称不能为空"]]);
				// v.add(this.logisticsNo, "notEmpty", "= = 运维君表示请填写物流单号");
				// v.add(this.logisticsNo, "isNumber", "大佬，物流单号格式不正确");
				// console.log("this.logisticsNo", this.logisticsNo)
				v.adds(this.logisticsNo, [
					["notEmpty", "物流单号不能为空"],
					["isNumberAndLetter", "物流单号格式不正确"],
				]);
				v.add(this.logisticsPhoto, "notEmpty", "请至少上传一张图片");
				return v.start();
			},
			initValidator() {
				// let v = v.getInstance();
				console.log("121212112", this.logisticsCompany);
				v.adds(this.logisticsCompany, [["notEmpty", "你造吗，物流公司名称不能为空"]]);
				// v.add(this.logisticsNo, "notEmpty", "= = 运维君表示请填写物流单号");
				// v.add(this.logisticsNo, "isNumber", "大佬，物流单号格式不正确");
				v.adds(this.logisticsNo, [
					["notEmpty", "= = 运维君表示请填写物流单号"],
					["isNumber", "大佬，物流单号格式不正确"],
				]);
				v.adds(this.logisticsPhoto, [["notEmpty", "你造吗，要至少上传一张图片"]]);
			},
		},
		components: {
			"img-upload": ImgUpload
		},
		created() {
			//初始化表单验证的配置
			// this.initValidator();
		}

	}
</script>

<style scoped>
	.addresseeMsg-form {
		padding: 0.2rem 0.3rem;
		overflow: hidden;
	}
	.addresseeMsg-form li {
		color: #666666;
		height: 1.5rem;
		line-height: 1.5rem;
	}
	.addresseeMsg-form li span:nth-child(2) {
		color: #999999;
	}
	.addresseeMsg-note{
		color: #EA3939;
		padding: 0.2rem 0.3rem;
		border-bottom: 1px solid #ededed;
	}
	.addresseeMsg {
		margin: 0.4rem;
		background: #ffffff;
		border-radius: 4px;
	}
	.aui-list-item {
		background: #fff !important;
	}
	.aui-list-item-arrow:before {
		opacity: 0;
	}
	input[type="text"] {
		width: auto !important;
	}
</style>


