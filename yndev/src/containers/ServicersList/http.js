import axios from 'axios'

export const getServicesData = () => axios({
    method: "get",
    url: window.api.local_host+'/valueAdded/findServiceProviderInfo?maintenance=1',
    headers:{'sessionId':window.localStorage.getItem("sessionId")}
})