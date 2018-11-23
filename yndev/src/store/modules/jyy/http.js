import axios from "axios";
// 获取会员信息
export const getVipClub = () => {
    return axios({
        url: window.api.local_host + '/memberclubs/getVipClub',
        method: 'get',
        headers: {
            "sessionId": window.localStorage.sessionId
        }
    })
}

export const getClubPWay = () => {
    return axios({
        url: window.api.local_host + '/vipClub/getClubPWay',
        method: 'get',
        headers: {
            "sessionId": window.localStorage.sessionId
        }
    })
}

export const getVipClubStarsPs = () => {
    return axios({
        url: window.api.local_host + '/vipClub/getVipClubStarsPs',
        method: 'get',
        headers: {
            "sessionId": window.localStorage.sessionId
        }
    })
}

export const getVipClubIntroduction = () => {
    return axios({
        url: window.api.local_host + '/vipClub/getVipClubIntroduction',
        method: 'get',
        headers: {
            "sessionId": window.localStorage.sessionId
        }
    })
}

export const saveVipClubP = (tasktpye) => {
    return axios({
        url: window.api.local_host + '/member/saveVipClubP',
        method: 'post',
        headers: {
            "sessionId": window.localStorage.sessionId
        },
        data: {
            "tasktype": tasktpye
        }
    })
}

export const getServicersList = () => {
    return axios({
        method: "get",
        url: window.api.local_host+'/valueAdded/findServiceProviderInfo?maintenance=1',
        headers:{'sessionId':window.localStorage.getItem("sessionId")}
    })
}