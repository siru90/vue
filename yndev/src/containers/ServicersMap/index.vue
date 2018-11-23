<template>
    <div id="servicersMap">
        <header style="display:block;" class="aui-bar aui-bar-nav aui-bar-light">
            <!-- <router-link :to="{path:'/main/install', query:{serviceNo:serviceParam}}"> -->
            <div class="go-back" @click="gotoAdd">
                <i></i>
                <i></i>
                <i></i>
            </div>
            <!-- </router-link> -->
            <div class="aui-title">选择服务商</div>
            <div @click="goBack" style="margin-top:0" class="aui-pull-right text-del">
                列表
            </div>
        </header>
        <mymap @geoFailCb="geoFail" @mapClick="mapClick" :autoGeo="true" v-if="servicers.length > 0 "  :setFitViewMarkerNum="3" :zoom="11" :pointMarkersList="servicers"  style="width:100%;height:100%;"></mymap>
        <transition name="serviceIn">
            <div @click="selectService" v-if="pointService.name" class="selectService">
                <div class="serviceMsg">
                    <div class="serviceName">
                        {{pointService.name}}
                    </div>
                    <p class="servicePhone">
                        电话：{{pointService.telepone}}
                    </p>
                    <p class="serviceAddr">
                        地址：{{pointService.address}}
                    </p>
                </div>
                <div class="serviceRight">
                    <div class="serviceDistance">
                        {{distance}}
                    </div>
                    
                </div>

            </div>
        </transition>

    </div>
    
</template>
<script>
import mymap from '../../components/Map'
import { getPostion } from '../../utils/getPostion.js'
import {Toast} from "../../utils/toast2";
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            pointService:{},
            distance: null
        }
    },
    computed: {
        servicersList() {
            return this.$store.state.jyy.servicersList 
        },
        servicers() {
            var arr = this.servicersList.map((item) => {
                let sArr = item.coordinates.split(",")
                item.position = [Number(sArr[0]), Number(sArr[1])]
                item.title = item.name
                // e:事件，item:被点击的元数据，distance：与自身点的距离
                item.click = (e,item,distance) => {
                    console.log(item)
                    this.pointService = item
                    this.distance = (distance/1000).toFixed(2) + 'km'
                    //this.selectService(item)
                }
                return item
            }) 
            return arr
        }
    },
    components: {
        mymap
    },
    methods: {
        gotoAdd() {
            this.$router.replace({path:"wbxfWorkOrder"})
        },
        goBack() {
            this.$router.back()
        },
        selectService() {
            if (this.pointService.name) {
                this.$store.dispatch("jyy/checkService",this.pointService)
                this.$router.push({"path":"wbxfWorkOrder"})
            }
            
        },
        mapClick(e) {
            this.pointService = {}
        },
        // 定位失败
        geoFail() {
            MessageBox('定位失败', '无法获取到您的位置，请提供定位权限');
        }
    },
    async created() {
        if (this.servicersList.length == 0) {
            this.$store.dispatch("jyy/getServicersList")
        }

        
    },
}
</script>
<style>
    #servicersMap {
        height: 100%;
        position: relative;
    }
    #servicersMap .selectService {
        position: absolute;
        bottom: 1rem;
        width: 90%;
        height: 4rem;
        background: #ffffff;
        left: 50%;
        transform: translate(-50%, 0);
        border-radius: 4px;
        transition: all 0.2s;
        box-shadow: #999999 0px 0px 4px;
    }
    #servicersMap .serviceIn-enter {
        bottom: -4rem;
    }
    #servicersMap .serviceIn-leave-to {
        bottom: -4rem;
    }
    #servicersMap .serviceName {
        color: #333333;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        width: 100%;
    }
    #servicersMap .servicePhone {
        color: #999999;
        font-size: 12px;
    }
    #servicersMap .serviceAddr {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        width: 100%;
        color: #999999;
        font-size: 12px;
    }
    #servicersMap .selectService {
        height: 4.4rem;
        background: #ffffff;
        border-bottom: 1px solid #eaeaea;
        padding: 0.4rem;
        overflow: hidden;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    #servicersMap .serviceMsg {
        margin-left: 0.4rem;
        line-height: 1.15rem;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }
    #servicersMap .serviceRight {
        width: 3rem;
        height: 100%;
        font-size: 12px;
        overflow: hidden;
        text-align: center;
        position: relative;
    }
    #servicersMap .serviceDistance {
        position: absolute;
        bottom: 0.24rem;
        left: 0px;
        width: 100%;
        text-align: center;
        color: rgb(153, 153, 153);
    }
</style>
