

const profile = resolve => require(['../components/profile/profile'], resolve);
const persion = resolve => require(['../components/profile/children/persion'], resolve);
const car = resolve => require(['../components/profile/children/car'], resolve);
const addCar = resolve => require(['../components/profile/children/children/addCar'], resolve);
const discount = resolve => require(['../components/profile/children/discount'], resolve);
const news = resolve => require(['../components/profile/children/news'], resolve);
const newsDetails = resolve => require(['../components/profile/children/children/newsDetails'], resolve);
const favourite = resolve => require(['../components/profile/children/favourite'], resolve);
const login = resolve => require(['../components/login/login'], resolve);
const forget = resolve => require(['../components/login/forget'], resolve);
const order = resolve => require(['../components/order/order'], resolve);
const logistics = resolve => require(['../components/order/logistics'], resolve);
const orderDetails = resolve => require(['../components/order/orderDetails'], resolve);
const orderPay = resolve => require(['../components/order/orderPay'], resolve);
const register = resolve => require(['../components/login/register'], resolve);
const install = resolve => require(['../components/install/install'], resolve);
const installDetails = resolve => require(['../components/install/install_details'], resolve);
const serviceInfo = resolve => require(['../components/install/service'], resolve);
const addInstall = resolve => require(['../components/install/add_installation'], resolve);
const service = resolve => require(['../components/service/service'], resolve);
const feedback = resolve => require(['../components/service/children/feedback'], resolve);
const callserver = resolve => require(['../components/service/children/call_server'], resolve);
const about = resolve => require(['../components/about/about'], resolve);
const inline = resolve => require(['../components/service/children/inline'], resolve);
const orderRefound = resolve => require(['../components/orderRefound/orderCommit'],resolve);
const orderRefoundDetails = resolve => require(['../components/orderRefound/orderDetails'],resolve);
const newLogin = resolve => require(['../components/login/newLogin'], resolve);
const xhRouter = [
	{
		path: '/register',
		component: register
	},{
  		path: '/login',
  		component: newLogin
  	},{
  		path: '/forget',
  		component: forget
  	},
  	{
  	  path: '/persion',
  	  component: persion
  	},
  	{
  	  path: '/inline',
  	  component: inline
  	},
    {
    	path: '/service',
		component: service
    },
    {
    	path: '/feedback',
		component: feedback
    },
    {
    	path: '/callserver',
		component: callserver
    },
    {
  		path: '/installDetails',
  		component: installDetails
	},
	{
		path: '/news',
		component: news
	},
	{
		path: '/discount',
		component: discount
	},
	
		
];



const xhRouterChildren = [
	  	{
	  		path: 'profile',
	  		component: profile
	  	},
		{
			path: 'car',
			component: car
		},
		{
			path: 'addCar',
			component: addCar
		},
		
		{
			path: 'newsDetails',
			component: newsDetails
		},
		{
			path: 'favourite',
			component: favourite
		},
	    
	  	
	  	{
	  		path: 'order',
	  		component: order
	  	},
	  	{
	  		path: 'logistics',
	  		component: logistics
	  	},
	  	{
	  		path: 'orderDetails',
	  		component: orderDetails
	  	},
	  	{
	  		path: 'orderPay',
	  		component: orderPay
	  	},
	  	{
	  		path: 'install',
	  		component: install	 
	  	},
	  	
	  	{
	  		path: 'serviceInfo',
	  		component: serviceInfo
	  	},
	  	{
	  		path: 'addInstall',
	  		component: addInstall	 
	  	},
	    
	    {
			path: 'about',
			component: about
		},
		{
			path: 'orderRefound',
			component: orderRefound
		},
		{
			path: 'orderRefoundDetails',
			component: orderRefoundDetails
		},

];

export {xhRouter,xhRouterChildren}