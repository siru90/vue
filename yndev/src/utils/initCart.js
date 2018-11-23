import axios from "axios";
import api from "../api";
import initUUID from "./initUUID";
import {hideLoading} from "./loading";
//获取服务器的购物车数据，同步到本地vuex中

//注销操作后重新渲染购物车
export default function (callback) {
    //首先清空UUID
    if (localStorage.getItem("sessionUUID")) {
        localStorage.removeItem("sessionUUID");
        // console.log("注销登录，重新生成一个新的sessionUUID");
        // 重新生成一个新的
        initUUID();
    } else {
        initUUID();
    }
    let options = {
        data: {"sessionUuid": localStorage.getItem("sessionUUID")},
        method: "post",
        url: window.api.local_host + api.gwGetCart
    }
    axios(options).then(data => {
        // console.log(data)
        if (data.status === 200 && data.data.returncode === 1) {
            let cartList;
            if (data.data.data[0][0]) {
                cartList = data.data.data[0][0].shoppingCartList;
            } else {
                cartList = [];
            }
            // console.log("查询购物车数据请求成功", cartList);
            if (callback) {
                callback(cartList);
            }
        } else {
            console.log("注销登录，重新渲染购物车失败");
            hideLoading();
        }
    }).catch(err => {
        hideLoading();
        console.log(err);
        console.log("注销登录，重新渲染购物车失败");
    })
}


