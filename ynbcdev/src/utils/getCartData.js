import mAxios from "./cartAjax";
import axios from "axios";
import api from "../api";
import {test} from "./test";
// const api = window.api;

import {Toast} from "./toast2";


export default function (callback, errorFn) {

    //判断有无登陆
    let options = {
        // url: window.api.local_host + api.gwGetCart,
        url: window.api.local_host + api.gwGetCart,
        // url: api.gwCartHost + api.gwGetCart,
        method: "post",
    }

    //如果登录就读取sessionId，如果没有就读取sessionUuid
    if (localStorage.getItem("sessionId")) {
        options = Object.assign({}, options, {
            headers: {"sessionId": localStorage.getItem("sessionId")},
            data: {}

        });
    } else {
        options = Object.assign({}, options, {
            data: {
                "sessionUuid" : localStorage.getItem("sessionUUID")
            },
        });
    }

    // var data;
    axios(options).then(data => {
        if (callback) {
            // callback(data);
            let cartList = [];
            if (data.status === 200 && data.data.returncode === 1) {
                //请求成功
                if (data.data.data[0][0]) {
                    cartList = data.data.data[0][0].shoppingCartList;
                } else {
                    cartList = [];
                }
                // console.log("查询采购车数据请求成功", cartList);
                callback(cartList);
            } else if (data.status === 200 && data.data.returncode === -1) {
                Toast({
                    duration: 1000,
                    message: "登录信息失效，请重新登录！",
                    iconClass: "aui-iconfont aui-icon-close"
                });
            }
        }
    }).catch((err) => {
        console.log(err)
        //请求失败调用该函数
        // if (errorFn) {
        //     errorFn();
        // } else {
        Toast({
            duration: 1000,
            message: "登录信息失效，请重新登录！",
            iconClass: "aui-iconfont aui-icon-close"
        });
        // }
    });
}