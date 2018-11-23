<template>
    <div>
        <popup v-model="show" position="bottom" style="width:100%;">
            <div id="get_ticket" class="purchase_service" style="display: block;overflow:scroll;max-height:70vh;" >
                <div class="description_tit" ref="testPop">
                    领券更优惠
                    <div class="close_page m_close_page" @touchstart="closeCover">
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </div>
                <ul class="coupon_list" v-if="yhData.length">
                    <!-- <li v-for="(item, index) in yhData" :key="index"  
                        :class="[item.state ? 'yh-useable' : 'yh-disable']"
                    > -->
                    <li v-for="(item, index) in yhData" :key="index"  
                    >
                        <div class="account_money" style="line-height:0;">
                            ¥
                            <span style="line-height:1.8rem;">{{item.voucheramount}}</span>
                            <span style="font-size: 12px;line-height: 20px;display: block;color: red;width: 100%;overflow: hidden;white-space: nowrap;">
                                可用：¥{{item.remainamount}}
                            </span>    
                        </div>
                        <dl>
                            <dt>{{item.vouchername}}</dt>
                            <dd v-if="item.rules">{{item.rules}}</dd>
                            <p>过期时间:{{item.enddate}}</p>
                            <!-- 服务商名字 -->
                            <p class="service-provider">{{item.servicename}}</p>
                        </dl>
                        
                        <em>使用</em>
                        <input type="checkbox" class="aui-radio yh-radio" @click.stop="choose(item, index)" ref="yhRadio" :data-id="item.voucherid">
                    </li>
                </ul>
                <div v-if="!yhData.length" style="margin-top:1rem;width:100%;text-align:center;">暂无优惠券</div>
                <div class="settle_accounts lijixiadan">
                    <div style="background:rgb(146, 0, 0) !important" id="close_coupon" class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @touchstart="chooseYHEvent">确定</div>
                </div>
            </div>
        </popup>
    </div>
</template>
<script>
import { Popup } from 'mint-ui';
import { Toast } from '../../utils/toast2';
import getYHDataFn from "../../utils/getYHData";
import {mapGetters, mapMutations} from "vuex";
import * as types from "../../store/modules/gw-modules/mutation-types";
import getProvider from "../../utils/getServiceProvider";
import api from "../../api";

