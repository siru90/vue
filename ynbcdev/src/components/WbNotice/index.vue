<template>
    <div id="wbtx">
        <header class="aui-bar aui-bar-nav aui-bar-light">
            <div style="height:2.75rem;position:relative">
                <router-link to="/main/profile">
                <div class="go-back">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                </router-link>
                <div class="aui-title">
                维保提醒
                </div>
            </div>
            <repair-head @tabsChange="tabsChange" v-if="tapHead" :titleInfor=" tapHead" >
            </repair-head>
        </header>
        <div class="wbtx-content">
            <ul v-if="listData.length > 0">
                <li v-for="(item, index) in listData" :key="index" class="wbtx-item">
                    <div class="wbtx-item-top">
                        <span class="wbtx-code">提醒编号：{{item.opportunitycode}}</span>
                        <span class="wbtx-status">{{getStatus(item.reservationno)}}</span>
                    </div>
                    <div @click="gotoNoticeDetail(item.opportunitycode,item.viplag)" class="wbtx-item-mid">
                        <div class="wbtx-img">
                            <img :src="item.remindtype == 1? 'static/image/baoyang.png':'static/image/weixiu.png'" alt="" srcset="">
                        </div>
                        <div class="wbtx-msg">
                            <p>
                                <span class="wbtx-type" v-html="getWbType(item.remindtype)"></span>
                                <span class="wbtx-plate-number">{{item.licensenum}}</span>
                            </p>
                            <p>
                                终端号：{{item.terminalnum}}
                            </p>
                            <p>
                                <span class="wbtx-spn">SPN码：{{item.spn}}</span>
                                <span>FMI码：{{item.fmi}}</span>
                            </p>
                            <p>发生时间：{{item.occurtime}}</p>
                        </div>
                        
                    </div>
                    <div class="wbtx-bottom">
                        <span @click="gotoHome" class="wbtx-bottom-item">购买配件</span>
                        <span @click="gotoAddWbOrder(item)" style="color:#0f8de0;border-color:#0f8de0" v-if="!item.reservationno" class="wbtx-bottom-item">预约维保</span>
                        <span @click="gotoDetail(item.opportunitycode)" class="wbtx-bottom-item" v-else>预约详情</span>
                    </div>
                </li>        
            </ul>
            <div style="text-align:center" v-else>
                <img style="width: 60vw; margin: 0 auto;max-width: 10rem;" src="static/image/no_news.png" alt="" srcset="">
                <p>暂时没有提醒</p>
            </div>
        </div>
    </div>    
</template>
<script>
import RepairHead from '../TabsBar/tabs'
import { updateOpportunityStatus } from './http'
export default {
    components: {
        RepairHead
    },
    data() {
        return {
            tapHead: [
                {goodsClassName: "全部", code: 0}, 
                {goodsClassName: "待预约", code: 1}, 
                {goodsClassName: "已预约",code: 2}, 
            ],
            testData: [{
                remindcode: "testremindcode123abc",
                remindtype: 1,
                reservationno: 1,
                licensenum: '湘N928193',
                terminalnum: 'zd123adb',
                spn: 223,
                fmi: 322,
                occurtime: '2018-05-29 08:25:56'
            }]
        }
    },
    methods: {
        gotoNoticeDetail(code,viplag) {
            if (viplag == 0) {
                updateOpportunityStatus(code)
                .then(res=>{
                    if (res.data.returncode == 0) {
                        console.log("更新维保提醒状态失败")
                        return
                    }
                    console.log("更新维保提醒状态成功")
                })
                .catch(e => {
                    console.log("更新维保提醒状态失败")
                    console.log(e)
                })
            }
            this.$router.push({name:"wbNoticeDetail",query:{"remindcode":code}})
        },
        gotoHome() {
            this.$router.push({path: '/main/home'})
        },
        gotoDetail(code) {
            this.$router.push({name:"wbxfWorkOrderDetail",query:{"maintenanceno":code}})
        },
        tabsChange(i) {
            this.$emit("tabChange",i)
        },
        getStatus(code) {
            switch (code) {
                case 1:
                    return "待预约"
                    break;
                case 2:
                    return "已预约"
                    break;
                default:
                    break;
            }
        },
        getWbType(code){
            if (code == 0) {
                return '<span style="background:#008000d1; padding:0.1rem 0.2rem;">维修提醒</span>'
            } else {
                return '<span style="background:orange; padding:0.1rem 0.2rem;">维保提醒</span>'
            }
        },
        gotoAddWbOrder(item) {
            let obj = {
                carNo : item.licensenum,
                teleptleNo : item.terminalnum,
                engineNo : item.engineNo,
                happentime : item.occurtime,
                maintenanceno : item.remindcode,
                faultcode:item.opportunitycode
            }
            this.$store.dispatch('jyy/setWbOrderData',obj)
            this.$router.push({name:'wbxfWorkOrder'})
        }
    },
    props: {
        listData:{
            type:Array,
            default: function() {
                return []
            }
        }
    }
    
}
</script>
<style>
    #wbtx .wbtx-bottom {
        height: 2rem;
        line-height: 2rem;
        padding: 0 0.5rem;
        text-align: right;
    }
    #wbtx .wbtx-bottom .wbtx-bottom-item:last-child {
        margin-right: 0;
    }
    #wbtx .wbtx-bottom .wbtx-bottom-item {
        
        height: 1rem;
        margin-right: 0.5rem;
        padding: 0.25rem 0.45rem;
        border: 1px solid #dddddd;
        border-radius: 0.2rem;
        
    }
    #wbtx .wbtx-spn {
        margin-right: 1.4rem;
    }
    #wbtx .wbtx-plate-number {
        color: #333333;
        font-size: 0.8rem;
    }
    #wbtx .wbtx-type {
        color: white;
        font-size: 12px;
        display: inline-block;
        
        border-radius: 2px;
        margin-right:0.5rem;
    }
    #wbtx .wbtx-msg p {
        color: #666666;
    }
    #wbtx .wbtx-msg p:nth-child(1) {
        height: 1.2rem;
        line-height: 1.2rem;
    }
    #wbtx .wbtx-msg {
        float: left;
    }
    #wbtx .wbtx-img {
        float: left;
        width: 3.8rem;
        height: 3.8rem;
        margin-top: 0.3rem;
        margin-right: 0.5rem;
    }
    #wbtx .wbtx-item-mid {
        padding: 0.5rem;
        overflow: hidden;
        border-bottom: 1px solid #ededed;
        box-sizing: border-box;
    }
    #wbtx .wbtx-status {
        color: red;
        float: right;
    }
    #wbtx .wbtx-item-top {
        height: 2rem;
        line-height: 2rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ededed;
        padding: 0 0.5rem;
    }
    #wbtx .wbtx-content {
        padding-top: 5.15rem;
    }
    #wbtx .wbtx-content .wbtx-item {
        background: #ffffff;
        margin-bottom: 0.5rem;
        border-bottom: 1px solid #ededed;
        border-top: 1px solid #ededed;
    }
    #wbtx {
        min-height: 100%;
        background: #ededed;
    }
</style>
