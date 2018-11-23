<template>
    <div :style="dataList.length == 0 ? {background:'white'} : {}" id="wbxf">
        <!-- 头部 start -->
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
        <div class="wbxf-content">
            <ul v-if="dataList.length > 0">
                <li v-for="(item, index) in dataList" :key="index" class="wb-item">
                    <div class="wb-item-top"> 
                        <span>工单编号：</span>
                        <span>{{item.reservationno || item.maintenanceno}}</span>
                        <span>{{formMaintenancestatus(item)}}</span>
                    </div>
                    <div @click="gotoOrderDetail(item)" class="wb-item-mid">
                         <div class="wborder-img">
                             <img :src="item.maintenancetype == 1? 'static/image/baoyang.png':'static/image/weixiu.png'" alt="">
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
                        <!-- <span v-if="showBtn('makeBill',item)" @click="makeBill(item)">开票申请</span> -->
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
                <div id="confirm" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click="sendRate">确定</div>
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
                <p>服务商：{{refuseService}}</p>
                <p>拒单时间：{{refuseTime}}</p>
                <p class="refuseInfo">拒单原因：{{refuseInfo}}</p>
            </div>
            <mt-button type="primary" id="mt_btn" @click=" popupVisible = !popupVisible">关闭</mt-button>
        </mt-popup>
    </div>
</template>
<script>
// 用于维保先锋类似的页面
import axios from 'axios'
import RepairHead from '../TabsBar/tabs'
import Search from './search'
import { searchPlanDetail,yesornoPlan,cancelPlan,makeComments  } from './http'
import {showLoading, hideLoading} from "../../utils/loading";
import { getOrderDetail } from '../WbxfWordOrderDetail/http'
import { addOrder } from '../WbxfWordOrder/http'
import { messageBox,Popup,Button } from "mint-ui"
import {Toast} from "../../utils/toast2.js";
import Rate from 'iview/src/components/rate';

