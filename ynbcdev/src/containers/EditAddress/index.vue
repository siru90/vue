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
                <div class="aui-title">新增地址</div>
                <div class="aui-pull-right text-del">保存</div>
            </header>
            <div style="height: 3rem;"></div>
            <!--头部-->
            <div class="aui-content top_div">
                <ul class="aui-list aui-form-list aui-margin-b-15">
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">城市 </div>
                            <div class="aui-list-item-input">
                                南宁市
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">区域</div>
                            <div class="aui-list-item-input aui-list-item-arrow">
                                <div id="picker1">请选择</div>
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">小区/大厦</div>
                            <div class="aui-list-item-input aui-list-item-arrow">
                                <p>请选择</p>
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item menpai">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">门牌号</div>
                            <div class="aui-list-item-input">
                                <textarea placeholder="如：E座526单元"></textarea>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="aui-list aui-form-list aui-margin-b-15">
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">姓名 </div>
                            <div class="aui-list-item-input">
                                <input type="text" placeholder="输入收货人姓名">
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">性别</div>
                            <div class="aui-list-item-input">
                                <label>
                                    <input class="aui-radio" type="radio" name="demo1"> 先生</label> &nbsp;&nbsp;
                                <label>
                                    <input class="aui-radio" type="radio" name="demo1"> 女士</label>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="aui-list aui-form-list aui-margin-b-15">
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">标签</div>
                            <div class="aui-list-item-input aui-list-item-arrow">
                                <p id="picker2">选择“家、公司”标签</p>
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <label>
                                <input class="aui-checkbox" type="checkbox" name="demo1">&nbsp;设为默认地址</label>
                        </div>
                    </li>
                </ul>
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


