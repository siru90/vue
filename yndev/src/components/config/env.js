let baseUrl = '';
let imgBaseUrl = '';

if(process.env.NODE_ENV ==  'development') {
	baseUrl = 'http://116.10.197.134:40884';
}else if(process.env.NODE_ENV == 'production') {
	baseUrl = '';
}

export default{
	baseUrl,
	imgBaseUrl
}