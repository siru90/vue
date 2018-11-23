<template>
    <!-- 商品item -->
    <div>
        <li class="aui-list-item">
            <!-- 去凑单 -->
            <div class="preferential" v-if="hasPre">
                <label class="aui-label-danger aui-label-outlined">满减</label> 购满288.00元，可减10.0元
                <a>去凑单</a>
            </div>
            <!-- 商品主体 -->
            <div class="aui-media-list-item-inner">
                <div class="aui-media-list-item-inner line-normal-wrapper" style="width: 100%;">
                    <div class="good_check">
                        <label>
                            <input class="aui-checkbox" type="checkbox" name="demo1" :checked="getGoodsItemChecked(parseInt(goodsItemData.goodsid))" @click.stop="chooseGoods(parseInt(goodsItemData.goodsid))">
                        </label>
                    </div>
                    <div class="aui-list-item-media" @click.stop="gotoDetail(goodsItemData.goodscode)">
                        <img :src="introImg">
                    </div>
                    <div class="suggest" @click.stop="gotoDetail(goodsItemData.goodscode)">
                        <h3>{{goodsItemData.goodsname}}</h3>
                         <!-- <div> 
                             <div class="left-guige">  -->
                                <p>规格：{{goodsItemData.goodsspec || "1"}}/{{goodsItemData.goodsunit || "件"}}</p>
                                <p>
                                    <del>¥{{tofixed(goodsItemData.normalprice)}}</del>                                    
                                    
                                </p>
                                <p>¥
                                    <em style="color:red;">{{tofixed(goodsItemData.wsprice)}}</em>
                                </p>
                             <!-- </div>  -->
                             <!-- <div class="right-handle">  -->
                                <!-- 购物车加减操作 -->
                                <add-reduce pageType="cart" :goodsId="goodsId" :rid="rid" :refreshPrice="refreshPrice" :gwGoodsItem="gwGoodsItem"></add-reduce>
                             <!-- </div> 
                         </div>  -->
                    </div>
                </div>
                <div class="operations_list3">
                    <i class="icon njfont nj-shanchu"></i>
                    <p>删除</p>
                </div>
            </div>
        </li>
        <!-- 所带服务 -->
        <div class="server_show" v-if="hasService" @click="showService">
            <div id="service_select" class="gift_list">
                <h4>[服务]</h4>
                <dl>
                    <dd v-for="(item, index) in goodsServiceItemData" :key="index">
                        <font>{{item.name}}</font>
                        <span>¥{{item.price}}×{{serviceNum}}</span>
                    </dd>
                </dl>
            </div>
            <!--点击修改或选择服务-->
            <div class="gift_list" v-if="false">
                <h4>[赠品]</h4>
                <dl>
                    <dd>
                        <font>赠品名称</font>
                        <span>¥9.8×1</span>
                    </dd>
                </dl>
            </div>
            <!--赠品链接到赠品的商品链接-->

        </div>
        <!-- 选择服务 -->
        <goods-service class="goodsService" 
            ref="service" 
            :rid="rid" 
            pageType="cart" 
            :goodsId="goodsId"
            :refreshPrice="refreshPrice"
            :goodsCode="goodsItemData.goodscode"
        >
        </goods-service>
    </div>
