<template>
    <div>
        <li class="aui-list-item">
            <div class="aui-media-list-item-inner">
                <div class="aui-list-item-media">
                    <img :src="itemData.img || 'static/image/demo1.png'">
                </div>
                <div class="aui-list-item-inner suggest">
                    <h3>{{itemData.title}}</h3>
                    <p>规格：{{itemData.goodsspec || "1个/件"}}</p>
                    <p>单价：￥{{singlePrice}}/{{itemData.goodsunit}}&nbsp;&nbsp;&nbsp;</p>
                </div>
                <div class="subtotal">
                    <span>￥{{itemPrice}}</span>
                    <p>{{itemData.num + itemData.goodsunit}}</p>
                </div>
            </div>
        </li>
        <div class="server_show select_hide" v-if="hasService">
            <div id="service_select" class="gift_list">
                <h4>[服务]</h4>
                <dl>
                    <dd v-for="(item1, index) in service" :key="index">
                        <font>{{item1.name}}</font>
                        <span>¥{{item1.price}}×{{itemData.num}}</span>
                    </dd>
                </dl>
            </div>
            <!--点击修改或选择服务-->
        </div>
        <div class="server_show select_hide" v-if="hasSudGoods">
            <div v-if="itemData.goodsType == 3" style="padding: 0.2rem 1.5rem 0 0.75rem;font-weight:bold">
                组合商品所包含商品
            </div>
            <div style="padding-top:0" id="service_select" class="gift_list">
                <dl>
                    <dd v-for="(item1, index) in subGoods" :key="index">
                        <font>{{item1.goodsName}}</font>
                        <!-- <span>¥{{item1.goodsPrice}} x {{item1.goodsNum*itemData.num}} </span> -->
                        <span>x {{item1.goodsNum*itemData.num}} </span>
                    </dd>
                </dl>
            </div>
            <!--点击修改或选择服务-->
        </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex";
export default {
    props: {
        itemData: {
            type: Object,
            default () {
                return null;
            }
        }
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters("gwModules", [
            "cartArray",
            "comCartArray"
        ]),
        //每个商品的单价
        singlePrice() {
            // console.log("---------1", this.itemData.price);
            return parseFloat(this.itemData.price).toFixed(2);
        },
        hasService() {
            //从vuex中的购物车找到对应的商品
            for (let item of this.cartArray) {
                if (parseInt(item.goodsType) === 3) {
                    return false;
                }
                if (parseInt(this.itemData.goodsid) === item.goodsId) {
                    if (item.serveId === "[]" || !item.serveId) {
                        return false;
                    } else {
                        return true;
                    }
                    break;
                }
            }
            return false;
        },
        hasSudGoods(){
            for (let item of this.comCartArray) {
                if (parseInt(item.goodsType) === 3) {
                    return true;
                }
                return false;
            }
            return false;
        },
        subGoods() {
            //从vuex中的购物车找到对应的商品
            for (let item of this.comCartArray) {
                return JSON.parse(item.serveId);
            }
            return [];
        },
        //每个商品的单价*数量
        itemPrice() {
            // console.log("---------2", this.singlePrice);
            return parseFloat(this.singlePrice) * this.itemData.num;
        },
        service() {
            //从vuex中的购物车找到对应的商品
            for (let item of this.cartArray) {
                if (parseInt(this.itemData.goodsid) === item.goodsId) {
                    if (this.itemData.service && this.itemData.service !== "[]") {
                        return JSON.parse(this.itemData.service);
                    } else {
                        return [];
                    }
                }
            }
            return [];
        }
    },
    methods: {

    },
    mounted() {
        
        console.log(this.itemData)
    },

}
</script>

<style>

</style>


