// 获取数据
import axios from 'axios'
// 查询报价方案
export const searchPlanDetail = (maintenanceid, maintenanceno) => axios({
    url:window.api.local_host + '/maintenanceProgramme/getShopByIdgetProgramme',
    method: 'get',
    params: {
        // maintenanceid: '1010399463870779392',
        maintenanceno: maintenanceno,
        enterpriseid: window.api.enterpriseid,
    }
})
import {Toast} from "../../utils/toast2.js";
// //获取方案
// export const confimPlan = (maintenanceid) => axios({
//     url: window.api.local_host + '/maintenanceProgramme/getShopByIdgetProgramme',
//     method: 'get',
//     params: {
//         maintenanceid: maintenanceid,
//         enterpriseid: window.api.enterpriseid,
//         flag: '1'
//     } 
// })

// 同意或不同意方案
export const yesornoPlan = (maintenanceid,maintenanceno,flag) => axios({
    url: window.api.local_host + '/maintenanceProgramme/clientAgreeoffer',
    method: 'get',
    params: {
        maintenanceid: maintenanceid,
        maintenanceno: maintenanceno,
        flag: flag,
        enterpriseid: window.api.enterpriseid,
    }
})

// 取消预约
export const cancelPlan = (maintenanceno) => axios({
    url: window.api.local_host + '/maintenanceAdd/cacelMtFxInstall/' + maintenanceno,
    method: 'put',
    headers: {
        sessionId: window.localStorage.getItem('sessionId'),
    }
})

// 立即评价
export const makeComments = (data) => axios({
    url: window.api.local_host + '/servicerCommentRestService/insertServiceComment',
    method:'post',
    headers: {
        sessionId: window.localStorage.getItem('sessionId'),
    },
    data: {
        // appraisestatus:1,
        // enterpriseid: window.api.enterpriseid,
        // maintenanceid:data.maintenanceid,
        // appraise:data.appraise,
        // sppraisement:data.sppraisement
        "servicerId": data.servicerId,//服务商Id
        "memberName": data.memberName,//会员名称评价人
        "comments": data.comments,//评论
        "memberId": data.memberId,
        "memberPhone": data.memberPhone,
        "worksType": 3,
        "serviceType":"维保先锋",
        "worksNo": data.worksNo,
        "servicerName": data.servicerName,
        "score": data.score
    }
})

// 支付回调函数
export const doComments = (amount,maintenanceid,maintenanceno) => axios({
    method: 'post',
    data: {
        amount:amount,
        maintenanceid:maintenanceid,
        maintenanceno: maintenanceno,
        enterpriseid: window.api.enterpriseid,
    },
    url: window.api.local_host + '/maintenanceProgramme/clientpayment'
}).then(res => {
    if (res.data.returnCode == 0) {
        Toast({
                message: '同步支付数据失败',
                iconClass: "aui-iconfont aui-icon-close",
                duration: 500
        })
    }
}).catch( e => {
    Toast({
        message: '同步支付数据失败',
        iconClass: "aui-iconfont aui-icon-close",
        duration: 500
    })
})

// 确认完成维修单
export const confirmRepairOrder = (maintenanceno) => axios({
    url: window.api.local_host + "/maintenanceAdd/updateMtFxStatus/" + maintenanceno,
    method: 'put',
    headers: {
        sessionId: window.localStorage.getItem('sessionId'),
    },
})

// 0元支付
export const zeroYuanPay = (bill_id) => axios({
    url: window.api.local_host  + "/payment/payWbFree",
    method: "post",
    headers: {
        sessionId: window.localStorage.getItem('sessionId'),
    },
    data: {
        "bill_id": bill_id,
        "sessionId": window.localStorage.getItem('sessionId'),
    }
})