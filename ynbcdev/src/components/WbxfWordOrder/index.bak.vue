<template>
    <div id="wbxfyy">
        <header class="aui-bar aui-bar-nav aui-bar-light">
            <div style="height:2.75rem;position:relative">
              
                <div @click="goback" class="go-back">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
               
                <div class="aui-title">
                    新增预约工单
                </div>
                <div style="top: 50%; transform:translate(0,-50%);font-size:0.7rem;color:#0f8de0" class="right_icon">
                    保存
                </div>
            </div>
        </header>
        <div class="wbxfyy-content">
            <ul class="aui-list aui-form-list top_ul">
                <li class="aui-list-header"><span>车辆信息&nbsp;&nbsp;<span style="color:#bbb"></span></span></li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">车牌号码<span class="required-icon">*</span></div>
                        <div class="aui-list-item-input">
                            <input type="text" style="height:1.4rem;padding-left:0.2rem;color:#333;">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">发动机号</div>
                        <div class="aui-list-item-input">
                            <input type="text" style="height:1.4rem;padding-left:0.2rem;color:#333;">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">终端编号</div>
                        <div class="aui-list-item-input">
                            <input type="text" style="height:1.4rem;padding-left:0.2rem;color:#333;">
                        </div>
                    </div>
                </li>

                <li class="aui-list-header"><span>故障现象&nbsp;&nbsp;<span style="color:#bbb"></span></span></li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">故障代码</div>
                        <div class="aui-list-item-input">
                            <input type="text" style="height:1.4rem;padding-left:0.2rem;color:#333;">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div style="width:100%;display:flex;">
                        <div style="width:27%">故障描述<span class="required-icon">*</span></div>
                        <div>
                            <textarea style="margin-top:0;" placeholder="请输入故障描述">
                            </textarea>
                        </div>
                    </div>
                </li>

                <li class="aui-list-header"><span>服务选择&nbsp;&nbsp;<span style="color:#bbb"></span></span></li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务类型</div>
                        <div class="aui-list-item-input">
                            <div>
                                维保服务
                            </div>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner aui-list-item-arrow" @click="serviceshow=!serviceshow">
                        <div class="aui-list-item-label">服务商</div>
                        <div class="aui-list-item-input">
                            <span v-if="!sureServiceData" style="color:#999">选择服务商</span>
                            {{sureServiceData?sureServiceData.name:''}}
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label">服务方式</div>
                        <div class="aui-list-item-input">
                            <input type="radio" class="aui-checkbox" name="serviceMode" value="0" v-model="serviceMode" id="goShop"><label for="goShop">到店</label>
                            <input type="radio" class="aui-checkbox" name="serviceMode" value="1" v-model="serviceMode" id="toHome" style="margin-left:20%"><label for="toHome">上门</label>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-card-list" style="width:100%;padding-right:0.75rem">
                            <div class="aui-card-list-header" style="padding:0;">
                                服务地点
                            </div>
                            <div class="aui-card-list-content" v-if="serviceMode==0?true:false">
                                <input type="text" v-model="shopAddress"  placeholder="请备注门店信息" style="border:1px solid #aaa;height:1.4rem;padding-left:0.3rem;">
                            </div>
                            <div class="aui-card-list-content" v-else style="display:flex;justify-content: space-between;">
                                <input type="text" v-model="visitAddress" placeholder="请输入服务地址" style="max-width:70%;border:1px solid #aaa;height:1.4rem;padding-left:0.3rem;">
                                <div @click="goMap" style="padding:0 0.1rem;border:1px solid #aaa;height:1.4rem;text-align:center;line-height:1.4rem;border-radius:3px;">地图</div>
                                <div @click="goAddress" style="padding:0 0.1rem;border:1px solid #aaa;height:1.4rem;text-align:center;line-height:1.4rem;border-radius:3px;">地址簿</div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <mt-popup v-if="serviceSlots" v-model="serviceshow" position="bottom" popup-transition="popup-fade" style="width:100%;height:200px;">
                <mt-picker :slots="serviceSlots"
                            ref="picker2"
                            @change="onServiceChange"
                            :showToolbar="true"
                            :style="serviceshow ? 'display:block': 'display:none'"                                
                            valueKey="name"
                            >
                            <span class="mint-datetime-action mint-datetime-cancel" @click="serviceshow = !serviceshow;">取消</span>
                            <span class="mint-datetime-action mint-datetime-confirm" @click="serviceshow = !serviceshow;sureService()">确认</span>
                </mt-picker>
            </mt-popup>
        </div>
    </div>    
</template>
<script>
import {mapGetters, mapMutations, mapActions,mapState} from "vuex";
import {Picker,Popup} from 'mint-ui'
export default {
    props: {
        serviceSlots: {
            type: Array
        }
    },
    components: {
        "mt-picker": Picker,
        "mt-popup": Popup,
    },
    computed: {
        ...mapGetters('zwy', [
            'terminalInfo',
            'sureServiceData',
        ]),

    },
    data() {
        return {
            serviceshow:false,//服务商弹出框状态
        }
    },
    methods: {
        onServiceChange() {
            console.log(111)
        },
        goback() {
            this.$router.back()
        }
    }
}
</script>
<style>
    .required-icon {
        color: red;
    }
    .wbxfyy-content {
        padding-top: 2.75rem;
    }
</style>
