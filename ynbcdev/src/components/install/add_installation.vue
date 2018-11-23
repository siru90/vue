<template>
  <div class="vue_app" style="position: absolute;width: 100%">
    <!--头部-->
    <header class="aui-bar aui-bar-nav aui-bar-light" style="display:block;">
      <router-link :to="{path:'/main/install', query:{serviceNo:serviceParam}}">
        <div class="go-back">
          <i></i>
          <i></i>
          <i></i>
        </div>
      </router-link>
      <div class="aui-title">新增预约工单</div>
      <div style="margin-top:0" class="aui-pull-right text-del" @click=" updateInstall" v-if="click == 1">保存</div>
      <div style="margin-top:0" class="aui-pull-right text-del" @click=" updateMaintain" v-if="click == 2">保存</div>
      <div style="margin-top:0" class="aui-pull-right text-del" @click=" updateTerminal" v-if="click == 3 || click == 4">保存</div>
    </header>
    <!--头部-->
    <div class="aui-content top_div">
      <ul class="aui-list aui-media-list address_list top_div">
        <li class="aui-list-header">
          选择车辆
        </li>
        <router-link :to="{path:'/main/car', query:{serviceNo:serviceParam, serviceId:serviceId,addressDetails: addressDetails,carId:carId,memo:serviceDescrible,orderDate:subscribeDate ? getTime(subscribeDate) : null,sub:sub,order:order,username:username,phone:phone,address: address}}">
          <li class="aui-list-item">
            <div class="aui-media-list-item-inner aui-list-item-arrow">
              <div class="aui-list-item-media">
                <img :src="carphoto ? carphoto : 'static/image/no_order.png'">
              </div>
              <div class="aui-list-item-inner">
                <div class="aui-list-item-text">
                  <div class="aui-list-item-title"><strong>车牌号码：{{carNo}}</strong><span
                    class="aui-font-size-14 text_c_gray"></span></div>
                </div>
                <p>发动机号：{{engineNo}}</p>
                <p>智能终端：{{smartTerm == 1 ? "已安装(" + termNo + "终端编号)" : smartTerm == 0 ? "未安装" : ""}}</p>
                <p>车架号码：{{carframeNo}}</p>
              </div>
            </div>
          </li>
        </router-link>
      </ul>
      <router-link :to="{path:'/main/serviceInfo',query:{serviceNo:serviceParam,addressDetails: addressDetails,carId:carId,memo:serviceDescrible,orderDate:subscribeDate ? getTime(subscribeDate) : null,sub:sub,order:order,serviceId:serviceId,username:username,phone:phone,address:address}}">
        <ul class="aui-list aui-media-list address_list top_div" v-if="click != 3 && click != 4">
          <li class="aui-list-header">
            选择服务商
          </li>
          <li class="aui-list-item">
            <div class="aui-media-list-item-inner aui-list-item-arrow">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-text">
                  <div class="aui-list-item-title"><strong>服务商：{{serviceName}}</strong><span
                    class="aui-font-size-14 text_c_gray"></span></div>
                </div>
                <p>地址：{{serviceAddress}}</p>
                <p>联系人：{{serviceName}}</p>
                <p>联系电话：{{servicePhone}}</p>
              </div>
            </div>
          </li>
        </ul>
      </router-link>
      <ul class="aui-list aui-form-list aui-margin-b-15">
        <li class="aui-list-header">
          服务选择
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">服务类型 </div>
            <div class="aui-list-item-input">
              {{serviceParam == '0' ? '安装单服务' : (serviceParam == '1' ? '配件安装单服务' : (serviceParam == '2' ? '维修预约' : (serviceParam == '3' ? '保养预约' : (serviceParam == '4' ? '终端维修' : (serviceParam == '5' ? '终端拆除' : '')))))
              }}
            </div>
          </div>
        </li>
        <li class="aui-list-item" v-if="false">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">服务方式</div>
            <div class="aui-list-item-input">
              <!-- <label><input class="aui-radio" type="radio" name="demo2" v-model="serviceType" value="one"> 上门服务</label> &nbsp;&nbsp; -->
              <div class="aui-list-item-input">店内服务</div>
              <!-- <label><input class="aui-radio" type="radio" name="demo2" v-model="serviceType" value="two"> 店内服务</label> -->
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">预约服务日期</div>
            <div class="aui-list-item-input">
              <!-- <input type="date" placeholder="选择日期" v-model="subscribeDate"> -->
              <Date-picker type="datetime" placeholder="选择日期和时间" style="width: 200px"
                           v-model="subscribeDate"></Date-picker>
            </div>
          </div>
        </li>
      </ul>

      <ul class="aui-list aui-form-list aui-margin-b-15">
        <li class="aui-list-header">
          联系方式
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">联系人 </div>
            <div class="aui-list-item-input">
              <input type="text" placeholder="联系人姓名" v-model="username">
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">手机号码</div>
            <div class="aui-list-item-input">
              <input type="number" placeholder="联系人手机号码" v-model="phone">
            </div>
          </div>
        </li>
        <li class="aui-list-item"  v-if="add_turn" @click="show = !show">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">所在地区</div>
            <div class="aui-list-item-input aui-list-item-arrow">
              <div class="chose" ref="chose">{{addressProvince}}{{addressCity}}{{addressXian}}</div>

            </div>
          </div>
        </li>
        <li class="aui-list-item" @click="add_turn = !add_turn; show = !show" v-else>
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">所在地区</div>
            <div class="aui-list-item-input aui-list-item-arrow">
              <div class="chose" ref="chose">{{province}}{{city}}{{region}}</div>
            </div>
          </div>
        </li>
        <li class="aui-list-item menpai">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">详细地址</div>
            <div class="aui-list-item-input">
              <textarea placeholder="请输入详细地址" v-model="addressDetails"></textarea>
            </div>
          </div>
        </li>
        <mt-popup v-model="show" position="bottom" popup-transition="popup-fade" style="width:100%;height:200px;">
          <mt-picker :slots="addressSlots"
                      ref="picker"
                      @change="onAddressChange"
                      :visible-item-count="5"
                     :style="show ? 'display:block': 'display:none'"
                      :showToolbar="true"
                      >

                       <span class="mint-datetime-action mint-datetime-cancel" @click="show = !show;add_turn = !add_turn;">取消</span>
                       <span class="mint-datetime-action mint-datetime-confirm" @click="show = !show">确认</span>
          </mt-picker>
        </mt-popup>
      </ul>

    </div>
  </div>
