import * as types from "./mutation-types";
import api from "../../../api/gw-api";
import axios from "axios";
const gwModules = {
    namespaced: true,
    state: {
        //购物车商品数量
        cartNum: 0,
        //保存购物车详情的对象
        cartArray: [],
        //保存服务选项
        serviceArray: [],
        //临时商品对象
        tempGoods: {
            rid: "",
            goodsId: "",
            goodsNum: "",
            serviceId: ""
        },
        //保存详情页的商品数量,默认为1
        detailsGoodsNum: 1,
        //保存去下单时的金额
        totalPrice: 0,
        // 发票对象
        fp: {},
        //订单详情页面的商品对象数组
        orderGoods: [],
        //当前选中的服务商对象
        provider: {},
        //服务商列表
        providerList: [],
        //当前选中的配送方式,默认是快递方式：0
        goodsWay: 0,
        //确认采购单页面的优惠券信息
        orderYH: [],
        //确认采购单页面已选择的优惠券
        yhChoose: [],
        //配送方式状态暂存：自提/快递，默认是快递
        psState: 1,
        //配送时间暂存
        psDate: "",
        //是否可以点击地址进行选择功能
        chooseAddressAble: false,
        //终端商品下锁车防拆和押金状态暂存，默认为0，同意锁车防拆
        yajinVal: 0,
        //保存买家留言
        note: "",
        //用户流量充值的信息
        rechargeInfo: {
            //用户是否进行流量充值过
            
        },
        //当次充值结果
        currentRechargeResult: false,
        //获取用户中心的信息
        ucUserInfo: null
        
    },
    getters : {
        //购物车数量
        cartNum: (state) => {
            //做一下处理
            let cartNum = 0;
            state.cartArray.forEach(item => {
                cartNum += item.goodsNum;
            });
            return cartNum;
        },
        //购物车商品对象
        cartArray: (state) => {
            return state.cartArray;
        },
        //服务选项
        serviceArray: (state) => {
            return state.serviceArray;
        },
        //获取临时商品对象
        tempGoods: (state) => {
            console.log(state.tempGoods);
            return state.tempGoods;
            
        },
        //获取详情页的商品数量,默认为1
        detailsGoodsNum: (state) => {
            // console.log(state.detailsGoodsNum);
            return state.detailsGoodsNum;
        },
        totalPrice: (state) => {
            return state.totalPrice;
        },
        //获取发票信息
        fp: (state) => {
            return state.fp;
        },
        //订单详情页面的商品对象数组
        orderGoods: state => {
            return state.orderGoods;
        },
        // 获取服务商
        provider: state => state.provider,
        //获取送货方式
        goodsWay: state => state.goodsWay,
        //获取优惠券的信息
        orderYH: state => state.orderYH,
        //获取确认采购单页面已选择的优惠券
        yhChoose: state => state.yhChoose,
        //获取暂存的配送状态
        psState: state => state.psState,
        //获取暂存的配送时间
        psDate: state => state.psDate,
        //获取是否可以点击选择地址的权限
        chooseAddressAble: state => state.chooseAddressAble,
        //获取终端商品的押金或者锁车防拆状态
        getYajinVal: state => state.yajinVal,
        //获取服务商列表
        getProviderList: state => state.providerList,
        //获取买家留言
        getNote: state => state.note,
        //获取用户充值流量信息
        getRechargeInfo: state => state.rechargeInfo,
        //获取当次充值结果
        getCurrentRechargeResult: state => state.currentRechargeResult,
        //获取用户中心的用户信息
        getUcUserInfo: state => state.ucUserInfo,

    },
    mutations: {
        //改变购物车整体数量
        [types.CART_NUM_CHANGE] (state, num) {
            state.cartNum = num;
        },
        //更改购物车列表
        [types.CART_ARRAY_CHANGE] (state, cartArray) {
            state.cartArray = cartArray;
            // console.log(state.cartArray);
        },
        //改变临时服务数组
        [types.SERVICE_ARRAY] (state, serviceArr) {
            state.serviceArray = serviceArr;
            console.log(state.serviceArray);
        },
        //改变临时商品对象
        [types.TEMP_GOODS] (state, tempGoods) {
            state.tempGoods = Object.assign({}, tempGoods);
        },
        //改变商品详情页面的商品数量
        [types.DETAILS_GOODS_NUM] (state, num) {
            state.detailsGoodsNum = num;
        },
        //改变totalPrice
        [types.TOTAL_PRICE] (state, price) {
            state.totalPrice = price;
        },
        //改变发票信息
        [types.FP] (state, fp) {
            state.fp = fp;
        },
        //改变确认采购单页面的商品信息
        [types.ORDER_GOODS] (state, orderGoods) {
            state.orderGoods = orderGoods;
        },
        //改变服务商
        [types.CHOOSE_PROVIDER] (state, provider) {
            state.provider = provider;
        },
        //改变送货方式
        [types.GOODS_WAY] (state, way) {
            state.goodsWay = way;
        },
        //改变确认采购单页面的已选优惠券信息
        [types.GOODS_YH] (state, orderYH) {
            state.orderYH = orderYH;
        },
        //改变确认采购单页面的优惠券
        [types.ORDER_YH_CHOOSE] (state, yh_choose) {
            state.yhChoose = yh_choose;
        },
        //改变配送暂存的state
        [types.PS_STATE] (state, psState) {
            state.psState = psState;
        },
        //改变配送时间
        [types.PS_DATE] (state, psDate) {
            state.psDate = psDate;
        },
        //改变选择地址的点击权限
        [types.CHOOSE_ADDRESS_ABLE] (state, able) {
            state.chooseAddressAble = able;
        },
        //改变终端商品的锁车防拆或押金状态值
        [types.YAJIN_VAL] (state, val) {
            state.yajinVal = val;
        },
        //改变买家留言
        changeNote (state, val) {
            state.note = val;
        },
        //改变流量充值信息
        setRechargeInfo (state, obj) {
            state.rechargeInfo = obj;
        },
        //设置当前流量充值结果
        setCurrentRechargeResult(state, flag) {
            state.currentRechargeResult = flag;
        },
        //设置用户中心的用户信息
        setUcUserInfo(state, info) {
            state.ucUserInfo = info;
        }
    },
    actions: {
        async queryRechargeInfo({getters, commit, rootGetters, dispatch}) {
            let userInfo1 = rootGetters["xhModules/userInfo"];
            let userInfo2 = await dispatch("queryUcUserInfo");
            // console.log("用户中心", userInfo);
            // if (!userInfo.vipid) {
            //     console.log("请先登录");
            //     return;
            // }
            let options = {
                method: "get",
                url: window.api.mall_base_host + api.isFirstRecharge,
                params: {
                    vipid: userInfo1.vipid,
                    ucid: userInfo2.userId,
                    // vipid: "1192284",
                    enterpriseid: window.api.enterpriseId
                }
            }
            return new Promise(async (resolve) => {
                //如果有值，直接获取
                // if (getters.getRechargeInfo.isFirstRecharge) {
                if (false) {
                    let flag = getters.getRechargeInfo.isFirstRecharge === "1";
                    console.log("读取本地数据");
                    resolve(flag);
                } else {
                    let data = await axios(options);
                   
                    if (data.status === 200 && data.data.data[0]) {
                        commit("setRechargeInfo", {
                            isFirstRecharge: data.data.data[0].isFirstRecharge,//是否是第一次充值，1代表是
                            terminalno: data.data.data[0].terminalno,//终端号
                            plateno: data.data.data[0].plateno//车牌号
                        });
                        console.log("去请求接口获得数据");
                        let flag = data.data.data[0].isFirstRecharge === "1"
                        resolve(flag);
                    } else {
                        resolve("error");
                    }
                }
            });
        },
        //查询用户中心的用户信息
        queryUcUserInfo({getters, commit}) {
            let url = window.api.local_host + '/user/getUcUserInfo';
            let params = {
                token:new Date().getTime()
            }
            let config = {
                method:'get',
                url,
                headers: {
                    "sessionId": window.localStorage.getItem("sessionId")
                },
                params
            }
            return new Promise(async (resolve) => {
                //如果有值则直接返回，没值则先去请求再返回
                if (getters.getUcUserInfo) {
                    resolve(getters.getUcUserInfo);
                } else {
                    axios(config).then((res)=>{
                        if(res.data.returncode == 1){
                            console.log(res.data.data[0],'获取用户中心数据');
                            commit("setUcUserInfo", res.data.data[0]);
                            resolve(getters.getUcUserInfo);
                        } else {
                            resolve({});
                        }
                    });
                }
            });
        }
    }
}

export default gwModules;