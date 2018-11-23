import axios from 'axios';
// 获取预约列表
export const getWbxfList = (status) => axios({
    url: window.api.local_host + '/maintenanceAdd/selectMtFxInstallList/' + status,
    method: 'get',
    headers: {
        sessionId: window.localStorage.getItem('sessionId')
    }
})
// 获取维保列表
export const getWbxfWbList = (start,end,vipid) => axios({
    url: window.api.local_host + '/maintenanceProgramme/queryRecordsByParams',
    headers: {
        sessionId: window.localStorage.getItem('sessionId')
    },
    method: 'get',
    params: {
        enterpriseid: window.api.enterpriseid,
        vipid: vipid,
        beginindex: start,
        endindex: end
    }
})