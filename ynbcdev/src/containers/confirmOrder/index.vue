<template>
    <div ref="confirmBox" class="confirm-box">
        <div class="vue_app" style="position: absolute;width: 100%" ref="confirmBox20">
            <!--头部-->
            <header class="aui-bar aui-bar-nav aui-bar-light">
                <div class="go-back" @click.stop="goBack">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <div class="aui-title">确认采购单</div>
            </header>
            <div style="height: 3rem;"></div>
            <div class="centent">
                <!--配送地址-->
                <div id="address" class="aui-content top_div" @click.stop="gwChooseAddress">
                    <ul class="aui-list aui-media-list address_bj" v-show="Object.keys(addressShow).length">
                        <li class="aui-list-item">
                            <div class="aui-media-list-item-inner">
                                <div class="aui-list-item-label-icon">
                                    <i class="icon njfont nj-dizhi"></i>
                                </div>
                                <div class="aui-list-item-inner aui-list-item-arrow">
                                    <div class="aui-list-item-text">
                                        <div class="aui-list-item-title">
                                            <strong>收货人：{{addressShow.receivename}}</strong>
                                            <span class="aui-font-size-14 text_c_gray"></span>
                                        </div>
                                        <div class="aui-list-item-right aui-font-size-14">{{addressShow.phone}}</div>
                                    </div>
                                    <p>
                                        <span class="aui-label aui-label-info">{{addressShow.label}}</span>&nbsp;{{detailAddressShow + addressShow.address}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div v-show="!Object.keys(addressShow).length" class="chooseAddress"><i class="icon njfont nj-dizhi" style="vertical-align: middle;"></i><font style="color: #0f8de0;margin-left:0.7rem;">请选择地址</font><font class="required">*</font></div> 
                </div>
                <!--配送地址 end-->
                <div class="aui-content" v-if="pageType === 0">
                    <ul class="aui-list aui-form-list aui-margin-b-15">
                        <li class="aui-list-item">
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-label">配送方式<font class="required">*</font></div>
                                <div class="aui-list-item-input">

                                    <!-- <label v-for="(item, index) in logisticsTypeData" :key="index" class="logistics-type">
                                        <input class="aui-radio" type="radio" name="demo1" :checked="psState === parseInt(item.methodValue)" @click.stop="changeType(parseInt(item.methodValue))" v-show="!(item.methodName === '卖家发货' && mYHChoose === '终端优惠券')">
                                        <span v-show="!(item.methodName === '卖家发货' && mYHChoose === '终端优惠券')">{{item.methodName}}</span>
                                    </label> -->
                                    <!-- <span v-if="!logisticsTypeData.length">暂无数据</span> -->
                                    <label>
                                        <input class="aui-radio" type="radio" name="demo1" :checked="psState === 1" @click.stop="changeType(1)" > 自提
                                    </label> &nbsp;&nbsp;
                                    <label>
                                        <input class="aui-radio" type="radio" name="demo1" :checked="psState === 0" @click.stop="changeType(0)"> 卖家发货
                                    </label>
                                </div>
                            </div>
                        </li>
                        <!-- 自提时间 -->
                        <li class="aui-list-item" v-show="psState === 1">
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-label">自提时间<font class="required">*</font></div>
                                <div class="aui-list-item-input">
                                    <input style="line-height: 2.2rem;" type="date" placeholder="选择日期" :value="psDate" @change="dateChange">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 选择自提服务商 -->
                    <ul class="aui-list aui-media-list top_div" v-show="psState === 1">
                        <li class="aui-list-header">
                            自提仓库信息
                        </li>
                        <li id="select_service_provider" class="aui-list-item" style="display: flex;align-items: center;">
                            <!--选择服务商信息，显示请选择-->
                            <div class="aui-media-list-item-inner " style="flex:1;">
                                <div class="aui-list-item-inner">
                                    <div class="aui-list-item-text">
                                        <div class="aui-list-item-title">
                                            <strong>仓库：{{fixedProvider.warehouseidname}}</strong>
                                            <span class="aui-font-size-14 text_c_gray"></span>
                                        </div>
                                    </div>
                                    <p>地址：{{fixedProvider.address}}</p>
                                    <p>联系人：{{fixedProvider.consignee}}</p>
                                    <p>联系电话：{{fixedProvider.telephone}}</p>
                                </div>
                            </div>
                            <!-- <div style="margin-right: 1.2rem;color: #0f8de0;" v-show="!providerInfo">请选择服务商<font class="required">*</font></div> -->
                        </li>
                    </ul>
                </div>
                <!--商品列表-->
                <div class="aui-content choose_list">
                    <ul class="aui-list aui-media-list">
                        <li class="aui-list-item iscroll_list" @click.stop="showDetail">
                                <div class="aui-media-list-item-inner">
                                    <!-- 每个商品item -->
                                    <div class="aui-list-item-media" v-for="(item, index) in orderGoods" :key="index" style="overflow-y: hidden;">
                                        <img :src="goodsImg(item)">
                                        <em class="goods-item-count">×{{goodsItemNum(parseInt(item.goodsid))}}</em>
                                        
                                    </div>
                                    <!-- 如果是终端商品（根据是否选中了终端优惠券判定），就显示对应选择项 -->
                                    <div class="yajin" v-show="mYHChoose === '终端优惠券' && (yajinEnable || suocheEnable)">
                                        <p class="yajin-top">{{zhongduanName}}(推广券免单)</p>
                                        <div class="yajin-bottom">
                                            <!-- 根据后台开启的情况显示不同的radio -->
                                            <!-- 1、锁车防拆 -->
                                            <div v-if="suocheEnable && !yajinEnable">
                                                <label @click.stop=""><input type="radio" name="yajin" class="suoche" @click.stop="yajinEvent(0)" checked disabled/>同意锁车防拆</label>
                                            </div>
                                            <!-- 2、支付押金 -->
                                            <div v-if="!suocheEnable && yajinEnable">
                                                <label @click.stop=""><input type="radio" name="yajin" class="suoche" @click.stop="yajinEvent(1)" checked disabled/>支付押金</label>
                                            </div>
                                            <!-- 3、都有 -->
                                            <div v-if="suocheEnable && yajinEnable">
                                                <label @click.stop=""><input type="radio"  class="suoche" @click.stop="yajinEvent(0)" :checked="protocolType === 0" />同意锁车防拆</label>
                                                <label @click.stop=""><input type="radio"  class="suoche" @click.stop="yajinEvent(1)" :checked="protocolType === 1" />支付押金</label>
                                            </div>
                                            <div class="tongyi-box">
                                                <label @click.stop=""><input type="checkbox" class="xieyi" @click.stop="tongyiEvent($event)" checked="true"/>同意推广协议</label>
                                                <span @click.stop="showXieyi">查看协议</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </li>
                    </ul>
                    <!-- 显示多少个商品 -->
                    <div class="aui-list-item-arrow statistics goods-count" @click.stop="showDetail">
                        <p>共{{goodsNum}}件</p>
                        <!-- <p>1个包裹</p> -->
                    </div>
                </div>
                <!--商品列表 end-->
                <!--发票列表-->
                <!--<div class="aui-content aui-margin-b-15" @click.stop="chooseFP">
                    <ul class="aui-list aui-list-in">
                        <li id="invoice_information" class="aui-list-item aui-list-item-arrow">
                            <div class="aui-list-item-inner invoice">
                                <div class="aui-list-item-title">发票信息</div>-->
                                <!--参考京东-->
                                <!--<div class="aui-list-item-right">{{mFp}}</div>
                            </div>
                        </li>
                    </ul>
                </div>-->
                <!--发票列表 end-->
                <!--优惠券列表-->
                <div class="aui-content aui-margin-b-15">
                    <ul class="aui-list aui-list-in">
                        <!-- 选择优惠券 -->
                        <li class="aui-list-item">
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-title">商品金额</div>
                                <div class="aui-list-item-right total-price">￥{{totalPrice | formatPrice}}</div>
                            </div>
                        </li> 
                        <li class="aui-list-item">
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-title">大客户折扣金额</div>
                                <div class="aui-list-item-right">￥{{yhPrice | formatPrice}}</div>
                            </div>
                        </li>
                        <!-- <li class="aui-list-item" v-show="this.protocolType === 1">
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-title">押金金额</div>
                                <div class="aui-list-item-right">￥{{yjPrice | formatPrice}}</div>
                            </div>
                        </li> -->
                        <li class="aui-list-item">
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-title">运费</div>
                                <div class="aui-list-item-right">￥{{freight | formatPrice}}</div>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                <!--优惠券列表 end-->
                <div class="aui-content aui-margin-b-15" ref="noteBox">
                    <ul class="aui-list aui-form-list liuyan">
                        <li class="aui-list-item">
                            <div class="aui-list-item-inner" style="align-items:flex-start;">
                                <div class="aui-list-item-label" style="line-height:2rem;">买家留言：</div>
                                <div class="aui-list-item-input">
                                    <textarea ref="note" placeholder="选填：输入留言信息" v-model="noteData" maxlength="100"></textarea>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- <div v-if="showFlowAct && flowActSendValue" style="line-height:inherit;color:#EA3939;background:#ffffff;padding:0.5rem;margin-bottom:1rem;">
                    <p style="width:100%;text-align:center;color:#EA3939;margin-bottom:0.3rem;">温馨提示</p>
                    <p>本订单将参与“购配件送流量”活动，支付成功后，您将获得 <span style="color:#EA3939;font-weight:700">{{flowActSendValue}}M</span> 流量，请到“个人中心-我的流量-满送流量”页面进行流量充值。</p>
                    
                </div> -->
                <div class="total_sf">
                    <h2>实付金额：￥{{payPrice}}</h2>
                    <p v-if="false">如需发票，请到门店索取</p>
                </div>
                <!--立即下单-->
                <div style="height:4rem;"></div>
                <div class="settle_accounts lijixiadan" style="z-index: 111;">
                    <div style="background: #920000 !important;" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click.stop="pay" :class="[this.payEnable ? 'payEnable' : 'payDisable']">去支付</div>
                </div>
                <!--去结算 end-->
            </div>
        </div>
        <!-- 优惠券组件 -->
        <choose-yh ref="chooseYHCom" :freight="this.freight" :providerListParams="getProviderListParams"></choose-yh>
    </div>
</template>
<script>
import { Toast } from '../../utils/toast2';
import {mapGetters, mapMutations, mapState} from "vuex";
import * as types from "../../store/modules/gw-modules/mutation-types";
import confirmOrder from "../../utils/confirmOrder";
import deleteCart from "../../utils/deleteCart";
import getCartData from "../../utils/getCartData";
import BaseScroll from "../../components/BaseScroll";
import getGoodsItemData from "../../utils/getGoodsItemData";
import ChooseYH from "../../components/ChooseYH";
import getAddressName from "../../utils/getAddressName";
import {showLoading, hideLoading} from "../../utils/loading";
import {getLogisticsType} from "../../utils/getLogisticsType";
import getXieYi from "../../utils/getXieyi";
import api from "../../api";
import { Popup ,MessageBox} from 'mint-ui';
import { deepCopy } from '../../utils/deepcopy'
import { getDepotDetail } from './http'
export default {
    props: {

    },
    data() {
        return {
            type: "kd",
            // addressId: 2345,
            // deliveryAddress: "广西省南宁市香蕉幼儿园26号",
            //配送方式:0是自提，1是卖家发货
            logisticsType: 1,
            mDate: "",
            note: "",
            addressFromCode: 0,
            logisticsTypeData: [],
            yajinEventVal: 0,
            payEnable: true,//同意协议与否,
            settings: null,
            invoices_title_id:"",//存在vuex里面发票的rid
            invoice_context:"",//存在vuex里面发票内容
            BillBtns:"",//存在vuex里面保存按钮的状态
            fixedProvider:{},
            psState:1
            
        }
    },
    computed: {
        
        // //满送流量具体
        // flowActSendValue() {

        //     let list = this.flowActRulea.slice(0)
        //     list.sort(function(a,b) {
        //         return -a.ddlid + b.ddlid
        //     })
            
        //     for (let i=0;i<list.length;i++) {
        //         const element = list[i];
        //         if (element.ddlid <= this.payPrice) {
        //             return element.ddlname
        //         }
        //     }

            
        //     return ""
        // },
        //满送流量规则
        // flowActRulea() {
        //     return this.$store.state.jyy.flowActRule
        // },
        //是否处于活动状态
        showFlowAct() {
            return this.$store.state.jyy.showFlowAct         
        },
        ...mapGetters("gwModules", [
            "totalPrice",
            "fp",
            "cartArray",
            "orderGoods",
            "orderYH",
            "yhChoose",
            // "fixedProvider",
            "psDate",
            "getYajinVal",
            "getNote",
            // "getArea"
            
        ]),
        ...mapState([
            "chooseAddress"
        ]),
        ...mapGetters("xhModules", [
            "userInfo"
        ]),
        //终端优惠券选择的是锁车防拆：0，还是支付押金：1
        protocolType() {
            //如果只开启了同意锁车防拆选项，则直接返回0
            if (!this.yajinEnable && this.suocheEnable) {
                return 0;
            }
            //判断如果只开启了支付押金选项，则直接返回1
            if (this.yajinEnable && !this.suocheEnable) {
                return 1;
            }
            return this.getYajinVal;
        },
        //终端优惠商品的商品名称
        zhongduanName() {
            if (this.orderGoods && this.orderGoods[0]) {
                return this.orderGoods[0].goodsname;
            }
            
        },
        //获取当前页面类型，是虚拟商品(1)还是普通商品(0)
        pageType() {
            return parseInt(this.$route.query.pageType);
        },
        
        //已选择的优惠券信息
        mYHChoose () {
            console.log("this.yhChoose", this.yhChoose);
            if (this.yhChoose.length < 0) {
                return "请选择";
            } else if (this.yhChoose.length > 0) {
                //有优惠券的情况
                //1、押金优惠券
                if (this.yhChoose[0].vouchertype === api.yhTypes.zhongduan) {
                    if (!this.settings || Object.keys(this.settings).length === 0) {
                        console.log("请求协议的借口在调用");
                        this.getSettings();
                    }
                    this.changeType(1);
                    return "终端优惠券"
                } else {
                    //2、普通优惠券
                    return "普通优惠券";
                }
                
            }
            // return Object.keys(this.yhChoose).length > 0 ? this.yhChoose.vouchername : "请选择";
        },
        //优惠价格
        yhPrice () {
            let price = 0;
            // this.yhChoose.forEach(item => {
            //     price += item.remainamount;
            // });
            this.orderGoods.forEach(item => {
                //price += (item.discountprice - item.wsprice)
                this.cartArray.forEach(e => {
                    if (e.goodsId === item.goodsid) {
                        price = price.add(Number(item.discountprice).sub(Number(item.wsprice))* e.goodsNum)
                    }
                })
                
            })
            return price.toFixed(2);
            // return Object.keys(this.yhChoose).length > 0 ? parseFloat(this.yhChoose.remainamount) : 0;;
        },
        //押金金额
        yjPrice() {
            if (this.protocolType === 1 && this.yhChoose.length && this.yhChoose[0].vouchertype === api.yhTypes.zhongduan) {
                return this.yhChoose[0].deposit * this.goodsNum;
            } else {
                return 0;
            }
        },
        //运费
        freight() {
            // console.log("-----运费在执行");
            if (this.totalPrice >= 299 || this.psState === 1 || parseInt(this.pageType) === api.virtualGoodsType) {
                return 0;
            } else {
                return window.api.freight;
            }
        },
        //最终支付价格
        payPrice() {
            //不存在优惠券
            // if ((parseFloat(this.totalPrice) + parseFloat(this.yjPrice)) <= parseFloat(this.yhPrice)) {
            //     return this.freight;
            // }
            //return (parseFloat(this.totalPrice) - parseFloat(this.yhPrice) + parseFloat(this.freight) + parseFloat(this.yjPrice)).toFixed(2);
            return (parseFloat(this.totalPrice) + parseFloat(this.freight) + parseFloat(this.yjPrice)).toFixed(2);
        },
        //发票信息
        mFp () {
            // console.log(this.fp);
            if (this.fp.companyName || this.fp.personalName) {
                return this.fp.companyName || this.fp.personalName;
            }
            return "请填写发票（可不填）";
        },
        //地址id
        addressId () {
            return this.addressShow.vipdtlid;
        },
        //地址文字描述
        deliveryAddress() {
            return this.detailAddressShow +' ' +this.addressShow.address; //5.24 修改
            // return this.detailAddressShow + this.addressShow.address; //原版
        },
        //购物车已选的rid
        shopCartIds() {
            return this.cartArray.filter((item, index) => {
                return item.goodsChecked;
            }).map(item => {
                return {rid: item.rid}
            });
        },
        //当前订单包含的商品数量
        goodsNum() {
            let num = 0;
            this.cartArray.filter(item => {
                return item.goodsChecked;
            }).forEach(item => {
                num += item.goodsNum;
            });
            
            return num;
            
        },
        // 已选择的购物车goodsId
        goodsIds() {
            return this.cartArray.filter((item, index) => {
                return item.goodsChecked;
            }).map(item => {
                return item.goodsId;
            }).join(",");
        },
        //判断有无服务商
        providerInfo() {
            return Object.keys(this.fixedProvider).length;
        },
        // 用户地址信息
        addressShow() {
            let callback = o => {
                this.addressFromCode = o;
            }
            if (this.chooseAddress) {
                getAddressName({
                    province: this.chooseAddress.province,
                    city: this.chooseAddress.city,
                    region: this.chooseAddress.region
                }, callback);
                
                return this.chooseAddress;
            } else if (this.userInfo.addressList.length > 0) {
                let obj = {};
                let exits = false;
                for (let item of this.userInfo.addressList) {
                    if (item.defaultaddress === "默认") {
                        obj = item;
                        exits = true;
                        break;
                    }
                }
                if (!exits) {
                    //如果没有默认的地址，则使用第一个
                    obj = this.userInfo.addressList[0];
                }
                getAddressName({
                    province: obj.province,
                    city: obj.city,
                    region: obj.region
                }, callback);
                return obj;

            } else {
                return {};
            }
        },
        detailAddressShow() {
            if (this.addressFromCode) {
                return this.addressFromCode.province_name + this.addressFromCode.city_name + this.addressFromCode.region_name;
            } else {
                return "";
            }
        },
        //滑动条的宽度
        scrollWidth() {
            return this.orderGoods.length * (86 + 10);
        },
        //是否开启锁车防拆
        suocheEnable() {
            if (this.settings) {
                return this.settings.antitamperStatus;
            } 
            // return 0;
        },
        //是否开启支付押金
        yajinEnable() {
            if (this.settings) {
                return this.settings.depositStatus;
            }
            // return 1;
        },
        //协议内容
        xieyiContent() {
            if (this.settings) {
                return this.settings.protocol || "这是协议内容";
            }
            // return "这是协议内容";
        },
        //获取调用查询服务商列表时需要的参数
        getProviderListParams() {
            let itemlist = [];
            this.orderGoods.filter(item => {
                return parseInt(item.goodstype) === api.normalGoodsType;
            }).forEach(item => {
                itemlist.push({
                    itemid : item.goodsid,
                    qty: this.goodsItemNum(parseInt(item.goodsid))
                });
            });
            let p = {
                "enterpriseid": window.api.enterpriseId + "",
                "address": this.detailAddressShow,
                "coordinates ": "",
                itemlist

            }
            return p;
        },
        //获取买家留言
        noteData: {
            get() {
                return this.getNote;
            },
            set(val) {
                this.changeNote(val);
            }
        }
    },
    methods: {
        // 排序满送规则

    	//选择发票类型
		choseBill(){
			console.log(this.payPrice,"11111")
			let freights = this.freight;
            let payPrices;
            if(freights){
//          	this.longs =  Math.abs(Number(this.starty) - Number(this.endy));
            	payPrices = Math.abs(Number(this.payPrice) - Number(freights));
            				
            }else{
            	payPrices = this.payPrice
            }
			if( payPrices != 0){
				this.invoices_title_id = this.$store.state.hzh.getBillInfor;
				this.BillBtns = this.$store.state.hzh.BillBtn;
	            this.invoice_context = this.$store.state.hzh.BillContent;
				console.log("nishigejierba",this.BillBtns)
				if(this.invoices_title_id){
					this.$router.push({path: "/main/BillDetail",query:{goodsId:this.invoices_title_id,BillBtns:this.BillBtns}});
				}else{
					this.$router.push({path: "/main/BillDetail",query:{BillBtns:this.BillBtns}});
				}
			}else{
				MessageBox.alert("实付商品金额为零，不能开发票！")
			}
			
		},
        //同意锁车防拆还是支付押金
        yajinEvent(val) {
            this[types.YAJIN_VAL](val);
            console.log(this.protocolType);
        },
        //是否同意协议
        tongyiEvent(event) {
            console.log(event.target.checked);
            if (event.target.checked) {
                this.payEnable = true;
            } else {
                this.payEnable = false;
            }
            
        },
        //获取协议以及相关配置参数
        getSettings() {
            let callback = (data) => {
                console.log(data);
                this.settings = data;

            }
            getXieYi(callback);
        },
        changeType (type) {
            // this.logisticsType = type;
            this.psState = type
        },
        chooseFP () {
            this.$router.push({path: "/fp"});
        },
        // 获取当前选中的商品信息并保存到vuex中
        getGoodsData() {
            if (this.goodsIds) {
                let params = {
                    enterpriseid: window.api.enterpriseId,
                    goodsid: this.goodsIds
                }
                let callback = data => {
                    console.log("获取对应数据", data);
                    //保存到vue中
                    this[types.ORDER_GOODS](data);
                }
                getGoodsItemData(params, callback);
            }
            
        },
        //去支付
        async pay () {
            // 如果是终端商品并且配送方式不是自提，提示用户出错
            if (this.mYHChoose === "终端优惠券" && this.psState !== 1) {
                this.errToast("请选择配送方式！");
                return;
            }
            //如果单独购买终端商品并且使用了优惠券，判断是否同意推广协议
            if (this.mYHChoose === "终端优惠券" && !this.payEnable) {
                this.errToast("请阅读并同意推广协议！");
                return;
            }
            //如果购买了终端商品并且选择了优惠券,判断优惠券数量是否等于商品数量
            if (this.mYHChoose === "终端优惠券" && this.yhPrice !== this.totalPrice) {
                //价格不相等并且数量相等，券的格式出错
                if (this.yhChoose && this.yhChoose.length === this.goodsNum) {
                    this.errToast("该终端优惠券格式错误，请联系客服人员！");
                    return;
                }
                this.errToast("终端优惠券数量要和商品一致！");
                return;
            }

            //判断地址
            if (!this.addressId || !this.deliveryAddress) {
                this.errToast("地址错误，请重新选择");
                return;
            }
            //判断是否请求到配送方式并且页面类型不为virtualGoodsType
            // console.log(api)
            // debugger
            // if (!this.logisticsTypeData.length && this.pageType !== api.virtualGoodsType) {
            //     this.errToast("当前商品配送方式出错");
            //     return;
            // }
            
            //判断有无商品
            if (this.shopCartIds.length === 0) {
                this.errToast("没有选择商品");
                return;
            }
            //判断金额
            if (this.payPrice < 0) {
                this.errToast("金额错误");
                return;
            }
            //判断金额
            let flage = "";
            let freights = this.freight;
            let payPrices;
            if(freights){
//          	this.longs =  Math.abs(Number(this.starty) - Number(this.endy));
            	payPrices = Math.abs(Number(this.payPrice) - Number(freights));
            				
            }else{
            	payPrices = this.payPrice
            }
            console.log("this.payPrices",payPrices)
            if ( payPrices == 0 && this.BillBtns) {
//          	this.errToast("实付金额为零，不能开发票！");
//              return;
                await MessageBox.confirm("实付商品金额为零，不能开发票！是否继续支付？").then(action => {
                  	this.$store.dispatch('hzh/GetBillInfor',"");
                	this.$store.dispatch('hzh/SaveBillBtn',"");
                	flage = true;
                });
               
            }
            if(flage && !flage){
            	return;
            }
            let paramsMoney = this.payPrice;
            let callback = (data) => {
                //获取订单号
                let orderNo = data.data.data[0];
                //成功之后删除掉购物车中对应的商品
                let callback2 = data => {
                    console.log("确认订单页面回调成功，删除对应购物车中的数据");
                    
                    //更新购物车操作
                    let callback3 = () => {
                        hideLoading();
                        this.clearVuex();

                        // 判断是哪种设备，跳转到不同类型的支付页面
                        var u = navigator.userAgent;
                        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                        if (isAndroid) {
                            // console.log("isAndroid", "是Android设备");
                            this.$store.dispatch('hzh/SaveBillBtn',"");
                            //this.$router.push({"name":"pay", "params": {"money": paramsMoney, orderNo}});
                            this.$router.push({"name":"ios_pay", "params": {"money": paramsMoney, orderNo}});
                        } else if (isIOS) {
                            // console.log("isIOS", this.payPrice, paramsMoney);
                            // console.log("要跳转IOS页面了");
                            // console.log(paramsMoney, orderNo);
							this.$store.dispatch('hzh/SaveBillBtn',"");
                            this.$router.push({"name":"ios_pay", "params": {"money": paramsMoney, orderNo}});
                            // console.log("跳转的下一条语句");
                            return;
                        }
                        // this.$router.push({"name":"ios_pay", "params": {"money": this.payPrice, "orderNo": orderNo}});
                        
                    }
                    this.initCart(callback3);
                }
                deleteCart({shoppingCartList:this.shopCartIds}, callback2);
                //跳转到支付页面
                
            }
            let cartId = this.cartArray[0].cartId;
			let electronicInvoice={
				invoicesTitleId:this.$store.state.hzh.getBillInfor,
				invoiceContext:this.$store.state.hzh.BillContent
			}
			if(this.$store.state.hzh.getBillInfor.length == 0){
				var params = {
	                logisticsType: this.psState,
	                addressId: this.addressId,
	                cartId: cartId,
	                deliveryAddress: this.deliveryAddress,
	                freight: this.freight,
	                shopCartIds: this.shopCartIds,
	                shopId: window.api.enterpriseId,
//	                electronicInvoice,
	            }
			}else{
				var params = {
	                logisticsType: this.psState,
	                addressId: this.addressId,
	                cartId: cartId,
	                deliveryAddress: this.deliveryAddress,
	                freight: this.freight,
	                shopCartIds: this.shopCartIds,
	                shopId: window.api.enterpriseId,
	                electronicInvoice,
	            }
			}
//          var params = {
//              logisticsType: this.psState,
//              addressId: this.addressId,
//              cartId: cartId,
//              deliveryAddress: this.deliveryAddress,
//              freight: this.freight,
//              shopCartIds: this.shopCartIds,
//              shopId: window.api.enterpriseId,
//              electronicInvoice,
//          }
            // console.log(JSON.stringify(params));
            //判断用户选择的终端商品推广方式
            if (this.yhChoose.length && this.yhChoose[0].vouchertype === api.yhTypes.zhongduan) {
                params.protocolType = this.protocolType;
            }
            
            //如果有发票
            if (this.fp.companyName || this.fp.personalName) {
                // params = Object.assign({}, params, {orderInvoice: this.fp});
                params.orderInvoice = this.fp;
            }

            //如果有买家留言
            if (this.noteData) {
                params.note = this.noteData;
            }

            //判断是否选择了优惠券
            if (this.mYHChoose !== "请选择") {
                params.ticketList = [];
                this.yhChoose.forEach(item => {
                    let obj = {
                        voucherId: item.voucherid,
                        voucherName: item.vouchername,
                        voucherType: item.vouchertype,
                        remainAmount: item.remainamount
                    }
                    params.ticketList.push(obj);
                });
                // params.ticketList = [
                //     {
                //         voucherId: this.yhChoose.voucherid,
                //         voucherName: this.yhChoose.vouchername,
                //         voucherType: this.yhChoose.vouchertype,
                //         remainAmount: this.yhChoose.remainamount
                //     }
                    
                // ];
            }

            //如果是自提,并且自提服务商信息和自提时间已经确定
            // if (this.psState === 1 && Object.keys(this.fixedProvider).length > 0 && this.psDate) {

            if (this.psState === 1) {
                console.log(this.fixedProvider)
                if (!this.fixedProvider.warehouseid) {
                    this.errToast("服务商获取失败");
                    return;
                }
                if (!this.psDate) {
                    this.errToast("请选择自提时间");
                    return;
                }
                //判断自提时间是否合法
                //选择的时间
                if (new Date().getTime() > this.dateFormat(this.psDate).getTime()) {
                    this.errToast("配送日期必须大于当前日期");
                    return;
                }

                params = Object.assign({}, params, {
                    selfExtract: {
                        extractTime: this.psDate,
                        facilitatorAddress: this.fixedProvider.address,
                        // facilitatorCode: this.fixedProvider.serviceno,              // 缺少仓库地址
                        facilitatorId: this.fixedProvider.warehouseid,
                        facilitatorName: this.fixedProvider.warehouseidname,
                        linkman: this.fixedProvider.consignee,
                        linkmanPhone: this.fixedProvider.telephone
                    },
                });
            }
            params.totalMinis = this.yhPrice
            showLoading();
            confirmOrder(params, callback);

        },
        //清空或重置vuex
        clearVuex() {
            //清空vuex中的orderGoods
            this[types.ORDER_GOODS]([]);
            //清空服务商
            this[types.CHOOSE_PROVIDER]({});
            //清空自提时间
            this[types.PS_DATE]("");
            //清空自提或快递类别
            this[types.PS_STATE](0);
            //清空优惠券
            this[types.ORDER_YH_CHOOSE]([]);
            //清空发票信息
            this[types.FP]({});
            //重置锁车防拆和支付押金的状态值
            this[types.YAJIN_VAL](0);
            //清除买家留言
            this.changeNote("");
        },
        //重新初始化购物车
        initCart(callback2) {
            //请求成功的回调
            let callback = cartList => {
                //更新vuex的购物车列表
                this[types.CART_ARRAY_CHANGE](cartList);
                //更新购物车全局数量
                this[types.CART_NUM_CHANGE](cartList.length);
                if (callback2) {
                    callback2();
                }
            }
            //请求失败的回调
            let errorFn = err => {
                //更新vuex的购物车列表
                this[types.CART_ARRAY_CHANGE]([]);
                //更新购物车全局数量
                this[types.CART_NUM_CHANGE](0);
                Toast({
                    duration: 1000,
                    message: "下单失败请重试",
                    iconClass: "aui-iconfont aui-icon-close"
                });
            }
            getCartData(callback, errorFn);
        },
        goBack() {
            this.clearVuex();
            window.history.back();
        },
        errToast(msg) {
            Toast({
                duration: 3000,
                message: msg,
                iconClass: "aui-iconfont aui-icon-warn"
            });
        },
        //商品图片
        goodsImg(goodsItemData) {
            if (goodsItemData && goodsItemData.urllist) {
                for (let i = 0; i < goodsItemData.urllist.length; i++) {
                    const v = goodsItemData.urllist[i];
                    if (v.imgurltype == 0) {
                        return v.imgurl
                    }
                }
                return "static/image/demo1.png";
            } else {
                return "static/image/demo1.png";
            }
        },
        //单个商品的数量
        goodsItemNum(goodsId) {
            for (let item of this.cartArray) {
                if (item.goodsId === goodsId) {
                    return item.goodsNum
                }
            }
            return 0;
        },
        //单个商品的服务
        goodsItemService(goodsId) {
            for (let item of this.cartArray) {
                if (item.goodsId === goodsId) {
                    return item.serveId;
                }
            }
            return null;
        },
        //自提的话去选择服务商
        chooseProvider() {
            let itemlist = [];
            this.orderGoods.filter(item => {
                return parseInt(item.goodstype) === api.normalGoodsType;
            }).forEach(item => {
                itemlist.push({
                    itemid : item.goodsid,
                    qty: this.goodsItemNum(parseInt(item.goodsid))
                });
            });
            let p = {
                "enterpriseid": "" + window.api.enterpriseId,
                "address": this.detailAddressShow,
                "coordinates ": "",
                itemlist

            }
            this.$router.push({name:"chooseprovider", params: {p}})
        },
        // getProviderListParams() {

        // },
        //展示优惠券供用户选择
        chooseYHFn () {
            this.$refs.chooseYHCom.showCover();
        },
        //改变date时间
        dateChange(event) {
            // console.log("每次改变的change事件", event.target.value);
            this[types.PS_DATE](event.target.value);
        },
        //展示当前选中的商品
        showDetail() {
            // let obj = getShowOrderGoods();
            let orderGoodsArray = [];
            this.orderGoods.forEach(item => {
                orderGoodsArray.push({
                    img: item.urllist[0].imgurl,
                    price: item.wsprice,
                    title: item.goodsname,
                    goodsid: item.goodsid,
                    goodscode: item.goodscode,
                    goodsunit: item.goodsunit,
                    goodsspec: item.goodsspec,
                    num: this.goodsItemNum(parseInt(item.goodsid)),
                    service: this.goodsItemService(parseInt(item.goodsid))
                });
            });
            if (orderGoodsArray.length) {
                this.$router.push({"name": "ordergoods", params: {orderGoodsArray}});
            }
        },
        //选择收货地址
        gwChooseAddress(event) {
            event.preventDefault();
            // setTimeout(() => {
                this[types.CHOOSE_ADDRESS_ABLE](true);
                this.$router.push({"name": "address"});
            // }, 300);
            
        },
        scrollEvent(event) {
            event.stopPropagation();
        },
        //根据页面类型判断是否需要请求接口获取配送方式
        // judgeToGetLogisticsType() {
        //     if (this.pageType === api.normalGoodsType) {
        //         console.log("这是普通商品或者混合商品，需要去请求配送方式");
        //         //获取配送方式
        //         let callback = (data) => {
        //             console.log("logisticsType", data);
        //             //这里做筛选，只把未禁用的按钮push到数组中
        //             if (Array.isArray(data)) {
        //                 this.logisticsTypeData = data.filter(item => {
        //                     return !item.status;
        //                 });
        //             }
        //             // this.logisticsTypeData = data;
        //         }
        //         getLogisticsType("TRANSPORT", callback);
        //     }
        // },
        // 格式化日期
        dateFormat(date) {
            let arr = date.split("-");
            // console.log(arr);
            let d = new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]), 23, 59, 59);
            // console.log(d);
            // console.log(d.getDate());
            // console.log(d.getMonth() + 1);
            return d;
        },
        ...mapMutations("gwModules", [
            types.CART_ARRAY_CHANGE,
            types.CART_NUM_CHANGE,
            types.ORDER_GOODS,
            types.PS_STATE,
            types.PS_DATE,
            types.CHOOSE_PROVIDER,
            types.ORDER_YH_CHOOSE,
            types.CHOOSE_ADDRESS_ABLE,
            types.FP,
            types.YAJIN_VAL,
            //改变买家留言
            "changeNote"
        ]),
        showXieyi() {
            this.$router.push({name: "xieyi", params:{text: this.settings.protocol}});
        },
        //监听买家留言框的focus事件
        initTextareaFocusEvent() {
            this.$refs.note.onfocus = () => {
                console.log("input框框获取到了焦点");
                // setTimeout(() => {
                //     console.log(this.$refs.noteBox, this.$refs.noteBox.scrollIntoView);
                //     this.$refs.noteBox.scrollIntoView(true);
                //     this.$refs.noteBox.scrollIntoViewIfNeeded();
                // }, 200);
                this.initInputStyle();
            }
            this.$refs.note.onblur = () => {
                console.log("失去焦点");
                //重置样式
                this.unsetStyle();
                
            }
        },
        initStyle() {
            // let style = ``;
            // document.querySelector("#app").style = style;
        },
        //如果是安卓机,调整页面margin-bottom供用户看到input框
        initInputStyle() {
            let isAndroid = navigator.userAgent.indexOf("Android") > -1;
            if (isAndroid) {
                let box = this.$refs.confirmBox;
                let box20 = this.$refs.confirmBox20;
                // let scrollTopContainer = document.documentElement;
                let scrollTopContainer = document.body;
                box.style.marginBottom = "70vh";
                box20.style.marginBottom = "70vh";
                //给一个scrollTop值的变化，自动滑上去
                let distance = parseInt(getComputedStyle(box, null).marginBottom.slice(0, -2));
                let duration = 200 / 16.7;
                let speed = distance / duration;
                this.scrollAnim = setInterval(() => {
                    scrollTopContainer.scrollTop += speed;
                    if (scrollTopContainer.scrollTop >= distance) {
                        scrollTopContainer.scrollTop = distance;
                        clearInterval(this.scrollAnim);
                    }
                }, 16.7);
                // document.documentElement.scrollTop
            }
        },
        unsetStyle() {
            //清除计时器
            clearInterval(this.scrollAnim);
            this.scrollAnim = null;
            this.$refs.confirmBox.style.marginBottom = "unset";
            this.$refs.confirmBox20.style.marginBottom = "unset";
        },
        getDepotDetailInfo() {
            getDepotDetail()
            .then(res => {
                if (res.data.returnCode == 0) {
                    Toast({
                        duration: 2000,
                        message: "获取门店信息失败",
                        iconClass: "aui-iconfont aui-icon-warn"
                    });
                    return
                }
                if (!res.data.data[0][0]) {
                    Toast({
                        duration: 2000,
                        message: "该用户门店信息为空",
                        iconClass: "aui-iconfont aui-icon-warn"
                    });
                    return
                }
                this.fixedProvider = res.data.data[0][0]
            })
            .catch(e => {
                Toast({
                        duration: 2000,
                        message: "获取门店信息失败",
                        iconClass: "aui-iconfont aui-icon-warn"
                    });
            })            
        }
    },
    //过滤器
    filters: {
        //将商品金额格式化为角、分格式
        formatPrice(price) {
            // console.log("这是价格", price);
            let reg = /^\d+$/;
            
            return price = reg.test(price) ? (price + ".00") : price;

        }
    },
    created() {
        // console.log("confirmOrder------created");        
        // if (this.flowActRulea.length == 0) {
        //     this.$store.dispatch('jyy/getFlowActRule')
        // }
        if (!this.userInfo) {
            Toast({
                duration: 2000,
                message: "用户信息失效",
                iconClass: "aui-iconfont aui-icon-warn"
            });
            //this.$router.replace({"path": "/main/profile"});
            return;
        }
        if (!this.goodsIds) {
            Toast({
                duration: 2000,
                message: "用户信息失效",
                iconClass: "aui-iconfont aui-icon-warn"
            });
            console.log("如果没有goodsIds，跳回个人中心");
            //this.$router.replace({"path": "/main/profile"});
            return;
        }
        this.getGoodsData();
        this.getDepotDetailInfo()
        //this.judgeToGetLogisticsType();
        this.invoices_title_id = this.$store.state.hzh.getBillInfor;
        this.invoice_context = this.$store.state.hzh.BillContent;
        console.log(this.invoices_title_id,"奇迹而")
        this.BillBtns = this.$store.state.hzh.BillBtn;
    },
    mounted() {
        this.initTextareaFocusEvent();
        // this.initStyle();
    },
    components: {
        "base-scroll": BaseScroll,
        "choose-yh": ChooseYH
    },
    watch: {
        //当goodsIds有值的时候再去请求
        goodsIds() {
            this.getGoodsData();
        },
        addressFromCode() {
            this.$forceUpdate();
        },
        getProviderListParams(newVal) {
            // console.log("-----getProviderListParams", newVal);
        }
    },
    beforeDestroy() {
        // console.log("confirmOrder------111111,beforeDestory");
        //清除app上的样式
        // document.querySelector("#app").style = "";
        
    }

}
</script>

