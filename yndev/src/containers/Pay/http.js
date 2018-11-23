import axios from 'axios'

export const notifyPayPayStar = (orderNo) => axios({
    url: window.api.local_host + '/payment/notifyPayPayStar',
    method: 'get',
    params: {
        orderNo: orderNo
    },
    headers: {
        sessionId: window.localStorage.getItem('sessionId')
    }
})