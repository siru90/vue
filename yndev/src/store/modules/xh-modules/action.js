import {getUser} from '../../../components/config/getData.js'
import {GET_USERINFO} from './mutation-types.js' 


export default {
	async getUserInfo({commit, state}) {
		let res = await getUser();
		console.log(111);
		commit(GET_USERINFO, res);
	}
}