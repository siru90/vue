<template>
	 <div >
		<i class="icon njfont nj-gouwuche" @click.stop="add"></i>
	</div>
</template>
<script>
    import {mapMutations, mapGetters} from "vuex";
    import * as types from "../../store/modules/gw-modules/mutation-types";
    import updateCart from "../../utils/updateCart";
    import getCartData from "../../utils/getCartData";
    import { MessageBox } from 'mint-ui';
    import {Toast} from "../../utils/toast2";
    import api from "../../api";
    import axios from 'axios'
	export default {
		props: {
            goodsId: {
                type: Number,
                default: 12
            },
            gwGoodsItem: {
                type: Object,
                default: function () {
                    return {};
                }
            }
		},
		data () {
			return {

			}
		},
		computed: {
            ...mapGetters("gwModules", [
                "cartNum",
                "cartArray"
            ]),
            ...mapGetters("xhModules", [
                "userInfo",
            ]),
            // 获取登录状态，用于到货提醒
            sessionId(){
                var sessionId = this.$store.state.xhModules.sessionId ? this.$store.state.xhModules.sessionId : ''
                return sessionId
            },
		},
		methods: {
        // 获取时间（这东西写了三遍。可是没时间把这玩意儿抽出来）
        getNowFormatDate() {  
            var date = new Date();//当前时间  
            var month = this.zeroFill(date.getMonth() + 1);//月  
            var day = this.zeroFill(date.getDate());//日  
            var hour = this.zeroFill(date.getHours());//时  
            var minute = this.zeroFill(date.getMinutes());//分  
            var second = this.zeroFill(date.getSeconds());//秒  
            
            //当前时间  
            var curTime = date.getFullYear() + "-" + month + "-" + day  
                    + " " + hour + ":" + minute + ":" + second;  
            
            return curTime; 
        },
        zeroFill(i){  
            if (i >= 0 && i <= 9) {  
                return "0" + i;  
            } else {  
                return i;  
            }  
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
                goodsname: this.gwGoodsItem.goodsName || this.gwGoodsItem.goodsname,
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
            //点击图标添加至购物车，默认添加1件
            add() {
                //判断有无库存
                if (parseInt(this.gwGoodsItem.stockCount) <= 0 && parseInt(this.gwGoodsItem.goodsType) === api.normalGoodsType) {
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
                //判断当前商品购物车里的数量是否已经超出库存,仅对普通商品起效
                if (!this.judgeGoodsCount()) {
                    Toast({
                        duration: 1000,
                        message: "超出库存啦~",
                        iconClass: "aui-iconfont aui-icon-warn"
                    });
                    return;
                }


                let exits = false;
                let callback = data => {
                    if (data.status === 200 && data.data.returncode === 1) {
                        //请求成功
                        // console.log("classify页面添加商品------购物车更新成功");
                        this.$store.dispatch("addCartAnimate", 1);
                        // setTimeout(() => {
                            this.initCart();
                        // }, 200);
                    } else if (data.status === 200 && data.data.returncode === -1) {
                        //登录信息失效，需要重新去登陆
                        MessageBox.alert('登录信息失效，请重新登录！').then(action => {
                            this.$router.push({"path": "/login", query: {page: "new"}});
                        });
                    } else {
                        Toast({
                            duration: 1000,
                            message: "添加失败",
                            iconClass: "aui-iconfont aui-icon-close"
                        });
                    }
                }
                this.cartArray.forEach(item => {
                    //如果有了此goodsId，加到没有serveId的商品上，如果没有，则新建一个
                    if (item.goodsId === this.goodsId) {
                        exits = true;
                        let params = Object.assign({}, item, {
                            goodsNum: item.goodsNum + 1
                        });
                        updateCart(params, callback);
                    }
                });
                if (!exits) {
                    //新建一个serveId为空的商品
                    let goodsChecked = true;
                    //判断一下，当前选中的类别是什么类型的商品(最新一期9.5已干掉)
                    //如果是虚拟商品，则添加的普通商品默认不选中
                    // if (this.getGoodsCheckedType() === api.virtualGoodsType) {
                    //     goodsChecked = false;
                    // }

                    // console.log("这是新增的goodsId", this.gwGoodsItem.goodsType);
                    // if (parseInt(this.gwGoodsItem.goodsType) === 1) {
                    //     goodsChecked = false;
                    // }
                    let params = {
                        rid: "",
                        goodsNum: 1,
                        goodsId: this.goodsId,
                        serveId: "",
                        goodsChecked,
                        goodsType: this.gwGoodsItem.goodsType,
                        goodsCode: this.gwGoodsItem.goodsCode
                    }
                    updateCart(params, callback);
                }
            },
            //判断当前商品购物车里的数量是否已经超出库存
            judgeGoodsCount() {
                //虚拟商品优先级最高
                // console.log(this.goodsId);
                if (parseInt(this.gwGoodsItem.goodsType) === api.virtualGoodsType) {
                    return true;
                }
                let cartGoodsItemCount = 0;
                for (let item of this.cartArray) {
                    if (parseInt(item.goodsId) === this.goodsId) {
                        cartGoodsItemCount = parseInt(item.goodsNum);
                        
                    }
                }
                //开始判断库存
                if (cartGoodsItemCount >= parseInt(this.gwGoodsItem.stockCount)) {
                    return false;
                }
                return true;

            },
            //获得当前选中的商品类型，
            getGoodsCheckedType() {
                for (let item of this.cartArray) {
                    if (item.goodsChecked && item.goodsType === api.virtualGoodsType) {
                        return api.virtualGoodsType;
                        break;
                    }
                }
                return api.normalGoodsType;
            },
            //重新初始化购物车
            initCart() {
                //请求成功的回调
                let callback = cartList => {

                    setTimeout(() => {
                        //更新vuex的购物车列表
                        this[types.CART_ARRAY_CHANGE](cartList);
                        //更新购物车全局数量
                        this[types.CART_NUM_CHANGE](cartList.length);
                    }, 1400);

                }
                //请求失败的回调
                let errorFn = err => {
                    //更新vuex的购物车列表
                    this[types.CART_ARRAY_CHANGE]([]);
                    //更新购物车全局数量
                    this[types.CART_NUM_CHANGE](0);
                    Toast({
                        duration: 1000,
                        message: "网络出错啦~",
                        iconClass: "aui-iconfont aui-icon-close"
                    });
                }
                getCartData(callback, errorFn);
            },
            //阻止滑动时间冒泡
            touchstartStop(event) {
                event.stopPropagation();
            },
            ...mapMutations("gwModules", [
                types.CART_ARRAY_CHANGE,
                types.CART_NUM_CHANGE,
                types.SERVICE_ARRAY,
            ]),

		},

	}
</script>

<style scoped>
    .nj-gouwuche {
        position: absolute;
        right: 0.3rem;
        bottom: 0.25rem;
        width: 1.6rem;
        height: 1.6rem;
        background: #EA3939;
        border-radius: 50%;
        color: #ffffff;
        text-align: center;
        line-height: 1.6rem;
        font-size: 1rem !important;
    }
</style>


