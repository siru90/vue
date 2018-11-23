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
			<div class="aui-title">服务中心</div>
		</header>
		<div style="height:3rem;"></div>
		<div class="aui-row top_div order_class">
		<div id="call_server" class="aui-col-xs-4"  @click="online">
			<i class="icon njfont nj-kefu"></i>
			<div class="aui-grid-label">在线客服</div>
			<div class="right_line"></div>
		</div>
		<router-link to="/callserver">
			<div id="call_server" class="aui-col-xs-4">
				<i class="icon njfont nj-dianhua"></i>
				<div class="aui-grid-label">电话客服</div>
				<div class="right_line"></div>
			</div>
		</router-link>
		<router-link to="/feedback">	
			<div id="feedback" class="aui-col-xs-4">
				<i class="icon njfont nj-bianji"></i>
				<div class="aui-grid-label">意见反馈</div>
			</div>
		</router-link>	
		</div>
		<div class="server_con">
			<h4>常见问题</h4>
			<div class="aui-searchbar-input search_question">
				<i class="icon njfont nj-sousuo"></i>
				<input type="search" placeholder="有问题？点我搜搜看吧~" id="search-input" v-model="describle">
				<!--输入信息直接过滤问题不用点击搜索，点击关闭图标清除搜索-->
				<div class="aui-searchbar-clear-btn">
					<i class="aui-iconfont aui-icon-close"></i>
				</div>
			</div>
			<ul>
				<li :key="index"  v-for="(item,index) in data">
					<p>Q：{{ item.describle }}</p>
					<p class="aui-text-danger">A：{{ item.answer }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import { questionList, getUcUserInfo, getUserInfoAgain } from '../config/getData.js'
import { Toast } from '../../utils/toast2.js'


	export default {
		data() {
			return {
				describle: null,
				data: null
			}
		}
		,
		computed: {
			...mapGetters('xhModules',[
				'sessionId',
				'userInfo'
			])
		},
		mounted(){
			this.initData();
		}
		,
		watch: {
			describle(newValue, oldValue) {
				this.initData(newValue)
			}
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
			async initData(val) {
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

		        
				let res = await questionList(this.describle);
				if(res.returncode == 0) {
					Toast({
					  message: res.errmsg,
					  iconClass:"aui-iconfont aui-icon-close",
					  duration: 2000
					});
					return
				}
				this.data = res.data;
			},
			 getHttp() {
				return location.href.match(/^(http|https)\:.+/)[1];
			}
			,
			async online() {
				let res = await getUcUserInfo(this.sessionId);
				let userId =  res.data[0].userId
				let req = {
					userid : userId,
					pwd: this.sessionId,
					enterpriseCode: 201709270000001,//线上
					// enterpriseCode: 356635158431986,//测试
					biztype: '',
					bizid: '',
					channel: null,
					domain: "suneeedev",
					bizurl: '',
					seatName: '%E5%94%AE%E5%90%8E',
					mobile: this.userInfo.phone,
					account: encodeURI(this.userInfo.phone),
					sourceurl: window.location.href,
				};
				let url = this.getHttp() + "://yuchai.weilian.cn:17999/yncrm/crm_web_client";//现网
				// let url = "http://116.10.197.142:13008/yncrm/crm_web_client";//测试
				
				let dataStr = ''; //数据拼接字符串
				Object.keys(req).forEach(key => {
					dataStr += key + '=' + req[key] + '&';
				})

				if (dataStr !== '') {
					dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
					url = url + '?' + dataStr;
				}
				this.$router.push({path:'/inline', query:{urlData:url}});
				// window.location.href=url;
			}
		}
	}
</script>

<style scoped>
	a {
		color: #495060 !important;
	}
	.server_con{
		/*height: 500px;*/
	}
</style>
