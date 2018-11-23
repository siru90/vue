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
const activePage = resolve => require(['../containers/activePage/index.vue'], resolve);
const vipClubPage = resolve => require(['../containers/VipClub/index.vue'], resolve);
const getVipExpPage = resolve => require(['../containers/GetVipExp/index.vue'], resolve);
const vipLevelRulePage = resolve => require(['../containers/VipLevelRule/index.vue'], resolve);
const myVipExpPage = resolve => require(['../containers/MyVipExp/index.vue'], resolve);
const servicersMapPage = resolve => require(['../containers/ServicersMap/index.vue'], resolve);
const servicersListPage = resolve => require(['../containers/ServicersList/index.vue'], resolve);
const testPage = resolve => require(['../containers/TestPage/index.vue'], resolve);
const wbHomePage = resolve => require(['../containers/WbxfHome/index.vue'], resolve);
const wbxfMaintain = resolve => require(['../containers/wbxfMaintain/index.vue'], resolve);

const jyyRouter = [
    {
        name: "testPage",
        path: "/testPage",
        component: testPage
    },
    {
        name: "servicersList",
        path: "/servicersList",
        component: servicersListPage
    },
    {
        name: "servicersMap",
        path: "/servicersMap",
        component: servicersMapPage
    },
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
        name: 'vipClub',
        path: '/vipClub',
        component: vipClubPage
    },
    {
        name: 'getVipExp',
        path: '/getVipExp',
        component: getVipExpPage
    },
    {
        name: 'vipLevelRule',
        path: '/vipLevelRule',
        component: vipLevelRulePage
    },
    {
        name: 'myVipExp',
        path: '/myVipExp',
        component: myVipExpPage
    },
    {
        name: 'wbxfMaintain',
        path: "/wbxfMaintain",
        component: wbxfMaintain
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
        name: 'activePage',
        path: 'activePage',
        component: activePage
    },
    {
        name: 'wbxfHome',
        path: 'wbxfHome',
        component: wbHomePage
    }
];

export { jyyRouter, jyyRouterChildren }