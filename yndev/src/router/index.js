import Vue from 'vue'
import Router from 'vue-router'
import {gwRouter,gwRouterChildren} from "./gw-router";
import {lhRouter,lhRouterChildren} from "./lh-router";
import {jyRouter,jyRouterChildren} from "./jy-router";
import {xhRouter,xhRouterChildren} from "./xh-router";
import {zxRouter,zxRouterChildren} from "./zx-router";
import {qxzRouter,qxzRouterChildren} from "./qxz-router";
import {hzhRouter,hzhRouterChildren} from "./hzh-router";
import {zwyRouter,zwyRouterChildren} from "./zwy-router";
import {jyyRouter, jyyRouterChildren} from './jyy-router';
// import Main from "../containers/Main"
const Main = resolve => require(['../containers/Main'], resolve);


Vue.use(Router)
let rootRouter = [{
        path: "/main",
        component: Main,
        children: [...lhRouterChildren,...gwRouterChildren,...xhRouterChildren,...jyRouterChildren,...zxRouterChildren,...qxzRouterChildren,...hzhRouterChildren,...zwyRouterChildren,...jyyRouterChildren]
    },
    ...gwRouter,
    ...lhRouter,
    ...jyRouter,
    ...xhRouter,
    ...zxRouter,
    ...qxzRouter,
    ...hzhRouter,
    ...zwyRouter,
    ...jyyRouter
  ]


//此处为公共路由，每个人的路由配置到各自文件中配置
export default new Router({
  routes: rootRouter
  // gwRouter

})
