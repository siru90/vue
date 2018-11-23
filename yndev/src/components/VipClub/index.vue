<template>
    <div id="vipClub">
        <header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
            <router-link to="/main/profile"> 
                <div class="go-back">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
            </router-link>	
			<div class="aui-title">会员俱乐部</div>
            <div data-v-f3c43630="" @click="gotoVipLevelRule" class="aui-pull-right text-del vipLevelRule" style="margin-top: 0px; height: 100%;color:#EA3939 !important;">等级规则</div>
		</header>
        <div class="vipClubContent">
            <div class="vipClubBanner">
                <img class="vipClubBannerImage" src="static/image/vipbanner.png" alt="">
                <div class="vipLevel">
                    <p class="starsName">{{userVipMsg.starsName}}</p>
                    <p>
                        <ul>
                            <li style="color: #fbda41;font-size:14px;display:inline-block" v-for="(item, index) in actStarNum" :key="index" class="icon njfont nj-yishoucang"></li>
                            <li style="font-size:14px;display:inline-block" v-for="(item, index) in grayStarNum" :key="index+5" class="icon njfont nj-yishoucang"></li>
                        </ul>
                    </p>
                </div>
                <div class="percent">
                    <div class="amountPercent">
                        <div style="width:0%" class="currentPercent">
                        </div>
                        <div @click="gotoMyVipExp" id="staff"  class="staff">
                            <!-- <num :duration="300" :num="userVipMsg.pValue"></num>   -->
                            <span>{{userVipMsg.pValue ? userVipMsg.pValue : 0}}</span> 
                            <div class="staff-bottom"></div>
                            
                        </div>
                        <span class="allPercent" style="left:0">{{userVipMsg.pBeginValue}}</span>
                        <span v-if="actStarNum < 5" class="allPercent">{{userVipMsg.pEndValue}}</span>
                    </div>
                </div>
                <div class="banner-bottom">
                    <div class="banner-bottom-content" >
                        <span v-if="actStarNum < 5">还差<span style="color:#fbda41">{{nextLevelNum}}</span>P值升级为{{nextVipStarName}}</span>
                        <div @click="gotoMoreP" class="gotoMoreP">
                            获取更多P值
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="myMaterial vipClubMaterials">
            <div class="vipClubMaterialsTitle">
                <div class="verticalLine ">

                </div>
                我的福利
            </div>
            <ul class="vipClubMaterialsContent">
                <li class="vipClubMaterialsItem">
                    <!-- <i class="njfont nj-daipingjia1"></i> -->
                    <div class="jingqingqidai">
                        <img style="" src="static/image/jingqingqidai.png" alt="">
                    </div>
                    
                    <div class="vipClubMaterialsItemName">敬请期待</div>
                </li>
            </ul>
        </div>
        <div class="myMaterial vipClubMaterials">
            <div class="vipClubMaterialsTitle">
                <div class="verticalLine ">

                </div>
                升级享更多福利
            </div>
            <ul class="vipClubMaterialsContent">
                <li class="vipClubMaterialsItem">
                    <!-- <i class="njfont nj-daipingjia1"></i> -->
                    <div class="jingqingqidai">
                        <img style="" src="static/image/jingqingqidai.png" alt="">
                    </div>
                    <div class="vipClubMaterialsItemName">敬请期待</div>
                </li>
            </ul>
        </div>
        <div class="myMaterial vipClubMaterials" style="position:relative">
            <div class="vipClubMaterialsTitle">
                <div class="verticalLine ">
                </div>
                会员等级福利对照表
            </div>
            <table class="vipMaterTable">
                <tr>
                    <td>福利/等级</td>
                    <td>一星</td>
                    <td>二星</td>
                    <td>三星</td>
                    <td>四星</td>
                    <td>五星</td>
                </tr>
                <tr>
                    <td>购物优惠</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>积分兑换</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>免运费</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>生日礼包</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <div class="jqqdf">
                <div class="jingqingqidai">
                    <img style="" src="static/image/jingqingqidai.png" alt="">
                </div>
                <p>敬请期待</p>
            </div>

        </div>
    </div>
