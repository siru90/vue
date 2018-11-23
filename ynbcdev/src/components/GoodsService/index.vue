<template>
    <div v-show="isShow" class="goods-service-box" style="position:fixed;top:0;left:0;bottom:0;right:0;" @touchstart="touchMoveCover">
        <!-- 遮罩层 -->
        <div class="aui-mask aui-mask-in" style="" ></div>
        <!-- 服务选择 -->
        <div id="purchase_service" class="purchase_service" style="display: block;min-height:30vw;">
            <div class="spec_top" v-if="pageType==='detail'">
                <div class="spec_pic">
                    <img :src="minPic">
                </div>
                <div class="spec-price">
                    <span class="prices_text">¥
                        <em>{{gwGoodsItem.goodsPrice | changePrice}}</em>
                    </span>/{{gwGoodsItem.goodsUnit}}
                    <p v-if="parseInt(gwGoodsItem.goodsType) === 0">
                        <span v-if="gwGoodsItem.stockCount">库存：{{gwGoodsItem.stockCount + gwGoodsItem.goodsUnit}}</span>
                        <span v-else>已售罄</span>
                    </p>
                </div>
                <!-- 关闭按钮 -->
                <a class="spec_close" @touchstart="closeService"></a>
            </div>
            <div class="spec_middle">
                <!-- 选择商品数量 -->
                <div class="prod_spec" v-if="pageType==='detail'">
                    <span>购买数量</span>
                    <add-reduce :showCover="false" pageType="detail" :gwGoodsItem="gwGoodsItem" :goodsId="goodsId"></add-reduce>
                </div>
                
                <!-- 增值服务 -->
                <div class="value_added">
                     <p v-if="serviceData.length > 0">增值服务<a class="spec_close" @touchstart="closeService" v-if="pageType==='cart'"></a></p> 
                    <!-- 每个增值服务的item -->
                     <base-scroll :list="serviceData" style="height:100%;overflow:hidden;" ref="scroll">
                        <div> 
                            <service-item v-for="(item, index) in serviceData" 
                                :key="index" 
                                :serviceItemData="item" 
                                :goodsId="goodsId"
                                :pageType="pageType"
                                ref="serviceItem"
                            >
                            </service-item>
                         </div>
                    </base-scroll> 
                    
                </div>
                <!-- 确定按钮 -->
                <div class="settle_accounts lijixiadan">
                    <div id="confirm" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click="confirm" style="width:100%;">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import GoodsServiceItem from "../GoodsServiceItem";
