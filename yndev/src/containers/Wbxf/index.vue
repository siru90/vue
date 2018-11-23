<template>
    <wbxf :dataList="dataList" @tabsChange="getDataList"></wbxf>
</template>
<script>
import wbxf from '../../components/wbxf/index'
import {showLoading, hideLoading} from "../../utils/loading";
import { getWbxfList,getWbxfWbList } from './http';
import {Toast} from '../../utils/toast2.js';
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { getApiAndUiLibaray } from '../../utils/amapTools.js'
export default {
    data() {
        return {
            dataList: []
        }
    },
    components: {
        wbxf
    },
    computed: {
        ...mapGetters('xhModules', [
            'userInfo',
            "login"
    ])},
    created() {
        console.log("登录状态：",this.login)
        if (!this.login) {
            this.$router.push({path: "/login"})
            return
        }
        console.log(this.userInfo)
    },
    watch: {
        userInfo(newV,oldV) {
            if (newV && oldV === null) {
                this.getDataList(this.$route.query.act)
            }
        }
    },
    async mounted() {
       await getApiAndUiLibaray()
    },
    methods: {
        add0(m){return m<10?'0'+m:m },
        format(shijianchuo)
        {
            // 判断时区
        //shijianchuo是整数，否则要parseInt转换
            if (!shijianchuo) {
                return ""
            }
            var ttdate = new Date()
            var zoneOffset = ttdate.getTimezoneOffset()     //当前时区的偏移量
            
            var bj =  -480 - zoneOffset
            var bjUnxi = shijianchuo + bj*60000
            var time = new Date(bjUnxi);
            
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
        },
        fmtDate(time){
            if (isNaN(Number(time))) return time;
            return this.format(time)
        },
        async getDataList(i) {
            if (!this.userInfo) {
                return
            }
            this.dataList = [];
            showLoading()
            // 查询列表需要调用两个接口，分开调用，防止一个挂了刷新不出页面
            // 查询全部-待预约-待受理-待服务  调用查询预约接口
            let promiseArr = []

            if (i == 0 || i == 3) {
                let s = 1
                let start = 0
                let end = 0
                if (i == 3) {
                    s = 23
                    start = 0
                    end = 9
                } else {
                    start = 0
                    end = 15
                }
                promiseArr = [getWbxfList(s),getWbxfWbList(start,end,this.userInfo.vipid)]
            } else if (i == 4) {
                let start = 10
                let end = 11 
                promiseArr = [null,getWbxfWbList(start,end,this.userInfo.vipid)]
            } else if (i ==1 || i==2) {
                promiseArr = [getWbxfList(2 + '' + i)]
            }
            try{
                let [res,res2] = await Promise.all(promiseArr)
                // 异常处理，如果两个接口都挂了弹出提醒
                let res1Flg = true
                let res2Flg = true
                
                if (res) {
                    if (res.data.returncode ==0) {
                        res1Flg = false
                    }
                }

                if (res2) {
                    if (res2.data.returncode == 0) {
                        res2Flg = false
                    }
                }
                let list1 = []
                let list2 = []
                if (res) {
                    list1 = res.data.data[0].infolist
                }
                if (res2) {
                    res2.data.data[0].forEach(e => {
                        e.maintenanceservicetype = e.servicemethod      //维保类型（上门 进站）
                        e.maintenancestatuscode = e.usestatus           //小状态码
                        e.orderdate = this.fmtDate(e.orderdate)
                        e.sortTime = e.inputdate
                        if (!e.sortTime) {
                            e.sortTime = 0
                        }
                        e.flag = true
                        for (let i = 0; i < list1.length; i++) {
                            const element = list1[i];
                            var t = element.inputdate || "1970/01/01 08:00:00"
                            // 兼容苹果
                            t = t.replace(/\-/g,"/")
                            element.sortTime =  new Date(t).valueOf()
                            if (!element.sortTime) {
                                element.sortTime = 0
                            }
                            if (element.reservationno === e.reservationno) {
                                element.servicename = element.servicename  ? element.servicename: e.servicename
                                e.servicename = e.servicename ? e.servicename: element.servicename
                                // 以维保单去掉预约单
                                list1.splice(i,1)
                                break;
                            }
                        }
                        list2.push(e)
                    })
                }
                this.dataList = this.dataList.concat(list1)
                this.dataList = this.dataList.concat(list2)
                // 排序
                this.dataList.sort(function(a,b) {
                    let unixTimea = a.sortTime
                    let unixTimeb = b.sortTime
                    return -unixTimea+ unixTimeb
                })
                if (res && !res2) {
                    this.dataList.sort(function(a,b) {
                        let d1 = a.inputdate ? a.inputdate.replace(/\-/g,"/") : '1970/01/01 08:00:00'
                        let d2 = b.inputdate ? b.inputdate.replace(/\-/g,"/") : '1970/01/01 08:00:00'
                        let time1 = new Date(d1)
                        let time2 = new Date(d2)
                        let ux1 = time1.getTime()
                        let ux2 = time2.getTime()
                        return -ux1 + ux2
                    })
                }
                // this.dataList.forEach(v => {
                //     console.log(v.sortTime)
                // })
                await this.$store.dispatch("jyy/getWbAdData")
            } catch (error) {
                console.log(error)
                hideLoading()
            }
            hideLoading()
            
        }
    },

}
</script>
<style>

</style>
