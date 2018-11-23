/**
 * 确认订单页面获取配送方式
 */
import axios from "axios";
import api from "../api";
import {Toast} from "./toast2";
import {hideLoading} from "./loading";

export const getLogisticsType = function (params, callback, errFn) {
    let options = {
        url: window.api.local_host + api.gwLogisticsType + "/" + params,
        // url: "http://172.19.5.219:8112" + api.gwLogisticsType + "/" + params,
        method: "get",
        headers: {sessionId: localStorage.getItem("sessionId")}
    }
    axios(options).then(data => {
        console.log("logisticsType", data);
        if (callback) {
            if (data.status === 200 && data.data.returncode === 1 && data.data.data) {
                callback(data.data.data[0]);
            } else {
                Toast({
                    duration: 1000,
                    message: data.data.data.errormsg,
                    iconClass: "aui-iconfont aui-icon-close"
                });
                console.log("请求配送方式失败");
            }
            
        }
    }).catch(err => {
        console.log(err);
        console.log("请求配送方式失败");
        if (errFn) {
            errFn();
        }
    });
}