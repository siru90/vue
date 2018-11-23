
import {getUser} from '../../../components/config/getData.js'
import {getStore, setStore, removeStore} from '../../../components/config/session.js'



const RECORD_SESSIONID = 'RECORD_SESSIONID'
const ClEAR_SESSIONID = 'ClEAR_SESSIONID'
const USER_INFO	= 'USER_INFO'
const LOGO_IN = 'LOGO_IN'
const LOGO_OUT = 'LOGO_OUT'
const CLEAR_INFO = 'CLEAR_INFO'
const RECORD_CAR = 'RECORD_CAR'

const xhModules = {
	namespaced: true,
	state: {
		sessionId: null,
		login: false,
		userInfo: null,
		car: [],
	},
	getters: {
		sessionId: state => {
			return state.sessionId;
		},
		userInfo: state => {
			return state.userInfo;
		}
		,
		login: state => {
			return state.login;
		}
		,
		car: state => {
			return state.car;
		}
	},
	actions: {
		async getUserInfo({commit, state}) {
			let res = await getStore('sessionId');
			if(res === 'null' || res === null) {
				return
			}
			commit(RECORD_SESSIONID, res);
			commit(LOGO_IN, true);
		}
	},
	mutations: {
		[RECORD_SESSIONID](state, info) {
			state.sessionId = info;
			setStore('sessionId', info);
		},
		[ClEAR_SESSIONID](state, info) {
				state.sessionId = null;
				removeStore('sessionId');
		},
		[USER_INFO](state, info) {
			state.userInfo = info;
		},
		[CLEAR_INFO](state, info){
			state.userInfo = info;
		}
		,
		[LOGO_IN](state, info) {
			state.login = info;
		},
		[LOGO_OUT](state, info) {
			state.login = info;
		},
		[RECORD_CAR](state, info) {
			state.car = info;
		}
	}
}

export default xhModules;