</template>
<script>
import AddOrReduce from "../CartAddOrReduce";
import GoodsService from "../GoodsService";
import {mapGetters, mapMutations} from "vuex";
import * as types from "../../store/modules/gw-modules/mutation-types";
import updateCart from "../../utils/updateCart";
import getCartData from "../../utils/getCartData";
import { Toast } from '../../utils/toast2';
import {MessageBox} from "mint-ui";
export default {
    
    props: {
        hasPre : {
            type: Boolean,
            default: false
        },
        // hasService : {
        //     type: Boolean,
        //     default: true
        // },
        rid: {
            type: Number,
            default: 123
        },
        goodsId: {
            type: Number,
            default: 13
        },
        goodsArray: {
            type: Array,
            default: function () {
                return [];
            }
        },
        refreshPrice : {},
        refreshCheckAll: {},
        goodsItemChecked: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            goodsItemData: {},
            goodsServiceItemData: [],
            gwGoodsItem: {stockCount: 0}
        }
    },
    computed: {
        ...mapGetters("gwModules", [
            "cartArray"
        ]),
        introImg() {
            if (this.goodsItemData.urllist) {
                if(this.goodsItemData.urllist[0].imgurl) {
                    return this.goodsItemData.urllist[0].imgurl;
                } else {
                    return "static/image/demo1.png";
                }
            }
        },
        // 判断当前商品是不是带服务
        hasService() {
            for (let item of this.cartArray) {
				if (item.goodsId === this.goodsId) {
                    //找到该商品，判断有无serveId
                    if (item.serveId && item.serveId !== "[]") {
                        //有服务解析该服务
                        this.goodsServiceItemData = JSON.parse(item.serveId);
                        return true;
                    } else {
                        return false;
                    }
                }
			}
			return false;
        },
        //当前服务的数量与商品一样
        serviceNum() {
            // 去购物车列表中找当前商品
            let num = 0;
            this.cartArray.forEach(item => {
                if (this.goodsId === item.goodsId) {
                    num = item.goodsNum;
                }
            });
            return num;
        },
    },
    methods: {
        triggleService() {
            // this.serviceIsShow = !this.serviceIsShow;
        },
        showService() {
            //丢到body下面
            // console.log(this.$refs.service.$el);
            document.body.appendChild(this.$refs.service.$el);
            this.$refs.service.showService();
            
            
        },
        //匹配当前goodsItem
        getGoodsItemData() {
            for (let item of this.goodsArray) {
                if (parseInt(item.goodsid) === this.goodsId) {
                    this.goodsItemData = item;
                    // console.log("匹配当前goodsItem", this.goodsItemData)
                    break;
                }
            }
        },
        //小数点保留两位
        tofixed(price) {
            // console.log("这是价格", price);
            // console.log("这是价格", typeof price);
            if (price) {
                return parseFloat(price).toFixed(2);
            }
            return "";
            
        },
        //chooseGoods
        chooseGoods(goodsId) {
            let cartArray = this.cartArray;
            let callback = data => {
                if (data.status === 200 && data.data.returncode === 1) {
                    //请求成功
                    // setTimeout(() => {
                        this.initCart();
                    // }, 2000);
                } else if (data.status === 200 && data.data.returncode === -1) {
                    //登录信息失效，需要重新去登陆
                    MessageBox.alert('登录信息失效，请重新登录！').then(action => {
                        this.$router.push({"path": "/login", query: {page: "new"}});
                    });
                } else {
                    Toast({
                        duration: 1000,
                        message: "网络出错啦~",
                        iconClass: "aui-iconfont aui-icon-close"
                    });
                }
            }
            for (let item of cartArray) {
                if (item.goodsId === goodsId) {
                    //选中该类商品，另一类商品不被选中
                    // if (this.judgeType(item.goodsType)) {
                    //     //如果普通商品是第一次选中，则取消所有虚拟商品的选中状态
                    //     Toast({
                    //         duration: 800,
                    //         message: "选中了实体商品",
                    //         iconClass: "aui-iconfont aui-icon-correct"
                    //     });
                    //     for (let goods of cartArray) {
                    //         if (parseInt(goods.goodsType) === 1) {
                    //             goods.goodsChecked = false;
                    //         }
                    //     }
                    // }
                    item.goodsChecked = !item.goodsChecked;
                    updateCart(cartArray, callback);
                    // this.refreshPrice();
                    // this.refreshCheckAll();
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
        //匹配当前商品是否选中
        getGoodsItemChecked(goodsId) {
            // console.log(goodsId);
            for (let item of this.cartArray) {
                // console.log(item.goodsId);
                if (parseInt(item.goodsId) === goodsId) {
                    // if (item.goodsChecked === undefined) {
                    //     return true
                    // } else {
                    //     return item.goodsChecked
                    // }
                    // console.log("找到对应item商品", item.goodsChecked);
                    return item.goodsChecked;
                    break;
                }
            }
            return true;
        },
        //取消对应goodsType的选中状态
        selectGoodsByGoodsType(type) {
            let cartArray = this.cartArray;
            
            let callback = data => {
                if (data.status === 200 && data.data.returncode === 1) {
                    this.initCart();
                } else {
                    //请求失败
                }
            }
            updateCart(cartArray, callback);
        },
        //跳到详情页
        gotoDetail(goodscode) {
            this.$router.push({"path": `/detail/${goodscode}`});
        },
        //重新初始化购物车
        initCart() {
            //请求成功的回调
            let callback = cartList => {
                //更新vuex的购物车列表
                this[types.CART_ARRAY_CHANGE](cartList);
                //更新购物车全局数量
                this[types.CART_NUM_CHANGE](cartList.length);
                this.refreshPrice();
                this.refreshCheckAll();
            }
            //请求失败的回调
            let errorFn = err => {
                //更新vuex的购物车列表
                this[types.CART_ARRAY_CHANGE]([]);
                //更新购物车全局数量
                this[types.CART_NUM_CHANGE](0);
            }
            getCartData(callback, errorFn);
        },
        ...mapMutations("gwModules", [
            types.CART_ARRAY_CHANGE,
            types.CART_NUM_CHANGE
        ]),
    },
    components: {
        "add-reduce": AddOrReduce,
        "goods-service": GoodsService
    },
    filters: {

    },
    created() {
        this.getGoodsItemData();
    },
    watch: {
        goodsArray() {
            // console.log("goodsArray发生变化");
            this.getGoodsItemData();
            // console.log(this.goodsItemData);
            // console.log(this.goodsItemData.stockcount);
            this.gwGoodsItem.stockCount = this.goodsItemData.stockcount ? parseInt(this.goodsItemData.stockcount) : 0
            this.gwGoodsItem.goodsType = this.goodsItemData.goodstype;
        }
    }

    

}
</script>

<style scoped>
    .operations_list3 {
        display: none;
    }
    .goodsService {
    }
    .commodity_list .suggest h3 {
		/* width: 10.6rem; */
        
	}
    .left-guige p{
        background: white;
    }
    .left-guige {
        float: left;
    }
    .right-handle {
        float: right;
    }
</style>


