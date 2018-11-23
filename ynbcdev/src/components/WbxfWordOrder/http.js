import axios from 'axios'

export const getTerminlMsg = (code) => axios({
    url: window.api.local_host+'/valueAdded/findCarByCarNoOrTerminalNo',
    method: 'get',
    headers: {
        sessionId: window.localStorage.getItem('sessionId'),
    },
    params: {
        carNo: code
    }
})

export const addOrder = (data) => axios({
    url: window.api.local_host + '/maintenanceAdd/insertMtFxInstall',
    method: 'post',
    headers:{
        sessionId: window.localStorage.getItem('sessionId'),
    },
    data:data
})