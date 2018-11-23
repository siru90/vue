import axios from 'axios'

export const updateOpportunityStatus = (code)=>axios({
    url: window.api.local_host + '/maintenance/updateOpportunityStatus/' + code + '/' + 2,
    method: 'get',
    headers: {
        sessionId: window.localStorage.getItem('sessionId'),
    }
})