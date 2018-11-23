import Vuex from "vuex";
import Vue from "vue";
import * as getters from "./getters";
import state from "./state";
import mutations from "./mutations";
import gwModules from "./modules/gw-modules";
import jyModules from "./modules/jy-modules";
import xhModules from "./modules/xh-modules";
import lhModules from "./modules/lh-modules";
import zxModules from "./modules/zx-modules";
import cjy from "./modules/cjy";
import hzh from "./modules/hzh";
import zwy from "./modules/zwy";
import jyy from './modules/jyy'

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    getters,
    mutations,
    modules : {
        gwModules,
        jyModules,
		xhModules,
        lhModules,
        zxModules,
      	cjy,
        hzh,
        zwy,
        jyy
    }
});
