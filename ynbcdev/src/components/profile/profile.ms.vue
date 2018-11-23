<template>
  <div class="vue_app" style="position: absolute;width: 100%">
    <div class="centent">
      <!--用户信息-->
      <div class="user_information">
        <div class="user_con">
          <router-link :to="login ? '/persion' : '/login'">
          	<div  style="float:left;">
          		 <img :src="imgUrl ? imgUrl : 'static/image/user2.jpg'" class="aui-img-round aui-list-img-sm">
          	</div>
            <dl style="float:left;">
              <dt>{{username}}</dt>
              <dd v-show="login">{{phone}}</dd>
            </dl>
          </router-link>
        </div>

        <div class="qr_code_list scan" id="scan" @click="QCodePlugin('QCode');">
        <!-- <div class="qr_code_list scan" id="scan" @click="test"> -->
          <li>
            <i class="icon njfont nj-saoyisao"></i>
            <span>扫一扫</span>
          </li>
        </div>
      </div>
      <!--用户信息end-->
      <!-- <router-link to='/main/order'> -->
      <div class="aui-row order_class" id="flex">
        <div class="aui-col-5" @click="turn(1)">
          <i class="icon njfont nj-daifukuan"></i>
          <div class="aui-grid-label">待付款</div>
          <div class="aui-badge" v-show="order.unPayNum">{{order.unPayNum >= 100 ? '99+' : order.unPayNum}}</div>
          <div class="right_line"></div>
        </div>
        <div class="aui-col-5" @click="turn(2)">
          <i class="icon njfont nj-daipeisong"></i>
          <div class="aui-grid-label">待配送</div>
          <div class="aui-badge" v-show="order.waitLogisticsNum">{{order.waitLogisticsNum >= 100 ? '99+' : order.waitLogisticsNum}}</div>
          <div class="right_line"></div>
        </div>
        <div class="aui-col-5" @click="turn(3)">
          <i class="icon njfont nj-peisongzhong"></i>
          <div class="aui-grid-label">配送中</div>
          <div class="aui-badge" v-show="order.onLogisticsNum">{{order.onLogisticsNum >= 100 ? '99+' : order.onLogisticsNum}}</div>
          <div class="right_line"></div>
        </div>
        <div class="aui-col-5" @click="goToAfterSale">
          <i class="icon njfont nj-daipingjia"></i>
          <div class="aui-grid-label">售后服务</div>
          <div class="aui-badge" v-show="orderInforNum">{{orderInforNum || 0}}</div>

        </div>
        <div id="all_order" class="aui-col-5 lef_line" @click="turn(0)">
          <i class="icon njfont nj-quanbudingdan"></i>
          <div class="aui-grid-label">全部订单</div>
          <!-- <div class="aui-badge" v-show="order[0]">{{order[0]}}</div> -->
          <em></em>
        </div>
      </div>
      <!-- </router-link> -->

      <div class="aui-row order_class order_class_1">
        <!--<router-link :to="{path:'/main/install',query:{serviceNo:0}}">-->
          <div id="installation"  class="item aui-col-xs-3" @click="turn_install(0)">
            <i class="icon njfont nj-zhuangpei"></i>
            <div class="aui-grid-label">终端安装单</div>
            <div class="aui-badge" v-show="installNum">{{installNum}}</div>
            <div class="right_line"></div>
          </div>
        <!--</router-link>-->
        <!--<router-link :to="{path:'/main/install',query:{serviceNo:1}}">-->
          <div class="item aui-col-xs-3" @click="turn_install(1)">
            <i class="icon njfont nj-lingjian"></i>
            <div class="aui-grid-label">配件安装单</div>
            <div class="aui-badge" v-show="partsNum">{{partsNum}}</div>
            <div class="right_line"></div>
          </div>
        <!--</router-link>-->
        <div id="installation" class="item aui-col-xs-3" @click="turn_install(6)">
            <i class="icon njfont nj-zhongduanweixiu"></i>
            <div class="aui-grid-label">终端售后</div>
            <div class="aui-badge" v-show="installTerminal">{{installTerminal}}</div>
            <div class="right_line"></div>
          </div>
        <!--<router-link :to="{path:'/main/install',query:{serviceNo:4}}">-->
          <!-- <div id="installation" class="item aui-col-xs-3" @click="turn_install(4)">
            <i class="icon njfont nj-zhongduanweixiu"></i>
            <div class="aui-grid-label">终端维修</div>
            <div class="aui-badge" v-show="installMai">{{installMai}}</div>
            <div class="right_line"></div>
          </div> -->
        <!--</router-link>-->
        <!--<router-link :to="{path:'/main/install',query:{serviceNo:5}}">-->
          <!-- <div class="item aui-col-xs-3" @click="turn_install(5)">
            <i class="icon njfont nj-zhongduanchaichu"></i>
            <div class="aui-grid-label">终端拆除</div>
            <div class="aui-badge" v-show="installDismantle">{{installDismantle}}</div>
            <div class="right_line"></div>
          </div> -->
        <!--</router-link>-->
        <!--<router-link :to="{path:'/main/install',query:{serviceNo:2}}">-->
          <div class="item aui-col-xs-3" @click="turn_install(2)">
            <i class="icon njfont nj-weixiu"></i>
            <div class="aui-grid-label">维修预约</div>
            <div class="aui-badge" v-show="maintain">{{maintain}}</div>
            <div class="right_line"></div>
          </div>
        <!--</router-link>-->
        <!--<router-link :to="{path:'/main/install',query:{serviceNo:3}}">-->
          <div class="item aui-col-xs-3" @click="turn_install(3)">
            <i class="icon njfont nj-baoyang"></i>
            <div class="aui-grid-label">保养预约</div>
            <div class="aui-badge" v-show="upkeep">{{upkeep}}</div>
          </div>
        <!--</router-link>-->
      </div>

      <!--服务预约 end-->
      <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-list-in">
          <router-link :to="{path:login ? '/main/car' : '/login'}">
            <li id="my_car" class="aui-list-item">
              <div class="aui-list-item-label-icon">
                <i class="icon njfont nj-cheliang"></i>
              </div>

              <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title">我的车辆</div>
                <p>管理</p>
              </div>
            </li>
          </router-link>
          <router-link :to="{path: login ? '/discount' : '/login'}">
            <li id="coupon" class="aui-list-item">
              <div class="aui-list-item-label-icon">
                <i class="icon njfont nj-gouwuquan"></i>
              </div>
              <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title">我的优惠券</div>
                <p>未使用&nbsp;{{discountNUm}}</p>
              </div>
            </li>
          </router-link>
          <router-link :to="{path:login ?'/address' : '/login'}">
            <li id="management_address" class="aui-list-item">
              <div class="aui-list-item-label-icon">
                <i class="icon njfont nj-dizhi"></i>
              </div>
              <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title">我的收货地址</div>
                <p>管理</p>
              </div>
            </li>
          </router-link>
          <router-link :to="{path:login ? '/news' : '/login'}">
            <li class="aui-list-item">
              <div class="aui-list-item-label-icon">
                <i class="icon njfont nj-xiaoxi"></i>
              </div>
              <div id="new_message" class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title">我的消息</div>
                <div class="aui-list-item-right" v-if="data">
                  <div class="aui-badge" style="position:relative;top:0; left:0">{{data}}</div>
                </div>
                <p v-else>0</p>
              </div>
            </li>
          </router-link>
          <router-link :to="{path:login ? '/collect' : '/login'}">
            <li id="my_collection" class="aui-list-item">
              <div class="aui-list-item-label-icon">
                <i class="icon njfont nj-shoucang"></i>
              </div>
              <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title">我的收藏</div>
                <div class="aui-list-item-right" v-if="collectNum">
                  <div class="aui-badge" style="position:relative;top:0; left:0">{{collectNum}}</div>
                </div>
                <p v-else>0</p>
              </div>
            </li>
          </router-link>
          <router-link :to="{path:login ? '/main/order' : '/login', query:{orderReturn:1}}">
            <li id="my_collection" class="aui-list-item">
              <div class="aui-list-item-label-icon">
                <i class="icon njfont nj-jifen"></i>
              </div>
              <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title">我的押金单</div>
                <!-- <p>{{collectNum}}</p> -->
              </div>
            </li>
          </router-link>
          <router-link :to="{path:login ? '/main/sendTraffic' : '/login'}">
            <li id="my_collection" class="aui-list-item">
              <div class="aui-list-item-label-icon">
                <i class="icon njfont nj-xiaoxi"></i>
              </div>
              <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title">我的流量</div>
                <!-- <p>{{collectNum}}</p> -->
              </div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="aui-content aui-margin-b-15">
      <ul class="aui-list aui-list-in">
        <router-link :to="{path:login ?'/service' : '/login'}">
          <li id="server_center" class="aui-list-item">
            <div class="aui-list-item-label-icon">
              <i class="icon njfont nj-kefu"></i>
            </div>
            <div class="aui-list-item-inner aui-list-item-arrow">
              <div class="aui-list-item-title">服务中心</div>
            </div>
          </li>
        </router-link>
        <router-link to="/main/about">
          <li id="" class="aui-list-item">
            <div class="aui-list-item-label-icon">
              <i class="icon njfont nj-haoyou"></i>
            </div>
            <div class="aui-list-item-inner aui-list-item-arrow">
              <div class="aui-list-item-title">关于我们</div>
            </div>
          </li>
        </router-link>
        <li id="" class="aui-list-item" @click="toAppType" v-if="apptype">
          <div class="aui-list-item-label-icon">
            <i class="icon njfont nj-shezhi"></i>
          </div>
          <div class="aui-list-item-inner aui-list-item-arrow">
            <div class="aui-list-item-title">设置</div>
          </div>
        </li>
        <li id="" class="aui-list-item" @click="confirm" v-show="login">
          <div class="aui-list-item-label-icon">
            <i class="icon njfont nj-guanbi"></i>
          </div>
          <div class="aui-list-item-inner aui-list-item-arrow">
            <div class="aui-list-item-title">注销</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapActions, mapGetters} from "vuex";
  import {
    getUserInfoAgain,
    getNews,
    signout,
    getAllOrder,
    countByStatus,
    getDiscount_other,
    returnDiscount,
    getInstall,
    getMaintain,
    getTerminalMaintenanceinfo,
    getTerminalDismantleinfo
  } from '../config/getData.js'
  import {Toast} from '../../utils/toast2.js';
  import {MessageBox} from 'mint-ui';
  import syncCart from '../../utils/syncCart.js';
  import initCart from "../../utils/initCart";
  import * as gwTypes from "../../store/modules/gw-modules/mutation-types.js";
  import API from "../../utils/url-router";
  import axios from "axios";
  import {getOrder, querySubmitedInfor} from "../../utils/getInforFun"
  var {queryCollect, goodsList, H5_HOST_URL, goodsListPage} = API()

  export default {
    data() {
      return {
        username: null, //用户昵称
        imgUrl: null, //头像地址
        account: null, //账号密码登录
        phone: null,
        data: 0,
        order: [],
        discountNUm: null, //优惠券数量
        collectNum: 0, //收藏数量
        installNum: null,//安装单数量
        partsNum: null,//配件单数量
        maintain: null,//维修单
        upkeep: null,//保养单
        installMai: null,//安装维修数量
        installDismantle: null ,//安装拆除
        installTerminal:null,//终端售后数量
        orderInforNum: null, // 售后服务的数量
        apptype: false,//先行版开关
        time: null,
        isApp: false,
        isFlag:true,
      }
    },
    async mounted() {
      console.log('profile', 1);
      this.SET_HEADER({
        titlePart: {
          isHome: false,
          title: '个人中心'
        },
        hasSearch: false,
        handlePart: {
          type: '1',
          handleClick: () => {
          }
        }
      });

    }
    ,
    computed: {
      ...mapGetters('xhModules', [
        'sessionId',
        'userInfo',
        'login',
        'car'
      ])
    },

    created (){
        this.init();
    },
    beforeDestroy() {
      this.SET_HEADER({
        titlePart: {
          isHome: false,
          title: ''
        },
        hasSearch: false,
        handlePart: {
          type: '1',
          handleClick: () => {
          }
        }
      });
    },
    methods: {
      goToAfterSale () {
        this.$router.push(this.login ? "/aftersale" : "/login")
      },
      ...mapActions('xhModules', [
        'getUserInfo'
      ])
      ,
      ...mapMutations('xhModules', [
        'USER_INFO',
        'ClEAR_SESSIONID',
        'LOGO_OUT',
        'LOGO_IN',
        'CLEAR_INFO',
        'RECORD_CAR',
        'RECORD_SESSIONID',
      ])
      ,
      ...mapMutations('gwModules', [
        gwTypes.CART_NUM_CHANGE,
        gwTypes.CART_ARRAY_CHANGE
      ])
      ,
      ...mapMutations([
        'SET_HEADER',
      ]),
      async init(){
        await this.getUserInfo();
        await this.accessLogin();
        await this.getUserInfo();
        await this.initData();
        Promise.all([this.getOrder(), this.getDiscount(), this.getInstallfn(), this.initNewsData(), this.getCollectNum(), this.quertDisSubmitInfor()]);
      }
      ,
      async initData(){
        // alert(this.login);
        if (!this.login) {
          // alert(4);
          this.username = '登录/注册';
          this.ClEAR_SESSIONID('sessionId');
          this.LOGO_OUT(false);
          this.CLEAR_INFO(null);
          return
        }

          let res = await getUserInfoAgain(this.sessionId);

          if (res.returncode === 0 || res.returnCode === 0) {
            aler(3);
            Toast({
              message: res.errmsg,
              iconClass: "aui-iconfont aui-icon-close",
              duration: 500
            });
            this.username = '登录/注册';
            this.LOGO_OUT(false);
            this.CLEAR_INFO(null);
            await signout('false');
            this.ClEAR_SESSIONID('sessionId');
            return
          }
        // alert(res);
        this.imgUrl = res.data[0].vipheadphoto;
        this.username = res.data[0].vipname || "昵称【设置】";

        let phone_1 = res.data[0].phone.slice(0, 3);
        let phone_2 = res.data[0].phone.slice(7);
        let phone_3 = '****';
        this.phone = phone_1 + phone_3 + phone_2;
        this.LOGO_IN(true);
        this.USER_INFO(res.data[0]);
        window.phone = res.data[0].phone;
      }
      ,
      //获取信息数据
      async initNewsData () {
        if(!this.login){return}
        let res = await getNews();
        if (res.returncode === 0) {
          Toast({
            message: res.errmsg,
            iconClass: "aui-iconfont aui-icon-close",
            duration: 500
          });
          return
        }
        if(res.returncode == 1) {
          let j = 0;
          for (let i of res.data[0]) {
            if (i.status == 2) {
              j++;
              this.data = j;
            }

          }

        }
      }
      ,
      //获取可售后订单数据
      async quertDisSubmitInfor() {
        if(!this.login){return}
        var res = await querySubmitedInfor(2, this.sessionId)
        if (res.returncode == 0) {
          return
        }

        var data = res.data

        data = data.filter( (item) => {
          return item.serviceType != '3'
        })
        console.log(data)
        var filterData = data.filter((item) => {
          var serviceState = item.serviceState ? parseInt(item.serviceState) : 0
          var isretrue = true
          switch (serviceState) {
            case 3:
              isretrue = false;
              break;
            case 5:
              isretrue = false;
              break;
            case 8:
              isretrue = false;
              break;
            case 10:
              isretrue = false;
              break;
            case 12:
              isretrue = false;
            case 13:
              isretrue = false;
            case 15:
              isretrue = false;
              break;
            default:
              break;
          }

          return isretrue
        })
        this.orderInforNum = filterData.length || 0
      },
      //获取订单数据
      async getOrder() {
        let {values} = Object;
        if(!this.login){return}
        let res = await countByStatus();
        this.order = res.data[0];
      }
      ,
      //获取安装单
      async getInstallfn(){
        if(!this.login){return}
        let j = 0;
        let k = 0;
        let w = 0;
        let l = 0;

        let carArr = [];
        let carArr_1 = [];
        let [res, rew,req] = await Promise.all([getInstall(0+"/"+0), getInstall(1+"/"+0),getMaintain(0)]);

        let [ref, rep] = await Promise.all([getTerminalMaintenanceinfo(0),getTerminalDismantleinfo(0)])
        for (let i of res.data) {
          if (i.installtype == '0') {
            j++;
          }
          if(i.usestatus < 3 && i.vehicleid){

            carArr.push(i.vehicleid);
          }

        }

        for (let i of rew.data) {
          if (i.installtype == '1') {
            k++;
          }
          if(i.usestatus < 3 && i.vehicleid){

            carArr.push(i.vehicleid);
          }

        }

        this.installNum = j;
        this.partsNum = k;


        for (let i of req.data) {
          if (i.maintenancetype == '0') {
            w++;
          }

          if (i.maintenancetype == '1') {
            l++;
          }
        }
        this.maintain = w;
        this.upkeep = l;

        let result = await axios.get(window.api.local_host + "/valueAdded/terminalSaleAfter?status=0",{headers:{'sessionId':this.sessionId}})
        
        this.installTerminal = result.data.data.length;
       this.installMai = ref.data.length;
       this.installDismantle = rep.data.length;

        for (let q of ref.data) {
            if(q.usestatus <= 3 && q.vehicleid) {
             carArr_1.push(q.vehicleid);
            }
        }
        for (let i of rep.data) {
          if(i.usestatus <= 3 && i.vehicleid) {
           carArr_1.push(i.vehicleid);
          }
        }

        // let b = new Set(carArr_1);
        // let differenceABSet = new Set([...carArr].filter(x => !b.has(x)));
        let differenceABSet = new Set([...carArr, ...carArr_1]);
        this.RECORD_CAR(differenceABSet);

      }
      ,
      //注销
      confirm() {
        MessageBox.confirm('确认要注销？').then(param => { this.signOut() });
      }
      ,
      async signOut() {

        if (this.login) {

          let gwCallback = data => {
            this[gwTypes.CART_NUM_CHANGE](data.length);
            this[gwTypes.CART_ARRAY_CHANGE](data);
          }
          initCart(gwCallback);
          this.ClEAR_SESSIONID('sessionId');
          this.LOGO_OUT(false);
          this.CLEAR_INFO(null);
          this.imgUrl = null;

          let res = await signout('false');
          if (res.returncode == 1) {
            // alert(1)
            cordova.exec(success, fail, "CommonPlugin","logout",[]);
            const success = (request) => {alert(request)};
            const fail = (response) => {alert(response)};
            if(location.href.search(/apptype/) != -1){
              //let newUrl = "http://" + window.location.host + "/static/YN/H5/index.html?apptype=1#/main/profile";
              let newUrl = `${getHttp()}://` + window.location.host + "/static/YN/H5/index.html?apptype=1#/main/profile";
              console.log(newUrl);
              window.location.href = newUrl;

            } else {

              window.location.reload();
            }
          } else if (res.returncode == 0) {
            Toast({
              message: '注销失败',
              iconClass: "aui-iconfont aui-icon-close",
              duration: 500
            });

            return
          }
        }
      }
      ,
      //获取优惠券
      async getDiscount() {
        if(!this.login){return}
        let date = new Date().getTime();
        let discount_data_other = {
          url: window.api.mall_sale_host + 'couponManagement/getvouchermesslist?enterpriseid=' + window.api.enterpriseId + '&mobile=' + this.userInfo.phone + '&token=' + date,
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        }
        let req = await axios(discount_data_other).then(res => {
          return res.data.data[0]
        });

        let reqData = [];//未使用
        let nowDate = new Date().getTime();

        for (let i of req) {

          if (nowDate > Date.parse(i.enddate) || i.remainamount <= 0) {
          } else {
            if(i.billno){

            }else {
              reqData.push(i);
            }


          }

        }
        this.discountNUm = reqData.length;
      }
      ,
      getCollectNum () {
        if(!this.login){return}
        var sessionId = this.sessionId
        if (sessionId) {
          axios({
              url: queryCollect,
              method: "post",
              data: {},
              headers: {"sessionId": sessionId},
            }
          ).then((data) => {

            if (data.data.returncode == 0) {
              this.collectNum = 0
              return
            }

            var data = data.data.data[0]
            //获取全部商品数据的方法
            this.collectNum =data ? data.length : 0
//          this.getCollectData(data)
          })
        } else {
          this.collectNum = 0
        }
      }
      ,
      turn(val) {
        if(!this.login){
          this.$router.push('/main/order');
          return
        } else {
          this.$router.push({path: '/main/order', query: {orderStatus: val}});
          return
        }

      }
      ,
       turn_install(num){
         this.$router.push({path:'/main/install',query:{serviceNo:num}});
       }
       ,
       test(){
         let that = this;
        
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
       }
       ,
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
       //匹配先行版app
     async  accessLogin(){
          // let apptype = this.GetQueryString("apptype");
          // if(apptype == 0){this.apptype = true;localStorage.setItem('apptype', 0)};
          this.apptype = true;

          let sessionId = this.GetQueryString("sessionId");
          console.log('sessionId',sessionId);
          if(sessionId !=null && sessionId.toString().length>1){
            let date = new Date().getTime();
            let sess = window.localStorage.getItem('sessionId');
            let request_data = {
              url: window.api.local_host + '/user/accessLogin?eid='+window.api.enterpriseId+'&token=' + new Date().getTime(),
              headers: {'sessionId': this.sessionId, 'Content-Type': 'application/json'}
            };

            let request = await axios(request_data);
            if (request.returncode == 0) {
              return
            }
            this.RECORD_SESSIONID(request.data.data[0]);
            let response = await getUserInfoAgain(this.sessionId);

            if (response.returncode === 0) {
              this.LOGO_OUT(false);
              return
            }
            this.LOGO_IN(true);
          }
      }
      ,
      GetQueryString(name){
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");

        if(name === 'sessionId'){
          if(window.location.href.indexOf('sessionId') === -1){
            if(localStorage.getItem('sessionId')){
              console.log(1);
              return localStorage.getItem('sessionId');
            }
            return null
          }
        }
        // if(name==='apptype'){
        //   if(location.href.indexOf('apptype') === -1){
        //     if(localStorage.getItem('apptype') === 0){
        //       return localStorage.getItem('apptype');
        //     }
        //     return null;
        //   }
        // }

        let a = location.href;
        var r = a.split('?')[1].match(reg);
        if(r!=null&&r!=undefined)return  unescape(r[2]);
        return null;
      }
       ,
       toAppType(){
        cordova.exec(success, fail, "CommonPlugin", "gotoSetting", []);
        function success(){console.log('成功')};
        function fail(){console.log('失败')};
       }

    }
  }
</script>
<style scoped>
  #flex {
    display: flex;
    margin-left: 1.6vw;
    margin-right: 1.6vw;
    margin-top: -1vh;
    border-radius: 1vh;
    box-shadow: 0 0 2.4vw #ababab;
  }
  #flex .icon.njfont {
    margin-top: 0.4rem !important;
  }
  .order_class_1 {
    display: flex;
    overflow-x: auto;
    /*height: 4rem;*/
  }
  .order_class .aui-grid-label {
    margin-bottom: 0;
  }
  .item {
    /*width: 5rem;*/
    flex: 1 0 auto;
  }
  a {
    color: #444444;
  }
  .vue_app {
    background: #f5f5f5;
  }
 
</style>
<style>
 .mint-msgbox-input input{
    text-align: center;
  }
</style>

