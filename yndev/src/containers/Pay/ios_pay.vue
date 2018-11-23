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
                <div class="aui-title">订单支付</div>
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
                <div class="aui-content aui-margin-b-15">
                    <ul class="aui-list aui-list-in">
                        <li class="aui-list-header">
                            象谱支付
                        </li>
                        <li class="aui-list-item">
                            <div class="aui-list-item-label-icon">
                                <i class="icon njfont nj-yizhifu"></i>
                            </div>
                            <div class="aui-list-item-inner">
                                象谱支付
                                <div class="aui-list-item-right">
                                    <div class="aui-list-item-right">
                                        <input type="radio" class="aui-radio" name="payment2" checked>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--付款方式2 end-->
                <!--确定-->
                <div style="height:4rem;"></div>
                <div  class="settle_accounts lijixiadan">
                    <div class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" :class="disabledPay ? 'disabledPay': 'enablePay'" @click.stop="pay" ref="pay">确定</div>
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
import { notifyPayPayStar } from './http'
import getAppVersion  from '../../utils/gw/getAppVersion'
export default {
    props: {

    },
    data() {
        return {
            orderMoney: 0,
            orderType: 0,
            disabledPay: false
        }
    },
    computed: {
        money () {
            //如果当前页面金额错误跳回个人中心
            if (this.$route.params.money < 0 || this.$route.params.money === undefined) {
                this.$router.replace("/main/profile");
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
            this.$router.replace({"path": "/main/order", query: {orderStatus: 1}});
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
                    that.disabledPay = false
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
                                notifyPayPayStar(that.orderNo).then(res => {
                                    console.log(res)
                                }).catch(e => {
                                    console.log(e)
                                })

                                that.$router.replace({"name": "paysuccessfully", params: {orderType: that.orderType}});
                                that.disabledPay = false
                                
                            // }, 1600);
                        },
                        function (){
                            console.log("支付失败");
                            Toast({
                                message: '支付失败',
                                iconClass: "aui-iconfont aui-icon-close",
                                duration: 1600
                            });
                            that.disabledPay = false
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
                if (that.disabledPay) {
                    return
                }
                that.disabledPay = !that.disabledPay
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
                        url: window.api.local_host + api.gwPay,
                        data: {
                            sessionId,
                            "bill_id": orderNo,
                            scenary_id
                        }
                    }
                    await getAppVersion() && (options.data.version = "2.0"); 
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
                                SEPayPlugin_Start(pay_no,created_ts,se_sign,amount)
                                
                               
                            } else {
                                alert(data.data.errmsg);
                                that.disabledPay = false
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
                    console.log(data);
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
                this.$router.replace("/main/profile");
            }
        }


    },
    created () {
        console.log("这是ios界面1111");
        this.getOrderInfoFromApi();
    },
    beforeDestroy () {
        hideLoading();
    }

}
</script>

<style>
    .disabledPay {
        background: #666666 !important
    }
    .disabledPay:active {
        background: #666666 !important
    }
    .enablePay {
        background: #970000 !important
    }
    .enablePay:active {
        background: #970000 !important
    }
</style>