import { mapGetters } from 'vuex'
import 'iview/dist/styles/iview.css';
import 'mint-ui/lib/style.css'
export default {
    components: {
        RepairHead,
        SeachBar: Search,
        Rate,
        "mt-popup": Popup,
        "mt-button": Button
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
            valueHalfWord: '很满意'
        }
    },
    watch: {
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
        }
    },
    computed: {
        ...mapGetters('xhModules', [
            'userInfo',
        ])

    },
    methods: {
        // 查看拒绝详情
        showRefuse(item) {
            this.popupVisible = !this.popupVisible
            this.refuseService = item.servicename
            this.refuseTime = item.sprefusetime
            this.refuseInfo = item.sprefusereason
        },
        // 去付款
        payOrder(item) {
            alert("去付款")
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
                this.$store.dispatch('jyy/setWbOrderData',data)
                this.$router.push({"name":"wbxfWorkOrder"})
                
            } catch (error) {
                
            }
            
        },
        // 开发票
        makeBill(item) {
            this.$router.push({name:'BillDetail',query:{datas:item,parentOrderNo:item.maintenanceno}})	
        },
        // 评论接口
        async sendRate() {

            
            this.commentCofig.score = this.valueHalf         // 评分
            this.commentCofig.comments = this.comments      // 评价内容
            const commentData = {
                maintenanceid: this.commentCofig.worksNo,
                appraise: this.commentCofig.score,
                sppraisement: this.commentCofig.sppraisement
            }
            let res = await makeComments(commentData);
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
                "memberPhone": item.telephone,
                "memberId":this.userInfo.vipid,
                "serviceType":"维保先锋",
                "servicerName":item.servicename,
                "worksNo":item.maintenanceid,
                "worksType":item.maintenancetype
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
                case "cancle":
                    // 待受理状态下显示取消按钮  待服务状态下（非初步，正式，没有执行过拒绝同意，）
                    if (mainStatus == 22) {
                        return true
                    }
                    if (status == 0) {
                        return true
                    }
                    if ( mainStatus == 23 || mainStatus == 33) {
                        // if (orderType == 0 && status == 6) {
                        //     return false
                        // }
                        // if ((orderType == 0 && status == 6)||(orderType == 1 && status ==2)) {
                        //     return false
                        // }
                        // if ((orderType == 0 && status == 8)||(orderType == 1 && status == 6)) {
                        //     return false
                        // }
                        // 若sprefusestatus不为null说明已经同意或拒绝过方案，这时不显示取消按钮
                        
                        if (item.sprefusestatus === null) {
                            return false
                        }
                        return true
                    } 

                    if (item.flag) {

                    }
                    return false
                    break;
                case "primary":
                    // 上门状态并且状态码为1显示初步方案按钮
                    if (orderType == 0 && status == 1) {
                        return true
                    }
                    return false
                    break;
                case "formal":
                    // 正式方案显示
                    if ((orderType == 0 && status == 6)||(orderType == 1 && status == 4)) {
                        return true
                    } 
                     return false
                    break;
                case "superaddition":
                    // 追加方案显示
                    if ((orderType == 0 && status == 8)||(orderType == 1 && status == 8)) {
                        return true
                    }
                    return false
                    break;
                case "pay":
                    // 付款按钮显示
                    if ((orderType == 0 && (status == 10 || status == 11))||(orderType == 1 && (status == 10 || status == 11))) {
                        return true
                    }
                    return false
                    break;
                    
                case "comment":
                    // 评论按钮显示
                     if (orderType == 0 && status >=12 && status <= 14 && !item.appraise) {
                        //  上门单，状态码在12到14 且没有评论字段
                         return true
                     } else if (orderType == 1 && status >=12 && status <= 14 && !item.appraise) {
                         //  到店单，状态码在10到12 且没有评论字段
                         return true
                     }
                    return false
                    break;
                case "makeBill":
                    if (orderType == 0 && status >=12 && status <= 14 && item.appraise) {
                        //  上门单，状态码在12到14 且没有评论字段
                         return true
                     } else if (orderType == 1 && status >=10 && status <= 12 && item.appraise) {
                         //  到店单，状态码在10到12 且没有评论字段
                         return true
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
        gotoOrderDetail(item){
            this.$router.push({name: 'wbxfWorkOrderDetail', query: {maintenanceno:item.reservationno,maintenanceid:item.maintenanceid}})
        },
        gotoAddOrder() {
            this.$router.push({
                name:"wbxfWorkOrder"
            })
        },
        formMaintenancetype(code) {
            if (code == 1) {
                return "维保服务"
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
                // 预约单
                // if (item.maintenanceservicetype == '0') {
                    
                //     // 上门
                //     if (status >=12 && status <= 14 && !item.appraise) {
                //         return "待评价"
                //     } else if (status >=12 && status <= 14 && item.appraise) {
                //         return "已完成"
                //     } else if (status == 15) {
                //         return "已终止"
                //     }
                // } else {
                    // 到店
                    if (status >=12 && status <= 14 && !item.appraise) {
                        return "待评价"
                    } else if (status >=12 && status <= 14 && item.appraise) {
                        return "已完成"
                    } else if (status == 15) {
                        return "已终止"
                    }
                //}
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
                    default:
                        break;
                }
            }
















            
        },
        // 拼接方案名
        getProjectName(list) {
            let restult = ''
            list.forEach(v => {
                restult += '<div>'+v.fxprojectname+'</div>'
            })
            return restult
        },
        // 拼接配件名
        getPJList(list) {
            let result = ""
            list.forEach(v => {
                result += `
                    <div>${v.goodsname} * ${v.quantity}</div>
                `
            })
            return result
        },
        // 拼接维修费用
        getWBPriceList(list) {
            let result = ""
            list.forEach(v => {
                result += `
                    <div>${v.goodsname}：￥${v.shouldpaymoney}</div>
                `
            })
            return result
        },
        // 服务非
        getFWF(list) {
            let result = 0;
            list.forEach(v => {
                result+=v.shouldpaymoney
            })
            return result
        },
        // 所有费用
        getAllCost(list) {
            let allCost = 0
            list.forEach(v => {
                allCost += v.shouldpaymoney
            })
            return allCost
        },
        async showAlert(item,type) {
            let flag = true
            let planDetail = {}
            let modalName = ""  //弹框名
            let planName = ""   //维修方案
            let partsList = []
            let priceList = []
            let allPrice = ""
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
                console.log(data)
                switch (type) {
                    case "primary":
                        modalName = "初步方案及报价确认"
                        planName = this.getProjectName(data.spFxMaintenanceAdvice)//方案名
                        partsList = this.getPJList(data.spSuProducegoodsDtlbs)  //陪件
                        priceList = this.getWBPriceList(data.spSuProducegoodsDtlbs) + `<div>服务费：￥${this.getFWF(data.spFxMaintenanceAdvice)}</div>`   //价格
                        break;
                    case "formal":
                        modalName = "正式方案报价确认"
                        planName = this.getProjectName(data.spFxMaintenanceItems)//方案名
                        partsList = this.getPJList(data.refergoodslist)  //陪件
                        priceList = this.getWBPriceList(data.refergoodslist) + `<div>服务费：￥${this.getFWF(data.spFxMaintenanceItems)}</div>`   //价格
                        break;
                    case "superaddition":
                        modalName = "追加方案报价确认"
                        planName = this.getProjectName(data.spFxMaintenanceItems)//方案名
                        partsList = this.getPJList(data.refergoodslist)  //陪件
                        priceList = this.getWBPriceList(data.refergoodslist) + `<div>服务费：￥${this.getFWF(data.spFxMaintenanceItems)}</div>`   //价格
                        break;
                    case "pay":
                        modalName = "确认服务完成并付款"
                        planName = this.getProjectName(data.spFxMaintenanceItems)//方案名
                        partsList = this.getPJList(data.refergoodslist)  //陪件
                        priceList = this.getWBPriceList(data.refergoodslist) + `<div>服务费：￥${this.getFWF(data.spFxMaintenanceItems)}</div>`   //价格
                        allPrice = data.cost
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
            
            if (type === "pay") {

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
                            <div class="wbxf-modal-text" style="color:#EA3939">合计：￥<span style="font-size:1rem;">${allPrice.toFixed(2)}</span></div>
                            </div>
                    `
                }).then(e => {
                    const money = allPrice
                    const orderNo = item.maintenanceno
                    if (e === "confirm") {
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
            messageBox({
                title:modalName,
                showCancelButton:true,
                confirmButtonClass:"wbxf-modal-yes",
                cancelButtonClass:"wbxf-modal-no",
                cancelButtonText:"拒绝并取消",
                confirmButtonText:"同意",
                message: `
                        <div style="max-height:20rem;overflow:auto;text-align:left;line-height: initial;font-size:14px;">
                          <div class="wbxf-modal-label">维修方案</div>
                          <div class="wbxf-modal-text">${planName}</div>
                          <div class="wbxf-modal-label">所需配件</div>
                          <div class="wbxf-modal-text">${partsList}</div>
                          <div class="wbxf-modal-label">预计费用</div>
                          <div class="wbxf-modal-text">${priceList}</div>
                          <div class="wbxf-modal-notice">提示：选择“拒绝”按钮，即视为不同意服务方案，工单将直接终止。</div>
                        </div>
                `
            }).then(e => {
                
                this.checkPlan(e,item)
             
                
            })
            
            
        },
        checkPlan(e,item) {
            let flg = e == 'confirm' ? 1 : 0
            yesornoPlan(item.maintenanceid, item.maintenanceno,flg)
            .then(res => {
                if (res.data.returncode == 0) {
                    Toast({
                        message: '同意方案失败！',
                        iconClass:"aui-iconfont aui-icon-close",
                        duration: 2000
                    });
                    return
                }
                Toast({
                        message: '同意方案成功！',
                        iconClass:"aui-iconfont aui-icon-correct",
                        duration: 2000
                    });
                this.refreshData();
            }).catch(e => {
                Toast({
                    message: '同意方案失败！',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                });
            })
        },
        doPay(e,item) {

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
    beforeDestroy() {
        document.querySelector('body').className = ""
    },
}
</script>

<style>
    .nodataimg {
        width: 60vw;
        margin: 0 auto;
        max-width: 10rem;
    }
    #wbxf {
        background: #ededed;
        min-height: 100%;
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
</style>
