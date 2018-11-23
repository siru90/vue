<template>
    <cr @tabsChange="tabsChange" :repaymentList="repaymentList"></cr>
</template>
<script>
import cr from '../../components/creditRepayment/index'
import {mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
import { getRepaymentsList  } from './http'
import {showLoading, hideLoading} from "../../utils/loading";
import { Toast } from '../../utils/toast2';
export default {
    data() {
        return {
            repaymentList: []
        }
    },
    computed: {
        ...mapGetters('xhModules', [
            'userInfo',
            'sessionId',
            'login',
            'car',
        ]),
    },
    components: {
        cr:cr
    },
    methods: {
        tabsChange(index) {
            if (!this.login) {
                MessageBox.alert('请先登录').then(action => {
                    this.$router.push({"path": "/main/classify"});
                });
                return
            }
            showLoading()
            getRepaymentsList(index != 0? index: '')
            .then(res => {
                hideLoading()
                if (res.data.returnCode == 0) {
                    Toast({
                        message: "获取还款列表失败！",
                        duration: 1000,
                        iconClass: "aui-iconfont aui-icon-close"
                    });
                    return
                }
                this.repaymentList = res.data.data
            })
            .catch(e => {
                hideLoading()
            })
        }
    },
    created() {

    },
}
</script>
<style>

</style>
