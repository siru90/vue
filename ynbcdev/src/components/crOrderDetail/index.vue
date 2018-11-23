<template>
    <div id="crOrderDetail">
        <header class="aui-bar aui-bar-nav aui-bar-light">
			<div @click="goback" class="go-back">
				<i></i>
				<i></i>
				<i></i>
			</div>
			<div class="aui-title">账单详情</div>
		</header>
        <div>
            <div class="crod-content">
                <div class="crOrderBaseMsg">
                    <p>还款金额</p>
                    <p>¥{{amountMoney.toFixed(2)}}</p>
                </div>
            </div>
            <div class="crod-list">
                <div class="crod-list-title">
                    金额明细
                </div>
                <ul style="margin-bottom:0.5rem;" v-for="(i, index) in detail" :key="index">
                    <li class="cord-item">
                        <div class="cord-item-top">
                            <p>
                                采购单号：<span class="copydata">{{i.order.clorderid}}</span>
                                <span @click="testCopy(i.order.clorderid)" :data-clipboard-text="i.order.clorderid" class="cord-copy" style="float:right">复制</span>
                            </p>
                            <p>
                                下单时间：{{i.order.inputtdate}}
                            </p>
                        </div>
                        <div class="cord-item-mid">
                            <ul class="cord-item-goods-list">
                                <li v-for="(item, index) in i.goods" :key="index" class="cord-item-goods-item">
                                    <div class="cord-goods-img">
                                        <img :src="item.goodsurl || 'static/image/classify/1.png'" alt="">
                                    </div>
                                    <div class="cord-goods-msg">
                                        <p>{{item.goodsname}} <span style="float:right;">¥{{item.orprice * item.quantity }}</span></p>
                                        <p>型号：Tr-2</p>
                                        <p>单价：¥{{item.orprice}}/台 <span style="float:right;">X{{item.quantity}}</span></p>
                                    </div>
                                    
                                </li>
                            </ul>
                        </div>
                        <div class="cord-goods-bottom">
                            <p>商品总价<span style="float:right">¥{{goosdAmount(i)}}</span></p>
                            <p>大客户折扣金额<span style="float:right">¥{{orAmount(i)}}</span></p>
                            <p>实付金额：<span style="color:#EA3939">¥{{i.order.retailmoney}}</span>（邮费：{{i.order.postage}}）</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        
    </div>    
