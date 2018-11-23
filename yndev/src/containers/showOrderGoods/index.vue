<template>
    <div>
        <div>
            <!--头部-->
            <header class="aui-bar aui-bar-nav aui-bar-light">
                <div class="go-back" @click.stop="goBack">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <div class="aui-title">商品信息</div>
            </header>
            <div style="height:3.75rem;"></div>
            <div class="centent">
                <!--商品列表-->
                <div class="aui-content">
                    <ul class="aui-list aui-media-list commodity_list subtotal_list">
                        <li class="aui-list-item">
                            <div class="aui-list-item-inner">
                                商品清单
                                <div class="aui-pull-right text_c_gray">共{{totalNum}}件</div>
                            </div>
                        </li>
                        <!-- 每个商品item -->
                        <goods-item v-for="(item, index) in orderGoodsArray" 
                            :key="index"
                            :itemData="item"
                        >
                        </goods-item>
                    </ul>
                </div>
                <!--商品列表 end-->
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex";
import OrderGoodsItem from "../../components/OrderGoodsItem";
export default {
    props: {

    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters("gwModules", [
            "orderGoods"
        ]),
        orderGoodsArray () {
            return this.$route.params.orderGoodsArray;
        },
        totalNum() {
            let num = 0;
            this.orderGoodsArray.forEach(item => {
                num += item.num;
            });
            return num;
        }
    },
    methods: {
        goBack() {
            window.history.back();
        }
    },
    components: {
        "goods-item": OrderGoodsItem
    }

}
</script>

<style>

</style>


