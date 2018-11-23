<template>
    <div style="width: 100%">
        <header style="display:block;" class="aui-bar aui-bar-nav aui-bar-light">
            <!-- <router-link :to="{path:'/main/install', query:{serviceNo:serviceParam}}"> -->
                <div class="go-back" @click="goBack">
                <i></i>
                <i></i>
                <i></i>
                </div>
            <!-- </router-link> -->
            <div class="aui-title"> {{isRepairOrder ? "新增返修工单" : "新增预约工单"}}</div>
            <div style="margin-top:0" @click="submitData" class="aui-pull-right text-del">保存</div>
        </header>
        <div style="padding-top:3rem">
            <ul v-if="isRepairOrder" class="aui-list aui-form-list top_ul">
                <li class="aui-list-header">关联维保单</li>  
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">维保单号<span class="required-icon">*</span></div>
                        <div class="aui-list-item-input">
                            <input disabled readonly type="text" v-model="repairMaintenanceNo"  style="height:1.4rem;padding-left:0.2rem;color:#333;">
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-header">车辆信息</li>  
                <li class="aui-list-item" style="padding-right:0.75rem;">
                    <div class="aui-list-item-inner" style="flex-wrap:wrap">
                        <div style="width:70%;"><input type="text" v-model="terminalNum" :placeholder="choseGetType==1?'请输入车牌号':'请输入终端编号'" class="terminalNum"></div>
                        <div @click="getTerminalInfo" class="getTerminal">获取车辆信息</div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">车牌号码<span class="required-icon">*</span></div>
                        <div class="aui-list-item-input">
                            <input type="text" v-model="carNo"  style="height:1.4rem;padding-left:0.2rem;color:#333;">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">发动机号</div>
                        <div class="aui-list-item-input">
                            <input type="text" v-model="engineNo"  style="height:1.4rem;padding-left:0.2rem;color:#333;">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">终端编号</div>
                        <div class="aui-list-item-input">
                            <input type="text" v-model="teleptleNo" style="height:1.4rem;padding-left:0.2rem;color:#333;">
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-header">故障现象</li> 
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">维保提醒单号</div>

                        <div class="aui-list-item-input">
                            <input readonly disabled v-model="faultcode" type="text" style="height:1.4rem;padding-left:0.2rem;color:#333;">
                        </div>
                    </div>
                </li>
                <!-- <li class="aui-list-item">
                    <div style="display:flex" class="aui-list-item-inner">
                        <div class="aui-list-item-label">故障描述</div>
                        <div class="aui-list-item-input">
                            <textarea style="margin:0" name="" id="" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                </li> -->
                <li class="aui-list-item">
                    <div style="width:100%;display:flex;padding-top:0.5rem;">
                        <div style="min-width:4.5rem">故障描述<span class="required-icon">*</span></div>
                        <div style="width:100%;">
                            <textarea v-model="faultdesc" style="margin-top:0;padding-right:0.75rem;" placeholder="请输入故障描述">
                            </textarea>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-header">服务选择</li>                
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务类型</div>
                        <div class="aui-list-item-input">
                            <select v-model="maintenancetype" name="" id="">
                                <option value="1">保养服务</option>
                                <option value="0">维修服务</option>
                            </select>
                           
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务方式<span class="required-icon">*</span></div>
                        <div class="aui-list-item-input">
                            <input type="radio" class="aui-checkbox" name="serviceMode" value="1" v-model="serviceMode" id="goShop"><label for="goShop">进站</label>
                            <input type="radio" class="aui-checkbox" name="serviceMode" value="0" v-model="serviceMode" id="toHome" style="margin-left:20%"><label for="toHome">上门</label>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner aui-list-item-arrow" @click="gotoServicersList">
                        <div class="aui-list-item-label">服务商<span class="required-icon">*</span></div>
                        <div class="aui-list-item-input">
                            <span v-if="!sureServiceData.name" style="color:#999">选择服务商</span>
                            {{sureServiceData?sureServiceData.name:''}}
                        </div>
                    </div>
                </li>
                
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-card-list" style="width:100%;padding-right:0.75rem">
                            <div class="aui-card-list-header" style="padding:0;">
                                <span>服务地点<span class="required-icon">*</span></span>
                            </div>
                            <div class="aui-card-list-content" v-if="serviceMode==1?true:false">
                                <input disabled readonly type="text" v-model="shopAddress"  placeholder="请备注门店信息" style="border:1px solid #aaa;height:1.4rem;padding-left:0.3rem;">
                            </div>
                            <div class="aui-card-list-content" v-else style="display:flex;justify-content: space-between;">
                                <input type="text" v-model="visitAddress" placeholder="请输入服务地址" style="max-width:70%;border:1px solid #aaa;height:1.4rem;padding-left:0.3rem;">
                                <div @click="goMap" style="padding:0 0.1rem;border:1px solid #aaa;height:1.4rem;text-align:center;line-height:1.4rem;border-radius:3px;">地图</div>
                                <div @click="goAddress" style="padding:0 0.1rem;border:1px solid #aaa;height:1.4rem;text-align:center;line-height:1.4rem;border-radius:3px;">地址簿</div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">预约服务日期<span class="required-icon">*</span></div>
                        <div class="aui-list-item-input">
                            <Date-picker v-model="subscribeDate" :options="options3" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="aui-list aui-form-list aui-margin-b-15 top_ul">
                <li class="aui-list-header">
                联系方式
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">联系人<span class="required-icon">*</span> </div>
                        <div class="aui-list-item-input">
                        <input type="text" placeholder="联系人姓名" v-model="username">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">手机号码<span class="required-icon">*</span></div>
                        <div class="aui-list-item-input">
                        <input type="number" placeholder="联系人手机号码" v-model="phone">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item"  v-if="add_turn" @click="show = !show">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">所在地区<span class="required-icon">*</span></div>
                        <div class="aui-list-item-input aui-list-item-arrow">
                            <div class="chose" ref="chose">{{addressProvince}}{{addressCity}}{{addressXian}}</div>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item" @click="add_turn = !add_turn; show = !show" v-else>
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">所在地区<span class="required-icon">*</span></div>
                        <div class="aui-list-item-input aui-list-item-arrow">
                            <div class="chose" ref="chose">{{province}}{{city}}{{region}}</div>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item menpai">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">详细地址<span class="required-icon">*</span></div>
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
                <mt-popup v-model="serviceshow" position="bottom" popup-transition="popup-fade" style="width:100%;height:200px;">
                    <mt-picker :slots="serviceSlots"
                                ref="picker2"
                                @change="onServiceChange"
                                :showToolbar="true"
                                :style="serviceshow ? 'display:block': 'display:none'"                                
                                valueKey="name"
                                >
                                <span class="mint-datetime-action mint-datetime-cancel" @click="serviceshow = !serviceshow;">取消</span>
                                <span class="mint-datetime-action mint-datetime-confirm" @click="serviceshow = !serviceshow;sureService()">确认</span>
                    </mt-picker>
                </mt-popup>
            </ul>
        </div>
    </div>