export default {
    props: {
        text: {
            type: String,
            default: "使用"
        },
        used: {
            type: String,
            default: "已用"
        },
        freight: {
            type: Number,
            default: 0
        },
        providerListParams: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            show: false,
            flag: 0,
            yhData: [],
            mYHChoose: []
        }
    },
    computed: {
        ...mapGetters("xhModules", [
            "userInfo",
        ]),
        ...mapGetters("gwModules", [
            "orderGoods",
            "yhChoose",
            "totalPrice",
            "provider"
        ]),
        
    },
    methods: {
        showCover() {
            this.show = true;
            this.flag = 1;
            this.getYHData();
        },
        closeCover() {
            // setTimeout(() => {
                this.show = false;
                this.flag = 0;
            // }, 100);
            
        },
        getYHData() {
            if (this.yhData.length === 0) {
                let params = {
                    enterpriseid: window.api.enterpriseId,
                    mobile: this.userInfo.phone
                    // mobile: "13145425456"
                }
                let callback = data => {
                    // console.log(data);
                    //对请求回来的优惠券列表做筛选处理
                    this.yhData = this.handleData(data);
                    // let yhData = [
                    //     {
                    //         voucherid: "12345",
                    //         vouchername: "航洋国际店新人20元券",
                    //         vouchertype: 1,
                    //         voucheramount: "20",
                    //         enddate: "2017-10-10",
                    //         rules: "满100元使用"
                    //     },
                    //     {
                    //         voucherid: "17345",
                    //         vouchername: "航洋国际店新人50元券",
                    //         vouchertype: 1,
                    //         voucheramount: "50",
                    //         enddate: "2017-10-10",
                    //         rules: "满100元使用"
                    //     },
                    //     {
                    //         voucherid: "27345",
                    //         vouchername: "航洋国际店新人100元券",
                    //         vouchertype: 1,
                    //         voucheramount: "100",
                    //         enddate: "2017-7-10",
                    //         rules: "满100元使用"
                    //     },
                    // ];
                    // this.yhData = this.handleData(yhData);
                }
                getYHDataFn(params, callback);
            }
        },
        stopTouchMove(event) {
            //禁止滑动
            event.preventDefault();
        },
        //处理优惠券点击事件（将优惠券暂存到this.mYHChoose中）
        choose(item, index) {
            console.log(this.$refs.yhRadio[index].checked);
            if (item.state === false) {
                Toast({
                    duration: 1000,
                    message: "该优惠券不满足使用条件",
                    iconClass: "aui-iconfont aui-icon-warn"
                });
                this.$refs.yhRadio[index].checked = false;
                return;
            }
            //如果想使用终端优惠券判断是否只购买了一件终端商品
            if (!this.yhStrategies().duoshangpin(item) && this.$refs.yhRadio[index].checked) {
                this.errorToast("该优惠券只能适用于一种终端商品！");
                this.$refs.yhRadio[index].checked = false;
                return;
            }

            //判断是否可叠加
            if (!this.yhStrategies().diejia(item) && this.$refs.yhRadio[index].checked) {
                this.errorToast("与已选优惠券不可叠加使用");
                // console.log(222222);
                this.$refs.yhRadio[index].checked = false;
                return;
            }
            //判断同类型还是不同类型的叠加状态
            if (!this.yhStrategies().tonglei(item) && this.$refs.yhRadio[index].checked) {
                this.errorToast("与已选优惠券不可叠加使用");
                // console.log(1111111);
                this.$refs.yhRadio[index].checked = false;
                return;
            }
            //判断优惠券是否已经超过商品价格
            if (!this.yhStrategies().quandayujiage(item) && this.$refs.yhRadio[index].checked) {
                this.errorToast("优惠券额度已经大于订单价格！");
                this.$refs.yhRadio[index].checked = false;
                return;
            }
            //判断优惠券是否多个服务商混用，不能混用
            if (!this.yhStrategies().fuwushanghunyong(item) && this.$refs.yhRadio[index].checked) {
                this.errorToast("只能使用同一家服务商的优惠券！");
                this.$refs.yhRadio[index].checked = false;
                return;
            }
            
            if (this.$refs.yhRadio[index].checked === true) {
                // arr.push(item);
                // console.log(item);
                this.mYHChoose.push(item);
                // console.log(this.mYHChoose);
            } else {
                for (let i = 0; i < this.mYHChoose.length; i++) {
                    if (this.mYHChoose[i].voucherid === item.voucherid) {
                        this.mYHChoose.splice(i, 1);
                        
                        break;
                    }
                }
                // console.log(this.mYHChoose);

            }

            
            // console.log(item);
            // setTimeout(() => {

                // this[types.ORDER_YH_CHOOSE](item);
                // this.closeCover();
            // }, 20);
            
        },
        //点击确定按钮
        chooseYHEvent() {
        	setTimeout(() => {
        		//保存选择的优惠券
	            let arr = [];
	            this.mYHChoose.forEach((item, index) => {
	                arr[index] = item;
	            });
	            this[types.ORDER_YH_CHOOSE](arr);
	            
	            //关闭弹框
	            this.closeCover();
	            this.showProvider();
        	},300)
            
        },
        //运用策略模式进行优惠券逻辑判断
        yhStrategies() {
            return {
                //判断优惠券是否是可叠加使用的
                "diejia": (item) => {
                    if (!this.mYHChoose.length) {
                        return true;
                    }
                    if (item.stackusing === 1) {
                        return false;
                    } else if (item.stackusing === 0) {
                        return true;
                    }
                },
                "tonglei": (yh) => {
                    if (!this.mYHChoose.length) {
                        return true;
                    }
                    
                    //同类型可叠加
                    if (yh.stackingway === 0) {
                        let all_0 = true;
                        for (let item of this.mYHChoose) {
                            if (item.stackingway !== 0) {
                                all_0 = false;
                                break;
                            }
                        }
                        //如果都是0，需要去判定是否都是同类型
                        if (all_0) {
                            let all_equal = true;
                            for (let item of this.mYHChoose) {
                                if (item.vouchertype !== yh.vouchertype) {
                                    all_equal = false;
                                    break;
                                }
                            }
                            return all_equal;
                        } else {
                            return all_0;
                        }

                        
                    }
                    if (yh.stackingway === 1) {
                        //判断之前的是否都是1
                        let all_1 = true;
                        for (let item of this.mYHChoose) {
                            if (item.stackingway !== 1) {
                                all_1 = false;
                                break;
                            }
                        }
                        return all_1;
                    }
                },
                "quandayujiage": (yh) => {
                    if (!this.mYHChoose.length) {
                        return true;
                    }
                    let price = 0;
                    for (let item of this.mYHChoose) {
                        price += item.remainamount;
                    }
                    // console.log(price + yh.remainamount);
                    // console.log(this.totalPrice + this.freight);
                    
                    // if ((yh.vouchertype !== api.yhTypes.zhongduan) && ((price + yh.remainamount) > (this.totalPrice + this.freight))) {
                    if ((yh.vouchertype !== api.yhTypes.zhongduan) && ((price + yh.remainamount) > this.totalPrice)) {
                        //如果普通优惠券也不可以抵消运费（后面改动了）
                        return false;
                    } else if ((yh.vouchertype === api.yhTypes.zhongduan) && ((price + yh.remainamount) > this.totalPrice)) {
                        //如果终端优惠券不抵消运费
                        return false;
                    } else {
                        return true;
                    }
                },
                "zhongduanquanbuzu": () => {

                },
                "duoshangpin": (yh) => {
                    console.log(yh.vouchertype);
                    console.log(this.orderGoods);
                    
                    if (yh.vouchertype === api.yhTypes.zhongduan && this.orderGoods && this.orderGoods.length > 1) {
                        return false;
                    } else {
                        return true;
                    }
                },
                //不同的服务商不能混用
                "fuwushanghunyong": (yh) => {
                    let res = true;
                    if (this.mYHChoose.length) {
                        for (let item of this.mYHChoose) {
                            if (item.servicename != yh.servicename) {
                                res = false;
                                break;
                            }
                        }
                    }
                    return res;
                    
                }

            }
            
        },
        errorToast(msg) {
            Toast({
                duration: 3000,
                message: msg,
                iconClass: "aui-iconfont aui-icon-warn"
            });
        },
        //对数据进行处理
        handleData(data) {
            if (Array.isArray(data)) {
                let arr;
                //处理掉过期的优惠券
                arr = data.filter(item => {
                    return new Date(item.enddate) > new Date() && parseFloat(item.remainamount) > 0;
                });
                //处理掉被占用的优惠券
                arr = arr.filter(item => {
                    return !item.billno;
                });
                //把不包含商品id的优惠券置灰
                // arr = arr.map(item => {
                //     let state = false;
                //     // let exits = false;
                //     for (let item1 of this.orderGoods) {
                //         if (parseInt(item.goodsid) === parseInt(item1.goodsid) || !item.goodsid) {
                //             //当前确认采购单页面有对应优惠券的商品
                //             state = true;
                //             break;
                //         }
                //     }
                //     item.state = state;
                //     return item;
                // });
                //处理掉不包含商品ID的优惠券
                arr = arr.filter(item => {
                    for (let item1 of this.orderGoods) {
                        if (parseInt(item.goodsid) === parseInt(item1.goodsid) || !item.goodsid) {
                            //当前确认采购单页面有对应优惠券的商品
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
                //如果已经选择了服务商，则把终端优惠券中不是该服务商发放的券去掉
                if (this.provider && Object.keys(this.provider).length) {
                    arr = arr.filter(item => {
                        return item.servicename === this.provider.name || item.vouchertype !== 3;
                    });
                }
                // console.log("arrrrrrtttt", arr);
                return arr;
            }
        },
        //检测优惠券是否选中
        radioChecked() {
            this.yhChoose.forEach((item, index) => {
                this.mYHChoose[index] = item;
            });
            setTimeout(() => {
                // console.log(this.$refs.yhRadio);
                if (this.$refs.yhRadio && Array.isArray(this.$refs.yhRadio)) {
                    this.$refs.yhRadio.forEach((radio, index) => {
                        console.log("radio", radio)
                        let _id = parseInt(radio.getAttribute("data-id"));
                        for (let item of this.mYHChoose) {
                            if (parseInt(item.voucherid) === _id) {
                                //将当前CheckBox置为选中状态
                                radio.checked = true;
                            }
                        }
                    });
                } else if (this.$refs.yhRadio && !Array.isArray(this.$refs.yhRadio)) {

                    for (let item of this.mYHChoose) {
                        if (parseInt(item.voucherid) === parseInt(this.$refs.yhRadio.getAttribute("data-id"))) {
                            //将当前CheckBox置为选中状态
                            this.$refs.yhRadio.checked = true;
                        }
                    }
                }
            }, 50);
        },
        //终端优惠券带出服务商
        showProvider() {
            let callback = (data) => {
                // console.log("显示请求回来的服务商列表", data);
                //正确请求到服务商列表
                if (data.data.distanceList.length) {
                    //如果没有选择优惠券，或者该优惠券不是终端优惠券，则不进行提示
                    if (this.yhChoose && this.yhChoose.length && this.yhChoose[0].vouchertype === 3) {
                        //这里因为优惠券的规则是必须使用同一家服务商的优惠券，所以取优惠券的第一个进行判断即可
                        let exits = false;
                        for (let item of data.data.distanceList) {
                            if (item.name === this.yhChoose[0].servicename) {
                                //将符合条件（名称相同）的服务商保存到vuex中
                                this[types.CHOOSE_PROVIDER](item);
                                exits = true;
                                break;
                            }
                        }
                        //如果没有和优惠券匹配的服务商，则提示用户
                        if (!exits) {
                            this.errorToast("该优惠券的服务商信息缺失，请选用其他优惠券！")
                        }
                    } else {
                        console.log("没有满足判断条件");
                        console.log("this.yhChoose", this.yhChoose);
                        console.log("this.yhChoose.length", this.yhChoose.length);
                        console.log("this.yhChoose[0].vouchertype", this.yhChoose[0].vouchertype);
                    }
                } else {
                    //服务商列表没有数据！
                    console.log("服务商列表没有数据！");
                }
            }
            getProvider(this.providerListParams, callback);
        },
        ...mapMutations("gwModules", [
            types.ORDER_YH_CHOOSE,
            types.CHOOSE_PROVIDER
        ])
    },
    components: {
        "popup": Popup
    },
    created() {
        // console.log("yhTypes", api.yhTypes);
        // console.log("ChooseYH-----providerListParams", this.providerListParams);
    },
    watch: {
        show(newVal) {
            // console.log(this.show)
            if (this.show === true) {
                this.radioChecked();
            }
        },
        providerListParams(newVal) {
            // if (newVal.address) {
                // this.showProvider();
            // }
            // console.log("ChooseYH-----providerListParams", this.providerListParams);
        }
    }

}
</script>

<style>
.aui-toast {
    z-index: 9999;
}
.yh-radio {
    position: absolute;
    right: 1rem;
    top: 1rem;
}
.yh-useable {
    background: #fff url("../../lib/image/coupon_bj.png") no-repeat right 2.8rem !important;
}
.yh-disable {
    background: #fff url("../../lib/image/coupon_bj2.png") no-repeat right 2.8rem !important;
}
.m_close_page {
    /* padding: 0.4rem 0.6rem; */
    padding: 0;
    cursor: pointer;
    margin-left: unset; 
    margin-top: unset; 
    position: absolute;
    top: 0;
    left: unset;
    right: 1rem;
    top: 8px;
}
.description_tit {
    text-align: left;
    padding: 0 1rem;
}
.service-provider {
    font-size: 12px;
}
</style>


