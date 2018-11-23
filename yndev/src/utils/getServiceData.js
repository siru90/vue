import axios from "axios";
import api from "../api";
export default function (params, callback) {
    let options = {
        method: "get",
        params: params,
        url: window.api.mall_base_host + api.gwGetService
    }
    axios(options).then(data => {
        if (callback) {
            if (data.status === 200 && data.data.returnCode === 1) {
                if (data.data.data.length > 0) {
                    callback(data.data.data[0]);
                }
            } else {
                console.log("获取捆绑服务失败");
            }
            
        }
    }).catch(err => {
        console.log(err);
    })
} 