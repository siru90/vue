<template>
	<div>
		<li class="aui-list-item">
			<div class="aui-media-list-item-inner">
				<div class="aui-media-list-item-inner line-normal-wrapper" style="width: 100%;">
					<div class="good_check">
						<label>
							<input class="aui-checkbox" type="checkbox" name="demo1" :checked="getGoodsItemChecked(parseInt(virtualGoodsItem.serveid))" @click.stop="chooseGoods(parseInt(virtualGoodsItem.serveid))">
						</label>
					</div>
					<div class="aui-list-item-media" @click.stop="gotoDetail(goodsCode)">
						<img :src="introImg">
					</div>
					<div class="suggest" @click.stop="gotoDetail(goodsCode)">
						<h3>{{virtualGoodsItem.goodsname}}</h3>
                        <!-- <div> -->
                            <!-- <div class="left-guige">  -->
                                <p>
                                    <span>¥
                                        <em>{{virtualGoodsItem.wsprice}}</em>
                                    </span>&nbsp;
                                    <del>¥{{virtualGoodsItem.wsprice}}</del>
                                </p>
                            <!-- </div>  -->
                            <!-- <div class="right-handle">  -->
                                <!-- 采购车加减操作 -->
                                <add-reduce pageType="cart" :goodsId="virtualGoodsItem.serveid" :rid="rid" :refreshPrice="refreshPrice" :gwGoodsItem="gwGoodsItem"></add-reduce>
                            <!-- </div> -->
                         <!-- </div>   -->
					</div>
				</div>
				<div class="operations_list3" v-if="false">
					<i class="icon njfont nj-shanchu"></i>
					<p>删除</p>
				</div>
			</div>
		</li>
	</div>
</template>
<script>
import {mapGetters, mapMutations} from "vuex";
import * as types from "../../store/modules/gw-modules/mutation-types";
import updateCart from "../../utils/updateCart";
import getCartData from "../../utils/getCartData";
import { Toast } from '../../utils/toast2';
import AddOrReduce from "../CartAddOrReduce";
export default {

	props: {
		virtualGoodsArray: {
			type: Array,
			default () {
				return [];
			}
		},
		refreshPrice : {},
		refreshCheckAll: {},
		rid: {
            type: Number,
            default: 123
		},
		goodsId: {
            type: Number,
            default: 13
        },
		goodsCode: {
            type: String,
            default: "1508123"
        },
	},
	data() {
		return {
			//erp虚拟商品对象
            virtualGoodsItem: {},
            gwGoodsItem: {}
		}
	},
	computed: {
        introImg() {
            if (this.virtualGoodsItem.urllist) {
                if(this.virtualGoodsItem.urllist.length && this.virtualGoodsItem.urllist[0].imgurl) {
                    return this.virtualGoodsItem.urllist[0].imgurl;
                } else {
                    return "static/image/demo1.png";
                }
            }
        },
		...mapGetters("gwModules", [
            "cartArray"
        ]),
	},
	methods: {

		//匹配当前goodsItem
        getGoodsItemData() {
            // console.log(this.virtualGoodsArray);
            for (let item of this.virtualGoodsArray) {
                // console.log("匹配当前goodsItem2", this.goodsId);
                if (parseInt(item.serveid) === this.goodsId) {
                    this.virtualGoodsItem = item;
                    // console.log("匹配当前virtualGoodsItem", this.virtualGoodsItem)
                    break;
                }
            }
        },
		//匹配当前商品是否选中
        getGoodsItemChecked(goodsId) {
            for (let item of this.cartArray) {
                // console.log(item.goodsId);
                if (parseInt(item.goodsId) === goodsId) {
                    return item.goodsChecked;
                    break;
                }
            }
            return true;
        },
        //跳到详情页
        gotoDetail(goodscode) {
            this.$router.push({"path": `/detail/${goodscode}`});
        },
		chooseGoods(goodsId) {
            let cartArray = this.cartArray;
            let callback = data => {
                if (data.status === 200 && data.data.returncode === 1) {
                    //请求成功
                    // setTimeout(() => {
                        this.initCart();
                    // }, 2000);
                } else {
                    
                }
            }
            for (let item of cartArray) {
                if (item.goodsId === goodsId) {
                    //选中该类商品，另一类商品不被选中
                    

                    // if (this.judgeType(item.goodsType)) {
                    //     //如果虚拟商品是第一次选中，则取消所有普通商品的选中状态
                    //     Toast({
                    //         duration: 800,
                    //         message: "选中了服务商品",
                    //         iconClass: "aui-iconfont aui-icon-correct"
                    //     });
                    //     for (let goods of cartArray) {
                    //         if (parseInt(goods.goodsType) === 0) {
                    //             goods.goodsChecked = false;
                    //         }
                    //     }
                    // }
                    item.goodsChecked = !item.goodsChecked;
                    updateCart(cartArray, callback);
                    break;
                }
            }
        },
        //判断是否要切换商品类型
        judgeType(type) {
            let returnCode = true;
            for (let item of this.cartArray) {
                if (type === item.goodsType && item.goodsChecked) {
                    returnCode = false;
                    break;
                }
            }
            // console.log("判断类型的方法", returnCode);
            return returnCode;
        },
		initCart() {
            //请求成功的回调
            let callback = cartList => {
                //更新vuex的采购车列表
                this[types.CART_ARRAY_CHANGE](cartList);
                //更新采购车全局数量
                this[types.CART_NUM_CHANGE](cartList.length);
                // Indicator.close();
                this.refreshPrice();
                this.refreshCheckAll();
            }
            //请求失败的回调
            let errorFn = err => {
                //更新vuex的采购车列表
                this[types.CART_ARRAY_CHANGE]([]);
                //更新采购车全局数量
                this[types.CART_NUM_CHANGE](0);
                // console.log("这里在操作");
				this.errToast("网络错误，请重试");
            }
            getCartData(callback, errorFn);
		},
		//显示错误提示
		errToast(msg) {
            Toast({
                message: msg,
                duration: 1000,
                iconClass: "aui-iconfont aui-icon-close"
            });
        },
        ...mapMutations("gwModules", [
            types.CART_ARRAY_CHANGE,
            types.CART_NUM_CHANGE
        ]),
	},
	components: {
		"add-reduce": AddOrReduce,
	},
	created() {
        this.getGoodsItemData();
    },
    watch: {
        virtualGoodsArray() {
            this.getGoodsItemData();
            // console.log("virtualGoodsItem", this.virtualGoodsItem);
            this.gwGoodsItem.goodsType = this.virtualGoodsItem.goodstype || 1;
        }
    }

}
</script>

<style scoped>
    .left-guige p {
        background: white;
    }
    .left-guige {
        float: left;
    }
    .right-handle {
        float: right;
    }
</style>



