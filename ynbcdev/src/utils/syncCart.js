import axios from "axios";
import api from "../api";
import initUUID from "./initUUID";
import getCartData from "./getCartData";

export default function (callback) {
    if (localStorage.getItem("sessionUUID") && localStorage.getItem("sessionId")) {
        axios({
            url: window.api.local_host + api.gwSyncCart,
            // url: "http://172.19.5.219:8112" + api.gwSyncCart,
            method: "post",
            headers: {"sessionId": localStorage.getItem("sessionId")},
            data: {"sessionUuid": localStorage.getItem("sessionUUID")}
        }).then(data => {
            // console.log("同步采购车信息", data);
            localStorage.removeItem("sessionUUID");
            // initUUID();
            
            if (data.status === 200 && data.data.returncode === 1) {
                // console.log("采购车信息同步成功");
                if (callback) {
                    getCartData(callback);
                    // callback(data);
                }
            } else {
                
            }
        }).catch(err => {
            Toast({
                duration: 1000,
                message: "采购车信息更新失败",
                iconClass: "aui-iconfont aui-icon-close"
            });
            // console.log("采购车同步接口出错", err);
        })
    }
}