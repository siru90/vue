<template>
    <div id="getVipExp">
        <header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
            <router-link to="/vipClub"> 
                <div class="go-back">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
            </router-link>	
			<div class="aui-title">赚P值</div>
            <div data-v-f3c43630="" @click="gotoMyVipExp" class="aui-pull-right text-del vipLevelRule" style="margin-top: 0px; height: 100%;">成长记录</div>
		</header>
        <div class="getVipExpContent">
            <div>获取P值途径</div>
            <ul>
                <li v-for="(item, index) in methodsList" :key="index">
                    <div class="method-img">
                        <img :src="vipExpRule(item.way).url" alt="">
                    </div>
                    <div class="method-name" ref="methodTitle">
                        <p class="method-title">
                            
                            {{vipExpRule(item.way).name}}
                            <i style="display:none;" @click="getWayDesc(item.way,item.wayDesc)" class='iconfont icon-gantanhao1'></i>
                        </p>
                        <p class="method-namedir">
                            {{item.wayDesc}}
                        </p>
                    </div>
                    <div class="method-pvalueC">
                        <p class="method-pvalue">
                            {{item.pValue}}值
                        </p>
                        <p class="method-pvaluedir">
                            ({{item.pDesc}})
                        </p>
                    </div>
                </li>
            </ul>
            <p class="getVipExpNote">
                <span style="color:#EA3939">小贴士：</span> 为维护会员的正当权益，如发现有违规刷P值的情况，我们有权取消你的P值获取资格哦!
            </p>
        </div>
        <popup v-model="popupReason" pop-transition="popup-fade">
			<div class="getVipExpPopup">
				<div class="title">{{popWayTitle}}</div>
                <div class="content">{{popWayDesc}}</div>
			</div>
		</popup>
    </div>    
</template>
<script>
import { vipExpRule } from '../../utils/vipExpRule.js'
import { Popup } from 'mint-ui';
export default {
    data () {
        return {
            popupReason:false,
            popWayTitle: "",
            popWayDesc: "",
            isShow: false,
        }
    },
    props: {
        methodsList: {
            type: Array
        }
    },
    components: {
        "popup": Popup,
    },
    mounted () {
        setTimeout(() => {
            var o = this.$refs.methodTitle;
            o.forEach((item, index) => {
                var w = item.clientWidth||item.offsetWidth;
                var desc = item.querySelectorAll('p.method-namedir')[0].innerText;

                //console.log(o, "o");
                //console.log(w, "w");
                //console.log(desc, "desc");

                if(w< (desc.length*11)){
                    this.$refs.methodTitle[index].querySelectorAll('i')[0].style.display="inline";
                }
            });
            
        }, 1000);

    },
    computed: {
        
    },
    methods: {
        gotoMyVipExp() {
            this.$router.push({name: "myVipExp"})
        },
        vipExpRule(key) {
            return vipExpRule(key)
        },
        
        getWayDesc(way,desc){
            this.popupReason = true;
            this.popWayTitle = this.vipExpRule(way).name;
            this.popWayDesc = desc;
        }
    }
}
</script>
<style>
    .getVipExpNote {
        line-height: initial;
        font-size: 12px;
        margin-top: 0.8rem;
    }
    .getVipExpContent li .method-pvalueC {
        float: right;
        line-height: 1.2rem;
        width: 4rem;
        text-align: right;
    }
    .getVipExpContent li .method-pvalueC .method-pvalue{
        font-size: 14px;
        color: #fba841;
    }
    .getVipExpContent li .method-pvalueC .method-pvaluedir{
        font-size: 12px;
        text-align: right;
        color: #fba841;
        width: 4rem;
        overflow: hidden;    
        text-overflow:ellipsis;    
        white-space: nowrap;

    }
    .getVipExpContent li .method-name {
        float: left;
        line-height: 1.25rem;
        width: 5.5rem;;
    }
    .getVipExpContent li .method-name .method-title {
        color: #333333;
        font-size: 14px;
    }
    .getVipExpContent li .method-name .method-namedir{
        font-size: 12px;
        max-width: 6.5rem;
        overflow: hidden;    
        text-overflow:ellipsis;    
        white-space: nowrap;
    }
    .getVipExpContent li .method-img {
        float: left;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 1.5rem;
        overflow: hidden;
        margin-right: 0.4rem;
    }
    .getVipExpContent {
        padding: 2.75rem 0.6rem 0;
    }
    .getVipExpContent > div {
        color: #666666;
        font-size: 14px;
        line-height: 2rem;
        font-weight: bold;
    }
    .getVipExpContent ul {
        width: 100%;
        border-radius: 4px;
    }
    .getVipExpContent li {
        width: 100%;
        overflow: hidden;
        margin-bottom: 0.4rem;
        padding: 0.6rem;
        border-radius: 4px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    }
    .getVipExpContent li:last-child {
        margin-bottom: 0;
    }

  #getVipExp {
     height: 100%;
     background: #ffffff;
 }
    #getVipExp .mint-popup{border-radius: 5px; width: 76%;background: #ffffff;}
    .getVipExpPopup{}
    .getVipExpPopup .title{text-align: center; line-height: 2rem; border-bottom: 1px solid rgba(0, 0, 0, 0.2)}
    .getVipExpPopup .content{padding: 0.5rem 0.8rem;}
</style>
