/**
 * Created by SJay on 2017/8/23.
 */
let translateDetailData = ({
                             goodsid,
                             goodscode,
                             goodsname,
                             wsprice,
                             goodsunit,
                             prodarea,
                             enterprisename,
                             urllist,
                             stockcount,
                             goodstype,
                             goodsmodel,
                             normalprice,
                             mainPic,
                             subgoodslist,
                             subgoodsservicelist
                           }) => {
  var newData = {
    goodsCode: goodscode || '',
    goodsId: goodsid || '',
    goodsName: goodsname || '',
    goodsPrice: wsprice ? wsprice : 0,
    goodsUnit: goodsunit || '',
    city: prodarea || '',
    stockCount: stockcount ? parseInt(stockcount) : 0,
    shopName: enterprisename || '',
    goodsType: goodstype ? goodstype : 0,
    goodsModel: goodsmodel || '',
    lable: null,
    mainPic: mainPic,
    normalPrice: normalprice ? normalprice : 0,
    subgoodslist: subgoodslist || null,
    subgoodsservicelist:subgoodsservicelist||null
  }

  if (mainPic) {
    return newData
  }
  if (urllist) {
    mainPic = urllist.find((item) => {
      return parseInt(item.Imgurltype) == 1 || parseInt(item.imgurltype) == 1
    }) || urllist.find((item) => {
      return parseInt(item.Imgurltype) == 0 || parseInt(item.imgurltype) == 0
    })

  } else {
    mainPic = ''
  }

  newData.mainPic = mainPic ? (mainPic.imgurl ? mainPic.imgurl :"static/image/yuchaistatic.jpg") : "static/image/yuchaistatic.jpg";
  
  return newData
}

export {
  translateDetailData
}
