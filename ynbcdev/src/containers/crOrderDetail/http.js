import axios from 'axios'

export const getCrOrderDetail = (orderNo,startTime,endTime) => axios({
    method: 'get',
    url: window.api.local_host + '/creditPay/billDetails',
    params: {
        // enterpriseid: window.api.enterpriseid,
        // vipid: vipId,
        repaymentno: orderNo,
        startdate: startTime,
        enddate: endTime
    },
    headers: {
        "sessionId": window.localStorage.getItem("sessionId")
    }
})