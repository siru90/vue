<template>
<div style="position:absolute;width:100%;">
	<header class="aui-bar aui-bar-nav aui-bar-light">
	<router-link :to="{path:'/main/addInstall', query:{serviceId:serviceId,serviceNo:serviceParam,addressDetails:addressDetails,othsid:carId,memo:serviceDescrible,orderDate:subscribeDate,sub:sub,order:order,username:username,phone:phone,address:address }}">
		<div class="go-back">
			<i></i>
			<i></i>
			<i></i>
		</div>
	</router-link>	
		<div class="aui-title">选择服务商</div>
	</header>
	
	<ul class="aui-list aui-media-list address_list top_div" v-for="(item, index) in data" :key="index">
        <router-link :to="{path:'/main/addInstall', query:{serviceId: item.serviceid,serviceNo:serviceParam,addressDetails:addressDetails,othsid:carId,memo:serviceDescrible,orderDate:subscribeDate,sub:sub,sub_1:0,order:order,username:username,phone:phone,address:address}}">	
		<li class="aui-list-item">
			<div class="aui-media-list-item-inner aui-list-item-arrow">
				<div class="aui-list-item-inner">
					<div class="aui-list-item-text">
						<div class="aui-list-item-title"><strong>服务商：{{item.name}}</strong><span class="aui-font-size-14 text_c_gray"></span></div>
					</div>
					<p>地址：{{item.address}}</p>
					<p>联系人：{{item.name}}</p>
					<p>联系电话：{{item.telepone}}</p>
				</div>
			</div>
		</li>
	</router-link>
	</ul>
	
</div>	
</template>

<script>
import {getService} from "../config/getData.js"
import {mapGetters, mapMutations, mapActions} from "vuex"
import {Picker, Popup} from "mint-ui"
import {Toast} from "../../utils/toast2.js"

	export default {
		data() {
			return {
				data: null,
				serviceNo: null,
				addressDetails: null,
				carId: null,
				serviceDescrible: null,
				subscribeDate: null,
				sub: null,//入口跳转参数
				order: null,
				username: null,
				phone: null,
				address: null
			}
		}
		,
		created() {
			this.sub = this.$route.query.sub;
			this.serviceParam = this.$route.query.serviceNo;
			this.addressDetails = this.$route.query.addressDetails;
			// console.log(this.addressDetails);
			this.carId = this.$route.query.carId;
			this.serviceDescrible = this.$route.query.memo;
			this.subscribeDate = this.$route.query.orderDate;
			// console.log(this.subscribeDate)
			this.order = this.$route.query.order;
			this.serviceId = this.$route.query.serviceId;
			this.username = this.$route.query.username;
			this.phone = this.$route.query.phone;
			this.address = this.$route.query.address;

			// this.config = this.serviceConfig;
		}
		,
		computed: {
		  ...mapGetters('xhModules', [
		    'userInfo',
		    'sessionId',
		    'login'
		  ])
		}
		,
		mounted(){
			this.initData();
		}
		,
		methods: {
			async initData() {
				//服务商信息加载
				if(!this.addressDetails){
					for (let i of this.userInfo.addressList) {
					  if (i.defaultaddress == "默认") {
					    this.addressDetails = i.address;
					  }
					}
				}
				let service_data = {
					    "enterpriseid": String(window.api.enterpriseId),
					    "address": this.addressDetails || '',
					    "coordinates": "",
					};
				
				let service_config = {
					url: window.api.mall_base_host + 'service/findServiceProviderInfo',
					method:'post',
					data:JSON.stringify(service_data),
					headers: {'Content-Type':'application/json', 'Accept' : 'application/json'}
				};
				let res;
				res  = await getService(service_config);
					if (res.data.code == 1 || res.data.code == "1") {
					  //如果按照地址未匹配成功，仍然展示服务商列表.
					  let service_data_1 = {
					      "enterpriseid": String(window.api.enterpriseId),
					      "address": '北京',
					      "coordinates": "",
					  };
					  let service_config_1 = {
					  	url: window.api.mall_base_host + 'service/findServiceProviderInfo',
					  	method:'post',
					  	data:JSON.stringify(service_data_1),
					  	headers: {'Content-Type':'application/json', 'Accept' : 'application/json'}
					  };
					  res  = await getService(service_config_1);
					}
				this.data = res.data.distanceList;

			}
		}
	}
</script>
