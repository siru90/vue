const Cart = resolve => require(['../containers/Cart'], resolve);
const ConfirmOrder = resolve => require(['../containers/confirmOrder'], resolve);
const ConfirmVirtualOrder = resolve => require(['../containers/confirmOrder/virtualOrder'], resolve);
const FP = resolve => require(['../containers/FP'], resolve);
const ChooseProvider = resolve => require(['../containers/ChooseProvider'], resolve);
const Pay = resolve => require(['../containers/Pay'], resolve);
const IOS_Pay = resolve => require(['../containers/Pay/ios_pay'], resolve);
const ShowOrderGoods = resolve => require(['../containers/showOrderGoods'], resolve);
const PaySuccessfully = resolve => require(['../containers/PaySuccessfully'], resolve);
const ImgUpload = resolve => require(['../components/ImgUpload'], resolve);
const PostLogisticsInfo = resolve => require(['../containers/PostLogisticsInfo'], resolve);
const Logistics = resolve => require(['../containers/logisticsDetail'], resolve);
const ch = resolve => require(['../containers/Test'], resolve);
const XieYi = resolve => require(['../containers/xieyi'], resolve);
const Recharge = resolve => require(['../components/Recharge'], resolve);
// const Address = resolve => require(['../containers/Address'], resolve);
// const AddAddress = resolve => require(['../containers/AddAddress'], resolve);
// const EditAddress = resolve => require(['../containers/EditAddress'], resolve);
export const gwRouter = [
    // 重定向至分类页
    {
        path: "/",
        redirect: "/main/classify"
    },
    {
        path: "/confirmorder",
        component: ConfirmOrder
    },
    {
        path: "/confirmvirtualorder",
        component: ConfirmVirtualOrder
    },
    {
        path: "/fp",
        component: FP
    },
    {
        path: "/chooseprovider",
        component: ChooseProvider,
        name: "chooseprovider"
    },
    {
        path: "/pay",
        component: Pay,
        name: "pay"
    },
    {
        path: "/ipay",
        component: IOS_Pay,
        name: "ios_pay"
    },
    {
        path: "/ordergoods",
        component: ShowOrderGoods,
        name: "ordergoods"
    },
    {
        path: "/paysuccessfully",
        component: PaySuccessfully,
        name: "paysuccessfully"
    },
    
    {
        path: "/logistics",
        component: Logistics,
        name: "logistics"
    },
    {
        path: "/postLogisticsInfo",
        component: PostLogisticsInfo,
        name: "postLogisticsInfo"
    },
    {
        path: "/imgUpload",
        component: ImgUpload,
        name: "ImgUpload"
    },
    {
        path: "/xieyi",
        component: XieYi,
        name: "xieyi"
    },
    {
        path: "/Recharge",
        component: Recharge,
        name: "Recharge"
    },
    {
        path: "/ch",
        component: ch,
        name: "ch"
    },
]
export const gwRouterChildren = [
    // {
    //     path:"cart",
    //     component: Cart
    // }
    {
        path: "/cart",
        component: Cart,
        name: "cart"
    }
];
