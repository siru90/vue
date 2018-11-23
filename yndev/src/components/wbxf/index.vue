<template>
    <div :style="dataList.length == 0 ? {background:'white'} : {}" id="wbxf">
        <!-- 头部 start -->
        <header class="aui-bar aui-bar-nav aui-bar-light">
            <div style="height:2.75rem;position:relative">
                <div @click="goback">
                    <div class="go-back">
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </div>
                <div class="aui-title">
                维保先锋
                </div>
                <!-- <div style="top: 40%; transform:translate(0,-50%)" class="right_icon" @click="showSearch = !showSearch;">
                    <a id="order-search" class="search_icon"><i class="icon njfont nj-sousuo"></i></a>
                </div> -->
            </div>
            <repair-head @tabsChange="tabsChange" v-if="tapHead" :titleInfor=" tapHead" >
            </repair-head>
            <!-- <seach-bar @searchOrder="doSearchOrder" v-if="showSearch"></seach-bar> -->
        </header>
        <div ref="wbxf" class="wbxf-content">
            <ul v-if="dataList.length > 0">
                <li v-for="(item, index) in dataList" :key="index" class="wb-item">
                    <div class="wb-item-top"> 
                        <span>工单编号：</span>
                        <span>{{item.reservationno || item.maintenanceno}}</span>
                        <span>{{formMaintenancestatus(item)}}</span>
                    </div>
                    <div @click="gotoOrderDetail(item)" class="wb-item-mid">
                         <div class="wborder-img">
                             <!-- <img :src="item.maintenancetype == 1? 'static/image/baoyang.png':'static/image/weixiu.png'" alt=""> -->
                            <!-- <img :src="serverType(item.maintenancetype) == 'wb'? 'static/image/baoyang.png':'static/image/weixiu.png'" alt=""> -->
                            <img :src="getPic(item.maintenancetype,item.billtype)" alt="">
                            <!-- serverType -->
                         </div>
                         <div class="wborder-msg">
                             <p>预约服务时间：{{item.orderdate}}</p>
                             <p>服务商：{{item.servicename}}</p>
                         </div>
                    </div>
                    <div class="wb-item-bottom">
                        <span @click="gotoOrderDetail(item)">工单详情</span>
                        <span v-if="showBtn('cancle',item)" @click="cancleOrder(item)">取消预约</span>
                        <span v-if="showBtn('primary',item)" @click="showAlert(item,'primary')">确认初步方案</span>
                        <span v-if="showBtn('formal',item)" @click="showAlert(item, 'formal')">确认正式方案</span>
                        <span v-if="showBtn('superaddition',item)" @click="showAlert(item, 'superaddition')">确认追加方案</span>
                        <span v-if="showBtn('pay',item)" @click="showAlert(item,'pay')">确认完成并付款</span>
                        <span v-if="showBtn('comment',item)" @click="makeAssess(item)">立即评价</span>
                        <span v-if="showBtn('order',item)" @click="orderNow(item)">立即预约</span>
                        <span v-if="showBtn('refuse',item)" @click="showRefuse(item)">查看拒绝详情</span>
                        <span v-if="showBtn('repair',item)" @click="gotoRepair(item)">返修</span>
                        <span v-if="showBtn('confirmRepair',item)" @click="confirmRepair(item)">确认完成</span>
                        <span v-if="showBtn('makeBill',item)" @click="makeBill(item)">开票申请</span>
                    </div>
                </li>
            </ul>
            <div style="text-align:center;padding:1rem;" v-else>
                <img class="nodataimg" src="static/image/no_order.png" alt="" srcset="">
                <p>暂无数据</p>
            </div>
        </div>
        <div class="wbxf-bottom">
            <div @click="gotoAddOrder" class="wbxf-bottom-btn">
                新增预约
            </div>
        </div>
            <!--服务选择-->
        <div class="aui-mask aui-mask-in" v-if="rate"></div>
            <div id="purchase_service" class="purchase_service" :style="rate ? 'display:block' : 'display:none'">
            <div class="description_tit">
                服务评价
                <a class="spec_close" @click="rate = false;"></a>
            </div>
            <div class="spec_middle">
                <div class="star_rating">
                <Rate allow-half v-model="valueHalf" class="rate"></Rate>
                <div class="evaluation_result">
                    <label class="aui-text-success">{{valueHalf}}&nbsp;{{valueHalfWord}}</label>
                </div>
                <div class="standard_con">
                    <li @click="appraisement = 0 " :class="{active: appraisement == 0}"><span>服务周到</span><i
                    class="icon njfont nj-xuanzhong"></i></li>
                    <li @click="appraisement = 1 " :class="{active: appraisement == 1}"><span>服务准时</span><i
                    class="icon njfont nj-xuanzhong"></i></li>
                    <li @click="appraisement = 2 " :class="{active: appraisement == 2}"><span>安装技师技术很棒</span><i
                    class="icon njfont nj-xuanzhong"></i></li>
                    <li @click="appraisement = 3 " :class="{active: appraisement == 3}"><span>不太满意</span><i
                    class="icon njfont nj-xuanzhong"></i></li>
                </div>
                </div>
                <div class="settle_accounts lijixiadan">
                <div id="confirm" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click="sendRatesendRate">确定</div>
                </div>
            </div>
        </div>
        <mt-popup
            id="mt"
            v-model="popupVisible"
            popup-transition="popup-fade"
            position="middle">
            <h3>拒绝详情</h3>
            <div id="mt_div">
                <!-- <p>服务商：{{refuseService}}</p> -->
                <p>拒单时间：{{refuseTime}}</p>
                <p class="refuseInfo">拒单原因：{{refuseInfo}}</p>
            </div>
            <mt-button type="primary" id="mt_btn" @click=" popupVisible = !popupVisible">关闭</mt-button>
        </mt-popup>
        <transition name="wbAd">
            <div v-if="showWbAd"  class="wbAdZZ">
                <div class="wbAd">
                    <div class="wbAdContent">
                        <img @click="gotoWbAdUrl(wbAdData)" :src="wbAdData ? wbAdData.advertisementPicturesUrl : ''" alt="">
                        <div @click="closeAd" class="wbAdClose">
                            <i style="color:rgba(255,255,255,0.8)" class="njfont nj-shibai"></i>
                        </div>
                    </div>
                </div>
            </div>
            
        </transition>
        
    </div>
