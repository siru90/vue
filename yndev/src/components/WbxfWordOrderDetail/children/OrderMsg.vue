<template>
    <div id="ordermsg">
        <ul class="aui-list aui-form-list top_ul top_ul_wbd">
            <li class="aui-list-header">车辆信息</li>
            <li class="carMsg">
                <div class="carMsgImg">
                    <img :src="orderDetail.maintenancesimgurl" alt="">
                </div>
                
                <div class="carMsgDetail">
                    <p>车牌号码：{{orderDetail.carno}}</p>
                    <p>里程：{{orderDetail.cycle}}</p>
                    <p>上次保养里程：{{orderDetail.servicecycle}}</p>
                    <p>上次保养日期：{{orderDetail.lastmandedate/1000 | time}}</p>
                </div>
            </li>  
        </ul>
        <ul class="aui-list aui-form-list top_ul top_ul_wbd">
            <li class="aui-list-header">服务信息</li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">服务方式</div>
                    <div class="aui-list-item-input wbxfod-item">
                        {{orderDetail.maintenanceservicetype === 0  || orderDetail.servicemethod === 0 ? '上门' : '进站'}}
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">维保类型</div>
                    <div class="aui-list-item-input wbxfod-item">
                        {{serverType(orderDetail.maintenancetype,orderDetail.billtype)}}
                    </div>
                </div>
            </li>  
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">预约服务日期</div>
                    <div class="aui-list-item-input wbxfod-item">
                        {{orderDetail.orderdate ? this.fmtDate(orderDetail.orderdate) : ''}}
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">提醒编号  </div>
                    <div style="color:#0062cc" class="aui-list-item-input wbxfod-item">
                        <span @click="gotoRemindDetail">{{orderDetail.remindcode || orderDetail.faultno}}</span>  
                        <span><i style="transform:rotate(180deg);display:inline-block;color:#666666" class="njfont nj-fanhui"></i></span>
                    </div>
                </div>
            </li>
            <li v-if="orderDetail.billno || orderDetail.sourcenumber" class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">订单编号  </div>
                    <div style="color:#0062cc" class="aui-list-item-input wbxfod-item">
                        <span @click="gotoOrderDetail">{{orderDetail.billno || orderDetail.sourcenumber}}</span>  
                        <span><i style="transform:rotate(180deg);display:inline-block;color:#666666" class="njfont nj-fanhui"></i></span>
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">故障描述</div>
                    <textarea style="text-align:left;height:auto" readonly :value="orderDetail.faultdesc || orderDetail.remark" name="" id="" ></textarea>
                </div>
            </li>
        </ul>
        <ul class="aui-list aui-form-list top_ul top_ul_wbd">
            <li class="aui-list-header">联系方式</li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">联系人</div>
                    <div class="aui-list-item-input wbxfod-item">
                        {{orderDetail.vipname || orderDetail.contact}}
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">手机号码</div>
                    <div class="aui-list-item-input wbxfod-item">
                        {{orderDetail.telepone || orderDetail.contactphone}}
                    </div>
                </div>
            </li>  
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">服务地址</div>
                    <!-- <div class="aui-list-item-input wbxfod-item">
                        {{orderDetail.vipaddress}}
                    </div> -->
                    <textarea style="text-align:left;height:auto"  readonly v-model="getRealAddress">
                    </textarea>
                    <div v-if="orderDetail.maintenanceservicetype === 1  || orderDetail.servicemethod === 1" @click="doNavigation" class="navigationBtn">
                        <i class="njfont nj-cheliang"></i>
                        <div style="color:#0f8de0">导航</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { Toast } from '../../../utils/toast2';
export default {
    props: {
        orderDetail:{
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    computed: {
        getRealAddress() {
            // if (this.orderDetail.serviceaddress) {
            //     return this.orderDetail.serviceaddress
            // }
            // if (this.orderDetail.contactdetailaddress) {
            //     return this.orderDetail.contactdetailaddress
            // }
            if (this.orderDetail.maintenanceaddress) {
                return this.orderDetail.maintenanceaddress
            }
            return this.orderDetail.serviceaddress
        },
    },
    methods: {
        doNavigation() {
            const lat = this.orderDetail.positionlat ? this.orderDetail.positionlat : null
            const lng = this.orderDetail.positionlng ? this.orderDetail.positionlng : null
            if (lat && lng) {
                cordova.exec(
                    function(data) {
                        console.log("Success");
                    }, 
                    function(e) {
                        console.log("Error: "+e);
                    },
                    "MotionPlugin", 
                    "navigation", 
                    ["翌能象谱", null,null, lat, lng, this.getRealAddress]
                );
            } else {
                Toast({
                    message: "位置获取失败，无法导航",
                    iconClass: "aui-iconfont aui-icon-close",
                    duration: 1000
                });
            }
            // 调用高德地图进行导航
            //要传给app的参数，数组里的六个参数，分别是：app名称(这个参数可不填，app写死了)，起点纬度，起点经度，终点纬度，终点经度，目的地名称；
            
        },
        serverType(key,billtype) {
            if (billtype == 5) {
                return "商品包服务单"
            } else if (key == 1 || key == 2 || key ==3 || key == 4 ) {
                return "保养服务"
            } else {
                return "维修服务"
            }
        },
        fmtDate(inputTime){
            if (!inputTime) {
                return ""
            }
            if (typeof inputTime == "string") {
                return inputTime
            }
            var date = new Date(inputTime);
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? ('0' + m) : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;  
            second = second < 10 ? ('0' + second) : second; 
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
        },
        gotoRemindDetail() {
            this.$router.push({name:"wbNoticeDetail",query:{"remindcode": this.orderDetail.remindcode || this.orderDetail.faultno,"hidebtn":1}})
        },
        gotoOrderDetail() {
            const orderN = this.orderDetail.billno ? this.orderDetail.billno : this.orderDetail.sourcenumber
            this.$router.push({path:"/main/orderDetails",query: {"shopId":orderN,"orderNo":orderN}})
        }
    },
    filters: {
        time:function(inputTime) {   
            if (isNaN(Number(inputTime)) || inputTime <= 0) {
                return ""
            }
            var date = new Date(inputTime);
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? ('0' + m) : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;  
            second = second < 10 ? ('0' + second) : second; 
            //return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
            return y + '-' + m + '-' + d

        }
    }
}
</script>
<style>
    .navigationBtn {
        width: 4.4rem;
        height: 2.4rem;
        text-align: center;
        line-height: initial;
        padding: 0.2rem;
        border: 1px solid #ededed;
        color: #999999;
        margin-right: 0.2rem;
    }
    .carMsg {
        padding: 0.4rem;
        overflow:hidden;
        display: flex;
    }
    .carMsg .carMsgImg {
        float: left;
        width: 4rem;
        height: 4rem;
        background: #ededed;
    }
    .carMsg .carMsgImg img {
        width: 100%;
        height: 100%;
    }
    .carMsg .carMsgDetail {
        float: left;
        margin-left: 0.4rem;
        flex: 1;
    }
    .wbxfod-item {
        text-align: right
    }
    #ordermsg textarea {
        text-align: right;
        padding-right: 0.4rem;
        /* padding-top: 1rem; */
    }
</style>
