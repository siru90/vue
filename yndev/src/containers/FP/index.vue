<template>
    <div>
        <div class="vue_app" style="position: absolute;width: 100%">
            <!--头部-->
            <header class="aui-bar aui-bar-nav aui-bar-light">
                <div class="go-back" @click.stop="goBack">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <div class="aui-title">发票信息</div>
            </header>
            <div style="height: 3rem;"></div>
            <!--头部-->
            <div class="invoice_con">
                <p>发票类型</p>
                <div class="standard_con">
                    <li :class="1 === invoiceType ? 'active' : ''" @click.stop="changeType(1)">纸质发票
                        <i class="icon njfont nj-xuanzhong"></i>
                    </li>
                    <li class="disabled" @click.stop="loading">电子发票
                        <i class="icon njfont nj-xuanzhong"></i>
                    </li>
                    <li :class="3 === invoiceType ? 'active' : ''" @click.stop="changeType(3)">增值税发票
                        <i class="icon njfont nj-xuanzhong"></i>
                    </li>
                </div>
            </div>
            <div class="aui-content top_div">
                <ul class="aui-list aui-form-list aui-margin-b-15">
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">发票抬头</div>
                            <div class="aui-list-item-input">
                                <label>
                                    <input :disabled="invoiceType === 3 ? true : false" class="aui-radio" type="radio" name="demo2" :checked="invoiceTitle === '个人'" @click.stop="chooseType('个人')"> 个人</label> &nbsp;&nbsp;
                                <label>
                                    <input disabled class="aui-radio" type="radio" name="demo2" :checked="invoiceTitle === '单位'" @click.stop="chooseType('单位')"> 单位</label>
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item" v-show="invoiceType === 3">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">公司名称<font class="required">*</font> </div>
                            <div class="aui-list-item-input">
                                <input type="text" placeholder="输入公司名称" v-model="companyName">
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item" v-show="invoiceType === 3">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">纳税人识别号<font class="required">*</font> </div>
                            <div class="aui-list-item-input">
                                <input type="text" placeholder="输入纳税人识别号" v-model="taxpayerNo">
                            </div>
                        </div>
                    </li>
                    <li class="aui-list-item" v-show="invoiceType === 1">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-label">内容<font class="required">*</font></div>
                            <div class="aui-list-item-input">
                                <input type="text" placeholder="请输入真实姓名" v-model="personalName">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div style="height:4rem;"></div>
        <div class="settle_accounts lijixiadan">
            <div class="aui-btn aui-btn-danger aui-btn-block aui-btn-sm" @click.stop="save">保存</div>
        </div>
    </div>
</template>
<script>
import {gwToast} from "../../utils/toast";
import { MessageBox } from 'mint-ui';
import {Toast} from "../../utils/toast2";
import {mapGetters, mapMutations} from "vuex";
import * as types from "../../store/modules/gw-modules/mutation-types";
export default {
    props: {
        
    },
    data() {
        return {
            invoiceType: 1, //1纸质，2电子，3增值税发票,
            invoiceTitle: "个人",
            companyName: "",
            taxpayerNo: "",
            personalName: ""
        }
    },
    computed: {

    },
    methods: {
        //返回上一个页面
        goBack() {
            window.history.back();
        },
        //改变发票抬头
        chooseType(type) {
            this.invoiceTitle = type;
            console.log(this.invoiceTitle);
        },
        //改变发票类型
        changeType(type) {
            this.invoiceType = type;
            if (type === 3) {
                this.invoiceTitle = "单位";
            }else if(type === 1){
				this.invoiceTitle = "个人";
			}
        },
        //功能开发中
        loading() {
            MessageBox('提示', '功能开发中');
        },
        save() {
            if (this.invoiceType === 1) {
                if (this.personalName) {
                    let obj = {
                        invoiceType: this.invoiceType,
                        invoiceTitle: this.invoiceTitle,
                        personalName: this.personalName,
                    }
                    this[types.FP](obj);
                    window.history.back();
                } else {
                    Toast({
                        duration: 1600,
                        message: "发票格式错误",
                        iconClass: "aui-iconfont aui-icon-close"
                    });
                } 
            } else if (this.invoiceType === 3) {
                if (this.companyName && this.taxpayerNo) {
                    //保存到vuex中
                    let obj = {
                        invoiceType: this.invoiceType,
                        invoiceTitle: this.invoiceTitle,
                        companyName: this.companyName,
                        taxpayerNo: this.taxpayerNo,
                    }
                    this[types.FP](obj);
                    window.history.back();
                } else {
                    // Toast({
                    //     duration: 200000,
                    //     message: "操作成功成功",
                    //     iconClass: "aui-iconfont aui-icon-close"
                    // });
                    Toast({
                        duration: 2000,
                        message: "发票格式错误",
                        iconClass: "aui-iconfont aui-icon-close"
                    });
                    // var toast = new auiToast();
                    // toast.success({
                    //     title:"提交成功",
                    //     duration:60000
                    // });
                    // toast.fail({
                    //     title:"提交失败",
                    //     duration:60000
                    // });
                }
            }
            
        },
        ...mapMutations("gwModules", [
            types.FP
        ])
    },

}
</script>

<style>

</style>


