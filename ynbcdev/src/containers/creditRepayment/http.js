import axios from 'axios'

export const getRepaymentsList = (status) => axios({
    url: window.api.local_host + '/creditPay/getRepaymentsList',
    method: 'get',
    params: {
        status: status
    },
    headers: {
        "sessionId": window.localStorage.getItem("sessionId")
    }
})