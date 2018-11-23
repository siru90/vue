import api from "../../../api/jyy-api";
import axios from "axios";

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
    },
    actions: {
        getFlowActRule({commit}) {
            let url = window.api.mall_base_host + 'ditionary/ListOld?keyword=PUB_BILL_FLOW&enterpriseid='+window.api.enterpriseId
            const axoption = {
                method: 'get',
                url:url,
            }
            axios(axoption).then(res => {
                let arr = []
                try {
                    arr = res.data.data[0]["PUB_BILL_FLOW"]
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