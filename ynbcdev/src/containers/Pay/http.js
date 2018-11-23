import axios from 'axios'

// 获取个人信用额度
export const getAccountCreditByVipidList = (vipid) => axios({
    url: window.api.local_host + '/creditPay/getAccountCreditByVipidList',
    method: 'get',
    // params: {
    //     enterpriseid: window.api.enterpriseid,
    //     vipid: vipid
    // },
    headers: {
        "sessionId": window.localStorage.getItem("sessionId")
    }
})
// 信用支付
export const repaymentsByonlineOrunderline = (repaymentno, amount) => axios({
    method: 'post',
    url: window.api.local_host + '/creditPay/pay',
    data: {
        orderNo: repaymentno,
        cost: amount
    },
    headers: {
        "sessionId": window.localStorage.getItem("sessionId")
    }
})