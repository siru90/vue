import axios from "axios";
import api from "../api";
// const api = window.api;

//解析省市区数据，接收地址信息，返回一个对象
/*
    接收参数 {
        province
        city
        region
    }
*/
//{province_name:"",city_name:"",region_nam:""}
export default function (data, callback) {
    console.log("这是接收到的参数", data)
    var obj = {};
    //省
    var province_code = data.province;
    var city_code = data.city;
    var region_code = data.region;
    axios.get(window.api.mall_base_host + "address/getarealist?areaid=1").then(function (data) {
        console.log(data);
        data.data.data.arealist.forEach(function (item) {
            if (item.id == province_code) {
                //取得省份
                obj.province_name = item.name;
            }
        });
        //市
        axios.get(window.api.mall_base_host + "address/getarealist?areaid=" + province_code).then(function (data) {
            console.log(data);
            data.data.data.arealist.forEach(function (item) {
                if (item.id == city_code) {
                    //取得城市
                    obj.city_name = item.name;
                }
            });
            //县
            axios.get(window.api.mall_base_host + "address/getarealist?areaid=" + city_code).then(data => {
                console.log(data);
                data.data.data.arealist.forEach(function (item) {
                    if (item.id == region_code) {
                        //取得县
                        obj.region_name = item.name;
                    }
                });
                console.log(obj);
                if (callback) {
                    callback(obj);
                }
                return obj;
            });
        });
    });
}