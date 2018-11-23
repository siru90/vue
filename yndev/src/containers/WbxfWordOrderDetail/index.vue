<template>
    <div style="min-height:100%;background:#ededed">
        <wbDetail v-if="isWbOrder==1" :orderDetail="orderDetail"></wbDetail>
        <orderDetail v-else :orderDetail="orderDetail"></orderDetail>
        <!-- <wbxfod :orderDetail="orderDetail"></wbxfod> -->
        
    </div>
</template>
<script>
import wbxfod from '../../components/WbxfWordOrderDetail/index'
import orderDetail from '../../components/WbxfWordOrderDetail/orderDetail'
import wbDetail from '../../components/WbxfWordOrderDetail/wbDetail'
import {Toast} from "../../utils/toast2.js";
import {showLoading, hideLoading} from '../../utils/loading.js';
import { getOrderDetail,getOrderDetailByMid } from './http'
import { getSearchParamFromApp } from '../../utils/getSearchParamFromApp.js'
export default {
    computed: {
        isWbOrder() {
            return this.$route.query.isWbOrder
        }
    },
    data() {
        return {
            orderDetail: {}
        }
        
    },
    components: {
        wbxfod,
        orderDetail,
        wbDetail
    },
    methods: {
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
        const isApppush = getSearchParamFromApp("apppush")
        if (this.isWbOrder == 0 || isApppush == "1") {
            getOrderDetail(this.$route.query.maintenanceno || getSearchParamFromApp("maintenanceno"))
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
                this.orderDetail = res.data.data[0].info[0] || {}
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
                // let detailData = res.data.data[0].spFxMaintenance
                // detailData.faultdesc = detailData.remark
                // detailData.maintenanceservicetype = detailData.servicemethod
                // detailData.maintenanceaddress = "测试"
                // detailData.orderdate = detailData.orderdate ? this.fmtDate(detailData.orderdate) : ''
                // detailData.faultcode = detailData.faultno

                //this.orderDetail = detailData
                this.orderDetail = res.data.data[0]
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
    #wbDetail textarea {
        padding-top: 1.2rem;
    }
</style>
