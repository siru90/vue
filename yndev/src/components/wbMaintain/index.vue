<template>
    <div id="wbxfMaintain" ref="vue_app">
        <!-- 头部 start -->
        <header class="aui-bar aui-bar-nav aui-bar-light">
            <div style="height:2.75rem;position:relative">
                <div @click="goback">
                    <div class="go-back">
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </div>
                <div class="aui-title">
                维保先锋
                </div>
            </div>
        </header>
            
            
        <translate-group :lengths="1" ref="translateGroup" @scrollBottom="loadMores">
            
        <div class="wbxfMaintain-content" >
            <!--分类广告 end-->
            <div class="banner-img">
                <img @click="gotoImgUrl()" :src="banner"/>
            </div>
            <!--分类广告start-->

            <!--导航-->
            <tab-head @tabsChange="getDataList" v-if="classifyList" :titleInfor=" classifyList?classifyList:null"></tab-head>
            <!--导航-->
            
            <!-- 关键字选项 -->
            <div class="cjy-option">  
                <ul class="cjy-list1">
                    <li :style="{width:rwidth}" class="cjy-tab-item1" v-for="(item, index) in optionList" :key="index"
                       :class="{'active-list':optionIndex == index}" @click="changeOptionIndex(index)"  ref="optionLi">{{item.goodsClassName}}  
                    </li>
                </ul>
            </div>
            <!-- 关键字选项 -->

            <!-- 数据列表-->
            <div class="active-goods-list" ref="list">
                <ul class="aui-list aui-media-list wares_list">
                <commodity-list v-if=" goodsList "
                                v-for="(item,index) in goodsList"
                                :pagePosY="pagePosY"
                                :pageHeight="pageHeight"
                                :key="index"
                                :detailInfor="translateDetailData(item)"
                                :closeOpacity="true"
                                >
                                
                </commodity-list>
                </ul>
            </div>
            <!-- 数据列表-->

            <div v-if="isShowLoadMore"
               style="color:#9a9a9a ;height:2rem!important;  width: 100%;text-align: center;  line-height: 2rem;vertical-align: middle ; background:white"
               @click.self="changeFloat">
            <LoadMoreAnimate></LoadMoreAnimate>
            加载更多
          </div>
        </div>

        </translate-group>
    </div>
</template>

