import {CATE_LIST,  LOGIN_STATE,SET_HEADER,ADD_BANNER,CHOOSE_ADDRESS} from "../mutations-type";


const mutations = {
    [LOGIN_STATE] (state) {
        state.loginState = state.loginState === 0 ? 1 : 0;
    },
    [CATE_LIST] (state, cateList) {
        state.cateList = cateList;
    },
    [SET_HEADER] (state, cateList) {
        state.headerConfig = cateList;
    },
    [ADD_BANNER] (state, item) {
        state.banners.push(item);
    },
    [CHOOSE_ADDRESS] (state, item) {
        state.chooseAddress = item
    }
}
export default mutations;