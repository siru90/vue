
const BillDetail = resolve => require(['../containers/BillDetail'],resolve);
const HeadManagement = resolve => require(['../containers/HeadManagement'],resolve);
const headManageDetail = resolve => require(['../containers/headManageDetail'],resolve);
const BillParticulars = resolve => require(['../containers/BillParticulars'],resolve);
const ElectronicBill = resolve => require(['../containers/ElectronicBill'],resolve);
const ElectionBill = resolve => require(['../containers/ElectionBill'],resolve);

const hzhRouter = [
    {
        path: '/main/BillDetail',
        name: 'BillDetail',
        title: '发票',
        component: BillDetail
    },
    {
        path: '/main/HeadManagement',
        name: '/main/HeadManagement',
        title: '抬头管理',
        component: HeadManagement
    },
    {
        path: '/main/headManageDetail',
        name: '/main/headManageDetail',
        title: '抬头管理详情',
        component: headManageDetail
    },
    {
        path: '/main/BillParticulars',
        name: '/main/BillParticulars',
        title: '发票详情',
        component: BillParticulars
    },
    {
        path: '/main/ElectronicBill',
        name: '/main/ElectronicBill',
        title: '电子发票',
        component:  ElectronicBill
        
    },
    {
        path: '/main/ElectionBill',
        name: '/main/ElectionBill',
        title: '电子发票',
        component: ElectionBill
    },
]

const hzhRouterChildren = [


];

export { hzhRouter, hzhRouterChildren }
