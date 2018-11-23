<template>
    <div>
        <div v-if="orderDetail.spFxMaintenance.servicemethod===1">
            <ul v-if="checkPerson.length > 0" style="margin-bottom:0.4rem;" class="aui-list aui-form-list top_ul top_ul_wbd">
                <li class="aui-list-header">检测人员信息</li>
                <li v-for="(item, index) in checkPerson" :key="index" class="carMsg">
                    <div class="carMsgImg">
                        <img src="" alt="">
                    </div>
                    <div class="carMsgDetail">
                        <div>
                            {{item.employeename}}
                            <span style="background:#0f8de0;color:#ffffff;font-size:12px;border-radius:4px;padding:2px;" v-if="item.leadflag">负责人</span>
                            <div style="float:right">
                                <span v-if="!testDetail.checkresult" style="color:red">待检测</span> 
                                <span style="color:#999999" v-else>已检测</span>
                            </div>
                        </div>
                        <p>性别：{{item.sex == 0 ? '男' : '女'}}</p>
                        <p>联系方式：{{item.telephone}}</p>
                        <p>派工时间：{{item.operationtime | time}}</p>
                    </div>
                </li>  
            </ul>
            <ul style="margin-bottom:0.4rem;" class="aui-list aui-form-list top_ul top_ul_wbd">
                <li class="aui-list-header">检测报告</li>
                <div v-if="!testDetail.checkresult">
                    <img style="width:50%;height:50%; transform:translate(50%,0);" src="static/image/no_order.png" alt="">
                    <p style="text-align:center;padding-bottom:1rem;">暂无数据</p>
                </div>
                <div v-else >
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">检测说明</div>
                            <textarea style="text-align:left;height:auto" readonly v-model="testDetail.checkresult" class="aui-list-item-input wbxfod-item">
                            </textarea>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">检测照片&nbsp;&nbsp;<span>({{imgList(testDetail.checkresultimgurl).length}}张)</span> </div>
                        </div>
                    </li>
                    <li class="aui-list-item checkimglist">
                        <div v-for="(item, index) in imgList(testDetail.checkresultimgurl)" :key="index" class="imgBox">
                            <img :src="item" alt="">
                        </div>
                        
                    </li>
                </div>
            </ul>

            <ul v-if="repairPerson.length > 0" style="margin-bottom:0.4rem;" class="aui-list aui-form-list top_ul top_ul_wbd">
                <li class="aui-list-header">维修人员信息</li>
                <li v-for="(item, index) in testPerson" :key="index" class="carMsg">
                    <div class="carMsgImg">
                        <img src="" alt="">
                    </div>
                    
                    <div class="carMsgDetail">
                        <div>
                            {{item.employeename}}
                            <span style="background:#0f8de0;color:#ffffff;font-size:12px;border-radius:4px;padding:2px;" v-if="item.leadflag">负责人</span>
                            <div style="float:right">
                                <span :style="{'color': status == 4 ? '#666666': 'red'}">{{statusWord(status,orderDetail.spFxMaintenance.servicemethod )}}</span> 
                            </div>
                        </div>
                        <p>性别：{{item.sex == 0 ? '男' : '女'}}</p>
                        <p>联系方式：{{item.telephone}}</p>
                        <p>派工时间：{{item.operationtime | time}}</p>
                    </div>
                </li>  
            </ul>
            <ul v-if="testPerson.length > 0 && (orderDetail.spFxMaintenance.usestatus < 2 || orderDetail.spFxMaintenance.usestatus >5 )" style="margin-bottom:0.4rem;" class="aui-list aui-form-list top_ul top_ul_wbd">
                <li class="aui-list-header">维修回执单</li>
                <div v-if="status<4 || !testDetail.repairresult">
                    <img style="width:50%;height:50%; transform:translate(50%,0);" src="static/image/no_order.png" alt="">
                    <p style="text-align:center;font-size:14px;color:#9a9a9a;">暂无回执单</p>
                    <!-- <p style="text-align:center;padding-bottom:1rem;">等待质检人员验收</p> -->
                </div>
                <div v-else >
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">维保说明</div>
                            <textarea readonly v-model="testDetail.repairresult" class="aui-list-item-input wbxfod-item" style="text-align:left;height:auto">
                            </textarea>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">维保后照片&nbsp;&nbsp;<span>({{imgList(testDetail.repairresultimgurl).length}}张)</span> </div>
                        </div>
                    </li>
                    <li class="aui-list-item checkimglist">
                        <div v-for="(item, index) in imgList(testDetail.repairresultimgurl)" :key="index" class="imgBox">
                            <img :src="item" alt="">
                        </div>
                    </li>
                </div>
            </ul>
        </div>
        <div v-else>
            <ul style="margin-bottom:0.4rem;" class="aui-list aui-form-list top_ul top_ul_wbd">
                <li class="aui-list-header">维修人员信息</li>
                <li v-for="(item, index) in testPerson" :key="index" class="carMsg">
                    <div class="carMsgImg">
                        <img src="" alt="">
                    </div>
                    
                    <div class="carMsgDetail">
                        <div>
                            {{item.employeename}}
                            <span style="background:#0f8de0;color:#ffffff;font-size:12px;border-radius:4px;padding:2px;" v-if="item.leadflag">负责人</span>
                            <div style="float:right">
                                <span :style="{'color': status == 4 ? '#666666': 'red'}">{{statusWord(status,orderDetail.spFxMaintenance.servicemethod )}}</span> 
                            </div>
                        </div>
                        <p>性别：{{item.sex == 0 ? '男' : '女'}}</p>
                        <p>联系方式：{{item.telephone}}</p>
                        <p>派工时间：{{item.operationtime | time}}</p>
                    </div>
                </li>  
            </ul>
            <ul style="margin-bottom:0.4rem;" class="aui-list aui-form-list top_ul top_ul_wbd">
                <li class="aui-list-header">检测报告</li>
                <div v-if="!testDetail.checkresult">
                    <img style="width:50%;height:50%; transform:translate(50%,0);" src="static/image/no_order.png" alt="">
                    <p style="text-align:center;padding-bottom:1rem;">暂无数据</p>
                </div>
                <div v-else >
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">检测说明</div>
                            <textarea style="text-align:left;height:auto" readonly v-model="testDetail.checkresult" class="aui-list-item-input wbxfod-item">
                            </textarea>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">检测照片&nbsp;&nbsp;<span>({{imgList(testDetail.checkresultimgurl).length}}张)</span> </div>
                        </div>
                    </li>
                    <li class="aui-list-item checkimglist">
                        <div v-for="(item, index) in imgList(testDetail.checkresultimgurl)" :key="index" class="imgBox">
                            <img :src="item" alt="">
                        </div>
                        
                    </li>
                </div>
            </ul>



            <ul v-if="status >= 3" style="margin-bottom:0.4rem;" class="aui-list aui-form-list top_ul top_ul_wbd">
                <li class="aui-list-header">维修回执单</li>
                <div v-if="status<4 || !testDetail.repairresult">
                    <img style="width:50%;height:50%; transform:translate(50%,0);" src="static/image/no_order.png" alt="">
                    <p style="text-align:center;font-size:14px;color:#9a9a9a;">暂无回执单</p>
                    <!-- <p style="text-align:center;padding-bottom:1rem;">等待质检人员验收</p> -->
                </div>
                <div v-else >
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">维保说明</div>
                            <textarea readonly v-model="testDetail.repairresult" class="aui-list-item-input wbxfod-item" style="text-align:left;height:auto">
                            </textarea>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">维保后照片&nbsp;&nbsp;<span>({{imgList(testDetail.repairresultimgurl).length}}张)</span> </div>
                        </div>
                    </li>
                    <li class="aui-list-item checkimglist">
                        <div v-for="(item, index) in imgList(testDetail.repairresultimgurl)" :key="index" class="imgBox">
                            <img :src="item" alt="">
                        </div>
                    </li>
                </div>
            </ul>
        </div>
    </div>
        
