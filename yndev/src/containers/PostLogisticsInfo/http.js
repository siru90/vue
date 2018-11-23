import axios from 'axios'

export const getaddresseeMsg = (billNO) => axios({
    url: window.api.mall_sale_host + 'spSaRetail/querysaleretailByParams',
    method: 'get',
    params: {
        refundid: billNO,
        enterpriseid: window.api.enterpriseid
    }
})