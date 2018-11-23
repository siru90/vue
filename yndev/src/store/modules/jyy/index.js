import api from "../../../api/jyy-api";
import axios from "axios";
import {showLoading, hideLoading} from "../../../utils/loading";
import { getVipClub,getClubPWay,getVipClubStarsPs,getVipClubIntroduction,saveVipClubP,getServicersList } from './http'
// 请求分类配置数据
function queryCate() {
    return axios.post(window.api.local_host + '/resourceLevel/resourceLevelListH5', {
        enterpriseId: window.api.enterpriseId,
        relPosition: 'MallNavigation'
    })
}

// 请求erp分类接口
function queryErpCate() {
    return axios.get(window.api.mall_goods_host + 'goodsclass/getgoodsclasslist?enterpriseid=' + window.api.enterpriseId)
}

export default {
    
    namespaced: true,
    state: {
        serviceType: 1,
        isFirstFromAppToAddWb:true, //控制只有第一次从app跳转进入新增维保详情才显示url的服务商
        wbAdData: null,           //维保推广广告
        newHomeWbData:{
            img:{},
            prodList:[]
        },       //首页维保数据
        guessYouLikeList: [],   //猜你喜欢数据
        hotSalesList: [],       //热销数据
        checkTruthResult: "",   //用于传递跨域请求尔德的html字符串
        newHomeMidAd: {},       //中部广告
        newHomeXpAdList:[],     //象谱服务列表
        noticeContent:"",       //通知内容
        homeClassList: [1,2,3,4,5,6,7,8,9], //首页分类数据
        showFlowAct: true,
        flowActRule: [],
        wbOrderData:{},
        wbxfListScrollTop: 0,   //用于记录维保列表滚动距离
        wbNoticeScrollTop: 0,   //记录维保提醒滚动距离
        userVipMsg:{},          //用户会员信息
        vipExpMethods: [],     //会员获取P值途径
        vipClubStarsPs: [],     //会员等级对照表
        vipLevelRule: {
            wordDir: {},
            pTable:[],
            levelPTable:[]
        },     
        sureServiceData:{},
        servicersList: [],
        // 维保先锋选择车辆
        selectCar:{},                 
    },
    actions: {
        saveServiceType({commit}, n) {
            commit("SAVESERVICETYPE", n)
        },
        setFirstFromAppToAddWb({commit}) {
            commit("SETFIRSTFROMAPPTOADDWB")
        },
        async getWbAdData({commit}) {
            if (this.state.jyy.wbAdData) {
                return
            }
            const url = window.api.local_host + api.getNewHomeData
            try {
                const res = await axios.get(url + '?advertisementPosition=3&enterpriseId=138')
                const wbAd = res.data.data[0]
                commit("SETWBADDATA", wbAd)
            } catch (error) {
                console.log("获取维保推广信息失败")
            }
            
            // axios({
            //     url: url + '?advertisementPosition=3&enterpriseId=138',
            //     // headers: {
            //     //     sessionId: sessionId
            //     // }
            // }).then(res => {
            //     let wbAd = {}
            //     try {
            //         wbAd = res.data.data[0]
            //     } catch (error) {
                    
            //     }
            //     commit("SETWBADDATA", wbAd)
            // }).catch(e => {
            //     console.log("获取维保推广信息失败")
            //     console.log(e)
            // })
        },
        getNewHomeWbData({commit}) {
            axios({
                url: window.api.local_host + "/resourceLevel/queryResLevelModelByRel/CombinedGood?enterpriseId="+window.api.enterpriseId,
                method: "get"
            })
            .then(res => {
            
                if (res.data.returnCode == 0) {
                    Toast({
                        duration: 1000,
                        message: "获取维保先锋数据失败",
                        iconClass: "aui-iconfont aui-icon-warn"
                    });
                    return
                }
                try {
                    const dataDetail = res.data.data[0]
                    commit("SETNEWHOMEWBIMG",dataDetail.Img)
                    commit("SETNEWHOMEWBGOODSLIST",dataDetail.prodList)
                } catch (error) {
                    Toast({
                        duration: 1000,
                        message: "获取维保先锋数据失败",
                        iconClass: "aui-iconfont aui-icon-warn"
                    });
                }
                // let list = res.data.data[0][0]
                // // 升序排序
                // list.sort(function(a,b) {
                //     return a.starsNum - b.starsNum
                // })
                // commit("SETVIPCLUBSTARSPS", res.data.data[0][0])
            })
            .catch(e => {
                Toast({
                    duration: 1000,
                    message: "获取维保先锋数据失败",
                    iconClass: "aui-iconfont aui-icon-warn"
                });
            })
        },
        selectCarItem({commit},msg) {
            commit("SELECTCAR",msg)
        },
        // 获取服务商列表
        async getServicersList({commit}) {
            
            showLoading()
            try {
                const res = await getServicersList()
                hideLoading()
                if (res.data.returncode != 1) {
                    this.ToastErr("获取服务商列表失败！")
                    return
                }
                const servicersList = res.data.data
                commit("SETSERVICERLIST",servicersList)
            } catch (error) {
                hideLoading()
                this.ToastErr()
            }
        },
        // 选择服务商
        checkService({commit},service) {
            commit("SAVESERVICE",service)
        },
        // 签到保存P值
        saveVipClubP({commit},tasktpye) {
            saveVipClubP(tasktpye)
            .then(res => {
                if (res.data.returnCode == 0) {
                    console.log("签到保存P值失败")
                }
            })
            .catch(e => {
                console.log("签到保存P值失败")
            })
        },
        getVipClubStarsPs({commit}) {
            getVipClubStarsPs()
            .then(res => {
                if (res.data.returnCode == 0) {
                    Toast({
                        duration: 1000,
                        message: "获取会员等级规则失败！",
                        iconClass: "aui-iconfont aui-icon-warn"
                    });
                    return
                }
                let list = res.data.data[0][0]
                // 升序排序
                list.sort(function(a,b) {
                    return a.starsNum - b.starsNum
                })
                commit("SETVIPCLUBSTARSPS", res.data.data[0][0])
            })
            .catch(e => {
                Toast({
                    duration: 1000,
                    message: "获取会员等级规则失败！",
                    iconClass: "aui-iconfont aui-icon-warn"
                });
            })
        },
        getVipLevelRule({commit}) {
            // 缓存
            const oldData = this.state.jyy.vipLevelRule.wordDir
            if (oldData.wordDir && oldData.pTable.length > 0 && oldData.levelPTable.length > 0) {
                return
            }

            getVipClubIntroduction()
            .then(res => {
                if (res.data.returnCode == 0) {
                    Toast({
                        duration: 1000,
                        message: "获取会员等级规则失败！",
                        iconClass: "aui-iconfont aui-icon-warn"
                    });
                    return
                }
                let obj = {
                    wordDir: res.data.data[0][0],
                    pTable: this.state.jyy.vipExpMethods,
                    levelPTable: this.state.jyy.vipClubStarsPs
                }
                commit("SETVIPLEVELRULE",obj)
            })
            .catch(e => {
                Toast({
                    duration: 1000,
                    message: "获取会员等级规则失败！",
                    iconClass: "aui-iconfont aui-icon-warn"
                });
            })

        },
        async getVipExpMethods({commit}) {
            // 非重要提示，缓存
            if (this.state.jyy.vipExpMethods.length > 0) {
                return
            }
            try {
                const res = await getClubPWay()
                if (res.data.returnCode == 0) {
                    Toast({
                        duration: 1000,
                        message: "获取会员信息失败！",
                        iconClass: "aui-iconfont aui-icon-warn"
                    });
                    return
                }
                commit("SETGETVIPEXPMETHODS",res.data.data[0][0])
            } catch (error) {
                Toast({
                    duration: 1000,
                    message: "获取会员信息失败！",
                    iconClass: "aui-iconfont aui-icon-warn"
                });
            }
        },
        getUserVipMsg({commit}) {
            getVipClub().then(res => {
                if (res.data.returnCode == 0) {
                    Toast({
                        duration: 1000,
                        message: "获取会员信息失败！",
                        iconClass: "aui-iconfont aui-icon-warn"
                    });
                    return
                }
                commit("SETUSERVIPMSG",res.data.data[0][0])
            }).catch(e => {
                Toast({
                    duration: 1000,
                    message: "获取会员信息失败！",
                    iconClass: "aui-iconfont aui-icon-warn"
                });
            })
            let msg = {
                starsNum: 1,
                vipId: "123412",
                starsName: "一星会员",
                pValue: 100,
                pBeginValue: 0,
                pEndValue: 100
            }
            
        },
        initScrollTop({commit}) {
            commit("INITSCROLLTOP")
        },
        setWbNoticeScrollTop({commit},num) {
            commit("SETWBNOTICESCROLLTOP",num)
        },
        setWbxfLsitScrollTop({commit},num) {
            commit("SETWBLISTSCROLLTOP",num)
        },
        getFlowActRule({commit}) {
            //let url = window.api.mall_base_host + 'ditionary/ListOld?keyword=PUB_BILL_FLOW&enterpriseid='+window.api.enterpriseId
            let url = window.api.mall_sale_host + 'spSaCampaign/getCampaignListForMall?enterpriseid=' + window.api.enterpriseId
            const axoption = {
                method: 'get',
                url:url,
            }
            axios(axoption).then(res => {
                let arr = []
                try {
                    arr = res.data.data[0].rules
                } catch (e) {
                    
                }
                commit("SETFLOWACTRULE",arr)
            }).catch(err => {
                console.log(err)
				})
        },
        async refreshHomeData({commit}) {
            await Promise.all([
                this.dispatch("jyy/getXpServerData"),
                this.dispatch("jyy/getNewHomeData"),
                this.dispatch("jyy/getGuessYouLikeList"),
                this.dispatch("jyy/getHotSalesList"),
            ])
            return true
        },
        setNoticeContent({commit},data) {
            commit("SETNOTICECONTENT",data)
        },
        getXpServerData({commit}) {
            const sessionId = localStorage.getItem("sessionId")
            const url = window.api.local_host + api.getNewHomeData
            return axios({
                url: url + '?advertisementPosition=2&enterpriseId=138',
                // headers: {
                //     sessionId: sessionId
                // }
            }).then(res => {
                let newHomeXpAdList = {}
                try {
                    newHomeXpAdList = res.data.data[0]
                } catch (error) {
                    
                }
                commit("SETXPSERVERS", newHomeXpAdList)
            }).catch(e => {
                console.log("获取象谱服务信息失败")
                console.log(e)
            })

        },
        getNewHomeData({commit}) {
            const sessionId = localStorage.getItem("sessionId")
            const url = window.api.local_host + api.getNewHomeData
            return axios({
                url: url + '?advertisementPosition=1&enterpriseId=138',
                // headers: {
                //     sessionId: sessionId
                // }
            }).then(res => {
                let midResult = {}
                try {
                    midResult = res.data.data[0]
                } catch (error) {
                    
                }
                commit("SETMIDAD",midResult)

            }).catch(e => {
                console.log("获取首页信息失败")
                console.log(e)
            })
        },
        getGuessYouLikeList({commit}){
            const sessionId = localStorage.getItem('sessionId')
            const url = window.api.local_host + api.guessYouLikeListAndHotSales
            return axios({
                url: url + '?allocationType=2&enterpriseId=138',
                method: 'get',
                // headers: {
                //     sessionId: sessionId
                // }
            }).then((res) => {
                if (res.data.returnCode === 1) {
                    commit("SETGUESSYOULIKE",res.data.data)
                } else {
                    console.log("获取猜你喜欢列表失败")
                }
            }).catch(e => {
                console.log("获取猜你喜欢列表失败")
            })
        },
        getHotSalesList({commit}) {
            const sessionId = localStorage.getItem('sessionId')
            const url = window.api.local_host + api.guessYouLikeListAndHotSales
            return axios({
                url: url + '?allocationType=1&enterpriseId=138',
                method: 'get',
                // headers: {
                //     sessionId: sessionId
                // }
            }).then((res) => {
                if (res.data.returnCode === 1) {
                    commit("SETHOTSALES",res.data.data)
                } else {
                    console.log("获取猜你喜欢列表失败")
                }
            }).catch(e => {
                console.log("获取猜你喜欢列表失败")
            })
        },
        setCheckTruthResult({commit}, result) {
            commit("SETCHECKRESULT", result)
        },
        getHomeClassList({commit}) {
            if (this.state.jyy.homeClassList[0] !== 1) {
                return
            }
            axios.all([queryCate(), queryErpCate()]).then((axios.spread((res, erpRes) => {
                let cateConfig = res.data.data[0]
                let cateList = erpRes.data.data[0]
                cateList.sort(function(a,b) {
                    return a.seq - b.seq
                })
                this.state.cateList = cateList
                cateConfig && cateConfig.map((item, index) => {
                    if (item.promotionType == 3) {
                    cateList && cateList.map((val) => {
                        if (val.goodsclasscode == item.title) {
                        item.classificationId = val.goodsclasscode
                        item.title = val.goodsclassname
                        item.image = val.imgurl
                        return
                        }
                    })
                    }
                })
                commit("SETHOMECLASSLIST", cateConfig)
                })))
            
        },
        setWbOrderData({commit},data) {
            commit("SETWBORDERDATA",data)
        },
    },
    mutations: {
        SAVESERVICETYPE(state, n) {
            state.serviceType = n
        },
        SETFIRSTFROMAPPTOADDWB(state) {
            state.isFirstFromAppToAddWb = false
        },
        SETWBADDATA(state,wbdata) {
            state.wbAdData = wbdata
        },
        SETNEWHOMEWBIMG(state,imgData) {
            if (imgData === undefined) {
                imgData = {}
            }
            state.newHomeWbData.img = imgData
        },
        SETNEWHOMEWBGOODSLIST(state,goodsList) {
            if (goodsList === undefined) {
                goodsList = []
            }
            state.newHomeWbData.prodList = goodsList
        },
        SELECTCAR(state,msg) {
            state.selectCar = msg
        },
        SETSERVICERLIST(state,servicerList) {
            state.servicersList = servicerList
        },
        SAVESERVICE(state,service) {
            state.sureServiceData = service
        },
        SETVIPCLUBSTARSPS(state, data) {
            state.vipClubStarsPs = data
        },
        SETVIPLEVELRULE(state,data) {
            state.vipLevelRule = data
        },
        SETGETVIPEXPMETHODS(state,data) {
            state.vipExpMethods = data
        },
        SETUSERVIPMSG(state,msg) {
            state.userVipMsg = msg
        },
        INITSCROLLTOP(state) {
            state.wbxfListScrollTop = 0
            state.wbNoticeScrollTop = 0
        },
        SETWBNOTICESCROLLTOP(state,num) {
            state.wbNoticeScrollTop = num
        },
        SETWBLISTSCROLLTOP(state,num) {
            state.wbxfListScrollTop = num
        },
        SETWBORDERDATA(state,data) {
            state.wbOrderData = data
        },
        SETFLOWACTRULE(state, list) {
       
            state.flowActRule = list
        },
        SETHOMECLASSLIST(state,list) {
            state.homeClassList = list
        },
        SETGUESSYOULIKE(state, list) {
            state.guessYouLikeList = list
        },
        SETHOTSALES(state, list) {
            
            state.hotSalesList = list
        },
        SETCHECKRESULT(state, result) {
            state.checkTruthResult = result
        },
        SETMIDAD(state, data) {
            state.newHomeMidAd = data
        },
        SETXPSERVERS(state, data) {
            state.newHomeXpAdList = data
        },
        SETNOTICECONTENT(state, data) {
            state.noticeContent = data
        }
    }
}