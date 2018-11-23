import axios from 'axios'
import API  from '../../utils/url-router'
import {showLoading, hideLoading} from "../../utils/loading";

// {classList, H5_HOST_URL, queryClassifyPic}
// var ERP_HOST_40884 = "http://116.10.197.134:40884"


export default {
  state: {
    userinfo: null,
    login: true,
    classifyList: null,
    classifyIndex: 0,
    classifyImageList: null,
    cartanimateArray: [],
    cartanimateNumber: 0,
    cartAddNum: 1,
    bodyScrollTop: 0,
    cjyPagePosition:{}
  },
  actions: {
    //获取商品详情
    getDetailInfor({commit}, goodsId){
      var api = API()
      axios.get(api.H5_HOST_URL + getGoodsInfor + "goodsid" + goodsId).then((data) => {
        }
      )
    },
    //获取商品分类列表
    getClassifyList ({commit}) {
      var api = API()
      if (this.state.jyModules.classifyList) {
        return
      }
      if (this.state.cateList) {
        commit("GET_CLASSIFY_LIST", this.state.cateList)
        return
      }
      showLoading()
      axios.get(api.classList).then((data) => {
        var realData = data.data.data[0]
        commit("GET_CLASSIFY_LIST", realData)
        hideLoading()
      }).catch(e=>{ hideLoading() })
    },
    // 改变Index
    changeClassifyIndex({commit}, index){
      
      commit("CHANGE_CLASSIFY_INDEX", index)
    },
    // 添加商品动画
    addCartAnimate ({commit}, num){
      commit("ADD_CART_ANIMATE", num)
    },
    getCollectData (store) {

    },

    getClassImage ({commit}) {
      var api = API()
      axios({
        url: api.queryClassifyPic,
        method: "post",
        data: {
          "enterpriseId": api.enterpriseId,
          "pc": false
        }
      }).then((data) => {
        var data = data.data.data[0]
        commit("GET_CLASS_IMAGE", data)
      })
    },
    getSecbanners ({commit}, label) {
      var api = API()
      axios.post(api.H5_HOST_URL + '/resourceLevel/resourceLevelListH5', {
        enterpriseId: api.enterpriseId,
        relPosition: label + 'Sec'
      }).then((data) => {
        var data = data.data.data
        // commit("GET_SEC_BANNERS", data)
      })
    },
    //保存页面位置
    savePagePosition ({commit}, positionInfor) {
      commit("SEAVE_PAGE_POSITION", positionInfor)
    },
    //传递滚动位置
    changeScrollTop ({commit}, scrollTop) {
      commit("CHANGE_SCROLL_TOP", scrollTop)
    },
    swiperReturnItem ({commit}, item) {
      commit("SWIPER_RETURN_ITEM")
    }
  },
  mutations: {
    CHANGE_SCROLL_TOP (state, scrollTop) {
      var scrollTop = document.body.scrollTop
      state.bodyScrollTop = scrollTop
    },
    CHANGE_CLASSIFY_INDEX (state, index) {
      state.classifyIndex = index
    },
    GET_DETAIL_INFOR(state, info) {
      state.userinfo = info;
      state.login = true;
      setStore('user_id', info.user_id);
    },
    ADD_CART_ANIMATE(state, num = 1){
      state.cartAddNum = num
      state.cartanimateArray.push(state.cartanimateNumber++)
      setTimeout(() => {
        state.cartanimateArray.shift()
      }, 600)
    },
    GET_CLASS_IMAGE (state, data) {
      state.classifyImageList = data
    },
    GET_CLASSIFY_LIST (state, data) {
      var dataList = []
      var obj = {}
      //找出所有的一级分类
      var newData = data.filter((item) => {
        return item.level == "1"
      })
      //利用一级分类code 找出所有的二级分类
      newData.forEach(function (item) {
        //将一级分类code保存在变量goodsClassCode中
        var goodsClassCode = item.goodsclasscode
        item.secList = [{goodsClassId: item.goodsclassid, goodsClassName: "全部", imgUrl: item.imgurl}]
        // 遍历分类列表寻找每一个一级分类下对应的二级分类并保存
        data.map((ele, index) => {
          if (ele.parentclasscode == goodsClassCode) {
            item.secList.push({
              goodsClassCode: ele.goodsclasscode,
              goodsClassId: ele.goodsclassid,
              goodsClassName: ele.goodsclassname,
              imgUrl: ele.imgurl
            })
          }
        })
        dataList.push(item)
      })
      state.classifyList = dataList

    },

    SEAVE_PAGE_POSITION(state, pagePosition) {
       state.cjyPagePosition[pagePosition.pageName] = [pagePosition]
    },
    SWIPER_RETURN_ITEM (state, swiperItem) {
      state.swiperItem = swiperItem
    },

  }
}


