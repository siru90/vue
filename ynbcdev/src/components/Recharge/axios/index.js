import api from "../../../api";
import axios from "axios";
import store from "../../../store";
export const recharge = async (params,fullSend,orderno) => {
    // 满送流量走这里
    
    if (fullSend) {
        let info = await store.dispatch("gwModules/queryUcUserInfo");
        let options = {
            method: "get",
            url:window.api.mall_sale_host + 'sale/consumeFlow',
            params: {
                billno: orderno,
                terminalno: params.terminalno,
                plateno: params.plateno,
                sessionid: info.sessionId,
                enterpriseid: window.api.enterpriseid
            }
        }
        return axios(options)
    }
	console.log("params", params)
    let options = {
        method: "get",
        params,
    }
    let info = await store.dispatch("gwModules/queryUcUserInfo");
    options.params.sessionid = info.sessionId;
    //月流量充值
    if (params.monthdtlid) {
    	delete options.params.checkindtlid;
        options = Object.assign(options, {
            url: window.api.mall_base_host + api.yueRecharge,
        });
    } else if (params.checkindtlid) {
    	delete options.params.monthdtlid;
        //签到流量充值
        options = Object.assign(options, {
            url: window.api.mall_base_host + api.qdRecharge
        });
    } else {
        //参数有问题
        console.log("参数有问题", params);
        return new Promise((resolve) => {
            resolve({
                data: {
                    retunrCode: 0,
                    msg: "参数有问题"
                }
            });
        });
    }
    return axios(options);
}
// 同步满减送流量数据到我们这边的商城
export const syncFullSendFlowData = async(data) => {
    return axios({
        method: 'post',
        url: window.api.local_host + '/orderFlow/updateOrderFlow ',
        //url: 'http://test.base.scn.weilian.cn:8112/orderFlow/updateOrderFlow',
        data:data
    })
}