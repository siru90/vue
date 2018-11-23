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
            <div class="aui-title">工单信息</div>
        </header>
        <div style="padding-top:2.75rem">
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-header">车辆信息</li>  
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
                        <textarea readonly style="text-align:left;height:auto" v-model="orderDetail.faultdesc" class="aui-list-item-input wbxfod-item">
                        </textarea>
                    </div>
                </li>
            </ul>
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-header">服务选择</li>  
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务类型</div>
                        <div class="aui-list-item-input wbxfod-item">
                            {{serverType(orderDetail.maintenancetype) == "wb" ? '保养服务' : '维修服务'}}
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
                            {{orderDetail.maintenanceservicetype == 0 ? '上门' : '进站'}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务地点</div>
                        <div style="overflow:hidden" class="aui-list-item-input wbxfod-item">
                            {{ orderDetail.maintenanceservicetype == 1 ? orderDetail.maintenanceaddress : orderDetail.contactdetailaddress}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label" style="min-width:4.5rem;">预约服务日期</div>
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
                        <img v-for="(item, index) in maintenanceresultimgsList(orderDetail.maintenanceresultimgs)" :key="index" style="margin-bottom:0.5rem;" :src="item" alt="">
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
export default {
    props: {
        orderDetail: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    methods: {
        serverType(key) {
            if (key == 1 || key == 2 || key ==3 || key == 4 ) {
                return "wb"
            } else {
                return "wx"
            }
        },
        maintenanceresultimgsList(maintenanceresultimgs) {
            if (maintenanceresultimgs) {
                return maintenanceresultimgs.split(',')
            }
            return []
        },
        goBack() {
            this.$router.back()
        },
    },
}
</script>
<style>
    .wbxfod-item {
        text-align: right;
        color: #666666;
    }


</style>
