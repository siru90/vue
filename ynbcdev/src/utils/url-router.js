/**
 * Created by SJay on 2017/8/4.
 */
// import api from "../api"

export default () => {
  var api = window.api
  const enterpriseId = window.api.enterpriseId
  const mall_base_host = api.mall_base_host
  const mall_goods_host = api.mall_goods_host
  const H5_HOST_URL = api.local_host
  console.log(H5_HOST_URL,'--------------')
// queryGoodsList
// goodsRestApi/queryGoodsList
  const goodsList = H5_HOST_URL + `/getErpGoodsInfo/queryGoodsListForPage?enterpriseid=${window.api.enterpriseId}&`
  const queryGoodsPage = H5_HOST_URL + '/getErpGoodsInfo/queryGoodsListForPage'
  //mall_goods_host + `goodsRestApi/queryGoodsList?enterpriseid=${window.api.enterpriseId}&`
  const classList = mall_goods_host + `goodsclass/getgoodsclasslist?enterpriseid=${window.api.enterpriseId}`
  const queryCollect = H5_HOST_URL + "/collectionRestService/queryCollectionList"
  const insertCollect = H5_HOST_URL + "/collectionRestService/insertCollection"
  const deleteCollect = H5_HOST_URL + "/collectionRestService/deleteCollection"
  const queryClassifyPic = H5_HOST_URL + "/resourceLevel/queryResourceLevel"
  const Confirm = mall_base_host + "linkCarsIplat/updateTermnoInfo"
  const goodsListPage = mall_goods_host + `goodsRestApi/queryGoodsListForPage?enterpriseid=${window.api.enterpriseId}&`
  const getOrderUrl = H5_HOST_URL + "/order/selectCanAfterSaleOrder"
// "http://172.19.5.136:8112"
  const getSubmitedInfor = H5_HOST_URL + "/afterSales/selectAfterSalesList"
  const getServiceOrderInfor = H5_HOST_URL + "valueAdded/selectSpStInstallList"

  return {
    queryGoodsPage,
    goodsList,
    classList,
    queryCollect,
    insertCollect,
    deleteCollect,
    queryClassifyPic,
    H5_HOST_URL,
    goodsListPage,
    Confirm,
    getOrderUrl,
    getSubmitedInfor,
    getServiceOrderInfor,
    enterpriseId
  }
}
