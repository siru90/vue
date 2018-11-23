//import car from '../components/profile/children/car'
const AddCar = resolve => require(['../components/profile/children/children/addCar'], resolve);
const Car = resolve => require(['../components/profile/children/car'], resolve);
const AfterSale = resolve => require(['../components/AfterSale/afterSale'], resolve);
const AfterSaleDetail = resolve => require(['../components/AfterSale/afterSaleDetail'], resolve);
const Address = resolve => require(['../containers/Address/index'], resolve);
const SendTraffic = resolve => require(['../containers/SendTraffic/index.vue'], resolve);
const TrafficTopUp = resolve => require(['../containers/TrafficTopUp/index.vue'], resolve);
const MonthFlowGet = resolve => require(['../containers/MonthFlowGet/index.vue'], resolve);

//import AddCar from '../components/profile/children/children/addCar.vue';
//import Car from '../components/profile/children/car.vue';
//import Address from '../containers/Address/index.vue';
//import AfterSale from '../components/AfterSale/afterSale.vue';
//import AfterSaleDetail from '../components/AfterSale/afterSaleDetail'
//const AddCar = resolve => require(['../containers/ChooseProvider'], resolve);
//const Address = resolve => require(['../containers/Address'], resolve);
export const zxRouter = [
	{
		path: '/main/addCar/:id',
		component: AddCar
	},
	{
		path: '/main/car/:id',
		component: Car
	},
	{
		path:'/address/:index',
		component:Address
	},
	{
		path:'/main/afterSale',
		component:AfterSale
	},
	{
		path:'/main/afterSaleDetail',
		component:AfterSaleDetail
	},
	{
		path:'/main/sendTraffic',
		name:'sendTraffic',
		component:SendTraffic
	},
	{
		path:'/main/trafficTopUp',
		component:TrafficTopUp
	},
	{
		path:'/main/MonthFlowGet',
		component:MonthFlowGet,
		name: "/main/MonthFlowGet"
	}
];
export const zxRouterChildren = [


];