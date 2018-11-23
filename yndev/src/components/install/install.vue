<template>
  <div class="order_list_div" style="width: 100%;">

    <!--头部-->
    <header class="aui-bar aui-bar-nav aui-bar-light">
      <div style="height:2.75rem;position:relative">
        <router-link to="/main/profile">
          <div class="go-back">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </router-link>
        <div class="aui-title">
          {{param == 0 ? "终端安装单" : (param == 1 ? "配件安装单" : (param == 2 ? "维修预约" : (param == 3 ? "保养预约" : (param == 4 ? "终端维修":(param == 5 ? "终端拆除" : (param==6?"终端售后":(param==8?"服务工单":"")))))))}}
        </div>
        <div style="top: 40%; transform:translate(0,-50%)" class="right_icon" @click="search = !search;">
          <a id="order-search" class="search_icon"><i class="icon njfont nj-sousuo"></i></a>
        </div>
      </div>
      
      
      <repair-head v-if="tapHead" :titleInfor=" tapHead" :isRouter="false">
      </repair-head>
    </header>
    <div style="height:2.3rem;top: 6rem;position: fixed;width: 100%; ">

    </div>

    <!--订单tab滚动切换模块-->

    <!--订单tab切换模块end-->

    <!-- <transition-group :name="className" tag="div" style="position: relative"> -->


    <!--预约单查询-->
    <!--add mask-->
    <div id="mask_bj" class="mask_bj" :style="search ? 'display:block' : 'display:none'"></div>
    <!--add search-panel-->
    <div class="ordersearch_con" :style="search ? 'display:block' : 'display:none'">
      <ul class="aui-list aui-form-list from_con">
        <li>
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              开始时间：
            </div>
            <div @click="openStartTime" class="aui-list-item-input">
              <!-- <input type="text" class="goodscode_input" v-model="startTime" @click="search_flag = true;$refs.pickerel.open();"> -->
              <!-- <Date-picker type="datetime" placeholder="选择日期和时间" style="width: 200px" v-model="startTime"></Date-picker> -->
              <span v-if="startTime">{{dateToString(startTime)}}</span>
              <span style="color:#999999" v-else>选择日期和时间</span>
            </div>
          </div>
        </li>
        <li>
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              结束时间：
            </div>
            <div @click="openEndTime" class="aui-list-item-input">
              <!-- <input type="text" class="goodscode_input" v-model="endTime" @click="search_flag = false;$refs.pickerel.open();"> -->
              <!-- <Date-picker type="datetime" placeholder="选择日期和时间" style="width: 200px" v-model="endTime"></Date-picker> -->
              <span v-if="endTime">{{dateToString(endTime)}}</span>
              <span style="color:#999999" v-else>选择日期和时间</span>
            </div>
          </div>
        </li>
        <li>
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              工单编号：
            </div>
            <div class="aui-list-item-input">
              <input type="text" class="goodscode_input" v-model="searchNum">
            </div>
          </div>
        </li>
      </ul>
      <div class="aui-dialog-footer">
        <div class="aui-dialog-btn" tapmode="" button-index="0" @click="search = !search;">取消</div>
        <div class="aui-dialog-btn" tapmode="" button-index="1" @click="searchFn();search = false;">确定</div>
      </div>
    </div>
    <!--预约单查询 end-->

    <!--<div class="centent" v-if="move" :key="item">-->
    <div class="centent" v-if="move" style="margin-top: 2.2rem;margin-bottom:3rem;">

      <!--商品列表<-->
      <div class="aui-content">
        <transition-group :name="className">
          <ul class="aui-list aui-media-list service_list" v-if="data && (item[mainIntalcode] == param%2 || param == 8)"
              v-for="(item, index) in data " :key="index">
            <li class="aui-list-item">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-text">
                  <!-- // 0-待预约，1-预约完成（待安装），2-安装完成（待确认），3-待评价（安装完成确认）；4-完成 -->
                  <div class="aui-list-item-title">工单编号：{{param == 0 || param == 1 ? item.installno : (param == 2 || param == 3 ? item.maintenanceno : (param == 4  ? item.maintenanceno : ( param == 5 ? item.removeno : (param==6?item.aftersaleserviceno:(param==8?item.installno || item.maintenanceno:"")))))}}</div>
                  <div class="aui-list-item-right" v-if="param==2||param==3||param==6"><span
                    class="aui-text-danger">{{item.usestatus == '0.1' ? "待预约" : (item.usestatus == '0.2' ? "待受理" : (item.usestatus == '1' ? "待服务" : (item.usestatus == '2' ? "待确认" : (item.usestatus == '3' ? "待评价" : (item.usestatus == '4' ? "已完成" : (item.usestatus == '5' ? "服务商已拒绝" : (item.usestatus == '6' ? "待预约" : (item.usestatus == '9'||item.usestatus == '8'||item.usestatus == '7' ? "关闭" : ''))))))))
                    }}</span></div>
                  <div class="aui-list-item-right" v-else><span
                  class="aui-text-danger">{{item.usestatus == '0.1'||item.usestatus==6 ? "待预约" : (item.usestatus == '0.2' ||item.usestatus==0? "待受理" : (item.usestatus == '1'||item.usestatus==8 ? "待服务" : (item.usestatus == '2' ? "待确认" : (item.usestatus == '3' ? "待评价" : (item.usestatus == '4' ? "已完成" : (item.usestatus == '5' ? "服务商已拒绝" : (item.usestatus == '6' ? "待预约" : (item.usestatus == '9' ? "关闭" : ''))))))))
                  }}</span></div>
                </div>
                <div class="aui-list-item-text" v-if="item.billno">
                  <div class="aui-list-item-title">订单编号：{{item.billno}}</div>
                </div>
              </div>
            </li>
            <li class="aui-list-item">
              <div class="aui-media-list-item-inner">
                <div class="aui-list-item-media">
                  <img src="static/image/demo1.png">
                  <!--需要链接到商品详情-->
                </div>
                <div class="aui-list-item-inner">
                  <div class="aui-list-item-text">
                    <div class="aui-list-item-title">{{item.goodsname}}</div>
                  </div>
                  <div class="aui-list-item-text">
                    预约服务日期：{{ item.orderdate && Number(item.usestatus) != 6 ? changeDate(item.orderdate) : "&nbsp;"}}
                  </div>
                  <div class="aui-list-item-text" v-if="param == 4 || param == 5||param==6">
                    车牌号码：{{item.carno}}&nbsp;
                  </div>
                  <div class="aui-list-item-text" v-if="param == 4 || param == 5||param==6">
                    发动机号：{{item.engineno}}&nbsp;
                  </div>
                  <div class="aui-list-item-text" v-else>
                    服务商：{{item.servicename}}
                  </div>
                </div>
              </div>
            </li>
            <li class="edit_address" style="border-top: 0 solid transparent;">

              <!--<router-link id="add_appointment" :to="{path:'/main/addInstall',query:{serviceNo:param}}"-->
              <!--class="aui-btn aui-btn-danger aui-btn-outlined" v-show="item.usestatus == '0'"-->
              <!--&gt;立即预约-->
              <!--</router-link>-->

              <!-- <router-link
                :to="{path:'/main/addInstall',query:{sub:0,serviceNo:param,order:item.installno || item.maintenanceno,serviceId:item.serviceid}}"> -->
              <div class="aui-btn aui-btn aui-btn-outlined"
                   v-show="item.usestatus == '5'" @click=" popupVisible = !popupVisible;refuseDetail(item)">查看拒绝详情
              </div>

              <!-- </router-link> -->

              <!-- 详情 -->

                <div class="aui-btn aui-btn-outlined" v-show="item.usestatus >= 0" @click="toDetails(item)">工单详情
                </div>

              <!-- 立即预约 -->
              <router-link
                :to="{path:'/main/addInstall',query:{sub:0,serviceNo:param,order:item.installno || item.maintenanceno || item.removeno,serviceId:item.serviceid,type:item.type,maintenancetype:item.maintenancetype}}">
                <div  class="aui-btn aui-btn-danger aui-btn-outlined"
                  v-if="param!=6"   v-show="item.usestatus == '0.1' || item.usestatus == '5' || item.usestatus == '6' || item.userstatus == '7'">立即预约
                </div>
              </router-link>
              <div  class="aui-btn aui-btn-danger aui-btn-outlined"
                v-if="param==6"  @click="sureSub(item)"   v-show="item.usestatus == '0.1' || item.usestatus == '5' || item.usestatus == '6'">立即预约
                </div>
               <div  class="aui-btn aui-btn-danger aui-btn-outlined"
                     v-show="item.usestatus == '0.2' || item.usestatus =='1'|| item.usestatus =='0'|| item.usestatus =='8'" @click="dancel(item.installno,'pj')" v-if="param == 0 || param == 1 || item.type=='pj'">取消预约
                </div>
                <div  class="aui-btn aui-btn-danger aui-btn-outlined" @click="dancel(item.maintenanceno,'wb')" v-show="item.usestatus == '0.2' || item.usestatus =='1' " v-if="param == 2 || param == 3 || item.type=='wb'">
                    取消预约
                </div>
                <div  class="aui-btn aui-btn-danger aui-btn-outlined" @click="cancel(item.maintenanceno)" v-show="item.usestatus == '0.2' || item.usestatus =='1' || item.userstatus == '8'" v-if="param == 4 ">
                    取消预约
                </div>
                <div  class="aui-btn aui-btn-danger aui-btn-outlined" @click="cancel(item.removeno)" v-show="item.usestatus == '0.2' || item.usestatus =='1' || item.userstatus == '8'" v-if="param == 5 ">
                    取消预约
                </div>
                <div  class="aui-btn aui-btn-danger aui-btn-outlined" @click="cancelTerminal(item)" v-show="item.usestatus == '0.2' || item.usestatus =='1' " v-if="param == 6 ">
                    取消预约
                </div>

              <div class="aui-btn aui-btn-danger aui-btn-outlined" v-show="item.usestatus == '2'&&param!=6 "
                   @click="orderOver(item)">确认服务完成
              </div>
              <div class="aui-btn aui-btn-danger aui-btn-outlined" v-show="item.usestatus == '2' &&param==6"
                   @click="terminalOver(item)">确认服务完成
              </div>

              <div id="service_evaluation" class="aui-btn aui-btn-danger aui-btn-outlined"
                   v-show="item.usestatus == '3' && !item.appraise" @click="rate = true;subRate(item)">立即评价
              </div>
            </li>
          </ul>

        </transition-group>
        

        <!-- <div style="width: 100px; height: 3rem;"></div> -->
      </div>
      <!--商品列表 end-->
