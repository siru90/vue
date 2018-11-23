import {
	RECORD_USERINFO,
	GET_USERINFO,
	RESET_NAME
} from './mutation-types.js'



export default {
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.user_id);
	},
	[GET_USERINFO](state, userinfo) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
	[RESET_NAME](state, username) {
		state.userinfo = Object.assign({}, state.userInfo, {username})
	}
}