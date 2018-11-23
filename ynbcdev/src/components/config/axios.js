import axios from 'axios'
// import api from '../../api/index.js'

export default async(url = '', data = null, type = 'GET', get="") => {
	// alert(1)

	type = type.toUpperCase();
	let url_base = window.api.mall_base_host + url;
	url = window.api.local_host + url;
	// url = "172.19.5.136:8112" + url;

  	let date = new Date().getTime();
	let sess = window.localStorage.getItem('sessionId');

	if(type == 'GET') {

		if(data == null) {
			url = url + '?token='+date;

		} else {
			if(get == 'method'){
				url = url_base + '?' + data ;
			} else {
				url = url + data + '?token='+ date;
			}
		}



		let confing = {
			url: url,
			headers: {'sessionId': sess, 'Content-Type':'application/json', 'Accept' : 'application/json'},
		}
		try {
			const  response_get = await axios(confing);
			return response_get.data
		}	catch (error) {
			throw new Error(error)
		}

	}

	if (type == 'POST') {

		let config = {
			url: url,
			method:'post',
			data:JSON.stringify(data),
			headers: {'sessionId': sess, 'Content-Type':'application/json', 'Accept' : 'application/json'},
		}

		if(get == 'method') {
			config.headers = {'Content-Type':'application/json', 'Accept' : 'application/json'}; 	
		}
		try {
			const  response_post = await axios(config);
			return response_post.data
		}	catch (error) {
			throw new Error(error)
		}
	}


	if (type == "PUT") {
		// const response_pust = axios.put(url, JSON.stringify(data)).then(res => {return res})
		// return response_pust.data;
		let confing = {
			url:url,
			method:'put',
			data:JSON.stringify(data),
			headers: {'sessionId': sess, 'Content-Type':'application/json', 'Accept' : 'application/json'},
		}
		try {
			const  response_post = await axios(confing);
			return response_post.data
		}	catch (error) {
			throw new Error(error)
		}
	}

}
