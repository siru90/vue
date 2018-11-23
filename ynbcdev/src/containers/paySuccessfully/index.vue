<template>
    <div>
        <!--头部-->
        <header class="aui-bar aui-bar-nav aui-bar-light">
            <div class="go-back" @click.stop="goBack">
                <i></i>
                <i></i>
                <i></i>
            </div>
            <div class="aui-title">支付成功</div>
        </header>
        <div style="height: 3rem;"></div>
        <!--头部end-->
        <div class="centent">
            <div class="successful_pay">
                <i class="icon njfont nj-xuanzhong"></i>
                <h1>支付成功</h1>
                <p>您的订单会尽快处理</p>
                <p>
                <span style="color: #008000;">{{time}}</span>秒后自动跳转</p>
                <div class="aui-btn aui-btn-outlined aui-btn-danger" @click.stop="goToOrderList">
                    查看 
                    <span v-if="backPage=='2'" >信用还款</span>
                    <span v-else>我的采购单</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from "../../api";
export default {
    props: {

    },
    data() {
        return {
            time: 5,
            timer: null
        }
    },
    computed: {
        //获取订单编号
        orderType() {
            console.log(this.$route.params.orderType);
            return this.$route.params.orderType;
        },
        backPage() {
            return this.$route.params.backPage
        }
    },
    methods: {
        goToOrderList() {
            //取消定时器
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
            //服务商品跳到已签收，普通商品跳到待配送
            if (parseInt(this.orderType) === api.normalGoodsType) {
                if (this.backPage == 2) {
                    this.$router.replace({path: '/main/creditRepayment?act=0'});
                    return
                }
                this.$router.replace({path: `/main/proOrder`, query: {orderStatus: 2}});
            } else if (parseInt(this.orderType) === api.virtualGoodsType) {
                if (this.backPage == 2) {
                    this.$router.replace({path: '/main/creditRepayment?act=0'});
                    return
                }
                this.$router.replace({path: `/main/proOrder`, query: {orderStatus: 4}});
            } else if (parseInt(this.orderType) === 2) {
                if (this.backPage == 2) {
                    this.$router.replace({path: '/main/creditRepayment?act=0'});
                    return
                }
                //跳到全部订单页面
                this.$router.replace({path: `/main/proOrder`, query: {orderStatus: 0}});
            }
            
        },
        goBack() {
            this.goToOrderList();
        }
    },
    created () {
        if (!this.timer) {
            this.timer = setInterval(() => {
                if (this.time === 0) {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.goToOrderList();
                    return;
                }
                this.time = this.time - 1;
            }, 1000);
        }
    },
    beforeDestory() {
        //取消定时器
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

}
</script>

<style>

</style>


