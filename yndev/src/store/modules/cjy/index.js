// import {
//   queryClassifyList,
//   queryClassifyBanner,
//   addCart,
//   deleCart,
//   updateCart,
//   queryCart,
//   synCart
// } from "../../utils/ReturnAxios"
// import {Toast} from '../../utils/toast'
import axios from "axios"

var shopId = 134
export default {
  namespaced: true,
  state: {
    cartIcon: null,
    userinfo: null,
    login: true,
    classifyList: null,  // 分类信息列表
    classifyIndex: 0, // 分类活动编号
    classifyImageList: null,  // 分类图片
    cartanimateArray: [], // 购物车动画数组
    cartanimateNumber: 0, // 购物车变化数量
    aftrerDiscountMoney: 0,// 优惠后总金额
    discountMoney: 0,// 优惠金额
    obj: {},
    selectLadderList: [],  //阶梯加价增
    selectGiftList: [], // 阶梯赠品
    buyMoreData: [],  // 每满加价增

    orderConfig: {type: 'isPutTimeSort', order: ''},
    allMoreBuy: null, //当前所有可参加 每满加
    allLadderList: null, // 当前所有可参加的阶梯加赠
    allGiftList: [], // 当前所有 可参加 阶梯送礼活动
    cartAddNum: 1,  // 添加动画
    bodyScrollTop: 0, //滚轮高度
    cjyPagePosition: {}, //页面位置
    cartArray: null,
    activeCartList: [],
    checkedCartList: [], //已选商品项目
    pagePosY: 0,// 页面位置
    returnPos: 0,
    isReturn: false,
    pageNum: 1,

  },
  getters: {
    selectGiftList: (state) => {
      var selectGiftList = state.selectGiftList
      var allGiftList = state.allGiftList
      var returnSelectGiftList = selectGiftList.filter((list) => {
        return allGiftList.some((item) => {
          var isSome = item.goodsCode == list.goodsCode && item.promId == list.promId
          if (isSome) {
            list.promCode = item.promCode
          }
          return isSome
        })
      })

      return returnSelectGiftList
    },

    buyMoreData: (state) => {
      var obj = state.allMoreBuy
      var selectLadderList = state.buyMoreData

      var resSelectLadderList = []

      selectLadderList.map((item) => {
        var resgoodsList = obj[item.promId]
        if (resgoodsList) {

          item.goodsList = resgoodsList.goodsList
          item.promCode = resgoodsList.promCode
          resSelectLadderList.push(item)
        }
      })
      return resSelectLadderList
    },
    selectLadderList: (state) => {
      var obj = state.allLadderList
      var selectLadderList = state.selectLadderList

      var resSelectLadderList = []

      selectLadderList.map((item) => {
        var resgoodsList = obj[item.promId]
        if (resgoodsList) {

          item.goodsList = resgoodsList.goodsList
          item.promCode = resgoodsList.promCode
          resSelectLadderList.push(item)
        }
      })
      return resSelectLadderList

    },
    buyMorePrice: (state, getters) => {
      var buyMoreData = getters.buyMoreData
      var allLadderList = getters.selectLadderList
      var price = 0
      if (buyMoreData.length > 0 || allLadderList.length > 0) {
        allLadderList.map((item) => {

          var addMoney = item.addMoney || 0
          price += addMoney
        })
        buyMoreData.map((item) => {
          var addMoney = item.addMoney || 0
          var selectNum = item.selectNum || 0
          price += addMoney * selectNum
        })
      }
      return price

    },
    totalPrice(state)
    {
      var allPrice = 0
      state.checkedCartList.map((item) => {
        var commodityPrice = item.addPrice || 0
        var workingInfo = item.workingInfo ? JSON.parse(item.workingInfo) : {procemoney: 0}
        var procePriceoney = workingInfo.procemoney || 0
        allPrice += (parseFloat(commodityPrice) + parseFloat(procePriceoney)) * (item.goodsNum || 0)
      })
      return allPrice
    }
    ,
    discountMoney(state)
    {
      var discountMoney = state.discountMoney
      return discountMoney
    }
    ,
//商品分类列表
    classifyData(state)
    {
      if (!state.classifyList) {
        return null
      }
      var classifyData = state.classifyList
      var dataList = []
      var obj = {}
      var data = state.classifyList
      //找出所有的一级分类
      var newData = data.filter((item) => {
        return item.level == "1"
      })
      //利用一级分类code 找出所有的二级分类
      newData.forEach(function (item) {
        //将一级分类code保存在变量goodsClassCode中
        var goodsClassCode = item.goodsclasscode
        item.secList = [{
          goodsClassId: item.goodsclassid,
          goodsClassCode: item.goodsclasscode,
          goodsClassName: "全部",
          imgUrl: item.imgurl
        }]
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
      return dataList
    }
    ,
    cartList(state)
    {
      return state.activeCartList
    }
    ,
//商品数量
    cartNum(state)
    {
      var count = 0
      var activeCartList = state.activeCartList
      if (state.activeCartList) {
        // var list = state.activeCartList
        // list.map((item) => {
        //   count += item.goodsNum
        // })
        count = activeCartList.length
        return count
      }
      return 0
    }
  },

  actions: {


    async
    queryClassifyList({commit}, data)
    { // 获取分类数据
      var res = await
        queryClassifyList()
      res = res.data
      commit('QUERY_CLASSIFY_LIST', res)
    }
    ,
    async
    queryClassifyBanner({commit}, data)
    {// 获取分类banner图
      try {
        var res = await
          queryClassifyBanner()
        res = res.data
        commit('QUERY_CLASSIFY_Banner', res)
      } catch (erro) {
        Toast({
          message: '网络异常',
          type: 'fail'
        })
      }
    }
    ,
    //合并购物车
    async
    synCart({dispatch})
    {
      var res = await
        synCart()
      res = res.data
      if (res.returnCode) {
        dispatch('queryCart')
      }
    }
    ,
    //获得购物车数量
    async
    queryCart({commit})
    {
      commit('CLEAR_CART')
      try {
        var res = await
          queryCart()
        res = res.data
        commit('QUERY_CART', res)
      } catch (err) {
        Toast({
          message: '网络异常',
          type: 'fail'
        })
      }
    }
    ,
    // 添加到购物车
    async
    addShoppingCart({commit}, config)
    {
      // try {
      var res = await
        addCart(config)
      res = res.data
      if (res.returnCode == 0) {
        Toast({
          message: res.msg,
          type: 'fail'
        })
        return
      }
      // UPDATA_CART
      commit("QUERY_CART", res)


    }
    ,
    //更新购物车数量
    async
    updataCart({commit}, config)
    {
      try {
        var res = await
          updateCart(config)
        res = res.data
        if (res.returncode == 0 || res.returnCode == 0) {
          Toast({
            message: res.msg,
            type: 'fail'
          })
        }
        commit("UPDATA_CART", res)
      } catch (err) {
        Toast({
          message: '网络异常',
          type: 'fail'
        })
      }
    }
    ,
    // 从购物车中删除
    async
    deleCart({commit}, config)
    {
      var ids = []
      config.shoppingCartList.map((item) => {
        ids.push(item.rid)
      })
      ids = ids.join(',')
      try {
        var res = await
          deleCart(ids)
        res = res.data
        var shoppingCartList = config.shoppingCartList
        commit("DELE_CART", shoppingCartList)
      } catch (err) {
        Toast({
          message: '网络异常',
          type: 'fail'
        })
      }
    }
    ,
    //+++++
    changeClassifyIndex({commit}, index)
    { // 更改当前页面的index
      commit('CHANGE_CLASSIFY_INDEX', index)
    }
    ,
    //购物车动画
    addCartAnimate({commit}, num)
    {
      commit("ADD_CART_ANIMATE", num)
    }
    ,
  }
  ,
  mutations: {

    CHANGE_ORDER_CONFIG (state, data) {
      if (data) {
        state.orderConfig = data
      } else {
        state.orderConfig = {type: 'isPutTimeSort', order: ''}
      }
    },
    //清除购物相关数据
    CLEAR_CART(state, data)
    {
      state.cartArray = null
      state.activeCartList = []
    }
    ,
    //将分类列表数据添加到classifyIndex
    QUERY_CLASSIFY_LIST(state, res)
    {
      if (!state.classifyList) {
        state.classifyList = res.data[0]
      }

    }
    ,
    //将分类banner图添加到变量classifImageList
    QUERY_CLASSIFY_Banner(state, res)
    {
      state.classifyImageList = res.data[0]
    }
    ,
    // 将当前页面的index传给activeIndex
    CHANGE_CLASSIFY_INDEX(state, index)
    {
      state.classifyIndex = index
    }
    ,
    //获取购物车的数据
    QUERY_CART(state, data)
    {
      state.cartArray = data.data
      var shopId = localStorage.getItem('shopId')
      var activeCart = state.cartArray.find((item) => {
        return shopId == parseInt(item.storeCode)
      })
      if (activeCart) {
        state.activeCartList = activeCart.shoppingCartLists
      }
      else {
        state.activeCartList = []
      }
    }
    ,
    // 从购物车列表中更新数据
    UPDATA_CART(state, data)
    {
      data.data.map((newData) => {
        var goodsId = newData.goodsId
        var isInCheckedCartLis
        var oldDataIndex = state.activeCartList.findIndex(
          (item) => {
            return item.goodsId == goodsId
          }
        )
        if (oldDataIndex !== -1) {
          var oldData = state.activeCartList[oldDataIndex]
          oldData.goodsNum = newData.goodsNum || oldData.goodsNum
          oldData.serve = newData.serve
          oldData.preorder = newData.preorder
          state.activeCartList.splice(oldDataIndex, 1, oldData)

        } else {
          state.activeCartList.push(newData)
        }

        if ((/\/cart$/gi).test(window.location.hash)) {
          return
        }
        isInCheckedCartLis = state.checkedCartList.find((item) => {
          return item.goodsId == goodsId
        })
        if (!isInCheckedCartLis) {
          state.checkedCartList.push(newData)
        }
      })
    }
    ,

    CHANGE_ALL_CHECKED(state, data)
    {
      state.activeCartList.map((item, index) => {
        item.preorder = data
        state.activeCartList.splice(index, 1, item)
      })
    }
    ,
    CHANGE_CHECKED(state, data)
    {
      var goodsId = data.goodsId
      var findIndex = state.activeCartList.findIndex((item) => {
        return item.goodsId == goodsId
      })
      if (findIndex != -1) {
        var item = state.activeCartList[findIndex]
        item.preorder = data.isChecked
        state.activeCartList.splice(findIndex, 1, item)
      }


    }
    ,
    // 从购物车列表中删除
    DELE_CART(state, data)
    {
      var cartList = state.activeCartList

      data.map(
        (item) => {
          for (var i = 0; cartList.length; i++) {
            if (cartList[i].rid == item.rid) {
              cartList.splice(i, 1)
              break
            }
          }
        }
      )
      state.activeCartList = cartList
    }
    ,
    CHANGE_CHECKED_CART_LIST(state, data)
    {
      state.checkedCartList = data
    }
    ,
    //添加购物车动画
    ADD_CART_ANIMATE(state, num = 1)
    {
      state.cartAddNum = num
      state.cartanimateArray.push(state.cartanimateNumber++)
      setTimeout(() => {
        state.cartanimateArray.shift()
      }, 600)
    }
    ,
    SET_CART_ICON(state, data)
    {
      state.cartIcon = data
    }
    ,
    CHANGE_PAGE_POS_Y(state, data)
    {
      state.pagePosY = data
    }
    ,
    CHANGE_PAGE_NUM(state, data)
    {
      state.pageNum = data
    }
    ,
    SET_RETURN_POS(state, data)
    {
      state.returnPos = data


    }
    ,
    SET_IS_RETURN(state, data)
    {
      state.isReturn = data
    }
    ,
    CHANGE_DISCOUNT_MONEY(state, data)
    {
      state.discountMoney = data || 0
    }
    ,
    // 改变已优惠价格 和 优惠后的价格
    INIT_PRICE (state, data) {
      state.aftrerDiscountMoney = data.aftrerDiscountMoney
      state.discountMoney = data.discountMoney
    },

    // 改变已选择的满赠 阶梯加赠
    CHANGE_SELECT_BUY_MORE_LIST: (state, data) => {
      var selectGiftList = state.selectGiftList
      var promId = data.promId
      var selecIndex = selectGiftList.findIndex((item) => {
        return promId == item.promId
      })
      if (selecIndex != -1) {
        selectGiftList.splice(selecIndex, 1, data)
      } else {
        selectGiftList.push(data)
      }
      state.selectGiftList = selectGiftList
    },
    //替换已选择的满赠 赠品列表
    SPLICE_SELECT_BUY_MORE_LIST: (state, data) => {
      var selectGiftList = state.selectGiftList
      var promId = data.promId
      var goodsCode = data.goodsCode
      var selecIndex = selectGiftList.findIndex((item) => {
        return promId == item.promId && goodsCode == item.goodsCode
      })
      if (selecIndex != -1) {
        selectGiftList.splice(selecIndex, 1)
      }
      state.selectGiftList = selectGiftList
    },


    // 改变已选择的返利 赠品
    CHANGE_SELECT_LADDER_LIST: (state, data) => {
      var selectLadderList = state.selectLadderList
      var promId = data.promId
      var goodsCode = data.goodsCode
      var selecIndex = selectLadderList.findIndex((item) => {
        return promId == item.promId && item.goodsCode == goodsCode
      })
      if (selecIndex != -1) {
        selectLadderList.splice(selecIndex, 1, data)
      } else {
        selectLadderList.push(data)
      }
      state.selectLadderList = selectLadderList
    },
    //替换已选择的返利加赠列表
    SPLICE_SELECT_LADDER_LIST: (state, data) => {
      var selectLadderList = state.selectLadderList
      var promId = data

      var selecIndex = selectLadderList.findIndex((item) => {
        return promId == item.promId
      })
      if (selecIndex != -1) {
        selectLadderList.splice(selecIndex, 1)
      }
      state.selectLadderList = selectLadderList
    },

    CHANGE_BUY_MORE_LIST (state, data) {
      var buyMoreData = state.buyMoreData
      var promId = data.promId
      var selecIndex = buyMoreData.findIndex((item) => {
        return promId == item.promId
      })
      if (selecIndex != -1) {
        // buyMoreData[selecIndex].selectNum = data.selectNum
        buyMoreData.splice(selecIndex, 1, data)
      } else {
        buyMoreData.push(data)
      }
      state.buyMoreData = buyMoreData
    },

    INIT_PRODVO_LIST (state, data) {
      var eachEnougts = []
      var multisteps = []
      var allLadderList
      var allMoreBuy
      var obj = {}
      var objBuyMore = {}
      var arrayGift = []
      for (var list of data) {
        var goodsCode = list.goodsCode
        {
          var leaderList = list.promotionalVoListOK.filter((item) => {
            return item.saleType == 'rebate' && item.prefWay == 3
          })

          var tt = leaderList.map((item) => {
            var promId = item.promId
            var promCode = item.promCode
            if (!obj[promId]) {
              obj[promId] = {
                goodsList: [goodsCode],
                promCode
              }
            }
            else {
              obj[promId].goodsList.push(goodsCode)
            }
          })
        }

        {
          var giftList = list.promotionalVoListOK.filter((item) => {
            return item.saleType == 'rebate' && (item.prefWay == 2 || item.prefWay == 1 )
          })

          giftList.map((item) => {
            var promId = item.promId
            var promCode = item.promCode
            if (!objBuyMore[promId]) {
              objBuyMore[promId] = {
                goodsList: [goodsCode],
                promCode
              }
            }
            else {

              objBuyMore[promId].goodsList.push(goodsCode)
            }
          })
        }

        {
          list.promotionalVoListOK.map((item) => {
            if (item.saleType == 'buyPresent' && item.prefWay == 3) {
              arrayGift.push({
                goodsCode: goodsCode,
                promId: item.promId,
                promCode: item.promCode,
                promotLadderVOList: item.promotLadderVOList
              })
            }

          })
        }


      }
      state.allMoreBuy = objBuyMore
      state.allLadderList = obj
      state.allGiftList = arrayGift
    },


    changeCheckedCartList(state, data)
    {
      state.checkedCartList = data;
    }
    ,

  }

}
