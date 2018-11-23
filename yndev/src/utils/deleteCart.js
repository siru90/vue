import axios from "axios";
import api from "../api";
// const api = window.api;
import {hideLoading} from "./loading";
export default function (params, callback, callbackArray) {
    //判断有没有登录

    let options = {
        method: "post",
        url: window.api.local_host + api.gwDeleteCart,
        // url: api.gwCartHost + api.gwUpdateCart,
    }
    if (localStorage.getItem("sessionId")) {
        //已经登录
        options = Object.assign({}, options, {
            headers: {"sessionId": localStorage.getItem("sessionId")},
            data: params
        });
    } else {
        params = Object.assign({}, params, {
            sessionUuid : localStorage.getItem("sessionUUID")
        });
        options = Object.assign({}, options, {
            data: params
        });
    }
    axios(options).then(data => {
        if (callback) { 
            if (data.status === 200 && data.data.returncode === 1) {
                callback(data);
                if (callbackArray) {
                    callbackArray.forEach(item => {
                        item(data);
                    });
                }
            } else {
                hideLoading();
            }
        }
        
    }).catch(err => {
        console.log("购物车删除接口出错", err);
        hideLoading();
    });
}