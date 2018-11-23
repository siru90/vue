<template>
    <crpay :userMsg="userMsg"></crpay>
</template>
<script>
import crpay from "../../components/creditRepaymentPay/index";
import { getAccountCreditByVipidList } from '../../containers/Pay/http'
import { Toast } from '../../utils/toast2';
export default {
    data() {
        return {
            userMsg: {}
        }
    },
    components: {
        crpay:crpay
    },
    created() {
        getAccountCreditByVipidList()
        .then(res => {
            if (res.data.returnCode == 0) {
                Toast({
                    message: "获取个人信息信息失败！",
                    duration: 1000,
                    iconClass: "aui-iconfont aui-icon-close"
                });
                return
            }
            this.userMsg = res.data.data[0][0]
        })
        .catch(e => {
            if (res.data.returnCode == 0) {
                Toast({
                    message: "获取个人信息信息失败！",
                    duration: 1000,
                    iconClass: "aui-iconfont aui-icon-close"
                });
                return
            }
        })
    },
}
</script>
<style>

</style>
