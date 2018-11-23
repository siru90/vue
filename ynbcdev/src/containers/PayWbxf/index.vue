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
                <div class="aui-title">维保订单支付</div>
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
                <div class="settle_accounts lijixiadan">
                    <div class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click.stop="pay" ref="pay">确定</div>
                </div>
                <!--确定 end-->
            </div>
        </div>
    </div>
    
</template>
<!-- <script src="static/script/lib/cordova/android/cordova.js"></script> -->

<script>
import axios from "axios";
import api from "../../api";
import md5 from "js-md5";
import {Toast} from "../../utils/toast2";
import getOrderInfo from "../../utils/getOrderInfo";
import {showLoading, hideLoading} from "../../utils/loading";
import getAppVersion from "../../utils/gw/getAppVersion";
import { doComments } from '../../components/wbxf/http'
export default {
    props: {

    },
    data() {
        return {
            orderType: 0
        }
    },
    computed: {
        money () {
            //如果当前页面金额错误跳回个人中心
            if (!this.$route.params.money) {
                this.$router.replace("/main/profile");
                return;
            }
            return this.$route.params.money;
        },
        orderNo () {
            //获取订单编号
            return this.$route.params.orderNo;
        },
        orderMoney() {
            return this.$route.params.money;
        }
    },
    methods: {
        goBack() {
            this.$router.replace({"path": "/main/order", query: {orderStatus: 1}});
        },
        //确认支付
        pay() {
            
        },
        init() {
            // let script = document.createElement("script");
            // script.setAttribute("src", "static/script/cordova/android/cordova.js");
            // document.body.appendChild(script);
            // script.onload = () => {
                // console.log("cordova脚本加载成功");
                var that = this;
                var pay_no = '';
		        var created_ts = '';
		        var se_sign = '';
		        var use_json = '0';
		        var amount = ''
                var SEPayPlugin_Start = function (pay_no,created_ts,se_sign,amount){
                    //alert("start to pay 1. ");
                    //初始化
                    cordova.require('cordova/channel').onCordovaReady.subscribe(function() {
                        //  在安卓 进入后 在注册这个方法的时候 和安卓那边就已经调用这个方法了；
                        //alert("start to pay 2, exec SEPayPlugin  ");
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
                        order_money: that.money
                    }
                    console.log("doPay---data", data);
                    var pay = "sePay" + JSON.stringify(data);
                    console.log("doPay---pay", pay);
                    SEPayPlugin(pay,
                        function () {
                            // Toast({
                            //     message: '支付成功',
                            //     iconClass: "aui-iconfont aui-icon-correct",
                            //     duration: 1000
                            // });
                            // setTimeout(() => {
                                console.log("支付回调", "支付成功");
                                that.$router.replace({"name": "paysuccessfully", params: {orderType: that.orderType}});
                                //doComments()
                            // }, 1000);
                        },
                        function () {
                            console.log("支付失败");
                            Toast({
                                message: '支付失败',
                                iconClass: "aui-iconfont aui-icon-close",
                                duration: 1000
                            });
                        }
                    );
                }
                var SEPayPlugin =  function(params,sucFunc,failFunc,opts, className) {
                    var params = params || null;
                    var sucFunc = sucFunc || function(){};
                    var failFunc = failFunc || function(){};
                    var opts = opts || {};
                    var className = className || null ;
                    
                    try{
                        console.log("11111111", params);
                        console.log("调用cordova.exec");
                        console.log("cordova" + cordova);
                        console.log("cordova.exec" + cordova.exec);
                        cordova.exec(sucFunc,failFunc, "SEPayPlugin", "doPay", [className, params,opts]) ;
                        console.log("cordova.exec调用完毕");
                    }
                    catch(err){
                        console.log("dopay---err", err);
                        alert("如您在app中进行支付，程序调起支付app失败，请点击按钮手动尝试下！")
                    }
                }

                this.$refs.pay.onclick = async function() {
                    console.log("这里在执行");
                    console.log("+++++++++++++++++", that.orderMoney);
                    //如果实付金额为0，则直接跳到支付成功页面
                    if (that.orderMoney > 0) {
                        // 请求java接口，请求前判断用户使用余额情况 判断是否需要调起翌支付
                        var sessionId = localStorage.getItem('sessionId');
                        //订单编号
                        var orderNo = that.$route.params.orderNo;
                        //
                        var scenary_id = "4";
                        let options = {
                            method: "post",
                            url: window.api.local_host + '/payment/getPayNoWb',
                            data: {
                                sessionId,
                                "bill_id": orderNo,
                                scenary_id,
                                amount: that.orderMoney
                            }
                        }
                        //1.0.7及以上版本使用2.0支付接口
					    // await getAppVersion() && (options.data.version = "2.0");
                        axios(options).then(data => {
                            // console.log(data);
                            if (data.status === 200) {
                                var listData = data.data.data[0];
                                if(listData != null){
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
                                    //		"\r\nse_private_key="+se_private_key+"\r\n");
                                    // SEPayPlugin_Start(pay_no,created_ts,se_sign,amount)
                                    console.log("开始支付：", pay_no,created_ts,se_sign,amount);
                                    doPay(pay_no,created_ts,se_sign,amount)
                                }else{
                                    alert("请求支付失败");
                                    //跳转到登陆页面
                                    // suneeeUI.showToast('fail','未登陆，请先登陆',1000,null); 
                                    // suneeeUI.pageToURL("login.html",true);
                                }
                            }
                        });
                    } else if (that.orderMoney === 0) {
                        console.log("这里在执行");
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
            // }
            // document.body.appendChild(script);
            


            
        },
        //从后台获取订单相关信息
        getOrderInfoFromApi() {
            showLoading();
            if (this.orderNo) {
                let callback = data => {
                    console.log(data);
                    console.log("-------------------", data.realPay);
                    this.orderMoney = parseFloat(data.realPay);
                    
                    // this.orderType = parseInt(data.goodsType);
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
    mounted () {
        //this.getOrderInfoFromApi();
        this.init()
        // setTimeout(() => {
        //     this.init();
        // }, 50);
        console.log("这是android界面");
        console.log("这是window.erp", window.api.local_host);
    },
    beforeDestroy () {
        hideLoading();
    }

}
</script>

<style>

</style>


