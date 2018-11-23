<template>
    <wb :pageLength="pageLength" @loadNextPage="loadNextPage" :listData="ttData" @tabChange="tabChange"></wb>
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
            ttData: [],
            listData: [],
            pageLength: 10,
            endPage: 1,
            startPage:0
        }
    },
    computed: {
      ...mapGetters('xhModules', [
        'sessionId',
      ])
    },
    methods:{
        loadNextPage(pageNo) {
            this.endPage++
            this.ttData = this.listData.slice(this.startPage*10, this.endPage*10)
        },
        tabChange(i) {
            const url = window.api.local_host + '/maintenance/selectOpportunityList/'+(Number(i)+1)
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
                    this.ttData = this.listData.slice(0,10)
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
