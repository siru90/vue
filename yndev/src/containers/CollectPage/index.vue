<template>
  <div class="order_list_div" style="position: absolute;width: 100%">
    <!--头部-->
    <header class="aui-bar aui-bar-nav aui-bar-light opacity_title" @click="$router.go(-1)">
      <div class="go-back">
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div class="aui-title">我的收藏</div>
    </header>
    <div style="height:3.75rem;"></div>
    <div class="centent top_div">
      <!--商品列表-->
      <div class="aui-content">
        <ul class="aui-list aui-media-list commodity_list subtotal_list">
          <li class="aui-list-item">
            <div class="aui-list-item-inner">
              收藏记录
              <div class="aui-pull-right text_c_gray">共{{collectIdInfor ? collectIdInfor.length : 0}}件</div>
            </div>
          </li>
          <li :key="index" class="aui-list-item" v-if="collectIdInfor" v-for="(item,index) in collectIdInfor"
              @click="goDetail(item.goodscode)">
            <div class="aui-media-list-item-inner">
              <div class="aui-list-item-media">
                <img :src="item.imgurl || 'static/image/demo1.png'">
              </div>
              <div class="aui-list-item-inner suggest">
                <h3>{{item.goodsname}}</h3>
                <p>{{item.goodsmodel ? "型号:" + item.goodsmodel : "&nbsp;"}}</p>
                <p style="float: left"><span
                  class="prices_text">¥<em>{{item.wsprice?parseFloat(item.wsprice).toFixed(2): ""}}</em></span>/{{item.goodsunit || "件"}}
                </p>
                <div class="del-button " @click.stop="deleteCollect(item.goodsid)"><i class="aui-iconfont aui-icon-trash"
                                                                                     style=""></i> 取消收藏
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="no_data" v-if="collectIdInfor && collectIdInfor.length <= 0  || !collectIdInfor">
          <img src="static/image/no_collection.png">
          <p>暂无收藏的商品</p>
          <div class="back_home aui-btn aui-btn-outlined" @click="$router.push('/main/home')">逛逛首页</div>
        </div>
      </div>
      <!--商品列表 end-->
    </div>
  </div>
</template>

<script>
  import API from "../../utils/url-router"
  import axios from "axios"
  import {Toast} from '../../utils/toast2'
  import * as rootTypes from "../../store/mutations-type";
  import {mapGetters, mapMutations} from "vuex";
  import {MessageBox} from 'mint-ui'
var {queryCollect, goodsList, deleteCollect} = API()
  export default {
    data () {
      return {
        collectIdList: null,
        collectIdInfor: null,
      }
    },
    components: {},
    computed: {
      sessionId () {
        return this.$store.state.xhModules.sessionId ? this.$store.state.xhModules.sessionId : ''

      }
    },
    methods: {
      ...mapMutations([
        rootTypes.SET_HEADER]),
      head () {
        var that = this
        let options = {
          titlePart: {
            isHome: false,
            title: "我的收藏"
          },
          hasSearch: false,
          handlePart: {
            type: '',
            handleClick: () => {
            }
          }
        }
        this[rootTypes.SET_HEADER](options)
      },
      goDetail (data) {
        this.$router.push('/detail/' + data)
      },
      goHome() {
        this.$router.push("/main/home")
      },
      deleteCollect (goodsId) {
        var that = this
        axios({
          url: deleteCollect,
          headers: {"sessionId": that.sessionId},
          method: "post",
          data: {"goodsId": goodsId},
        }).then(() => {
          Toast({
            message: "移除成功",
            iconClass: 'aui-iconfont aui-icon-correct'
          });
          //请求数据
          axios({
              url: queryCollect,
              method: "post",
              data: {},
              headers: {"sessionId": that.sessionId},
            }
          ).then((data) => {
            var data = data.data.data[0]
            //获取全部商品数据的方法
            that.collectIdInfor = data;
            console.log("that.collectIdInfor1" , that.collectIdInfor)

            console.log("data========", data)
          }).catch(
            this.collectIdInfor = null
          )
        })
      }
    },
    mutation() {
    },
    created () {
      this.head()
    },
    mounted () {
      var that = this
      var sessionId = this.sessionId
      if (sessionId) {
        //请求数据
        axios({
            url: queryCollect,
            method: "post",
            data: {},
            headers: {"sessionId": sessionId},
          }
        ).then((data) => {
          var data = data.data.data[0]
          //获取全部商品数据的方法
          that.collectIdInfor = data
          console.log("this.collectInfro",that.collectIdInfor)
          console.log("callll", that.collectIdInfor)
        }).catch(
          this.collectIdInfor = null
        )
      } else {
        //弹出未登录提示 点击返回上一页
        MessageBox.alert('请登录后再进入收藏页', '未登录').then(
          (data) => {
            this.$router.push("/login")
          }
        )
      }

    },

  }
</script>

<style>
  .del-button {
    position: absolute;
    right: 1px;
    bottom: 0.5rem;
    border: 1px solid rgb(204,204,204) ;
    height: 1.5rem;
    line-height: 1.5rem;
    border-radius: 0.2rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
    padding: 0 0.35rem 0 0.3rem;
    margin: 0 1rem 0 0;
  }
</style>