<div id="order_no_data" v-if="isWhite() && showBgImage" class="no_data">
          <img src="static/image/no_data.png">
          <p>暂无数据</p>
        </div>

    </div>


    <!--<div style="height:5rem;"></div>-->
    <router-link :to="param==6?{path:'/main/addInstallTerminal',query:{serviceNo:param,sub:1}}:{path:'/main/addInstall',query:{serviceNo:param,sub:1}}">
      <div id="add_appointment2" class="settle_accounts lijixiadan">
        <div style="background:#970000 !important" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm">新增预约</div>

      </div>
    </router-link>
    <!--服务选择-->
    <div class="aui-mask aui-mask-in" v-if="rate"></div>
    <div id="purchase_service" class="purchase_service" :style="rate ? 'display:block' : 'display:none'">
      <div class="description_tit">
        服务评价
        <a class="spec_close" @click="rate = false;"></a>
      </div>
      <div class="spec_middle">
        <div class="star_rating">
          <Rate allow-half v-model="valueHalf" class="rate"></Rate>
          <div class="evaluation_result">
            <label class="aui-text-success">{{valueHalf}}&nbsp;很满意</label>
          </div>
          <div class="standard_con">
            <li @click="appraisement = 0 " :class="{active: appraisement == 0}"><span>服务周到</span><i
              class="icon njfont nj-xuanzhong"></i></li>
            <li @click="appraisement = 1 " :class="{active: appraisement == 1}"><span>服务准时</span><i
              class="icon njfont nj-xuanzhong"></i></li>
            <li @click="appraisement = 2 " :class="{active: appraisement == 2}"><span>安装技师技术很棒</span><i
              class="icon njfont nj-xuanzhong"></i></li>
            <li @click="appraisement = 3 " :class="{active: appraisement == 3}"><span>不太满意</span><i
              class="icon njfont nj-xuanzhong"></i></li>
          </div>
        </div>
        <div class="settle_accounts lijixiadan">
          <div id="confirm" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click="sendRate">确定</div>
        </div>
      </div>
    </div>
    <!--  -->
    <mt-popup
      id="mt"
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="middle">
      <h3>拒绝详情</h3>
      <div id="mt_div">
        <p>服务商：{{refuseService}}</p>
        <p>拒单时间：{{getTime(refuseTime)}}</p>
        <p class="refuseInfo">拒单原因：{{refuseInfo}}</p>
      </div>
      <mt-button type="primary" id="mt_btn" @click=" popupVisible = !popupVisible">关闭</mt-button>
    </mt-popup>
    <mt-datetime-picker
      ref="startTimepick" 
      v-model="startTime"
      @confirm="confirmSubDate"
    >

    </mt-datetime-picker>
    <mt-datetime-picker
      ref="endTimepick" 
      v-model="endTime"
      @confirm="confirmSubEndDate"
    >

    </mt-datetime-picker>
  </div>
