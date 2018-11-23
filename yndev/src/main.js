// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// let v = "vue";
// localStorage.setItem("sessionId", "e82a3b8d10d341f8ad20fca2522f1bc0");
import Vue from "vue";
import App from './App'
import router from './router'
import store from "./store";
import 'mint-ui/lib/style.css'
import '@/lib/css/mall.less';
import initUUID from "./utils/initUUID";
import "./utils/publish-subscription";
import axios from "axios";
import {showLoading, hideLoading} from "./utils/loading";
import {Toast} from "./utils/toast2";
//图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
	loading: 'static/image/demo1.png',
	error: 'static/image/demo1.png',
});
Vue.config.productionTip = false
//初始化UUID
initUUID();
let getHttp = () => {
    return location.href.match(/^(http|https)\:.+/)[1];
}

function initData() {
	showLoading();
	// let port = window.location.port ? ":" + window.location.port : "";

	// let host = "http://" + window.location.host + port;
	let host = (window.location.host.indexOf("localhost") > -1 ||  
    	window.location.host.indexOf("127.0.0.1") > -1) ? "http://test-mall.scn.weilian.cn" : 
        	`${getHttp()}://` + window.location.hostname;
	// console.log("动态获取host", host);
//	 let host = "http://test.mall.yn.weilian.cn";
	// let host = "http://172.19.5.193:8112";
//	 let host = "http://mall.yn.weilian.cn";
	 //let host = "http://pre.mall.yn.weilian.cn";

	let options = {
		method: "post",
		data: {"parameterStr":[
			"mall_goods_host",
			"mall_purchase_host",
			"mall_contract_host",
			"mall_finance_host",
			"mall_reportform_host",
			"mall_sale_host",
			"mall_supplier_host",
			"mall_wholesale_host",
			"mall_storage_host",
			"mall_base_host",
			"mall_file_host"
		]},
		url: host + "/resourceLevel/getMallParameter",
		timeout: 10000
	}

	axios(options).then(data => {
		console.log(data);
		if (data.status === 200 && data.data.data[0]) {
			window.api = {};
			data.data.data[0].forEach(item => {
				//如果是测试环境就作处理，去掉最后的"/"
				if (item.key === "mall_file_host" && item.value.lastIndexOf("/") === item.value.length - 1) {
					//window.api[item.key] = item.value.slice(0, item.value.length - 1).replace(/http/,getHttp());
					let v = item.value.slice(0, item.value.length - 1)
					window.api[item.key] = /https/.test(v) ? v : v.replace(/http/,getHttp());
				} else {
					//window.api[item.key] = item.value.replace(/http/,getHttp());
					window.api[item.key] = /https/.test(item.value) ? item.value : item.value.replace(/http/,getHttp());
					console.log(window.api[item.key])
				}

			});
			window.api.local_host = host;
			window.api.enterpriseId = 138;
			window.api.enterpriseid = 138;
			window.api.freight = 10;
			window.api.goods_api = "/getErpGoodsInfo/queryGoodsListForPage";
			new Vue({
				el: '#app',
				store,
				router,
				template: '<App/>',
				components: { App }
			});
		} else {
			console.log("接口请求失败");
			initCache();
		}
		hideLoading();

	}).catch(err => {
		console.log(err);
		initCache(host);
		hideLoading();
		Toast({
			message: "网络出错啦~",
			duration: 1000,
			iconClass: "aui-iconfont aui-icon-warn"
		});
	});
}
function initCache(host) {
	window.api = {
		// "local_host": "http://test.mall.yn.weilian.cn",//运营后台地址
		"local_host": host,//运营后台地址
		// "local_host": "http://test.njxs.weilian.cn:8112",//运营后台地址
		// "local_host": "http://172.19.5.145:8112",//运营后台地址
		"mall_base_host":	    "http://test.base.scn.weilian.cn/",	//商城调用base模块的地址
		"mall_contract_host":	"http://test.contract.scn.weilian.cn/",	 //商城调用contract模块的地址
		"mall_finance_host":	"http://test.finance.scn.weilian.cn/",	 //商城调用finance模块的地址
		"mall_purchase_host":	"http://test.purchase.scn.weilian.cn/",	 //商城调用purchase模块的地址
		"mall_reportform_host":	"http://test.reportform.scn.weilian.cn/",	 //商城调用reportform模块的地址
		"mall_sale_host":	     "http://test.sale.scn.weilian.cn/",	 //商城调用sale模块的地址
		"mall_supplier_host":	"http://test.supplier.scn.weilian.cn/",	  //商城调用supplier模块的地址
		"mall_wholesale_host":	"http://test.wholesale.scn.weilian.cn/",	//商城调用wholesale模块的地址
		"mall_storage_host":	"http://test.storage.scn.weilian.cn/",	//商城调用storage模块的地址,
		"mall_goods_host": "http://test.goods.scn.weilian.cn/", //商城调用goods模块的地址
		// "mall_file_host": "http://test.files.scn.weilian.cn:40899", //商城调用文件服务器地址
		"mall_file_host": "https://files.scn.weilian.cn", //商城调用文件服务器地址
		"enterpriseId": 138,
		"enterpriseid": 138
	}
	new Vue({
		el: '#app',
		store,
		router,
		template: '<App/>',
		components: { App }
	});
}
initData();
// window.onresize = () => {
// 	console.log("resize事件");
// 	console.log("document.body.clientHeight", document.body.clientHeight);
// 	console.log("window.screen.availHeight", window.screen.availHeight);
// }
// new Vue({
// 	el: '#app',
// 	store,
// 	router,
// 	template: '<App/>',
// 	components: { App }
// });

