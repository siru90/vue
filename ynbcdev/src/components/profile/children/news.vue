<template>
	<div class="order_list_div" style="position: absolute;width: 100%">

		<!--头部-->
		<header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
		<router-link to="/main/profile"> 
			<div class="go-back">
				<i></i>
				<i></i>
				<i></i>
			</div>
		</router-link>	
			<div class="aui-title">我的消息</div>
		</header>
		<div style="height:3rem;"></div>
		<div class="centent">
			<!--消息列表-->
			<ul class="message_list" v-if="data.length">
					<!-- v-show="item.status !== 1 && item.status !== 3" -->
				<div v-for="(item, index) in data">

					<div class="release_time"><span>{{item.createTm}}</span></div>
					<router-link :to="{ path:'/main/newsDetails', query:{newsId: item.rid}}">
					<li>
						<h2>{{item.title}}<em class="aui-text-danger aui-padded-l-10" v-show="item.status == 2">NEW!</em></h2>
						<img :src="item.imageUrl" />
						<!-- <p v-html="item.content">{{item.content}}</p> -->
					</li>
					</router-link>
				</div>
			</ul>
			<div class="no_data" v-else>
			    <img src="static/image/no_order.png"/>
			    <p>暂无消息~</p>
			    <!-- <div class="back_home aui-btn aui-btn-outlined" @click.stop="goHome">逛逛首页</div> -->
			</div>
			<!--消息列表 end-->
		</div>
	</div>
</template>

<script>
import {getNews, getUserInfoAgain} from '../../config/getData.js'
import { Toast } from '../../../utils/toast2.js'
import {mapGetters, mapActions, mapMutations} from 'vuex'

	export default {
		data () {
			return {
				data: '',
				num: ''
			}
		}
		,
		async mounted() {
			await this.getUserInfo();
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
		methods:{
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
			async initData () {
			    let res = await getUserInfoAgain(this.sessionId);
			      	if (res.returncode === 0) {
				        Toast({
				        	message: res.errmsg,
				        	iconClass:"aui-iconfont aui-icon-close",
				        	duration: 500
				        })
				        this.LOGO_OUT(false);
				        return
			    	}

		        this.LOGO_IN(true);
		        this.USER_INFO(res.data[0]);
				

				if(!this.login) {
					this.$router.push({path:'/login'});
				}
				let req = await getNews();
				if(req.returncode == 0) {
					Toast({
					  message: req.errmsg,
					  iconClass:"aui-iconfont aui-icon-close",
					  duration: 500
					});
					return
				}
				this.data = req.data[0];
//				console.log(this.data,'asas');
			}
		}

	}
</script>