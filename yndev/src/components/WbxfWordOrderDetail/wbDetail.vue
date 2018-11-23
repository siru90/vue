<template>
    <div id="wbDetail">
        <header style="display:block;" class="aui-bar aui-bar-nav aui-bar-light">
            <!-- <router-link :to="{path:'/main/install', query:{serviceNo:serviceParam}}"> -->
                <div class="go-back" @click="goBack">
                <i></i>
                <i></i>
                <i></i>
                </div>
            <!-- </router-link> -->
            <div class="aui-title">工单详情</div>
        </header>
        <div v-if="spFxMaintenance.usestatus == 15" class="hadFinshed">
            <p>该工单已终止</p>
            <p>已拒绝该维保方案报价</p>
            <i class="njfont nj-bianji"></i>
        </div>
        <wbrate v-else :servicemethod="spFxMaintenance.servicemethod" style="position:fixed; top:2.75rem;z-index:999" :currentRate="spFxMaintenance.usestatus"></wbrate>
        <div style="padding-top:7.35rem;">
            <ul style="margin-bottom:0.5rem;" class="aui-list aui-form-list top_ul top_ul_wbd">
                <li class="aui-list-header">工单信息</li>  
                <li v-if="spFxMaintenance.reservationno" class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">预约单号</div>
                        <div style="text-align:left" class="aui-list-item-input wbxfod-item">
                           <span>{{spFxMaintenance.reservationno}}</span> 
                           <span style="cursor: pointer" onclick="" id="copyRe" class="copy-btn">复制</span>
                        </div>
                    </div>
                </li>
                <li v-if="spFxMaintenance.maintenanceno" class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">维保单号</div>
                        <div style="text-align:left" class="aui-list-item-input wbxfod-item">
                            <span>{{spFxMaintenance.maintenanceno}}</span>
                            
                            <span style="cursor: pointer" onclick="" id="copyMain" class="copy-btn">复制</span>
                        </div>
                    </div>
                </li>
            </ul>
            <tab v-if="currentTabConfig.length > 1" @tabsChange="tabsChange" :defaultIndex="tabNum" style="background:#ffffff;height:2rem;margin-bottom:0.2rem;" :titleInfor="currentTabConfig"></tab>
            <div>

            </div>
            <orderMsg v-if="tabNum === 0" :orderDetail="spFxMaintenance"></orderMsg>
            <quotedPrice :orderDetail="orderDetail" v-if="(servicemethod === 0 &&tabNum === 1)||(servicemethod === 1 &&tabNum === 2)"></quotedPrice>
            <wbom :orderDetail="orderDetail" v-if="(servicemethod ===0 && tabNum === 2) || (servicemethod === 1 &&tabNum === 1)"></wbom>
            <acceptance :orderDetail="orderDetail" v-if="tabNum === 3"></acceptance>
        </div>
    </div>    
</template>
<script>
import wbrate from './children/WbRate'
import orderMsg from './children/OrderMsg'
import quotedPrice from './children/QuotedPrice'
import acceptance from './children/Acceptance'
import wbom from './children/WbOrderMsg'
import tab from '../../components/TabsBar/tabs2'
import Clipboard from 'clipboard';
import { Toast } from '../../utils/toast2';
export default {
    computed: {
        spFxMaintenance() {
            if (this.orderDetail.spFxMaintenance) {
                return this.orderDetail.spFxMaintenance
            }
            return {}
        },
        servicemethod() {
            return this.spFxMaintenance.servicemethod
        },
        // 当前显示的tab显示控制
        currentTabConfig() {
            const usestatus = this.spFxMaintenance.usestatus
            const servicemethod = this.spFxMaintenance.servicemethod
            if (servicemethod == 1) {
                let arr = []
                // 进站
                if ( usestatus <=1 ) {
                    return this.tabConfig.slice(0,1)
                } else if (usestatus <=3) {
                    arr[0] = this.tabConfig[0]
                    arr[1] = this.tabConfig[2]
                    return arr
                } else if (usestatus <= 8 ) {
                    arr[0] = this.tabConfig[0]
                    arr[1] = this.tabConfig[2]
                    arr[2] = this.tabConfig[1]
                    return arr
                } else {
                    arr[0] = this.tabConfig[0]
                    arr[1] = this.tabConfig[2]
                    arr[2] = this.tabConfig[1]
                    arr[3] = this.tabConfig[3]
                    return arr
                }  
            } else {
                // 上门
                if ( usestatus == 0) {
                    return this.tabConfig.slice(0,1)
                } else if (usestatus <=2) {
                    return this.tabConfig.slice(0,2)
                } else if (usestatus <= 8 ) {
                    return this.tabConfig.slice(0,3)
                } else {
                    return this.tabConfig
                }  
            }
          
        }
    },
    data() {
        return {
            tabNum:0,
            // 所有的tab
            tabConfig: [
                {
                    goodsClassName: "预约单"
                }, {
                    goodsClassName: "维保报价"
                }, {
                    goodsClassName: "维保工单"
                }, {
                    goodsClassName: "质检验收"
                }
            ],
        }
    },
    components: {
        wbrate,
        orderMsg,
        tab,
        quotedPrice,
        wbom,
        acceptance
    },
    props: {
        orderDetail: {
            type: Object
        },
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        tabsChange(index) {
            this.tabNum = index
        },
        setCopy() {
            const maintenanceno = this.spFxMaintenance.maintenanceno
            const reservationno = this.spFxMaintenance.reservationno
            
            const clma = new Clipboard('#copyMain',{
                text: function() {
                    return maintenanceno
                }
            })
            const clre = new Clipboard('#copyRe', {
                text: function() {
                    return reservationno
                }
            })
            clma.on('success',function(e) {
                Toast({
                    duration: 1000,
                    message: "复制成功",
                    iconClass: "aui-iconfont aui-icon-correct"
                });
            })
            clma.on('error',function(e) {
                console.log(e)
            })
            clre.on('success',function(e) {
                Toast({
                    duration: 1000,
                    message: "复制成功",
                    iconClass: "aui-iconfont aui-icon-correct"
                });
            })
            
        }
    },
    mounted() {
        this.setCopy()
    },
    watch: {
        spFxMaintenance(v) {
            if (v.maintenanceno || v.reservationno) {
                this.setCopy()
            }
        }
    }

}
</script>
<style>
    .hadFinshed {
        width: 100%;
        position: fixed;
        top: 2.75rem;
        z-index: 999;
        height: 4.6rem;
        background: #0f8de0;
        padding: 0 0.5rem;
        overflow-x: auto;
        overflow-y: hidden;
        padding-top: 0.3rem;
        padding-left: 1rem;
        padding-top: 1rem;
    }
    .hadFinshed p {
        color: rgba(255, 255, 255, 0.9)
    }
    .hadFinshed p:first-child {
        font-size: 1rem;
    }
    .hadFinshed p:last-child {
        font-size: 0.7rem;
    }
    .hadFinshed .nj-bianji {
        position: absolute;
        font-size: 2.4rem;
        color: rgba(255, 255, 255, 0.9);
        right: 15%;
        top:1rem;
    }
    .wbRate {
        /* width: 100%;
        overflow-y: hidden;
        overflow-x: auto; */
    }
    #wbDetail {
        overflow: hidden;
    }
    #wbDetail .aui-list .aui-list-item-input {
        height: 1.2rem;
        line-height: 1.3rem;
    }
    #wbDetail .copy-btn {
        float:right;
        background-color: #fff;
        border: 1px solid #bbb7b7;
        color: #5a5a5a;
        padding: 0px 8px;
        font-size: 0.6rem;
        border-radius: 4px;
    }
</style>