</template>
<script>
// 用于维保先锋类似的页面
import axios from 'axios'
import RepairHead from '../TabsBar/tabs'
import Search from './search'
import { searchPlanDetail,yesornoPlan,cancelPlan,makeComments,confirmRepairOrder,zeroYuanPay  } from './http'
import {showLoading, hideLoading} from "../../utils/loading";
import { getOrderDetail } from '../WbxfWordOrderDetail/http'
import { addOrder } from '../WbxfWordOrder/http'
import { messageBox,Popup,Button } from "mint-ui"
import {Toast} from "../../utils/toast2.js";
import Rate from 'iview/src/components/rate';
import ButtonTop from "../../components/ButtonToTop"
import { mapGetters,mapMutations } from 'vuex'
import 'iview/dist/styles/iview.css';
import 'mint-ui/lib/style.css'
import { notifyPayPayStar } from '../../containers/Pay/http';

export default {
    components: {
        RepairHead,
        SeachBar: Search,
        Rate,
        "mt-popup": Popup,
        "mt-button": Button,
        ButtonTop
    },
    props: {
        dataList: {
            type:Array,
            default:function() {
                return []
            }
        }
    },
    data() {
        return {
            showWbAd: false,
            sfF:0,
            penddingStatus: false,
            popupVisible: false,
            refuseService: '',
            refuseTime: '',
            refuseInfo: '',
            tapHead: [
                {goodsClassName: "全部", code: 0}, 
                {goodsClassName: "待预约", code: 1}, 
                {goodsClassName: "待受理",code: 2}, 
                {goodsClassName: "待服务", code: 3}, 
                {goodsClassName: "待确认", code: 4}
                ],
            testWord: '这是data测试',
            showSearch: false, //控制搜索框开关
            comments: "",
            rate: false,
            appraisement: null,
            valueHalf: 5,
            commentCofig: {},
            comments: '',
            valueHalfWord: '很满意',
        }
    },
    watch: {
        dataList(v) {
            if (v.length > 0) {
                setTimeout(() => {
                    if (!isNaN(Number(this.scrollTop))) {
                        $('#wbxf').animate({
                            scrollTop: this.scrollTop
                        },300)
                        //document.querySelector("#wbxf").scrollTop = this.scrollTop;
                    }
                }, 16);
            }
        },
        penddingStatus(v) {
            // 限制点击频率，防止多次弹窗
            setTimeout(() => {
                this.penddingStatus = false
            }, 1000);
        },
        appraisement(val, old){
            switch (val) {
            case 0:
                this.comments = "服务周到";
                break;
            case 1:
                this.comments = "服务准时";
                break;
            case 2:
                this.comments = "安装技师技术很棒";
                break;
            case 3:
                this.comments = "不太满意";
                break;
            }
        },
        valueHalf(v) {
            if (v >= 0 && v <=2) {
                this.valueHalfWord = "不满意"
            } else if (v > 2 && v <= 4) {
                this.valueHalfWord = "满意"
            } else {
                this.valueHalfWord = "很满意"
            }
        },
        rate(v) {
            if (!v){
                this.valueHalf = 5
                this.valueHalfWord = "很满意"
            }
        },
        wbAdData(v) {
            if (v) {
                this.showAd()
            }
        }
    },
    computed: {
        ...mapGetters('xhModules', [
            'userInfo',
        ]),
        scrollTop() {
            return this.$store.state.jyy.wbxfListScrollTop
        },
        wbAdData() {
            return this.$store.state.jyy.wbAdData
        }
    },
    methods: {
        gotoWbAdUrl(adData) {
            this.showWbAd = false
            if (adData.advertisementContext) {
                window.location.href = adData.advertisementContext
            }
            
        },
        closeAd() {
            this.showWbAd = false
        },
        showAd() {
            if (!this.wbAdData) {                
                return false
            }
            // const lastTime = Number(window.localStorage.getItem("wbAdTime"));
            // const LastDate = new Date(lastTime);
            // const currentDate = new Date()
            // if(lastTime>0){
            //     if(currentDate.getTime()>lastTime ){
            //         if(currentDate.getDate()!=LastDate.getDate()){
            //             this.showWbAd = true;
            //         }else{
            //             window.localStorage.setItem("wbAdTime",currentDate.getTime());
            //             this.showWbAd = false;
            //         }
            //     }
            // }else{
            //     window.localStorage.setItem("wbAdTime",currentDate.getTime());
            //     this.showWbAd = true;
            // }
            const lastTime = Number(window.localStorage.getItem("wbAdTime"));
            const currentTime = new Date()
            const currentDay = currentTime.getDate()
            const LastDay = new Date(lastTime).getDate()
            
            if (currentTime.getTime() - lastTime >= 86400000) {
                this.showWbAd = true
                window.localStorage.setItem("wbAdTime",currentTime.getTime())
                return
            }
            if (currentDay > LastDay) {
                this.showWbAd = true
                window.localStorage.setItem("wbAdTime",currentTime.getTime())
                return
            }
            if (currentDay == LastDay) {
                return
            }
            if ((LastDay == 31 || LastDay == 30 || LastDay == 28 || LastDay == 29) && currentDay >= 1) {
                this.showWbAd = true
                window.localStorage.setItem("wbAdTime",currentTime.getTime())
            }
        },
        getPic(maintenancetype, billtype) {
            if (billtype == 5) {
                return "static/image/zuhe.png"
            } else if (this.serverType(maintenancetype) == 'wb') {
                return "static/image/baoyang.png"
            } else {
                return "static/image/weixiu.png"
            }
        },
        getSmF(data) {
            for (const item of data) {
                if (item.otherfeetype === 0) {
                    return item.realpaymoney
                }
            }
            return 0
        },
        serverType(key) {
            if (key == 1 || key == 2 || key ==3 || key == 4 ) {
                return "wb"
            } else {
                return "wx"
            }
        },
        confirmRepair(item) {
            confirmRepairOrder(item.maintenanceno)
            .then(res => {
                if (res.data.returnCode == 0) {
                    Toast({
                        message: '确认订单失败！',
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 500
                    })
                    return
                }
                Toast({
                    message: "确认订单成功！",
                    iconClass: "aui-iconfont aui-icon-correct",
                    duration: 500
                });
                this.refreshData()
            })
            .catch(e => {
                Toast({
                    message: '确认订单失败！',
                    iconClass: "aui-iconfont aui-icon-close",
                    duration: 500
                })
            })  
        },
        gotoRepair(item) {
            console.log(item)
            item.reservationno = null
            this.$store.dispatch('zwy/saveSureServiceDate',{
                serviceid: item.serviceid,
                name: item.servicename
            })
            this.$store.dispatch("jyy/setWbOrderData", item)
            this.$router.push({name: "wbxfWorkOrder", query: {repair: 1}})
        },
        goback() {
            this.$store.dispatch("jyy/setWbxfLsitScrollTop",0)
            this.$router.replace("/main/profile")
        },
        // 查看拒绝详情
        showRefuse(item) {
            this.popupVisible = !this.popupVisible
            this.refuseService = item.servicename
            this.refuseTime = item.sprefusetime
            this.refuseInfo = item.sprefusereason
        },
        // 去付款
        payOrder(item) {
            // alert("去付款")
        },
        // 立即预约
        async orderNow(item) {
            try {
                let res = await getOrderDetail(item.reservationno)
                let data = res.data.data[0].info[0]
                // const orderData = {
                //     enterpriseid: window.api.enterpriseid,
                //     serviceid: data.serviceid,
                //     servicename: data.servicename,
                //     carno: data.carno,
                //     engineno: data.engineno,
                //     terminalnum: data.terminalnum,
                //     faultcode: data.faultcode,
                //     faultdesc: data.faultdesc,
                //     maintenancetype: data.maintenancetype,
                //     maintenanceservicetype: data.maintenanceservicetype,
                //     maintenanceaddress: data.maintenanceaddress,

                // }
                // let r = await addOrder(data)
                this.$store.dispatch('zwy/saveSubscribeDate', null)
                this.$store.dispatch('jyy/setWbOrderData',data)
                this.$router.push({"name":"wbxfWorkOrder"})
                
            } catch (error) {
                
            }
            
        },
        // 开发票
        makeBill(item) {
            this.$router.push({name:'BillDetail',query:{datas:item.maintenanceno,parentOrderNo:item.maintenanceno}})	
        },
        // 评论接口
        async sendRatesendRate() {

            
            this.commentCofig.score = this.valueHalf         // 评分
            this.commentCofig.comments = this.comments      // 评价内容
            // const commentData = {
            //     maintenanceid: this.commentCofig.worksNo,
            //     appraise: this.commentCofig.score,
            //     sppraisement: this.commentCofig.sppraisement
            // }
            // console.log(this.commentCofig)
            let res = await makeComments(this.commentCofig);
            this.rate = false
            if (res.returncode == 0) {
                Toast({
                    message: res.errmsg,
                    iconClass: "aui-iconfont aui-icon-close",
                    duration: 500
                });

                return;
            } else {
                Toast({
                    message: "评价成功",
                    iconClass: "aui-iconfont aui-icon-correct",
                    duration: 500
                });
               this.refreshData()
            }
            


        },
        // 立即评价
        makeAssess(item) {
            this.rate = true
            this.commentCofig = {
                "servicerId": item.serviceid,
                "memberName": item.vipname,
                "memberPhone": item.telephone || item.telepone,
                "memberId":this.userInfo.vipid,
                "serviceType":"维保先锋",
                "servicerName":item.servicename,
                "worksNo":item.maintenanceno,
                "worksType":3
            }
        },
        doSearchOrder(query) {
            console.log(query)
        },
        showBtn(type,item) {
            const orderType = item.maintenanceservicetype
            const status = item.maintenancestatuscode
            const mainStatus = item.maintenancestatus
            switch (type) {
                // 返修单确认完成按钮 (确认完成并付款时如果有reworkproperty字段则显示)
                case "confirmRepair":
                    if (item.reworkproperty !== null && (status == 10 || status == 11)) {
                        return true
                    }
                    return false
                    break;
                // 返修单按钮
                case "repair":
                    if (status >=12 && status <15) {
                        return true
                    }
                    return false
                    break;
                case "cancle":
                    // 待受理状态下显示取消按钮  待服务状态下（非初步，正式，没有执行过拒绝同意，）待预约状态下
                    // if (mainStatus == 21) {
                    //     return false
                    // }
                    if (item.billtype == 5) {
                        return false
                    }
                    if (mainStatus == 34) {
                        return false
                    }
                    if (mainStatus == 0) {
                        return true
                    }
                    if (mainStatus == 22) {
                        return true
                    }
                    if (mainStatus != 21 && !item.flag) {
                        return true
                    }
                    // if (status == 0 && orderType == 0) {
                    //     return true
                    // }
                    // if ( mainStatus == 23 || mainStatus == 33) {
                    //     // 若sprefusestatus不为null说明已经同意或拒绝过方案，这时不显示取消按钮
                    //     if (item.sprefusestatus === null) {
                    //         return false
                    //     }
                    //     return true
                    // } 
                    // if (item.flag) {

                    // }
                    return false
                    break;
                case "primary":
                    // 上门状态并且状态码为1显示初步方案按钮
                    if (orderType == 0 && status == 1 && item.quoteaccross==1) {
                        return true
                    }
                    return false
                    break;
                case "formal":
                    // 正式方案显示
                    if ((orderType == 0 && status == 6)||(orderType == 1 && status == 4) && item.quoteaccross==1) {
                        return true
                    } 
                     return false
                    break;
                case "superaddition":
                    // 追加方案显示
                    if ((orderType == 0 && status == 8)||(orderType == 1 && status == 8) && item.quoteaccross==1) {
                        return true
                    }
                    return false
                    break;
                case "pay":
                    // 付款按钮显示(不与确认完成按钮同时存在)
                    if (item.reworkproperty === null) {
                        if ((orderType == 0 && (status == 10 || status == 11))||(orderType == 1 && (status == 10 || status == 11))) {
                            return true
                        }
                    }
                    return false
                    break;
                case "comment":
                    // 评论按钮显示
                     if (orderType == 0 && status >=12 && status <= 14 && !item.appraise) {
                        //  上门单，状态码在12到14 且没有评论字段
                         return true
                     } else if (orderType == 1 && status >=12 && status <= 14 && !item.appraise) {
                         //  进站单，状态码在10到12 且没有评论字段
                         return true
                     }
                    return false
                    break;
                case "makeBill":
                    if (item.invoicestatus === 1 && status >=12 && status <= 14 && item.reworkproperty === null) {
                        return false
                    }
                    return false
                    break;
                case "checkBill":
                    break;
                case "order":
                    if (mainStatus == 21) {
                        return true
                    }
                    return false
                    break;
                case "refuse":
                    if (mainStatus == 21 && item.sprefusestatus ==2) {
                        return true
                    }
                    return false
                    break;
                default:
                    break;
            }
            return false
        },
        cancleOrder(item) {
            // 维保单号统一使用预约单号
            cancelPlan(item.reservationno)
            .then(res => {
                if (res.data.returncode == 0) {
                    Toast({
                        message: "取消预约失败!",
                        duration: 2000,
                        iconClass:"aui-iconfont aui-icon-close"
                    });
                    return 
                }
                Toast({
                    message: '取消预约成功',
                    iconClass:"aui-iconfont aui-icon-correct",
                    duration: 2000
                })
                this.refreshData();
            }).catch(e => {
                Toast({
                    message: '取消预约失败！',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                });
            })
            
        },
        retcordScrollTop() {
            const scrollTop = document.querySelector('#wbxf').scrollTop
            this.$store.dispatch("jyy/setWbxfLsitScrollTop",scrollTop)
        },
        ...mapMutations([
            'CHOOSE_ADDRESS',
        ]),
        gotoOrderDetail(item){
            this.retcordScrollTop()
            this.$router.push({name: 'wbxfWorkOrderDetail', query: {maintenanceno:item.reservationno,maintenanceid:item.maintenanceid,isWbOrder: item.flag ? 1:0}})
        },
        gotoAddOrder() {
            this.CHOOSE_ADDRESS(null);
            this.$store.dispatch('zwy/saveSubscribeDate', null)
            this.$router.push({
                name:"wbxfWorkOrder"
            })
        },
        formMaintenancetype(code) {
            if (code == 1) {
                return "保养服务"
            } else {
                return "维修服务"
            }
        },
        formMaintenancestatus(item) {
            const status = item.maintenancestatuscode
            const mainStatus = item.maintenancestatus
            // 维保单
    
            if (item.flag) {
                if (item.sprefusestatus  == "2") {
                    return "服务商已拒绝"
                }
                if (item.usestatus>=0 && item.usestatus<=9) {
                    return '待服务'
                } else if (item.usestatus >=10 && item.usestatus <=11) {
                    return "待确认"
                } else if (item.usestatus >= 12 && item.usestatus <=14) {
                    if (!item.appraise) {
                        return "待评价"
                    }
                    return '已完成'
                } else {
                    return "已终止"
                }
            } else {
                if (status >=12 && status <= 14 && !item.appraise) {
                    return "待评价"
                } else if (status >=12 && status <= 14 && item.appraise) {
                    return "已完成"
                } else if (status == 15) {
                    return "已终止"
                }
                switch (mainStatus) {
                    case "21":
                        if (item.sprefusestatus  == "2") {
                            return "服务商已拒绝"
                        }
                        return "待预约"
                        break;
                    case "22":
                        return "待受理"
                        break;
                    case "23":
                        return "待服务"
                        break;
                    case "33":
                        return "待服务"
                        break;
                    case "24":
                        return "待确认"
                    case "0":
                        return "待服务"
                    case "34":
                        return "待服务"
                    default:
                        break;
                }
            }  
        },
        // 拼接方案名
        getProjectName(list) {
            list = list ? list : []
            let restult = ''
            list.forEach(v => {
                restult += '<div>'+v.fxprojectname+'</div>'
                restult += `
                            <div style="font-size:12px">所需工时：${v.jobtimes || "0"}</div>
                            <div style="font-size:12px">工时单价：${v.mprice.toFixed(2) || "0"}</div>
                `
            })
            return restult
        },
        // 拼接配件名
        getPJList(list,list2,list3) {
            list = list ? list : []
            list2 = list2 ? list2 : []
            list3 = list3 ? list3 : []
            let result = ""
            list.forEach(v => {
                result += `
                    <div>${v.goodsname} * ${v.quantity}</div>
                `
            })
            list2.forEach(val => {
                result += `
                    <div>${val.otherfeename}</div>
                `
            })
            list3.forEach(value => {
                result += `
                    <div>${value.otherfeename}</div>
                `
            })
            return result
        },
        // 拼接维修费用
        getWBPriceList(list,list2,list3,list4,list5) {
            list = list ? list : []
            list2 = list2 ? list2 : []
            list3 = list3 ? list3 : []
            list4 = list4 ? list4 : []
            let result = ""
            let cnmmoney = 0
            let workTimePrice = 0
            list5.forEach(e => {
                workTimePrice += e.realpaymoney
            })
            result += `
                    <div>工时费：￥${workTimePrice.toFixed(2) || "0"}</div>
                `
            list.forEach(v => {
                cnmmoney+=v.realpaymoney
                result += `
                    <div>${v.goodsname}：￥${v.realpaymoney}</div>
                `
            })
            list2.forEach(val => {
                cnmmoney+=val.realpaymoney
                result += `
                    <div>${val.otherfeename}：￥${val.realpaymoney}</div>
                `
            })
            list3.forEach(value => {
                cnmmoney+=value.realpaymoney
                result += `
                    <div>${value.otherfeename}：￥${value.realpaymoney}</div>
                `
            })
            list4.forEach(e => {
                cnmmoney+=e.realpaymoney
            })
            
            
            
            // result += `
            //         <div>总费用：¥${cnmmoney}</div>
            //     `
            return result
        },
        // 服务非
        getFWF(list) {
            let result = 0;
            list.forEach(v => {
                result+=v.realpaymoney
            })
            return result.toFixed(2)
        },
        // 所有费用
        getAllCost(list) {
            let allCost = 0
            list.forEach(v => {
                allCost += v.realpaymoney
            })
            return allCost.toFixed(2)
        },
        async showAlert(item,type) {
            if (this.penddingStatus) {
                return
            }
            this.penddingStatus = true
            let flag = true
            let planDetail = {}
            let modalName = ""  //弹框名
            let planName = ""   //维修方案
            let partsList = []
            let priceList = []
            let allPrice = ""
            let priceDetailNode =""
            let projectData = ""
            try {
                const res = await searchPlanDetail(item.maintenanceid, item.maintenanceno)
                if (res.data.returncode == 0) {
                    Toast({
                        message: '获取方案失败！',
                        iconClass:"aui-iconfont aui-icon-close",
                        duration: 2000
                    });
                    flag = false
                    return
                }
                let data = res.data.data[0]
                projectData = data
                switch (type) {
                    case "primary":
                        modalName = "初步方案及报价确认"
                        planName = this.getProjectName(data.spFxMaintenanceAdvice)//方案名
                        partsList = this.getPJList(data.spSuProducegoodsDtlbs,[],data.otherexpensesTab)  //陪件
                        priceList = this.getWBPriceList(data.spSuProducegoodsDtlbs,[],data.otherexpensesTab,data.spFxMaintenanceAdvice,data.spFxMaintenanceAdvice)    //价格
                        this.smF = this.getSmF(data.otherexpensesTab)
                        allPrice = data.cost.toFixed(2)     //总费用
                        break;
                    case "formal":
                        modalName = "正式方案报价确认"
                        planName = this.getProjectName(data.spFxMaintenanceItems)//方案名
                        partsList = this.getPJList(data.refergoodslist, data.otherfees,[])  //陪件
                        priceList = this.getWBPriceList(data.refergoodslist, data.otherfees,[],data.spFxMaintenanceItems,data.spFxMaintenanceItems)  //价格
                        allPrice = data.cost.toFixed(2)
                        break;
                    case "superaddition":
                        modalName = "追加方案报价确认"
                        planName = this.getProjectName(data.spFxMaintenanceItems)//方案名
                        partsList = this.getPJList(data.refergoodslist, data.otherfees,[])  //陪件
                        priceList = this.getWBPriceList(data.refergoodslist, data.otherfees,[],data.spFxMaintenanceItems,data.spFxMaintenanceItems)  //价格
                        allPrice = data.cost.toFixed(2)
                        break;
                    case "pay":
                        modalName = "确认服务完成并付款"
                        planName = this.getProjectName(data.spFxMaintenanceItems)//方案名
                        partsList = this.getPJList(data.refergoodslist, data.otherfees,[])  //陪件
                        priceList = this.getWBPriceList(data.refergoodslist, data.otherfees,[],data.spFxMaintenanceItems,data.spFxMaintenanceItems)   //价格
                        allPrice = data.cost.toFixed(2)
                        break;
                    default:
                        break;
                }
                
            } catch (error) {
                console.log(error)
                Toast({
                    message: '获取方案失败！',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                });
                flag = false
            }
            if (!flag) {
                return
            }
            // 防止改版其他页面的messagebox
            document.querySelector('body').className = "wbxf-temp"
            // 待支付和已支付
            if (type !== "primary") {
                console.log(projectData)
                priceDetailNode = `
                        
                                <div style="margin-bottom:0; font-weight:bold; overflow:hidden" class="wbxf-modal-text">应支付：${projectData.realpayfee.toFixed(2)} <span style="color:red;font-weight:500;float:right;font-size:12px;">（扣除已支付和优惠金额）</span> </div>
                `
            }


            if (type === "pay") {
                console.log(projectData)
                messageBox({
                    title:modalName,
                    showCancelButton:true,
                    confirmButtonClass:"wbxf-modal-yes",
                    cancelButtonClass:"wbxf-modal-no",
                    cancelButtonText:"取消",
                    confirmButtonText:"确认并付款",
                    message: `
                            <div style="max-height:20rem;overflow:auto;text-align:left;line-height: initial;font-size:14px;">
                            <div class="wbxf-modal-label">维修方案</div>
                            <div class="wbxf-modal-text">${planName}</div>
                            <div class="wbxf-modal-label">所需配件</div>
                            <div class="wbxf-modal-text">${partsList}</div>
                            <div class="wbxf-modal-label">预计费用</div>
                            <div class="wbxf-modal-text">${priceList}</div>
                            <div style="margin-bottom:0" class="wbxf-modal-text" style="color:red">总费用：${allPrice}</div>
                            ${priceDetailNode}
                            </div>
                    `
                }).then(e => {
                    const money = projectData.realpayfee
                    const orderNo = item.maintenanceno
                    if (e === "confirm") {
                        // 0元支付
                        if (money == 0) {
                            showLoading()
                            zeroYuanPay(orderNo)
                            .then(res => {
                                hideLoading()
                                if (res.data.returncode != 1) {
                                    Toast({
                                        message: '支付失败！',
                                        iconClass:"aui-iconfont aui-icon-close",
                                        duration: 2000
                                    })
                                    return
                                }
                                Toast({
                                    message: '支付成功！',
                                    iconClass:"aui-iconfont aui-icon-correct",
                                    duration: 2000
                                });
                                this.refreshData()
                                
                            })
                            .catch(e => {
                                hideLoading()
                                Toast({
                                    message: '支付失败！',
                                    iconClass:"aui-iconfont aui-icon-close",
                                    duration: 2000
                                })
                            })
                            return
                        }
                        // 判断是哪种设备，跳转到不同类型的支付页面
                        var u = navigator.userAgent;
                        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                        if (isAndroid) {
                            // console.log("isAndroid", "是Android设备");
                            this.$store.dispatch('hzh/SaveBillBtn',"");
                            this.$router.push({"name":"androidPayWb", "params": {"money": money, orderNo}});
                        } else if (isIOS) {
                            // console.log("isIOS", this.payPrice, paramsMoney);
                            // console.log("要跳转IOS页面了");
                            // console.log(paramsMoney, orderNo);
							this.$store.dispatch('hzh/SaveBillBtn',"");
                            this.$router.push({"name":"iosPayWb", "params": {"money": money, orderNo}});
                            // console.log("跳转的下一条语句");
                            return;
                        }
                        //this.$router.push({name:"iosPayWb",params:{"money":money,orderNo}})
                    }
                })
                return
            }
            let messagestr = ""
            if (type == "primary") {
                messagestr = `
                        <div style="max-height:20rem;overflow:auto;text-align:left;line-height: initial;font-size:14px;">
                          <div class="wbxf-modal-label">维修方案</div>
                          <div class="wbxf-modal-text">${planName}</div>
                          <div class="wbxf-modal-label">所需配件</div>
                          <div class="wbxf-modal-text">${partsList}</div>
                          <div class="wbxf-modal-label">预计费用</div>
                          <div class="wbxf-modal-text">${priceList}</div>
                          ${priceDetailNode}
                          <div class="wbxf-modal-notice">提示：选择“拒绝”按钮，即视为不同意服务方案，服务商可重新报价或终止工单。</div>
                        </div>
                `
            } else {
                messagestr = `
                        <div style="max-height:20rem;overflow:auto;text-align:left;line-height: initial;font-size:14px;">
                          <div class="wbxf-modal-label">维修方案</div>
                          <div class="wbxf-modal-text">${planName}</div>
                          <div class="wbxf-modal-label">所需配件</div>
                          <div class="wbxf-modal-text">${partsList}</div>
                          <div class="wbxf-modal-label">预计费用</div>
                          <div class="wbxf-modal-text">${priceList}</div>
                          <div style="margin-bottom:0" class="wbxf-modal-text">总费用：${allPrice}</div>
                          ${priceDetailNode}
                          <div class="wbxf-modal-notice">提示：选择“拒绝”按钮，即视为不同意服务方案，服务商可重新报价或终止工单。</div>
                        </div>
                `
            }
            messageBox({
                title:modalName,
                showCancelButton:true,
                confirmButtonClass:"wbxf-modal-yes",
                cancelButtonClass:"wbxf-modal-no",
                cancelButtonText: type=="primary"?"拒绝并取消":"拒绝",
                confirmButtonText:type=="primary"?"同意并支付上门费":"同意",
                message: messagestr
            }).then(e => {
                this.checkPlan(e,item,type)
            })
            
            
        },
        checkPlan(e,item,type) {
            let flg = e == 'confirm' ? 1 : 0
            // 支付上门费
            if (type === "primary" && e === "confirm" && this.smF != 0) {
                const orderNo = item.maintenanceno + "_001"
                // 判断是哪种设备，跳转到不同类型的支付页面
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isAndroid) {
                    this.$store.dispatch('hzh/SaveBillBtn',"");
                    this.$router.push({"name":"androidPayWb", "params": {"money": this.smF, orderNo}});
                } else if (isIOS) {
                    this.$store.dispatch('hzh/SaveBillBtn',"");
                    this.$router.push({"name":"iosPayWb", "params": {"money": this.smF, orderNo}});
                }          
                return
            }
            yesornoPlan(item.maintenanceid, item.maintenanceno,flg)
            .then(res => {
                if (res.data.returncode == 0) {
                    Toast({
                        message: '操作失败！',
                        iconClass:"aui-iconfont aui-icon-close",
                        duration: 2000
                    });
                    return
                }
                if (flg == 1) {
                    Toast({
                        message: '同意方案成功！',
                        iconClass:"aui-iconfont aui-icon-correct",
                        duration: 2000
                    });
                } else {
                    Toast({
                        message: '已拒绝',
                        iconClass:"aui-iconfont aui-icon-correct",
                        duration: 2000
                    });
                }
                this.refreshData();
            }).catch(e => {
                Toast({
                    message: '操作失败！',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                });
            })
        },
        tabsChange(index) {
            this.$emit('tabsChange',index)
        },
        refreshData() {
            this.tabsChange(this.$route.query.act)
        },
        // 状态判断
        // judgeStatus(item) {
        //     /**
        //      * retrun
        //      * 1: 待预约        显示状态：待预约       显示按钮： 【工单详情，立即预约】
        //      * 2: 服务商已拒绝  显示状态：服务商已拒绝  显示按钮： 【工单详情，查看拒绝详情，立即预约】
        //      * 3: 待服务1      显示状态：待服务        显示按钮：【工单详情，取消预约】
        //      * 4：带服务2      显示状态：待服务        显示按钮： 【工单详情，确认初步方案】
        //      * 5：待服务3      显示状态：待服务        显示按钮： 【工单详情，确认正式方案】
        //      * 6：待服务4      显示状态：待服务        显示按钮：  【工单详情，确认追加方案】
        //      * 7：待服务5      显示状态：待服务        显示按钮：  【工单详情】
        //      * 8：待确认       显示状态：待确认        显示按钮： 【工单详情，确认完成并付款】
        //      * 9：待评价       显示状态： 待评价       显示按钮：【工单详情，开票申请，工立即评价】
        //      * 10：已完成      显示状态： 已完成       显示按钮：【工单详情，查看发票】
        //      * 11：已终止      显示状态：已经终止      显示按钮：【工单详情】
        //      * 
        //      */
        //     const statusCode     = item.maintenancestatuscode    //状态值 0-15
        //     const status         = item.maintenancestatus       // 大状态值 21待预约 22 待接单 23 待转维保单 33已转维保单
        //     const sprefusestatus = item.sprefusestatus          //拒绝状态 null 0 1
        //     const appraise       = item.appraise                //评价状态 为null 则为未评价
        //     if (status === "21") {
        //         return 1
        //     }

        //     if (status === "21" && sprefusestatus == "2") {
        //         return 2
        //     }

        //     if (status === "23") {
        //         return 3
        //     }
        // }

    },
    mounted() {
        this.showAd()
        document.querySelector('body').className = "wbxf"
        
        
    },
    beforeDestroy() {
        document.querySelector('body').className = ""
    },
    beforeRouteLeave (to, from, next) {
        this.showWbAd = false
    },

}
</script>

