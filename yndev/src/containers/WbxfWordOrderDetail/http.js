import axios from 'axios'

export const getOrderDetail = (orderNo) => axios({
    url: window.api.local_host + '/maintenanceAdd/selectMtFxInstallDetail/' + orderNo,
    method: 'get',
    headers: {
        sessionId: window.localStorage.getItem('sessionId'),
    },
})

export const getOrderDetailByMid = (id) => axios({
    url: window.api.local_host + '/maintenanceProgramme/getShopOneRecordById',
    method: 'get',
    params: {
        enterpriseid: window.api.enterpriseid,
        maintenanceid: id
    }
})