</template>
<script>
  import {getService, setInstall, upDateInstall,getCarInfo, getUserInfo, addMaintain, getUserInfoAgain, orderDetails, getAddress, upDateMaintainInfo, updateTerminalMaintenanceinfo, updateTerminalDismantleinfo} from "../config/getData.js"
  import addressInfo from "../../../static/json/address3.json"
  // import api from '../../api/index.js'
  import {mapGetters, mapMutations, mapActions} from "vuex"
  import {Picker, Popup} from "mint-ui"
  import {Toast} from "../../utils/toast2.js"
  import axios from 'axios'
  import iView  from "iview"
  import Datepicker from 'iview/src/components/date-picker';
  import 'iview/dist/styles/iview.css';
  export default {
    data() {
      return {
        carId: null,//车辆id
        carNo: null,//车牌号
        carphoto: null,//汽车图片
        engineNo: null,//发动号
        smartTerm: null,//是否安装
        termNo: null,//终端号
        carframeNo: null,//车架号
        serviceInfo: null,//服务商信息
        serviceId: null,
        serviceName: null,//名字
        servicePhone: null,//电话
        serviceAddress: null,//地址
        username: null,//联系人
        phone: null,//联系电话
        address: null,//联系地址
        addressDetails: null,//详细地址
        inputAddress:null,//省市区地址
        // goodsname: null,//产品名称
        // goodsType: null,//产品类型
        // buyDate:null,//购买日期
        // buyMethods:null,//购买渠道
        serviceType: '安装单服务',//服务类型
        serviceParam: null,//入口传参
        serviceMethods: '服务方式',//服务方式
        serviceOrder: null,
        subscribeDate: null,//预约日期
        // subscribeTime: null,//预约时间
        serviceDescrible: null, //服务描述
        addressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: Object.keys(addressInfo),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        show: false,
        addressProvince: null,
        province: null,
        city: null,
        region: null,
        addressCity: null,
        addressXian: null,
        add_turn: false,
        flag: true,
        flag_1: false,
        click: null,
        installNo: null, //安装单id 获取自提订单的服务商
        sub: null,
        carId: null,
        ser: null,
        order: null, //安装和维保单号 更新时使用
        inputAddress: null,
      }
    }
    ,
    async mounted() {
      await  this.getUserInfo();//检查sessionId
      this.initData();
      this.getCar();

      this.serviceParam = this.$route.query.serviceNo;
      this.addressDetails = this.$route.query.addressDetails;
      this.carId = this.$route.query.othsid;
      this.serviceDescrible = this.$route.query.memo;
      this.subscribeDate = this.$route.query.orderDate;
      //点击立即预约跳转过来默认展示增值服务已存在的服务商
      this.sub = this.$route.query.sub;
      this.order = this.$route.query.order;
      this.serviceId = this.$route.query.serviceId;
      this.address = this.$route.query.address;


      // {
      //   serviceNo:serviceParam,
      //   addressDetails: addressDetails,
      //   carId:carId,
      //   memo:serviceDescrible,
      //   orderDate:subscribeDate ? getTime(subscribeDate) : null,
      //   sub:sub,
      //   order:order,
      //   serviceId:serviceId,
      //   username:username,
      //   phone:phone,
      //   address:address
      // }















      if (this.serviceParam == 0 || this.serviceParam == 1) {
        this.click = 1;
      } else if(this.serviceParam == 2 || this.serviceParam == 3) {
        this.click = 2;
      } else if(this.serviceParam == 4) {
        this.click = 3;
      } else if(this.serviceParam == 5) {
        this.click = 4;
      }
    }
    ,
    watch: {
      addressDetails (newValue, oldValue) {
        this.flag = true;
        this.flag_1 = false;
        this.getServiceInfo();

      }
      ,

    }
    ,
    components: {
      "mt-picker": Picker,
      "picker-name": Picker.name,
      "mt-popup": Popup,
      "popup-name": Popup.name,
      "Date-picker": Datepicker
    }
    ,
    computed: {
      ...mapGetters('xhModules', [
        'userInfo',
        'sessionId',
        'login',
        'car',
      ])
    }
    ,
    methods: {
      ...mapActions('xhModules', [
        'getUserInfo'
      ])
      ,
      ...mapMutations('xhModules', [
        'USER_INFO',
        'LOGO_OUT',
        'LOGO_IN',
        'RECORD_CAR',
      ])
      ,
      async initData() {
        //页面刷新加载用户数据
        let response = await getUserInfoAgain(this.sessionId);
        if (response.returncode === 0) {
          this.LOGO_OUT(false);
          return
        }

        this.USER_INFO(response.data[0]);
        this.LOGO_IN(true);

        if(this.userInfo.addressList.length == 0 && !this.addressDetails){
    		  Toast({
    		    message: "请填写地址!",
    		    duration: 2000,
            	iconClass:"aui-iconfont aui-icon-close"
    		  });
        }

        //添加联系方式
        if(this.$route.query.username == undefined) {
          this.username = this.userInfo.vipname;
        } else {
          this.username = this.$route.query.username;
        }
        if(this.$route.query.phone == undefined) {
          this.phone = this.userInfo.phone;
        } else {
          this.phone = this.$route.query.phone;
        }
        // this.phone = this.userInfo.phone
        //添加默认地址;
        if(this.$route.query.address) {
          // console.log(this.$route.query.address)
          this.$refs.chose.innerHTML = this.$route.query.address;
        } else {


        let collect_def = [];
        let collect_no = [];
        let storage;
	      for (let i of this.userInfo.addressList) {

		        if (i.defaultaddress == "默认") {
              collect_def.push(i);
		        }
            if(i.defaultaddress == "非默认") {
              collect_no.push(i);
            }

        }
        if(collect_def.length == 0) {
          storage = collect_no;
        } else {
          storage = collect_def;
        }
        //未编辑地址时存储默认地址.
        if(this.$route.query.addressDetails == undefined){

            this.addressDetails = storage[0].address;

        }
        //获取省市区
        let res_pro = await axios.get(window.api.mall_base_host+'address/getarealist?areaid=1');
        for(let j of res_pro.data.data.arealist){

          if(storage[0].province == j.id) {
            this.province = j.name;
          }

        }

        let res_city = await axios.get(window.api.mall_base_host+'address/getarealist?areaid=' + storage[0].province);
        for(let k of res_city.data.data.arealist){

          if(storage[0].city == k.id) {
            this.city = k.name;
          }

        }

        let res_region = await axios.get(window.api.mall_base_host+'address/getarealist?areaid=' + storage[0].city);
        for(let l of res_region.data.data.arealist){

          if(storage[0].region == l.id) {
            this.region = l.name;
          }

        }
        }
	      //获取省市区end;

        //sub == 0预约跳转; sub == 1 新增跳转; sub == 2 选择服务商跳转;
        if(this.sub == 0){
        	this.flag_1 = true;
        	this.flag = false;//通过地址选择服务商;
        	this.getServiceInfo();
        }

        if(this.sub == 1) {
          if(this.$route.query.sub_1 == 0) {
            this.flag_1 = true;
            this.flag = false;//通过地址选择服务商;
            this.getServiceInfo();
            return
          }
        	this.flag_1 = false;
        	this.flag = true;
        	this.getServiceInfo();
        }
      }
      ,
      //获取服务商信息
      async getServiceInfo() {
      	let service_data;
        let res;
        let service_config;
      	if(this.flag) {
      		service_data = {
      		  "enterpriseid": String(window.api.enterpriseId),
      		  "address": this.addressDetails || "北京",
      		  "coordinates": "",
      		};
      	}
      	if(this.flag_1) {
      		service_data = {
      		  "enterpriseid": String(window.api.enterpriseId),
      		  "address": "北京",
      		  "coordinates": "",
      		};
      	}
    		service_config = {
    		  url: window.api.mall_base_host + 'service/findServiceProviderInfo',
    		  method: 'post',
    		  data: JSON.stringify(service_data),
    		  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    		};

  		res = await getService(service_config);

  		if(this.flag){
  			if (res.data.code == 1 || res.data.code == "1") {
          if(!this.$route.query.sub_1) {
                  service_data = {
                    "enterpriseid": String(window.api.enterpriseId),
                    "address": '北京',
                    "coordinates": "",
                  };
                  service_config = {
                    url: window.api.mall_base_host + 'service/findServiceProviderInfo',
                    method: 'post',
                    data: JSON.stringify(service_data),
                    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
                  };
                  res = await getService(service_config);
          }

  			}
  		}


  		let req = res.data.distanceList;
    		if (this.$route.query.serviceId) {
    		  for (let i of req) {
    		    if (i.serviceid == this.serviceId) {
    		      this.serviceAddress = i.address;
    		      this.serviceName = i.name;
    		      this.servicePhone = i.telepone;
    		      this.serviceOrder = i.serviceno;
    		    }
    		  }
    		} else {
          console.log(req[0])
    		  this.serviceAddress = req[0].address;
    		  this.serviceName = req[0].name;
    		  this.servicePhone = req[0].telepone;
    		  this.serviceOrder = req[0].serviceno;
    		  this.serviceId = req[0].serviceid;
    		}

      }
      ,
      //地址


      onAddressChange(picker, values) {
        if(values[0] == undefined)return
        let sheng = Object.keys(addressInfo);
        let shi = Object.keys(addressInfo[values[0]]);
        let index = shi.indexOf(values[1])
        let xian = addressInfo[values[0]][shi[index]];
        this.addressProvince = values[0];
        this.addressCity = values[1];
        this.addressXian = values[2];
        picker.setSlotValues(1, shi);
        picker.setSlotValues(2, xian);
        this.address = values[0] + values[1] + values[2];
      }
      ,
      async updateInstall () {
        if(!this.validate()) return;
        let data = {
          carno: this.carNo,//车牌号
          vehicleid: this.carId,//车辆id
          engineno: this.engineNo,//发动号
          teamno: this.termNo,//终端号  ******
          carframeno: this.carframeNo,//车架号
          serviceid: this.serviceId,//服务商id
          serviceno: this.serviceOrder,//服务商单号
          name: this.serviceName,//服务商名称
          vipaddress: this.inputAddress,//收货地址
          vipname: this.username,//联系人
          telepone: this.phone,//联系电话
          installtype: this.serviceParam,//服务类型
          orderdate: this.subscribeDate,//预约日期
          memo: this.serviceDescrible, //服务描述
          usestatus: 7,

        }
        if(this.serviceParam==1){
          data.usestatus = 0;
        }
        let req;
        if(this.sub == 0 ){
          data.installno = this.order;
          data.enterpriseid = window.api.enterpriseId;
        	req = await upDateInstall(data);
        }
        if(this.sub == 1) {
        	req = await setInstall(data);
        }
        this.errMsg(req);
      }
      ,
      async updateMaintain () {
        if(!this.validate()) return;
        let req;
        let data = {
          carno: this.carNo,//车牌号
          serviceid: this.serviceId,//服务商id*
          "engineno": this.engineNo,//发动号
          "teamno": this.termNo,//终端号  ******
          "carframeno": this.carframeNo,//车架号
          serviceno: this.serviceOrder,//服务商单号
          name: this.serviceName,//服务商名称*
          vipname: this.username,//联系人
          vipaddress: this.inputAddress,//收货地址
          maintenancetype: this.serviceParam == 2 ? 0 : 1,//服务类型 0 维修 1 保养
          orderdate: this.subscribeDate,//预约日期
          memo: this.serviceDescrible, //服务描述
          usestatus: 0,
          vehicleid: this.carId,
        }

        if(this.sub == 0) {
        		data.maintenanceno = this.order;
        		data.enterpriseid = window.api.enterpriseId;
        		data.telepone = this.userInfo.phone;
        		data.vipid = this.userInfo.vipid;
        	req = await upDateMaintainInfo(data);
        }

        if(this.sub == 1) {
          data.vehicleid = this.carId;
        	req = await addMaintain(data);
        }
        this.errMsg(req);
      }
      ,
      async updateTerminal() {
        if(!this.validate()) return;
        let req;
        //维修
        let data_1 = {
            "carno": this.carNo,//车牌号
            "vehicleid": this.carId,//车辆id
            "engineno": this.engineNo,//发动号
            "teamno": this.termNo,//终端号  ******
            "carframeno": this.carframeNo,//车架号
            "serviceid": this.serviceId,//服务商id*
            "serviceno": this.serviceOrder,//服务商单号
            "name": this.serviceName,//服务商名称*
            "vipname": this.username,//联系人
            "vipaddress": this.inputAddress,//收货地址
            "maintenancetype": "3",//
            "orderdate": this.subscribeDate,//预约日期
            "memo": this.serviceDescrible, //服务描述
            "usestatus": 0,
            "maintenanceno" :this.order,
            "enterpriseid" : window.api.enterpriseId,
            "telepone" : this.userInfo.phone,
            "vipid" : this.userInfo.vipid,
        }

        //拆除
        let data = {
          "enterpriseid":window.api.enterpriseId,
          "removeno":this.sub == 0 ? this.order : "",//新增不传
          "removetype":1,
          "serviceid":this.serviceId,
          "serviceno":this.serviceOrder,
          "orderdate":this.subscribeDate,
          "telepone":this.userInfo.phone,
          "usestatus":0,
          "carno": this.carNo,
          "teamno": this.termNo,
          "engineno": this.engineNo,
          "carframeno": this.carframeNo,
          "vehicleid": this.carId,
          "photo": null,
        }

        Array.from(this.car).splice(Array.from(this.car).indexOf(this.carId), 1);
        this.RECORD_CAR(this.car);
        if(this.serviceParam == 4) {
          req = await updateTerminalMaintenanceinfo(data_1);
        }
        if(this.serviceParam == 5) {
          req = await updateTerminalDismantleinfo(data);
        }
        this.errMsg(req);

      }
      ,
      errMsg(data) {
        if (data.returncode == 0) {
          Toast({
            message: data.errmsg,
            iconClass:"aui-iconfont aui-icon-close",
            duration: 2000
          });
        }

        if (data.returncode == 1) {
          this.$router.push({path: '/main/install', query: {serviceNo: this.serviceParam}});
        }
      }
      ,
      validate() {
        let flag = true;
           this.inputAddress = this.$refs.chose.innerHTML + this.addressDetails;
          if(this.$refs.chose.innerHTML == '' || this.addressDetails == undefined || this.addressDetails == '') {
            Toast({
              message: '请填写地址',
              iconClass:"aui-iconfont aui-icon-close",
              duration: 2000
            });
            flag = false;
          }
          if(!this.serviceName){
            Toast({
              message: '未选择服务商',
              iconClass:"aui-iconfont aui-icon-close",
              duration: 2000
            });
            flag = false;
          }
          if(!this.subscribeDate){
            Toast({
              message: '未选择预约日期',
              iconClass:"aui-iconfont aui-icon-close",
              duration: 2000
            });
            flag = false;
          }
          if(!this.engineNo){
            Toast({
              message: '未选择车辆',
              iconClass:"aui-iconfont aui-icon-close",
              duration: 2000
            });
            flag = false;
          }
          let T1 = Date.parse(this.subscribeDate);
          let T2 = new Date().getTime();
          if(T1 < T2) {
            Toast({
              message: '所选时间必须大于当前时间！',
              iconClass:"aui-iconfont aui-icon-warn",
              duration: 2000
            });
            flag = false;
          }
          return flag;
      }
      ,
      async getCar() {
        //获得车辆
        let date = new Date().getTime();
        let req = await axios.get(window.api.mall_base_host + "clientotherinfo/getvipcarinfo?enterpriseid=" + window.api.enterpriseId + "&phone=" + this.userInfo.phone+"&token=" + date).then(res => {
          return res.data.data.carlist
        });

        for (let i of req) {
          if(this.serviceParam != 4 && this.serviceParam != 5){
          	if(this.carId) {

          		if (i.othsid == this.carId) {
          		  this.carNo = i.carnumber;
          		  this.engineNo = i.engineno;
          		  this.termNo = i.termno;
          		  this.smartTerm = i.smartterm;
          		  this.carframeNo = i.carframeno;
          		  this.carphoto = i.carphoto;
                this.carId = i.othsid;
          		}
          	} else {
          		if (i.cardefault == 1) {
          		  this.carNo = i.carnumber;
          		  this.engineNo = i.engineno;
          		  this.termNo = i.termno;
          		  this.smartTerm = i.smartterm;
          		  this.carframeNo = i.carframeno;
          		  this.carphoto = i.carphoto;
                this.carId = i.othsid;
          		}
          	}
          } else {
            if(this.carId) {
               if (i.othsid == this.carId) {
                this.carNo = i.carnumber;
                this.engineNo = i.engineno;
                this.termNo = i.termno;
                this.smartTerm = i.smartterm;
                this.carframeNo = i.carframeno;
                this.carphoto = i.carphoto;
                this.carId = i.othsid;

              }
            } else {
              this.car.forEach((index) => {
               if (index !== i. othsid && i.termno) {
                  this.carNo = i.carnumber;
                  this.engineNo = i.engineno;
                  this.termNo = i.termno;
                  this.smartTerm = i.smartterm;
                  this.carframeNo = i.carframeno;
                  this.carphoto = i.carphoto;
                  this.carId = i.othsid;
                }
              })
            }

          }

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
        function checkTime(i) {
          if (i < 10) {
            i = '0' + i;
          }
          return i;
        }

        return year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':' + sec + 'Z';
      }
      ,

    }
  }
</script>
