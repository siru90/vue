<template>
	 <div style="width:100vw;display:flex;flex-flow:column nowrap;">
		 <!-- <header class="aui-bar aui-bar-nav aui-bar-light opacity_title" style="left: 0px;position:static;height:2.75rem;display:block;">
			<div style="positon:relative; height: 2.75rem;position:relative;">
				<div class="go-back" @click.stop="goBack">
					<i></i>
					<i></i>
					<i></i>
				</div>
				<div class="aui-title">采购车</div>
				<div class="aui-pull-right text-del" style="margin-top:0;height:100%;" @click.stop="clearCar" v-if="cartArray.length">删除</div>
			</div>
		</header> -->
		<!-- <div style="width:100vw;height:3rem;"></div>	 -->
		<p v-if="false" style="padding:5px 0;padding-left:0.75rem;box-sizing:border-box;width:100vw;color:#EA3939;font-size:12px;background:#fff;">温馨提示：服务商品和实体商品不能同时下单</p>		
		<div v-if="cartArray.length" style="overflow:scroll;flex:1;">
			<!-- 商品列表 -->
			<div class="aui-content cart-content" >
				<ul class="aui-list aui-media-list commodity_list">
					<!-- 显示购物车数量和全选操作 -->
					<li class="aui-list-item">
						<div class="aui-list-item-inner">
							<label class="aui-pull-left">
								<input class="aui-checkbox" type="checkbox" name="demo1" 
									:checked="getAllChecked()"
									@click.stop="checkAll()"
								/>
								&nbsp;&nbsp;全选
							</label>
							<div class="aui-pull-right text_c_gray">共{{cartNum}}件</div>
						</div>
					</li>
					<!-- 每个商品item -->
					 <goods-item v-for="(item, index) in normalCartArray" 
						:key="index" 
						:rid="parseInt(item.rid)" 
						:goodsId="parseInt(item.goodsId)" 
						:goodsArray="goodsArray"
						:refreshPrice="getTotalPrice"
						:refreshCheckAll="getAllChecked"
						ref="goodsItem"
					>
					</goods-item> 
					<!-- 每个虚拟商品item -->
					<virtual-item v-for="(item, index) in virtualCartArray" :key="index"
						:virtualGoodsArray="virtualGoodsArray"
						:refreshPrice="getTotalPrice"
						:refreshCheckAll="getAllChecked"
						:rid="parseInt(item.rid)"
						:goodsId="parseInt(item.goodsId)"
						:goodsCode="item.goodsCode"
					>
					</virtual-item>
				</ul>
			</div>
			<!-- footer部分 -->
			
		</div>
		<!--购物车是空的-->
        <div class="no_data" v-if="!cartArray.length" style="flex:1;">
            <img src="static/image/no_good.png"/>
            <p>购物车里没有东西哦，快去挑选吧~</p>
            <div class="back_home aui-btn aui-btn-outlined" @click.stop="goHome">逛逛首页</div>
        </div>
        <!--购物车是空的 end-->
		<div v-if="cartArray.length" class="settle_accounts fixed_div" style="position:fixed;display:flex;">
			<div class="good_check">
				<label><input class="aui-checkbox" type="checkbox" name="demo1" :checked="getAllChecked()" @click.stop="checkAll"><!--&nbsp;全选--></label>
			</div>
			<div class="total_con" style="flex:1;">
				<h3>合计：<span ref="totalPrice">{{totalPrice}}</span></h3>
				<p>已优惠&nbsp;￥{{yhPrice}}<font style="color:#fff;">免费配送</font></p>
			</div>
			<div id="to_settlement" class="to_settlement" @click="confirmOrder">
				去下单
			</div>
		</div>
		
	</div> 
