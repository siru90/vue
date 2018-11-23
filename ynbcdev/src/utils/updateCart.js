import axios from "axios";
import api from "../api";
import initCart from "./getCartData";
// import {gwToast, gwClose} from "./toast";
// import { Indicator } from 'mint-ui';
export default function (params, callback, extraFn) {
    // delete params.goodsChecked;
    //判断有无登陆
    let options;
    let _params;
    if (!Array.isArray(params)) {
        params = [params];
    }
    if (localStorage.getItem("sessionId")) {
        //已经登录，则在请求头中设置sessionId
        _params = Object.assign({}, {
            shopId: window.api.enterpriseId + "",
            shoppingCartList: params
        });
        options = {
            method: "post",
            url: window.api.local_host + api.gwUpdateCart,
            // url: api.gwCartHost + api.gwUpdateCart,
            data: _params,
            headers: {"sessionId" : localStorage.getItem("sessionId")}
        }
    } else {
        //没有登录，则使用sessionUuid
        _params = {
            shopId: "" + window.api.enterpriseId,
            sessionUuid: localStorage.getItem("sessionUUID"),
            shoppingCartList: params
        };
        options = {
            method: "post",
            url: window.api.local_host + api.gwUpdateCart,
            // url: api.gwCartHost + api.gwUpdateCart,
            data: _params,
        }
    }
    axios(options).then(data => {
        if (callback) {
            callback(data);
        }
        //如果还有其他的回调函数，在这里执行
        if (extraFn) {
            extraFn.forEach(item => {
                item(data);
            });
        }
    }).catch(err => {
        console.log(err);
        // Indicator.close();
        // gwClose();
        // gwToast({
        //     message: "操作失败",
        //     type: "fail",
        //     duration: 1000
        // });
    });
}