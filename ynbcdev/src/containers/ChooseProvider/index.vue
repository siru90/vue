<template>
    <div>
        <div class="vue_app" style="position: absolute;width: 100%">
            <!--头部-->
            <header class="aui-bar aui-bar-nav aui-bar-light">
                <div class="go-back" @click.stop="goBack">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <div class="aui-title">选择服务商</div>
            </header>
            <div style="height: 3rem;"></div>
            <!--头部-->
            <div class="aui-content top_div">
                <ul class="aui-list aui-media-list select_s_provider">
                    <li class="aui-list-item" 
                        v-for="(item, index) in providerList" 
                        :key="index">
                        <!--选择服务商信息，显示请选择-->
                        <div class="aui-media-list-item-inner">
                            <div class="good_check">
                                <label>
                                    <input class="aui-radio" type="checkbox" @click.stop="changeIndex($event, index)" :checked="activeIndex === index">
                                </label>
                            </div>
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-text">
                                    <div class="aui-list-item-title">
                                        <strong>服务商：{{item.name}}</strong>
                                        <span class="aui-font-size-14 text_c_gray"></span>
                                    </div>
                                </div>
                                <p>地址：{{item.address}}</p>
                                <p>联系人：{{item.contactor}}</p>
                                <p>联系电话：{{item.telepone}}</p>
                                <div class="half-stars-example">
                                    服务评价：
                                    <div class="rating-group">

                                        <label class="rating__label" v-for="(item, index) in allStar('4.5')" :key="index">
                                            <i class="rating__icon rating__icon--star fa fa-star"></i>
                                        </label>

                                        <label class="rating__label rating__label--half" v-if="halfStar('4.5')">
                                            <i class="rating__icon rating__icon--star fa fa-star-half"></i>
                                        </label>
                                        <label class="rating__label" for="rating2-50" v-if="halfStar('4.5')">
                                            <i class="rating__icon rating__icon--star fa fa-star" style="color: #ddd;"></i>
                                        </label>
                                    </div>
                                    {{'4.5'}}分
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div style="height:4rem;"></div>
            <div class="settle_accounts lijixiadan" v-if="providerList.length">
                <div style="background:rgb(146, 0, 0) !important" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click.stop="confirm">确认</div>
            </div>
        </div>
        <!-- 缺省图 -->
        <div style="width:100vw;height: 3rem;" v-if="!providerList.length"></div>
        <div class="no_data" v-if="!providerList.length">
			<img src="static/image/no_data.png">
			<p>暂无符合条件的服务商</p>
		</div>
    </div>
</template>
<script>
import getProvider from "../../utils/getServiceProvider";
import {mapMutations, mapGetters} from "vuex";
import * as types from "../../store/modules/gw-modules/mutation-types";
import {showLoading, hideLoading} from "../../utils/loading";
import {Toast} from "../../utils/toast2";
export default {
    props: {
        
    },
    data() {
        return {
            providerList: [],
            activeIndex: -1
        }
    },
    computed: {
        ...mapGetters("gwModules", [
            "yhChoose",
            "provider"
        ]),
    },
    methods: {
        goBack() {
            window.history.back();
        },
        //getData
        getData() {
            if (this.$route.params.p) {
                showLoading();
                // console.log("---p---", this.$route.params.p);
                let callback = data => {
                    console.log("请求服务商的数据", data);
                    if (!data.data.distanceList.length) {
                        Toast({
                            duration: 2000,
                            message: "请选择卖家发货方式",
                            iconClass: "aui-iconfont aui-icon-warn"
                        });
                    }
                    if (data.data && data.data.distanceList) {
                        this.providerList = data.data.distanceList;
                        hideLoading();
                    } else {
                        hideLoading();
                        
                    }
                } 
                getProvider(this.$route.params.p, callback);
            }
            
            // this.providerList.push(
            //     {
            //         name: "香蕉幼儿园",
            //         address: "广西省南宁市香蕉幼儿园",
            //         telephone: "15779711234",
            //         star: "4",
            //         contactor: "小魔女",
            //         serviceid: "456",
            //         serviceno: "565"
            //     },
            //     {
            //         name: "香蕉幼儿园2",
            //         address: "广西省南宁市香蕉幼儿园2",
            //         telephone: "15779711235",
            //         star: "4.5",
            //         contactor: "小魔女",
            //         serviceid: "123",
            //         serviceno: "678"
            //     },
            // )
        },
        allStar(str) {
            return new Array(parseInt(str.split(".")[0]));
        },
        halfStar(str) {
            if (str.split(".").length > 1) {
                return str.split(".")[1];
            }
        },
        changeIndex (event, index) {
            if (index === this.activeIndex) {
                console.log(this.activeIndex);
                this.activeIndex = -1;
            } else {
                if (!this.equalName(index)) {
                    //与已选择的终端优惠券优惠券冲突
                    this.errorToast("该服务商与已选择的优惠券所带服务商信息不符！");
                    event.target.checked = false;
                    return;
                }
                // console.log(this.activeIndex);
                this.activeIndex = index;
            }
            
        },
        //如果已经选择了终端优惠券，则判断要选择的服务商名称与优惠券的服务商名称是否对应
        equalName(index) {
            let res = true;
            // console.log("进入判断");
            // console.log(this.yhChoose)
            // console.log(this.yhChoose.length)
            // console.log(this.yhChoose.vouchertype)
            if (this.yhChoose && this.yhChoose.length && parseInt(this.yhChoose[0].vouchertype) === 3) {
                // console.log("进入下一步判断");
                let name1 = this.yhChoose[0].servicename;
                let name2 = this.providerList[index].name;
                // console.log(name1, name2);
                if (name1 != name2) {
                    res = false;
                }
            }
            return res;
        },
        //确认选择的服务商
        confirm() {
            if (this.providerList.length && this.activeIndex !== -1) {
                this[types.CHOOSE_PROVIDER](this.providerList[this.activeIndex]);
            } else {
                this[types.CHOOSE_PROVIDER]({});
            }
            window.history.back();
        },
        errorToast(msg) {
            Toast({
                duration: 3000,
                message: msg,
                iconClass: "aui-iconfont aui-icon-warn"
            });
        },
        ...mapMutations("gwModules", [
            types.CHOOSE_PROVIDER
        ]),
        
    },
    created() {
        this.getData();
    },
    beforeDestory() {
        hideLoading();
    },
    watch: {
        providerList(newVal) {
            if (newVal && newVal.length && this.provider) {
                let index = 0;
                for (let item of newVal) {
                    if (item.name === this.provider.name) {
                        this.activeIndex = index;
                        break;
                    }
                    index++;
                }
            }
        }
    }

}
</script>

<style scoped>
    .settle_accounts {
        z-index: 999;
    }
</style>


