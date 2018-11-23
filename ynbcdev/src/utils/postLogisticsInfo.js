import axios from "axios";
import api from "../api";
import {Toast} from "./toast2";
import {hideLoading} from "./loading";
export const postLogisticsInfo = function (params, callback, errFn) {
    let options = {
        // url: window.api.gwCartHost + api.gwPostLogisticsInfo,
        url: window.api.local_host + api.gwPostLogisticsInfo,
        headers: {"sessionId": localStorage.getItem("sessionId")},
        data: params,
        method: "post"
    }

    axios(options).then(data => {
        console.log(data);
        if (callback) {
            if (data.status === 200) {
                callback(data.data);
            } else {
                hideLoading();
            }
        }
    }).catch(err => {
        console.log(err);
        if (errFn) {
            errFn();
        }
    });
}

//使用策略模式
export const regRules = {
    notEmpty : (value, errorMsg) => {
        console.log("value", value);
        if (!value) {
            Toast({
                duration: 1000,
                message: errorMsg,
                iconClass: "aui-iconfont aui-icon-close"
            });
            return errorMsg;
        }
    },
    isNumber: (value, errorMsg) => {
        let reg = /\d+/g;
        if (!reg.test(value)) {
            Toast({
                duration: 1000,
                message: errorMsg,
                iconClass: "aui-iconfont aui-icon-close"
            });
            return errorMsg;
        }
    }
}