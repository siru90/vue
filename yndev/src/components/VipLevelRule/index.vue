<template>
    <div id="vipLevelRule">
        <header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
            <router-link to="/vipClub"> 
                <div class="go-back">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
            </router-link>	
			<div class="aui-title">等级规则</div>
		</header>
        <div class="vipLevelRuleContent">
            <div class="vieLevelRuleItem">
                <div class="vipLevelRuleTitle">
                    <div class="verticalLine ">
                    </div>
                    会员等级介绍
                </div>
                <p v-html="vipLevelRule.wordDir.starsDesc" class="vieLevelRuleItemContent">
                </p>
            </div>
            <div class="vieLevelRuleItem">
                <div class="vipLevelRuleTitle">
                    <div class="verticalLine ">
                    </div>
                    P值说明
                </div>
                <p v-html="vipLevelRule.wordDir.pDesc" class="vieLevelRuleItemContent">
                </p>
                <div class="vieLevelRuleItemTable">
                    P值获取途径及对照表
                    <table>
                        <tr class="tableheader">
                            <td>获取途径</td>
                            <td>奖励P值</td>
                            <td>奖励封顶</td>
                        </tr>
                        <tr v-for="(item, index) in vipLevelRule.pTable" :key="index">
                            <td>
                                {{vipExpRule(item.way).name}}
                            </td>
                            <td>
                                {{item.pValue}}
                            </td>
                            <td>
                                {{item.pDesc}}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="vieLevelRuleItem">
                <div class="vipLevelRuleTitle">
                    <div class="verticalLine ">
                    </div>
                    会员升级周期说明
                </div>
                <p v-html="vipLevelRule.wordDir.starsCycleDesc" class="vieLevelRuleItemContent">
                </p>
            </div>
            <div class="vieLevelRuleItem">
                <div class="vipLevelRuleTitle">
                    <div class="verticalLine ">
                    </div>
                    会员等级升级说明
                </div>
                <p v-html="vipLevelRule.wordDir.starsUpgradeDesc" class="vieLevelRuleItemContent">
                </p>
                <div class="vieLevelRuleItemTable">
                    等级和P值对应表
                    <table>
                        <tr class="tableheader">
                            <td>获取途径</td>
                            <td>奖励P值</td>
                        </tr>
                        <tr v-for="(item, index) in vipLevelRule.levelPTable" :key="index">
                            <td>
                                {{item.starsName}}
                            </td>
                            <td>
                                {{item.pBeginValue}}&le;P值&le;{{item.pEndValue}}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import { vipExpRule } from '../../utils/vipExpRule.js'
export default {
    props: {
        vipLevelRule: {
            type: Object,
            default: function() {
                return {
                    wordDir: {},
                    pTable:[],
                    levelPTable:[]
                }
            }
        }
    },
    methods: {
        vipExpRule(key) {
            return vipExpRule(key)
        }
    }
}
</script>
<style>
    .tableheader {
        background: #dddddd;
    }
    .vieLevelRuleItem {
        border-bottom: 1px solid #ededed;
        margin-bottom: 0.4rem;
    }
    .vieLevelRuleItem:last-child {
        border-bottom: 0;
    }
    .vieLevelRuleItemContent {
        padding: 0.4rem 0.7rem;
        word-break: break-all;   
    }
    .vieLevelRuleItemTable {
        padding: 0 0.7rem
    }
    #vipLevelRule {
        background: #ffffff;
    }
    #vipLevelRule table {
        width: 100%;
        font-size: 12px;
        border-collapse: collapse;
        text-align: center;
        margin: 0.4rem 0;
    }
    #vipLevelRule table td {
        border: 1px solid #ededed;
        height: 1.5rem;
        line-height: 1.5rem;
    }
    .vipLevelRuleContent {
        padding: 0.4rem;
        padding-top: 3.2rem;
        
    }
    .vipLevelRuleTitle {
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
</style>
