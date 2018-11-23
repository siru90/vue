<template>
    
    <div>
        <header style="display:block;" class="aui-bar aui-bar-nav aui-bar-light">
            <!-- <router-link :to="{path:'/main/install', query:{serviceNo:serviceParam}}"> -->
                <div class="go-back" @click="goBack">
                <i></i>
                <i></i>
                <i></i>
                </div>
            <!-- </router-link> -->
            <div class="aui-title">工单详情</div>
        </header>
        <div style="padding-top:2.75rem">
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-header">服务选择</li>  
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">车牌号码</div>
                        <div class="aui-list-item-input wbxfod-item">
                            {{orderDetail.carno}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">终端编号</div>
                        <div class="aui-list-item-input wbxfod-item">
                            {{orderDetail.terminalnum}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">发动机编号</div>
                        <div class="aui-list-item-input wbxfod-item">
                            {{orderDetail.engineno}}
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-header">故障现象</li>  
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">故障代码</div>
                        <div class="aui-list-item-input wbxfod-item">
                           {{orderDetail.faultcode}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">故障描述</div>
                        <div class="aui-list-item-input wbxfod-item">
                            {{orderDetail.faultdesc}}
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-header">服务选择</li>  
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务类型</div>
                        <div class="aui-list-item-input wbxfod-item">
                            {{orderDetail.maintenancetype == 1 ? '维保服务' : '维修服务'}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务商</div>
                        <div class="aui-list-item-input wbxfod-item">
                            {{orderDetail.servicename}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务方式</div>
                        <div class="aui-list-item-input wbxfod-item">
                            {{orderDetail.maintenanceservicetype == 0 ? '上门服务' : '到店服务'}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务地点</div>
                        <div class="aui-list-item-input wbxfod-item">
                            {{orderDetail.maintenanceaddress}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">预约服务日期</div>
                        <div class="aui-list-item-input wbxfod-item">
                            {{orderDetail.orderdate}}
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-header">服务回执</li>  
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">维保结果</div>
                        <div class="aui-list-item-input wbxfod-item">
                            {{orderDetail.maintenanceresult}}
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-header">服务说明</li>  
                <li  class="aui-list-item">
                    <div style="color:#666666; padding-top:0.75rem;padding-bottom:0.75rem;line-height: initial;">
                       {{orderDetail.maintenancedesc}}
                    </div>
                </li>
            </ul>
            <ul v-if="orderDetail.maintenanceresultimgs" style="border-top: 1px solid #eaeaea;" class="aui-list aui-form-list top_ul">
                <li style="padding: 0.4rem 0.75rem;">
                    <div style="padding-bottom:0.4rem;">维保效果图</div>
                    <div>
                        <img v-for="(item, index) in maintenanceresultimgsList" :key="index" style="margin-bottom:0.5rem;" :src="item" alt="">
                    </div>
                </li>
            </ul>
            <ul v-if="orderDetail.carimage" style="border-top: 1px solid #eaeaea;" class="aui-list aui-form-list top_ul">
                <li style="padding: 0.4rem 0.75rem;">
                    <div style="padding-bottom:0.4rem;">车辆照片</div>
                    <div>
                        <img :src="orderDetail.carimage" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>
<script>

import {showLoading, hideLoading} from '../../utils/loading.js';
import {Toast} from "../../utils/toast2.js";
import { getOrderDetail,getOrderDetailByMid } from './http'
export default {
    
    data() {
        return {
            orderDetail: {

            }
        }
    },
    computed: {
        maintenanceresultimgsList() {
            if (this.orderDetail.maintenanceresultimgs) {
                return this.orderDetail.maintenanceresultimgs.split(',')
            }
            return []
        }
    },
    methods: {

        goBack() {
            this.$router.back()
        },
        fmtDate(obj){
            var date =  new Date(obj);
            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        }
    },
    created() {
        showLoading()
        if (this.$route.query.maintenanceno) {
            getOrderDetail(this.$route.query.maintenanceno)
            .then(res => {
                if (res.data.returncode == 0) {
                    Toast({
                        message: "获取订单详情失败!",
                        duration: 2000,
                        iconClass:"aui-iconfont aui-icon-close"
                    });
                    hideLoading()
                    return 
                }
                this.orderDetail = res.data.data[0].info[0]
                hideLoading()
            }).catch(e => {
                Toast({
                    message: "获取订单详情失败!",
                    duration: 2000,
                    iconClass:"aui-iconfont aui-icon-close"
                });
                hideLoading()
            })
        } else {
            getOrderDetailByMid(this.$route.query.maintenanceid)
            .then(res => {
                if (res.data.returncode == 0) {
                    Toast({
                        message: "获取订单详情失败!",
                        duration: 2000,
                        iconClass:"aui-iconfont aui-icon-close"
                    });
                    hideLoading()
                    return 
                }
                let detailData = res.data.data[0].spFxMaintenance
                detailData.faultdesc = detailData.remark
                detailData.maintenanceservicetype = detailData.servicemethod
                detailData.maintenanceaddress = "测试"
                detailData.orderdate = detailData.orderdate ? this.fmtDate(detailData.orderdate) : ''
                detailData.faultcode = detailData.faultno
                /**  缺少字段：
                 *  engineno 发动机编号
                    terminalnum 终端编号
                    faultcode 故障代码
                    maintenanceaddress 服务地点
                    maintenanceresult 维保结果
                    maintenancedesc 服务说明
                    maintenanceresultimgsList 维保效果图
                    carimage 车辆照片
                 */
                this.orderDetail = detailData
                
                console.log(res.data.data[0])
                hideLoading()
            })
            .catch(e => {
                console.log(e)
                Toast({
                    message: "获取订单详情失败!",
                    duration: 2000,
                    iconClass:"aui-iconfont aui-icon-close"
                });
                hideLoading()
            })
        }

        
    },
}
</script>
<style>
    .wbxfod-item {
        text-align: right;
        color: #666666;
    }


</style>
