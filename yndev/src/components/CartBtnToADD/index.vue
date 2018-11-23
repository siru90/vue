<template>
	<div style="position: relative; z-index: 10000">
		<div v-if="checkGoodType(gwGoodsItem)">
			  <div id="buyNow" class="aui-btn aui-btn-danger " @click="addCart(gwGoodsItem,1)">立即购买</div>
    	</div>
		<div v-else>
            <div id="add_to_car" class="aui-btn aui-btn-danger " @click="addCart">加入购物车</div>
		</div>
		
		<!-- <div id="add_to_car" class="aui-btn aui-btn-danger aui-btn-sm" @click="addCart">加入购物车</div> -->
		<!-- 服务和商品遮罩层 -->
		<goods-service 
			:addGroupCarFn=" checkGoodType(gwGoodsItem) ? gotoConfirmorderPage : null"
			ref="goodsService" 
			pageType="detail" 
			:goodsId="goodsId"
			:gwGoodsItem="gwGoodsItem">
		</goods-service>
	</div>
</template>
<script>
import GoodsService from "../GoodsService"
import updateCart from "../../utils/updateCart";
import * as types from "../../store/modules/gw-modules/mutation-types";
import {mapMutations, mapGetters} from "vuex"; 
import { MessageBox } from 'mint-ui';
export default {
	props: {
		pageType: {
			type: String,
			default: "detail"
		},
		goodsId: {
			type: Number,
			default: 13
		},
		gwGoodsItem: {
			type: Object,
			default: function () {
				return {}
			}
		}

	},
	data() {
		return {}
	},
	computed: {
		...mapGetters("xhModules", [
                "login"
            ]),
	},
	methods: {
		//点击添加购物车按钮
		addCart() {
			this.$refs.goodsService.showService();
		},
		checkGoodType(item){
			if(item.goodsType==3)
				return true;
			else
				return false;
		},
		...mapMutations("gwModules", [
                types.COMCART_ARRAY_CHANGE
            ]),
		gotoConfirmorderPage(item,goodsNum) {
            console.log("组合商品：立即购买&&&&&&&&&&&&&&&&&&&");
            let serveId= JSON.stringify(item.subgoodslist);
            if(!serveId){
                AlertMessage("组合商品商品明细不存在！");
                return;
            }
            let callback = data => {
                    if (data.status === 200 && data.data.returncode === 1) {
                        //更新vuex的购物车列表
                        console.log("组合商品购物车："+JSON.stringify(data.data));
                        //请求成功
                        if (data.data.data[0]) {
                            this[types.COMCART_ARRAY_CHANGE]( data.data.data[0].shoppingCartList);
                            this.$router.push({path: '/confirmOrder?pageType=0&buyNowFlag=1'})
                        } else {
                            AlertMessage("立即购买失败！");
                        }
                        
                    } else if (data.status === 200 && data.data.returncode === -1) {
                        //登录信息失效，需要重新去登陆
                        MessageBox.alert('登录信息失效，请重新登录！').then(action => {
                            this.$router.push({"path": "/login", query: {page: "new"}});
                        });
                    } else {
                        AlertMessage("立即购买失败！");
                    }
                }
            let params = {
                        rid: "",
                        goodsNum: goodsNum,
                        goodsId: item.goodsId,
                        serveId: serveId,
                        goodsChecked:true,
                        goodsType: item.goodsType,
                        goodsCode: item.goodsCode
                    }
			if (this.login) {
				updateCart(params, callback);
			} else {
				MessageBox.alert('登录信息失效，请重新登录！').then(action => {
					this.$router.push({"path": "/login", query: {page: "new"}});
				});
			}
             
        },
        AlertMessage(message){
            Toast({
                            duration: 1000,
                            message: message,
                            iconClass: "aui-iconfont aui-icon-close"
            });
        },
	},
	components: {
		"goods-service": GoodsService,
	}

}
</script>


<style>
	#add_to_car {
		background: #970000 !important;
	}
</style>


