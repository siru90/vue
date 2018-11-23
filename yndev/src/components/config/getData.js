import axios from './axios.js'
import axios_true from 'axios'

/**
 * 获取用户信息
 */

export const getUserInfoAgain = (val) => axios('/user/getUserInfo');


/**
 * 单点登录
 */

export const sendSessionId = val => axios('/user/loginVip');

//qxz修改部分
// export const getSessionId = axios_true.get('/user/accessLogin?eid=138');
//qxz修改部分

/**
 * 获取用户rid信息 在线客服使用
 */
export const getUcUserInfo = (val) => axios('/user/getUcUserInfo');

//getUcUserInfo
/**
 * 改变用户信息
 */

export const changeUserInfo = param => axios('/user/updateUserInfo', param, "post");


/**
 * 上传头像
 */

export const uploadAvatar = () => axios_true('', )

/**
 * 账号密码登录
 */
export const accountLogin = (account, password, enterpriseId) => axios('/user/login', {account, password, enterpriseId}, 'POST');


/**
 * 退出登录
 */
export const signout = param => axios('/user/logout/', param);



/**
 * 获取短信验证码
 */

export const mobileCode = phone => axios('/user/registerStepOne/', phone);

/*
发送注册请求
*/

export const register = (mobile, code, password, enterpriseId) => axios('/user/registerStepTwo', {mobile, code, password, enterpriseId}, 'post')


/**
 * 改密码 1
 */
export const changePassWordOne = phone => axios('/user/findPwdStepOne/', phone);

/**
 * 改密码 2
 */

export const changePassWordTwo = (mobile, code, newPassword, enterpriseId) => axios('/user/findPwdStepTwo', {mobile, code, newPassword, enterpriseId
}, 'POST');

/**
 * 获取全部订单
 */

export const getAllOrder = num => axios('/order/selectOrderList/', num);

/**
 * 获取全部订单数量;
 */

export const countByStatus = num => axios('/order/countByStatus');


 /**
  * 未付款订单
  */

export const willPay = param => axios('/order/goPay/', param);


 /**
 * 取消订单
 */

export const cancelOrder = orderNo => axios('/order/cancel', {orderNo} , 'post');


 /**
 * 订单确认收货
 */

export const confirmOrder = orderNo => axios('/order/confirmOrder', {orderNo} , 'post');




 /**
 * 待配送
 */


  /**
 * 查看订单详情 用来找到自提订单的服务商信息
 */

export const orderDetails = orderDetails => axios('/order/selectOrderDetail', orderDetails);

  /**
 * 配送中
 */


 /**
 * 查看物流
 */


 /**
 * 以签收
 */



 /**
 * 以下为安装单接口
 */

 /**
 * 获取安装单信息
 */


export const getInstall = param => axios('/valueAdded/selectSpStInstallList/', param);


 /**
 * 新增安装单信息
 */


export const setInstall = data => axios('/valueAdded/insertSpStInstall', data, 'post');

/**
 * 更新安装单
 */

export const upDateInstall = data => axios('/valueAdded/updateSpStInstall', data, 'put');


/**
* 获取维保单信息
*/


export const getMaintain = data => axios('/valueAdded/selectSpFxMaintenanceList/',data)


/**
* 新增维保单信息
*/


export const addMaintain = data => axios('/valueAdded/insertSpFxMaintenance', data, 'post')

/**
 * 修改维保单信息
 */
export const upDateMaintainInfo = data => axios('/valueAdded/updateSpFxMaintenance', data, 'put')


 /**
 * 获取终端维修
 * 
 */


export const getTerminalMaintenanceinfo = param => axios('/valueAdded/getTerminalMaintenanceinfo/', param);


 /**
 * 更新终端维修
 */


export const updateTerminalMaintenanceinfo = param => axios('/valueAdded/updateTerminalMaintenanceinfo', param, 'post');

 /**
 * 获取终端拆除
 * 
 */