<style scoped>
    .confirm-box {
        height: 100%;
    }
    /* 多少个商品的样式 */
    .goods-count {
        top: unset;
        height: 100%;
        display: flex;
        align-items: center;
        padding-top: unset;
    }
    /* 单个商品的数量样式 */
    .choose_list .aui-list-item-media em {
        background: rgba(15, 141, 225, 0.6);
    }
    /* 配送方式的样式 */ 
    .logistics-type {
        margin-right: 1rem;
    }
    /* 商品价格的样式 */
    .total-price {
        color: red;
        font-weight: bold;
    }
    .logistics-type:last-of-type {
        margin-right: 0;
    }
    .goods-count p {
        width: 100%;
    }
    .liuyan textarea {
        height: 3rem;
    }
    .chooseAddress {
        background: #fff;
        width: 100%;
        box-sizing: border-box;
        color: #9a9a9a;
        padding: 0.5rem 0.75rem 0.5rem 0.75rem;
    }
    .scroller_list {
        overflow: auto;
    }
    .iscroll_list {
        overflow: auto;
    }
    /* 推广券信息相关 */
    .yajin {
        display: flex;
        width: 10rem;
        flex-flow: column nowrap;
        height: 5.5rem;
        justify-content: space-between;
        padding:0.4rem 0;
        box-sizing: border-box;
    }
    .payEnable {
        background: #0f8de0 !important;
    }
    .payDisable {
        background: #999 !important;
    }
    .tongyi-box {
        display: flex;
        /* justify-content: space-between; */
        /* padding: 10px; */
    }
    .tongyi-box span {
        background: #FF9900;
        color: #fff;
        padding: 2px 2px;
        margin-left: 10px;
        font-size: 12px;
        line-height: 20px;
        height: 20px;
    }

</style>


