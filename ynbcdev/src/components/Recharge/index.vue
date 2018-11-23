<template>
    <div class="recharge-root-box">
        <!-- 遮罩层 -->
        <div class="recharge-cover" v-show="options.state === 1 || options.state === 2"></div>
        <!-- 样式一 -->
        <div class="recharge" v-if="options.state === 1">
            <!-- 签到成功/领取成功 -->
            <div class="recharge-success">
                <img src="static/image/qd-success.png" class="success-img">
                <div class="success-box">
                    <p class="success-title">{{options.successTitle}}</p>
                    <p class="success-number">恭喜获得<span>{{options.number + "m"}}</span>流量</p>
                    <!-- 用户第一次充值 -->
                    <div class="first-recharge" v-if="isFirst">
                        <span @click="gotoRechargePage">选择终端充值</span>
                        <span @click="rHide">稍后充值</span>
                    </div>
                    <!-- 不是第一次充值 -->
                    <div v-if="!isFirst" class="not-first">
                        <div v-show="!autoRechargeState">
                            正在自动充值
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </div>
                        <!-- 充值完毕 -->
                        <div v-show="autoRechargeState">
                            <!-- 充值成功的提示 -->
                            <p class="not-first-success" 
                                v-if="autoRechargeResult">
                                自动充值成功<span class="">（{{rechargeSuccessfullyTime}}s）</span>
                            </p>
                            <!-- 充值失败的提示 -->
                            <p class="not-first-fail"
                                @click="autoRecharge(isFirst)"
                                v-if="!autoRechargeResult && autoRechargeFailedNum < 2">
                                充值失败，请点击重试
                            </p>
                            <!-- 稍后再试的提示 -->
                            <p class="not-first-fail"
                                v-if="!autoRechargeResult && autoRechargeFailedNum >= 2">
                                充值失败，请稍后再试
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 关闭按钮 -->
            <div class="recharge-close" @click.stop="rHide">
                <img src="static/image/qd-close.png" alt="">
            </div>
        </div>
        <!-- 样式二 -->
        <div class="recharge2" v-if="options.state === 2">
            <!-- 正在充值中 -->
            <p class="recharge2-success" :style="{width:rechargeWidth}" v-show="!autoRechargeState">正在充值...</p>
            <!-- 充值结束 -->
            <div v-show="autoRechargeState">
                <!-- 充值成功 -->
                <p class="recharge2-success" :style="{width:rechargeWidth2}"
                    v-if="autoRechargeResult">
                    恭喜，充值成功<span class="">（{{rechargeSuccessfullyTime}}s）</span>
                </p>
                <!-- 充值失败 -->
                <div v-if="!autoRechargeResult">
                    <div v-show="autoRechargeFailedNum < 2" class="recharge2-fail">
                        <p>充值失败，请点击重试</p>
                        <span @click="autoRecharge(isFirst)">重试</span>
                    </div>
                    <div v-show="autoRechargeFailedNum >= 2" class="recharge2-fail">
                        <p>充值异常，请稍后再试</p>
                        <span @click="rHide">确定</span>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
    import {recharge,syncFullSendFlowData} from "./axios";//获取充值流量的方法
    export default {
        props: {
            //充值信息
            rechargeInfo: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                isFirst: true,//用户是否是第一次充值流量
                options: {
                    state: -1,
                    successTitle: "签到成功",
                    number: "60",
                    failTitle: "sorry，签到失败了",
                    rechargeParams: {
                        // type: "",
                        // rechargeid: "",//流量Id，
                        terminalno: "",//终端号
                        // plateno: "",//车牌号
                        monthdtlid: "",//月度流量Id,
                        checkindtlid: "",//签到流量
                    }//充值信息
                },
                autoRechargeState: 0,//自动充值的状态，默认为0，代表充值中，1为充值完毕（成功或失败）
                autoRechargeResult: 0,//自动充值的结果，0失败，1成功
                autoRechargeFailedNum: 0,//充值失败的次数
                rechargeSuccessfullyTimer: null,
                rechargeSuccessfullyTime: 3,
                rechargeWidth:'130px',
                rechargeWidth2:'232px',
            }
        },
        computed: {
            
        },
        methods: {
        	//获取充值成功弹框的宽
        	/*getRechargeWidth(){
        		if(document.querySelectorAll(".recharge2-success")[0]){
        			this.rechargeWidth = window.getComputedStyle(document.querySelectorAll(".recharge2-success")[0], null).width
        		    console.log(this.rechargeWidth,"77777777777")
        		}
        	},*/
            //跳到选择终端充值的页面
            gotoRecharge() {
                
            },
            //模拟等待过程
            pending() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({
                            data: {returnCode: 1}
                        });
                    }, 2000);
                });
            },
            //充值的方法
            async autoRecharge(isFirst,opt) {
                this.autoRechargeState = 0;
//                 let data = await this.pending();
                let params = this.handleRechargeParams(isFirst)
                
                let data;
                try {
                //如果是满赠流量
                    if (this.options.rechargeParams.fullSend) {

                        if (opt) {
                            params.plateno = opt.rechargeParams.plateno
                            params.terminalno = opt.rechargeParams.terminalno
                        }
                        data = await recharge(params,true,this.options.rechargeParams.orderno)
                        const syncData = {
                            orderNo: this.options.rechargeParams.orderno,
                            rechargeStatus: 1,
                            rechargeTime: Date.now(),
                            plateNum:this.options.rechargeParams.plateno,
                            terminalNum: this.options.rechargeParams.terminalno
                        }
                        syncFullSendFlowData(syncData)
                       
                    }else{
                        data = await recharge(params);//等待充值结果
                     
                    }
                
                  
//                       data = await this.pending();
                } catch (err) {
                    //充值失败
                    this.handleRechargeState({
                        data: {
                            returnCode: 0
                        }
                    });
                }
                console.log("充值参数打印：", params);
                console.log("充值结果打印：", data);
                this.autoRechargeState = 1;//置为1，代表充值结束，或成功，或失败，结束loading状态
                //判断成功或者失败
                this.handleRechargeState(data);
            },
            //自动充值成功
            rechargeSuccessfully() {
            },
            //清理计时器的函数
            clearIntervalFn() {
                clearInterval(this.rechargeSuccessfullyTimer);
                this.rechargeSuccessfullyTimer = null;
            },
            //处理充值成功或失败的情况
            handleRechargeState(data) {
                //充值成功
//                   if (true) {
              if (data.data.returnCode === 1) {
                    //Vuex中的结果置为成功
                    this.$store.commit("gwModules/setCurrentRechargeResult", true);
                    //将结果置为充值成功
                    this.autoRechargeResult = 1;
                    //开启一个定时器，提示用户该提示框指定秒数内将关闭
                    this.rechargeSuccessfullyTimer = setInterval(() => {
                        if (this.rechargeSuccessfullyTime === 0 || this.rechargeSuccessfully < 1) {
                            //删掉计时器
                            this.clearIntervalFn();
                            this.rechargeSuccessfullyTime = 3
                            //关闭弹框
                            this.options.state = -1;
                            //跳转到终端流量查看页面
                            this.$router.push({name: "sendTraffic", query: {num: 3}});
                            
                        }
                        this.rechargeSuccessfullyTime -= 1;
                        
                    }, 1000);
                } else {
                    //Vuex中的结果置为失败
                    this.$store.commit("gwModules/setCurrentRechargeResult", false);
                    console.log(data.data.msg);
                    //将结果置为充值失败
                    this.autoRechargeResult = 0;
                    //失败次数加1
                    this.autoRechargeFailedNum += 1;
                }
            },
            //处理充值信息参数
            handleRechargeParams(isFirst) {
                console.log(this.options)
                
                if (isFirst) {
                    //第一次充值
                    return {
                        monthdtlid: this.options.rechargeParams.monthdtlid,
                        checkindtlid: this.options.rechargeParams.checkindtlid,
                        // vipid: this.$store.getters["xhModules/userInfo"].vipid,
                        enterpriseid: window.api.enterpriseId + "",
                        terminalno: this.options.rechargeParams.terminalno,
                        plateno: this.options.rechargeParams.plateno
                    }
                } else if (!isFirst) {
                    return {
                        monthdtlid: this.options.rechargeParams.monthdtlid,
                        checkindtlid: this.options.rechargeParams.checkindtlid,
                        // vipid: this.$store.getters["xhModules/userInfo"].vipid,
                        enterpriseid: window.api.enterpriseId + "",
                        terminalno: this.$store.getters["gwModules/getRechargeInfo"].terminalno,
                        plateno: this.$store.getters["gwModules/getRechargeInfo"].plateno,
                    }
                }
            },
            //第一次充值的时候，点击稍后充值，去到充值页面
            gotoRechargePage() {
                this.$router.push({path: "/main/trafficTopUp", query: {item: {receiveflow: this.options.number, ...this.options.rechargeParams}}})
            },
            //弹出提示框
            async rToast(opt) {
                
                this.isFirst = await this.$store.dispatch('gwModules/queryRechargeInfo');
                // 如果是满赠流量，在这里截断
                if (opt.rechargeParams.fullSend && opt.state != 2) {
                    const info = this.$store.state.gwModules.rechargeInfo
                    opt.rechargeParams.plateno = info.plateno
                    opt.rechargeParams.terminalno = info.terminalno
                }
                this.options = Object.assign({}, this.options, opt);
                //如果是第一次充值
                if (this.isFirst && this.options.state === 2) {
                    console.log(opt)
                    this.autoRecharge(this.isFirst,opt);
                    
                    return;
                }
                //自动充值
                if (!this.isFirst) {
                    this.autoRecharge(this.isFirst);
                    return;
                }
            },
            //关闭弹出框
            rHide() {
                // console.log("关闭弹出框");
                this.options.state = -1;
                //失败次数置为0
                this.autoRechargeFailedNum = 0;
            },
            //清空操作
            clearData() {
                //失败次数置为0
                this.autoRechargeFailedNum = 0;
                this.$store.commit("gwModules/setCurrentRechargeResult", false);
            }
        },
        async created() {
            // let isFirstRecharge = await this.$store.dispatch('gwModules/queryRechargeInfo');
            // console.log("dfdfdfdfdfdfddf");
        },
        mounted() {
               /*this.rToast({
                   state: 2,
                   successTitle: "领取成功"
               });*/
        },
        beforeDestroy() {
            
            this.clearData();
        }

    }
