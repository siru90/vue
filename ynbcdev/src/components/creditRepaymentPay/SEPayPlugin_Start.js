import {Toast} from "../../utils/toast2";
let flgSys = ""
export const SEPayPlugin_Start = function (pay_no,created_ts,se_sign,amount,successCb,flg,that){
    // alert("start to pay 1. ");
    //初始化
    // alert(JSON.stringify({
    //     "pay_no":pay_no,
    //     "created_ts": created_ts,
    //     "se_sign": se_sign,
    //     "amount": amount
    // }))
    cordova.require('cordova/channel').onCordovaReady.subscribe(function() {
        //  在安卓 进入后 在注册这个方法的时候 和安卓那边就已经调用这个方法了；
        // alert("start to pay 2, exec SEPayPlugin  ");
        cordova.exec(null, null, 'SEPayPlugin',null, []);
        //CenterCommandPlugin('start');
        doPay(pay_no,created_ts,se_sign,amount,successCb,flg,that);
    });
}
export const doPay = function  (pay_no,created_ts,se_sign,amount,successCb,flg,that){ 
    if (flg === "android") {
        flgSys = "android"
    }
    // alert(JSON.stringify({
    //     "pay_no":pay_no,
    //     "created_ts": created_ts,
    //     "se_sign": se_sign,
    //     "amount": amount
    // }))
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
                    successCb()
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
        if (flgSys === "android") {
            cordova.exec(sucFunc,failFunc, "SEPayPlugin", "doPay", [className, params,opts]) ;
        }else {
            cordova.exec(sucFunc,failFunc, "SEPayPlugin", "start", [className, params,opts]) ;
        }
        
    }
    catch(err){
        alert("如您在app中进行支付，程序调起支付app失败，请点击按钮手动尝试下！")
    }
}