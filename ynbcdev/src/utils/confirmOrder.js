import axios from "axios";
import api from "../api";
// const api = window.api;
import {Toast} from "./toast2";
import {hideLoading} from "./loading";
export default function (params, callback) {
    let options = {
        method: "post",
        data: params,
        url: window.api.local_host + api.gwConfirmOrder,
        headers: {"sessionId": localStorage.getItem("sessionId")}
        // headers: {"sessionId": "b9ec9e3d9f524c88ae2ffe8941f93dd5"}
    }
    axios(options).then(data => {
        // console.log(data);
        if (data.status === 200 && data.data.returncode === 1) {
            if (callback) {
                callback(data);
            }
        } else {
            Toast({
                duration: 1000,
                message: "网络出错啦~",
                iconClass: "aui-iconfont aui-icon-close"
            });
            hideLoading();
        }
    }).catch(err => {
        Toast({
            duration: 1000,
            message: "网络出错啦~",
            iconClass: "aui-iconfont aui-icon-close"
        });
        console.log(err);
        hideLoading();
    })
} 