import BaseScroll from "../BaseScroll";
import CartAddOrReduce from "../CartAddOrReduce";
import getData from "../../utils/getCartData";
import {mapGetters, mapMutations} from "vuex";
import axios from "axios";
import updateCart from "../../utils/updateCart";
import { MessageBox } from 'mint-ui';
import { Toast } from '../../utils/toast2';
import getCartData from "../../utils/getCartData";
import * as types from "../../store/modules/gw-modules/mutation-types";
import getServiceDataFn from "../../utils/getServiceData";
import api from "../../api";
export default {
    props: {
        // isShow: {
        //     type: Boolean,
        //     default: false
        // }
        //当前遮罩层所在页面，以type区分
        //"detail":详情页,"cart":采购车
        pageType: {
            type: String,
            default: "cart"
        },
        goodsId: {
            type: Number,
            default: 12
        },
        //购物车页面的商品item需要
        rid: {
            type: Number,
            default: 123
        },
        //刷新价格
        refreshPrice: {},
        gwGoodsItem: {
			type: Object,
			default: function () {
				return {}
			}
        },
        goodsCode: {
            type: String,
            default: "0300002"
        }
        
    },
    data() {
        return {
            isShow: false,
            serviceData : [],
            
        }
    },
    computed: {
        //获取购物车数组对象
        ...mapGetters("gwModules", [
            "cartArray",
            "serviceArray",
            "detailsGoodsNum"
        ]),
        ...mapGetters("xhModules", [
            "userInfo",
        ]),
        // 获取登录状态，用于到货提醒
        sessionId(){
            var sessionId = this.$store.state.xhModules.sessionId ? this.$store.state.xhModules.sessionId : ''
            return sessionId
        },
        //商品缩略图
        minPic() {
            console.log("图片", this.gwGoodsItem.mainPic);
            if (this.gwGoodsItem.mainPic) {
                return this.gwGoodsItem.mainPic;
            }
            return "static/image/demo1.png";
        }
    },
    methods: {
        ...mapMutations("gwModules", [
            types.CART_ARRAY_CHANGE,
            types.CART_NUM_CHANGE,
            types.SERVICE_ARRAY,
            types.DETAILS_GOODS_NUM
            
        ]),
        // 获取时间
        getNowFormatDate() {  
            var date = new Date();  
            var seperator1 = "-";  
            var seperator2 = ":";  
            var month = date.getMonth() + 1;  
            
            var strDate = date.getDate();  
            if (month >= 1 && month <= 9) {  
                month = "0" + month;  
            }  
            if (strDate >= 0 && strDate <= 9) {  
                strDate = "0" + strDate;  
            }  
                
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate  
                    + " " + date.getHours() + seperator2 + date.getMinutes()  
                    + seperator2 + date.getSeconds();  
            return currentdate;  
        },
        // 到货提醒
        arrivalReminder() {
            var that = this
            
            if (!this.sessionId) {
            MessageBox.alert('请登录后再操作', '操作失败').then(
                () => {
                console.log({path: "login", query: "/detail/" + that.goodCode})

                this.$router.push({path: "/login", query: {"page": "/detail/" + this.goodCode}})
                }
            )
            return
            }
            
            const arrivalReminderData = {
                goodscode: this.gwGoodsItem.goodsCode,
                goodsname: this.gwGoodsItem.goodsName,
                cellphone: this.userInfo.phone,
                inputtime: this.getNowFormatDate()
            }

            axios({
                url: window.api.mall_storage_host + 'pubArrivalNotice/add',
                method: 'post',
                params: arrivalReminderData,
                headers:{
                    sessionId: this.sessionId
                }
            }).then(res => {
                if (res.data.returnCode === 0) {
                    Toast({
                        duration: 1000,
                        message: "提交失败",
                        iconClass: "aui-iconfont aui-icon-close"
                    });
                    return
                }
                Toast({
                    duration: 1000,
                    message: "请求已提交",
                    iconClass: "aui-iconfont aui-icon-correct"
                });
            }).catch(e => {
                Toast({
                    duration: 1000,
                    message: "提交失败",
                    iconClass: "aui-iconfont aui-icon-close"
                });
            })

            //alert("到货提醒")
        },
        //判断当前商品购物车里的数量是否已经超出库存
        judgeGoodsCount(num, type) {
            // console.log(this.gwGoodsItem.stockCount);
            
            //是虚拟商品的优先级最高
            if (parseInt(this.gwGoodsItem.goodsType) === api.virtualGoodsType) {
                return true;
            }
            if (!this.gwGoodsItem.stockCount) {
                return;
            }
            // console.log("service-this.goodsId", this.goodsId);
            //获取购物车中的库存
			let cartGoodsItemCount = 0;
            for (let item of this.cartArray) {
                if (parseInt(item.goodsId) === this.goodsId) {
                    cartGoodsItemCount = parseInt(item.goodsNum);
                    //开始判断库存
                    // console.log("item.goodsNum", item.goodsNum);
                    // console.log("num", num);
                    // console.log("this.gwGoodsItem.stockCount", this.gwGoodsItem.stockCount);
                    // console.log(parseInt(item.goodsNum) + parseInt(num) > parseInt(this.gwGoodsItem.stockCount));
                    
                }
            }
            if (cartGoodsItemCount + parseInt(num) >= parseInt(this.gwGoodsItem.stockCount) && type === "detail" || !type) {
                return false;
            } else if (cartGoodsItemCount + parseInt(num) > parseInt(this.gwGoodsItem.stockCount) && type === "cart") {
                return false;
            }
            return true;
            
        },
        //禁止遮罩层滑动
        touchStop(event) {
            // console.log(event);
            event.preventDefault();
            // event.stopPropagation();
            return false;
        },
        //关闭遮罩层
        closeService() {
            // console.log(111111111111111);
            setTimeout(() => {
                this.isShow = false;
            }, 200);
            //如果是购物车页面就清除SERVICE_ARRAY,如果是详情页就保留
            if (this.pageType === "cart") {
                this[types.SERVICE_ARRAY]([]);
            }
            
        },
        //打开遮罩层
        showService() {
            //显示遮罩层，标志位置为true
            this.isShow = true;
            
            //去请求服务数据
            this.getServiceData();
            // console.log(this.$refs.serviceItem);
            if (this.$refs.serviceItem && this.pageType === "cart") {
                this.$refs.serviceItem[0].getServeIdFromCartArray();
            }
        },
        //点击确定按钮
        confirm() {
            //保存当前用户勾选的数据
            if (this.checkGoodsId()) {
                //判断库存
                
                
                //定义请求成功后的回调函数
                let callback = data => {
                    if (data.status === 200 && data.data.returncode === 1) {
                        console.log(data);
                        //请求成功
                        // setTimeout(() => {
                            if (this.pageType === "cart") {
                                let refresh_callback = () => {
                                    this.refreshPrice();
                                }
                                this.initCart(refresh_callback);
                            } else {
                                this.initCart();
                            }
                            
                        // }, 1000);
                        
                    } else if (data.status === 200 && data.data.returncode === -1) {
                        //登录信息失效，需要重新去登陆
                        MessageBox.alert('登录信息失效，请重新登录！').then(action => {
                            this.$router.push({"path": "/login", query: {page: "new"}});
                        });
                    } else {
                        Toast({
                            duration: 1000,
                            message: "网络出错，请重试~",
                            iconClass: "aui-iconfont aui-icon-close"
                        });
                    }
                }
                //如果是详情页,则需要检测本地有无该商品（商品id+增值服务id）
                if (this.pageType === "detail") {
                    //如果没有库存，提示用户
                    
                    if (parseInt(this.gwGoodsItem.stockCount) <= 0 && parseInt(this.gwGoodsItem.goodsType) === api.normalGoodsType) {
                        // console.log("90909090090900909090")
                        // Toast({
                        //     duration: 1000,
                        //     message: "商品卖光啦~",
                        //     iconClass: "aui-iconfont aui-icon-warn"
                        // });
                        MessageBox({
                            title: "商品调货中...",
                            message: "如果需要紧急调货，客服会与您联系！",
                            showCancelButton: true,
                            confirmButtonText: "我要调货",
                            cancelButtonText: "不需要"
                        }).then((e) => {
                            if (e === "confirm") {
                                this.arrivalReminder()
                            }
                        });
                        return;
                    }
                    //这里要考虑已经加入购物车的数量
                    if(!this.judgeGoodsCount(this.detailsGoodsNum, "cart")) {
                        Toast({
                            duration: 1000,
                            message: "超出库存啦~",
                            iconClass: "aui-iconfont aui-icon-warn"
                        });
                        return;
                    }
                    this.$store.dispatch("addCartAnimate", this.detailsGoodsNum);
                    let serviceId = JSON.stringify(this.serviceArray);
                    // let serviceId = this.serviceArray;
                    //遍历购物车数组
                    //给一个临时变量，exist
                    let exist = false;
                    let that = this;
                    this.cartArray.forEach(item => {
                        if (item.goodsId === this.goodsId) {
                            //已经存在该商品
                            exist = true;
                            //取出该商品,并把数量更新
                            let params = Object.assign({}, item, {
                                goodsNum: item.goodsNum + that.detailsGoodsNum,
                                serveId: serviceId
                            });
                            updateCart(params, callback);
                            console.log("已经存在商品", params);
                        }
                    });
                    if (!exist) {
                        //不存在该商品,新建一个新的
                        let goodsChecked = true;
                        if (parseInt(this.gwGoodsItem.goodsType) === 1) {
                            goodsChecked = false;
                        }
                        let params = {
                            rid: "",
                            goodsNum: that.detailsGoodsNum,
                            goodsId: that.goodsId,
                            serveId: serviceId,
                            goodsChecked,
                            goodsType: this.gwGoodsItem.goodsType,
                            goodsCode: this.gwGoodsItem.goodsCode
                        }
                        
                        
                        //请求接口新增一个商品
                        updateCart(params, callback);
                        console.log("不存在商品", params);
                    }
                    // 就初始化vuex中的临时商品对象中的num为1
                } else if (this.pageType === "cart") {
                    //如果是购物车页面，点击确定则只有服务，默认去读当前的商品id的数量
                    let cartArray = this.cartArray;
                    //获得当前商品的num，从而生成params
                    //既然已经在购物车页面操作该步骤，证明购物车必有该商品，无需做有无商品的判断
                    cartArray.forEach(item => {
                        if (item.goodsId === this.goodsId) {
                            //找到了该商品，进行对象拷贝，生成一个对应该rid的新params
                            //因为这里只改变了服务，所以商品数量还是原有的数量
                            let params = Object.assign({}, item, {
                                serveId: JSON.stringify(this.serviceArray),
                            });
                            //已经获取到了参数，则开始请求接口，更新该条商品数据
                            let callback2 = data => {
                                console.log("这是其他的回调函数在执行");
                                //清空vuex中的serviceArray
                                this[types.SERVICE_ARRAY]([]);
                            }
                            updateCart(params, callback, [callback2]);
                        }
                    });
                }
            }
            //关闭服务选择的遮罩层
            this.closeService();
        },
        //判断goodsId是否合法
        checkGoodsId() {
            if (this.goodsId) {
                return true
            } else {
                
                return false
            }
        },
        //从后台请求购物车数据
        getCartData() {
            // getData();
        },
        getServiceData() {
            //当serviceData没有数据时再显示toast框，标明请求数据
            if (this.serviceData.length === 0) {
                //请求服务数据
                let params = {
                    enterpriseid: api.enterpriseid,
                    goodscode: this.gwGoodsItem.goodsCode || this.goodsCode
                    // goodscode: "0300002"
                }
                let callback = data => {
                    console.log(data);
                    // 0-终端安装 1-配件安装 2-维修 3-保养
                    let typeName = ["终端安装服务", "配件安装服务", "维修服务", "保养服务"];
                    let arr = data.map(item => {
                        return item.servetype;
                    });
                    console.log(arr);
                    //然后进行数组去重
                    let res = Array.from(new Set(arr));
                    let handleArr = [];
                    console.log("拿到去重后的服务类别", res);
                    let check = (type) => {
                        let index = 0;
                        for (let item of handleArr) {
                            if (item.category === typeName[type]) {
                                // console.log("有该服务");
                                return index;
                                break;
                            }
                            index++;
                        }
                        // console.log("没有该服务");
                        return false;
                    }
                    res.forEach(type => {
                        data.forEach(item => {
                            if (item.servetype === type) {
                                //先判断是否已经有此分类了
                                if (check(item.servetype) !== false) {
                                    //已经有了该分类
                                    
                                    console.log("有该服务", check(item.servetype));
                                    handleArr[check(item.servetype)].list.push({
                                        name: item.servename,
                                        serveno: item.serveno,
                                        serveprice: item.serveprice,
                                        id: item.serveid,
                                        servetype: item.servetype
                                    })
                                } else {
                                    //还没有该分类
                                    console.log("没有该服务", check(item.servetype));
                                    handleArr.push({
                                        category : typeName[item.servetype],
                                        list: [
                                            {
                                                name: item.servename,
                                                serveno: item.serveno,
                                                serveprice: item.serveprice,
                                                id: item.serveid,
                                                servetype: item.servetype
                                            }
                                        ]
                                    })
                                }
                            }
                        })
                    });
                    console.log("拿到处理后的data", handleArr);
                    this.serviceData = handleArr;
                    //对服务进行分类渲染
                    //成功的回调函数
                }
                getServiceDataFn(params, callback);
            }
        },
        //获取已选中的增值服务的id
        getServiceId() {
            return this.serviceArray.map(item => {
                return item.id;
            }).join(",");
        },
        //
        touchMoveCover(event) {
            event.stopPropagation();
        },
        //重新初始化购物车
        initCart(mcallback) {
			//请求成功的回调
			let callback = (cartList) => {
                setTimeout(() => {
                    //更新vuex的购物车列表
                    this[types.CART_ARRAY_CHANGE](cartList);
                    //更新购物车全局数量
                    this[types.CART_NUM_CHANGE](cartList.length);
                }, 1400);
				
                if (mcallback) {
                    mcallback();
                }
			}
			//请求失败的回调
			let errorFn = (err) => {
				//更新vuex的购物车列表
				this[types.CART_ARRAY_CHANGE]([]);
				//更新购物车全局数量
                this[types.CART_NUM_CHANGE](0);
                Toast({
                    duration: 1000,
                    message: "添加失败",
                    iconClass: "aui-iconfont aui-icon-close"
                });
			}
			getCartData(callback, errorFn);
		}
    },
    components: {
        "service-item" : GoodsServiceItem,
        "base-scroll" : BaseScroll,
        "add-reduce" : CartAddOrReduce
    },
    created () {
        // setTimeout(() => {
        //     this.serviceData = [1, 2, 3, 4, 5, 6];
            
        // }, 2000);
        this.getCartData();
    },
    mounted () {
        // this.serviceData = [1, 2, 3, 4, 5, 6];
    },
    beforeDestroy () {
        //detailsGoodsNum置为1，serviceArray置为空
        this[types.DETAILS_GOODS_NUM](1);
        this[types.SERVICE_ARRAY]([]);
    },
    filters : {
        changePrice(value) {
            return parseFloat(value).toFixed(2);
        }
    }
}
</script>

<style>
    .goods-service-box {
        /* height: 100vh; */
        z-index: 10000;

    }
    .purchase_service {
        z-index:10001;
    }
    .value_added {
        overflow: hidden;
        /* height: 70vh; */
    }
</style>


