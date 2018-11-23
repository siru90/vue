<template>
    <div id="addWbxfWorkOrder" style="width: 100%">
        <header style="display:block;" class="aui-bar aui-bar-nav aui-bar-light">
            <div class="go-back" @click="goBack">
                <i></i>
                <i></i>
                <i></i>
            </div>
            <div class="aui-title"> {{isRepairOrder ? "新增返修工单" : "维保预约"}}</div>
           
        </header>
        <div style="padding:3rem 0">
            <div class="carAndOrderPerson">
                <ul>
                    <li v-if="defaultCarMsg.carnumber" class="carNE">
                        <div class="carAndOrderPersonItemLight">
                            {{defaultCarMsg.carnumber || "未知车牌"}}
                        </div>
                        <div class="carAndOrderPersonItemDark">
                            {{defaultCarMsg.brandstype}}
                        </div>
                    </li>
                    <li @click="gotoSetCar" v-if="defaultCarMsg.carnumber" class="carEn">
                        <div class="carAndOrderPersonItemLight">
                            车载终端
                            <i style="float:right;margin-top:0.6rem;transform:rotate(180deg);color:#999999" class="njfont nj-fanhui"></i>
                        </div>
                        <div class="carAndOrderPersonItemDark">
                            {{defaultCarMsg.smartterm == 1 ? "已安装":"未安装"}}
                        </div>
                    </li>
                    <div @click="gotoSetCar" style="height:2.4rem;line-height:2.4rem;color:#333333;font-size:14px;font-weight:bold" v-if="!defaultCarMsg.carnumber">
                        <div @click.stop="gotoAddCar" style="display:inline-block">
                            <i  style="color:#0f8de0;padding-right:0.5rem;" class="iconfont icon-xinzeng"></i>
                            添加爱车更懂它
                        </div>
                        
                        <i style="float:right;margin-top:0.6rem;transform:rotate(180deg);color:#999999" class="njfont nj-fanhui"></i>
                    </div>
                    <li class="orderP">
                        <div class="carAndOrderPersonItemLight">
                            预约人
                        </div>
                        <div class="carAndOrderPersonItemDark">
                            <!-- <input style="height:auto;color:#999999;font-size:12px" type="text" v-model="username"> -->
                            {{username}}
                        </div>
                    </li>
                    <li class="orderPH">
                        <div class="carAndOrderPersonItemLight">
                            电话
                        </div>
                        <div class="carAndOrderPersonItemDark">
                            <input style="height:auto;color:#999999;font-size:12px" type="text" v-model="phone">
                        </div>
                    </li>
                </ul>
                <div class="carIcon">
                    <i class="iconfont icon-yunshuzhongwuliu"></i>
                </div>
            </div>
            <div class="wbxfAddTopLine">

            </div>
            <ul v-if="isRepairOrder" class="aui-list aui-form-list top_ul">
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">关联维保单号</div>
                        <div class="aui-list-item-input">
                            <input disabled readonly type="text" v-model="repairMaintenanceNo"  style="height:1.4rem;padding-left:0.2rem;color:#999999;text-align:right">
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">维保类型<span class="required-icon">*</span></div>
                        <div class="aui-list-item-input aui-list-item-arrow">
                            <select style="color:#999999;width:auto;float:right;padding-right:1rem;" v-model="maintenancetype" name="" id="">
                                <option value="1">保养服务</option>
                                <option value="0">维修服务</option>
                            </select>
                           
                        </div>
                    </div>
                </li> 
                <li v-if="faultcode" class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">维保提醒单号</div>

                        <div class="aui-list-item-input">
                            <input readonly disabled v-model="faultcode" type="text" style="height:1.4rem;padding-left:0.2rem;color:#999999;text-align:right">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div style="width:100%;display:flex;padding-top:0.5rem;">
                        <div style="min-width:4.5rem">预约说明</div>
                        <div style="width:100%;">
                            <textarea v-model="faultdesc" style="margin-top:0;padding-right:0.75rem;" placeholder="填写保养、维修事项及故障描述等">
                            </textarea>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务方式<span class="required-icon">*</span></div>
                        <div style="text-align:right" class="aui-list-item-input">
                            <input type="radio" class="aui-checkbox" name="serviceMode" value="1" v-model="serviceMode" id="goShop"><label for="goShop">进站</label>
                            <input type="radio" class="aui-checkbox" name="serviceMode" value="0" v-model="serviceMode" id="toHome" style="margin-left:20%"><label for="toHome">上门</label>
                        </div>
                    </div>
                </li>
                <li class="custom-aui-list-item">
                    <div  class="aui-list-item-inner aui-list-item-arrow" @click="gotoServicersList">
                        <div :class="!sureServiceData.name ? 'aui-list-item-label' : 'sureServiceDataName'" >
                            服务商<span class="required-icon">*</span>：
                            <span>{{sureServiceData?sureServiceData.name:''}}</span>
                            
                        </div>
                        <div style="text-align:right;padding-right:1.75rem;" v-if="!sureServiceData.name" class="aui-list-item-input">
                            <span  style="color:#999">选择服务商</span>
                            
                        </div>
                        <span v-if="sureServiceData.name" style="float:right;padding-right:1.75rem;font-size:14px;color:#999999">{{sureServiceData.distance}}</span>
                    </div>
                    <div v-if="sureServiceData.address" class="servicerLocation">
                       <i class="iconfont icon-dingwei"></i> {{sureServiceData.address}}
                    </div>
                </li>
                
                <li v-show="serviceMode != 1" class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-card-list" style="width:100%;padding-right:0.75rem;margin-bottom:0" :style="{'padding-bottom':serviceMode==1?'0':'0.45rem'}">
                            <div class="aui-card-list-header" style="padding:0;">
                                <span>
                                    服务地址
                                    <span class="required-icon">*</span>：
                                    <span style="font-size:12px;color:#0f8de0" v-if="doorServiceDistance">（预计上门里程{{doorServiceDistance}}）</span>
                                    
                                </span>
                            </div>
                            <div class="aui-card-list-content servicerLocation" v-if="serviceMode==1?true:false">
                            
                                <i class="iconfont icon-dingwei"></i> 
                                <span v-if="shopAddress">{{shopAddress}}</span>
                                <span v-else>请选择服务商</span>
                            </div>
                            <div style="display:flex;" v-else>
                                <i style="color:#999999;" class="iconfont icon-dingwei"></i><input  type="text" v-model="visitAddress" placeholder="请输入服务地址" style="height:1.4rem;padding-left:0.3rem;color:#999999">
                            </div>
                            
                            
                        </div>
                        <div class="aui-card-list-content shangmenAddress" v-if="serviceMode!=1?true:false" style="display:flex;justify-content: space-between;">
                                <div class="addressChoice">
                                    <div @click="goMap" style="border-bottom:1px solid #ededed;text-align:left;color:rgba(151, 0, 0,0.8);font-size:12px;height:1.6rem;line-height:1.6rem" >
                                       <i style="color:#999999;font-size:14px" class="iconfont icon-dingwei"></i> 地图选址
                                    </div>
                                    <div @click="goAddress" style="text-align:left;color:rgba(151, 0, 0,0.8);font-size:12px;height:1.6rem;line-height:1.6rem" >
                                      <i style="color:#999999;font-size:14px" class="iconfont icon-biji"></i>  地址簿
                                    </div>
                                </div>
                            </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div id="subTime" class="aui-list-item-inner">
                        <div style="min-width:4.5rem;" class="aui-list-item-label"><i class="iconfont icon-riqi"></i> 预约日期<span class="required-icon">*</span></div>
                        <div @click="openTimePicker" style="height:100%;line-height:2.2rem;text-align:right;color:#999999" class="aui-list-item-input">
                            <span v-if="subscribeDate">{{timeForm(subscribeDate)}}</span>
                            <span style="color:#999999" v-else>请选择预约日期</span>
                            <!-- <Date-picker :transfer="true" v-model="subscribeDate" :options="options3" type="datetime" placeholder="选择日期和时间" style="color:#999999"></Date-picker> -->
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <timepicker
            ref="timepick" 
            v-model="subscribeDate"
            @confirm="confirmSubDate"
            :startDate="new Date()"
            :endDate="endData"
            year-format="{value}年"
            month-format="{value}月"
            date-format="{value}日"
            hour-format="{value}时"
            minute-format="{value}分"
        >
        </timepicker>
        <div style="z-index:999" class="wbxf-bottom">
            <div @click="submitData" class="wbxf-bottom-btn">
                保存
            </div>
        </div>
    </div>
