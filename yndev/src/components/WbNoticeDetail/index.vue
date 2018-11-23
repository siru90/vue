<template>
    <div id="wbtxdetail">
        <header class="aui-bar aui-bar-nav aui-bar-light">
            <div style="height:2.75rem;position:relative">
              
                <div @click="goback" class="go-back">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
               
                <div class="aui-title">
                维保提醒详情
                </div>
            </div>
        </header>
        <div class="wbtxdetail-content">
            <div class="wb-detail">
                <div class="wbtx-item-mid">
                    <div class="wbtx-img">
                        <img :src="wbDetail.remindtype == '0' ? 'static/image/weixiu.png': 'static/image/baoyang.png'" alt="" srcset="">
                    </div>
                    <div class="wbtx-msg">
                        <p>
                            <span v-html="getWbType(wbDetail.remindtype)" class="wbtx-type"></span>
                            <span class="wbtx-plate-number">{{wbDetail.licensenum}}</span>
                        </p>
                        <p>
                            终端号：{{wbDetail.terminalnum}}
                        </p>
                        <p>
                            <span class="wbtx-spn">SPN码：{{wbDetail.spn}}</span>
                            <span>FMI码：{{wbDetail.fmi}}</span>
                        </p>
                        <p>发生时间：{{wbDetail.occurtime}}</p>
                    </div>
                    
                </div>
            </div>
            <ul>
                <li style="margin-bottom:0.5rem;" v-for="(item, index) in wbDetail.mallDetailFaultList" :key="index">
                    <div class="hitch-detail">
                        <div>
                            <span class="detail-title">故障代码：</span>
                            <span class="detail-d">{{item.faultcode}}</span>    
                        </div>
                        <div>
                            <span class="detail-title">故障闪码：</span>
                            <span class="detail-d">{{item.flashcode}}</span> 
                        </div>
                        <div class="detail-long">
                            <div class="detail-long-title detail-title">
                                故障描述：
                            </div>
                            <div class="detail-long-dir detail-d">
                                {{item.describe}}
                            </div>
                            
                        </div>
                        <div class="detail-long">
                            <div class="detail-long-title detail-title">
                                故障现象：
                            </div>
                            <div class="detail-long-dir detail-d">
                                {{item.phenomenon}}
                            </div>
                            
                        </div>
                        <div class="hitch-detail-number">
                            {{index + 1}}
                        </div>
                    </div>
                            <div class="wbtxdetail-reason">
            <div class="detail-long">
                <div class="detail-long-title detail-title">
                    故障原因：
                </div>
                <div class="detail-long-dir detail-d">
                    {{item.reason}}
                </div>
                
            </div>
            <div class="detail-long">
                <div class="detail-long-title detail-title">
                    建议解决：
                </div>
                <div class="detail-long-dir detail-d">
                    {{item.clientsuggestion}}
                </div>
                
            </div>
        </div>
                </li>
            </ul>
            
        </div>

        <div v-if="!hideBtn" class="wbtxdetail-bottom">
            <div @click="gotoHome" class="bottom-left-item">
                购买配件
            </div>
            <div v-if="!hadRes" @click="gotoYY" class="bottom-right-item">
                预约维保
            </div>
            <div v-else @click="gotoDetail" class="bottom-right-item">
                预约详情
            </div>
        </div>
    </div>    
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    props: {
        wbDetail: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    computed: {
        hadRes() {
            if (this.$route.query.reservationno) {
                return true
            } else {
                return false
            }
        },
        hideBtn() {
            if (this.$route.query.hidebtn == 1) {
                return true
            }
            return false
        }
    },
    methods: {
        ...mapMutations([
            'CHOOSE_ADDRESS',
        ]),
        gotoHome() {
            this.$router.push({path: '/main/home'})
        },
        getWbType(code){
            if (code == 0) {
                return '<span style="background:#008000; padding:0.1rem 0.2rem;">维修提醒</span>'
            } else {
                return '<span style="background:orange; padding:0.1rem 0.2rem;">保养提醒</span>'
            }
        },
        gotoYY() {
            let obj = {
                carNo : this.wbDetail.licensenum,
                teleptleNo : this.wbDetail.terminalnum,
                engineNo : this.wbDetail.engineNo,
                happentime : this.wbDetail.occurtime,
                maintenanceno : this.wbDetail.remindcode,
                faultcode: this.wbDetail.opportunitycode
            }
            this.$store.dispatch('jyy/setWbOrderData',obj)
            this.CHOOSE_ADDRESS(null)
            this.$router.push({name:"wbxfWorkOrder",query:{pageUrl: 2}})
        },
        gotoDetail() {
            this.$router.push({name:"wbxfWorkOrderDetail",query:{"maintenanceno":this.wbDetail.reservationno}})
        },
        goback() {
            this.$router.back()
        }
    }
}
</script>
<style>
    #wbtxdetail .bottom-left-item {
        width: 50%;
        float: left;
        line-height: 2rem;
        text-align: center;
        color: white;
        background: lightseagreen;
    }
    #wbtxdetail .bottom-right-item {
        width: 50%;
        float: left;
        line-height: 2rem;
        text-align: center;
        color: white;
        background: #b50101;
    }
    #wbtxdetail .wbtxdetail-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        background: #ffffff;
    }
    #wbtxdetail .detail-title {
        color: #333333;
        font-size: 0.7rem;
    }
    #wbtxdetail .detail-d {
        color: #666666;
        font-size: 0.7rem;
    }
    #wbtxdetail .wbtxdetail-reason {
        background: #ffffff;
        padding: 0.5rem;
    }
    #wbtxdetail .hitch-detail-number {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        width:1.5rem;
        height: 2rem;
        background: #0f8de0;
        line-height: 2rem;
        text-align: center;
        color: #ffffff;
    }
    #wbtxdetail .detail-long-dir {
        flex: 1;
        line-height: initial;

    }

    #wbtxdetail .detail-long {
        display: flex
    }
    #wbtxdetail .hitch-detail {
        position: relative;
        background: #ffffff;
        padding: 0.5rem 0.5rem 0.5rem 2rem;
        border-bottom: 1px solid #ededed;
    }
    #wbtxdetail .wb-detail {
        background: #ffffff;
    }
    #wbtxdetail .wbtx-bottom {
        height: 2rem;
        line-height: 2rem;
        padding: 0 0.5rem;
        text-align: right;
    }
    #wbtxdetail .wbtx-bottom .wbtx-bottom-item:last-child {
        margin-right: 0;
    }
    #wbtxdetail .wbtx-bottom .wbtx-bottom-item {
        
        height: 1rem;
        margin-right: 0.5rem;
        padding: 0.35rem 0.5rem;
        border: 1px solid #dddddd;
        border-radius: 0.2rem;
        
    }
    #wbtxdetail .wbtx-spn {
        margin-right: 1.4rem;
    }
    #wbtxdetail .wbtx-plate-number {
        color: #333333;
        font-size: 0.8rem;
    }
    #wbtxdetail .wbtx-type {
        /* background: orange; */
        color: white;
        /* padding: 0 0.2rem; */
    }
    #wbtxdetail .wbtx-msg p {
        color: #666666;
    }
    #wbtxdetail .wbtx-msg {
        float: left;
    }
    #wbtxdetail .wbtx-img {
        float: left;
        width: 3.8rem;
        height: 3.8rem;
        margin-top: 0.3rem;
        margin-right: 0.5rem;
    }
    #wbtxdetail .wbtx-item-mid {
        padding: 0.5rem;
        overflow: hidden;
        border-bottom: 1px solid #ededed;
        box-sizing: border-box;
    }
    #wbtxdetail .wbtx-status {
        color: red;
        float: right;
    }
    #wbtxdetail .wbtx-item-top {
        height: 2rem;
        line-height: 2rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ededed;
        padding: 0 0.5rem;
    }
    #wbtxdetail .wbtxdetail-content {
        padding-top: 2.75rem;
        padding-bottom: 2rem;
    }
    #wbtxdetail .wbtx-content .wbtx-item {
        background: #ffffff;
        margin-bottom: 0.5rem;
        border-bottom: 1px solid #ededed;
        border-top: 1px solid #ededed;
    }
    #wbtxdetail {
        min-height: 100%;
        background: #ededed;
    }
</style>
