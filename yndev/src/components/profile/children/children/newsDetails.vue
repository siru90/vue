<template>
	<div class="vue_app" style="position: absolute;width: 100%">
		<!--头部-->
		<header class="aui-bar aui-bar-nav aui-bar-light">
		<router-link to="/news">
			<div class="go-back">
				<i></i>
				<i></i>
				<i></i>
			</div>
		</router-link>	
			<div class="aui-title">消息详情</div>
		</header>
		<!-- <div style="height: 3rem;"></div> -->
		<!--头部-->
		<div class="aui-content top_div message_detail">
			<div class="message_title">
				<h2>{{data.title}}</h2>
				<p>发布日期：{{data.createTm}}</p>
			</div>
			<div class="message_con">
				<img :src="data.imageUrl" />
				<p v-html="data.content">{{data.content}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import {getNews, changeNews, getUserInfoAgain} from '../../../config/getData.js'
import { Toast } from '../../../../utils/toast2.js'
import {mapMutations, mapActions, mapGetters} from "vuex";


export default {
	data () {
		return {
			data: null,
			num: null
		}
	}
	,
	async mounted () {
		await this.getUserInfo();
		this.initData();
		this.num = this.$route.query.newsId;
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


			let res = await getNews();
			if(res.returncode == 0) {
				Toast({
				  message: res.errmsg,
				  iconClass:"aui-iconfont aui-icon-close",
				  duration: 2000
				});
				return
			}
			let req = res.data[0];
			for(let i of req) {
				if(i.rid == this.num )
				this.data = i;	
			}
			console.log(this.data, this.num)

			let changedNews = await changeNews(this.num);
			console.log(changedNews);
		}
	}
}
</script>