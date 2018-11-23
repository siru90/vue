<template>
    <div id="servicersList">
        <header style="display:block;" class="aui-bar aui-bar-nav aui-bar-light">
            <!-- <router-link :to="{path:'/main/install', query:{serviceNo:serviceParam}}"> -->
            <div class="go-back" @click="goBack">
                <i></i>
                <i></i>
                <i></i>
            </div>
            <!-- </router-link> -->
            <div class="aui-title">选择服务商</div>
            <div @click="gotoServicesMap" style="margin-top:0" class="aui-pull-right text-del">
                地图
            </div>
        </header>
        <ul class="servicersContent">
           <li @click="checkService(item)" class="servicersItem" v-for="(item, index) in sortServicesList" :key="index">
               <div class="servicersMsg">
                   <p class="servicerName">{{item.name}}</p>
                   <p class="servicerPhone">电话：{{item.telepone}}</p>
                   <div class="servicerAddress">地址：{{item.address}}</div>
               </div>
                <div class="serversRight">
                    <div style="position:absolute;bottom:0.24rem;left: 0;width:100%;text-align:center;color:#999999">{{item.distance}}</div> 
                </div>
           </li> 
        </ul>
    </div>    
</template>
<script>
import { distanceByLnglat } from '../../utils/relativeDirection.js'
export default {
    props: {
        servicersList: {
            type:Array,
            default: function() {
                return []
            }
        },
        currentPostion: Array
    },
    methods: {
        goBack() {
            this.$router.back()
        },
        gotoServicesMap() {
            this.$router.push({name:"servicersMap"})
        },
        relativeDisatance(currentPostion,targetPostion) {

        },
        checkService(item) {
            this.$store.dispatch("jyy/checkService",item)
            this.$router.back()
        }
    },
    computed: {
        // 排序列表
        sortServicesList() {
            let arr = this.servicersList
            arr.forEach(e => {
                let distance = distanceByLnglat(this.currentPostion, e.coordinates.split(","))
                // 全部显示为km
                distance = (distance / 1000).toFixed(2) + 'km'

                e.distance = distance
            })
            arr.sort(function(a,b) {
                return parseInt(a.distance) - parseInt(b.distance)
            })
            return arr
        }
    }
}
</script>
<style>
    .servicerName {
        color: #333333;
        display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:1;-webkit-box-orient:vertical;
        width: 100%;
    }
    .servicerPhone {
        color: #999999;
        font-size: 12px;
    }
    .servicerAddress {
        display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:1;-webkit-box-orient:vertical;
        width: 100%;
        color: #999999;
        font-size: 12px;
    }
    #servicersList .servicersContent {
        padding-top: 2.75rem;
    }
    #servicersList .serversRight {
        width: 3rem;
        height: 100%;
        font-size: 12px;
        overflow: hidden;
        text-align: center;
        position: relative;
        
    }
    #servicersList .servicersMsg {
        margin-left: 0.4rem;
        line-height: 1.15rem;
        flex: 1
    }
    #servicersList .servicersItemImg {
        width: 3.6rem;
        height: 3.6rem;
        background: #ededed;
        
    }
    #servicersList .servicersItem {
        height: 4.4rem;
        background: #ffffff;
        border-bottom: 1px solid #eaeaea;
        padding: 0.4rem;
        overflow: hidden;
        display: flex; 
    }
    #servicersList .servicersItem:active {
        background: #ededed;
    }
</style>
