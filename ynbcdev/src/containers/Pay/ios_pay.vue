<template>
    <div>
        <div>
            <!--头部-->
            <header class="aui-bar aui-bar-nav aui-bar-light">
                <div class="go-back" @click.stop="goBack">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <div class="aui-title">采购单支付</div>
            </header>
            <div style="height: 3rem;"></div>
            <div class="centent payment_con">
                <div class="amount_con  aui-margin-b-15">
                    <h2>应付金额：￥{{orderMoney}}</h2>
                </div>
                <!--付款方式1-->
                <div class="aui-content aui-margin-b-15" v-if="false">
                    <ul class="aui-list aui-list-in">
                        <li class="aui-list-header">
                            余额支付
                        </li>
                        <li class="aui-list-item">
                            <div class="aui-list-item-label-icon">
                                <i class="icon njfont nj-qianbao"></i>
                            </div>
                            <div class="aui-list-item-inner">
                                账户余额
                                <div class="aui-list-item-right">
                                    <!-- <label>¥88.03</label>&nbsp;
                                    <input type="checkbox" class="aui-checkbox"> -->
                                </div>
                            </div>
                        </li>
                        <li class="aui-list-item">
                            <div class="aui-list-item-label-icon">
                                <i class="icon njfont nj-lipinquan"></i>
                            </div>
                            <div class="aui-list-item-inner">
                                礼品券余额
                                <div class="aui-list-item-right">
                                    <!-- <label>¥100.00</label>&nbsp;
                                    <input type="checkbox" class="aui-checkbox"> -->
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--付款方式1 end-->
                <!--付款方式2-->
                <div style="margin-bottom:0 !important" class="aui-content aui-margin-b-15">
                    <ul class="aui-list aui-list-in">
                        <li class="aui-list-header">
                            选择支付方式
                        </li>
                        <li class="aui-list-item">
                            <div class="aui-list-item-label-icon">
                                <i style="color:rgb(151, 0, 0)" class="icon njfont nj-guanzhu"></i>
                            </div>
                            <div class="aui-list-item-inner">
                                信用支付
                                <div class="aui-list-item-right">
                                    <div class="aui-list-item-right">
                                        <input type="radio" class="aui-radio" name="payment2" checked>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="credit-msg">
                    <div class="credit-msg-title">
                        信用明细
                    </div>
                    <div class="credit-list">
                        <ul>
                            <li>
                                <span>信用额度：</span>
                                <span>¥{{creditObj.credit}}</span>
                            </li>
                            <li>
                                <span>已用额度：</span>
                                <span>¥{{creditObj.owncredit || 0}}</span>
                            </li>
                            <li>
                                <span>可用额度：</span>
                                <span>¥{{creditObj.remaincredit}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="credit-tips">
                        <span v-if="!resMoney">tips：信用额度不够支付当前订单，请重新选择商品</span>
                        <span v-else>tips：准时或提前还款可以恢复信用额度</span>
                        
                    </div>
                </div>
                <!--付款方式2 end-->
                <!--确定-->
                <div style="height:4rem;"></div>
                <div  class="settle_accounts lijixiadan">
                    <div :style="resMoney ? {} : {background:'#ededed'}" style="background:#970000 !important" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click.stop="pay" ref="pay">确定</div>
                </div>
                <!--确定 end-->
            </div>
        </div>
    </div>
</template>
<script>
import md5 from "js-md5";
import axios from "axios";
import api from "../../api";
import {Toast} from "../../utils/toast2";
import getOrderInfo from "../../utils/getOrderInfo";
import {showLoading, hideLoading} from "../../utils/loading";
import getAppVersion from "../../utils/gw/getAppVersion";
import { getAccountCreditByVipidList, repaymentsByonlineOrunderline } from './http'
export default {
    props: {

    },
    data() {
        return {
            orderMoney: 0,
            orderType: 0,
            creditObj: {}
        }
    },
    computed: {
        // 可用额度是否足以支付
        resMoney() {
            if (this.creditObj.remaincredit > this.orderMoney) {
                return true
            }
            return false
        },
        money () {
            //如果当前页面金额错误跳回个人中心
            if (this.$route.params.money < 0 || this.$route.params.money === undefined) {
                //this.$router.replace("/main/profile");
                this.$router.replace({"path": "/main/order", query: {orderStatus: 1}});
                return;
            }
            return this.$route.params.money;
        },
        orderNo () {
            //获取订单编号
            return this.$route.params.orderNo;
        }
    },
    methods: {
        goBack() {
            // window.history.back();
            // 跳转到待支付页面
            this.$router.replace({"path": "/main/proOrder", query: {orderStatus: 1}});
        },
        //确认支付
        pay() {
            
        },
        init() {
            
            // console.log(1111111111);
            var that = this;
            var pay_no = '';
            var created_ts = '';
            var se_sign = '';
            var use_json = '0';
            var amount = ''
            var SEPayPlugin_Start = function (pay_no,created_ts,se_sign,amount){
                // alert("start to pay 1. ");
                //初始化
                cordova.require('cordova/channel').onCordovaReady.subscribe(function() {
                    //  在安卓 进入后 在注册这个方法的时候 和安卓那边就已经调用这个方法了；
                    // alert("start to pay 2, exec SEPayPlugin  ");
                    cordova.exec(null, null, 'SEPayPlugin',null, []);
                    //CenterCommandPlugin('start');
                    doPay(pay_no,created_ts,se_sign,amount);
                });
            }
            var doPay = function  (pay_no,created_ts,se_sign,amount){ 
                var data = {
                    pay_no: pay_no,
                    created_ts: created_ts,
                    se_sign: se_sign,
                    use_json: '0',
                    order_money: amount
                }
                var pay = "sePay" + JSON.stringify(data)
                    SEPayPlugin(pay,
                        function(){
                            // Toast({
                            //     message: '支付成功',
                            //     iconClass: "aui-iconfont aui-icon-correct",
                            //     duration: 1600
                            // });
                            // setTimeout(() => {
                                that.$router.replace({"name": "paysuccessfully", params: {orderType: that.orderType}});
                            // }, 1600);
                        },
                        function (){
                            console.log("支付失败");
                            Toast({
                                message: '支付失败',
                                iconClass: "aui-iconfont aui-icon-close",
                                duration: 1600
                            });
                    });
            }
            var SEPayPlugin =  function  (params,sucFunc,failFunc,opts, className) {
                var params = params || null;
                var sucFunc = sucFunc || function(){};
                var failFunc = failFunc || function(){};
                var opts = opts || {};
                var className = className || null ;
                
                try{
                    cordova.exec(sucFunc,failFunc, "SEPayPlugin", "start", [className, params,opts]) ;
                }
                catch(err){
                    alert("如您在app中进行支付，程序调起支付app失败，请点击按钮手动尝试下！")
                }
            }

            this.$refs.pay.onclick = async function() {
                if (!that.resMoney) {
                    Toast({
                        message: '可用额度不足！',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 1000
                    })
                    return
                }
                if (that.orderMoney > that.creditObj.remaincredit) {
                    Toast({
                        message: '可用额度不足！',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 1000
                    })
                    return
                }
                showLoading()
                repaymentsByonlineOrunderline(that.orderNo, that.orderMoney)
                .then(res => {
                    hideLoading()
                    if (res.data.returncode == 0) {
                        Toast({
                            message: '信用支付失败！',
                            iconClass: "aui-iconfont aui-icon-close",
                            duration: 1000
                        })
                        return
                    }
                    that.$router.replace({"name": "paysuccessfully", params: {orderType: that.orderType}});
                })
                .catch(e => {
                    Toast({
                        message: '信用支付失败！',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 1000
                    })
                    hideLoading()
                })

                return
                // 不需要调用以下内容
                //如果实付金额为0，则直接跳到支付成功页面
                if (that.orderMoney > 0) {
                    // 请求java接口，请求前判断用户使用余额情况 判断是否需要调起翌支付
                    var sessionId = localStorage.getItem('sessionId');
                    //订单编号
                    var orderNo = that.$route.params.orderNo;
                    //
                    var scenary_id = "3";
                    let options = {
                        method: "post",
                        //url: window.api.local_host + api.gwPay,
                        url: window.api.local_host + '/creditPay/pay',
                        data: {
                            "enterpriseid": window.api.enterpriseid,
                            cost: that.orderMoney,
                            //vipid:1192887,
                            "orderNo": orderNo,
                            //scenary_id
                        },
                        headers: {
                            "sessionId": sessionId
                        }
                    }
                    //1.0.7及以上版本使用2.0支付接口
					// await getAppVersion() && (options.data.version = "2.0");
                    axios(options).then(data => {
                        // console.log(data.toString());
                        if (data.status === 200) {
                            // console.log(2222222222222);
                            // alert(data.toString());
                            var listData = data.data.data[0];
                            if (listData != null) {
                                var pay_no = listData.pay_no;  //
                                var app_code = listData.app_code;
                                var se_payment_code = listData.se_payment_code;
                                var se_private_key = listData.se_private_key;
                                var created_ts = Date.parse(new Date())/1000;  //
                                var amount = listData.amount;
                                var appStr = app_code + se_payment_code + pay_no + created_ts;
                                var semd5 = md5(appStr) + se_private_key;
                                var se_sign = md5(semd5); //
                                //alert("开始支付,pay_no="+pay_no+"\r\nse_payment_code="+se_payment_code+
                                //"\r\nse_private_key="+se_private_key+"\r\n");
                                // alert(333333333333);
                                //SEPayPlugin_Start(pay_no,created_ts,se_sign,amount)
                                
                            } else {
                                alert("请求支付失败");
                                console.log("支付失败");
                                //跳转到登陆页面
                            }
                        }
                    });
                } else if (that.orderMoney === 0) {
                    that.$router.replace({"name": "paysuccessfully", params: {orderType: that.orderType}});
                } else if (that.orderMoney === "fail") {
                    Toast({
                        message: '订单信息失效',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 1000
                    });
                    return;
                }
            }

            
        },
        //从后台获取订单相关信息
        getOrderInfoFromApi() {
            showLoading();
            if (this.orderNo) {
                let callback = data => {
                    this.orderMoney = data.realPay;
                    // this.orderType = data.goodsType;
                    this.orderType = 2;
                    this.init();
                    hideLoading();
                }
                //获取订单信息失败的回调
                let errFn = () => {
                    this.orderMoney = "fail";
                }
                getOrderInfo(this.orderNo, callback, errFn);
            } else {
                hideLoading();
                //跳回个人中心
                this.$router.replace({"path": "/main/order", query: {orderStatus: 1}});
                //this.$router.replace("/main/profile");
            }
        }


    },
    async created () {
       let res = await getAccountCreditByVipidList()
       if (res.data.returncode == 0) {
           Toast({
                message: '获取可用额度失败！',
                iconClass: "aui-iconfont aui-icon-close",
                duration: 1000
            });
           return
       } else {
           let result = res.data.data[0][0]
 
            if (result.remaincredit === "") {
                result.remaincredit = result.credit
            }
           this.creditObj = result

       }


        this.getOrderInfoFromApi();

    },
    beforeDestroy () {
        hideLoading();
    },

}
</script>

<style>
    .disabledPay {
        background: #ededed;
    }
    .credit-msg {
        margin: 0.2rem 0.5rem;
        background: #ffffff;
        border-radius: 0.2rem;
    }
    .credit-msg .credit-msg-title {
        text-align: center;
        height: 1.5rem;
        line-height: 1.5rem;
        color: rgb(151, 0, 0);
        border-bottom: 1px solid #ededed;

    }
    .credit-msg .credit-list {
        border-bottom: 1px solid #ededed;
    }
    .credit-msg .credit-list li {
        height: 1.5rem;
        line-height: 1.5rem;
        padding: 0 0.5rem;
    }
    .credit-msg .credit-list li span:nth-child(1) {
        float: left;
    }
    .credit-msg .credit-list li span:nth-child(2) {
        float: right;
        color: #666666;
    }
    .credit-tips {
        color: orange;
        padding: 0 0.5rem;
        min-height: 1.5rem;
        line-height: 1.5rem;
    }
</style>


