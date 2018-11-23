import {Toast} from "./toast2";
//定义正则表达式
let regRules = {
    //必须是数字字母
    isNumberAndLetter: /^[\da-zA-Z]*$/,
}
//调用正则表达式进行匹配
let strategies = {
    //非空校验
    notEmpty : (value, errorMsg) => {
        if (value === "" || value == undefined) {
            // console.log("value为空", value);
            Toast({
                duration: 1000,
                message: errorMsg,
                iconClass: "aui-iconfont aui-icon-close"
            });
            return errorMsg;
        }
    },
    //纯数字校验
    isNumber: (value, errorMsg) => {
        let reg = /^\d+$/g;
        if (!reg.test(value)) {
            Toast({
                duration: 1000,
                message: errorMsg,
                iconClass: "aui-iconfont aui-icon-close"
            });
            return errorMsg;
        }
    },
    //最小长度校验
    minLength: (value, length, errorMsg) => {

    },
    //手机号校验
    isPhone: (value, errorMsg) => {

    },
    //数字字母校验
    isNumberAndLetter: (value, errorMsg) => {
        let reg = regRules.isNumberAndLetter;
        if (!reg.test(value)) {
            errorToast(errorMsg);
            return errorMsg;
        }
    }
}
//提示错误的Toast
function errorToast (msg) {
    Toast({
        duration: 1000,
        message: msg,
        iconClass: "aui-iconfont aui-icon-close"
    });
}

const Validator = function () {
    this.cache = [];
}
//添加单条校验规则
Validator.prototype.add = function (value, rule, errorMsg) {
    let arr = rule.split(":");
    this.cache.push(function () {
        //开始组装参数
        var strategy = arr.shift();
        arr.unshift(value);
        arr.push(errorMsg);
        // console.log(strategies);
        // console.log("------strategy------", strategy);
        return strategies[strategy](...arr);
    });
    // console.log("-------cache------", this.cache);
}

//添加多条校验规则
//rules["规则", "errorMsg"]
Validator.prototype.adds = function (value, rules) {
    // let arr = rule.split(":");
    // console.log("valueeeeeeeeeeee", value);
    let t = this;
    if (Array.isArray(rules)) {
        rules.forEach(item => {
            // (function (v) {
                t.cache.push(function () {
                    let arr = item[0].split(":");
                    // console.log("------arr------", arr);
                    // console.log("------value------", v);
                    //组装参数
                    let strategy = arr.shift();//拿到校验的名称
                    arr.unshift(value);
                    arr.push(item[1]);
                    return strategies[strategy](...arr);
                });
            // })(value)
        });
    } else {
        console.error("规则必须是一个数组");
    }
    // console.log(this.cache);
}

//开始进行校验
Validator.prototype.start = function () {
    for (let i = 0, validatorFn; validatorFn = this.cache[i++];) {
        // console.log("具体的验证函数", validatorFn);
        var msg = validatorFn();
        if (msg) {
            return msg;
        }
    }
}

function getSingle() {
    var Validator;
    return function () {
        return Validator || (Validator = createValicator());
    }
}

function createValicator() {
    console.log("单例模式，初始化一个Validator");
    return new Validator();
}

//单例模式创建一个Validator对象
const v = getSingle();



export default Validator;
