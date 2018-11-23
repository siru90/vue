<template>
    <wbnd :wbDetail="wbDetail"></wbnd>
</template>
<script>
import wbnd from '../../components/WbNoticeDetail/index'
import axios from 'axios';
import { mapGetters } from 'vuex'
import {Toast} from '../../utils/toast2.js';
export default {
    components: {
        wbnd
    },
    data() {
        return {
            wbDetail: {}
        }
    },
    computed: {
        ...mapGetters('xhModules', [
            'sessionId',
            ]),
        remindcode() {
            return this.$route.query.remindcode
        }
    },
    created() {
        console.log(this.remindcode)
        axios({
            method:"get",
            url: window.api.local_host + '/maintenance/getOpportunityDetail/' + this.remindcode,
            headers:{'sessionId':this.sessionId},
        }).then(res => {
            if (res.data.data[0][0] === null) {
                Toast({
                    message: "获取维保提醒详情失败！",
                    iconClass: "aui-iconfont aui-icon-close",
                    duration: 2000
                });
                return
            }
            this.wbDetail = res.data.data[0][0] 
        }).catch(e => {
            Toast({
                message: "获取维保提醒详情失败！",
                iconClass: "aui-iconfont aui-icon-close",
                duration: 2000
            });
        })
    }
}
</script>
<style>

</style>