</template>

<script>

  import {
    getInstall,
    setInstall,
    sendRate,
    confirmOrder,
    getMaintain,
    getUserInfoAgain,
    upDateInstall,
    upDateMaintainInfo,
    upDateServiceInfo,
    dancelInstallOrder,
    getTerminalMaintenanceinfo,
    updateTerminalMaintenanceinfo,
    getTerminalDismantleinfo,
    updateTerminalDismantleinfo,
    updateCarInfo,
    getTerminalAfter
  } from '../config/getData.js'
  import dayjs from 'dayjs'
  import RepairHead from "../repairHead/index_install.vue"
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import 'mint-ui/lib/style.css'
  import {MessageBox, Popup, Picker, DatetimePicker, Button} from 'mint-ui'
  import {Toast} from '../../utils/toast2.js'
  import Rate from 'iview/src/components/rate';
  import 'iview/dist/styles/iview.css';
  import axios from "axios"
  import {updateServiceInfor} from "../../utils/updateServiceInfor"
  import API from "../../utils/url-router"
  import Datepicker from 'iview/src/components/date-picker';
  import {showLoading, hideLoading} from "../../utils/loading";
  // import Vconsole from '../../../static/script/vconsole.min.js'
  var {H5_HOST_URL} = API()
  export default {
    data() {
      return {
        className: "slide-go-left",
        data: null,
        type: null,
        rate: false,//评价
        search: false,//搜索框
        param: null,
        move: true,
        valueHalf: 0,
        // appraisement: null,
        check: null,
        key: null,
        mainIntalcode: "",
        tapHead: [{goodsClassName: "全部", code: 0}, {goodsClassName: "待预约", code: 1}, {
          goodsClassName: "待受理",
          code: 2
        }, {goodsClassName: "待服务", code: 3}, {goodsClassName: "待确认", code: 4}],
        enterpriseId: null,
        worksNo: null,       // 工单编号
        serviceType: null,   //服务类型
        servicerId: null,    //服务商Id
        servicerName: null,  //服务商名称
        memberName: null,    //评价人
        appraisement: null,  //评价
        score: null,         //评分
        installno: null,     //安装单id
        telephone: null,
        userstatus: null,    //改变安装单状态
        startTime: null,     //搜索开始时间
        endTime: null,       //搜索结束时间
        searchNum: null,     //搜索单号
        search_flag: null,   //搜索开关
        popupVisible: false, //拒绝详情开关
        refuseInfo: null,//拒绝详情内容
        refuseTime: null,//拒绝时间
        refuseService: null,//拒绝展示的服务商
        arr: [],
        arrel: [],
        config: {},
        showBgImage: true

      }
    }
    ,
    async created () {
      showLoading();
      this.param = this.$route.query.serviceNo;
      this.$store.dispatch('changeClassifyIndex', 0);
      await this.getUserInfo();
      await this.init();
      this.initData(this.activeIndex);
      hideLoading();
    },
    async mounted() {

    },
    watch: {
      $route (from, to, next) {
        this.param = this.$route.query.serviceNo;
      },
      activeIndex (newIndex, oldIndex) {
        if (this.param == 8) {
          if(this.activeIndex >= 2) {
            this.initData(this.activeIndex - 1)
          } else {
            this.initData(this.activeIndex)
          }
        }
        if (this.param >= 0&&this.param<6) {

          if(this.activeIndex >= 2) {
            // console.log(this.activeIndex)
            // this.activeIndex == 1;
            this.initData(this.activeIndex - 1)
          } else {
            this.initData(this.activeIndex)
          }

        }else if(this.param==6){
            this.initData(this.activeIndex)

        }
        
        if (newIndex - oldIndex > 0) {
          this.className = "goleft"
        } else {
          this.className = "goright"
        }
      },
      appraisement(val, old){
        switch (val) {
          case 0:
            this.comments = "服务周到";
            break;
          case 1:
            this.comments = "服务准时";
            break;
          case 2:
            this.comments = "安装技师技术很棒";
            break;
          case 3:
            this.comments = "不太满意";
            break;
        }
      },

    }
    ,
    computed: {
      ...mapGetters('xhModules', [
        'login',
        'userInfo',
        'sessionId',
        'car'
      ]),
      activeIndex () {
        return this.$store.state.jyModules.classifyIndex
      }

    }
    ,
    components: {
      'Rate': Rate,
      RepairHead,
      "mt-picker": Picker,
      "picker-name": Picker.name,
      "mt-popup": Popup,
      "popup-name": Popup.name,
      "Date-picker": Datepicker,
      "mt-datetime-picker": DatetimePicker,
      "mt-button": Button
    }
    ,
    methods: {
      openStartTime() {
        this.$refs.startTimepick.open()
      },
      openEndTime() {
        this.$refs.endTimepick.open()
      },
      dateToString(date) {
          return dayjs(date).format("YYYY MM-DD HH:mm:ss")
      },
      // 日期转换
      confirmSubDate(v) {
        this.startTime = v
      },
      confirmSubEndDate(v) {
        this.endTime = v
      },
      changeDate (date) {
        // if (parseInt(this.param) < 2) {
        //   // return date.split(".")[0]
        // } else {
          var da = new Date(date)
          var year = da.getFullYear();
          var month = da.getMonth() + 1;
          var date = da.getDate();
          var houer = da.getHours() < 10 ? "0" + da.getHours() : da.getHours()
          var minit = da.getMinutes() < 10 ? "0" + da.getMinutes() : da.getMinutes()
          var sec = da.getSeconds() < 10 ? "0" + da.getSeconds() : da.getSeconds()
          return [year, month, date].join("-") + " " + [houer, minit, sec].join(":")
        // }
      },
      isWhite () {
        if (!this.data) {
          return
        }
        var isWhite = this.data.find((item) => {
          if (this.param == 8) {
            return true
          }
          return item[this.mainIntalcode] == this.param % 2
        })
        return !isWhite
      },

      ...mapActions('xhModules', [
        'getUserInfo'
      ])
      ,
      ...mapMutations('xhModules', [
        'USER_INFO',
        'LOGO_OUT',
        'LOGO_IN',
        'RECORD_CAR'
      ])
      ,
      async init() {
        if (!this.login) {
          this.$router.push({path: '/login'});
          return
        }
        //页面刷新加载用户数据
        let res = await getUserInfoAgain(this.sessionId);
        if (res.returncode === 0) {
          this.LOGO_OUT(false);
          return
        }
        this.USER_INFO(res.data[0])
        this.LOGO_IN(true);


      }
      ,
      async initData(val) {
          this.data = '';
          showLoading();
        // 服务工单
        
        if (this.param == 8) {
          let serverArr = []
          this.mainIntalcode = "maintenancetype"
            // 配件
          let res = await getInstall(this.param+"/"+val);
          this.errMsg(res);
          let resdata = res.data
          // resdata.sort((a, b) => {
          //   return b.installno - a.installno
          // })
          resdata.map((item) => {
            item.mainIntalcode = item.installtype;
            item.type = "pj"
            // item.servicename = item.name

          })
          serverArr = serverArr.concat(resdata)
            // 维修和保养
          let reswx = await getMaintain(val);
          this.errMsg(res);

          // let changeDatawx = reswx.data.sort(this.compare("maintenanceno"));
          let changeDatawx = reswx.data;
          // resdata.sort((a, b) => {
          //   return b.maintenanceno - a.maintenanceno
          // })
          changeDatawx.map((item) => {
            item.installno = item.maintenanceno
            item.servicename = item.name
            item.type = "wb"

          })
          serverArr = serverArr.concat(changeDatawx)
          serverArr.sort((a, b) => {
            if(!a.inputdate && b.inputdate) //a.inputdate=null  b.inputdate!=null
              return 1;
            else if(a.inputdate && b.inputdate) //a.inputdate!=null  b.inputdate!=null
              return b.inputdate-a.inputdate;
            else if(!a.inputdate && !b.inputdate)// a.inputdate=null  b.inputdate=null
              return b.installno - a.installno;
            else {
              return -1;
            }
          })
          // serverArr.sort(this.compare1('inputdate',this.compare1('installno')))
          this.filter(serverArr)
        }


        //终端和配件安装
        if (this.param == 0 || this.param == 1) {
          this.mainIntalcode = "installtype"

          let res = await getInstall(this.param+"/"+val);
          this.errMsg(res);
          let resdata = res.data
          resdata.sort((a, b) => {
            return b.installno - a.installno
          })
          resdata.map((item) => {
            item.mainIntalcode = item.installtype;
            // item.servicename = item.name

          })
          this.filter(resdata);
        }
        //维修和保养预约
        if (this.param == 2 || this.param == 3) {
          this.mainIntalcode = "maintenancetype"
          let res = await getMaintain(val);
          this.errMsg(res);

          let changeData = res.data.sort(this.compare("maintenanceno"));
          changeData.map((item) => {
            item.installno = item.maintenanceno
            item.servicename = item.name

          })
          this.filter(changeData);
        }
        //终端维修和终端拆除
        if (this.param == 4 || this.param == 5) {
          let res, req;
          let carArr_1 = [];
          let carArr_2 = [];
          let carArr = [];



          this.mainIntalcode = "removetype";

          res = await getTerminalMaintenanceinfo(val);
          res.data.forEach((index) => {
            index.removetype = 0;
          })

          req = await getTerminalDismantleinfo(val);

          if(this.param == 4) {
            this.errMsg(res);
            let data = res.data.sort(this.compare("maintenanceno"));
            this.stat(data);
            this.filter(data);
          }

          if(this.param == 5) {
            this.errMsg(req);
            let data = req.data.sort(this.compare("removeno"));
            this.stat(data);
            this.filter(data);
          }





          //安装和配件中的车辆id
          let [ref, rel] = await Promise.all([getInstall(0+"/"+0), getInstall(1+"/"+0)]) ;
          for (let i of ref.data) {
            if(i.usestatus < 3 && i.vehicleid){
              carArr.push(i.vehicleid);
            }
          }

          for (let l of rel.data) {
            if(l.usestatus < 3 && l.vehicleid){
              carArr.push(l.vehicleid);
            }
          }
          //维修中的车辆id
          for (let q of res.data) {
            if(q.usestatus < 3 && q.vehicleid) {
                carArr_1.push(q.vehicleid);
            }
          }
          //拆除中的车辆id
          for (let p of req.data) {
            if(p.usestatus < 3 && p.vehicleid) {
                carArr_2.push(p.vehicleid);
            }
          }
          // let b = new Set(carArr_1);
          // let e = new Set(carArr_2);

          // let d = new Set([...carArr].filter(x => !b.has(x)));
          // let differenceABSet = new Set([...d].filter(x => !e.has(x)));

          let differenceABSet = new Set([...carArr, ...carArr_1, ...carArr_2]);
          this.RECORD_CAR(differenceABSet);

        }

        if(this.param == 6){
          // let res = await getTerminalAfter("status="+val+"&pageNum=1&lenght:5&phone=13510928630");
          let res = await axios.get(window.api.local_host + "/valueAdded/terminalSaleAfter?status="+val,{headers:{'sessionId':this.sessionId}})
          res.data.data.forEach((index) => {
            index.removetype = 0;
            index.orderdate = index.serverdate;
            if(index.userstatus == 1){
              index.usestatus = 0.1;
            }else if(index.userstatus == 2){
              index.usestatus = 0.2;
            }else if(index.userstatus == 3||index.userstatus == 4){
              index.usestatus = 1;
            }else if(index.userstatus == 5||index.userstatus == 6){
              index.usestatus = 2;
            }else if(index.userstatus == 7){
              index.usestatus = 3;
            }else if(index.userstatus == 8){
              index.usestatus = 4;
            }
          })
          this.mainIntalcode = "removetype";
          
          this.errMsg(res);
          let data = res.data.data.sort(this.compare("aftersaleserviceno"));
          
          this.data = data;
          console.log(data,'data')
          // this.stat(data);
          // this.filter(data);
        }
        //从订单跳转过来筛选对应工单;
        if(this.$route.query.parentNo) {
          let newData = [];
          for(let i of this.data) {
            if(i.billno == this.$route.query.parentNo) {
              newData.push(i);
            }
            this.data = [];
            this.data = newData;
          }
          console.log('haha',this.data);
        }
        hideLoading();
        if(!this.data) {
          this.showBgImage = true;
        }

      }
      ,
      stat(data) {
        data.forEach((val) => {
          if(val.usestatus == 0) {
            val.usestatus = 6;
            return
          }
          if(val.usestatus == 1) {
            val.usestatus = 0;
            return
          }
          if(val.usestatus == 2 || val.usestatus == 3) {
            val.usestatus = 1;
            return
          }
          if(val.usestatus == 4) {
            val.usestatus = 2;
            return
          }
          if(val.usestatus == 5) {
            val.usestatus = 3;
            return
          }
          if(val.usestatus == 6) {
            val.usestatus = 4;
            return
          }
          if(val.usestatus == 7) {
            val.usestatus = 5;
            return
          }
        })
        return data;
      }
      ,
      errMsg(data) {
        if (data.returncode == 0) {
          Toast({
            message: data.errmsg,
            iconClass: "aui-iconfont aui-icon-close",
            duration: 500
          });

          return
        }

        if (data.data == '') {
          this.data = []
          return
        }
      }
      ,
      filter(data){
        this.arr = [];
        this.arrel = [];
        for (let i of data) {
          // if(i.usestatus == 0 && i.orderdate == null) {
          //   i.usestatus = 0.1;
          //   this.arr.push(i);

          // } else if(i.usestatus == 5 || i.usestatus == 6 || i.usestatus == 7) {
          //   this.arr.push(i)
          // } else if(i.usestatus == 0 && i.orderdate !== null ) {
          //     i.usestatus = 0.2;
          //     this.arrel.push(i);
          // }
          if(this.param==2||this.param==3||this.param==1 || this.param==8){
            if(i.usestatus == 0 && i.orderdate == null) {
              i.usestatus = 0.1;
              this.arr.push(i);
              
            }else if(i.usestatus == 0 && i.orderdate !== null ) {
                i.usestatus = 0.2;
                // this.arr.push(i);
                this.arrel.push(i);
            }else if(i.usestatus == 5 || i.usestatus == 6 ) {
                this.arr.push(i);
            }
          }else{
            if(i.usestatus == 7 && i.orderdate == null) {
              i.usestatus = 0.1;
              this.arr.push(i);

            }else if(i.usestatus == 5 || i.usestatus == 6 ) {
                this.arr.push(i);
            }else if(i.usestatus == 7 && i.orderdate !== null ) {
                i.usestatus = 0.2;
                // this.arr.push(i);
                this.arrel.push(i);
            }else if(i.usestatus == 0){
                this.arrel.push(i);
            }
          }
          
          //0 待受理; 4
          // if(i.usestatus == 0|| i.usestatus == 0.2) {
          //   this.arrel.push(i);
          // }
        }

       
        if(this.activeIndex == 1) {
          this.data = this.arr;
          
        } else if(this.activeIndex == 2) {
          this.data = this.arrel;
        } else {
          this.data = data
        }

         console.log("arr", this.data);
      }
      ,
      subRate(item) {
        this.appraisement = 0
        this.activeItem = item
        this.enterpriseId = window.api.enterpriseId
        let config = {
          "servicerId": item.serviceid,//服务商Id
          "memberName": item.vipname,//会员名称评价人
          "comments": this.comments,//评论 ?再这取有个毛用
          "memberId": item.vipid,
          "memberPhone": item.telepone||item.telephone
        }
        if (this.param == 0 || this.param == 1) {
          config.worksType = item.installtype == 0 ? 1 : 2; //工单类型
          config.serviceType = item.installtype == 0 ? "终端安装单" : "配件安装单";
          config.worksNo = item.installno;// 工单编号
          config.servicerName = item.servicename;//服务商名称
        } else if (this.param == 2 || this.param == 3) {
          config.worksType = item.maintenancetype == 0 ? 3 : 4; //工单类型
          config.serviceType = item.maintenancetype == 0 ? "维修单" : "保养单";
          config.worksNo = item.maintenanceno;// 工单编号
          config.servicerName = item.name;//服务商名称
        } else if(this.param == 4){
          config.worksType = 5; //工单类型  维修
          config.serviceType = "安装维修单";
          config.worksNo = item.maintenanceno;// 工单编号
          config.servicerName = item.name;//服务商名称
        } else if(this.param == 5){
          config.worksType = 6; //工单类型  拆除
          config.serviceType = "安装拆除单";
          config.worksNo = item.removeno;// 工单编号
          config.servicerName = item.servicename;//服务商名称
        } else if(this.param == 6){
          config.worksType = 7; //工单类型  拆除
          config.serviceType = "终端售后单";
          config.worksNo = item.aftersaleserviceno;// 工单编号
          config.servicerName = item.servicename;//服务商名称
        } else if (this.param == 8) {
          if (item.type == "pj") {
            config.worksType = item.installtype == 0 ? 1 : 2; //工单类型
            config.serviceType = item.installtype == 0 ? "终端安装单" : "配件安装单";
            config.worksNo = item.installno;// 工单编号
            config.servicerName = item.servicename;//服务商名称
          } else {
            config.worksType = item.maintenancetype == 0 ? 3 : 4; //工单类型
            config.serviceType = item.maintenancetype == 0 ? "维修单" : "保养单";
            config.worksNo = item.maintenanceno;// 工单编号
            config.servicerName = item.name;//服务商名称
          }
        }


        this.config = config;

      }
      ,
      async sendRate() {
        let target  = Object.assign(this.config, {"score": this.valueHalf});        
        this.config.comments = this.comments
        console.log(this.comments)
        let res = await sendRate(this.config);
        this.rate = false
        if (res.returncode == 0) {
          Toast({
            message: res.errmsg,
            iconClass: "aui-iconfont aui-icon-close",
            duration: 500
          });

          return;
        } else {
          Toast({
            message: "评价成功",
            iconClass: "aui-iconfont aui-icon-correct",
            duration: 500
          });
        }
        if(this.param==6){
          this.sureTerminal(this.activeItem)
        }else{
          this.sendInstall(this.activeItem, 4)
        }
        this.initData(0);

      }
      ,

      //取消工单预约
      async dancel(val,type){
        let ser = '';
        if(this.param == 0) {
          ser = 3;//终端
        } else if (this.param == 1 || type == 'pj') {
          ser = 2;//配件
        }
        else if (this.param == 2 || this.param == 3 || type == 'wb') {
          ser = 1;//维保单
        }

        let res = await axios.get(window.api.local_host + "/valueAdded/checkServiceStatus/"+ ser +"/" + val,{headers:{'sessionId':this.sessionId}}).then(ref => {return ref});
        console.log(res.data.returnCode)
        if (res.data.returnCode == 1) {
          //1代表可以取消；2不能
          let cancel_data = {
            enterpriseid: window.api.enterpriseId,
            usestatus: 6,
            telepone: this.userInfo.phone,
            orderdate: null
          }

          let req = null;
          if (this.param == 0) {

            cancel_data.installno = val;
            cancel_data.installtype = 0;
            req = await upDateInstall(cancel_data)
          }

          if(this.param == 1 || type == 'pj') {
            cancel_data.installno = val;
            cancel_data.installtype = 1;
            req = await upDateInstall(cancel_data)
          }

          if (this.param == 2 || this.param == 3 || type == 'wb') {
            cancel_data.maintenanceno = val;
            req = await upDateMaintainInfo(cancel_data)
          }
          if (req.returncode == 1) {
            Toast({
              message: '取消成功！',
              iconClass: "aui-iconfont aui-icon-correct",
              duration: 500
            });
            this.$store.dispatch('changeClassifyIndex', 0)
            this.initData(0);
            return
          }

        } else if (res.data.returnCode == 0) {
          Toast({
            message: res.data.message,
            iconClass: "aui-iconfont aui-icon-close",
            duration: 500
          });
          return
        }
      }
      ,
      async cancel(val){
        let req;
        let data = {
          "enterpriseid":window.api.enterpriseId,
          "usestatus":6,
        }
        if(this.param == 4) {
          data.maintenanceno = val;
          req = await updateTerminalMaintenanceinfo(data);
        }

        if(this.param == 5){
          data.removeno = val;
          data.cartype = null;
          req = await updateTerminalDismantleinfo(data);
        }
        this.errMsg(req);
        this.initData(0);
      }
      ,
      async cancelTerminal(val){
        //终端售后取消预约 
        let data ={
          "aftersaleserviceno":val.aftersaleserviceno,
          "aftersaleserviceid":val.aftersaleserviceid,
          "userstatus":1,
          "enterpriseid":window.api.enterpriseid
        }
        let req = await axios.put(window.api.local_host+'/valueAdded/terminalSaleAfter/cancelBooking',data,{headers:{'sessionId':this.sessionId}});
        if(req.status ==200){
          if(req.data.returncode==1){
            Toast({
              message: "取消成功",
              iconClass: "aui-iconfont aui-icon-correct",
              duration: 500
            });
            this.initData(this.activeIndex);
            
          }else{
            Toast({
              message: req.data.errmsg,
              iconClass: "aui-iconfont aui-icon-close",
              duration: 500
            });
          }
        }
      },
      sureSub(val){
        //终端售后立即预约
        this.$store.dispatch('zwy/saveAfterSaleData', val)
        this.$router.push({path: '/main/addInstallTerminal', query: {serviceNo: this.param,sub:0}});
        
      },
      terminalOver(val){
        //终端售后确认完成
        MessageBox.confirm('提示', '确定执行此操作').then((action) => {
          this.sureTerminal(val);
        });
        
      },
      async sureTerminal(val){
        let data = {
          "aftersaleserviceno":val.aftersaleserviceno,
          "aftersaleserviceid":val.aftersaleserviceid,
          "userstatus":val.userstatus+1,
          "enterpriseid":window.api.enterpriseid,
        }
        let req = await axios.put(window.api.local_host+'/valueAdded/terminalSaleAfter/confirm',data,{headers:{'sessionId':this.sessionId}});
        console.log(req,'rea')
        if(req.status ==200){
          if(req.data.returncode==1){
            Toast({
              message: "成功",
              iconClass: "aui-iconfont aui-icon-correct",
              duration: 500
            });
            this.initData(this.activeIndex);
            
          }else{
            Toast({
              message: req.data.errmsg,
              iconClass: "aui-iconfont aui-icon-close",
              duration: 500
            });
          }
        }
      },
      refuseDetail(val) {
        this.refuseInfo = val.reason;
        this.refuseTime = val.refusetime;
        this.refuseService = val.servicename;
      }
      ,
      //点击确认按钮
      orderOver (item) {
        var config = updateServiceInfor(item, this.sessionId);
        MessageBox.confirm('提示', '确定执行此操作').then((action) => {
          this.sendInstall(item, 3)
          this.upDateServiceInfo(config);
          this.updateCarInfo(item);
        });
      },
      updateCarInfo(item) {
        let config = {
          "othsid": item.vehicleid,
          "termno": item.teamno,
          "enterpriseid": window.api.enterpriseId,
          "mobile": this.userInfo.phone,
          "type": "UPDATE",
          "carframeno": item.carframeno,
          "engineno": item.engineno,
          // "smartterm": 0,
        }

        axios.post(window.api.mall_base_host + "clientotherinfo/updatevipcarinfo", config);
      },
      //更新安装单
      async  sendInstall (item, state) {
        let res;
        let sendInstall_data = {
          enterpriseid: window.api.enterpriseId,
          usestatus: state,
          serviceid: item.serviceid
        }

        if (this.param == 0 ) {
          sendInstall_data.telepone = item.telepone
          sendInstall_data.installno = item.installno
          sendInstall_data.name = item.servicename
          sendInstall_data.installtype = 0;
          res = await upDateInstall(sendInstall_data)
        } else if( this.param == 1 || item.type == "pj") {
          sendInstall_data.telepone = item.telepone
          sendInstall_data.installno = item.installno
          sendInstall_data.name = item.servicename
          sendInstall_data.installtype = 1;
          res = await upDateInstall(sendInstall_data)
        } else  if (this.param == 2 || this.param == 3 || item.type == "wb") {
          sendInstall_data.telepone = item.telepone
          sendInstall_data.maintenanceno = item.maintenanceno
          sendInstall_data.name = item.name
          res = await upDateMaintainInfo(sendInstall_data)
        } else if (this.param == 4) {
          sendInstall_data.maintenanceno = item.maintenanceno
          sendInstall_data.telepone = item.telepone
          sendInstall_data.name = item.name
          res = await updateTerminalMaintenanceinfo(sendInstall_data)
        } else if (this.param == 5) {
          sendInstall_data.removeno = item.removeno
          sendInstall_data.telepone = item.telepone
          res = await updateTerminalDismantleinfo(sendInstall_data)
        }else if (this.param == 5) {
          sendInstall_data.aftersaleserviceno = item.aftersaleserviceno
          sendInstall_data.telephone = item.telephone
        }


        if (res.returncode == 0) {
          Toast({
            message: res.errmsg,
            iconClass: "aui-iconfont aui-icon-close",
            duration: 500
          });
          return
        } else {
          Toast({
            message: "成功",
            iconClass: "aui-iconfont aui-icon-correct",
            duration: 500
          });
          this.data = []
        }

        this.$store.dispatch('changeClassifyIndex', 0)
        this.initData(0)

      },
      //排序
      compare(prop) {
        return function (obj1, obj2) {
          var val1 = obj1[prop];
          var val2 = obj2[prop];
          if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
          }
          if (val1 < val2) {
            return 1;
          } else if (val1 > val2) {
            return -1;
          } else {
            return 0;
          }
        }
      },
      upDateServiceInfo (config){
        axios({
          method: "post",
          data: config,
          url: window.api.mall_base_host + "linkCarsIplat/updateTermnoInfo"
        })
      },
      searchParamFn() {
        
        const startTime = this.startTime ? dayjs(this.startTime).valueOf() : 0;
        const endTime = this.endTime ? dayjs(this.endTime).valueOf() : 4670413261000;
        const orderNo = this.searchNum;
        if (startTime > endTime) {
          Toast({
            message: "日期填写错误",
            iconClass: "aui-iconfont aui-icon-close",
            duration: 500
          });
          return
        }

        let arr = this.data.filter(function(item) {
          return item.orderdate >= startTime
        }).filter(function(item) {
          return item.orderdate <= endTime
        }).filter(function(item) {
          if (orderNo) {
            return item.installno === orderNo || item.maintenanceno === orderNo
          }
          return true
        })

        this.data = arr

      },  
      async searchFn() {
        this.$store.dispatch('changeClassifyIndex', 0);
        await this.initData(0)
        if (this.param == 8) {
          this.searchParamFn()
          return
        }
        let begin_Time = this.startTime ? this.timeTransform(this.startTime, 1) : null;

        let out_Time = this.endTime ? this.timeTransform(this.endTime, 1) : null;
        let num = this.searchNum;
        if (!begin_Time && !out_Time && !num) return
        let newData = [];
        let dataInfo = [];
        for (let i of this.data) {
          //日期查询
          if ((begin_Time || out_Time) && !num) {
            let t = null;
            if (this.param == 2 || this.param == 3) {
              t = i.orderdate;

            }
            if (this.param == 0 || this.param == 1) {
              t = this.timeTransform(i.orderdate, 1);
            }
            if(this.param==6){
              t = i.serverdate;
            }

            //只有开始时间
            if (begin_Time && !out_Time) {
              if (begin_Time <= t) {
                newData.push(i);
              }

            }
            //只有结束时间
            if (!begin_Time && out_Time) {
              if (t <= out_Time) {
                newData.push(i);
                // console.log(newData);
              }
            }
            //开始和结束时间同时存在
            if (begin_Time && out_Time) {
              //如果结束和开始时间相同，或者相等则提示错误
              if (begin_Time > out_Time || begin_Time == out_Time) {
                Toast({
                  message: "日期填写错误",
                  iconClass: "aui-iconfont aui-icon-close",
                  duration: 500
                });
                return
              }
              if (begin_Time <= t && t <= out_Time) {
                newData.push(i);
                // console.log(newData);
              }
            }

          }
          //单号查询
          if (num && !(begin_Time || out_Time)) {
            //安装单
            if (i.installno) {
              if (num == i.installno) {
                newData.push(i);
              }
            }
            //维保单
            if (i.maintenanceno) {
              if (num == i.maintenanceno) {
                newData.push(i);
              }
            }
            //
            if (i.removeno) {
              if (num == i.removeno) {
                newData.push(i);
              }
            }
            //终端售后
            if(i.aftersaleserviceno){
              if (num == i.aftersaleserviceno) {
                newData.push(i);
              }
            }
          }
          //同时查询
          if ((begin_Time || out_Time) && num) {
            // let t = this.timeTransform(i.orderdate, 2);
            let t = null;
            if (this.param == 2 || this.param == 3) {
              t = i.orderdate;

            }
            if (this.param == 0 || this.param == 1) {
              t = this.timeTransform(i.orderdate, 1);
            }
            if(this.param==6){
              t = i.serverdate;
            }
            //只有开始日期
            if (begin_Time && !out_Time) {
              if (begin_Time <= t) {
                newData.push(i);
              }

            }
            //只有结束日期
            if (!begin_Time && out_Time) {
              if (t <= out_Time) {
                newData.push(i);
              }
            }
            //同时开始和结束
            if (begin_Time && out_Time) {
              if (begin_Time > out_Time || begin_Time == out_Time) {
                Toast({
                  message: "日期填写错误",
                  iconClass: "aui-iconfont aui-icon-close",
                  duration: 500
                });
                return
              }
              if (begin_Time <= t && t <= out_Time) {
                newData.push(i);
              }
            }

          }
        }
        if ((begin_Time || out_Time) && num) {
          for (let l of newData) {
            //安装单
            if (l.installno) {
              if (num == l.installno) {
                dataInfo.push(l);
              }
            }
            // //维保单
            if (l.maintenanceno) {
              if (num == l.maintenanceno) {
                dataInfo.push(l);
              }
            }
            //安装维修和拆除
            if(l.removeno) {
              if(num == l.removeno) {
                dataInfo.push(l);
              }
            }
            //终端售后
            if(i.aftersaleserviceno){
              if (num == i.aftersaleserviceno) {
                dataInfo.push(i);
              }
            }
          }
          newData = dataInfo;
        }

        this.data = newData.sort((a, b) => {
          //安装和维保返回的时间格式不同处理
          if (this.param == 0 || this.param == 1) {
            return this.timeTransform(b.orderdate, 1) - this.timeTransform(a.orderdate, 1)
          }
          if (this.param == 2 || this.param == 3) {
            return b.orderdate - a.orderdate
          }
          if(this.param==6){
            return b.serverdate - a.serverdate
          }
        })

        this.data = newData;
        
      },
      // 数组去重
      unique(arr){
        var res = [arr[0]];
        for(var i=1; i<arr.length; i++){
          var repeat = false;
          for(var j=0; j<res.length; j++){
          if(arr[i].installno === res[j].installno && arr[i].maintenanceno === res[j].maintenanceno){
            repeat = true;
            break;
          }
          }
          if(!repeat){
            res.push(arr[i]);
          }
        }
        return res;
      }
      ,
      timeTransform(val, options) {

        if (!val) {
          return
        }
        if (options == 1) {
          let a = new Date(val);
          let b = Date.parse(a);
          return b;
        } else if (options == 2) {
          console.log(val)
          let a = val.replace(/-/g, "/");
          let b = new Date(a);
          let c = Date.parse(b);
          return c;
        }


      }
      ,
      getTime(param){
        let date = new Date(param);
        let year = date.getFullYear();
        let month = checkTime(date.getMonth() + 1);
        let day = checkTime(date.getDate());
        let hour = checkTime(date.getHours());
        let min = checkTime(date.getMinutes());
        let sec = checkTime(date.getSeconds());
        //2017-09-04T16:00:00.000Z
        function checkTime(i) {
          if (i < 10) {
            i = '0' + i;
          }
          return i;
        }

        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec ;
      }
      ,
      showImage(val){

        if(val) {
          if(val.indexOf(',') !== -1){
            let i = null;
            return val.substr(0,i);
          } else {
            return val;
          }
        } else {
          return 'static/image/demo1.png'
        }

      }
      ,
      toDetails(item) {
        if (this.param == 8) {
          if (item.type == "pj") {
            this.$router.push({path:'/installDetails',query:{installno:item.installno,param:1}});
          } else {
            this.$router.push({path:'/installDetails',query:{maintenanceno:item.maintenanceno,param:2}});
          }
          return
        }
        if(this.param == 0 || this.param == 1) {
          this.$router.push({path:'/installDetails',query:{installno:item.installno,param:this.param}});
          return
        }
        if(this.param == 2 || this.param == 3) {
          this.$router.push({path:'/installDetails',query:{maintenanceno:item.maintenanceno,param:this.param}});
          return
        }
        if(this.param == 4) {
          this.$router.push({path:'/installDetails',query:{removeno:item.maintenanceno,param:this.param}});
          return
        }
        if(this.param == 5) {
          this.$router.push({path:'/installDetails',query:{removeno:item.removeno,param:this.param}});
          return
        }
        if(this.param == 6) {
          this.$router.push({path:'terminalDetail',query:{aftersaleserviceid:item.aftersaleserviceid,param:this.param}});
          return
        }
      }
      ,
    }
  }
