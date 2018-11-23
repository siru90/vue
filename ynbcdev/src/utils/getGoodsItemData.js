import axios from "axios";
import api from "../api";
import {hideLoading} from "./loading";
export default function (params, callback) {
    let options = {
        // url: window.api.mall_goods_host + api.gwGetGoodsData,
        url: window.api.local_host + api.gwGetGoodsData,
        method: "get",
        params,
        headers: {
            sessionId: window.localStorage.getItem("sessionId")
        }
        
    }
    axios(options).then(data => {
        // console.log(data);
        
        if (callback) {
            if (data.status === 200 && data.data.returnCode > 0) {
                callback(data.data.data);
            } else {
                hideLoading();
            }
            
        }
        
    }).catch(err => {
        hideLoading();
        console.log(err);
    });
}