</template>
<script>
	import goodsItem from "../../components/CartGoodsItem";
	import virtualGoodsItem from "../../components/CartVirtualGoodsItem"
	import * as rootTypes from "../../store/mutations-type";
	import {mapGetters, mapMutations} from "vuex";
	import * as types from "../../store/modules/gw-modules/mutation-types";
	import updateCart from "../../utils/updateCart";
	import getCartData from "../../utils/getCartData";
	import deleteCart from "../../utils/deleteCart";
	import { MessageBox } from 'mint-ui';
	import { Toast } from '../../utils/toast2';
	import {showLoading, hideLoading} from "../../utils/loading";
	import api from "../../api";
	

	import axios from "axios";
	export default {
		props: {

		},
		data () {
			return {
				//真实商品数组，包含商品详情等信息
				goodsArray: [],
				virtualGoodsArray: [],
				goodsIds: "",
				virtualGoodsIds: "",
				totalPrice: 0,
				yhPrice: 0,
				// goodsItemChecked: true
			}
		},
		computed: {
			...mapGetters("gwModules", [
				"cartNum",
				"cartArray"
			]),
			...mapGetters("xhModules", [
				"userInfo"
			]),
			normalCartArray() {
				return this.cartArray.filter(item => item.goodsType === 0);
			},
			virtualCartArray() {
				return this.cartArray.filter(item => item.goodsType === 1);
			},
		},
		mounted() {
				document.querySelector('body').id = "goodsCar"
		},

		methods: {
			
			mScroll (pos) {
			},
			//计算一下当前商品有无service
			hasService (goodsId) {
				for (let item of this.cartArray) {
					if (item.goodsId === parseInt(goodsId)) {
						//找到该商品，判断有无serveId
						if (item.serveId) {
							return true;
						} else {
							return false;
						}
					}
				}
				return false;
			},
			//初始化商品详情
			initGoodsData() {
				showLoading();
				let goodsIds = this.goodsIds;
				let options = {
					method: "get",
					params: {
						enterpriseid: api.enterpriseid,
						goodsid: goodsIds
					},
					url: window.api.local_host + api.gwGetGoodsData,
					headers: {
						sessionId: window.localStorage.getItem('sessionId')
					},
				}
				axios(options).then(data => {
					// console.log("", data);
					if (data.status === 200 && data.data.returnCode !== 0) {
						//请求成功
						// console.log("请求成功", data.data.data)
						this.goodsArray = data.data.data;
						this.getTotalPrice();
						hideLoading();
					} else {
						hideLoading();
					}
				}).catch(err => {
					hideLoading();
				});
			},
			//初始化虚拟商品的服务
			initVirtualGoodsData() {
				showLoading();
				// if (this.virtualGoodsIds) {
					let options = {
						method: "get",
						params: {
							enterpriseid: api.enterpriseid,
							serveid: this.virtualGoodsIds
						},
						url: window.api.mall_base_host + api.gwGetVirtualGoodsInfo
					}
					// console.log("这是组装的参数", options);
					axios(options).then(data => {
						// console.log("虚拟商品请求", data);
						if (data.status === 200 && data.data.returnCode !== 0) {
							//请求成功
							// console.log("虚拟商品请求成功", data.data.data)
							this.virtualGoodsArray = data.data.data;
							this.getTotalPrice();
							hideLoading();
						} else {
							hideLoading();
						}
					}).catch(err => {
						hideLoading();
					})

				// }
				
			},
			//获取拼接后的goodsId
			getGoodsId() {
				let goodsArray = this.cartArray.filter(item => item.goodsType === 0);
				this.goodsIds = goodsArray.map(item => {
					return item.goodsId;
				}).join(",");
			},
			//获取拼接后的虚拟商品的ID
			getVirtualGoodsId() {
				let virtualGoodsArray = this.cartArray.filter(item => parseInt(item.goodsType) === api.virtualGoodsType);
				// console.log("这是找到的虚拟商品item数组", virtualGoodsArray);
				this.virtualGoodsIds = virtualGoodsArray.map(item => {
					return item.goodsId;
				}).join(",");
			},
			//设置头部信息
			setHeader() {
				let t = this;
				let options = {
					titlePart: {
						isHome: false,
						title: '采购车'
					},
					hasSearch: false,
					handlePart: {
						type: t.cartArray.length ? "2" : "",
						handleClick () {
							MessageBox.confirm('要清空购物车吗?').then(action => {
								
								if (!Array.isArray(t.cartArray) || t.cartArray.length === 0) {
									Toast({
										duration: 1000,
										message: "购物车没有商品",
										iconClass: "aui-iconfont aui-icon-warn"
									});
									return false;
								}
								// console.log("确定全删除");
								let deleteGoodsRids = t.cartArray.map(item => {
									return {rid: item.rid};
								});
								let callback = data => {
									//更新购物车
									let callback2 = () => {
										t.getTotalPrice();
									}
									t.initCart(callback2);
									//更新商品价格
									
									// t.$forceUpdate();
								}
								deleteCart({shoppingCartList: deleteGoodsRids}, callback);
							}, cancel => {
							});
							
						}
					}
				}
				this[rootTypes.SET_HEADER](options)
			},
			//清空购物车
			clearCar () {
				let t = this;
				// MessageBox.confirm('要清空购物车吗?').then(action => {
				// 	if (!Array.isArray(t.cartArray) || t.cartArray.length === 0) {
						
				// 		return false;
				// 	}
				// 	// console.log("确定全删除");
				// 	let deleteGoodsRids = t.cartArray.map(item => {
				// 		return {rid: item.rid};
				// 	});
				// 	let callback = data => {
				// 		//更新购物车
				// 		let callback2 = () => {
				// 			Toast({
				// 				duration: 1000,
				// 				message: "删除成功啦~",
				// 				iconClass: "aui-iconfont aui-icon-correct"
				// 			});
				// 			t.getTotalPrice();
				// 		}
				// 		t.initCart(callback2);
				// 		//更新商品价格
						
				// 		// t.$forceUpdate();
				// 	}
				// 	deleteCart({shoppingCartList: deleteGoodsRids}, callback);
				// }, cancel => {
				// });
				this.deleteChooseGoods();
			},
			//按选中删除
			deleteChooseGoods() {
				//如果没有选中的商品则不作处理
				if (!this.hasCheckedGoods()) {
					// console.log("没有选中的商品");
					return;
				}
				let that = this;
				//获得选中的商品
				MessageBox.confirm('要删除选中的商品吗？').then(action => {
					
					let deleteGoodsRids = that.cartArray.filter(item => {
						return item.goodsChecked;
					}).map(item => {
						return {rid: item.rid};
					});
					let callback = data => {
						//更新购物车
						let callback2 = () => {
							Toast({
								duration: 1000,
								message: "删除成功啦~",
								iconClass: "aui-iconfont aui-icon-correct"
							});
							that.getTotalPrice();
						}
						that.initCart(callback2);
					}
					deleteCart({shoppingCartList: deleteGoodsRids}, callback);

				}, cancel => {});
				// console.log("这是选中的要删除的商品rid", deleteGoodsRids);

			},
			//删除商品时判断是否有商品是选中状态
			hasCheckedGoods() {
				let exits = false;
				for (let item of this.cartArray) {
					if (item.goodsChecked) {
						exits = true;
						break;
					}
				}
				return exits;
			},
			//获取服务总价
			getServicePrice() {
				let servicePrice = 0;
				this.cartArray.forEach(item => {
					if (item.goodsChecked || item.goodsChecked == undefined) {
						if (item.goodsType === api.normalGoodsType && this.getGoodsItemData(item.goodsId)) {
							//判断有无服务
							if (item.serveId && item.serveId !== "[]") {
								//有服务加上该价格
								
								let service = JSON.parse(item.serveId);
								// console.log("解析服务计算价格", service);
								service.forEach(priceItem => {
									servicePrice += parseFloat(priceItem.price) * item.goodsNum;
								});
							} 
						}
					}
				});
				// console.log("服务价格", servicePrice);
				return servicePrice;
			},
			//合计(优惠后的价格)
			getTotalPrice() {
				this.totalPrice = 0;
				this.cartArray.forEach(item => {
					//判断商品是否被选中
					if (item.goodsChecked || item.goodsChecked == undefined) {
						//如果选中了，则判断是实体商品还是服务商品，需要从不同的数组里取商品
						if (item.goodsType === api.normalGoodsType) {
							//这是实体商品
							if (this.getGoodsItemData(item.goodsId)) {
								this.totalPrice = this.totalPrice + parseFloat(this.getGoodsItemData(item.goodsId).wsprice) * item.goodsNum;
							}
						} else if (item.goodsType === api.virtualGoodsType) {
							//这是服务商品
							if (this.getVirtualGoodsItemData(item.goodsId)) {
								this.totalPrice = this.totalPrice + parseFloat(this.getVirtualGoodsItemData(item.goodsId).wsprice) * item.goodsNum;
							}
						}

					}
				});
				this.totalPrice = (this.totalPrice + this.getServicePrice()).toFixed(2);
				this.getYHPrice();
				//判断当前是哪种商品类型，计算其价格
				// if (this.getAllCheckedType() === api.normalGoodsType) {
				// 	this.cartArray.forEach(item => {
				// 		if (item.goodsChecked || item.goodsChecked == undefined) {
				// 			if (this.getGoodsItemData(item.goodsId)) {
				// 				this.totalPrice = this.totalPrice + parseFloat(this.getGoodsItemData(item.goodsId).wsprice) * item.goodsNum;
				// 			}
				// 		}
				// 	});
				// 	this.totalPrice = (this.totalPrice + this.getServicePrice()).toFixed(2);
				// 	this.getYHPrice();
				// } else if (this.getAllCheckedType() === api.virtualGoodsType) {
				// 	this.cartArray.forEach(item => {
				// 		if (item.goodsChecked || item.goodsChecked == undefined) {
				// 			if (this.getVirtualGoodsItemData(item.goodsId)) {
				// 				this.totalPrice = this.totalPrice + parseFloat(this.getVirtualGoodsItemData(item.goodsId).wsprice) * item.goodsNum;
				// 			}
				// 		}
				// 	});
				// }
				
			},
			//已优惠价格（原价-现价）
			//该方法要在获取到现价之后再调用
			getYHPrice() {
				let price = 0;
				this.yhPrice = 0;
				this.cartArray.forEach(item => {
					if (item.goodsChecked || item.goodsChecked == undefined) {
						if (item.goodsType === api.normalGoodsType && this.getGoodsItemData(item.goodsId)) {
							price = price + parseFloat(this.getGoodsItemData(item.goodsId).discountprice) * item.goodsNum;
						} else if (item.goodsType === api.virtualGoodsType && this.getVirtualGoodsItemData(item.goodsId)) {
							price = price + parseFloat(this.getVirtualGoodsItemData(item.goodsId).wsprice) * item.goodsNum;
						} 
					}
				});
				this.yhPrice = parseFloat((price - parseFloat(this.totalPrice) + this.getServicePrice()).toFixed(2)).toFixed(2);
				
			},
			//全选和全不选操作
			checkAll() {
				if (!Array.isArray(this.cartArray) || this.cartArray.length === 0) {
					return;
				}
				let cartArray = this.cartArray;
				let checked = this.getAllChecked();
				// cartArray.filter(item => {
				// 	return item.goodsType === this.getAllCheckedType();
				// }).forEach(item => {
				// 	item.goodsChecked = !checked;
				// });
				cartArray.forEach(item => {
					item.goodsChecked = !checked;
				});
				let callback = data => {
                    if (data.status === 200 && data.data.returncode === 1) {
                        //请求成功
                        this.initCart();
                    } else {
						// console.log("全选操作失败");
                    }
				}
				
				updateCart(cartArray, callback);
				//更新子元素的选取状态
				if (this.$refs.goodsItem) {
					this.$refs.goodsItem.forEach(item => {
						item.$forceUpdate();
					});
				}
				
				//refresh价格
				this.getTotalPrice();

			},
			//获取选中的商品的数量
			getCheckedGoodsNum() {
				let num = 0;
				this.cartArray.forEach(item => {
					if (item.goodsChecked) {
						num++;
					}
				});
				return num;
			},
			//获取全选框的状态
			getAllChecked() {
				//获取当前类别的全选状态
				let checked = true;
				//首先判断一下是否都没选中
				// let firstChecked = false;
				// this.cartArray.forEach(item => {
				// 	if (item.goodsChecked) {
				// 		firstChecked = true;
				// 	}
				// });
				// if (!firstChecked) {
				// 	return firstChecked;
				// }
				// this.cartArray.filter(item => {
				// 	return item.goodsType === this.getAllCheckedType();
				// }).forEach(item => {
				// 	if (item.goodsChecked === false) {
				// 		// console.log("有子元素为false");
				// 		checked = false;
				// 	}
				// });
				this.cartArray.forEach(item => {
					if (item.goodsChecked === false) {
						// console.log("有子元素为false");
						checked = false;
					}
				});
				return checked;
			},
			//获取全选框需操作的商品类型（9.5本期干掉）
			getAllCheckedType() {
				
				let normalCkecked = false;
				let virtualChecked = false;
				let normalGoodsArray = this.cartArray.filter(item => {
					return item.goodsType === api.normalGoodsType;
				});
				let virtualGoodsArray = this.cartArray.filter(item => {
					return item.goodsType === api.virtualGoodsType;
				});
				//判断是否存在实体商品，如果没有，则可以选择虚拟商品
				if (!Array.isArray(normalGoodsArray) || normalGoodsArray.length === 0) {
					// console.log("-------------------------", normalGoodsArray);
					return api.virtualGoodsType;
				}
				for (let item of normalGoodsArray) {
					if (item.goodsChecked) {
						normalCkecked = true;
						break;
					}
				}
				if (!normalCkecked) {
					for (let item of virtualGoodsArray) {
						if (item.goodsChecked) {
							virtualChecked = true;
							break;
						}
					}
				}

				//如果normalCkecked为true，则当前需要操作普通商品
				if (normalCkecked) {
					return api.normalGoodsType;
				} else if (virtualChecked) {
					//如果virtualChecked为true，则当前需要操作虚拟商品
					return api.virtualGoodsType;
				} else {
					//如果两个都没选中，则默认操作普通商品
					return api.normalGoodsType;
				}
			},
			//匹配当前普通商品
			getGoodsItemData(goodsId) {
				let goodsItem;
				for (let item of this.goodsArray) {
					if (parseInt(item.goodsid) === parseInt(goodsId)) {
						// console.log(item);
						goodsItem = item;
						break;
					}
				}
				return goodsItem;
			},
			//匹配当前虚拟商品
			getVirtualGoodsItemData(serveId) {
				for (let item of this.virtualGoodsArray) {
					if (parseInt(item.serveid) === parseInt(serveId)) {
						return item;
						break;
					}
				}
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
						message: "服务器出错啦~",
						iconClass: "aui-iconfont aui-icon-warn"
					});
                }
                getCartData(callback, errorFn);
			},
			//去下单
			confirmOrder() {
				//判断有无登陆
				if (!localStorage.getItem("sessionId")) {
					//提示登录
					MessageBox.alert('请先登录').then(action => {
						this.$router.push({"path": "/main/classify"});
					});
					return;
				}

				//判断购物车有无商品
				if (Array.isArray(this.cartArray) && this.cartArray.length > 0) {
					if (this.getCheckedGoodsNum() === 0) {
						this.errToast("请选择商品");
						return;
					}
					//把价格保存到vuex中
					if (this.$refs.totalPrice) {
						let totalPrice = parseFloat(this.$refs.totalPrice.innerHTML);
						// console.log(totalPrice);
						this[types.TOTAL_PRICE](totalPrice);
					} else {
						Toast({
							duration: 1000,
							message: "服务器出错啦~",
							iconClass: "aui-iconfont aui-icon-warn"
						});
					}

					//去下单判断商品类型，1代表全是服务商品，0代表混合商品或者全是普通商品

					if (this.getSelectedGoodsType() === api.normalGoodsType) {
						this.$router.push({path:"/confirmorder", query: {pageType: api.normalGoodsType}});
					} else if (this.getSelectedGoodsType() === api.virtualGoodsType) {
						this.$router.push({path:"/confirmorder", query: {pageType: api.virtualGoodsType}});
					} else {
						this.errToast("请选择商品");
						return;
					}
				}
			},
			//判断当前去下单（选中）的商品是否全是服务商品
			getSelectedGoodsType() {
				let goodsType = 1;
				for (let item of this.cartArray) {
					if (item.goodsChecked && item.goodsType === 0) {
						goodsType = 0;
						break;
					}
				}
				return goodsType;
			},
			//去首页，逛逛首页
			goHome() {
				this.$router.push({path: "/"});
			},
			//错误提示
			errToast(msg) {
				Toast({
					duration: 1000,
					message: msg,
					iconClass: "aui-iconfont aui-icon-warn"
				});
			},
			//返回上一页
			goBack() {
				window.history.back();
			},
			...mapMutations([
				rootTypes.SET_HEADER
			]),
			...mapMutations("gwModules", [
				types.CART_ARRAY_CHANGE,
				types.CART_NUM_CHANGE,
				types.TOTAL_PRICE
			])
		},
		components : {
			"goods-item" : goodsItem,
			"virtual-item": virtualGoodsItem
		},
        created () {
			console.log("这是cart页面");
			if(window.location.hash == "#/cart"){
				this.$store.dispatch('hzh/SaveBillBtn',"");
				this.$store.dispatch('hzh/SaveBillContent',"");
				this.$store.dispatch('hzh/GetBillInfor',"");
			}
			console.log("userInfo对象", this.userInfo);
			// showLoading();
			this.setHeader();
			this.getGoodsId();
			this.getVirtualGoodsId();
		},
		watch : {
			goodsIds (newVal, oldVal) {
				if (newVal) {
					this.initGoodsData();
					this.getAllChecked();
				}
				// this.initGoodsData();
			},
			virtualGoodsIds (newVal, oldVal) {
				if (newVal) {
					// console.log(newVal, "这是新值");
					this.initVirtualGoodsData();
					this.getAllChecked();
				}
			}
			// cartArray() {
			// }
		},
		updated () {
			this.goodsIds = "";
			this.virtualGoodsIds = "";
			this.getGoodsId();
			this.getVirtualGoodsId();
		},
		beforeDestroy() {
			hideLoading();
			document.querySelector('body').id = ""
		}

	}
</script>

<style>
	#goodsCar .text-del {
		margin-top: 0;
	}
	#goodsCar header{
		display: block !important;
	}
    #goodsCar .cart-header {
        margin-top: 3rem;
		opacity: 1;
    }
	#goodsCar .cart-content {
		/* margin-bottom: 4rem; */
	}
	#goodsCar .settle_accounts {
		z-index: 2;
	}
	
</style>


