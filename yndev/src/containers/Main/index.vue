<template>
  <div style="height:100%">
    <div
      style="width: 100%;height: 100vh; display: none; z-index: 1000; position: fixed; background-color: black;opacity:0.05;left: -100%;top:0px"
      class="side-nav-bottom" @click="hideAside()">
    </div>
    <aside style="z-index: 1001;left: -100%"
           class="side-nav sweep-nav primary-background-color color-tertiary-font-color" role="navigation">
      <header class="header">
        <div class="account-box" aria-label="Account" role="region" @click="isLogin()">
          <div id="draw-bg" class="info primary-background-color">
            <div class="thumb" data-status="online">
              <div style="overflow: inherit;" class="avatar">
                <!--to="/main/profile"-->
                <div v-if="userInfo && userInfo.vipheadphoto" tag="div" style="width: 100%;height: 100%;-webkit-background-size:cover;background-size: cover;background-position: center;"
                     :style="{backgroundImage: `url(${userInfo.vipheadphoto})`}"
                     @click="jumpClick({
                        name: '个人中心',
                        url: '/main/profile',
                        class: 'class_a',
                        iconStyle: 'icon njfont nj-wode'
                        })"
                  >
                <div>
                  
                  </div>
                  <!--<img :src="userInfo.vipheadphoto" alt=""/>-->
                </div>
                <div v-else>    <!--id="head-image" class="avatar-image"-->
                  <img src="static/image/user2.jpg" alt="">
                </div>
              </div>
            </div>
            <div style="padding-right:0;float:left;width:59vw;" class="data" id="suneee-side-nav-showuser">
              <div style="width:100%;" v-if="userInfo">
                <h4 class="singerLine" style="width:100%;" id="userid_h4" >{{userInfo.vipname}}</h4>
                <h5 class="singerLine" id="userid_h5" style="color:#ffffff" >{{secretPhone}}</h5>
              </div>
              <h4 id="userid_h4" v-else>登录/注册</h4>
            </div>
          </div>
        </div>
      </header>
      <div class="rooms-list" aria-label="频道" role="region">
        <div class="wrapper" id="suneee-side-nav-showmenu">
          <ul>
            <li class="background-transparent-darker-hover" v-for="(item, index) in menuCofig" @click="jumpClick(item)" :key="index">
              <a class="open-room" :class="item.class" :title="item.name">
                <i class="icon-outbound" aria-label=""></i>
                <span class="name"><i class="fa" :class="item.iconStyle"></i> &nbsp;{{item.name}}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <div class="" style="width:100vw;height:100%;overflow:auto;">
      <header class="aui-bar aui-bar-nav aui-bar-light opacity_title" style="position:fixed"
              v-if="headerConfig.titlePart.title">
        <div class="burger" @click="showAside()">
          <i></i>
          <i></i>
          <i></i>
        </div>
        <!-- <div class="brand_logo" v-if="headerConfig.titlePart.isHome">
          <img :src="headerConfig.titlePart.title" style="height: 32px; margin-top: 0.05rem;"/>
        </div> -->
        <div v-if="headerConfig.titlePart.isHome">
          <!-- <div  id="authenticity_inquiry" @click="QCodePlugin('QCode')">
            <i class="icon njfont nj-saoyisao"></i>
          </div> -->
          <i id="qc-icon" @click="QCodePlugin('QCode')" class="icon njfont nj-saoyisao"></i>
          <div style="width: 60vw" class="aui-searchbar-input">
            <i class="icon njfont nj-sousuo"></i>
            <input type="search" placeholder="商品搜索" id="search-input" @click="$router.push({path:'/searchbar'})">
            <div class="aui-searchbar-clear-btn">
              <i class="aui-iconfont aui-icon-close"></i>
            </div>
          </div>
        </div>
        <div v-else-if="headerConfig.titlePart.isWbHome">
          维保先锋
        </div>

        <span class="aui-title" v-else style="width: 45%; pointer-events: none">
          {{headerConfig.titlePart.title}}
        </span>
        <div  class="right_icon">
          <div v-if="headerConfig.hasSearch" class="search_icon" @click="$router.push('/searchbar')" style="margin-right: 2rem">
            <i class="icon njfont nj-sousuo" style="">
          </i></div>
          <cart-show-num v-if="headerConfig.handlePart.type == 1" style="margin-right: -0.8rem">
          </cart-show-num>

          <!--<a @click="goToCart" v-if="headerConfig.handlePart.type == 1" class="shopping_cart"><i class="icon njfont nj-gouwuche"></i><div class="aui-badge">{{cartNum}}</div>-->
          <!--<animate-ball></animate-ball>-->
          <!--</a>-->
        </div>
        <div v-if="headerConfig.handlePart.type == 2" class="aui-pull-right text-del"
             @click="headerConfig.handlePart.handleClick">清空
        </div>
        <div v-if="headerConfig.handlePart.type == 3" class="aui-pull-right text-del"
             @click="headerConfig.handlePart.handleClick">新增车辆
        </div>
        <div v-if="headerConfig.handlePart.type == 4" class="aui-pull-right text-del"
             @click="headerConfig.handlePart.handleClick">新增地址
        </div>
      </header>
      <!-- 给header站位 -->
      <div id="header-tt" style="height:3rem;width:100%"></div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import axios from 'axios'
  import {MessageBox} from 'mint-ui';
  //import api from '../../api'
  import $ from 'jquery'
  import CartShowNum from "../../components/CartShowNum"
  var api = window.api;


  export default {
    props: {},
    components: {
      CartShowNum
    },
    data () {
      return {
        menuCofig: [
          {
            name: "商城首页",
            url: "/main/home",
            class: "class_a",
            iconStyle: "icon njfont nj-shangcheng"
          },
          {
            name: "商品分类",
            url: "/main/classify",
            class: "class_a",
            iconStyle: "icon njfont nj-fenlei"
          }],
        restList: [
          // 	{
          // 	name: "超值促销",
          // 	url: "/main/recomend",
          // 	class:"class_a",
          // 	iconStyle: "icon njfont nj-gouwuquan"
          // },
          
          {
            name: "购物车",
            url: "/cart",
            class: "class_a",
            iconStyle: "icon njfont nj-gouwuche"
          },
          {
            name: "象谱·全程无忧",
            url: "/main/xpallserver",
            class: "class_a",
            iconStyle: "icon njfont nj-xiangpu"
          }, {
            name: "个人中心",
            url: "/main/profile",
            class: "class_a",
            iconStyle: "icon njfont nj-wode"
          },  {
            name: " 我的订单",
            url: "/main/order",
            //iconStyle: "level_menu fa fa-angle-right"
          }, {
            name: " 我的车辆",
            url: "/main/car",
            //iconStyle: "level_menu fa fa-angle-right"
          }, {
            name: " 我的优惠券",
            url: "/discount",
            //iconStyle: "level_menu fa fa-angle-right"
          }, {
            name: " 我的收藏",
            url: "/collect",
            //iconStyle: "level_menu fa fa-angle-right"
          }, {
            name: " 我的消息",
            url: "/news",
            //iconStyle: "level_menu fa fa-angle-right"
          }],
        startX: 0,
        startY: 0,
        X: 0,
        Y: 0,
        moveEndX: 0,
        moveEndY: 0,
        scolltop: 0
      }
    },
    computed: {
      secretPhone() {
        let phoneNum = this.userInfo.phone
        if (phoneNum) {
          return phoneNum.substr(0, 3) + '****' + phoneNum.substr(7); 
        }
        return ''
      },
      ...mapState([
        'headerConfig'
      ]),
      ...mapGetters({
        cartNum: 'gwModules/cartNum',
        userInfo: 'xhModules/userInfo',
        sessionId: 'xhModules/sessionId',
        login: 'xhModules/login'
      })
    },
    methods: {
      animateNum () {
        return this.$store.state.jyModules.cartanimateNumber

      },
      ...mapMutations([
        'CATE_LIST'
      ]),
      goToCart () {
        this.$router.push({path: "/main/cart"});
      },
      jumpClick (item){
        if (!item.url) {
          document.querySelector('.side-nav-bottom').click()
        } else if (item.url == '/main/order' || item.url == '/main/car' || item.url == '/collect' || item.url == '/news' || item.url == '/discount') {
          if (!this.sessionId) {
            this.$router.push("/login")

            return
          }
          this.$router.push({path: item.url, query: {orderStatus: 0}})
          document.querySelector('.side-nav-bottom').click()
        } else {
          this.$router.push({path: item.url})
          document.querySelector('.side-nav-bottom').click()
        }
      },
      queryErpCate() {
        let self = this
//         axios.get(api.mall_goods_host + 'goodsclass/getgoodsclasslist?enterpriseid=' + api.enterpriseId).then((res) => {
//           // console.log("main.js请求数据" + res);
//           if (res.data.data) {
//             let cateList = res.data.data[0]
//             self.CATE_LIST(cateList)
//             let arr = []
// //						console.log(cateList)
//             cateList.map((item) => {
//               if (item.level == '1' && item.usestatus == 1 ) {
//                 arr.push({
//                   url: '/main/goodsclass/' + item.goodsclasscode,
//                   iconStyle: "level_menu fa fa-angle-right",
//                   name: ' ' + item.goodsclassname,
//                   gode:item.goodsclasscode
//                 })
//               }
//             })
//             arr = arr.sort ( (a, b) =>{
//               return  parseInt(a.gode) - parseInt(b.gode)
//             })
//             console.log(arr, '[[[[[[[[[[[')
//             // 改版，不显示具体的商品分类
//             //self.menuCofig = self.menuCofig.concat(arr).concat(self.restList)
            
            
// //          console.log(self.menuCofig,'self.menuCofig');
//           } else {
//             // console.log("这次请求没有拿到数据");
//           }
//         });
        // 改版，不显示具体的商品分类
        self.menuCofig = self.menuCofig.concat(self.restList)
      },
      isLogin(){
        if (this.userInfo) {
          this.$router.push({path: '/main/profile'})
          this.hideAside()

        } else {
          this.$router.push({path: '/login'})
        }
        document.querySelector('.toggle-button').click()
      },
      showAside() {
        $("html, body").css("overflow","hidden");
        if ($(".burger").hasClass("menu-opened") == true)
          return;
        $(".side-nav-bottom").animate({
          left: 0
        })
        $(".side-nav").animate({
          left: 0
        }, function () {
          $(".side-nav-bottom").show();
          $(".burger").addClass("menu-opened");
        })
        $(".burger").parent().parent().css("position", "absolute");
        $(".burger").parent().parent().animate({
          left: "80.8vw"
        }, function () {

        })
        $(".burger").parent().animate({
          "left": "80.8vw"
        })
        $(".fixed_div").animate({
          "left": "80.8vw"
        })
      },
      hideAside() {
        $("html, body").css("overflow","auto");
        $(".side-nav-bottom").hide();
        $(".side-nav-bottom").animate({
          left: "-100%"
        })
        $(".side-nav").animate({
          left: "-100%"
        })
        $(".burger").parent().animate({
          "left": "0"
        })
        $(".burger").parent().parent().animate({
          left: 0
        }, function () {
          $(".burger").removeClass("menu-opened");
          $(".burger").parent().parent().css("position", "absolute");
        })
        $(".fixed_div").animate({
          "left": "0"
        })
      },
      //扫一扫
       QCodePlugin(url, opts, className){
         if (!this.login) {
           this.$router.push({path: '/login'});
           return
         }
         let that = this;
         this.isFlag = true;
         cordova.exec(success, fail,"QCodePlugin", "start", [className, url, opts || {}]);
         function test(request) {
           let req = JSON.parse(request);
         };
         function success(request) {
           let req = JSON.parse(request);
           let date = new Date().getTime();
           if(!that.isFlag){
             return
           }
           that.isFlag = false;
           MessageBox({
            $type:'prompt',
            title: '领取提示',
            message: '请输入待领取优惠券的张数',
            showCancelButton: true,
            showInput:true,
            inputType:'number',
            inputValue:1,
            inputValidator: (val) => {  
              if (val == null ||val==undefined ||val==''||val<=0||String(val).indexOf('.')!=-1) {  
                return false;
              }  
            }, 
            inputErrorMessage: '领取数量至少为1且为整数'  
          }).then(({ value, action }) => {
            // axios.get(window.api.mall_sale_host + "couponManagement/getvoucherreceivelist?enterpriseid=" + req.enterpriseid + "&phone=" + window.phone + "&voucherid=" + req.voucherid +"&couponNum=" + value +"&token=" + date)
            //  .then(res => {
            //    if (res.data.returnCode == 1 || res.data.returnCode == '1') {
            //      MessageBox.confirm('优惠券领取成功！').then(action => {
            //        that.$router.push('/discount');
            //      });
            //    }
            //    if (res.data.returnCode == -1 || res.data.returnCode == '-1') {
            //       MessageBox.alert(res.data.returnMsg);
            //    }

            //  })
            //  .catch(function (error) {
            //    MessageBox.confirm('优惠券领取失败！');
            //  });

            that.getCoupon(req.enterpriseid,req.voucherid,value)
          }).catch(action=>{
            
          })

         };
         function fail(e) {
          MessageBox.alert('优惠券领取失败！');
         };
       },
               //扫码领优惠券
      getCoupon(enterpriseid,voucherid,value){
        let that = this;
        let date = new Date().getTime();
         
        axios.get(window.api.mall_sale_host + "couponManagement/getvoucherreceivelist?enterpriseid=" + enterpriseid + "&phone=" + window.phone + "&voucherid=" + voucherid +"&couponNum=" + value +"&token=" + date)
          .then(res => {
            if (res.data.returnCode == 1 || res.data.returnCode == '1') {
              MessageBox.alert('优惠券领取成功！').then(action => {
                   that.$router.push('/discount');
                 });
              
            }
            if (res.data.returnCode == -1 || res.data.returnCode == '-1') {
              MessageBox.alert(res.data.returnMsg);
            }

          })
          .catch(function (error) {
            MessageBox.alert('优惠券领取失败！');
          });
      },
    },
    created () {

    },
    mounted () {
      this.queryErpCate()
      let self = this
      document.querySelector('.side-nav-bottom').addEventListener('touchstart', function (e) {
        e.preventDefault();
        self.startX = e.changedTouches[0].pageX;
        self.startY = e.changedTouches[0].pageY;
      })
      document.querySelector('.side-nav-bottom').addEventListener('touchend', function (e) {
        e.preventDefault()
        self.moveEndX = e.changedTouches[0].pageX;
        self.moveEndY = e.changedTouches[0].pageY;
        self.X = self.moveEndX - self.startX;
        self.Y = self.moveEndY - self.startY;
        if (Math.abs(self.X) > Math.abs(self.Y) && self.X > 0) {
          // alert("left 2 right");　　　　
        }
        else if (Math.abs(self.X) > Math.abs(self.Y) && self.X < 0) {
          // alert("right 2 left");　　　
          $(this).click();
        }
        else if (Math.abs(self.Y) > Math.abs(self.X) && self.Y > 0) {
          // alert("top 2 bottom");　　　　
        }
        else if (Math.abs(self.Y) > Math.abs(self.X) && self.Y < 0) {
          // alert("bottom 2 top");　　　　
        }
        else {
          // alert("just touch");　
          $(this).click();
        }
      })


//    setTimeout(() => {
//    	let scrollH = window.localStorage.getItem('scolltop');
//  		document.body.scrollTop = parseInt(scrollH);
//  		window.localStorage.setItem("scolltop", 0);
//  		console.log(document.body.scrollTop);
//  		console.log(window.localStorage.getItem('scolltop'));
//  	},3000)
    },

    watch: {
      animateNum () {
        this.addAnimate()
      }
    }
  }
</script>

<style scoped>
  #draw-bg {
    background: url("../../../static/image/gaiban/choutibg.png");
    background-size: 100% 100%;
  }
  #userid_h4 {
    font-size: 1rem;
  }
  #userid_h5 {
    font-size: 0.8rem;
  }
  #authenticity_inquiry{
    position: absolute;
    
    left:2.3rem;
    top: 50%;
    transform: translate(0,-50%);
  }
  #authenticity_inquiry .nj-saoyisao{
    display: block;
    font-size: 1.13rem;
    line-height: inherit;
  }
  #authenticity_inquiry span{
    font-size: 10px;
    position: absolute;
    left: 0.3rem;
    top: 0.85rem;
    transform: scale(0.8,0.8);
  }
  .aui-searchbar-input {
    position: absolute;
    top: 50%;
    transform: translate(0,-50%);
    left: 25vw;
    margin: 0;
  }
  #qc-icon {
    display: inline-block;
    position: absolute;
    padding: 0.4rem 0.6rem;
    left: 1.8rem;
    top: 51%;
    transform: translate(0,-50%);
    font-size: 1.1rem;
  }
</style>


