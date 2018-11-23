import axios from "axios";
import api from "../api";
import {hideLoading} from "./loading";
export default function (params, callback, vue) {
    let options = {
        method: "post",
        url: window.api.mall_base_host + api.gwGetProvider,
        data: params
    }
    axios(options).then(data => {
        if (callback) {
            if (data.status === 200) {
                console.log(data);
                callback(data);
            } else {
                hideLoading();
            }
        }
    }).catch(err => {
        hideLoading();
        console.log(err);
    })
}