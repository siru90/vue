import axios from 'axios'
import api from '../../api'

export const getServiceData = (goodsCode) => axios({
    url: window.api.mall_base_host + api.gwGetService,
    method: 'get',
    params: {
         enterpriseid: window.api.enterpriseid,
        goodscode: goodsCode
    }
})