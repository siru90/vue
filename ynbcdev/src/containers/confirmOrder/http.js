import axios from 'axios'
// 获取自提服务商数据
export const getDepotDetail = () => axios({
    url: window.api.local_host + '/depot/getDepotDetail',
    method:"get",
    headers: {
        sessionId: window.localStorage.getItem('sessionId')
    }
})