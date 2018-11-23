<template>
    <div id="quotedPrice">
        <div v-if="showTab && orderDetail.spFxMaintenance.servicemethod == 0" class="quotedPriceType">
            <div @click="toShowPrimer" :class="currentProject == 'pr' ? 'actTypeItem': '' " class="quotedPriceTypeItem">
                <p>初步报价方案</p>
                <p>¥{{primaryPorjectAmount}}</p>
            </div>
            <div @click="toShowFormal" :class="currentProject == 'fo' ? 'actTypeItem': '' " class="quotedPriceTypeItem ">
                <p>正式报价方案</p>
                <p>¥{{formProjectAmount}}</p>
            </div>
        </div>
        <ul v-for="(item, index) in currentShowProject" :key="index" style="margin-bottom:0.4rem;" class="aui-list aui-form-list top_ul top_ul_wbd">
            <li class="aui-list-header">维修项目{{index+1}}</li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">项目编码</div>
                    <div class="aui-list-item-input wbxfod-item">
                       {{item.fxprojectcode}}
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">项目名称</div>
                    <div class="aui-list-item-input wbxfod-item">
                       {{item.fxprojectname}}
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">作业类型</div>
                    <div class="aui-list-item-input wbxfod-item">
                       {{item.worktypeDetail}}
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">维修类型</div>
                    <div class="aui-list-item-input wbxfod-item">
                       {{item.maintenancetypeDetail}}
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">工时单价</div>
                    <div class="aui-list-item-input wbxfod-item">
                       ¥{{item.mprice}}
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">派工工时</div>
                    <div class="aui-list-item-input wbxfod-item">
                       {{item.jobtimes}}
                    </div>
                </div>
            </li>
            <li class="aui-list-item">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label">故障描述</div>
                    <textarea style="text-align:left;height:auto;" readonly v-model="item.faultdescripe" class="aui-list-item-input wbxfod-item">
       
                    </textarea>
                </div>
            </li>
        </ul>
        <ul style="margin-bottom:0.4rem" class="aui-list aui-form-list top_ul top_ul_wbd">
            <li class="aui-list-header">维修参考用品</li>
            <li v-for="(item, index) in currentShowProjectParts" :key="index" style="border-bottom:1px solid #ededed" class="carMsg">
                <div class="carMsgImg">
                    <img :src="item.imgurl" alt="">
                </div>
                
                <div class="carMsgDetail">
                    <p style="color:#333333;font-weight:bold;">{{item.goodsname}}</p>
                    <p>商品分类：{{item.classname}}</p>
                    <p>品牌：{{item.brandname}}</p>
                    <p>单价：<span style="color:#EA3939">￥{{(item.realpaymoney/item.quantity).toFixed(2)}}</span>  <s>￥{{item.price}}</s> </p>
                    <p>折扣：{{item.discrate + '%'}}</p>
                    <p>数量：{{item.quantity}}</p>
                </div>
            </li> 
            <li v-for="(item, index) in currentOtherPrice" :key="index+'?'" style="border-bottom:1px solid #ededed" class="carMsg">
                <div class="carMsgImg">
                    <img :src="item.imgurl" alt="">
                </div>
                
                <div class="carMsgDetail">
                    <p style="color:#333333;font-weight:bold;">{{item.otherfeename}}</p>
                    <p>商品分类：</p>
                    <p>品牌：</p>
                    <p>单价：<span style="color:#EA3939">￥{{item.realpaymoney}}</span>  <s>￥{{item.shouldpaymoney}}</s> </p>
                    <p>折扣：{{item.shouldpaymoney ? ((item.shouldpaymoney - item.realpaymoney) * 100 / item.shouldpaymoney).toFixed(2) + '%' : '100%'}}</p>
                    <p>数量：</p>
                </div>
            </li> 
        </ul>
        <div class="amountQtPrice">
            报价金额: <span style="color:#EA3939;font-size:16px;font-weight:bold">￥{{currentProject == "pr" ? primaryPorjectAmount : formProjectAmount}}</span>
        </div>
    </div>    
