import dayjs from 'dayjs'
export default{
    namespaced:true,
    state:{
        terminalInfo:{
            carno:null,
            dtusoftversion:null,
            dtutype:null,
            ecutype:null,
            engineno:null,
            openservice:null,
            setupdate:null,
            teleptleno:null,
        },
        sureServiceData:null,
        province:null,//省份
        city:null,//城市
        region:null,//县城
        username:null,//联系人姓名
        phone:null,//联系人电话
        addressDetails:null,//联系人详细地址
        subscribeDate: dayjs().add(1,"hour").toDate(),//预约日期
        address:null,//地址
        faultPhenomenon:null,//故障
        mapAddress:null,//地图地址
        afterSaleData:null,//售后单数据
    },
    getters:{
        terminalInfo(state){
            return state.terminalInfo
        },
        sureServiceData(state){
            return state.sureServiceData
        },
        username(state){
            return state.username
        },
        phone(state){
            return state.phone
        },
        addressDetails(state){
            return state.addressDetails
        },
        subscribeDate(state){
            return state.subscribeDate
        },
        address(state){
            return state.address
        },
        faultPhenomenon(state){
            return state.faultPhenomenon
        },
        mapAddress(state){
            return state.mapAddress
        },
        afterSaleData(state){
            return state.afterSaleData
        },
    },
    mutations:{
        SAVE_TERMINAL_INFO(state,data){
            state.terminalInfo = data;
        },
        SAVE_SURE_SERVICEDATA(state,data){
            state.sureServiceData = data;
        },
        SAVE_USERNAME(state,data){
            state.username = data;
        },
        SAVE_PHONE(state,data){
            state.phone = data;
        },
        SAVE_ADDRESSDETAILS(state,data){
            state.addressDetails = data;
        },
        SAVE_SUBSCRIBEDATE(state,data){
            state.subscribeDate = data;
        },
        SAVE_ADDRESS(state,data){
            state.address = data;
        },
        SAVE_FAULT(state,data){
            state.faultPhenomenon = data;
        },
        SAVE_MAPADDRESS(state,data){
            state.mapAddress = data;
        },
        SAVE_AFTERSALEDATA(state,data){
            state.afterSaleData = data;
        }
    },
    actions:{
        saveTerminalInfo({commit}, data){
    		commit('SAVE_TERMINAL_INFO', data);
        },
        saveSureServiceDate({commit}, data){
    		commit('SAVE_SURE_SERVICEDATA', data);
        },
        saveUsername({commit}, data){
    		commit('SAVE_USERNAME', data);
        },
        savePhone({commit}, data){
    		commit('SAVE_PHONE', data);
        },
        saveAddressdetails({commit}, data){
    		commit('SAVE_ADDRESSDETAILS', data);
        },
        saveSubscribeDate({commit}, data){
    		commit('SAVE_SUBSCRIBEDATE', data);
        },
        saveAddress({commit}, data){
    		commit('SAVE_ADDRESS', data);
        },
        saveFault({commit}, data){
    		commit('SAVE_FAULT', data);
        },
        saveMapAddress({commit}, data){
    		commit('SAVE_MAPADDRESS', data);
        },
        saveAfterSaleData({commit}, data){
    		commit('SAVE_AFTERSALEDATA', data);
        },
        clearData({commit},data){
            if(data){
    		    commit('SAVE_TERMINAL_INFO', {
                    carno:null,
                    dtusoftversion:null,
                    dtutype:null,
                    ecutype:null,
                    engineno:null,
                    openservice:null,
                    setupdate:null,
                    teleptleno:null,
                });
                commit('SAVE_SURE_SERVICEDATA', null);
                commit('SAVE_USERNAME', null);
                commit('SAVE_PHONE', null);
                commit('SAVE_ADDRESSDETAILS', null);
                commit('SAVE_SUBSCRIBEDATE', null);
                commit('SAVE_ADDRESS', null);
                commit('SAVE_FAULT', null);
                commit('SAVE_MAPADDRESS', null);
                
            }
        }
    }
}