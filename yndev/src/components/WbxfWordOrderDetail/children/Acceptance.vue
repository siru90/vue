<template>
    <div>
        <ul style="margin-bottom:0.4rem;" class="aui-list aui-form-list top_ul top_ul_wbd">
            <li class="aui-list-header">质检人员信息</li>
            <li v-for="(item, index) in acceptancePerson" :key="index" class="carMsg">
                <div class="carMsgImg">
                    <img src="" alt="">
                </div>
                
                <div class="carMsgDetail">
                    <div style="color:#333333">
                        {{item.employeename}} 
                        <span style="background:#0f8de0;color:#ffffff;font-size:12px;border-radius:4px;padding:2px;" v-if="item.leadflag">负责人</span>
                        <div style="float:right">
                            <span style="color:red" v-if="status === 0">待质检</span> 
                            <span style="color:#666666" v-else>已回执</span>
                        </div>
                        
                    </div>
                    <p>性别：{{item.sex == 0 ? '男' : '女'}}</p>
                    <p>联系方式：{{item.telephone}}</p>
                    <p>派工时间：{{item.operationtime | time}}</p>
                </div>
            </li>  
        </ul>
        <ul style="margin-bottom:0.4rem;" class="aui-list aui-form-list top_ul top_ul_wbd">
            <li class="aui-list-header">质检回执单</li>
            <div v-if="status<1 || !acceptanceDetail.qualityresult">
                <img style="width:50%;height:50%; transform:translate(50%,0);" src="static/image/no_order.png" alt="">
                <p style="text-align:center;font-size:14px;color:#9a9a9a;">暂无回执单</p>
                <!-- <p style="text-align:center;padding-bottom:1rem;">等待客户确认签收</p> -->
            </div>
            <div v-else style="position:relative">
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">质检结果</div>
                        <div style="text-align:left" class="aui-list-item-input wbxfod-item">
                            <span style="color:green;font-weight:bold;">验收通过</span>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">检测说明</div>
                        <textarea v-model="acceptanceDetail.qualityresult"  style="color:#666666;text-align:left;height:auto;" readonly class="aui-list-item-input wbxfod-item">
                        </textarea>
                    </div>
                </li>
                <div v-if="status >=1 " class="yanshouIcon">
                    <div class="dashedLine">
                        <div class="solidLine">
                            <span>合格</span>
                        </div>
                    </div>
                </div>
            </div>
        </ul>
        <ul v-if="orderDetail.spFxMaintenance.usestatus != 9" class="aui-list aui-form-list top_ul top_ul_wbd">
            <li class="aui-list-header">客户验收单</li>
            <div v-if="orderDetail.spFxMaintenance.usestatus == 15 || orderDetail.spFxMaintenance.usestatus <=10">
                <img style="width:50%;height:50%; transform:translate(50%,0);" src="static/image/no_order.png" alt="">
                <p style="text-align:center;font-size:14px;color:#9a9a9a;">暂无验收单</p>
                <!-- <p style="text-align:center;padding-bottom:1rem;">等待客户确认签收</p> -->
            </div>
            <div style="position:relative" v-else>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div  class="aui-list-item-label">验收结果</div>
                        <div style="text-align:left;" class="aui-list-item-input wbxfod-item">
                          <span style="color:green;font-weight:bold">验收通过</span> 
                          <span v-if="status <=2" style="color:#666666">（等待客户付款）</span>
                          <span v-else>（客户已支付）</span>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务评价</div>
                        <div style="height:auto" class="aui-list-item-input wbxfod-item">
                            <div style="text-align:left;overflow:hidden">
                                <Rate style="margin-left:0" disabled allow-half v-model="rate"></Rate>
                                <div style="color:#666666">{{acceptanceDetail.sppraisement}}</div>
                            </div>
                        </div>
                    </div>
                </li>
                <div v-if="status > 2" class="hadSquare">
                    已结清
                </div>
            </div> 
        </ul>
    </div>    
</template>
<script>
import Rate from 'iview/src/components/rate';
export default {
    components: {
        Rate
    },
    props: {
        orderDetail: {
            type: Object
        }
    },
    filters: {
        time:function(inputTime) {      
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
        }
    },
    computed: {
        acceptancePerson() {
            return this.orderDetail.quality
        },
        acceptanceDetail() {
            return this.orderDetail.spFxMaintenance
        },
        rate() {
            return this.orderDetail.spFxMaintenance.appraise/2  || 0
        },
        status() {
            /**
             * 0: 待质检
             * 1: 待验收
             * 2: 待支付
             * 3: 已支付
             */
            const s = this.orderDetail.spFxMaintenance.usestatus
            if (s == 9) {
                return 0
            } else if (s == 10) {
                return 1
            } else if (s == 11) {
                return 2
            } else if (s > 11) {
                return 3
            }

        }
    },
}
</script>
<style>
    .carMsg {
        display: flex;
    }
    .carMsgDetail {
        flex: 1;
    }
    .checkimglist {
        display:flex;
        flex-wrap: wrap;
        justify-content: flex-start !important;
    }
    .checkimglist img {
        /* width: 33%; */
        padding: 0.4rem;
        /* height: 5rem; */
    }
    .yanshouIcon {
        position: absolute;
        right: 1rem;
        top: -1.5rem;
        width: 3.5rem;
        height: 3.5rem;
        line-height: 1.2rem;
        text-align: center;
        border: 2px solid green;
        color: green;
        border-radius: 2rem;
        font-weight: bold;
        transform: rotate(-30deg)
    }
    .yanshouIcon .dashedLine {
        width: 80%;
        height: 80%;
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 1.5rem;
        border: 1px dashed green;
    }
    .yanshouIcon .solidLine {
        width: 60%;
        height: 60%;
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 1.5rem;
        border: 1px solid green;

    }
    .yanshouIcon .solidLine span {
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 1.5rem;
        width: 2rem;
        height: 1.2rem;
        background: #ffffff;
    }
    .hadSquare {
        position: absolute;
        right: 1rem;
        top: -0.8rem;
        width: 3.5rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        border: 2px solid red;
        color: red;
        font-weight: bold;
        transform: rotate(-20deg);
        font-size: 16px;
    }
</style>
