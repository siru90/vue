<template>
    <div id="myVipExp">
        <header class="aui-bar aui-bar-nav aui-bar-light opacity_title">
            <div @click="goback"> 
                <div class="go-back">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
            </div>	
			<div class="aui-title">我的P值</div>
		</header>
        <div class="myVipExpContent">
            <div class="myVipExpContentTop">
                <num :duration="400" :num="amountPValue"></num>
            </div>
            <div class="myVipExpContentItem" v-for="(item, index) in myVipExpHistory" :key="index">
                <div :style="expendTitleStyle(index)" @click="expandHandler(index)" class="myVipExpContentItemTitle">
                    <div class="vipExpYear">{{item.year == year ? '今':item.year}}年获取</div> 
                    <span>(共{{item.yearPvalue}}P)</span>
                    <i :style="expendIconStyle(index)" class="njfont nj-fanhui expandicon"></i>
                </div>
                <ul :style="expendListStyle(index,item.year)" class="expandListContent" style="overflow:hidden">
                    <li class="pValueHistoryItem" v-for="(i, j) in item.data" :key="j">
                        <div class="pVlaueNameTime">
                            <p>{{vipExpRule(i.way).name}}</p>
                            <p>{{i.createTime}}</p>
                        </div>
                        <div class="pValueNum">
                            +{{i.pValue}}P
                        </div>
                    </li>
                </ul>
                
            </div>
        </div>
    </div>    
</template>
<script>
import num from '../../components/autoNumber'
import { vipExpRule } from '../../utils/vipExpRule'
export default {
    components: {
        num
    },
    data() {
        return {
            yearAmountPvalue: 0,
            year:2018,
            expandList:[0]
        }
    },
    props: {
        myVipExpHistory: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    computed: {
        
    },
    methods: {
        vipExpRule(key) {
            return vipExpRule(key)
        },
        expendListStyle(index,year) {
            for(let i = 0; i < this.expandList.length; i++) {
                if (this.expandList[i] == index) {
                    let height = 0
                    for (let i = 0 ; i < this.myVipExpHistory.length; i++) {
                        if (year == this.myVipExpHistory[i].year) {
                            height = this.myVipExpHistory[i].data.length * 3 + "rem"
                            break
                        }
                    }
                    console.log(height)
                    return {
                        "transition": "all 0.2s",
                        // "display": "block",
                        "height": height,
                        
                    }
                }
            }
            return {
                "transition": "all 0.2s",
                // "display": "none",
                "height": "0"
            }
        },
        expendTitleStyle(index) {
            for(let i = 0; i < this.expandList.length; i++) {
                if (this.expandList[i] == index) {
                    return {
                        "borderRadius": "4px 4px 0 0"
                    }
                }
            }
            return {
                "borderRadius": "4px"
            }
        },
        expendIconStyle(index) {
            for(let i = 0; i < this.expandList.length; i++) {
                if (this.expandList[i] == index) {
                    return {
                        "transform": "rotate(90deg)"
                    }
                }
            }
            return {
                "transform": "rotate(270deg)"
            }
        },
        expandHandler(index) {
            let arr = this.expandList
            for(let i = 0; i < arr.length; i++) {
                if (arr[i] == index) {
                    arr.splice(i,1)
                    return
                }
            }
            arr.push(index)
            this.expandList = arr
        },
        expandSelf(index) {
            for (let i = 0; i < this.expandList.length; i++) {
                if (this.expandList[i] == index) {
                    return true
                }
            }
            return false
        },
        goback() {
            this.$router.back()
        },

    },
    created() {
        let t = new Date()
        this.year = t.getFullYear()
    },
    computed: {
        amountPValue() {
            let v = 0
            const t = new Date()
            const currentYear = t.getFullYear()
            this.myVipExpHistory.forEach(el => {
                v+=el.yearPvalue
            })
            return v
        },
    },
}
</script>
<style>
    #myVipExp .myVipExpContentItemTitle .vipExpYear {
        margin-left: 0;
        display: inline-block;
        width: 4rem;
    }
    .expandListContent {
        transition: all 0.2;
    }
    .expandicon {
        transition: all 0.2s;
        float: right;
        margin-top: 5px;
        margin-right: 0.4rem;
    }
    .pValueHistoryItem {
        overflow: hidden;
        height: 3rem;
        line-height: 2.2rem;
        border-bottom: 1px solid #ededed;
        padding: 0.4rem;
        box-sizing: border-box;
    } 
    .pValueHistoryItem:last-child {
        border-bottom: 0;
    }  
    .pValueNum {
        float: right;
        color: #fba841;
        height: 100%;
    }
    .pVlaueNameTime {
        float: left;
        line-height: 1rem;
    }
    .pVlaueNameTime p {
        color: #666666;
    }
    .myVipExpContentItem ul {
        border: 1px solid #ededed;
        border-radius: 4px;
        border-radius: 0 0 4px 4px;
        border-top: 0;
    }
    .myVipExpContentItemTitle {
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
        padding-left: 0.4rem;
        background: #EA3939;
        border-radius: 4px;
        transition: all 0.2s;
    }
    .myVipExpContentItemTitle span {
        font-size: 14px;
        color: #ffffff;
        display: inline-block;
    }
    .myVipExpContentItem {
        margin: 0.6rem;
        box-shadow:rgba(234,57,57, 0.3) 0px 0px 4px;
        border-radius: 4px;
    }
    #myVipExp {
        min-height: 100%;
        background: #ffffff;
    }
    .myVipExpContent {
        padding-top: 2.75rem;
    }
    .myVipExpContentTop {
        margin: 0.6rem;
        background: #EA3939;
        text-align: center;
        height: 4rem;
        line-height: 4rem;
        font-size: 2rem;
        font-weight: bold;
        color: #ffffff !important;
        border-radius: 4px;
    }
</style>
