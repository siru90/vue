
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import {getCarInfo,changeCarInfo} from '../../../components/config/getCarData.js'

const GET_CAR_INFO = 'GET_CAR_INFO'
const DEL_CAR_INFO = 'DEL_CAR_INFO'
const GET_MSG = 'GET_MSG'
const CHANGE_CODE = 'CHANGE_CODE'
const CHANGE_CARINFO = 'CHANGE_CARINFO'
const HAVE_CAR = 'HAVE_CAR'
const CHANGE_HEIGH = 'CHANGE_HEIGH'
const zxModules = {
	namespaced: true,
	state: {
		//用于接受用户的车辆信息
		carInfo:[],
		myphone:'',
		myenterpriseid:'',
		//当前编辑的车辆信息  
		nowUPdataCar:{},
		//当前删除的车辆信息
		nowDelCar:{},
		//当前增加的车辆信息
		nowAddcar:{},
		getCarMessage:'',
		serverCode:null,
		havaCarFlag:false,
		scrollTop:0,
	},
	getters,
	actions: {
		async getCarsIn({commit, state},obj){
			var data1 ="?"+ "phone=" + obj.phone +  '&'+ "enterpriseid=" + obj.enterpriseid ;
			var res = await getCarInfo(data1);
//			console.log('请求车辆数据入参',obj,'请求车辆返回值',res.data);
			if(res === 'null' || res === null) {
				return
			}
			commit(HAVE_CAR,res);
			commit(GET_CAR_INFO,res);
		},
		async actionChangeCarInfo({commit, state},obj) {
			state.serverCode = null;  //重置请求响应码
			var res = await changeCarInfo(obj);
//			console.log('增删改数据请求入参',obj,'增删改车辆返回值',res);
			if(res === 'null' || res === null) {
				return
			}
			
			if(res.code == "0"){
				commit(GET_MSG,res);
//				console.log('此时数据已请求到，返回code为0');
			}
			//删除及时响应
			if(obj.type == "DELETE" && res.code == "0"){
				for(var i = 0; i < state.carInfo.length; i++){
					if(state.carInfo[i].othsid === obj.othsid){
						state.carInfo.splice(i,1);
					}
				}
				if(state.carInfo.length == 0){
					commit(HAVE_CAR,res);
				}
			}
			//设置为默认车辆及时响应
			if(obj.type == "UPDATE" && res.code == "0" && !obj.smartterm){
				for(var i = 0; i < state.carInfo.length; i++){
					if(state.carInfo[i].cardefault == 1 || state.carInfo[i].cardefault == '1'){
						state.carInfo[i].cardefault = 0;
					}
					if(state.carInfo[i].othsid === obj.othsid){
						state.carInfo[i].cardefault = 1;
					}
				}
			}
		},
		setCarphoto({commit, state},obj){
//			console.log('actions  图片');
			commit(CHANGE_CARINFO,obj);
		},
		setTurnInstall({commit, state},num){
//			console.log('actions  num');
			commit(CHANG_TINSTALL,num);
		},
		setScrollTop({commit,state},heigh){
			console.log(heigh,'heigh');
			commit(CHANGE_HEIGH,heigh);
		}
		
	},
	mutations: {
		[GET_CAR_INFO](state, res) {
			state.carInfo = res.data.carlist;
			
        },
        [DEL_CAR_INFO](state, obj){
//      	console.info(1);
        	state.carInfo.splice(num,1);
        },
        [GET_MSG](state, res){
        	state.getCarMessage = res.message;	
        	state.serverCode = res.code;
//      	console.log(state.serverCode);
        },
        [CHANGE_CODE](state){
        	state.serverCode = null;
//      	console.info(state.serverCode);
        },
        [CHANGE_CARINFO](state,obj){
        	for(let i = 0;i < state.carInfo.length;i++){
        		if(state.carInfo.othsid == obj.othsid){
//      			console.log('othsid,',obj.othsid);
//      			console.log('mutations  图片');
        		}
        	}
        },
        [HAVE_CAR](state,res){
        	if(res.data.carlist == undefined || res.data.carlist == 'undefined'){
//				console.log(res.data.carlist== undefined,8888);
        		state.havaCarFlag = true;
			}else{
				state.havaCarFlag = false;
			}

        },
        [CHANGE_HEIGH](state,heigh){
        	state.scrollTop = heigh;
        }
	}
}
export default zxModules