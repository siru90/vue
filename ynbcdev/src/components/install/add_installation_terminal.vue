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
            <div class="aui-title">{{sub==1?'新增预约工单':'确认预约工单'}}</div>
            <div style="margin-top:0" @click="submitData" class="aui-pull-right text-del">保存</div>
        </header>
        <div>
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-header"><span>终端信息&nbsp;&nbsp;<span style="color:#bbb">(终端编号或车牌号任填一个即可获得)</span></span></li>
                <li class="aui-list-item" style="padding-right:0.75rem;">
                    <div class="aui-list-item-inner" style="flex-wrap:wrap">
                        <div class="choseGetType" :class="{choose:choseGetType==1}" @click="choseGetType=1">
                            通过车牌获取
                            <i v-if="choseGetType==1" class="icon njfont nj-xuanzhong iconChoose"></i>
                            </div>
                        <div class="choseGetType" :class="{choose:choseGetType==2}" @click="choseGetType=2">
                            通过终端编号获取
                            <i v-if="choseGetType==2" class="icon njfont nj-xuanzhong iconChoose"></i>
                            </div>
                        <div style="width:70%;"><input type="text" v-model="terminalNum" :placeholder="choseGetType==1?'请输入车牌号':'请输入终端编号'" class="terminalNum"></div>
                        <div @click="getTerminalInfo" class="getTerminal">获取终端信息</div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">车牌号码</div>
                        <div class="aui-list-item-input">
                            <input type="text" v-model="terminalInfo.carno" readonly style="height:1.4rem;padding-left:0.2rem;color:#333;background-color:#f1f1f1;">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">终端编号</div>
                        <div class="aui-list-item-input">
                            <input type="text" v-model="terminalInfo.teleptleno" readonly style="height:1.4rem;padding-left:0.2rem;color:#333;background-color:#f1f1f1;">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">终端类型</div>
                        <div class="aui-list-item-input">
                            <input type="text" v-model="terminalInfo.dtutype" readonly style="height:1.4rem;padding-left:0.2rem;color:#333;background-color:#f1f1f1;">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">无忧服务类型</div>
                        <div class="aui-list-item-input">
                            <input type="text" v-model="terminalInfo.openservice" readonly style="overflow-y: auto;height:1.4rem;padding-left:0.2rem;color:#333;background-color:#f1f1f1;">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">ECU版本</div>
                        <div class="aui-list-item-input">
                            <input type="text" v-model="terminalInfo.ecutype" readonly style="height:1.4rem;padding-left:0.2rem;color:#333;background-color:#f1f1f1;">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">发动机编号</div>
                        <div class="aui-list-item-input">
                            <input type="text" v-model="terminalInfo.engineno" readonly style="height:1.4rem;padding-left:0.2rem;color:#333;background-color:#f1f1f1;">
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
                            终端售后服务
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner aui-list-item-arrow" @click="serviceshow=!serviceshow">
                        <div class="aui-list-item-label">服务商</div>
                        <div class="aui-list-item-input">
                            <span v-if="!sureServiceData" style="color:#999">选择服务商</span>
                            {{sureServiceData?sureServiceData.name:''}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务方式</div>
                        <div class="aui-list-item-input">
                            <input type="radio" class="aui-checkbox" name="serviceMode" value="0" v-model="serviceMode" id="goShop"><label for="goShop">到店</label>
                            <input type="radio" class="aui-checkbox" name="serviceMode" value="1" v-model="serviceMode" id="toHome" style="margin-left:20%"><label for="toHome">上门</label>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-card-list" style="width:100%;padding-right:0.75rem">
                            <div class="aui-card-list-header" style="padding:0;">
                                服务地点
                            </div>
                            <div class="aui-card-list-content" v-if="serviceMode==0?true:false">
                                <input type="text" v-model="shopAddress"  placeholder="请备注门店信息" style="border:1px solid #aaa;height:1.4rem;padding-left:0.3rem;">
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
                        <div class="aui-list-item-label">预约服务日期</div>
                        <div class="aui-list-item-input">
                            <Date-picker v-model="subscribeDate" type="datetime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-card-list" style="width:100%;padding-right:0.75rem">
                            <div class="aui-card-list-header" style="padding:0;">
                                故障现象
                            </div>
                            <div class="aui-card-list-content" style="display:flex;flex-wrap:wrap;margin-right:-4%">
                                <div v-for="(item,index) of faultPhenomenon" :key="index" @click="chooseFault(item.id)" class="faultItem" :class="{faultActive:item.choose}">{{item.ddlname}}</div>
                            </div>
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

export default {
    data(){
        return {
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
            serviceSlots:[{
                values: [],
                defaultIndex:0,
                value:''
            }],
            tempServiceData:null,
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
        this.serviceParam = this.$route.query.serviceNo;
        this.sub = this.$route.query.sub;
        await  this.getUserInfo();//检查sessionId
        this.initData();
    },
    computed: {
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
            'sureServiceData',
        ]),
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

            if(this.userInfo.addressList.length == 0 && !this.addressDetails){
                Toast({
                    message: "请填写地址!",
                    duration: 2000,
                    iconClass:"aui-iconfont aui-icon-close"
                });
            }

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
                    this.serviceMode =1;
                    this.visitAddress = this.chooseAddress.result;
                }else if(this.$store.state.zwy.mapAddress){
                    this.serviceMode =1;
                    this.visitAddress = this.$store.state.zwy.mapAddress;
                }
                if(this.$store.state.zwy.username == null) {
                    this.$store.dispatch('zwy/saveUsername', this.userInfo.vipname)
                }
                if(this.$store.state.zwy.phone == null) {
                    this.$store.dispatch('zwy/savePhone', this.userInfo.phone)
                }

                //添加默认地址;
                if(this.$store.state.zwy.address) {
                    // console.log(this.$route.query.address)
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
                    if(this.$store.state.zwy.addressDetails == null){
                        this.$store.dispatch('zwy/saveAddressdetails', storage[0].address)
                        // this.addressDetails = storage[0].address;
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

            }
            
            //获取故障类型
            if(this.$store.state.zwy.faultPhenomenon){
                this.faultPhenomenon = this.$store.state.zwy.faultPhenomenon;
            }else{
                await this.findFaultPhenomenon();
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

            this.$router.push({path: '/main/terminalMap',query:{serviceNo:this.serviceParam,sub:this.sub}});

        },
        goBack(){
            this.$store.dispatch('zwy/clearData', true)
            this.CHOOSE_ADDRESS(null);
            this.$router.push({path: '/main/install', query: {serviceNo: this.serviceParam,sub:this.sub}});
            
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
            let res = await axios.get(window.api.local_host+'/valueAdded/findServiceProviderInfo',{headers:{'sessionId':this.sessionId}});
            if(res.status==200){
                if(res.data.returncode==1){
                    this.serviceSlots[0].values = res.data.data;
                    this.serviceSlots[0].value = res.data.data[0].name;
                }
                
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
        async getTerminalInfo(){
            //获取终端信息
            showLoading();            
            let terminalNo,carNo;
            if(this.choseGetType==1){
                carNo = this.terminalNum;
                terminalNo = null;
            }else{
                carNo = null;
                terminalNo = this.terminalNum;
            }
            let res = await axios.get(window.api.local_host+'/valueAdded/findCarByCarNoOrTerminalNo',{headers:{'sessionId':this.sessionId},params:{carNo:carNo,terminalNo:terminalNo}});
            hideLoading()
            if(res.status==200){
                // this.terminalInfo = res.data.data[0];
                if(res.data.returncode==1){
                    this.$store.dispatch('zwy/saveTerminalInfo',res.data.data[0])
                }else{
                    Toast({
                        message: res.data.errmsg,
                        iconClass:"aui-iconfont aui-icon-close",
                        duration: 2000
                    });
                }
            }else{
                Toast({
                    message: '获取终端信息失败',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                });
            }
        },
        async submitData(){
            //保存数据
            if(!this.validate()) return;
            let inputAddress = this.$refs.chose.innerHTML+" "+this.addressDetails;
            let troubletype = [];
            this.faultPhenomenon.forEach(val=>{
                if(val.choose){
                    troubletype.push(val.ddlid);
                }
            })
            let data = {
                "carno": this.terminalInfo.carno,//车牌号
                "dtusoftversion": this.terminalInfo.dtusoftversion,//
                "engineno": this.terminalInfo.engineno,//发动号
                "teleptleno": this.terminalInfo.teleptleno,//终端号  ******
                "dtutype": this.terminalInfo.dtutype,//
                "openservice": this.terminalInfo.openservice,//
                "ecutype": this.terminalInfo.ecutype,//
                "setupdate":this.terminalInfo.setupdate,
                "servicetype": this.serviceMode,//服务类型
                "store":this.shopAddress,
                "serveraddress": this.visitAddress,//服务地点
                "servicename": this.sureServiceData.name,//服务商名称*
                "serviceno": this.sureServiceData.serviceno,//服务商编号
                "serviceid": this.sureServiceData.serviceid,//服务商id
                "troubletype":troubletype.join(','),//故障描述
                "vipname": this.username,//联系人
                "vipaddress": inputAddress,//收货地址
                "serverdate": new Date(this.subscribeDate).toJSON(),//预约日期
                "enterpriseid" : window.api.enterpriseId,
                "telephone" : this.phone,
                "vipid" : this.userInfo.vipid,
                "sourceno":2,
                "userstatus":2,
            }

            if(this.sub==1){
                let res = await axios.post(window.api.local_host+'/valueAdded/terminalSaleAfter',data,{headers:{'sessionId':this.sessionId}});
                if(res.status == 200){
                    
                    if(res.data.returncode == 1){
                        Toast({
                            message: '新增成功',
                            iconClass:"aui-iconfont aui-icon-correct",
                            duration: 2000
                        });
                        this.$store.dispatch('zwy/clearData', true)
                        this.CHOOSE_ADDRESS(null);
                        this.$router.push({path: '/main/install', query: {serviceNo: this.serviceParam}});
                        
                    }else{
                        Toast({
                            message: '新增失败',
                            iconClass:"aui-iconfont aui-icon-close",
                            duration: 2000
                        });
                    }
                }
            }else if(this.sub==0){
                data.aftersaleserviceno = this.$store.state.zwy.afterSaleData.aftersaleserviceno;
                data.aftersaleserviceid = this.$store.state.zwy.afterSaleData.aftersaleserviceid;
                data.userstatus = 2;
                let req = await axios.put(window.api.local_host+'/valueAdded/terminalSaleAfter',data,{headers:{'sessionId':this.sessionId}});
                if(req.status == 200){
                    
                    if(req.data.returncode == 1){
                        Toast({
                            message: '预约成功',
                            iconClass:"aui-iconfont aui-icon-correct",
                            duration: 2000
                        });
                        this.$store.dispatch('zwy/clearData', true)
                        this.CHOOSE_ADDRESS(null);
                        this.$store.dispatch('zwy/saveAfterSaleData', null)
                        
                        this.$router.push({path: '/main/install', query: {serviceNo: this.serviceParam}});
                        
                    }else{
                        Toast({
                            message: '预约失败',
                            iconClass:"aui-iconfont aui-icon-close",
                            duration: 2000
                        });
                    }
                }
            }
            
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
            if(!faultFlag){
                Toast({
                    message: '请选择故障现象',
                    iconClass:"aui-iconfont aui-icon-close",
                    duration: 2000
                });
                flag = false;
            }
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
.top_ul{
    margin-top: -0.3rem;
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

