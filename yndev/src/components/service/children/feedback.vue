<template>
<div class="order_list_div" style="position: absolute;width: 100%">
	<!--头部-->
	<header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
	<router-link to="/service">
		<div class="close_page">
			<i></i>
			<i></i>
			<i></i>
		</div>
	</router-link>	
		<div class="aui-title">意见反馈</div>
	</header>
	<div style="height:2.8rem;"></div>
	<div class="feedback">
		<p>选择类型</p>
		<div class="standard_con">
			<li :class="num == index ? 'active' : ''" v-for="(item, index) in data" :key="index" @click="num = index; categoryName = item.name" >{{ item.name }}<i class="icon njfont nj-xuanzhong"></i></li>
		</div>
		<p>描述</p>
		<div class="feedback_text">
			<textarea placeholder="输入意见建议详情，帮助我们更好的理解您的心声" v-model="describle"></textarea>
			<em>0/500</em>
		</div>
		<p class="aui-margin-b-15">联系方式（建议您至少留下一个联系方式）</p>
		<ul class="aui-list aui-form-list aui-margin-b-15">
			<li class="aui-list-item">
				<div class="aui-list-item-inner">
					<div class="aui-list-item-label">联系方式</div>
					<div class="aui-list-item-input">
						<input type="number" placeholder="请输入手机号码" v-model="phone">
					</div>
				</div>
			</li>
			<li class="aui-list-item">
				<div class="aui-list-item-inner">
					<div class="aui-list-item-label">电子邮箱</div>
					<div class="aui-list-item-input">
						<input type="number" placeholder="请输入邮箱地址" v-model="mail">
					</div>
				</div>
			</li>
		</ul>
	</div>
	<div class="aui-content-padded">
		<div class="aui-btn aui-btn-danger aui-btn-block" @click="submit()">提交</div>
	</div>
</div>
</template>

<script>
	import {queryQaCategoryList, submitQaAdvice, getUserInfoAgain} from '../../config/getData.js'
	import { Toast } from '../../../utils/toast2.js'
	import {mapMutations, mapActions, mapGetters} from "vuex";
	export default {
		data() {
			return {
				data: null,
				num: 0,
				phone: null,
				describle: null,
				mail: null,
				categoryName: null
			}
		}
		,
		mounted() {
			this.initData();
		}
		,
		computed:{
			...mapGetters('xhModules', [
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
			  'ClEAR_SESSIONID',
			  'LOGO_OUT',
			  'LOGO_IN',
			  'CLEAR_INFO'
			])
			,
			async initData() {
			    let response = await getUserInfoAgain(this.sessionId);
			      	if (response.returncode === 0) {
				        Toast({
				        	message: response.errmsg,
				        	iconClass:"aui-iconfont aui-icon-close",
				        	duration: 2000
				        })
				        this.LOGO_OUT(false);
				        return
			    	}

		        this.LOGO_IN(true);
		        this.USER_INFO(response.data[0]);

				let res = await queryQaCategoryList()
				if(res.returncode == 0) {
					Toast({
					  message: res.errmsg,
					  iconClass:"aui-iconfont aui-icon-close",
					  duration: 2000
					});

					return
				}
				this.data = res.data[0];
			}
			,
			async submit () {
				let categoryId = this.data[this.num].categoryId;
				
				let res = await submitQaAdvice( this.categoryName, categoryId,  this.describle, this.phone);
				if(res.returncode == 0) {
					Toast({
					  message: res.errmsg,
					  iconClass:"aui-iconfont aui-icon-close",
					  duration: 2000
					});
					return
				} else if (res.returncode == 1) {
					Toast({
					  message: "反馈提交成功",
					  iconClass:"aui-iconfont aui-icon-correct",
					  duration: 2000
					});

					this.$router.push({ path:'/service'})	
				}
			}
		}
	}
</script>