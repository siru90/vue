<template>
    <myvipexp currentYearData="currentYearData" :myVipExpHistory="myVipExpHistory"></myvipexp>
</template>
<script>
import myvipexp from '../../components/MyVipExp'
import { getVipClubStarsPs } from './http'
import { Toast } from '../../utils/toast2';
export default {
    components: {
        myvipexp
    },
    data() {
        return {
            startYear: 2018,
            myVipExpHistory: [],
            currentYearData:{}
        }
    },
    async created() {
        let result = []
        let axiosList = []
        const time = new Date()
        const year = time.getFullYear()
        for (let i = year; i >= this.startYear; i--) {
             axiosList.push(getVipClubStarsPs(i))
        }
        try {
            let resList = await Promise.all(axiosList)
            let k = 0
            for(let j = year; j >= this.startYear; j--) {
                if (resList[k].data.returnCode == 0) {
                    Toast({
                        duration: 1000,
                        message: "获取记录失败",
                        iconClass: "aui-iconfont aui-icon-warn"
                    })
                    result.push({
                        year:j,
                        data: [],
                        yearPvalue:0
                    })
                } else {
                    let yearPvalue = 0
                    resList[k].data.data[0].forEach(v => { 
                        yearPvalue+=v.pValue
                    })
                    result.push({
                        year: j,                    //年份
                        data: resList[k].data.data[0], //对应的数据
                        yearPvalue
                    })
                }
                k++
            }
            this.myVipExpHistory = result
            this.currentYearData = result[0]
        } catch (error) {
            Toast({
                duration: 1000,
                message: "获取记录失败",
                iconClass: "aui-iconfont aui-icon-warn"
            });
        }
        

    },
}
</script>
<style>

</style>
