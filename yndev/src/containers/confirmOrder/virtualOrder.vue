<template>
    <div>
        <div class="vue_app" style="position: absolute;width: 100%">
            <!--头部-->
            <header class="aui-bar aui-bar-nav aui-bar-light">
                <div class="go-back">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <div class="aui-title">确认订单</div>
            </header>
            <div style="height: 3rem;"></div>
            <div class="centent">
                <!--配送地址-->
                <div id="address" class="aui-content top_div">
                    <ul class="aui-list aui-media-list address_bj">
                        <li class="aui-list-item">
                            <div class="aui-media-list-item-inner">
                                <div class="aui-list-item-label-icon">
                                    <i class="icon njfont nj-dizhi"></i>
                                </div>
                                <div class="aui-list-item-inner aui-list-item-arrow">
                                    <div class="aui-list-item-text">
                                        <div class="aui-list-item-title">
                                            <strong>收货人：张晓天</strong>
                                            <span class="aui-font-size-14 text_c_gray"></span>
                                        </div>
                                        <div class="aui-list-item-right aui-font-size-14">18878996688</div>
                                    </div>
                                    <p>
                                        <span class="aui-label aui-label-info">公司</span>&nbsp;广西省南宁市青秀区航洋国际城A座03室</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--配送地址 end-->
                <!--商品列表-->
                <div class="aui-content choose_list">
                    <ul class="aui-list aui-media-list">
                        <li class="aui-list-item iscroll_list" style="touch-action: pan-y pinch-zoom;">
                            <div class="aui-media-list-item-inner scroller_list" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                                <div class="aui-list-item-media">
                                    <img src="static/image/demo1.png">
                                    <em>×1</em>
                                </div>
                                <div class="aui-list-item-media">
                                    <img src="static/image/demo1.png">
                                    <em>×3</em>
                                </div>
                                <div class="aui-list-item-media">
                                    <img src="static/image/demo1.png">
                                    <em>×1</em>
                                </div>
                                <div class="aui-list-item-media">
                                    <img src="static/image/demo1.png">
                                    <em>×1</em>
                                </div>
                                <div class="aui-list-item-media">
                                    <img src="static/image/demo1.png">
                                    <em>×1</em>
                                </div>
                                <div class="aui-list-item-media">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="aui-list-item-arrow statistics">
                        <p>共6件</p>
                        <p>1个包裹</p>
                    </div>
                </div>
                <!--商品列表 end-->
                <!--信息列表-->
                <div class="aui-content aui-margin-b-15">
                    <ul class="aui-list aui-list-in">
                        <li id="invoice_information" class="aui-list-item aui-list-item-arrow">
                            <div class="aui-list-item-inner invoice">
                                <div class="aui-list-item-title">发票信息</div>
                                <!--参考京东-->
                                <div class="aui-list-item-right">纸质(汽车配件-广西南宁XXXXXX科技有限公司)</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--信息列表 end-->
                <!--信息列表-->
                <div class="aui-content aui-margin-b-15">
                    <ul class="aui-list aui-list-in">
                        <li class="aui-list-item aui-list-item-arrow">
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-title">优惠券</div>
                                <div class="aui-list-item-right">新人券</div>
                            </div>
                        </li>
                        <li class="aui-list-item">
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-title">商品金额</div>
                                <div class="aui-list-item-right">￥74.8</div>
                            </div>
                        </li>
                        <li class="aui-list-item">
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-title">优惠金额</div>
                                <div class="aui-list-item-right">-￥8.00</div>
                            </div>
                        </li>
                        <li class="aui-list-item">
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-title">运费</div>
                                <div class="aui-list-item-right">￥8.00</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--信息列表 end-->
                <div class="aui-content aui-margin-b-15">
                    <ul class="aui-list aui-form-list liuyan">
                        <li class="aui-list-item">
                            <div class="aui-list-item-inner">
                                <div class="aui-list-item-label">买家留言：</div>
                                <div class="aui-list-item-input">
                                    <textarea placeholder="选填：输入留言信息"></textarea>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="total_sf">
                    <h2>实付金额：￥66.8</h2>
                    <p>如需发票，请到门店索取</p>
                </div>
                <!--立即下单-->
                <div style="height:4rem;"></div>
                <div class="settle_accounts lijixiadan">
                    <div class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm">立即下单</div>
                </div>
                <!--去结算 end-->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {

    },
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {

    },

}
</script>

<style>

</style>


