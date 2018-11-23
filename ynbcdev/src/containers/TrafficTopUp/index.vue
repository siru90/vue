<template>
	<div>
		<div class="vue_app" style="position: absolute;width: 100%;height: 100%;">
			<!--头部-->
			<header class="aui-bar aui-bar-nav aui-bar-light">
				<div class="go-back" @click.stop="goBack">
					<i></i>
					<i></i>
					<i></i>
				</div>
				<div class="aui-title">流量充值</div>
			</header>
			<div class="aui-content" style="width: 100%;height: 100%;">
				<div>
					<div style="height: 3rem;"></div>
					<div class="headBottom">
						<div>{{receiveflow}}M</div>
						<div>可充值流量</div>
					</div>
					<!--v-for="(item,index) in initData" :key="index"-->
					<ul class="aui-list aui-media-list address_list"  v-if="initData && initData.length">
						<li class="aui-list-item">
							<div class="aui-list-item-inner" style="padding-left: 0.75rem;">
								<div class="aui-list-item-text">
									<div class="aui-list-item-title">
										选择待充值终端
									</div>
								</div>
							</div>
						</li>
					</ul>
					<ul class="aui-list aui-media-list address_list top_div"  v-if="initData && initData.length">
						<li class="aui-list-item" v-for="(item,index) in initData" :key="index">
							<div class="aui-media-list-item-inner">
								<div class="aui-list-item-inner">
									<p><span>终端号：</span v-if="item.terminalno">{{item.terminalno}}</p>
									<p><span>车牌号：</span v-if="item.plateno">{{item.plateno}}</p>
								</div>
								<div class="addMoneyBtnP">
									<span class="addMoneyBtn">
										<input type="checkbox" class="aui-checkbox aui-checkbox" :checked="item.flag" @click.stop="changeCheckFlag($event, index, item.plateno)" />
									</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div style="width: 100%;height: 4rem;">
					
				</div>
			</div>
			<div class="trafficFooter lijixiadan" v-if="initData && initData.length">
                <div class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click.stop="flowTopUp">立即充值</div>
           </div>
            <!--暂无数据时显示-->
	        <div id="contorlShow" v-if="!initData || !initData.length">
				<div id="disShow">
					<img src="static/image/no_car_img.png" alt="" />
					<p>你还没有绑定终端，无法充值！</p>
					<p @click="toGetZhongDuan">获取终端</p>
				</div>
			</div>
			<recharge ref="Recharge"></recharge>
		</div>
	</div>
</template>
<script>
	import {Toast} from '../../utils/toast2';
	//import { MessageBox } from 'mint-ui';
	//import {Toast} from "../../utils/toast2";
