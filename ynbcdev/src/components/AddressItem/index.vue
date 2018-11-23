<template>
    <div>
        <li class="aui-list-item">
            <div class="aui-media-list-item-inner">
                <div class="aui-list-item-label-icon">
                    <i class="icon njfont nj-dizhi"></i>
                </div>
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-text">
                        <div class="aui-list-item-title">
                            <strong>收货人：张晓天</strong>
                            <span class="aui-font-size-14 text_c_gray"></span>
                        </div>
                        <div class="aui-list-item-right aui-font-size-14">18878996688</div>
                    </div>
                    <p>
                        <span class="aui-label aui-label-info">公司</span>&nbsp;南宁市青秀区航洋国际城A座03室</p>
                </div>
            </div>
            <div class="edit_address">
                <div class="aui-pull-left">
                    <label>
                        <input class="aui-radio" type="radio" name="demo1" checked="">&nbsp;默认地址</label>
                </div>
                <div class="aui-btn aui-btn-outlined">
                    <i class="aui-iconfont aui-icon-edit"></i>编辑</div>
                <div class="aui-btn aui-btn-outlined">
                    <i class="aui-iconfont aui-icon-trash"></i>删除</div>
            </div>
        </li>
    </div>
</template>
<script>
export default {
    props: {
        addressItemData: {
            type: {},
            default: function () {
                return {}
            }
        }
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


