import axios from 'axios'
//import api from '../../api/index.js'
//const api = window.api;
export default async(url = '', data = null, type = 'GET') => {

	type = type.toUpperCase();
//	url = 'http://172.16.36.70:40881/clientotherinfo' + url;
//	url = 'http://base.scn.weilian.cn/clientotherinfo' + url;
//	url = 'http://base.scn.weilian.cn/clientotherinfo'+url;

	url = window.api.mall_base_host+"clientotherinfo"+url;
	let sess = window.localStorage.getItem('sessionId');

	if(type == 'GET') {
		if(data == null) {
			url = url;
		} else {
			url = url + data;
		}
		console.log(url+'获取车辆请求地址');	
		let confing = {
			url: url + "&token=" + new Date().getTime(),
			// headers: {'sessionId': sess, 'Content-Type':'application/json', 'Accept' : 'application/json'},
		}
		try {
			const  response_get = await axios(confing);
			return response_get.data
		}	catch (error) {
			throw new Error(error)
		}

	}

	if (type == 'POST') {
		console.log(url);
		let confing = {
			url: url,
			method:'post',
			data:JSON.stringify(data),
//			headers: {'sessionId': sess, 'Content-Type':'application/json', 'Accept' : 'application/json'},
			headers: {'Content-Type':'application/json', 'Accept' : 'application/json'},
		}
		try {
			let  response_post = await axios(confing);
			return response_post.data
		}	catch (error) {
			throw new Error(error)
		}
	}	
}
