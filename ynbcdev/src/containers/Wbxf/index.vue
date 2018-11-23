<template>
    <wbxf :dataList="dataList" @tabsChange="getDataList"></wbxf>
</template>
<script>
import wbxf from '../../components/wbxf/index'
import {showLoading, hideLoading} from "../../utils/loading";
import { getWbxfList,getWbxfWbList } from './http';
import {Toast} from '../../utils/toast2.js';
import { mapGetters } from 'vuex'
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
    ])},
    methods: {
        fmtDate(obj){
            var date =  new Date(obj);
            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        },
        async getDataList(i) {
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
                // if (res.data.returncode == 0 || res2.data.returncode == 0) {
                //     Toast({
                //         message: "获取维保先锋列表失败",
                //         iconClass: "aui-iconfont aui-icon-close",
                //         duration: 2000
                //     })
                //     hideLoading()

                //     return
                // }
            
                // 异常处理，如果两个接口都挂了弹出提醒
                let res1Flg = true
                let res2Flg = true
                
                if (res) {
                    if (res.data.returncode ==0) {
                        res1Flg = false
                    }
                }

                if (res2) {
                    if (res.data.returncode == 0) {
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
                        e.maintenanceservicetype = e.servicemethod      //维保类型
                        e.maintenancestatuscode = e.usestatus           //小状态码
                        e.orderdate = this.fmtDate(e.orderdate)
                        e.flag = true
                        for (let i = 0; i < list1.length; i++) {
                            const element = list1[i];
                            if (element.reservationno === e.reservationno) {
                                list1.splice(i,1)
                                break;
                            }
                        }
                        list2.push(e)
                    })
                }
                console.log(list1)
                console.log(list2)
 
                this.dataList = this.dataList.concat(list1)
                this.dataList = this.dataList.concat(list2)
                console.log("获取的维保先锋列表为：")
                console.log(this.dataList)
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
