import axios from 'axios'

export const getVipClubStarsPs = (year) => {
    return axios({
        url: window.api.local_host + '/memberclubs/getVipClubPRecord',
        params: {
            "year":year
        },
        headers: {
            "sessionId": window.localStorage.getItem("sessionId")
        }
    })
}