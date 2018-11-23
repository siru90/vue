<template>
    <div id="wbOrderDetail">
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
        <div style="padding-top:2.75rem;">
            <ul class="aui-list aui-form-list top_ul top_ul_wbd">
                <li class="aui-list-header">工单信息</li>  
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">预约单号</div>
                        <div style="text-align:left" class="aui-list-item-input wbxfod-item">
                           <span>{{orderDetail.reservationno}}</span> 
                           <span style="cursor: pointer" onclick="" v-if="orderDetail.reservationno" id="copyReOrder" class="copy-btn">复制</span>
                        </div>
                    </div>
                </li>
                <li v-if="orderDetail.maintenanceno" class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">维保单号</div>
                        <div style="text-align:left" class="aui-list-item-input wbxfod-item">
                            <span>{{orderDetail.maintenanceno}}</span>
                            <span style="cursor: pointer" onclick="" id="copyMainOrder" class="copy-btn">复制</span>
                        </div>
                    </div>
                </li>
            </ul>
            <ordermsg :orderDetail="orderDetail"></ordermsg>
        </div>
    </div>    
</template>
<script>
import ordermsg from './children/OrderMsg'
import Clipboard from 'clipboard';
import { Toast } from '../../utils/toast2';
import { getSearchParamFromApp } from '../../utils/getSearchParamFromApp.js'
export default {
    components: {
        ordermsg
    },
    methods: {
        goBack() {
            if (getSearchParamFromApp("apppush") == 1) {
                this.$router.replace({name:"wbxf"})
            } else {
                this.$router.back()
            }
            
        },
        setCopy() {
            const maintenanceno = this.orderDetail.maintenanceno
            const reservationno = this.orderDetail.reservationno
            
            const clmaOrder = new Clipboard('#copyMainOrder',{
                text: function() {
                    return maintenanceno
                }
            })
            const clreOrder = new Clipboard('#copyReOrder', {
                text: function() {
                    return reservationno
                }
            })
            clmaOrder.on('success',function(e) {
                Toast({
                    duration: 1000,
                    message: "复制成功",
                    iconClass: "aui-iconfont aui-icon-correct"
                });
            })
            clreOrder.on('success',function(e) {
                Toast({
                    duration: 1000,
                    message: "复制成功",
                    iconClass: "aui-iconfont aui-icon-correct"
                });
            })
        }
    },
    props: {
        orderDetail:{
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    watch: {
        orderDetail(v) {
            if (v.maintenanceno || v.reservationno) {
                this.setCopy()
            }
        }
    },
    mounted() {
        this.setCopy()
    },
}
</script>
<style>
    #wbOrderDetail .aui-list-item {
        border-bottom: 1px solid #ededed;
    }
    
    .top_ul_wbd {
        margin-bottom: 0.4rem;
    }
    #wbOrderDetail .copy-btn {
        float:right;
        background-color: #fff;
        border: 1px solid #bbb7b7;
        color: #5a5a5a;
        padding: 0px 8px;
        font-size: 0.6rem;
        border-radius: 4px;
    }
</style>
