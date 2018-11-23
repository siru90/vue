//erp接口不带/
const gwApi = {
    gw : "222222",
    xiaolizi: "http://172.19.5.145:8112",
    // gwCartHost: "http://mall.yn.weilian.cn",
    // gwCartHost: "http://172.19.5.145:8112",
    gwCartHost: "http://172.19.5.219:8112",
    gwLogisticsHost: "http://172.19.5.136:8112",
    gwGetCart: "/shoppingCart/queryShoppingCart",
    gwUpdateCart: "/shoppingCart/updateShoppingCart",
    gwDeleteCart: "/shoppingCart/deleteShoppingCart",
    gwSyncCart: "/shoppingCart/synShoppingCartUserInfo",
    //生成订单的接口
    // gwConfirmOrder: "http://mall.yn.weilian.cn/order/insertDto",
    gwConfirmOrder: "/order/insertDto",
    //获取商品详情的接口
    // gwGetGoodsData: "goodsRestApi/getgoodslistInfo",
    gwGetGoodsData: "/getErpGoodsInfo/queryGoodsListForPage",
    //获取捆绑服务的接口
    gwGetService: "getserviceofgoodslist",
    //获取虚拟商品详情的接口
    gwGetVirtualGoodsInfo: "getservicementinterface/getservicelist",
    //获取自提方式下供应商的接口
    gwGetProvider: "service/findServiceProviderInfo",
    //获取优惠券的接口地址
    gwGetYH: "couponManagement/getvouchermesslist",
    //请求支付接口
    gwPay: "/payment/getPayNoYn",
    //请求运营后台的用户信息
    gwUser: "/user/getUserInfo",
    //请求运营后台的订单金额、商品类型等
    gwOrderInfo: "/order/getRealPay",
    //请求运营后台的配送方式
    gwLogisticsType: "/baseInstall/selectBaseInstallListH5",
    //上传图片的地址
    gwUploadImg: "/upload",
    //上传物流信息的接口
    gwPostLogisticsInfo: "/afterSales/salesRetrunApplication",
    //获取物流详情
    gwLogistics: "/order/selectLogistics",
    //普通商品type
    normalGoodsType: 0,
    //虚拟商品type
    virtualGoodsType: 1,
    //优惠券类别对应关系
    //请求协议的价格
    xieyi: "/depositAntitamperConfig/selectDepositAntitamperConfig",
    yhTypes : {
        "xianshang": 2,
        "xianxia": 1,
        "zhongduan": 3,
        "peijian": 6
    },
    //查询是否第一次流量充值的接口
    isFirstRecharge: "flowCheckin/queryIsFirstRecharge",
    //签到流量充值接口
    qdRecharge: "flowCheckin/doFlowRecharge",
    //月流量充值接口
    yueRecharge: "flowMonthDtl/consumeFlow",
}
export default gwApi;