</template>
<script>
export default {
    data() {
        return {
            currentProject: "pr"
        }
        
    },
    methods: {
        toShowPrimer() {
            this.currentProject = "pr"
        },
        toShowFormal() {
            this.currentProject = "fo"
        }
    },
    computed: {
        // 判断处于哪个方案
        showTab() {
            if (this.orderDetail.spFxMaintenance.servicemethod == 1) {
                if(this.orderDetail.spFxMaintenance.usestatus >= 4) {
                    this.currentProject = "fo"
                    return true
                }
                this.currentProject = "pr"
                return false
            } else {
                if (this.orderDetail.spFxMaintenance.usestatus >= 6) {
                    this.currentProject = "fo"
                    return true
                }
                this.currentProject = "pr"
                return false
            }
            
        },
        // 当前显示的维修项目
        currentShowProject() {
            const servicemethod = this.orderDetail.spFxMaintenance.servicemethod
            if (this.currentProject == "pr") {
                // 进站初级报价
                if (servicemethod == 1) {
                    return []
                } else {
                
                    return this.orderDetail.spFxMaintenanceAdvice
                }
            } else {
                // 正式报价
                return this.orderDetail.spFxMaintenanceItems
            }
            
        },
        // 当前显示的维修配件
        currentShowProjectParts() {
            const servicemethod = this.orderDetail.spFxMaintenance.servicemethod
            if (this.currentProject == "pr") {
                // 进站初级报价
                if (servicemethod == 1) {
                    return []
                } else {
                //let arr = this.orderDetail.spSuProducegoodsDtlbs.concat(this.orderDetail.otherfees)

                return this.orderDetail.spSuProducegoodsDtlbs
                }
            } else {
                // 正式报价
                //let arr = this.orderDetail.refergoodslist.concat(this.orderDetail.otherexpensesTab)

                return this.orderDetail.refergoodslist
            }
        },
        // 当前其他费用
        currentOtherPrice() {
            // 正式方案及以上
            if (this.currentProject == "fo") {
                return this.orderDetail.otherfees
            }
            return this.orderDetail.otherexpensesTab
        },
        // 正式方案总额统计
        formProjectAmount() {
            let result = 0
            this.orderDetail.refergoodslist.forEach(v => {
                result += v.realpaymoney
            })
            this.orderDetail.spFxMaintenanceItems.forEach(v => {
                result += v.realpaymoney
            })
            this.orderDetail.otherfees.forEach(v => {
                result += v.realpaymoney
            })
            return result.toFixed(2)
        },
        // 初步方案总额统计
        primaryPorjectAmount() {
            let result = 0
            this.orderDetail.spSuProducegoodsDtlbs.forEach(v => {
                result += v.realpaymoney
            })
            this.orderDetail.otherexpensesTab.forEach(v => {
                result += v.realpaymoney
            })
            this.orderDetail.spFxMaintenanceAdvice.forEach(v => {
                result += v.realpaymoney
            })
            return result.toFixed(2)
        }
    },
    props: {
        orderDetail: Object,
    },

}
</script>
<style>

    #quotedPrice .quotedPriceType {
        display: flex;
        padding: 0.4rem;
        justify-content: space-around
    }
    #quotedPrice .quotedPriceTypeItem {
        width: 45%;
        text-align: center;
        background: #ffffff;
        border-radius: 2px;
        line-height: initial;
        padding: 0.2rem 0;
        border: 1px solid #dddddd;
        transition: all 0.2s;
    }
    #quotedPrice .quotedPriceTypeItem p:last-child {
        font-size: 12px;
    }
    #quotedPrice .quotedPriceTypeItem p:first-child {
        color: #666666;
    }
    #quotedPrice .quotedPriceTypeItem.actTypeItem {
        background: #0f8de0;
    }
    #quotedPrice .quotedPriceTypeItem.actTypeItem p {
        color: #ffffff;
    }
    #quotedPrice .wbxfod-item {
        text-align: right;
        color: #666666;
    }
    #quotedPrice .amountQtPrice {
        height: 2.3rem;
        background: #ffffff;
        border-bottom: 1px solid #ededed;
        text-align: right;
        line-height: 2.3rem;
        padding-right: 0.4rem;
        font-size: 14px;
        color: #666666;
    }
</style>
