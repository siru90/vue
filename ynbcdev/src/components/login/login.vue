<template>
	<div class="order_list_div" style="position: absolute;width: 100%">
		<!--头部-->
		<header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
			<router-link to="/main/classify">
				<div class="close_page">
					<i></i>
					<i></i>
					<i></i>
				</div>
			</router-link>
			<div class="aui-title">登录</div>
		</header>
		<div style="height:3.75rem;"></div>
		<div class="aui-content top_div">
			<ul class="aui-list aui-form-list aui-margin-b-15">
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">账号</div>
						<div class="aui-list-item-input">
							<input type="number" placeholder="请输入手机号码" v-model="phoneNumber">
						</div>
					</div>
				</li>
				<li class="aui-list-item">
					<div class="aui-list-item-inner">
						<div class="aui-list-item-label">密码</div>
						<div class="aui-list-item-input">
							<input type="password" placeholder="请输入密码" v-model="password">
						</div>
					</div>
				</li>
			</ul>
			<router-link to="/forget">
				<p class="forgot_password">忘记密码？</p>
			</router-link>
			<div class="aui-content-padded">
				<div style="background:#970000 !important" class="aui-btn aui-btn-danger aui-btn-block" @click="signIn">登录</div>
				<router-link to="/register">
				<div id="register" class="aui-btn aui-btn-danger aui-btn-block aui-btn-outlined">没有账号？立即注册</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {accountLogin, getUserInfoAgain, sendSessionId} from '../config/getData.js'
// import { Toast } from 'mint-ui'
import {Toast} from '../../utils/toast2.js'
import syncCart from "../../utils/syncCart.js";
import * as gwTypes from "../../store/modules/gw-modules/mutation-types";
import axios from 'axios'
import MD5 from '../../../static/script/md5_wxh.js'
import {showLoading, hideLoading} from '../../utils/loading.js'
// import api from '../../api/index.js'
	export default {
		data() {
			return {
				phoneNumber: null,
				password: null,
				goBack:null
			}
		},
		computed: {
			...mapGetters('xhModules',[
				'sessionId',
				'login',
				'userInfo'
			])
			,
			rightPhoneNumber: function (){
		        return /^1\d{10}$/gi.test(this.phoneNumber)
		    }
		},
		created() {
			this.goBack =  this.$route.query.page;
		}
		,
		async mounted() {
			await this.getUserInfo();

		}
		,
		methods: {
			...mapActions('xhModules', [
			  'getUserInfo'
			])
			,
			...mapMutations( 'xhModules', [
				'RECORD_SESSIONID',
				'LOGO_IN',
				'USER_INFO',
			])
			,
			...mapMutations( 'gwModules', [
				gwTypes.CART_NUM_CHANGE,
				gwTypes.CART_ARRAY_CHANGE
			])
			,
			async signIn() {
				if(!this.rightPhoneNumber){
					Toast({
					  message: '手机号码格式不正确',
					  duration: 500,
					  iconClass:"aui-iconfont aui-icon-close"
					});
					return
				} else if(!(/^[a-zA-Z0-9]{6,10}$/.test(this.password))) {
					Toast({
					  message: '密码不正确',
					  // position: 'middle',
					  duration: 500,
					  iconClass:"aui-iconfont aui-icon-close"
					});
					return
				}
				
				let u = navigator.userAgent;
				let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android
				let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios
				let isScript = document.querySelector(".isScript");
				//调象谱cordova获取用户sessionId;
				     if(false) {
				// if(true) {
				showLoading();

				let userName = this.phoneNumber;
				let passWord = this.password;
				var that = this;
				cordova.exec(
					function(response){

						let date = new Date().getTime();
						let data = {
							url: window.api.local_host+'/user/loginVip?enterpriseId='+window.api.enterpriseId+'&token='+date,
							headers:{'sessionId':response}
						};
						//获取sessionId;
						axios(data)
						.then(req => {

							window.localStorage.setItem('sessionId', response);

							that.RECORD_SESSIONID(response);

							that.USER_INFO(req.data.data[0]);
							that.LOGO_IN(true);
							let callback = data => {

					    		that[gwTypes.CART_NUM_CHANGE](data.length);
					    		that[gwTypes.CART_ARRAY_CHANGE](data);
							};
							syncCart(callback);

							if(that.goBack) {
								if(that.goBack === 'signIn'){
									that.$router.replace(that.goBack);
									return
								}
								if(that.goBack === 'MonthFlowGet'){
									that.$router.replace('/main/MonthFlowGet');
									return
								}
								that.$router.go(-1);
								return;
							}

							if(location.href.indexOf("apptype") !== -1){
								let newUrl = "http://" + window.location.host + "/static/YN/H5/index.html?apptype=0#/main/profile";
								window.location.href = newUrl;
								return
							} else {
								let newUrl = "http://" + window.location.host + "/static/YN/H5/index.html#/main/profile";
								window.location.href = newUrl;
							}
						})
						.catch(error => {console.log(error)});
					},
					function(error){
						Toast({
						  message: error,
						  duration: 1000,
						  iconClass:"aui-iconfont aui-icon-close"
						});
					},
					"CommonPlugin","login",[userName, passWord]
				);
					hideLoading();
				} else {
					let res = await accountLogin(this.phoneNumber, MD5(this.password), window.api.enterpriseId);
					if(res.returncode === 0) {
						//登陆失败；
						Toast({
						  message: res.errmsg,
						  duration: 500,
						  iconClass:"aui-iconfont aui-icon-close"
						});


						return
					}
					if(res.returncode === 1) {
						Toast({
						  message: '登录成功！',
						  duration: 500,
						  iconClass:"aui-iconfont aui-icon-correct"
						});

						this.RECORD_SESSIONID(res.data[0]);
						await this.getUserInfo();
						let req =  await getUserInfoAgain(this.sessionId);
					 	this.USER_INFO(req.data[0]);
						this.LOGO_IN(true);

						let callback = data => {

							console.log("登录同步采购车信息，重新渲染采购车成功");

				    		this[gwTypes.CART_NUM_CHANGE](data.length);
				    		this[gwTypes.CART_ARRAY_CHANGE](data);
						}
						syncCart(callback);
						if(this.goBack) {
							if(this.goBack === 'signIn'){
									this.$router.replace(this.goBack);
									return
								}
							if(this.goBack === 'MonthFlowGet'){
									this.$router.replace('/main/MonthFlowGet');
									return
								}
							this.$router.go(-1);
							return
						}
						this.$router.push({path:'/main/profile'});

					}
				}



			}
		}


	}
</script>
<style>

</style>
