<template>
    <wb :listData="listData" @tabChange="tabChange"></wb>
</template>
<script>
import wb from '../../components/WbNotice/index'
import {showLoading, hideLoading} from "../../utils/loading";
import axios from 'axios';
import { mapGetters } from 'vuex'
import {Toast} from '../../utils/toast2.js';
export default {
    components: {
        wb
    },
    data() {
        return {
            listData: []
        }
    },
    computed: {
      ...mapGetters('xhModules', [
        'sessionId',
      ])
    },
    methods:{
        tabChange(i) {
            const url = window.api.local_host + '/maintenance/selectOpportunityList/'+(Number(i)+1)
            console.log(url)
            showLoading()
            axios({
                method:"get",
                url:url,
                headers:{'sessionId':this.sessionId}
            }).then(res => {
                if (res.data.returncode == 0) {
                    Toast({
                        message: "获取维保提醒失败",
                        iconClass: "aui-iconfont aui-icon-close",
                        duration: 2000
                    });
                    return
                }
                try {
                    this.listData = res.data.data[0][0]
                } catch (e) {
                    
                }
                hideLoading()
            }).catch(e => {
                Toast({
                    message: "获取维保提醒失败",
                    iconClass: "aui-iconfont aui-icon-close",
                    duration: 2000
                });
                hideLoading()
            })
            
        }
    }
}
</script>
<style>

</style>