</template>
<script>
import {Picker, Popup} from "mint-ui";
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
export default {
    data() {
        return {
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
            shopAddress:null,//进站服务地点
            faultPhenomenon:null,//故障现象
            terminalNum:null,//终端号码
            serviceshow:false,//服务商弹出框状态
            serviceSlots:[{
                values: [],
                defaultIndex:0,
                value:''
            }],
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
        console.log(defautlData)
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
        "Date-picker": Datepicker
        },
    async created(){
        this.isRepairOrder = this.$route.query.repair == 1 ? true: false
        this.serviceParam = this.$route.query.serviceNo;
        this.sub = this.$route.query.sub;
        await  this.getUserInfo();//检查sessionId
        this.initData();
    },

    computed: {
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
                return this.$store.state.zwy.subscribeDate
            },
            set (value) {
                this.$store.dispatch('zwy/saveSubscribeDate', value)
            }
        },
    },
    methods:{
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

                //添加默认地址;
                console.log(this.$store.state.zwy)
                
                if(this.$store.state.zwy.address) {
                    // console.log(this.$route.query.address)
                    this.province = this.$store.state.zwy.address[0];
                    this.city = this.$store.state.zwy.address[1];
                    this.region = this.$store.state.zwy.address[2];
                } else {
                    console.log(this.userInfo)
                     

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

            console.log(this.$store.state.zwy.afterSaleData,'afterSaleData')
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
            this.$store.dispatch('jyy/setWbOrderData',{})
            this.$store.dispatch('zwy/clearData',{})
            //this.$store.dispatch('zwy/saveSubscribeDate', null)
            if (this.$route.query.pageUrl == 1 || this.$route.query.pageUrl == 0) {
                // 从维保提醒列表而来
                this.$router.replace({path:"/wbNotice",query: {act: this.$route.query.pageUrl}});
            } else if (this.$route.query.pageUrl == 2){
                // 从维保提醒详情而来
                this.$router.back()
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
            //获取服务商列表            
            let res = await axios.get(window.api.local_host+'/valueAdded/findServiceProviderInfo?maintenance=1',{headers:{'sessionId':this.sessionId}});
            if(res.status==200){
                if(res.data.returncode==1){
                    this.serviceSlots[0].values = res.data.data;
                    this.serviceSlots[0].value = res.data.data[0].name;
                }
            } else {
                Toast({
                    message: '获取服务商失败！',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                })
            }
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
            const now = new Date()
            let data = {
                "enterpriseid" : window.api.enterpriseId,     //企业id
                "serviceid": this.sureServiceData.serviceid,//服务商id
                "servicename": this.sureServiceData.name,//服务商名称*
                "carno": this.carNo,//车牌号
                "engineno": this.engineNo,//发动号
                "terminalnum": this.teleptleNo,//终端号  ******
                //"happentime":now.format('yyyy-MM-dd'),                    //发生时间
                "remindcode": this.faultcode,            //故障代码
                "faultdesc": this.faultdesc,            //故障描述
                "maintenanceno": this.repairMaintenanceNo,    //维保提醒单号
                "reworkproperty": this.reworkproperty,
                "maintenancetype": this.maintenancetype,        //维保类型（1，维保，2维修）
                "maintenanceservicetype": this.serviceMode,     //服务方式（1，进站，0上门）
                "maintenanceaddress":this.serviceMode == 1 ? this.shopAddress : this.visitAddress ,  //服务地点
                "orderdate":this.subscribeDate.format('yyyy-MM-dd hh:mm:ss'), //预约时间
                "contact": this.username,          //预约人
                "contactphone":this.phone,       //联系电话
                "contactaddress": this.$refs.chose.innerHTML,     //所在地区
                "contactdetailaddress":this.addressDetails,//详细地址
                "vipid" : this.userInfo.vipid,  //会员id
                "reservationno": this.defaultData.reservationno //预约单号
            }
            console.log(data)
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
                setTimeout(() => {
                    this.$router.replace({name:"wbxf", query:{act:'0'}})
                }, 2000);
            })
            .catch(e => {
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
            if (!this.carNo) {
                errMsg = "请填写<span style='color:red'>车牌号码</span><br>"
                status  = false
            }
            if (!this.faultdesc) {
                errMsg = "请填写<span style='color:red'>故障描述</span><br>"
                status  = false
            }
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
            if (!this.$refs.chose.innerHTML) {
                errMsg += "请填写<span style='color:red'>所在地区</span><br>"
                status = false
            }
            if (!this.addressDetails) {
                errMsg += "请填写<span style='color:red'>详细地址</span><br>"
                status = false
            }          
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
                        message: '请输入进站服务的地址',
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
            
            if(this.$refs.chose.innerHTML == '' || this.addressDetails == undefined || this.addressDetails == ''||this.addressDetails == null) {
                Toast({
                    message: '请填写联系人地址',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                });
                flag = false;
            }
            
            return flag;
        }
    }
}
</script>
<style scoped>
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
</style>

