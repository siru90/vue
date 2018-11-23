<template>
    <crod :detail="detail"></crod>
</template>
<script>
import crod from '../../components/crOrderDetail/index'
import { getCrOrderDetail } from './http'
import { Toast } from '../../utils/toast2';
import {showLoading, hideLoading} from "../../utils/loading";
export default {
    data() {
        return {
            detail: []
        }
    },
    components: {
        crod: crod
    },
    created() {
        const { orderNo, startdate, enddate } = this.$route.query
        showLoading()
        getCrOrderDetail(orderNo, startdate, enddate)
        .then(res => {
            hideLoading()
            console.log(res)
            if (res.data.returnCode == 0) {
                Toast({
                    message: "查看详情失败！",
                    duration: 2000,
                    iconClass:"aui-iconfont aui-icon-close"
                });
                return
            }
            this.detail = res.data.data
        })
        .catch(e => {
            hideLoading()
            console.log(e)
            Toast({
                message: "查看详情失败！",
                duration: 2000,
                iconClass:"aui-iconfont aui-icon-close"
            });
        })
    },
}
</script>
<style>

</style>