<script>
import axios from 'axios'
import {showLoading, hideLoading} from "../../utils/loading";
import LoadMoreAnimate from '../../components/LoadMoreAnimate'
import tabHead from "../../components/wbMaintain/tab"
import commodityList from "../../components/CommodityList"
import {translateDetailData} from "../../utils/translateDetailData"
import TranslateGroup from "../../components/TranslateTest"
export default {
    data() {
        return {
            startCode: "11", //组合商品分类为：11
            //规格选项
            optionList:[
                {goodsClassName: "8L", code: 0, alias:"里8L"}, 
                {goodsClassName: "12L", code: 1}, 
                {goodsClassName: "16L",code: 2}, 
                {goodsClassName: "20L", code: 3}, 
                {goodsClassName: "24L", code: 4},
                {goodsClassName: "28L",code: 2}, 
                {goodsClassName: "32L", code: 3}, 
            ],
            classifyIndex: 0,  //分类下标
            classifyId: null, //分类id：goodsclassid
            optionIndex: null, //规格下标
            goodsList:[],
            resData: null,
            keyword: null,
            sortrule: "desc",
            pageSize: 5,
            pageNum: 1,
            isShowLoadMore: false,
            isTableChanges: false,
        }
    },
    props: {
        classifyList: {
            type:Array,
            default:function() {
                return []
            }
        }
    },
    components: {tabHead, commodityList, TranslateGroup, LoadMoreAnimate},
    computed: {
        rwidth() {
            return 100/this.optionList.length + '%'
        },
        //商品分类图片
        banner () {
            let classifyImageList = this.$store.state.jyModules.classifyImageList;
            console.log("----------classifyImageList------------");
            console.log(classifyImageList);
            if (!classifyImageList) {
                return "static/image/no_data_banner.png";
            }
            return classifyImageList[this.startCode] ? classifyImageList[this.startCode].image : "static/image/no_data_banner.png";
        },
        pagePosY () {
            var list = this.$refs['list']
            var top = 0
            var outerheight = this.$refs['vue_app']
            var post = this.$store.state.cjy.pagePosY
            if (list) {
            var top = list.offsetTop
            }
            return post - top
        },
        pageHeight (){
            var outerheight = this.$refs['vue_app']
            if (outerheight) {
            return outerheight.offsetHeight
            }
            return 0
        },
        // 获取当前商品分类编码
        goodsClassCode () {
            console.log(this.classifyId, "this.classifyId");
            return this.classifyIndex == 0 ? this.startCode : this.classifyId;
        },

        //计算信息
        queryConfig () {
            var queryConfig = `start=0&length=${this.pageSize}&pageNum=${this.pageNum}&goodsclasscode=${this.goodsClassCode}&sortrule=${this.sortrule}&keyword=${this.keyword}`

            queryConfig = {
                url: window.api.local_host + '/getErpGoodsInfo/queryGoodsListForPage',
                method: 'get',
                params: {
                    start: 0,
                    enterpriseid: window.api.enterpriseid,
                    length: this.pageSize,
                    isPage: true,
                    pageNum: this.pageNum,
                    goodsclasscode: this.goodsClassCode,
                    keyword: this.keyword,
                }
            }
            return queryConfig
        },
        // 详情商品列表
        newList () {
            if (this.resData) {
                return this.resData.results
            } else {
                return []
            }
        },
    },
    watch:{
        //监听config的数据变化并重新申请数据
        queryConfig(){
            this.showList(this.classifyIndex,this.classifyId)
        },
        newList(newData){
            this.goodsList = this.goodsList.concat(newData)
        }
    },
    methods:{
        goback() {
            //this.$store.dispatch("jyy/setWbxfLsitScrollTop",0)
            this.$router.replace("/main/wbxfHome")
        },
        gotoImgUrl() {
            let classifyImageList = this.$store.state.jyModules.classifyImageList;
            let url = classifyImageList[this.startCode].imageList[0].productLink;
            if(url){
                window.location.href = url;
            }
        },
        //获取分页数据的方法
        getDataList(index,id){
            if(index != this.classifyIndex){
                this.pageNum =1;
                this.keyword = null;
            }
            if (this.pageNum == 1) {
                this.loadAnimate()
                document.body.scrollTop = 0
                this.goodsList = []
            }

            this.classifyIndex = index;
            this.classifyId = id;
            this.optionIndex = null;
            
        },
        changeOptionIndex(index){
            //console.log("------getOptionList-------");
            //console.log(index);
            //console.log(this.optionList[index].goodsClassName);
            
            if(index != this.optionIndex){
                this.pageNum =1;
            }
            if (this.pageNum == 1) {
                this.loadAnimate()
                document.body.scrollTop = 0
                this.goodsList = []
            }

            this.optionIndex = index;
            console.log(this.optionIndex, "optionIndex");
            if(index == 0){
                this.keyword = this.optionList[index].alias;
            }else{
                this.keyword = this.optionList[index].goodsClassName;
            }
            

            // this.classifyIndex = 0;
        },
        showList(index,id){
            var config = this.queryConfig;
            axios(config).then(
                (res) => {
                    res = res.data;
                    hideLoading()
                    this.hideLoadMoreAnimat()
                    this.resData = res.data[0]
                }
            )
        },
        //数据转化
        translateDetailData,
        loadMores (){
            var resData = this.resData
            if (resData && this.pageNum * this.pageSize < resData.totalCount) {
                this.pageNum++
                this.showLoadMoreAnimat()
            }
        },
        //加载动画
        loadAnimate () {
            showLoading()
            setTimeout(() => {
                hideLoading()
                this.noData = true
            }, 2000)
        },
        showLoadMoreAnimat () {
            this.isShowLoadMore = true
        },
        hideLoadMoreAnimat() {
            this.isShowLoadMore = false
        },
    }
    
}
</script>

<style>
#wbxfMaintain{
    top: 0rem;
    position: absolute;
    width: 100%;
    height: 100vh;
    padding-top: 2.75rem;
    overflow: hidden;
}
.banner-img{
    width: 100%;
    height: 36vw;
    border-top: 1px solid #eaeaea;
}
.banner-img img{height: 100%;}
.wbxfMaintain-content{
    padding-bottom: 2.8rem;
}
.wbxfMaintain-content .cjy-outer{
    width: 100%;
    top: 0;
    height: 2.2rem;
    z-index: 1;
    background: white;
}
.cjy-option{
      height: 1.7rem; border-bottom:1px dashed rgb(234, 234, 234); background: #fff;
  }
.active-goods-list{
    margin-top: 0.3rem;
    background: #ffffff;
}
</style>