</template>
<script>
import {Picker, Popup,DatetimePicker, MessageBox} from "mint-ui";
import {mapGetters, mapMutations, mapActions,mapState} from "vuex";
import Datepicker from 'iview/src/components/date-picker';
import 'iview/dist/styles/iview.css';
import addressInfo from "../../../static/json/address3.json";
import {getService, setInstall, upDateInstall,getCarInfo, getUserInfo, addMaintain, getUserInfoAgain, orderDetails, getAddress, upDateMaintainInfo, updateTerminalMaintenanceinfo, updateTerminalDismantleinfo} from "../config/getData.js";
import axios from 'axios';
import * as types from "../../store/modules/gw-modules/mutation-types";
import {Toast} from "../../utils/toast2.js";
import {showLoading, hideLoading} from '../../utils/loading.js';
import { getTerminlMsg,addOrder } from './http'
import { getDefaultCar } from './http.js'
import { getPostion } from '../../utils/getPostion.js'
import { distanceByLnglat } from '../../utils/relativeDirection.js'
import dayjs from 'dayjs'
import { getSearchParamFromApp } from '../../utils/getSearchParamFromApp.js'
import { getCoordinateByLocationName, getDistanceByCoordinates, getApiAndUiLibaray } from '../../utils/amapTools.js'
export default {
    data() {
        return {
            serviceAddressLocation:[0,0],
            doorServiceDistance: "",
            endData:dayjs().add("1","year").toDate(),
            selectCarStatus:false,
            defaultCarMsg: {},
            reworkproperty: null,
            repairMaintenanceNo: '',
            isRepairOrder: false,
            options3: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            carNo: '', //车牌号码
            teleptleNo:'',//终端编号
            engineNo: '',   //发动机号
            happentime: '', // 维保提醒时间
            maintenanceno: '',  // 维保提醒单号
            faultcode: '',  // 错误代码
            faultdesc:'',   // 错误描述
            maintenancetype: '1',
            serviceParam:null,
            sub:null,
            addressSlots: [
            {
                flex: 1,
                defaultIndex: 1,
                value:'北京市',
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
            ],//地址数据
            choseGetType:1,//终端类型
            add_turn:false,//添加地址的状态
            show:false,//弹出框状态
            addressProvince:null,//添加省份
            addressCity:null,//添加城市
            addressXian:null,//添加县城
            province:null,//请求的省份
            city:null,//请求的城市
            region:null,//请求的县城
            // username:null,//联系人姓名
            // phone:null,//联系人电话
            // addressDetails:null,//联系人详细地址
            serviceMode:0,//服务方式
            visitAddress:null,//上门服务地址
            shopAddress:null,//到店服务地点
            faultPhenomenon:null,//故障现象
            terminalNum:null,//终端号码
            serviceshow:false,//服务商弹出框状态
            // serviceSlots:[{
            //     values: [],
            //     defaultIndex:0,
            //     value:''
            // }],
            defaultService:{},
            tempServiceData:null,
        }
    },
    props: {
        defaultData: {
            type:Object,
            default: function() {
                return {}
            }
        }
    },
    beforeMount() {
        const defautlData =  this.$props.defaultData
        if (defautlData) {
            this.carNo = defautlData.carNo || defautlData.carno
            this.teleptleNo = defautlData.teleptleNo || defautlData.terminalnum
            this.engineNo = defautlData.engineNo || defautlData.engineno
            this.happentime = defautlData.happentime
            this.maintenanceno = defautlData.maintenanceno
            this.faultcode = defautlData.faultcode || defautlData.faultno
            this.faultdesc = defautlData.faultdesc || defautlData.remark
            this.serviceMode = defautlData.serviceMode || defautlData.servicemethod || 0
            this.repairMaintenanceNo = defautlData.maintenanceno
            this.reworkproperty = defautlData.reworkproperty 
            this.maintenancetype = defautlData.maintenancetype || 1
        }
        if (defautlData.servicemethod === 1) {
            this.shopAddress = defautlData.serviceaddress
        } else if (defautlData.servicemethod === 0) {
            this.visitAddress = defautlData.serviceaddress
        }
    },
    components: {
        "mt-picker": Picker,
        "picker-name": Picker.name,
        "mt-popup": Popup,
        "popup-name": Popup.name,
        "Date-picker": Datepicker,
        "timepicker": DatetimePicker
        },
    async created(){
        this.isRepairOrder = this.$route.query.repair == 1 ? true: false
        this.serviceParam = this.$route.query.serviceNo;
        this.sub = this.$route.query.sub;
        this.defaultCarMsg = this.selectCar

        if (this.defaultCarMsg.carnumber) {
            this.selectCarStatus = true
        }
        await this.getUserInfo();//检查sessionId
        await getApiAndUiLibaray()
        this.initData();
    },
    mounted() {
        this.$store.dispatch("jyy/selectCarItem",{})
        // 隐藏年选择
        setTimeout(() => {
            const yearLine = document.querySelector("#addWbxfWorkOrder .mint-datetime .picker-slot.picker-slot-center")
            if (yearLine) {
                yearLine.style.display = "none"
            }
        }, 16);
        
        
    },
    destroyed() {
        this.$store.dispatch("jyy/setFirstFromAppToAddWb")
    },
    computed: {
        selectCar() {
            return this.$store.state.jyy.selectCar
        },
        wbtx() {
            return this.$route.query.from == "wbtx"
        },
        ...mapGetters('xhModules', [
            'userInfo',
            'sessionId',
            'login',
            'car',
        ]),
        ...mapState([
            "chooseAddress"
        ]),
        ...mapGetters('zwy', [
            'terminalInfo',
        ]),
        sureServiceData() {
            this.shopAddress = this.$store.state.jyy.sureServiceData.address
            return this.$store.state.jyy.sureServiceData
        },
        username: {
            get () {
                return this.$store.state.zwy.username
            },
            set (value) {
                this.$store.dispatch('zwy/saveUsername', value)
            }
        },
        phone: {
            get () {
                return this.$store.state.zwy.phone
            },
            set (value) {
                this.$store.dispatch('zwy/savePhone', value)
            }
        },
        addressDetails: {
            get () {
                return this.$store.state.zwy.addressDetails
            },
            set (value) {
                this.$store.dispatch('zwy/saveAddressdetails', value)
            }
        },
        subscribeDate: {
            get () {
                return this.$store.state.zwy.subscribeDate ? this.$store.state.zwy.subscribeDate :dayjs().add(1,"hour").toDate()
            },
            set (value) {
                this.$store.dispatch('zwy/saveSubscribeDate', value)
            }
        },
    },
    watch: {
        async visitAddress(v) {
            console.log(v)
            if (v) {
                try {
                    const distance = await this.getDoorServiceDistance()
                    this.doorServiceDistance = (distance/1000).toFixed(2) + 'km'
                } catch (error) {
                    console.log("获取地址失败")
                    console.log(error)
                    this.doorServiceDistance = ""
                }
              
            }
            
        }
    },
    methods:{
        async getDoorServiceDistance() {
            console.log(this.visitAddress)
            
            const maintenanceaddressCoordinate = await getCoordinateByLocationName(this.visitAddress)
            const maintenanceaddressP = [maintenanceaddressCoordinate.geocodes[0].location.lng, maintenanceaddressCoordinate.geocodes[0].location.lat]
            this.serviceAddressLocation = maintenanceaddressP
            const sureServiceDataP = [Number(this.sureServiceData.coordinates.split(",")[0]),Number(this.sureServiceData.coordinates.split(",")[1])]
            
            const distance =  await getDistanceByCoordinates(maintenanceaddressP, sureServiceDataP)
            
            return distance
        },
        confirmSubDate(v) {
            this.$store.dispatch('zwy/saveSubscribeDate', v)
        },
        timeForm(time) {
            const t = dayjs(time).format("YYYY-MM-DD HH:mm")
            return t
        },
        ...mapActions('xhModules', [
            'getUserInfo'
        ]),
        ...mapMutations('xhModules', [
            'USER_INFO',
            'LOGO_OUT',
            'LOGO_IN',
            'RECORD_CAR',
        ]),
        ...mapMutations("gwModules", [
            types.CHOOSE_ADDRESS_ABLE,
        ]),
        ...mapMutations([
            'CHOOSE_ADDRESS',
        ]),
        openTimePicker() {
            this.$refs.timepick.open()
        },
        gotoSetCar() {
            this.setOrderData()
            this.$router.push({path:"/main/car",query:{serviceNo:9}})
        },
        gotoAddCar() {
            this.setOrderData()
            this.$router.push({path:"/main/addCar/100"})
        },
        gotoServicersList() {
            this.setOrderData()
            this.$router.push({name:"servicersList"})
        },
        onAddressChange(picker,values){
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
        },
        onServiceChange(picker,values){
           
            this.tempServiceData = values[0];
        },
        sureService(){
            // 保存选中服务商
            this.$store.dispatch('zwy/saveSureServiceDate',this.tempServiceData)

        },
        async getCarMsg() {
            // 此接口返回的returncode有问题
            const req = await getDefaultCar(this.userInfo.phone)
            try {
                const carList = req.data.data.carlist
                for (const e of carList) {
                    if (e.cardefault == 1) {
                        this.defaultCarMsg = e
                        return
                    }
                }
                if (carList[0]) {
                    this.defaultCarMsg = carList[0]
                }
                
            } catch (error) {
                
            }
        },
        async initData() {
            
            //页面刷新加载用户数据
            let response = await getUserInfoAgain(this.sessionId);
            if (response.returncode === 0) {
            this.LOGO_OUT(false);
            return
            }

            this.USER_INFO(response.data[0]);
            this.LOGO_IN(true);

            // if(this.userInfo.addressList.length == 0 && !this.addressDetails){
            //     Toast({
            //         message: "请填写地址!",
            //         duration: 2000,
            //         iconClass:"aui-iconfont aui-icon-close"
            //     });
            // }
            
            //添加联系方式
            if(this.sub==0){
                this.$store.dispatch('zwy/saveUsername', this.$store.state.zwy.afterSaleData.vipname)
                this.$store.dispatch('zwy/savePhone', this.$store.state.zwy.afterSaleData.telephone)
                
                if(this.chooseAddress){
                    this.serviceMode =1;
                    this.visitAddress = this.chooseAddress.result;
                }else if(this.$store.state.zwy.mapAddress){
                    this.serviceMode =1;
                    this.visitAddress = this.$store.state.zwy.mapAddress;
                }else if(this.$store.state.zwy.afterSaleData.servicetype==1){
                    this.serviceMode =1;
                    this.visitAddress = this.$store.state.zwy.afterSaleData.serveraddress;
                }else{
                    this.shopAddress = this.$store.state.zwy.afterSaleData.store

                }
                this.$store.dispatch('zwy/saveSubscribeDate', this.$store.state.zwy.afterSaleData.serverdate)
                //this.$store.dispatch('zwy/saveSureServiceDate',{name:this.$store.state.zwy.afterSaleData.servicename,serviceno:this.$store.state.zwy.afterSaleData.serviceno,serviceid:this.$store.state.zwy.afterSaleData.serviceid})
                let terData = {
                    carno:this.$store.state.zwy.afterSaleData.carno,
                    teleptleno:this.$store.state.zwy.afterSaleData.teleptleno,
                    dtutype:this.$store.state.zwy.afterSaleData.dtutype,
                    openservice:this.$store.state.zwy.afterSaleData.openservice,
                    ecutype:this.$store.state.zwy.afterSaleData.ecutype,
                    engineno:this.$store.state.zwy.afterSaleData.engineno,
                    setupdate:this.$store.state.zwy.afterSaleData.setupdate,
                    dtusoftversion:this.$store.state.zwy.afterSaleData.dtusoftversion,
                }
                this.$store.dispatch('zwy/saveTerminalInfo',terData)
                // let addressArr2 = this.$store.state.zwy.afterSaleData.vipaddress.split(' ');
                // this.province = addressArr2[0]
                // this.$store.dispatch('zwy/saveAddressdetails', addressArr2[1])
                

            }else{
                if(this.chooseAddress){
                    this.serviceMode =0;
                    this.visitAddress = this.chooseAddress.result;
                }else if(this.$store.state.zwy.mapAddress){
                    this.serviceMode =0;
                    this.visitAddress = this.$store.state.zwy.mapAddress;
                }
                if(this.$store.state.zwy.username == null) {
                    this.$store.dispatch('zwy/saveUsername', this.userInfo.vipname)
                }
                if(this.$store.state.zwy.phone == null) {
                    this.$store.dispatch('zwy/savePhone', this.userInfo.phone)
                }

                
                if(this.$store.state.zwy.address) {
                    this.province = this.$store.state.zwy.address[0];
                    this.city = this.$store.state.zwy.address[1];
                    this.region = this.$store.state.zwy.address[2];
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
                    if(this.$store.state.zwy.addressDetails == null && storage[0]){
                        this.$store.dispatch('zwy/saveAddressdetails', storage[0].address)
                        // this.addressDetails = storage[0].address;
                    }
                    //获取省市区
                    if (storage[0]) {
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
                    
                }
                //获取省市区end;

            }
            
            //获取故障类型
            if(this.$store.state.zwy.faultPhenomenon){
                this.faultPhenomenon = this.$store.state.zwy.faultPhenomenon;
            }else{
                //await this.findFaultPhenomenon();
                if(this.sub == 0){
                    this.$store.state.zwy.afterSaleData.troubletype.split(',').forEach(val=>{
                        this.faultPhenomenon.forEach(v=>{
                            if(v.ddlid==val){
                                v.choose = true;
                            }
                        })
                    })
                }
            }
            
            //获取服务商列表
            this.getServiceProviderInfo();
            if (!this.selectCarStatus) {
                this.getCarMsg();
            }
            
        },
        // 缓存数据
        setOrderData() {
            let cacheData = {}
            cacheData.carNo = this.carNo
            cacheData.teleptleNo = this.teleptleNo
            cacheData.engineNo = this.engineNo
            cacheData.happentime = this.happentime
            cacheData.maintenanceno = this.maintenanceno
            cacheData.faultcode = this.faultcode
            cacheData.faultdesc = this.faultdesc
            cacheData.serviceMode = this.serviceMode
            cacheData.reservationno = this.defaultData.reservationno
            cacheData.repairMaintenanceNo = this.repairMaintenanceNo
            cacheData.reworkproperty = this.reworkproperty
            cacheData.maintenancetype = this.maintenancetype
            this.$store.dispatch('jyy/setWbOrderData',cacheData)
        },
        goAddress(event){
            //前往地址簿
            event.preventDefault();            
            this[types.CHOOSE_ADDRESS_ABLE](true);
            let addressArr;            
            if(this.add_turn){
                addressArr = [this.addressProvince,this.addressCity,this.addressXian];
            }else{
                addressArr = [this.province,this.city,this.region];                
            }
            this.$store.dispatch('zwy/saveAddress',addressArr);

            this.$store.dispatch('zwy/saveFault',this.faultPhenomenon);
            
            this.setOrderData()
            this.$router.push({path: '/address'});

        },
        goMap(){
            //去地图
            let addressArr;            
            if(this.add_turn){
                addressArr = [this.addressProvince,this.addressCity,this.addressXian];
            }else{
                addressArr = [this.province,this.city,this.region];                
            }
            this.$store.dispatch('zwy/saveAddress',addressArr);
            
            this.$store.dispatch('zwy/saveFault',this.faultPhenomenon);
            this.setOrderData()
            this.$router.push({path: '/main/terminalMap',query:{serviceNo:this.serviceParam,sub:this.sub,wbxf:true}});

        },
        goBack(){
            // this.$store.dispatch('zwy/clearData', true)
            // this.CHOOSE_ADDRESS(null);
            // this.$router.push({path: '/main/install', query: {serviceNo: this.serviceParam,sub:this.sub}});
            this.$store.dispatch("jyy/checkService",{})
            this.$store.dispatch('jyy/setWbOrderData',{})
            this.$store.dispatch('zwy/clearData',{})
            //this.$store.dispatch('zwy/saveSubscribeDate', null)
            if (this.$route.query.pageUrl == 1 || this.$route.query.pageUrl == 0) {
                // 从维保提醒列表而来
                this.$router.replace({path:"/wbNotice",query: {act: this.$route.query.pageUrl}});
            } else if (this.$route.query.pageUrl == 2){
                // 从维保提醒详情而来
                this.$router.back()
            } else if (this.$route.query.pageUrl == 3) {
                this.$router.replace({name: "wbxfHome"})
            } else {
                this.$router.replace({path:"/wbxf",query: {act: '0'}});
            }
        },
        async findFaultPhenomenon(){
            //获取故障类型
            let FaultMode = await axios.get(window.api.local_host+'/valueAdded/findFaultPhenomenon',{headers:{'sessionId':this.sessionId}});
            
            FaultMode.data.data[0].PUB_AFTER_SALE_TROUBLE.forEach(element => {
                
                element.choose = false;
                
            });
            this.faultPhenomenon =  FaultMode.data.data[0].PUB_AFTER_SALE_TROUBLE
            
        },
        async getServiceProviderInfo(){
            // 如果已经选择了服务商 终止
            if (this.sureServiceData.name) {
                return
            }
            //获取服务商列表            
            let res = await axios.get(window.api.local_host+'/valueAdded/findServiceProviderInfo?maintenance=1',{headers:{'sessionId':this.sessionId}});
            const NANNINGPOSTION = [108.33,22.84]
            let currentPostion = NANNINGPOSTION
            if(res.status==200){
                if(res.data.returncode==1){
                    // this.serviceSlots[0].values = res.data.data;
                    // this.serviceSlots[0].value = res.data.data[0].name;
                    const serviceList = res.data.data;
                    // 从app跳转过来
                    let appService = {}
                    const serviceId = getSearchParamFromApp("serviceId")
                    if (serviceId && this.$store.state.jyy.isFirstFromAppToAddWb) {
                        for (let i = 0; i < serviceList.length; i++) {
                            const element = serviceList[i];
                            if (element.serviceno == serviceId) {
                                appService = element
                                break
                            }
                        }
                    }
                    // 如果根据传过来的serviceId找到了对应的服务商
                    if (appService.serviceid) {
                        try {
                            let p = await getPostion()
                            currentPostion = [p.coords.longitude,p.coords.latitude]
                        } catch (error) {
                            console.log("定位失败")
                        } 
                        appService.distance = (distanceByLnglat(currentPostion, appService.coordinates.split(","))/1000).toFixed(2) + "km"
                        this.$store.dispatch("jyy/checkService",appService)
                        return
                    }
                    try {
                        let p = await getPostion()
                        currentPostion = [p.coords.longitude,p.coords.latitude]
                        this.$store.dispatch("jyy/checkService",this.getNearestServicer(currentPostion,serviceList))
                    } catch (error) {
                        this.$store.dispatch("jyy/checkService",this.getNearestServicer(currentPostion,serviceList))
                        MessageBox({
                            title: "定位失败",
                            message: "无法获取到您的位置，请提供定位权限"
                        })                        
                    }
                }
            } else {
                Toast({
                    message: '获取服务商失败！',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                })
            }
        },
        getNearestServicer(currentPostion, servicerList) {
            servicerList.forEach(e => {
                let distance = distanceByLnglat(currentPostion, e.coordinates.split(","))
                // 全部显示为km
                distance = (distance / 1000).toFixed(2) + 'km'

                e.distance = distance
            })
            servicerList.sort(function(a,b) {
                return parseInt(a.distance) - parseInt(b.distance)
            })
            return servicerList[0]
        },
        chooseFault(faultId){
            //选择故障现象
            this.faultPhenomenon.forEach(element => {
                if(faultId == element.id){
                    if(element.choose){
                        element.choose = false;
                    }else{
                        element.choose = true;
                    }
                }
                
            });
        },
        //根据车牌号获取信息
        getTerminalInfo() {
            if (!this.terminalNum) {
                Toast({
                    message: '请输入车牌号',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                })
                return
            }
            showLoading()
            getTerminlMsg(this.terminalNum)
            .then(res => {
                if (res.data.returncode === 0) {
                    Toast({
                        message: '获取不到对应车牌的信息',
                        iconClass:"aui-iconfont aui-icon-close",
                        duration: 2000
                    })
                    hideLoading()
                    return
                }
                this.carNo = res.data.data[0].carno
                this.teleptleNo = res.data.data[0].teleptleno
                this.engineNo = res.data.data[0].engineno
                hideLoading()
            }).catch(e => {
                Toast({
                    message: '获取不到对应车牌的信息',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                })
                hideLoading()
            })
        },
        async submitData(){
            if (!this.validate2().status) {
                Toast({
                    message: this.validate2().errMsg,
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                });
                return
            }

            let data = {
                "enterpriseid" : window.api.enterpriseId,     //企业id
                "serviceid": this.sureServiceData.serviceid,//服务商id
                "servicename": this.sureServiceData.name,//服务商名称*
                "carno": this.defaultCarMsg.carnumber,//车牌号
                "engineno": this.defaultCarMsg.engineno,//发动号
                "terminalnum": this.defaultCarMsg.termno,//终端号  ******
                //"happentime":now.format('yyyy-MM-dd'),                    //发生时间
                "remindcode": this.faultcode,            //故障代码
                "faultdesc": this.faultdesc,            //故障描述
                "maintenanceno": this.repairMaintenanceNo,    //维保提醒单号
                "reworkproperty": this.reworkproperty,
                "maintenancetype": this.maintenancetype,        //维保类型（1，维保，2维修）
                "maintenanceservicetype": this.serviceMode,     //服务方式（1，到店，0上门）
                "maintenanceaddress":this.serviceMode == 1 ? this.shopAddress : this.visitAddress ,  //服务地点
                "orderdate":this.subscribeDate.format('yyyy-MM-dd hh:mm:ss'), //预约时间
                "contact": this.username,          //预约人
                "contactphone":this.phone,       //联系电话
                // "contactaddress": this.$refs.chose.innerHTML,     //所在地区
                // "contactdetailaddress":this.addressDetails,//详细地址
                "vipid" : this.userInfo.vipid,  //会员id
                "reservationno": this.defaultData.reservationno, //预约单号
                "positionlat":this.serviceAddressLocation[1],
                "positionlng":this.serviceAddressLocation[0]
            }

            showLoading()
            if (data.maintenanceservicetype === 0) {
                try {
                    const distance =  await this.getDoorServiceDistance()
                    data.visitcourse = (distance / 1000).toFixed(2)
                } catch (error) {
                    hideLoading()
                    console.log("获取距离失败")
                    console.log(error)
                    Toast({
                        message: '请填写正确的服务地点！',
                        iconClass:"aui-iconfont aui-icon-close",
                        duration: 2000
                    })
                    return
                }
            } else {
                data.visitcourse = 0
            }
            this.$store.dispatch("jyy/checkService",{})
            addOrder(data)
            .then(res => {
                if (res.data.returncode == 0) {
                    Toast({
                        message: '新增预约失败',
                        iconClass:"aui-iconfont aui-icon-close",
                        duration: 2000
                    })
                    return 
                }
                Toast({
                    message: '新增预约成功',
                    iconClass:"aui-iconfont aui-icon-correct",
                    duration: 2000
                })
                this.$store.dispatch('jyy/setWbOrderData',{})
                this.$store.dispatch('zwy/clearData',{})
                hideLoading()
                setTimeout(() => {
                    this.$router.replace({name:"wbxf", query:{act:'0'}})
                }, 2000);
            })
            .catch(e => {
                hideLoading()
                Toast({
                    message: '新增预约失败',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                })
                
            })
        },
        validate2() {
            let errMsg = ""
            let status = true
            // if (!this.defaultCarMsg.carnumber) {
            //     errMsg = "请填写<span style='color:red'>车牌号码错误</span><br>"
            //     status  = false
            // }
            // if (!this.faultdesc) {
            //     errMsg = "请填写<span style='color:red'>故障描述</span><br>"
            //     status  = false
            // }
            // if (!this.faultdesc) {
            //     errMsg += "请填写<span style='color:red'>故障描述</span><br>"
            //     status = false
            // }
            if (!this.sureServiceData) {
                errMsg += "请选择<span style='color:red'>服务商</span><br>"
                status = false
            } else {
                if (!this.sureServiceData.serviceid || !this.sureServiceData.name) {
                    errMsg += "请选择<span style='color:red'>服务商</span><br>"
                    status = false
                }
            }
            if (!this.shopAddress && !this.visitAddress) {
                errMsg += "请填写<span style='color:red'>服务地点</span><br>"
                status = false
            }
            if (this.serviceMode === 0 && !this.visitAddress) {
                errMsg += "请填写<span style='color:red'>服务地点</span><br>"
                status = false
            }
            if (!this.subscribeDate) {
                errMsg += "请选择<span style='color:red'>预约时间</span><br>"
                status = false
            }
            if (this.subscribeDate) {
                if (this.subscribeDate.valueOf() < Date.now()) {
                    errMsg += "预约时间不能小于当前时间"
                    status = false
                }
            }
            if (!this.username) {
                errMsg += "请填写<span style='color:red'>联系人</span><br>"
                status = false
            }
            if (!this.phone) {
                errMsg += "请填写<span style='color:red'>手机号码</span><br>"
                status = false
            }
            // if (!this.$refs.chose.innerHTML) {
            //     errMsg += "请填写<span style='color:red'>所在地区</span><br>"
            //     status = false
            // }
            // if (!this.addressDetails) {
            //     errMsg += "请填写<span style='color:red'>详细地址</span><br>"
            //     status = false
            // }          
            return {status: status, errMsg: errMsg}
        },
        validate(){
            //验证数据
            let flag = true;
            if(this.terminalInfo.carno == null) {
                Toast({
                    message: '未选择终端',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                });
                flag = false;
            }
            if(this.sureServiceData == null) {
                Toast({
                    message: '未选择服务商',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                });
                flag = false;
            }
            if(this.serviceMode == 0){
                if(this.shopAddress == '' || this.shopAddress == undefined || this.shopAddress == null) {
                    Toast({
                        message: '请输入到店服务的地址',
                        iconClass:"aui-iconfont aui-icon-close",
                        duration: 2000
                    });
                    flag = false;
                }
            }else{
                if(this.visitAddress == '' || this.visitAddress == undefined || this.visitAddress == null) {
                    Toast({
                        message: '请输入上门服务的地址',
                        iconClass:"aui-iconfont aui-icon-close",
                        duration: 2000
                    });
                    flag = false;
                }
            }
            if(this.subscribeDate == null||this.subscribeDate == ''||this.subscribeDate == undefined) {
                Toast({
                    message: '请选择预约服务日期',
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
            let faultFlag = false;
            this.faultPhenomenon.forEach(val=>{
                if(val.choose){
                    faultFlag = true;
                }
            })
            // if(!faultFlag){
            //     Toast({
            //         message: '请选择故障现象',
            //         iconClass:"aui-iconfont aui-icon-close",
            //         duration: 2000
            //     });
            //     flag = false;
            // }
            if(this.username == null||this.username == ''||this.username == undefined) {
                Toast({
                    message: '请输入联系人',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                });
                flag = false;
            }
            if(this.phone == null||this.phone == ''||this.phone == undefined) {
                Toast({
                    message: '请输入联系电话',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                });
                flag = false;
            }
            
            // if(this.$refs.chose.innerHTML == '' || this.addressDetails == undefined || this.addressDetails == ''||this.addressDetails == null) {
            //     Toast({
            //         message: '请填写联系人地址',
            //         iconClass:"aui-iconfont aui-icon-close",
            //         duration: 2000
            //     });
            //     flag = false;
            // }
            
            return flag;
        }
    }
}
</script>
<style>
#addWbxfWorkOrder  .ivu-input-icon-normal+.ivu-input {
    color: #999999;
}
</style>

<style scoped>

#addWbxfWorkOrder .shangmenAddress {
    display: flex;
    width: 5rem;
    border-left: 1px solid #ededed;
    padding-left: 0.4rem;
}
#addWbxfWorkOrder .aui-list .aui-list-item {
    border-bottom: 1px solid #eaeaea !important;
}
#addWbxfWorkOrder .custom-aui-list-item {
    border-bottom: 1px solid #eaeaea !important;
    position: relative;
    min-height: 2.2rem;
    padding-left: 0.75rem;
}
#addWbxfWorkOrder .sureServiceDataName {
    color: #444444;
    min-width: 1.5rem;
    margin: 0;
    padding: 0;
    padding-right: 0.25rem;
    line-height: 2.2rem;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
}
#addWbxfWorkOrder .servicerLocation {
    min-height: 1.6rem;
    color: #999999;
}
.required-icon {
    color: red
}
.top_ul{
    /* margin-top: -0.3rem; */
}
.choseGetType{
    width: 48%;
    border:1px solid #aaa;
    border-radius: 5px;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    margin: 0.3rem 0;
    color:#aaa;
    font-size: 0.7rem;
    position: relative;
}
@media screen and (max-width: 320px) {
    .choseGetType{
    width: 48%;
    border:1px solid #aaa;
    border-radius: 5px;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    margin: 0.3rem 0;
    color:#aaa;
    font-size: 0.6rem;
    position: relative;
}
}
.iconChoose{
    position: absolute;
    right:0.3rem;
    top:0.35rem;
    font-size: 0.7rem;
    font-weight: 700;
}
.aui-list-item-inner .choose{
    border:1px solid #009900;
    color:#009900;    
}
.terminalNum{
    border: 1px solid #aaa;
    height: 1.2rem; 
    padding-left: 0.3rem;
    margin-bottom: 0.3rem;
}
.getTerminal{
    background-color: #4da2e5;
    color: white;
    border-radius: 5px;
    font-size: 0.6rem;
    width: 27%;
    height: 1.2rem;
    text-align: center;
    line-height: 1.2rem;
    margin-bottom: 0.3rem;
}
.faultItem{
    /* width: 30%; */
    border: 1px solid #aaa;
    border-radius: 5px;
    min-height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
    margin-bottom: 0.3rem;
    margin-right: 3%;
    padding: 0 0.3rem;
    /* font-size: 0.5rem; */
}
.aui-list-item-inner .faultActive{
    border:1px solid #009900;
    background-color: #009900;
    color:#fff;  
}
.aui-list-item-label{
    min-width: 4.5rem;
}
.carAndOrderPerson {
    width: 100%;
    position: relative;
}
.carAndOrderPerson ul {
    width: 100%;
    padding: 0.4rem 0.75rem;
    overflow: hidden;
}
.carAndOrderPerson ul li {
    width: 50%;
    float: left;
    height: 2.4rem;
    box-sizing: border-box;
}
.carAndOrderPerson .carIcon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 1.6rem;
    height: 1.6rem;
    background: #ffffff;
    border: 1px solid #ededed;
    border-radius: 50%;
    text-align: center;
    line-height: 1.6rem;
    color: #dddddd;
}
.carAndOrderPerson .carIcon .icon-yunshuzhongwuliu {
    font-size: 1.2rem;
}
.carAndOrderPerson ul li.carNE {
    border-right: 1px solid #ededed;
    padding-left: 0.4rem;
}
.carAndOrderPerson ul li.carEn {
    padding-left: 1.2rem;
}

.carAndOrderPerson ul li.orderPH {
    border-top: 1px solid #ededed;
    padding-top: 0.4rem;
    padding-left: 1.2rem;
}
.carAndOrderPerson ul li.orderP {
    padding-top: 0.4rem;
    border-right: 1px solid #ededed;
    border-top: 1px solid #ededed;
    padding-left: 0.4rem;
}
.carAndOrderPersonItemLight {
    font-size: 14px;
}
.carAndOrderPersonItemDark {
    color: #999999;
    font-size: 12px;
}
.wbxfAddTopLine {
    width: 100%;
    height: 0.3rem;
    background: url("../../../static/image/address_bj.jpg") no-repeat left bottom #ffffff;
}
.wbxf-bottom-btn {

    background: rgb(151, 0, 0) !important;
    color: #ffffff;

    font-size: 0.7rem;
    font-weight: 500;
    border-radius: 0.3rem;
    font-size: 0.7rem;
    height: 1.8rem;
    line-height: 1.85rem;
}
.wbxf-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #ffffff;
    text-align: center;
    padding: 0.5rem 1rem;
}
</style>

