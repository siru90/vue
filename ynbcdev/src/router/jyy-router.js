const XPserver = resolve => require(['../containers/allXpServers/index.vue'], resolve);
const checkupTruthPage = resolve => require(['../containers/checkupTruth/index.vue'], resolve);
const checkupTruthResultPage = resolve => require(['../containers/checkupTruthResult/index.vue'], resolve);
const recommendGoodsPage = resolve => require(['../containers/recommendGoods/index.vue'], resolve);
const noticeContentPage =  resolve => require(['../components/NoticeContent/index.vue'], resolve);
const wbNotice = resolve => require(['../containers/WbNotice/index.vue'], resolve);
const wbNoticeDetail = resolve => require(['../containers/WbNoticeDetail/index.vue'], resolve);
const wbxfWorkOrder = resolve => require(['../containers/WbxfWordOrder/index.vue'], resolve);
const wbxfWorkOrderDetail = resolve => require(['../containers/WbxfWordOrderDetail/index.vue'], resolve);
const wbxf = resolve => require(['../containers/Wbxf/index.vue'], resolve);
const iosPay = resolve => require(['../containers/PayWbxf/ios_pay.vue'], resolve);
const androidApy = resolve => require(['../containers/PayWbxf/index.vue'], resolve);
const proOrder = resolve => require(['../containers/procurementOrder/index.vue'], resolve);
const creditRepayment = resolve => require(['../containers/creditRepayment/index.vue'], resolve);
const creditRepaymentOrderDetail = resolve => require(['../containers/crOrderDetail/index.vue'], resolve);
const creditRepaymentPay = resolve => require(['../containers/creditRepaymentPay/index.vue'], resolve);
const jyyRouter = [
    {
        name: 'checkupTruth',
        path: '/checkupTruth',
        component: checkupTruthPage
    }, 
    {
        name: 'checkupTruthResult',
        path: '/checkupTruthResult',
        component: checkupTruthResultPage
    },
    {
        name: 'noticeContent',
        path: '/noticeContent',
        component: noticeContentPage
    },
    {
        name: 'wbNotice',
        path: '/wbNotice',
        component: wbNotice
    },
    {
        name: 'wbNoticeDetail',
        path: '/wbNoticeDetail',
        component: wbNoticeDetail
    },
    {
        name: 'wbxfWorkOrder',
        path: '/wbxfWorkOrder',
        component: wbxfWorkOrder
    },
    {
        name: 'wbxfWorkOrderDetail',
        path: '/wbxfWorkOrderDetail',
        component: wbxfWorkOrderDetail
    },
    {
        name: 'wbxf',
        path: '/wbxf',
        component: wbxf
    },
    {
        name: 'androidPayWb',
        path: '/androidPayWb',
        component: androidApy
    },
    {
        name: 'iosPayWb',
        path: '/iosPayWb',
        component: iosPay
    },
     {
         name: 'crOrderDetail',
         path: '/crOrderDetail',
         component: creditRepaymentOrderDetail
     },
     {
         name: 'crPay',
         path: '/crPay',
         component: creditRepaymentPay
     }

]
const jyyRouterChildren = [
    {
        name: 'xpserver',
        path: "xpallserver",
        component: XPserver
    },
    {
        name: 'guessYouLikeList',
        path: 'guessYouLikeList',
        component: recommendGoodsPage
    },
    {
        name: 'proOrder',
        path: 'proOrder',
        component: proOrder
    },
    {
        name: 'creditRepayment',
        path: 'creditRepayment',
        component: creditRepayment
    }
];

export { jyyRouter, jyyRouterChildren }