</template>
<script>
export default {
    data() {
        return {
            personType: "检测人员信息"
        }
    },
    props: {
        orderDetail: {
            type: Object
        }
    },
    methods: {
        imgList(imgStr) {
            if (typeof imgStr == "string") {
                return imgStr.split(",")
            } else {
                return []
            }
            
        },
        statusWord(status,flg) {
            if (flg === 0) {
                switch (status) {
                    case 0:
                        return "待接单"
                        break;
                    case 1:
                        return "待检测"
                        break;
                    case 2:
                        return "已检测"
                        break;
                    case 3:
                        return "待维修"
                        break;
                    case 4:
                        return "已回执"
                        break;
                    default:
                        return ""
                        break;
                }
            } else {
                switch (status) {
                    case 0:
                        return "待检测"
                        break;
                    case 1:
                        return "已检测"
                        break;
                    case 2:
                        return "待接单"
                        break;
                    case 3:
                        return "待维修"
                        break;
                    case 4:
                        return "已回执"
                        break;
                    default:
                        return ""
                        break;
                }
            }

        }
    },
    computed: {
        // 0上门 1进站
        
        testPerson() {
            const status = this.orderDetail.spFxMaintenance.usestatus   
            const type = this.orderDetail.spFxMaintenance.servicemethod 
            if (type ==1 && status <= 5) {
                return this.orderDetail.testing
            }
            this.personType = "维修人员信息"
            return this.orderDetail.repair
        },

        // 检测人员
        
        checkPerson() {
            return this.orderDetail.testing
        },

        
        // 维修人员
        
        repairPerson() {
            return this.orderDetail.repair
        },

        testDetail() {
            return this.orderDetail.spFxMaintenance
        },
        status() {
            // 对应到状态对照表
            // 0 待接单
            // 1 待检测
            // 2 已检测
            // 3 待维修
            // 4 已回执
            const s = this.orderDetail.spFxMaintenance.usestatus
            const m = this.orderDetail.spFxMaintenance.servicemethod
            if (m === 0) {
                // 上门
                if (s == 3) {
                    return 0
                } else if (s == 4) {
                    return 1
                } else if (s == 5 || s == 6) {
                    return 2
                } else if (s == 7) {
                    return 3
                } else if (s > 7) {
                    return 4
                }
            } else {
                // 进站
                if (s == 2) {
                    return 0
                } else if ( s > 2 && s <=5) {
                    return 1
                } else if (s == 6) {
                    return 2
                } else if (s == 7) {
                    return 3
                } else if (s > 7) {
                    return 4
                }
            }
        },
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
    }
}
</script>
<style>
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
    .imgBox {
        position: relative;
        width: 33.3%;
        padding: 0.4rem;
    }
    .imgBox:before {
        content: "";
        display: block;
        padding-top: 100%;
    } 
    .imgBox img {
        position:  absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
