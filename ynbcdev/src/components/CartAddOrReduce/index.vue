<template>
    <div class="edit_data">
        <i class="del_cart" @click.stop="reduceCart"></i>
            <span>{{currentGoodsNum}}</span>
        <i class="add_to_cart" @click.stop="addCart"></i>
    </div>
</template>
<script>
	import {mapGetters, mapMutations} from "vuex";
	import { MessageBox } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import {Toast} from "../../utils/toast2";
	import * as types from "../../store/modules/gw-modules/mutation-types";
	import api from "../../api";
	import mAxios from "../../utils/cartAjax";
	import updateCart from "../../utils/updateCart";
	import getCartData from "../../utils/getCartData";
	import deleteCart from "../../utils/deleteCart";
	import {gwToast, gwClose} from "../../utils/toast";
	import {showLoading, hideLoading} from "../../utils/loading";
	export default {
		props: {
			goodsId : {
				type : Number,
				default : 13
			},
			//当数量为1时，再执行减操作是否提醒用户删除该商品
			showCover: {
				type : Boolean,
				default: true
			},
			pageType: {
				type : String,
				default: "detail"
			},
			rid: {
				type: Number,
				default: 345
			},
			refreshPrice: {},
			gwGoodsItem: {
				type: Object,
				default: function () {
					return {}
				}
			},
		},
		data () {
			return {
				currentGoodsNum : 0
			}
		},
		computed: {
			...mapGetters("gwModules", [
				"cartArray",
				"detailsGoodsNum",
			]),
		},
		methods: {
			//商品数量加1
			addCart() {
				if (!this.checkGoodsId()) {
					return;
				}
				//如果是详情页
				if (this.pageType === "detail") {
					//判断当前商品采购车里的数量是否已经超出库存
					// console.log("-0-0-0-0-0-0-0-0-", this.judgeGoodsCount(this.detailsGoodsNum));
					if (!this.judgeGoodsCount(this.currentGoodsNum)) {
						Toast({
							duration: 1000,
							message: "超出库存啦~",
							iconClass: "aui-iconfont aui-icon-warn"
						});
						return;
					}
					this.currentGoodsNum = this.currentGoodsNum + 1;
					//改变vuex中的
					this[types.DETAILS_GOODS_NUM](this.currentGoodsNum);
				} else if (this.pageType === "classify") {
					//直接就调用后台接口进行数据保存
					//首先判断有无当前商品


				} else if (this.pageType === "cart") {
					//判断当前商品采购车里的数量是否已经超出库存
					if (!this.judgeGoodsCount(1, "cart")) {
						Toast({
							duration: 1000,
							message: "超出库存啦~",
							iconClass: "aui-iconfont aui-icon-warn"
						});
						return;
					}
					//采购车页面的加号
					showLoading();
					this.cartArray.forEach(item => {
						//找一下有没有该goodsId的商品
						if (item.goodsId === this.goodsId) {
							//判断商品数量是否已经大于库存

							let params = Object.assign({}, item, {
								goodsNum: item.goodsNum + 1
							});
							let callback = data => {
								if (data.status === 200 && data.data.returncode === 1) {
									//请求成功
									setTimeout(() => {
										this.initCart();
									}, 100);
									
								}
							}
							updateCart(params, callback);
						}
					});
				}
				//当前框框显示商品数量
				
				//更改全局采购车数量
				// this.changeCart(this.currentGoodsNum);
				//根据商品id分门别类的保存到vuex中
				
			},
			//商品数量减1
			reduceCart() {
				//
				if (!this.checkGoodsId()) {
					return;
				}
				//检测是否需要弹出框框
				if (this.showCover) {
					//如果需要弹出框再判断当前数量是否为1了，再减一下就提示用户是否删除该商品了
					if (this.currentGoodsNum === 1) {
						// 提示用户是否删除
						MessageBox.confirm('要从采购车删除该商品吗?').then(confirm => {
							//确认删除该采购车商品
							//显示loading
							showLoading();
							let params = {
								shoppingCartList: [{
									rid: this.rid
								}]
							}
							let callback = data => {
								//执行刷新采购车操作
								setTimeout(() => {
									this.initCart();
								}, 100);
							}
							deleteCart(params, callback);
						}, cancel => {
							// console.log("取消");
						});
						return false;
					}
				} else {
					
				}
				//到0为止
				if (this.currentGoodsNum == 0) {
					// console.log("商品数量不能小于0");
					return false;
				}

				//详情页的减少商品数量
				if (this.pageType === "detail") {
					if (this.currentGoodsNum == 1) {
						return false;
					}
					this.currentGoodsNum = this.currentGoodsNum - 1;
					this[types.DETAILS_GOODS_NUM](this.currentGoodsNum);
				} else if (this.pageType === "cart") {
					//采购车商品减操作只减少数量，不更改服务
					//显示修改中
					showLoading();
					for (let item of this.cartArray) {
						if (item.goodsId === this.goodsId) {
							//找到匹配的商品
							let params = Object.assign({}, item, {
								goodsNum: item.goodsNum - 1
							});
							let callback = data => {
								if (data.status === 200 && data.data.returncode === 1) {
									//请求成功
									setTimeout(() => {
										// console.log("删除1件商品")
										this.initCart();
									}, 100);
								}
							}
							updateCart(params, callback);
						}
					}
				}
			},
			//判断当前商品采购车里的数量是否已经超出库存
            judgeGoodsCount(num, type) {
				//虚拟商品优先级最高
				console.log(parseInt(this.gwGoodsItem.goodsType));
				if (parseInt(this.gwGoodsItem.goodsType) === api.virtualGoodsType) {
                    return true;
                }
				if (!this.gwGoodsItem.stockCount) {
					return;
				}
				//获取采购车中的库存
				let cartGoodsItemCount = 0;
                for (let item of this.cartArray) {
					// console.log("this.goodsId", this.goodsId);
                    if (parseInt(item.goodsId) === this.goodsId) {
						
						// if ()
						cartGoodsItemCount = parseInt(item.goodsNum);
						//开始判断库存
						// console.log("item.goodsNum", item.goodsNum);
						// console.log("num", num);
						// console.log("this.gwGoodsItem.stockCount", this.gwGoodsItem.stockCount);
						// console.log(parseInt(item.goodsNum) + parseInt(num) > parseInt(this.gwGoodsItem.stockCount));
                        
                    }
				}
				if (cartGoodsItemCount + parseInt(num) >= parseInt(this.gwGoodsItem.stockCount) && (type === "detail" || !type)) {
					return false;
				} else if (cartGoodsItemCount + parseInt(num) > parseInt(this.gwGoodsItem.stockCount) && type === "cart") {
					return false;
				}

				
                return true;
                
            },
			//检测goodsId是否合法
			checkGoodsId() {
				if (!this.goodsId) {
					// console.log("goodsId不合法");
					return false;
				}
				return true;
			},
			//初始化currentGoodsNum
			initGoodsNum() {
				//详情页初始化为1
				if (this.pageType === "detail") {
					this.currentGoodsNum = 1;
					// this.changeCart(this.currentGoodsNum);
					this[types.DETAILS_GOODS_NUM](this.currentGoodsNum);
				} else if (this.pageType === "cart") {
					// 去采购车列表中找当前商品

					this.cartArray.forEach(item => {
						// console.log(this.goodsId, item.goodsId);
						if (parseInt(this.goodsId) === parseInt(item.goodsId)) {
							// console.log("cart------找到商品，初始化其数量");
							this.currentGoodsNum = item.goodsNum;
						}
					});
				} else if (this.pageType === "classify") {
					//初始化分类页面的数量，只判断goodsId
					let tempNum = 0;
					this.cartArray.forEach(item => {
						//只要goodsID
						if (this.goodsId === item.goodsId) {
							// console.log("classify------找到商品，初始化其数量");
							// this.currentGoodsNum = item.goodsNum;
							tempNum += item.goodsNum;
						}
					});
					this.currentGoodsNum = tempNum;
				}
			},
			//更新采购车的操作
			initCart() {
				//请求成功的回调
				let callback = (cartList) => {
					//更新vuex的采购车列表
					this[types.CART_ARRAY_CHANGE](cartList);
					//更新采购车全局数量
					this[types.CART_NUM_CHANGE](cartList.length);
					//更新价格
					this.refreshPrice();
					// Indicator.close();
					hideLoading();
					// gwToast({
					// 	message: "success",
					// 	duration: 1000,
					// 	type: "success"
					// });
				}
				//请求失败的回调
				let errorFn = (err) => {
					//更新vuex的采购车列表
					this[types.CART_ARRAY_CHANGE]([]);
					//更新采购车全局数量
					this[types.CART_NUM_CHANGE](0);
					
					Indicator.close();
					gwToast({
						message: "fail",
						duration: 1000,
						type: "fail"
					});
				}
				getCartData(callback, errorFn);
			},
			...mapMutations("gwModules", [
				types.DETAILS_GOODS_NUM,
				types.CART_ARRAY_CHANGE,
				types.CART_NUM_CHANGE,
			])
		},
		components: {
			"toast" : Toast
		},
		created () {
			//初始化currentGoodsNum
			this.initGoodsNum();
		},
		watch: {
			cartArray () {
				this.initGoodsNum();
			},
			goodsId () {
				this.initGoodsNum();
			},
			detailsGoodsNum () {
				// this.initGoodsNum();
				this.currentGoodsNum = this.detailsGoodsNum;
			},

		}
	}
</script>

<style>

</style>


