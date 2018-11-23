// import Detail from "../containers/Detail/index.vue"
const Detail = resolve => require(['../containers/Detail/index.vue'], resolve);
const GroupDetail = resolve => require(['../containers/Detail/GroupGoodDetail.vue'], resolve);
// import SearchBar from "../containers/SearchBar"
const SearchBar = resolve => require(['../containers/SearchBar'], resolve);

// import SearchResult from "../containers/SearchResult"
const SearchResult = resolve => require(['../containers/SearchResult'], resolve);

// import GoodsClassity from "../containers/GoodsClassify"
const GoodsClassity = resolve => require(['../containers/GoodsClassify'], resolve);

// import Collect from "../containers/CollectPage"
const Collect = resolve => require(['../containers/CollectPage'], resolve);

// import Classify from "../containers/Classify"
const Classify = resolve => require(['../containers/Classify'], resolve);

// import SecClassify from "../containers/SecClassify"
const SecClassify = resolve => require(['../containers/SecClassify'], resolve);

const Promotion = resolve => require(['../containers/Promotion'], resolve);

const AfterSale = resolve => require(['../containers/AfterSaleList'], resolve);

const HomeNew = resolve => require(['../containers/HomeNew'], resolve);



const jyRouter = [
  // {
  //   path: "/goodsclass/:code",
  //   component: GoodsClassity
  // },
  {
    path: "/groupDetail/:code",
    component: GroupDetail,
    name: "groupDetail"
  },
  {
    path: "/detail/:code",
    component: Detail,
    name: "goodsDetail"
  },
  {
    path: "/searchbar",
    component: SearchBar

  },
  {
    path: "/searchresult",
    component:   SearchResult

  },
  {
    path: "/collect",
    component: Collect
  },
  {
    path: "/aftersale",
    component: AfterSale
  },
]


const jyRouterChildren = [
  {
    path: "goodsclass/:code",
    component: SecClassify
  },
  {
    path: "classify",
    component: Classify
  },
  {
    path: "promotion",
    component: Promotion
  },
  // {
  //   path: "HomeNew",
  //   component: HomeNew
  // },
]
export  {jyRouter,jyRouterChildren};