</script>
<style scoped>
.recharge-root-box {
    position: relative;
    z-index: 102;
}
.recharge {
    position: relative;
}
.recharge-cover {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #000;
    opacity: 0.6;
}
.recharge-success {
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 5px;
    width: 280px;
}
.success-img {
    width: 100%;
    position: absolute;
    top: -225px;
    left: 0;
}
.success-box {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;
}
.success-title {
    color: #fff;
    font-size: 1rem;
    transform: translateY(-60px);
}
.success-number {
    font-size: 0.8rem;
    color: #666;
    transform: translateY(-20px);
}
.success-number span {
    color: orangered;
    padding: 0 5px;
}
.first-recharge {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    transform: translateY(30px);
}
.first-recharge span {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
}
.first-recharge span:first-of-type {
    border-right: 1px solid #f1f1f1;
    color: deepskyblue;
}
.not-first {
    height: 40px;
    width: 100%;
    color: #666;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(30px);
}
.not-first-success {
    color: orangered;
}
.not-first-fail {
    color: deepskyblue;
}
.recharge-close {
    width: 40px;
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
}
.recharge-close img {
    width: 100%;
}

/* 样式二 */
.recharge2-success {
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    color: #444;
    font-size: 18px;
    padding: 10px 20px;
    border-radius: 3px;
    /*width: fit-content;*/
}

.recharge2-fail {
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    color: #444;
    font-size: 18px;
    /* display: flex;
    justify-content: center; */
    width: 240px;
    border-radius: 3px;
}
.recharge2-fail>p {
    width: 100%;
    text-align: center;
    color: #444;
    height: 80px;
    line-height: 80px;
    font-size: 16px;
}
.recharge2-fail>span {
    color: deepskyblue;
    width: 100%;
    text-align: center;
    display: block;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #ddd;
    font-size: 16px;
}


</style>