</script>


<style scoped>
  .aui-content {
    background: #eaeaea;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(100%);
  }

  .rate {
    margin-left: 30%;
  }

  .goleft-enter-active, .goright-enter-active, .goleft-leave-active, .goright-leave-active {
    transition: all 0.5s;
  }

  .goleft-enter, .goright-leave-to {
    transform: translatex(30%);
    opacity: 0
  }

  .goright-enter, .gotleft-leave-to {
    transform: translatex(-30%);
    opacity: 0
  }

  #mt {
    width: 80%;
    height: 200px;
    border-radius: 3px;
    /* text-align: center; */
    line-height: 33px;
    text-align: center;
    /*padding-top: 15px;*/
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  #mt > h2 {
    color: #333;
    font-weight: 700;
    flex-grow: 1;
    padding-top: 10px;
  }

  #mt_div {
    padding-left: 15px;
    /*padding-top: 5px;*/
    /*padding-bottom: 5px;*/
    text-align: left;
    border-bottom: 1px solid #ccc;
    flex-grow: 1;
  }

  #mt_btn {
    width: 25%;
    height: 1.8rem;
    margin: auto;
    font-size: 16px;
    color: #0f8de0;
    background-color: #fff;
    flex-grow: 0.5;
  }
  .refuseInfo{
    overflow-y: auto;
    line-height: 24px;
    height: 3rem;
    white-space: normal;
    word-break: break-all;
  }
  .order_list_div {
    /*background: #f5f5f5;*/
  }
  .service_list {
    margin-bottom: .5rem;
  }
  .service_list img {
    height: 100%;
  }
</style>
