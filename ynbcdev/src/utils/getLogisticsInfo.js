import axios from "axios";
import api from "../api";
import {Toast} from "./toast2";
import {hideLoading} from "./loading";
//配置快递公司名称
let companies = {
    "yuantong" : "圆通",
    "shunfeng" : "顺丰",
    "youzhengguonei": "邮政包裹/平邮",
    "ems": "EMS",
    "shentong": "申通",
    "zhongtong": "中通",
    "huitongkuaidi": "汇通",
    "zhongtong": "中通",
    "yunda": "韵达",
    "tiantian": "天天",
    "debangwuliu": "德邦",
    "guotongkuaidi": "国通"
}

//配置运送状态
let status = {
    "0": "在途中",
    "1": "已揽收",
    "2": "疑难",
    "3": "已签收",
    "4": "退签",
    "5": "同城派送中",
    "6": "退回",
    "7": "转单"
}

export const getLogisticsCompany =  function (code) {
    if (code) {
        return companies[code];
    }
} 

export const getLogisticsStatus =  function (code) {
    if (code) {
        return status[code];
    }
} 

export const getLogisticsDetailInfo = function (params, callback, errFn) {
    let options = {
        url: window.api.local_host + api.gwLogistics + "/" + params + "?token=" + new Date().getTime(),
        method: "get",
        headers: {"sessionId": localStorage.getItem("sessionId")}
    }
    axios(options).then(data => {
        console.log(data);
        if (callback) {
            if (data.status === 200 && data.data.returncode === 1 && data.data.data) {
                callback(data.data.data[0]);
            } else if (data.status === 200 && data.data.returncode === 0) {
                Toast({
                    message: data.data.errmsg,
                    iconClass: "aui-iconfont aui-icon-warn",
                    duration: 1000
                });
                hideLoading();
            }
        } else {
            if (errFn) {
                errFn();
            }
        }
    }).then(err => {
        console.log(err);
        if (errFn) {
            errFn();
        }
    });
}