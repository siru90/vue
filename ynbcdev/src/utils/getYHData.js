import axios from "axios";
import api from "../api";

export default function (params, callback) {
    let options = {
        method: "get",
        params: params,
        url: window.api.mall_sale_host + api.gwGetYH + "?token=" + new Date().getTime()
        // url: window.api.mall_sale_host + api.gwGetYH
    }
    axios(options).then(data => {
        // console.log("这是优惠券信息",data);
        if (data.status === 200 && data.data.returnCode > 0) {
            if (callback) {
                if (data.data && data.data.data) {
                    callback(data.data.data[0]);
                }
            }
        } else {
            console.log("请求优惠券错误");
        }
    }).catch(err => {
        console.log(err);
    });
}