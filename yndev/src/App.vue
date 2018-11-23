<template>
  <div id="app">
    <router-view></router-view>
    <button-to-top v-if="elements" :elements="elements"></button-to-top>
  </div>
</template>


<script>


  import getCartData from "./utils/getCartData";
  import getUserInfo from "./utils/getUserInfo";
  import * as types from "./store/modules/gw-modules/mutation-types";
  import {mapGetters, mapMutations, mapActions} from "vuex";
  // import {Toast} from "mint-ui";
  import ButtonToTop from "./components/ButtonToTop"
  import axios from 'axios'
  import api from './api/'
  import {setStore} from './components/config/session.js'
  import {getUserInfoAgain} from './components/config/getData.js'
  import {Toast} from "./utils/toast2";
  // import vConsole from "../static/script/vconsole.min.js"
  export default {
    name: 'app',
    data() {
      return {
        isShow: false,
        elements:false
      }
    },
    async created () {
      this.elements = document.body
      await this.getUserInfo();
      await this.initData();
      //初始化购物车操作
      this.initCart();
    },
    mounted() {
      // this.$store.dispatch("gwModules/queryRechargeInfo");
      // console.log("用户中心的用户信息打印结果：", testData);
    },
    components: {
      ButtonToTop
    }
    ,
    computed: {
      ...mapGetters("xhModules", [
        "sessionId"
      ]),
    },
    methods: {
      ...mapActions('xhModules', [
        'getUserInfo'
      ])
      ,
      ...mapMutations("gwModules", [
        types.CART_ARRAY_CHANGE,
        types.CART_NUM_CHANGE
      ]),
      ...mapMutations("xhModules", [
        "USER_INFO",
        "LOGO_IN",
        "RECORD_SESSIONID",
        "LOGO_OUT",
        "ClEAR_SESSIONID",
        "CLEAR_INFO",

      ]),
      async initData() {
        //框架未登录时，商城也要保持一致;
          if(location.href.search(/actId/) != -1){
            this.ClEAR_SESSIONID('sessionId');
            this.LOGO_OUT(false);
            this.CLEAR_INFO(null);
            return
          }
        if (this.sessionId === 'null' || this.sessionId === 'undefined' || !this.sessionId) {
          return
        };
        //通过象谱账号登录后，再请求翌能账号的sessionId;
        let date = new Date().getTime();
        let sess = window.localStorage.getItem('sessionId');
        let request_data = {
          url: window.api.local_host + '/user/accessLogin?eid='+window.api.enterpriseId+'&token=' + new Date().getTime(),
          headers: {'sessionId': this.sessionId, 'Content-Type': 'application/json'}
        }
        let request = await axios(request_data);
        if (request.returncode == 0) {
          // Toast({
          //   message: request.errmsg,
          //   iconClass:"aui-iconfont aui-icon-close",
          //   duration: 500
          // })
          return
        }
        this.RECORD_SESSIONID(request.data.data[0]);
        let response = await getUserInfoAgain(this.sessionId);

        if (response.returncode === 0) {

          this.LOGO_OUT(false);
          return
        }

        this.LOGO_IN(true);
        this.USER_INFO(response.data[0]);
        window.phone = response.data[0].phone;
        console.log('app',1);
      }
      ,
      //初始化购物车数据
      initCart() {
        //请求成功的回调
        let callback = (cartList) => {
          //更新vuex的购物车列表
          this[types.CART_ARRAY_CHANGE](cartList);
          //更新购物车全局数量
          this[types.CART_NUM_CHANGE](cartList.length);
        }
        //请求失败的回调
        let errorFn = (err) => {
          //更新vuex的购物车列表
          this[types.CART_ARRAY_CHANGE]([]);
          //更新购物车全局数量
          this[types.CART_NUM_CHANGE](0);
          //显示购物车数据刷新失败
        }
        getCartData(callback, errorFn);
      },
      //初始化登录状态
      initSessionId() {
        if (this.sessionId) {
          localStorage.setItem("sessionId", this.sessionId);
        }
      },
      //初始化userInfo
      initUserInfo() {
        let callback = data => {
          //   console.log("这是初始化用户信息", data);
          this.USER_INFO(data);
        }
        getUserInfo(callback);
      }
    },

  }
</script>

<style>
  .mint-indicator {
    z-index: 10000;
    position: relative;
  }

  .mint-toast-text {
    font-size: 18px;
    padding-top: 20px !important;
  }

  html, body{
    width: 100%;
    height: 100%;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  .vue_app{
    width:100%;
  }
  .cjy-everypage-enter-active, .cjy-everypage-leave-active{
    transition: 1s;
  }
  .cjy-everypage-enter{
    transform: translate(100%);
  }
  .cjy-everypage-leave-to{
    transform: translate(-100%);
  }
  /* toast弹出框样式开始 */
	.m-toast {
		background: rgba(255, 255, 255, 1);
		border-radius: 0.25rem;
		color: #000000;
		position: fixed;
		z-index: 999;
		top: 50%;
		left: 50%;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    padding: 0.5rem 0.75rem;
    transform: translate(-50%, -40%);
		max-width: 9rem;
	}
	.m-toast i {
		font-size: 1.2rem;
	}
	.m-toast i.nj-tishi {
		color: #f29f00;
	}
	.m-toast i.nj-chenggong {
		color: green;
	}
	.m-toast i.nj-shibai {
		color: #c90000;
	}

  #confirm, #to_settlement {
    background: #920000 !important;
  }
  .aui-bar-nav .aui-pull-right {
    margin-top: 0
  }
  .singerLine {
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  /* 解决mint-ui余picker两个库冲突 */
  .mint-datetime .picker.mint-datetime-picker {
    display: block;
    position: initial;
  }
</style>
