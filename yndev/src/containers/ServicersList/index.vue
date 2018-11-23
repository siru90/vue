<template>
    <sl :currentPostion="currentPostion" :servicersList="servicersList"></sl>
</template>
<script>

// 默认南宁经纬度
const NANNINGPOSTION = [108.33,22.84]

import sl from '../../components/ServicersList'
import { getServicesData } from './http.js'
import { getPostion } from '../../utils/getPostion.js'
import {showLoading, hideLoading} from "../../utils/loading";
import {Toast} from "../../utils/toast2";

export default {
    data() {
        return {
            //servicersList: [],
            currentPostion: NANNINGPOSTION
        }
    },
    components: {
        sl
    },
    async mounted() {
        this.$store.dispatch("jyy/getServicersList")
        //this.getServices()
    },
    created() {
        this.getCurrentPosition()
    },
    methods: {
        // 获取当前经纬度
        async getCurrentPosition() {
            try {
                let p = await getPostion()
                this.currentPostion = [p.coords.longitude,p.coords.latitude]
            } catch (error) {
                console.log(error)
                //this.ToastErr("获取位置失败")
            }
            
        },
        // 获取服务商列表
        // async getServices() {
        //     showLoading()
        //     try {
        //         const res = await getServicesData()
        //         hideLoading()
        //         if (res.data.returncode != 1) {
        //             this.ToastErr("获取服务商列表失败！")
        //             return
        //         }
        //         this.servicersList = res.data.data
        //     } catch (error) {
        //         hideLoading()
        //         this.ToastErr()
        //     }
        // },
        ToastErr(msg) {
            Toast({
                message: msg,
                iconClass: "aui-iconfont aui-icon-close",
                duration: 1000
            })
        }
    },
    computed: {
        servicersList() {
            return this.$store.state.jyy.servicersList
        }
    }
}
</script>
<style>

</style>
