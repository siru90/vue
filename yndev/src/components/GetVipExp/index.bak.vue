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
                        <img :src="item.wayUrl" alt="">
                    </div>
                    <div class="method-name">
                        <p class="method-title">
                            {{item.way}}
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
                小贴士：为维护会员的正当权益，如发现有违规刷P值的情况，我们有权取消你的P值获取资格哦
            </p>
        </div>
    </div>    
</template>
<script>
export default {
    props: {
        methodsList: {
            type: Array
        }
    },
    methods: {
        gotoMyVipExp() {
            this.$router.push({name: "myVipExp"})
        }
    }
}
</script>
<style>
    .getVipExpNote {
        line-height: initial;
        font-size: 14px;
        margin-top: 0.8rem;
    }
    .getVipExpContent li .method-pvalueC {
        float: right;
        line-height: 1.2rem;
    }
    .getVipExpContent li .method-pvalueC .method-pvalue{
        font-size: 14px;
        color: #fba841;
    }
    .getVipExpContent li .method-pvalueC .method-pvaluedir{
        font-size: 12px;
        text-align: center;
        color: #fba841;
    }
    .getVipExpContent li .method-name {
        float: left;
        line-height: 1.25rem;
    }
    .getVipExpContent li .method-name .method-title {
        color: #333333;
        font-size: 14px;
    }
    .getVipExpContent li .method-name .method-namedir{
        font-size: 12px;
    }
    .getVipExpContent li .method-img {
        float: left;
        width: 2.5rem;
        height: 2.5rem;
        background: green;
        border-radius: 1.5rem;
        overflow: hidden;
        margin-right: 0.8rem;
    }
    .getVipExpContent {
        padding: 3.2rem 0.4rem 0;
    }
    .getVipExpContent > div {
        color: #666666;
        font-size: 14px;
        line-height: 2rem;
        font-weight: bold;
    }
    .getVipExpContent ul {
        width: 100%;
        border: 1px solid #ededed;
        border-radius: 4px;
        padding: 0.8rem 0.4rem;
    }
    .getVipExpContent li {
        width: 100%;
        overflow: hidden;
        margin-bottom: 1.5rem;
    }
    .getVipExpContent li:last-child {
        margin-bottom: 0;
    }

  #getVipExp {
     height: 100%;
     background: #ffffff;
 }
</style>