export const getTerminalDismantleinfo = param => axios('/valueAdded/getTerminalDismantleinfo/', param);


 /**
 * 更新终端拆除
 */


export const updateTerminalDismantleinfo = param => axios('/valueAdded/updateTerminalDismantleinfo', param, 'post');




/**
 * 取消工单预约
 */
// export const dancelInstallOrder = (enterpriseid, billno, type) => axios('/maintenance/checkservicestatus', {enterpriseid, billno, type}, 'get', 'method')

/**
 *  判断订单所包含的工单是否全部完结
 */

export const getOrderResultCheckInfo = data => axios('/valueAdded/getOrderResultCheckInfo/',data);

/**
 * 订单包含安装单
 */

export const selectSpStInstallListByOrderid = data => axios('/valueAdded/selectSpStInstallListByOrderid/',data);

 /**
 * 订单包含维保单
 */

export const selectSpFxMaintenanceListByOrderid = data => axios('/valueAdded/selectSpFxMaintenanceListByOrderid/',data);


/**
* 获取服务商接口
*/

export const upDateServiceInfo = data => axios('/linkCarsIplat/updateTermnoInfo', data, 'post')



export const getService = (param) => axios_true(param).then(res => {return res});

/**
 * 发送评价信息
 */

export const sendRate = param => axios('/servicerCommentRestService/insertServiceComment',param, 'post');




 /**
 * 以下为我的车辆接口
 */


export const getCarInfo = param => axios('/getvipcarinfo', param);


 /**
 * 以下为我的车辆接口
 */


export const updateCarInfo = param => axios('/clientotherinfo/updatevipcarinfo', param, 'post', 'method');




 /**
 * 以下为优惠券接口
 */

 /**
 * 获取优惠券使用明细
 */




export const getDiscount_detail = (param) => axios_true(param).then(res =>{ return res.data.data[0]; })

/**
* 获取剩余优惠券
*/


export const getDiscount_other = (param) => axios_true(param).then(res =>{ return res.data.data[0]; })


 /**
 * 用户地址接口
 */

 export const getAddress = param => axios('address/getarealist', param , 'get', 'method');


  /**
 * 消息
 */

export const getNews = status => axios('/broadCast/qryBroadCastListFromH5', status);

/**
 * 已读消息改变
 */


export const changeNews = rid => axios('/broadCast/updateBroadCastFromH5', {rid}, "put");

  /**
 * 收藏
 */


  /**
 * 以下为服务中心接口
 */

 /**
 * 意见类型
 */

export const queryQaCategoryList = (status=1, fromPc=false )=> axios('/qaCategoryRestService/queryQaCategoryList',{status, fromPc}, 'post')


 /**
 * 意见反馈
 */

export const submitQaAdvice = (categoryName, categoryId, qDesc, qPhone, status=1)=> axios('/qaAdviceRestService/insertQaAdviceFromH5',{categoryName, categoryId, qDesc, qPhone, status}, 'post')

  /**
 * 常见问题
 */

export const questionList = (describle, status=1)=> axios('/qaAnswerRestService/queryQaAnswerListFromH5',{describle, status}, 'post')


/**
 * 退押金接口
 */
// export const orderRefound = data => axios('afterSales/insertOrUpdateAfterSales', data, 'post')

/**
 * 退押金详情接口
 	GET
 	sessionId
 	serviceNo
 */


export const orderRefoundDetails_1 = (data) => axios('/afterSales/selectAfterSalesByOrderNo/',data)


//查询审批记录
export const orderRefoundDetails_2 = (data) => axios('/afterSales/approval_order/',data)


/**
 * 终端售后
 */
export const getTerminalAfter = param => axios('valueAdded/terminalSaleAfter ', param , 'get', 'method');


/*维保单详情*/
export const getShopOneRecordById = param => axios('/maintenanceProgramme/getShopOneRecordById', param);


/*预约单详情*/
export const selectSubGoodsDetail = data => axios('/maintenanceAdd/selectSubGoodsDetail', data);
