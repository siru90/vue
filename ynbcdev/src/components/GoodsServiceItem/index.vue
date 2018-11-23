<template>
    <div>
        <div class="value_items">
            <div class="value_items_tit">
                <span>
                    <i class="icon njfont nj-zhuangpei"></i> {{serviceItemData.category}}
                </span>
                <a v-if="false">服务介绍
                    <i class="icon njfont nj-bangzhu"></i>
                </a>
            </div>
            <div class="standard_con">
                <li 
                    :class="{'active' : checkChosenState(item.id, index)}" 
                    v-for="(item, index) in serviceItemData.list" 
                    :key="index"
                    @click="changeActiveIndex(index, serviceItemData.category, item.id, item)"
                >
                    <span>{{item.name}}</span>
                    <span class="prices_text">¥{{item.serveprice}}</span>
                    <i class="icon njfont nj-xuanzhong"></i>
                </li>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapMutations} from "vuex";
import * as types from "../../store/modules/gw-modules/mutation-types";
export default {
    props: {
        serviceItemData : {
            type : Object,
            default: function () {
                //mock假数据
                return null;
            }
        },
        chooseId: {
            type: String,
            default: ""
        },
        goodsId: {
            type: Number,
            default: 13
        },
        pageType: {
            type: String,
            default: "cart"
        }
    },
    data() {
        return {
            activeIndex: -1,
            currentChooseId: "",
            serveId: ""
        }
    },
    computed: {
        ...mapGetters("gwModules", [
            'serviceArray',
            "cartArray",
            "detailsGoodsNum"
        ]),

    },
    methods: {
        ...mapMutations("gwModules", [
            types.SERVICE_ARRAY
        ]),
        changeActiveIndex (index, category, serviceId, serviceItem) {
            //把vuex中的serviceArray赋给一个临时变量
            let temp = this.serviceArray;
            if (this.activeIndex === index) {
                //点击自身取消选中服务
                this.activeIndex = -1;
                //从vuex中删除掉该服务
                temp.forEach((item, index) => {
                    if (item.category === category) {
                        temp.splice(index, 1);
                    }
                });
                this[types.SERVICE_ARRAY](temp);
                this.getServeIdFromServiceArray();
                return false;
            }

            let exist = false;
            temp.forEach((item, index) => {
                // 遍历临时服务数组，确定是否有该条服务分类
                // 如果有，替换为选中的服务
                if (item.category === category) {
                    item.id = serviceId;
                    item.name = serviceItem.name;
                    item.serveno = serviceItem.serveno;
                    item.price = serviceItem.serveprice;
                    item.type = serviceItem.servetype;
                    exist = true;
                }
            });
            // temp.push(serviceId);
            //遍历完没有该条服务分类，则新建该条服务分类
            if (!exist) {
                temp.push({
                    category,
                    id: serviceId,
                    name: serviceItem.name,
                    serveno: serviceItem.serveno,
                    price: serviceItem.serveprice,
                    type : serviceItem.servetype
                });
            }
            this.activeIndex = index;
            //最后提交该服务组到vuex中，便于父组件调用
            this[types.SERVICE_ARRAY](temp);
            this.getServeIdFromServiceArray();
        },
        //检查服务选中状态
        checkChosenState(currentServeId, index) {
            console.log(this.serveId);
            if (this.serveId.indexOf(currentServeId) === -1) {
                return false;
            }
            this.activeIndex = index;
            return true;
        },
        getServeIdFromCartArray() {
            for (let item of this.cartArray) {
                if (item.goodsId === this.goodsId) {
                    // this.serveId = item.serveId.split(",");
                    let serveId = JSON.parse(item.serveId);
                    this[types.SERVICE_ARRAY](serveId);
                    this.getServeIdFromServiceArray();
                    // this.serveId = this.getServeIdFromServiceArray();
                    //找到合适的就结束循环
                    break;
                }
            }
        },
        getServeIdFromServiceArray() {
            this.serveId = this.serviceArray.map(item => {
                return item.id;
            }).join(",");
            // console.log(this.serveId);
        },
        clearServiceArray() {
            this[types.SERVICE_ARRAY]([]);
        }
    },
    watch: {
        chooseId () {
            this.currentChooseId = this.chooseId;
        },
        cartArray () {
            // this.getServeIdFromCartArray();
        }
    },
    created() {
        //拿到当前goodsId的serveId
        if (this.pageType === "cart") {
            this.getServeIdFromCartArray();
        }
        
    }


}
</script>

<style>

</style>