<style>
    .wbAdZZ {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
    }
    .wbAd {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
    }
    .wbAd .wbAdContent {
        width: 100%;
        position: relative;
    }
    .wbAd img {
        width: 100%;
        box-shadow: 0 0 5px #444444;
    }
    .wbAd .wbAdClose {
        position: absolute;
        right: 0;
        top: -2rem;
        width: 2rem;
        height: 2rem;

        text-align: right;
        line-height: 2.6rem;
    }
    .wbAd .wbAdClose i {
        font-size: 1.3rem;
    }
    .wbxf .go-to-top {
        bottom: 5.6rem;
    }
    .nodataimg {
        width: 60vw;
        margin: 0 auto;
        max-width: 10rem;
    }
    #wbxf {
        background: #ededed;
        height: 100%;
        overflow-y: auto;
    }
    .wbxf-bottom-btn {
   
        background: rgb(151, 0, 0) !important;
        color: #ffffff;
   
        font-size: 0.7rem;
        font-weight: 500;
        border-radius: 0.3rem;
        font-size: 0.7rem;
        height: 1.8rem;
        line-height: 1.85rem;
    }
    .wbxf-bottom {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #ffffff;
        text-align: center;
        padding: 0.5rem 1rem;
    }
    .wbxf-temp .mint-msgbox-header {
        padding-top: 7px;
    }
    .wbxf-temp .mint-msgbox-title {
        font-size: 14px;
        padding-bottom: 7px;
    }
    .wbxf-temp .wbxf-modal-text {
        color: #666666;
        margin-bottom: 0.5rem;
    }
    .wbxf-temp .wbxf-modal-yes {
        background: rgb(151, 0, 0);
        color: #ffffff;
        height: auto;
        border-radius: 0;
    }
    .wbxf-temp .wbxf-modal-no {
        background: #999999;
        color: #ffffff;
        height: auto;
        border-radius: 0;
    }
    .wbxf-temp .mint-msgbox {
        border-radius: 4px;
    }
    .wbxf-temp .mint-msgbox-title {
        border-bottom: 1px solid #ddd !important;
    }
    .wbxf-modal-notice {
        font-size: 12px;
        color: #999999;
    }
    .wbxf-modal-label {
        color: #333333;
        font-weight: bold;
    }
    .wbxf-content{
        padding-top: 5.1rem;
        padding-bottom: 2.8rem;
    }
    .wb-item {
        background: #ffffff;
        padding: 0 0.5rem;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }
    .wb-item-top {
        height: 2rem;
        line-height: 2rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ededed;
    }
    .wb-item-top span:nth-child(1) {
        font-size: 0.65rem;
        font-weight: 700;
    }
    .wb-item-top span:nth-child(3) {
        float: right;
        color: #EA3939;
    }
    .wb-item-mid {
        border-bottom: 1px solid #ededed;
        overflow: hidden;
        padding: 0.3rem 0;
    }
    .wborder-img {
        float: left;
        width: 3rem;
        height: 3rem;

        margin-right: 0.5rem;
    }
    .wborder-img img {
        width: 100%;
        height: 100%;
    }
    .wborder-msg {
        float: left;
    }
    .wb-item-bottom {
        height: 2.2rem;
        line-height: 2.2rem;
        text-align: right;
        color: #666666;
        font-weight: 500;
    }
    .wb-item-bottom span {
        padding: 0.35rem 0.4rem;
        border: 1px solid #ededed;
        border-radius: 0.2rem;
        font-size: 0.65rem;
    }
        
    .ivu-rate {
        margin-left: 30%;
    }
    
  #mt {
    width: 80%;
    height: 200px;
    border-radius: 3px;
    /* text-align: center; */
    line-height: 33px;
    text-align: center;
    /*padding-top: 15px;*/
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  #mt > h2 {
    color: #333;
    font-weight: 700;
    flex-grow: 1;
    padding-top: 10px;
  }

  #mt_div {
    padding-left: 15px;
    /*padding-top: 5px;*/
    /*padding-bottom: 5px;*/
    text-align: left;
    border-bottom: 1px solid #ccc;
    flex-grow: 1;
  }

  #mt_btn {
    width: 25%;
    height: 1.8rem;
    margin: auto;
    font-size: 16px;
    color: #0f8de0;
    background-color: #fff;
    flex-grow: 0.5;
  }
  .refuseInfo{
    overflow-y: auto;
    line-height: 24px;
    height: 3rem;
    white-space: normal;
    word-break: break-all;
  }
  .order_list_div {
    /*background: #f5f5f5;*/
  }
  .service_list {
    margin-bottom: .5rem;
  }
  .service_list img {
    height: 100%;
  }
  .wbAd-enter-active, .wbAd-leave-active {
    transition: opacity .5s;
  }
  .wbAd-enter, .wbAd-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
