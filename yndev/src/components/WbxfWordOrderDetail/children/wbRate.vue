<template>
    <div ref="wbRateBar" class="wbRateBar">
        <ul :style="{'width': this.servicemethod != 1 ? '61.0rem' : '65.5rem'}" class="wbRateBarContent">
            <li class="wbRateItem" v-for="(item, index) in visitServer" :key="index">
                <div class="wbRateItemTop">
                    <transition name="fade">
                        <div v-if="currentRateShow(item.rate)" class="wbRateQP">
                            {{item.rateName}}
                            <div class="arrow_down">

                            </div>
                        </div>
                    </transition>
                    
                    
                </div>

                <div :style="{width: index === visitServer.length-1 ? '5.7rem' : '5rem'}" class="wbRateItemMid">
                    <div class="rateCircle">

                    </div>
                    <div class="rateLine">

                    </div>
                    <div v-if="index === visitServer.length-1" class="rateCircle">

                    </div>
                </div>
                
                <div class="wbRateItemBottom">{{item.rateText}}</div>
            </li>
        </ul>
    </div>      
</template>
<script>
export default {
    computed: {
        visitServer() {
            if (this.servicemethod === 1) {
                return this.visitServerDD
            } else {
                return this.visitServerSM
            }
        }
    },
    methods: {
        currentRateShow(rateArr) {
            if (typeof rateArr === "number") {
                if (rateArr === this.currentRate) {
                    return true
                }
                return false
            }
            for (let i = 0; i < rateArr.length; i++) {
                const element = rateArr[i];
                if (element === this.currentRate) {
                    
                    return true
                }
            }
            return false
        }
    },
    data() {
        return {
            visitServerDD: [
                {
                    rate: 0,
                    rateText: "送车间",
                    rateName: "临时"
                },
                {
                    rate: 1,
                    rateText: "检测派工",
                    rateName: "待派工"
                },
                {
                    rate: 2,
                    rateText: "调度员检测",
                    rateName: "待检测"
                },
                {
                    rate: 3,
                    rateText: "维保方案",
                    rateName: "待报价"
                },
                {
                    rate: 4,
                    rateText: "客户确认",
                    rateName: "待签约"
                },
                {
                    rate: 5,
                    rateText: "派维修工",
                    rateName: "待指派"
                },
                {
                    rate: 6,
                    rateText: "维修工接单",
                    rateName: "待接单"
                },
                {
                    rate: 7,
                    rateText: "执行维修",
                    rateName: "待维修"
                },
                {
                    rate: 8,
                    rateText: "客户确认",
                    rateName: "待确认"
                },
                {
                    rate: 9,
                    rateText: "执行质检",
                    rateName: "待质检"
                },
                {
                    rate: 10,
                    rateText: "客户确认验收",
                    rateName: "待验收"
                },
                {
                    rate: 11,
                    rateText: "客户支付",
                    rateName: "待支付"
                },
                {
                    rate: [12,13,14],
                    rateText: "财务收款",
                    rateName: "已支付"
                },
                // {
                //     rate: 13,
                //     rateText: "运营审核",
                //     rateName: "待审核"
                // },
                // {
                //     rate: 14,
                //     rateText: "审核通过",
                //     rateName: "已审核"
                // }
            ],
            visitServerSM: [{
                    rate: 0,
                    rateText: "初步维保方案",
                    rateName: "待报价"
                }, {
                    rate: 1,
                    rateText: "客户确认",
                    rateName: "待确认"
                }, {
                    rate: 2,
                    rateText: "维修派工",
                    rateName: "待指派"
                }, {
                    rate: 3,
                    rateText: "维修工接单",
                    rateName: "待接单"
                }, {
                    rate: 4,
                    rateText: "维修工检测",
                    rateName: "待检测"
                }, {
                    rate: 5,
                    rateText: "正式维保方案",
                    rateName: "待报价"
                }, {
                    rate: [6,8],
                    rateText: "客户确认",
                    rateName: "待确认"
                }, {
                    rate: 7,
                    rateText: "执行维修",
                    rateName: "待维修"
                }, {
                    rate: 9,
                    rateText: "执行质检",
                    rateName: "待质检"
                }, {
                    rate: 10,
                    rateText: "客户确认验收",
                    rateName: "待验收"
                }, {
                    rate: 11,
                    rateText: "客户支付",
                    rateName: "待支付"
                }, {
                    rate: [12,13,14],
                    rateText: "财务收款",
                    rateName: "已支付"
                }, 
                // {
                //     rate: 13,
                //     rateText: "运营审核",
                //     rateName: "待审核"
                // }, {
                //     rate: 14,
                //     rateText: "审核通过",
                //     rateName: "已审核"
                // }
            ]
        }
    },
    props: {
        currentRate: {
            type: Number,
            default:-1
        },
        servicemethod: Number
    },
    watch: {
        currentRate(v) {
            if (document.querySelector('.wbRateBar') && v != 0) {
                $('.wbRateBar').animate({
                    scrollLeft: (this.currentRate -1 ) * 100
                },500)
            }
        }
        
    },
    mounted() {
        
    },
}
</script>
<style>
    .wbRateBar {
        /* width: 1400px; */
        height: 4.6rem;
        background: #0f8de0;
        padding: 0 0.5rem;
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        padding-top: 0.3rem;
    }
    .wbRateBarContent {
        overflow:hidden;
        width:60.0rem;
        height:100%;
    }
    .wbRateItem {
        float: left;
        width: 5rem;
        height: 100%;
        text-align: center
    }
    .wbRateQP {
        width: 90%;
        height: 90%;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 4px;
        position: relative;
        text-align: center;
        line-height: 1.4rem;
        font-size: 12px;
        color: #0f8de0;
    }
    .wbRateItemTop {
        height: 2rem;
        width: 100%;
        padding-left: 0.7rem;
        padding-top: 0.5rem;
    }
    .wbRateItemMid {
        width: 100%;
        overflow: hidden;
        display: flex
    }
    .wbRateItemMid .rateCircle {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 0.35rem;
        background: #ffffff;
    }
    .wbRateItemMid .rateLine {
        flex: 1;
        height: 8px;
        border-bottom: 1px dashed #ffffff;
    }
    .wbRateItemBottom {
        text-align: center;
        margin-left: 0.7rem;
        color: #ffffff;
        font-size: 12px;
    }
    
.arrow_down {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #ffffff;
    position: absolute;
    left: 50%;
    bottom: -4px;
    transform: translate(-50%,0);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
