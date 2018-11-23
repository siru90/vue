<template>
<div class="order_list_div" style="position: absolute;width: 100%">
	<!--头部-->
	<header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
	<router-link to="/main/profile">
		<div class="close_page"  @click="clearSession">
			<i></i>
			<i></i>
			<i></i>
		</div>
	</router-link>
		<div class="aui-title">找回密码</div>
	</header>
	<div style="height:3.75rem;"></div>
	<div class="aui-content top_div">
		<ul class="aui-list aui-form-list aui-margin-b-15">
			<li class="aui-list-item">
				<div class="aui-list-item-inner">
					<div class="aui-list-item-label">手机号码</div>
					<div class="aui-list-item-input">
						<input type="number" placeholder="请输入手机号码" maxlength="11" v-model="phoneNumber">
					</div>
				</div>
			</li>
			<li class="aui-list-item">
				<div class="aui-list-item-inner">
					<div class="aui-list-item-label">短信验证码</div>
					<div class="aui-list-item-input">
						<input type="text" placeholder="请输入验证码" v-model="mobileCode">
					</div>
					<div class="verify_code">
						<div class="aui-btn" @click="getVerifyCode" v-text="code"></div>
					</div>
				</div>
			</li>
			<li class="aui-list-item">
				<div class="aui-list-item-inner">
					<div class="aui-list-item-label">新密码</div>
					<div class="aui-list-item-input">
						<input type="password" placeholder="请输入6-10位只含有数字和英文字母的密码" v-model="passWord">
					</div>
				</div>
			</li>
		</ul>
		<div class="aui-content-padded">
			<div class="aui-btn aui-btn-danger aui-btn-block" @click="sendInfo">确认</div>
			<router-link to="/login">
				<div class="aui-btn aui-btn-danger aui-btn-block" @click="clearSession">取消</div>
			</router-link>
		</div>
	</div>
</div>
</template>

<script>
import {changePassWordOne, changePassWordTwo} from '../config/getData.js'
import {getStore} from '../config/session.js'
import {mapGetters, mapMutations} from 'vuex'
import { Toast } from '../../utils/toast2.js'
import MD5 from '../../../static/script/md5_wxh.js'

	export default {
		data () {
			return {
				phoneNumber: null,//电话号码
				mobileCode: null,//验证码
				passWord: null,//密码
				code:'获取验证码',
				setInt:null,
				time: 60,
				flag: false,
				getTime:null,
				inputTime: null
			}
		},
		computed: {
			...mapGetters('xhModules',[
				'sessionId'
			]),
		    //判断手机号码
		    rightPhoneNumber: function (){
		        return /^1\d{10}$/gi.test(this.phoneNumber)
		    }
		},
		methods: {
			...mapMutations('xhModules',[
				'RECORD_SESSIONID',
				'ClEAR_SESSIONID'
			])
			,
			async getVerifyCode(){
				if(this.flag) {
					if(this.time >= 0){
						Toast({
						  message: "60秒后可重新获取！",
						  iconClass:"aui-iconfont aui-icon-close",
						  duration: 500
						});
						return	
					} 
				}
				if(this.rightPhoneNumber) {

					//获取短信验证码;
					let res = await changePassWordOne(this.phoneNumber + '/138');

					//判断用户是否存在；
					if(res.returncode === 0) {
						//弹框提示电话号码不存在；
						Toast({
						  message: res.errmsg,
						  iconClass:"aui-iconfont aui-icon-close",
						  duration: 500
						});
						return
					}else if(res.returncode == '1') {
						//提示输入的手机号尚未绑定；
						//验证码已发送；
						Toast({
						  message: '验证码已发送',
						  iconClass:"aui-iconfont aui-icon-correct",
						  duration: 500
						});

						this.setInt = setInterval(() => {
							if(this.time >= 0) {
								this.code = "重新获取验证码"+"("+this.time+")";
								this.time --;
							}
							if(this.time < 0 ) {
								this.code = "获取验证码";

								this.time = 60;
								this.flag = false;
								clearInterval(this.setInt);
							}
						}, 1000)
						
						this.flag = true;
					}
					// this.userInfo = res.data[0];
					this.RECORD_SESSIONID(res.data[0])
					// console.log(this.userInfo)

				} else {
					Toast({
					  message: '手机号码输入不正确',
					  iconClass:"aui-iconfont aui-icon-close",
					  duration: 500
					});
					return
				}


			},
			// stopsetInt() {
			// 	window.clearInterval(this.setInt);
			// 	this.code = "获取验证码";
			// }
			// ,
			async sendInfo() {

				if(!this.rightPhoneNumber) {
					//手机号码输入不正确；
					Toast({
					  message: '手机号码输入不正确',
					  iconClass:"aui-iconfont aui-icon-close",
					  duration: 500
					});
					return
				} else if(!(/^\d{6}$/gi.test(this.mobileCode))) {
					//验证码不正确
					Toast({
					  message: '验证码不正确',
					  iconClass:"aui-iconfont aui-icon-close",
					  duration: 500
					});
					return
				} else if(!(/^[a-zA-Z0-9]{6,10}$/.test(this.passWord))) {
					//提示密码不符合格式
					Toast({
					  message: '密码格式不正确',
					  iconClass:"aui-iconfont aui-icon-close",
					  duration: 500
					});
					return
				}

				let res = await changePassWordTwo(this.phoneNumber, this.mobileCode, MD5(this.passWord), 138);

				if(res.returncode === 0) {
					//修改密码失败；
					Toast({
					  message: res.errmsg,
					  iconClass:"aui-iconfont aui-icon-close",
					  duration: 500
					});
				}
				if(res.returncode === 1){
					//修改成功返回上一页；
					Toast({
					  message: '找回密码成功！',
					  iconClass:"aui-iconfont aui-icon-correct",
					  duration: 500
					});
					this.$router.go(-1);
				}


			}
			,
			clearSession () {
				//如果用戶沒有繼續註冊，則在返回時清楚sessionId
				this.ClEAR_SESSIONID('sessionId');
			}
		},
		watch: {
			userInfo: function(value) {
				this.getVerifyCode();
			}
		}

	}
</script>
