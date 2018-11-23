<template>
    <div id="crPay">
        <header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
            <div @click="goback" class="go-back">
                <i></i>
                <i></i>
                <i></i>
            </div>
			<div class="aui-title">还款</div>
		</header>
        <div class="crPay-content">
            <ul  class="aui-list aui-form-list form-data-crpay">
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">
                            总信用额度
                        </div>
                        <div class="aui-list-item-input input-text">
                            ¥{{userMsg.credit}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">
                            已用额度
                        </div>
                        <div class="aui-list-item-input input-text">
                            ¥{{userMsg.owncredit }}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">
                            可用额度
                        </div>
                        <div class="aui-list-item-input input-text">
                            ¥{{userMsg.remaincredit}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">
                            还款金额
                        </div>
                        <div class="aui-list-item-input input-text" style="color:#EA3939 !important;">
                            ¥{{paramsPay.amount}}（含邮费¥{{paramsPay.postage}}）
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="aui-list aui-form-list form-data-crpay">
                <li style="border-bottom:1px solid #ededed;" class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div style="color:#666666;" class="aui-list-item-label">
                            还款方式
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner" style="justifyContent:start">
                        <label style="margin-right:2rem;">线上还款 <input v-model="payType" value="0" class="aui-radio" type="radio"  checked></label>
                        <label>线下还款 <input v-model="payType" value="1" class="aui-radio" type="radio" > </label>
                    </div>
                </li>
            </ul>
            <ul v-if="payType==='0'" class="aui-list aui-form-list form-data-crpay">
                <li style="border-bottom:1px solid #ededed;" class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div style="color:#666666;" class="aui-list-item-label">
                            象谱支付
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div style="position:relative;width:40%" class="aui-list-item-label">
                           <i id="yzf-font" class="njfont nj-yizhifu"></i> 
                           <span class="yzf-word">象谱支付</span> 
                        </div>
                        <div class="aui-list-item-input input-text" style="color:#EA3939 !important;width:auto">
                            <input v-model="payClass" value="0" class="aui-radio" type="radio" >
                        </div>
                    </div>
                </li>
            </ul>
            <ul v-else class="aui-list aui-form-list form-data-crpay">
                <li style="border-bottom:1px solid #ededed;" class="aui-list-item">
                    <div  class="aui-list-item-inner">
                        <div class="aui-list-item-label">
                            单据号
                        </div>
                        <div class="aui-list-item-input">
                            <input v-model="billno" type="text" placeholder="请输入单据号">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner" style="justifyContent:start;padding: 0.5rem 0.5rem 0.5rem 0;color:#ff9900">
                        温馨提示：如果您已线下还款，请输入还款单据号，如果您计划线下还款，但还没还，可直接点击“确定”按钮，提交还款申请。
                    </div>
                </li>
            </ul>
        </div>
        <div class="settle_accounts lijixiadan">
            <div @click="doPayIt" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm">确定</div>
        </div>
    </div>    
</template>
<script>
import { underLinePayAxios,notifyPayPayStar } from './http'
import { SEPayPlugin_Start, doPay } from './SEPayPlugin_Start'
import { Toast } from '../../utils/toast2';
import getAppVersion from './getAppVersion';
import axios from 'axios';
import md5 from "js-md5";
export default {
    props: {
        userMsg: {
            type: Object
        }
    },
    watch: {
        payType(v) {
         
        },
    },
    data() {
        return {
            payType: "0",
            payClass: '0',
            billno: "", //线下还款单据号
            disabledPay: false,
        }
    },
    methods: {
        goback() {
            this.$router.back();
        },
        doPayIt() {
            if (this.payType == 1) {
                let payParam = {
                    startdate: this.paramsPay.startdate,
                    enddate: this.paramsPay.enddate,
                    amount: this.paramsPay.amount,
                    postage : this.paramsPay.postage,
                    repaymenttype: 2,
                    billno: this.billno
                }
                this.underLinePay(payParam)
            } else {
                this.onLinePay()
            }
        },
        // 线下还款
        underLinePay(params) {
            underLinePayAxios(params)
            .then(res => {
                if (res.data.returnCode == 0) {
                    Toast({
                        message: '还款失败！',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 1000
                    })
                    return
                }
                Toast({
                    duration: 2000,
                    message: "还款申请已提交！",
                    iconClass: "aui-iconfont aui-icon-correct"
                })
                setTimeout(() => {
                    this.$router.replace({name:"creditRepayment"})
                }, 2000);
            })
            .catch(e => {
                    Toast({
                        message: '还款失败！',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 1000
                    })
            })
        },
        // 线上还款
        async onLinePay() {
            var that = this
            if (this.disabledPay) {
                return
            }
            this.disabledPay = !this.disabledPay
            console.log(this.orderMoney)
            //如果实付金额为0，则直接跳到支付成功页面
            if (this.orderMoney > 0) {
                // 请求java接口，请求前判断用户使用余额情况 判断是否需要调起翌支付
                var sessionId = localStorage.getItem('sessionId');
                //订单编号
                var orderNo = this.$route.params.orderNo;
                //
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                var scenary_id = isIOS? "3": "4";
                let options = {
                    method: "post",
                    url: window.api.local_host + '/payment/getPayNoBigCustomer',
                    data: {
                        sessionId,
                        "bill_id": orderNo,
                        scenary_id,
                        startdate: that.paramsPay.startdate,
                        enddate: that.paramsPay.enddate,
                        amount: that.paramsPay.amount,
                        postage : that.paramsPay.postage,
                    },
                    headers: {
                        sessionId: window.localStorage.getItem("sessionId")
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
                            if (isIOS) {
                                SEPayPlugin_Start(pay_no,created_ts,se_sign,amount,function() {
                                    notifyPayPayStar(listData.bill_id).then(res => {
                                        console.log(res)
                                    }).catch(e => {
                                        console.log(e)
                                    })
                                    that.$router.replace({"name": "paysuccessfully", params: {orderType: 2,backPage: 2}});
                                },"ios",that)
                            } else if (isAndroid) {
                                doPay(pay_no,created_ts,se_sign,amount,function() {
                                    notifyPayPayStar(listData.bill_id).then(res => {
                                        console.log(res)
                                    }).catch(e => {
                                        console.log(e)
                                    })
                                    that.$router.replace({"name": "paysuccessfully", params: {orderType: 2,backPage: 2}});
                                },"android",that)
                            }
                            
                            
                            
                        } else {
                            Toast({
                                message: data.data.errmsg,
                                iconClass: "aui-iconfont aui-icon-close",
                                duration: 1000
                            });
                            this.disabledPay = false
                            return
                            //跳转到登陆页面
                        }
                    }
                });
            } else if (this.orderMoney === 0) {
                this.$router.replace({"name": "paysuccessfully", params: {orderType: this.orderType}});
            } else if (this.orderMoney === "fail") {
                Toast({
                    message: '订单信息失效',
                    iconClass: "aui-iconfont aui-icon-close",
                    duration: 1000
                });
                return;
            }

        },
        // 操作系统判断

        // cordova插件

    },
    computed: {
        paramsPay() {
            console.log('-----')
            console.log(this.$route.params)
            return this.$route.params
        },
        orderMoney() {
            return this.paramsPay.amount
        } 
    }
}
</script>
<style>
    #yzf-font {
        font-size: 1.4rem;
        color: #EA3939;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0,-50%);
    }
    .yzf-word {
        margin-left: 2rem;
    }
    .crPay-content {
        padding-top: 2.75rem;
    }
    .input-text {
        text-align: right !important;
        color: #666666 !important;
    }
    .form-data-crpay {
        margin: 0.5rem 0 0;
    }
</style>
