import api from "../api";
import {Toast} from "./toast2";
import axios from "axios";
import {showLoading, hideLoading} from "./loading";
export default function (orderNo, callback, errFn) {
    let options = {
        method: "get",
        url: window.api.local_host + api.gwOrderInfo + `/${orderNo}` + "?token=" + new Date().getTime(),
        headers: {sessionId: localStorage.getItem("sessionId")}
    }
    axios(options).then(data => {
        if (callback) {
            if (data.status === 200 && data.data.data.length > 0) {
                callback(data.data.data[0]);
            } else {
                console.log("获取订单失败");
                hideLoading();
                Toast({
                    message: '订单信息失效',
                    iconClass: "aui-iconfont aui-icon-close",
                    duration: 1000
                });
                if (errFn) {
                    errFn();
                }
                
            }
            
        }
    }).catch(err => {
        hideLoading();
        if (errFn) {
            errFn();
        }
        console.log(err);
    })
    
}