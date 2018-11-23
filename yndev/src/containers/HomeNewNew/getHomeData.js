import axios from "../../components/config/axios";

export const getHotSales = () => {
    const url = window.api.local_host + api.guessYouLikeListAndHotSales
    return axios({
        url: url + '?allocationType=1&enterpriseId=138',
        method: 'get',
    })
}

export const getGuessYouLike = () => {
    const url = window.api.local_host + api.guessYouLikeListAndHotSales
    return axios({
        url: url + '?allocationType=2&enterpriseId=138',
        method: 'get',
    })
}

export const getHomeMidAd = () => {
    const url = window.api.local_host + api.getNewHomeData
    return axios({
        url: url + '?advertisementPosition=1&enterpriseId=138',
    })
}

export const getXpServers = () => {
    const url = window.api.local_host + api.getNewHomeData
    return axios({
        url: url + '?advertisementPosition=2&enterpriseId=138',
    })
}


export const getWbxfAdList = () => {
    return axios({
        url: window.api.local_host + "/resourceLevel/queryResLevelModelByRel/CrankLink"
    })
}
// 测试提交