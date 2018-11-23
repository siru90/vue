<template>
    <div id="creditRepayment">
        <tab @tabsChange="tabsChange" :titleInfor="titleInfor"></tab>
        <ul>
            <li v-for="(item, index) in repaymentList" :key="index" class="creditRepaymentItem">
                <div class="cr-baseMsg">
                    <p><span class="cr-label">账期：</span>{{item.enddate}} <span style="float:right;color:#EA3939">{{getStatus(item.repaymentstatue)}}</span></p>
                    <p><span class="cr-label">还款单号：</span>{{item.repaymentcode}}</p>
                </div>
                <div class="cr-money">
                    <p>
                        <span >总信用额度</span>
                        <span class="cr-item-right">¥{{item.credit}}</span>
                    </p>
                    <p>
                        <span >已用额度</span>
                        <span class="cr-item-right">¥{{item.alreadymoney}}</span>
                    </p>
                    <p>
                        <span>可用额度</span>
                        <span class="cr-item-right">¥{{item.remaincredit}}</span>
                    </p>
                </div>
                <div class="cr-hkje" >
                    <span class="cr-label">还款金额：</span>
                    <span style="color:#EA3939">¥{{item.repaymentmoney}}（含邮费¥{{item.postage}}）</span>
                </div>
                <div class="cr-bottom">
                    <!-- <span v-if="showBtn(item,'makebill')" @click="makeBill" class="cr-btn">开票申请</span> -->
                    <span v-if="showBtn(item, 'checkbill')" @click="checkBill" class="cr-btn">查看发票</span>
                    <span v-if="showBtn(item)" @click="gotoCrDetail(item)" class="cr-btn">账单详情</span>
                    <span v-if="showBtn(item, 'sendMoney')" style="borderColor:#EA3939;color:#EA3939" @click="goCrPay(item)" class="cr-btn">马上还款</span>
                </div>
            </li>
        </ul>
        <div class="no_data" v-if="repaymentList.length == 0">
            <img src="static/image/no_order.png"/>
            <p>暂无信息~</p>
            <!-- <div class="back_home aui-btn aui-btn-outlined" @click.stop="goHome">逛逛首页</div> -->
        </div>
    </div>    
</template>
<script>
import { mapMutations } from 'vuex';
import TabBar from '../../components/TabsBar/tabs'
export default {
    components: {
        tab: TabBar
    },
    props: {
        repaymentList: {
            type: Array
        }
    },
    data() {
        return {
            titleInfor: [{
                goodsClassId: "",
                goodsClassName: "全部",
                goodsClassNum: "",
            },{
                goodsClassId: "",
                goodsClassName: "待还款",
                goodsClassNum: "",
            },{
                goodsClassId: "",
                goodsClassName: "待审核",
                goodsClassNum: "",
            },{
                goodsClassId: "",
                goodsClassName: "已还款",
                goodsClassNum: "",
            }]
        }
    },
    methods: {
        tabsChange(index) {
            this.$emit("tabsChange",index)
        },
        showBtn(item,keyWord) {
            let status = item.repaymentstatue
            switch (keyWord) {
                case "makebill":
                    if(status == 3 &&  !item.ticketstate) {
                        return true
                    }
                    return false
                    break;
                case "checkbill":
                    if (status == 3 && item.ticketstate) {
                        return true
                    }
                    return false
                    break;
                case "sendMoney":
                    if (status == 0) {
                        return true
                    }
                    return false
                    break;
                default:
                    return true
                    break;
            }
        },
        makeBill() {
            //this.$router.push({name:'BillDetail',query:{datas:orderNo,parentOrderNo:shopId}})
            this.$router.push({name:"BillDetail"})
        },
        checkBill() {
            //this.$router.push({name:'/main/BillParticulars',query:{orderNo:val,ParentOrderNo:this.ParentOrderNo,creTime:this.creTime}})	  
            this.$router.push({name:'/main/BillParticulars'})
        },
        goCrPay(item) {
            console.log(item)
            const payParam = {
                startdate: item.startdate,
                enddate: item.enddate,
                amount: item.repaymentmoney,
                repaymentno: item.repaymentcode,
                postage: item.postage  
            }
            this.$router.push({name:"crPay",params:payParam})
        },
        gotoCrDetail(item) {
            this.$router.push({name:"crOrderDetail",query:{orderNo:item.repaymentcode, startdate: item.startdate, enddate: item.enddate}})
        },
        ...mapMutations([
            'SET_HEADER',
        ]),
        getStatus(code) {
            if (code == 0) {
                return "待还款"
            } else if (code == 2) {
                return "待审核"
            } else if(code == 3) {
                return "已还款"
            }
        }

    },
    mounted() {
        // 需要设置样式
        document.body.id = "creditRepayment"
    },
    beforeDestroy() {
        document.body.id = ""
    },
    async created() {
      this.SET_HEADER({
        titlePart: {
          isHome: false,
          title: '信用还款'
        },
        hasSearch: false,
        handlePart: {
          type: '0',
          handleClick: () => {
          }
        }
      })
    }
}
</script>
<style>
    #creditRepayment #headerC {
        height: 5.5rem !important;
    }
    #creditRepayment header {
        border-bottom: 0;
    }
    #creditRepayment #tabbar {
        border-bottom: 1px solid #ededed;
        position: fixed;
        top: 2.75rem;
        left: 0;
        width: 100%;
    }
    .creditRepaymentItem {
        padding: 0.5rem 0 0;
        margin-bottom: 0.5rem;
        background: #ffffff;
    }
    .cr-money {
        padding: 0.5rem;
        border-bottom: 1px solid #ededed;
    }
    .cr-money p{
        color: #666666;
    }
    .cr-label {
        color: #666666;
    }
    .cr-baseMsg {
        border-bottom: 1px solid #ededed;
        padding: 0 0.5rem 0.5rem;
    }
    .cr-item-right {
        float: right;
    }
    .cr-hkje {
        text-align: right;
        height: 2rem;
        line-height: 2rem;
        border-bottom: 1px solid #ededed;
        padding: 0 0.5rem;
    }
    .cr-bottom {
        height: 2rem;
        line-height: 2rem;
        text-align: right;
        padding: 0 0.5rem;
    }
    .cr-btn {
        padding: 0.3rem;
        border: 1px solid #ededed;
        margin-left: 0.2rem;
        border-radius: 0.2rem;
    }
</style>
