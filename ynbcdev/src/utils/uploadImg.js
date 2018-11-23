import axios from "axios";
import api from "../api";
// import {hideLoading} from "./loading";

/**
 * 
 * @param {*图片数组} params 
 * @param {*成功的回调} callback 
 * @param {*失败的回调} errFn 
 */
export const uploadImg = function (params, callback, errFn) {
    let axiosArr = [];
    params.forEach(item => {
        let formData = new FormData();
        formData.append("file", item);
        let options = {
            method: "post",
            url: window.api.mall_file_host + api.gwUploadImg,
            timeout: 30000,
            data: formData
        }
        console.log(window.api.mall_file_host + api.gwUploadImg);
        axiosArr.push(axios(options));
    });
    axios.all(axiosArr).then(axios.spread(function(...rest){
        //当这两个请求都完成的时候会触发这个函数，参数分别代表返回的结果
        if (callback) {
            //判断是否所有的请求都成功
            let state = true;
            let data = [];
            for (let item of rest) {
                if (item.status !== 200 || item.data.code !== 200) {
                    state = false;
                    break;
                } else {
                    data.push(item.data.visitPath);
                }
            }
            //都成功则执行成功的回调
            if (state) {
                // console.log(rest);
                callback(data);
            } else {
                errFn();
            }
        }
    })).catch(err => {
        console.log(err);
        if (errFn) {
            errFn();
        }
    });
}