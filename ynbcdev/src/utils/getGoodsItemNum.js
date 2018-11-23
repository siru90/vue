//接收商品id、服务id、采购车数组
//goodsId和cartArray是必需的
export default function (goodsId, serviceId, cartArray) {
    if (Array.isArray(serviceId)) {
        //没有传进来serviceId
        cartArray = serviceId;
        
    }


}