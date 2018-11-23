import axios from 'axios'

export const underLinePayAxios = (payParam) => axios({
    method: 'post',
    url: window.api.local_host + '/creditPay/repaymentsByonlineOrunderline',
    data: payParam,
    headers: {
        "sessionId": window.localStorage.getItem("sessionId")
    }
})

export const notifyPayPayStar = (orderNo) => axios({
    url: window.api.local_host + '/payment/notifyPayBigPayStar',
    method: 'get',
    params: {
        creditRefundNo: orderNo
    },
    headers: {
        sessionId: window.localStorage.getItem('sessionId')
    }
})