</template>
<script>
import {startCopy}  from '../../utils/copy'
import Clipboard from 'clipboard';
import { Toast } from '../../utils/toast2';
export default {
    data() {
        return {
        }
    },
    props: {
        detail: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    methods: {
        // 商品总价
        goosdAmount(item) {
            let r = 0
            item.goods.forEach(e => {
                r += e.price*e.quantity
            })
            return r.toFixed(2)
        },
        // 折扣金额 = 商品原价-折扣价
        orAmount(item) {
            let r = 0
            item.goods.forEach(e => {
                r += -(e.price - e.orprice) * e.quantity
            })
            return r.toFixed(2)
        },
        goback() {
            this.$router.back()
        },
        ismobile(test){
			var u = navigator.userAgent, app = navigator.appVersion;
		    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
			    if(window.location.href.indexOf("?mobile")<0){
				    try{
				        if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
				        	return '0';
				        }else{
				        	return '1';
				        }
				    }catch(e){}
			    }
		    }else if( u.indexOf('iPad') > -1){
		        return '0';
		    }else{
		        return '1';
		    }
        },
        testCopy(str) {
            var save = function (e){
                e.clipboardData.setData('text/plain',str);//下面会说到clipboardData对象
                e.preventDefault();//阻止默认行为
            }
            document.addEventListener('copy',save);
            document.execCommand("copy");//使文档处于可编辑状态，否则无效
            Toast({
                message: '复制成功',
                iconClass: "aui-iconfont aui-icon-correct",
                duration: 1000
            });
        },
        copyIt(index) {
            let num = this.ismobile(1);
            debugger
            if(num == '0'){
				if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) { //ios  
                    var copyDOM = document.querySelectorAll('.copydata')[index];  //要复制文字的节点    
                    console.log(copyDOM)
		            var range = document.createRange();
		            // 选中需要复制的节点    
		            range.selectNode(copyDOM);  
		            // 执行选中元素    
		            window.getSelection().addRange(range);    
		            // 执行 copy 操作    
		            var successful = document.execCommand('copy');   
		            try {      
		                var msg = successful ? 'successful' : 'unsuccessful';   
		            } catch(err) {      
		            } 
		            if(msg){
		            	Toast({
								message: '复制成功',
								iconClass: "aui-iconfont aui-icon-correct",
								duration: 1000
							});
		            }
		            // 移除选中的元素    
                    window.getSelection().removeAllRanges();    
                    return 
                }
                
			}
            const clipboard = new Clipboard('.cord-copy');
            if(Clipboard.isSupported()) {
                clipboard.on('success', function(e) {
                    console.log(e)
                    Toast({
                            message: '复制成功',
                            iconClass: "aui-iconfont aui-icon-correct",
                            duration: 1000
                        });
                    clipboard.destroy();
                });
                clipboard.on('error', function(e) {
                    Toast({
                            message: '复制失败',
                            iconClass: "aui-iconfont aui-icon-close",
                            duration: 1000
                        });
                });
            } 
        }
    },
    watch: {
        // detail(v) {
        //     if (v.length > 0) {
        //         setTimeout(() => {
        //             this.copyIt()
        //         }, 20);
        //     }
        // }
    },
    computed: {
        // 总的还款金额
        amountMoney() {
            let r = 0
            this.detail.forEach(i => {
                //r += i.order.retailmoney
                r = r.add(Number(i.order.retailmoney))
            })
            return r
        }
    }
}
</script>
<style>
    .crod-content {
        padding-top: 2.75rem;
    }
    .crOrderBaseMsg {
        background: #ffffff;
        text-align: center;
        border-bottom: 1px solid #dddddd;
    } 
    .crOrderBaseMsg p:nth-child(1) {
        color: #0f8de0;
        padding: 0.5rem 0 0.2rem;
    }
    .crOrderBaseMsg p:nth-child(2) {
        font-size: 1rem;
        color: #EA3939;
        padding-bottom: 0.2rem;
    }
    .crod-list-title {
        line-height: 2rem;
        background: #ffffff;
        border-bottom: 1px solid #ededed;
        text-align: center;
        color: #0f8de0;
    }
    .cord-item {
        background: #ffffff;
    }
    .cord-item-top {
        padding: 0.3rem 0.5rem;
        border-bottom: 1px solid #ededed;
    }
    .cord-item-top p {
        color: #666666;
        
    }
    .cord-copy {
        border: 1px solid #ededed;
        padding: 0.1rem 0.5rem;
        border-radius: 0.2rem;
    }
    .cord-item-mid {
        padding: 0.5rem 0.5rem;
        border-bottom: 1px solid #ededed;
    }
    .cord-item-goods-item {
        overflow: hidden;
    }
    .cord-item-goods-item .cord-goods-img {
        float: left;
        width: 4rem;
        height: 4rem;
        margin-right: 0.3rem;
    }
    .cord-item-goods-item .cord-goods-msg {
        float: left;
        width: calc(100% - 4.3rem);
    }
    .cord-item-goods-item .cord-goods-msg p:nth-child(1) {
        color: #333333;
        font-weight: bold;
    }
    .cord-item-goods-item .cord-goods-msg p:nth-child(2) {
        margin-top: 1rem;
    }
    .cord-goods-bottom {
        padding: 0.2rem 0.5rem;
    }
    .cord-goods-bottom p:nth-child(2) {
        color: #666666;
    }
    .cord-goods-bottom p:nth-child(3) {
        text-align: right;
        padding-top: 0.2rem;
        color: #666666;
    }
</style>