//	import TabHead from "../../components/TabHead";
	import Recharge from "../../components/Recharge";
	import axios from 'axios';
	import { mapGetters, mapMutations } from "vuex";
	export default {
		props: {

		},
		data() {
			return {
				allData:null,
				initData:[],
				checkIMg:true,
				receiveflow:0  // 流量值
			}
		},
		components: {
			"Recharge":Recharge
		},
		computed: {
			...mapGetters("xhModules", [
				"userInfo","sessionId"
			]),			
		},
		methods: {
			//返回上一个页面
			goBack() {
				/*this.$router.push('profile');*/
				window.history.back();
			},
			// 选择充值 终端和车牌  调接口取用  flag 为 true 的就行  
			changeCheckFlag(event, index, plateno) {
				
				
				for(let i = 0; i < this.initData.length; i++) {
					if(i == index) {
						console.log(plateno,this.initData[i].plateno,'55555')
						this.initData[i].flag = true;
						//如果当前点击的仍然为选中的那一个，选中状态保留
						if(this.initData[i].plateno === plateno) {
							event.target.checked = true;
						}
						console.log(event.target.checked);
					} else {
						this.initData[i].flag = false;
					}
				}
				console.log(this.initData);
			},
			//获取用户中心ID
			getUserId(){
				let url = window.api.local_host + '/user/getUcUserInfo';
				let params = {
					token:new Date().getTime()
				}
				let config = {
					method:'GET',
					url:url,
					headers: {
						'sessionId': window.localStorage.getItem("sessionId")
					},
					params
				}
				axios(config).then((res)=>{
					if(res.data.returncode == 1){
						console.log(res.data.data[0],'获取用户中心数据');
						var id = res.data.data[0].userId;
						this.getInitaData(id);
					}

				})
			},
			// 获取可充值终端和车牌号信息
			getInitaData(id){
				console.log(this.userInfo,'用户信息');
				let url = window.api.mall_base_host + 'flowMonthDtl/getCarMsg';
				let params = {
					vipid:id,
					enterpriseid:window.api.enterpriseid
				}
				let config = {
					method:'GET',
					url:url,
					params
				}
				axios(config).then((res)=>{
//					returnCode 1 代表成功 0 代表失败
					console.log(res.data.returnCode);
					if(res.data.returnCode == 1){
						if(res.data.data && res.data.data.length){
							this.allData = res.data.data[0];
							var arr = res.data.data[0].list;
							//必须 创建对象重新赋值属性不然  ：checkbox不会响应
							for(let i = 0 ; i < arr.length; i++){
								let obj = {};
								obj.flag = false;
//								obj.plateno = arr[i].plateno;   //车牌号
//								obj.terminalno = arr[i].terminalno;  //终端号

								obj.plateno = arr[i].car_id;  //车牌号
								obj.terminalno = arr[i].dtu_id;  //终端号
								
								this.initData.push(obj);
							}
							console.log(arr)
						}
					}else{
						console.log('未获取到可用终端');
					}
				})
			},
			toGetZhongDuan(){
				this.$router.push({path:'/searchresult',query:{keyword:'终端',from:'trafficTopUp'}})
			},
			flowTopUp(){
				var obj = {};
				var flag = false;
				if(this.$route.query.item){
					obj = this.$route.query.item;
				}
				for(let i = 0 ;i < this.initData.length; i++){
					if(this.initData[i].flag){
//						console.log(this.initData[i].terminalno,'555222')
						obj["plateno"] = this.initData[i].plateno;
						obj["terminalno"] = this.initData[i].terminalno;
						flag = true;
					}
				}
				//整个对象传过去 下个页面有哪个id就会取哪个id
				if(!flag){
					Toast({
                        message: '请选择终端',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 1000
                    });
                    return ;
				}
				
				if(JSON.stringify(obj) == '{}'){
					Toast({
                        message: '未获取到终端',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 1000
                    });
                    return ;
				}
				if(JSON.stringify(obj) != '{}' && !obj.plateno){
					Toast({
                        message: '未获取到车牌号',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 1000
                    });
                    return ;
				}
				if(JSON.stringify(obj) != '{}' && !obj.terminalno){
					Toast({
                        message: '未获取到终端号',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 1000
                    });
                    return ;
				}
				if(!this.$route.query.item){
					console.log(123)
					Toast({
                        message: '未获取到流量信息',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 1000
                    });
                    return ;
				}
//				console.log("obj", obj);
				console.log(obj)
				
				this.$refs.Recharge.rToast({state: 2,rechargeParams:obj});
			}
		},
		watch: {
//			platenoData(newVal,oldVal){
//				console.log(newVal)
//			}
		},
		created(){
//			console.log(this.$store.state.xhModules.userInfo,'用户id');
//			this.$route.query.item
			if(this.$route.query.item){
				this.receiveflow = this.$route.query.item.receiveflow || this.$route.query.item.flow || 0;
				this.getUserId();
			}else{
				this.$router.push('profile');
			}

			// this.getInitaData();
		}
	}
</script>

<style scoped="scoped">
.headBottom{
	background: #0F8DE0;
	margin: 0 auto;
	text-align: center;
	width: 100%;
	color: #fff;
}
.headBottom div:first-child{
	padding-top: 1.5rem;
	font-size: 24px;
}
.headBottom div:last-child{
	padding-bottom: 1.5rem;
	padding-top: 0.2rem;
}
.zhongDuanLeft{
	float: left;
}
.zhongDuanRight{
	float: right;
}
.addMoneyBtn{
	position: absolute; 
	top: 50%; 
	transform: translateY(-50%);
    border: 1px solid;
    border-radius: 0.2rem;
    margin-right: 0.2rem;
    padding: 0.2rem;
    color: #fff;
    white-space: nowrap;
}
.addMoneyBtnP{
	width: 15%;
	height: 100%;
}
.footer{
	height: 3rem;
    background: rgba(255, 255, 255, 0.9);
    overflow: hidden;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -1px;
    display: table;
    border-top: 1px solid #eaeaea;
    z-index: 1;
}
.sureMoney{
	widows: 80%;
	margin: 0 auto;
	text-align: center;
	margin-top: 0.3rem;
	background: #0F8DE0;
	font-size: 0.7rem;
    height: 1.8rem;
    line-height: 1.85rem;
}
.trafficFooter{
	height: 3rem;
    background: rgba(255, 255, 255, 0.9);
    overflow: hidden;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -1px;
    display: table;
    border-top: 1px solid #eaeaea;
    z-index: 1;
}
/*暂无数据样式*/
#contorlShow{
	position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
}
#disShow{
	/*width: 50%;*/
	height: 50%;
	margin: 0 auto;
}
#disShow img{
	width: 50%;
	margin: 0 auto;
}
#disShow p{
	text-align: center;
	margin-top:1.5em;
}
#disShow p:last-child{
	margin: 0 auto;
	margin-top: 1.5rem;
    height: 1.8rem;
    width: 7rem;
	line-height: 1.8rem;
    border: 1px solid #88C4EB;
    border-radius: 0.3rem;
    color: #0F8DE0;
    font-size: 16px;
}
</style>