</template>
<script>
import num from '../autoNumber'
export default {
    components: {
        num
    },
    data() {
        return {
            showStaff: false,
        }
    },
    mounted() {
        setTimeout(() => {
            this.setWidth()
        }, 20);

    },
    watch: {
        userVipMsg(newV, oldV) {
            this.setWidth()
        }
    },
    computed: {
        nextVipStarName() {
            for (let i = 0; i < this.vipstarlist.length; i++) {
                const element = this.vipstarlist[i];
                if (element.starsNum == this.userVipMsg.starsNum) {
                    if (i == this.vipstarlist.length - 1) {
                        return element.starsName
                    } else {
                        return this.vipstarlist[i+1].starsName
                    }
                    break
                }
            }
            
            return ""

        },
        vipstarlist() {
            let list = this.$store.state.jyy.vipClubStarsPs
            if (list.length == 0) {
                this.$store.dispatch("jyy/getVipClubStarsPs")
                return []
            }
            return list
        },
        userVipMsg() {
            if (!this.$store.state.jyy.userVipMsg.starsName) {
                this.$store.dispatch("jyy/getUserVipMsg")
                return {}
            }
            return this.$store.state.jyy.userVipMsg
        },
        actStarNum() {
            if (this.userVipMsg.starsNum > 5) {
                return 5
            }
            return this.userVipMsg.starsNum || 0
        },
        grayStarNum() {
            return 5 - this.actStarNum
        },
        // pPercent() {
        //     if (this.userVipMsg.pValue !== undefined && this.userVipMsg.pEndValue !== undefined && 0 !==undefined) {
        //         return (this.userVipMsg.pValue - this.userVipMsg.pBeginValue) * 100/(this.userVipMsg.pEndValue - this.userVipMsg.pBeginValue) + '%'
        //     } else {
        //         return "0%"
        //     }
              
        // },
        nextLevelNum() {
            if (this.userVipMsg.pEndValue && (this.userVipMsg.pValue !== undefined)) {
                const v = this.userVipMsg.pEndValue-this.userVipMsg.pValue + 1
                if (v < 0) {
                    return 0
                }
                return v
            } else {
                return '-'
            }
            
        },
        nextLevelWord() {
            switch (this.actStarNum) {
                case 0:
                    return "一星会员"
                    break;
                case 1:
                    return "二星会员"
                    break;
                case 2:
                    return "三星会员"
                    break;
                case 3:
                    return "四星会员"
                    break;
                case 4:
                    return "五星会员"
                    break;
                default:
                    return ""
                    break;
            }
        }
    },
    methods: {
        setWidth() {
            if (this.userVipMsg.pValue === undefined || this.userVipMsg.pBeginValue === undefined || this.userVipMsg.pEndValue === undefined) {
                return
            }
            // 获取进度条总长度
            let amountWidth = document.querySelector(".amountPercent").offsetWidth
            // 获取比例
            let r = (this.userVipMsg.pValue- this.userVipMsg.pBeginValue)/(this.userVipMsg.pEndValue - this.userVipMsg.pBeginValue)
            r = r >= 1 ? 1 : r
            // 设置当前进度条长度
            document.querySelector(".currentPercent").style.width = amountWidth *r + 'px'
            
            // 设置滑块位置
            const staffNode = document.querySelector("#staff")
            const staffWidth = staffNode.offsetWidth
            let leftV = amountWidth *r - staffWidth/2
            if (leftV < 0) {
                leftV = 0
            } else if (leftV >= amountWidth -staffWidth/2) {
                leftV = amountWidth-staffWidth
            }
            staffNode.style.left = leftV + 'px'
        },
        gotoMyVipExp() {
            this.$router.push({name: "myVipExp"})
        },
        gotoMoreP() {
            this.$router.push({name: "getVipExp"})
        },
        gotoVipLevelRule() {
            this.$router.push({name: "vipLevelRule"})
        }
    }
}
</script>
<style>
    .jqqdf {
        position: absolute;
        right: 28.5vw;
        top: 5rem;
        text-align: center
    }
    .jingqingqidai {
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        background: #e4e4e4;
        display: inline-block;
        position: relative;
        opacity: 0.5;
    }
    .jingqingqidai img {
        width: 60%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%)
    }
    .vipMaterTable {
        margin-top: 0.4rem;
        width: 100%;
        font-size: 12px;
        border-collapse: collapse;
        text-align: center;
    }
    .vipMaterTable td{
        border: 1px solid #ededed;
        height: 1.5rem;
        line-height: 1.5rem;
    }
    .vipClubMaterialsContent {
        width: 100%;
        display: flex;
        padding: 0.4rem 0;
        flex-wrap: wrap;
    }
    .vipClubMaterialsItem {
        width: 20%;
        text-align: center;
        font-size: 12px;
    }
    .vipClubMaterialsItem .vipClubMaterialsItemName {
        color: #666666;
    }
    .vipClubMaterialsItem i {
        font-size: 2.5rem;
        color: #c21f30;
    }
    .vipClubMaterialsTitle {
        height: 1rem;
        line-height: 1rem;
        font-size: 14px;
        color: #333333;
    }
    .verticalLine {
        height: 100%;
        width: 4px;
        margin-right: 0.5rem;
        background: #970000;
        float: left;
    }
    .vipClubMaterials {
        background: #ffffff;
        padding: 0.4rem 0.6rem;
        margin-top: 0.4rem;
    }
    .banner-bottom-content {
        height: 1.2rem;
        line-height: 1.2rem;
    }
    .gotoMoreP {
        float: right;
        font-size: 12px;
        height: 100%;
        padding: 0 0.2rem;
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 6px;
        color: rgba(255, 255, 255, 0.8);
    }
    .banner-bottom {
        padding: 0 0.6rem;
        margin-top: 1.8rem;
        color: #ffffff;
        font-size: 12px;

    }
    .allPercent {
        position: absolute;
        right: 0;
        top: 0.3rem;
        color: #ffffff;
    }
    .staff-bottom {
        position: absolute;
        width: 0.5rem;
        left: 50%;
        top: 0.8rem;
        transform: translate(-50%,0);
        height: 0.5rem;
        width:0;
        height:0;
        border-width:0.3rem 0.3rem 0;
        border-style:solid;
        border-color:#ffffff transparent transparent;/*灰 透明 透明 */
    }
    .staff {
        transition: all 0.3s;
        left: 0;
        position: absolute;
        bottom: 0.8rem;
        min-width: 2rem;
        height: 0.9rem;
        border: 1px solid #ffffff;
        text-align: center;
        line-height: 0.9rem;
        color: rgb(234, 57, 57) !important;
        background: #ffffff;
        border-radius: 0.3rem;
        font-size: 12px;
    }
    .amountPercent {
        width: 100%;
        height: 0.2rem;
        background: rgba(0, 0, 0, 0.2);
        position: relative;
        border-radius: 4px;
    }
    .currentPercent {
        position: absolute;
        height: 100%;
        background: #fbda41;
        background: linear-gradient(to right, white, #fbda41);
        width: 0;
        transition: all 0.3s;
        border-radius: 4px;
    }
    .percent {
        margin-top: 2rem;
        padding: 0 0.6rem;
    }
    .vipLevelRule {
        color: #0f8de0 !important;
    }
    .vipClubContent {
        padding-top: 2.75rem;
        overflow: hidden;
    }
    .vipClubBanner {
        width: 100%;
        height: 9rem;
        position: relative;
    }
    .vipLevel {
        text-align: center;
        padding-top: 1rem;
    }
    .vipLevel p {
        color: #ffffff;
        line-height: initial;
    }
    .starsName {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 0.3rem;
    }
    .vipClubBannerImage {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
    }
</style>
