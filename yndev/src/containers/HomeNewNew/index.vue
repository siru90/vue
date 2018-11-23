<template>
  
    <div style="background-color:#f5f5f5" id="newnewHome" @load="contentLoad">
      <!--<mt-popup
        v-model="popupVisible"
        closeOnClickModal="true" style="width:100vw">
        <img v-lazy="activePic" alt="">
      </mt-popup>-->
      <!--图片弹出层-->
      <div v-if="popupVisible" @click.stop="hideImgCover" class="showImg"
          :style="{'width': zxPageWidth+'px','height':zxPageHeight+'px'}">
        <!--遮罩-->
        <div class="zxCover" :style="{'width': zxPageWidth+'px','height':zxPageHeight+'px'}"></div>
        <img style="width:100%" class="centerImg" :src="activePic"/>
      </div>
      <!-- <div id="pull-load-note">
        <spinner color="#ff2600" style="display:inline-block;margin-top:0.5rem;" v-if="pullStatus"></spinner> 
        <span style="display:inline-block;margin-top:0.5rem;" v-else>下拉加载更多...</span>
        
      </div> -->
      
      <div id="cjyHomeOuter"
        style=" height:100vh; overflow: auto; webkit-overflow-scrolling:touch;position: absolute;top:0;width: 100%;"
        ref="outerScroll">
        <!--<PullDownScroll>-->
        <loadmore :top-method="loadTop" @@top-status-change="handleTopChange" ref="loadmore">
          <div>        <!-- 搜索框部分 -->
            <!-- 搜索框占位 -->
            <!-- <div style="height:2.25rem;width:100%"></div> -->
            <!-- banner -->

            <!--<div class="">-->
            <!--<swiper :options="swiperOption">-->
            <!--<swiper-slide v-for="item in swiperSlides"><img v-lazy="item.image" alt="" @click='jumpEvent(item)'></swiper-slide>-->
            <!--<div class="swiper-pagination" slot="pagination"></div>-->
            <!--</swiper>-->
            <!--</div>-->
            <!-- 公告 -->

            <div class="home_swiper home_margin_bottom">
              <swiper :options="swiperOption" ref="mySwiper2" v-if="swiperSlides">
                <swiper-slide v-if="item.enable == '1' " v-for="(item,index) in swiperSlides" class="aui-slide-node bg-dark"
                              style="height:25.78vh;overflow: hidden " :key="index">
                  <img :src="item.image"
                      class="swiper_img"
                      @click="jumpEvent(item)"
                      style="height: 100% "/>
                </swiper-slide>
              </swiper>
              <div class="swiper-pagination2" slot="pagination2"></div>
            </div>

            <!-- 分类 -->
              <div class="classification">
                <div class="aui-row">
                  <div v-if="cateList" style="width:20%;height:11.9vh;" class="aui-col-5" v-for="(item, index) in cateListjyy" :key="index">
                    <!--/-->
                    <!--`static/image/classify/${index}.png`-->
                    <!--classListForPage[index]-->
                    <div style="position:relative">
                        <img style="width:100%;" src="static/image/gaiban/classitembg.png" alt="">
                        <img style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);max-width:100%;" :src="item.image " @click='jumpEvent(item)'/>
                    </div>
                    
                    
                    <div class="aui-grid-label">{{item.title}}</div>
                  </div>
                  <div style="width:20%;" class="aui-col-5">
                    <router-link to="/main/classify">
                      <div class="see_all">
                        <div style="position:relative">
                          <img style="width:100%;visibility:visible" src="static/image/gaiban/classitembg.png" alt="">
                          <img style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);max-width:100%;visibility:visible" src="static/image/gaiban/suoyoufenlei.png">
                        </div>
                        <!-- <i class="icon njfont nj-gengduo"></i> -->
                        <div style="color:#444444 !important;" class="aui-grid-label">全部分类</div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
          

            <div  :style="noticeSwiperSlides.length > 0 ? {paddingBottom:'1.5vh'} : {paddingBottom: '0'}" class="notice_con aui-content aui-margin-b-15">
              <ul v-if="noticeSwiperSlides.length > 0"  style="height:1.5rem; overflow:hidden;margin:0 4vw;background:#e4e4e4" class="aui-list aui-list-in">
                <li style="min-height:1.5rem; padding-left:0" class="aui-list-item" tapmode>
                  <div style="height: 1.5rem;padding-left:2vw;padding-right:0.2rem;" class="aui-list-item-label-icon">
                    <!-- <i class="icon njfont nj-gonggao"></i> -->
                    <div class="line-notice"><span style="visibility: hidden;">|</span></div>&nbsp;
                    <span style="font-size: 14px;color:#b50101" >公告</span>：
                  </div>
                  <div class="aui-list-item-inner" style=";height: 1.5rem;padding-right:0;">
                    <div class="noticeSwiper">
                      <Notice v-if="noticeSwiperSlides" :banner="noticeSwiperSlides"></Notice>
                    </div>
                  </div>
                  <!--<swiper :options="noticeSwiperOption">-->
                  <!--<swiper-slide v-for="slide in noticeSwiperSlides" style="height:2vh">-->
                  <!--<div style="height:2vh;line-height:2vh;overflow:hidden;margin-top:2.5vh;text-align:left;width:80vw;white-space: nowrap;text-overflow:ellipsis" @click="showNotice(slide)">-->
                  <!--{{slide.content}}-->
                  <!--</div>-->
                  <!--</swiper-slide>-->
                  <!--</swiper>-->
                </li>
              </ul>
            </div>
            <!-- <div class="home-fn-btns">
                <div class="btn-qrcode" @click="QCodePlugin('QCode');">
                  <img src="../../../static/image/gaiban/saomalingquan.png" alt="">
                </div>
                <div @click="gotoCheckTurth" class="anti-fake">
                  <img src="../../../static/image/gaiban/fangweichaxun.png" alt="">
                </div>
            </div> -->
            <div v-if="wbData.prodList.length > 0" style="" class="guess-like">
              <div class="guess-like-title" style="position:relative">
                <img style="width:16px;height:16px;display:inline-block" src="static/image/wbindexicon.png" alt="">
                  维保先锋
                  <div class="more-recommed-btn">
                    <span @click="gotoWb(wbData.img.productLink)" class="more-recommed">更多推荐</span>
                  </div>
              </div>
              <div class="guess-like-subtitle">
                前行时刻&nbsp;智能护航
              </div>
              <div v-if="wbData.img.image" @click="gotoWb(wbData.img.productLink)" class="warpTopPic">
                <img style="width:100%;height:100%" :src="wbData.img.image" alt="">
              </div>
              <!-- <div class="guess-like-content">
                <div @click="gotoGoodsDetailPage(item.goodscode)" v-for="item in wbData.prodList" :key="item.id" class="guess-like-item">
                  <div class="goodsPic">
                    <img :src="item.urllist[0].imgurl" alt="">
                  </div>
                  <p class="goodsName">{{item.goodsname}}</p>
                  <div class="goodsPrice">
                    <span style="position:absolute;left:0;bottom:0">&#65509;{{Number(item.wsprice).toFixed(2)}}</span> 
                    <cartNum v-if="item.goodstype != 3" :gwGoodsItem="item" :goodsId="item.goodsid"></cartNum>
      
                  </div>
                  
                </div>
              </div> -->
              <div class="hot-sales-warp">
                <div :style="wbWarp"  class="hot-sales-content">
                  <div @click="gotoGoodsDetailPage(item.goodscode)" v-for="item in wbData.prodList" :key="item.goodsId" class="hot-sales-item">
                    <div class="goodsPic">
                      <img  :src="item.urllist[0].imgurl" alt="">
                    </div>
                    <p class="goodsName">{{item.goodsname}}</p>
                    <!-- <p class="goodsSales">近期销售{{item.salesCount}}件</p> -->
                    <p class="goodsPrice">&#65509;{{Number(item.wsprice).toFixed(2)}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="hot-sales">
              <div class="hot-sales-title">
                  <i class="icon njfont nj-ego-hot"></i>
                  热销TOP
              </div>
              <div class="hot-sales-warp">
                <div :style="hotSalesWarp"  class="hot-sales-content">
                  <div @click="gotoGoodsDetailPage(item.goodscode)" v-for="item in hotSalesData" :key="item.goodsId" class="hot-sales-item">
                    <div class="goodsPic">
                      <img  :src="item.img" alt="">
                    </div>
                    <p class="goodsName">{{item.goodsname}}</p>
                    <!-- <p class="goodsSales">近期销售{{item.salesCount}}件</p> -->
                    <p class="goodsPrice">&#65509;{{Number(item.wsprice).toFixed(2)}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="advert">
              <!-- <img src="../../../static/image/gaiban/guangago.png" alt=""> -->
              <img @click="gotoAdContext(midAdData)" :src="midAdData ? midAdData.advertisementPicturesUrl : ''" alt="">
            </div>
            <div class="guess-like">
              <div class="guess-like-title" style="position:relative">
                <i class="icon njfont nj-cainixihuan"></i>
                  猜你喜欢
                  <div class="more-recommed-btn">
                    <span @click="gotoAllList" class="more-recommed">更多推荐</span>
                  </div>
              </div>
              <div class="guess-like-subtitle">
                性价比超高的配件，全方位保养你的爱车
              </div>
              <div class="guess-like-content">
                <div @click="gotoGoodsDetailPage(item.goodscode)" v-for="item in guessLikeData" :key="item.id" class="guess-like-item">
                  <div class="goodsPic">
                    <img :src="item.img" alt="">
                  </div>
                  <p class="goodsName">{{item.goodsname}}</p>
                  <div class="goodsPrice">
                    <span style="position:absolute;left:0;bottom:0">&#65509;{{Number(item.wsprice).toFixed(2)}}</span> 
                    <!-- <div class="add-goods-to-car">
                      <i class="icon njfont nj-gouwuche"></i>
                      
                    </div> -->
                    <cartNum v-if="item.goodstype != 3" :gwGoodsItem="item" :goodsId="item.goodsid"></cartNum>
      
                  </div>
                  
                </div>
              </div>
              <div class="search-more-like">
                <span @click="gotoAllList">查看全部推荐 > </span>
              </div>

            </div>
            <div class="xiangpu-server">
              <div class="hot-sales-title">
                  <i class="icon njfont nj-gou"></i>
                  <span>
                    象谱·全程无忧
                  </span>
                  
                  <div class="more-server-btn">
                    <span @click="gotoXpServer" class="more-serve">更多服务 </span>
                  </div>
                  
              </div>
              <div class="server-link">
                <img @click="gotoXpServer" :src="xpServers ? xpServers.advertisementPicturesUrl : ''" alt="">
              </div>
            </div>
            <div class="copyright">
              <p>Copyright©2016-2017 All Rights Reseved.</p>
              <p>象翌微链科技发展有限公司</p>
              <!-- <p>客服电话：4006-900-910</p> -->
            </div>
          </div>
        </loadmore>
    <!--</PullDownScroll>-->
      </div>
      
      <button-top v-if="elements" :elements="elements">

      </button-top>
    </div>

</template>
<script>
  import baseScroll from "../../components/BaseScroll"
  import positionTitle from "../../components/PositionTitle"
  import ButtonTop from "../../components/ButtonToTop"
  import ClassifyRecommend from './ClassifyRecommend'
  import axios from 'axios'
  import {mapMutations, mapGetters} from 'vuex'
  import {Popup, MessageBox,Loadmore,Spinner } from 'mint-ui'
  import {swiper, swiperSlide} from "vue-awesome-swiper"
  import Notice from "../../components/Notice"
  import {Toast} from "../../utils/toast2.js"
  import  API from '../../utils/url-router'
  import AnimateRefresh from "../../components/AnimateRefreshPull"
  import PullDownScroll from "../../components/PullDownScroll"
  import cartNum from '../../components/CartIconToADD/index'
  import "../../../static/script/lib/aui-pull-refresh"
  const api = window.api;
  var {goodsList, queryCollect, insertCollect, deleteCollect} = API()

  export default {
    props: {},
    components: {
      "basescroll": baseScroll,
      'positiontitle': positionTitle,
      'mt-popup': Popup,
      swiper,
      swiperSlide,
      Notice,
      ButtonTop,
      ClassifyRecommend,
      AnimateRefresh,
      PullDownScroll,
      cartNum,
      "loadmore": Loadmore ,
      spinner:Spinner
    },
    data () {
      return {
        allLoaded: true,
        pullStatus: false, //切换下拉刷新状态
        classListForPage: [
          '曲柄连杆机构',
          '配气机构',
          '进排气系统',
          '润滑系统',
          '后处理系统',
          '点火系统',
          '启动系统',
        ],
        elements: '',
        priceFontSize: "13px",
        targetValue: 0,
        timer: null,
        domCount: 0,
        myBanner: null,
        getDate: null,
        swiperOption: {
          loop: true,
          autoplay: 350000,
          speed: 1000,
          setWrapperSize: true,
          pagination: '.swiper-pagination2',
          paginationClickable: true,
          mousewheelControl: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          paginationElement: 'li',
          uniqueNavElements: false,
          initialSlide: 1,//解决第一次显示默认为最后一张的bug

        },
        isFlag:true,
        noticeSwiperOption: {
          autoplay: 3500,
          speed: 1000,
        },
//				noticeSwiperOption: {
//					autoplay: 3500,
//					setWrapperSize :true,
//					direction: 'vertical',
//					autoHeight: true
//				},
        popupVisible: false,
        activePic: '',
        // banner轮播
        swiperSlides: [{image: "static/image/no_data_banner.png"}],
        // 公告轮播
        noticeSwiperSlides: [],
        // 特惠数据、标题
        discountData: [],
        disTitle: {},
        // 分类配置数据
        cateList: [0, 1, 2, 3, 4, 5, 6,7,8],
        // erp所有分类
        erpCateList: [],
        // 特色推荐配置数据
        featuredData: [],
        // 所有分类推荐数据
        recomendData: [],
        erp_api: {},
        countLength: 0,
        finalList: [{
          recomendTitle: {
            title: '加载中',
            describe: '加载中...'
          },
          bannerImg: {image: 'static/image/no_data_banner.png'},
          goodsList: [{
            image: 'static/image/demo1.png',
          }, {
            image: 'static/image/demo1.png',
          }, {
            image: 'static/image/demo1.png',
          }, {
            image: 'static/image/demo1.png',
          }, {
            image: 'static/image/demo1.png',
          }, {
            image: 'static/image/demo1.png',
          }]
        }]
      }
    },
    computed: {
      wbData() {
        return this.$store.state.jyy.newHomeWbData
      },
      cateListjyy() {
        return this.$store.state.jyy.homeClassList
      },
      xpServers() {
          return this.$store.state.jyy.newHomeXpAdList
      },
      midAdData() {

        return this.$store.state.jyy.newHomeMidAd
      },
      hotSalesData() {
          const list = this.$store.state.jyy.hotSalesList
          list.forEach(v => {
            let imgUrl = ""
            try {
              imgUrl = this.getImgUrl(v.urllist)
            } catch (error) {
              
            }
            v.img = imgUrl
          })
        return list
      },
      guessLikeData() {
        const list = this.$store.state.jyy.guessYouLikeList
        list.forEach(v => {
          let imgUrl = ""
            try {
              imgUrl = this.getImgUrl(v.urllist)
            } catch (error) {
              
            }
          v.img = imgUrl
          v.stockCount = v.stockcount
          v.goodsType = v.goodstype
          v.goodsCode = v.goodscode
        })
        if (list.length > 9) {
          // 随机取出九个数据，且保证顺序不与原数组相同
          let randomList = []
          let indexArr = []
          while (indexArr.length < 9 ) {
            let randomIndex = parseInt(Math.random() * list.length)
            let flag = true
            for(let i = 0; i < indexArr.length; i++) {
              if (indexArr[i] == randomIndex) {
                flag = false
                break
              }
            }
            if (flag) {
              indexArr.push(randomIndex)
              randomList.push(list[randomIndex])
            }
          }
      
          return randomList
        }
    
        return list
      },
      hotSalesWarp() {
        return {
          "width": this.hotSalesData.length * 31.13 + 4 + 'vw'
        }
      },
      wbWarp() {
        return {
          "width": this.wbData.prodList.length * 31.13 + 4 + 'vw'
        }
      },
      ...mapGetters('xhModules', [
        'sessionId',
        'userInfo',
        'login',

      ]),
      getDateOne(){
        return this.$store.state.cateList;
      },
      mScrollLength() {
        if (this.$refs.mScroll && Array.isArray(this.$refs.mScroll)) {
//    		console.log("9-9-9-9-9-9-9-9", this.$refs.mScroll.length);
          return this.$refs.mScroll.length;
        }
      },
      zxPageHeight(){
        return window.innerHeight;
      },
      zxPageWidth(){
        return window.innerWidth;
      }
    },
    watch: {
      swiperSlides(v) {
        console.log(v)
      },
      getDateOne(val, oldValue){
//      console.log(val, 666);
        this.getDate = val;
      },
      domCount(newValue, oldValue) {
//  	 		console.log("0-0-0-0-0-0-0-0-0-0", newValue);
        if (newValue === this.targetValue) {

          document.body.scrollTop = window.localStorage.getItem('scolltop');
          window.localStorage.setItem('scolltop', 0);
          this.clearDomCountInterval();

        }
      },


    },

    methods: {
      testsetstse() {
        this.$router.push({
          name: "wbxfHome"
        })
      },
      gotoWb(url) {
        if (url) {
          window.location.href = url
        }
			},
      getImgUrl(urlList) {
        let imgUrl = ""
        // 尝试获取缩略图
        for (let index = 0; index < urlList.length; index++) {
          const element = urlList[index];
          if(element.imgurltype == 1) {
            imgUrl = element.imgurl
            break
          }
        }
        //尝试获取主图
        if (imgUrl == "") {
          for (let i = 0; i < urlList.length; i++) {
            const e = urlList[i];
            if(e.imgurltype == 0) {
              imgUrl = e.imgurl
              break
            }
          }
        }
        // 没办法了
        if (imgUrl == "") {
          imgUrl = "static/image/yuchaistatic.jpg"
        }
        return imgUrl
      },
      handleTopChange() {
        console.log('触发handleTopChange')
      },
      loadTop() {
        this.$store.dispatch('jyy/refreshHomeData').then(r => {
          this.$refs.loadmore.onTopLoaded();
        }).catch(e => {
          this.$refs.loadmore.onTopLoaded();
        })
        // this.$store.dispatch('jyy/getHotSalesList')
        // this.$store.dispatch('jyy/getGuessYouLikeList')
        // this.$store.dispatch('jyy/getNewHomeData')
        // this.$store.dispatch('jyy/getXpServerData')
        // setTimeout(() => {
        //   this.$refs.loadmore.onTopLoaded();
        // }, 2000);
        
      },
      
      // refreshHomeData(cb) {
      //   this.$store.dispatch('jyy/getHotSalesList')
      //   this.$store.dispatch('jyy/getGuessYouLikeList')
      //   this.$store.dispatch('jyy/getNewHomeData')
      //   this.$store.dispatch('jyy/getXpServerData')
      //   setTimeout(() => {
      //     cb()
      //   }, 1000);
      // },
      gotoAdContext(data) {
        // 点击广告可能是一个商品也可能是一个外链
        if (data.advertisementType == 1) {
          this.gotoGoodsDetailPage(data.advertisementContext)
        } else {
          window.location = data.advertisementContext
        }
      },
      gotoGoodsDetailPage(goodsCode) {
        this.$router.push({path: '/detail/' + goodsCode})
      },
      gotoAllList() {
        this.$router.push({name: "guessYouLikeList"})
      },
      gotoCheckTurth() {
        this.$router.push({name: 'checkupTruth'})
      },
      //扫一扫
       QCodePlugin(url, opts, className){
         if (!this.login) {
           this.$router.push({path: '/login'});
           return
         }
         let that = this;
         this.isFlag = true;
         cordova.exec(success, fail,"QCodePlugin", "start", [className, url, opts || {}]);
         function test(request) {
           let req = JSON.parse(request);
         };
         function success(request) {
           let req = JSON.parse(request);
           let date = new Date().getTime();
           if(!that.isFlag){
             return
           }
           that.isFlag = false;
           MessageBox({
            $type:'prompt',
            title: '领取提示',
            message: '请输入待领取优惠券的张数',
            showCancelButton: true,
            showInput:true,
            inputType:'number',
            inputValue:1,
            inputValidator: (val) => {
              if (val == null ||val==undefined ||val==''||val<=0||String(val).indexOf('.')!=-1) {  
                return false;
              }  
            }, 
            inputErrorMessage: '领取数量至少为1且为整数'  
          }).then(({ value, action }) => {
            that.getCoupon(req.enterpriseid,req.voucherid,value)
          }).catch(action=>{
            
          })

         };
         function fail(e) {
          MessageBox.alert('优惠券领取失败！');
         };
       },
      gotoXpServer() {
        this.$router.push({name: 'xpserver'})
      },
      ...mapMutations([
        'CATE_LIST',
        'SET_HEADER',
        'ADD_BANNER'
      ]),
      contentLoad() {

      },
     
      //上拉刷新
			dataRefresh() {
				console.log("5555555555")
				setTimeout(() => {
					this.$refs.animatexl.loadingOver()
				}, 500)
			},
      // 请求banner数据
      queryBanner() {
        axios.post(api.local_host + '/resourceLevel/resourceLevelListH5', {
          enterpriseId: api.enterpriseId,
          relPosition: 'HomePageBanner'
        }).then((res) => {
          let data = res.data.data[0]
//        console.log(data);
          this.swiperSlides = data
        })
      },

      // 请求公告数据
      queryNotice() {
        axios.get(api.local_host + '/bulletin/qryBulletinListFromH5?status=1&enterpriseid=' + api.enterpriseId).then((res) => {
          let data = res.data.data[0]
          this.noticeSwiperSlides = data
//					console.log(this.noticeSwiperSlides,'公');
        })
      },

      // 请求分类配置数据
      queryCate() {
        return axios.post(api.local_host + '/resourceLevel/resourceLevelListH5', {
          enterpriseId: api.enterpriseId,
          relPosition: 'MallNavigation'
        })
      },

      // 请求erp分类接口
      queryErpCate() {
        return axios.get(api.mall_goods_host + 'goodsclass/getgoodsclasslist?enterpriseid=' + api.enterpriseId)
      },

      // 根据ERP分类数据和后台分类配置数据渲染分类模块
      renderCate() {
        axios.all([this.queryCate(), this.queryErpCate()]).then((axios.spread((res, erpRes) => {
          let cateConfig = res.data.data[0]
          let cateList = erpRes.data.data[0]
          this.erpCateList = cateList
          this.CATE_LIST(cateList)
          cateConfig && cateConfig.map((item, index) => {
            if (item.promotionType == 3) {
              cateList && cateList.map((val) => {
                if (val.goodsclasscode == item.title) {
                  item.classificationId = val.goodsclasscode
                  item.title = val.goodsclassname
                  item.image = val.imgurl
                  return
                }
              })
            }
          })
          this.cateList = cateConfig
        })))
      },

      sortList(){
        let list = this.recomendData
//        console.log("++++++++++++===", list)
        list.sort(this.compare('index'))

        this.finalList = list
        this.targetValue = this.finalList.length;
        this.setDomCountInterval();
      },
      //定义一个计时器，周期性的获取当前要加载的dom的数量
      setDomCountInterval() {
        this.timer = setInterval(() => {
          if (this.$refs.mScroll && Array.isArray(this.$refs.mScroll)) {
            this.domCount = this.$refs.mScroll.length;
          }
        }, 10);
      },
      //清除用于周期性的获取当前要加载的dom的数量的计时器

      clearDomCountInterval() {
        clearInterval(this.timer);
      },
      //隐藏遮罩层
      hideImgCover(){
        this.popupVisible = false;
        this.activePic = '';
      },
      // 点击图片跳转逻辑处理
      jumpEvent(item) {
        if (item.promotionType == 3) {
          // 跳到分类页
          this.$router.push({path: '/main/goodsclass/' + item.classificationId})
        } else if (item.promotionType == 2) {
          // 弹出活动图
          this.activePic = item.activePicture
          this.popupVisible = true
        } else if (item.promotionType == 4) {
          //this.$router.push({path: '/main/activePage'})
          if(item.productLink.indexOf("http") != -1){
            //window.location.href=item.productLink;
            window.open(item.productLink);
          }else{
            this.$router.push({path: item.productLink})
          }
        } else {
          // 跳到商品详情
          this.$router.push({path: '/detail/' + item.goodsNo})
        }
      },

      compare(property) {
        return function (a, b) {
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
        }
      },
      

       //扫码领优惠券
      getCoupon(enterpriseid,voucherid,value){
        let that = this;
        let date = new Date().getTime();
         
        axios.get(window.api.mall_sale_host + "couponManagement/getvoucherreceivelist?enterpriseid=" + enterpriseid + "&phone=" + window.phone + "&voucherid=" + voucherid +"&couponNum=" + value +"&token=" + date)
          .then(res => {
            if (res.data.returnCode == 1 || res.data.returnCode == '1') {
              MessageBox.alert('优惠券领取成功！').then(action => {
                that.$router.push('/discount');
              });
            }
            if (res.data.returnCode == -1 || res.data.returnCode == '-1') {
              MessageBox.alert(res.data.returnMsg);
            }

          })
          .catch(function (error) {
            MessageBox.alert('优惠券领取失败！');
          });
      },
      initFontSize() {
        var width = document.body.clientWidth
        console.log(width)
        if (width < 375) {
          this.priceFontSize = "10px"
        }
        else if (width < 400) {
          this.priceFontSize = "13px"
        } else {
          this.priceFontSize = "15px"
        }
//        console.log(this.priceFontSize)
      }
    },
    created () {
      this.initFontSize()
      this.$store.dispatch('jyy/getHotSalesList')
      this.$store.dispatch('jyy/getGuessYouLikeList')
      this.$store.dispatch('jyy/getNewHomeData')
      this.$store.dispatch('jyy/getXpServerData')
      //this.renderCate()
      this.$store.dispatch('jyy/getHomeClassList')
      this.$store.dispatch('jyy/getNewHomeWbData')
    },
    mounted () {
      let that = this
      this.SET_HEADER({
        titlePart: {
          isHome: true,
          title: 'static/image/yc_logo.png'
          // title: 'static/image/sl-logo.jpg'
        },
        hasSearch: false,
        handlePart: {
          type: '1',
          handleClick: () => {
          }
        }
      })
      this.queryBanner()
      this.queryNotice()
      
      this.elements = this.$refs.outerScroll
    },
    updated () {


    },
    beforeDestroy() {
      console.log("这是home页面的beforeDestroy");
      this.SET_HEADER({
        titlePart: {
          isHome: true,
          title: ''
        },
        hasSearch: false,
        handlePart: {
          type: '1',
          handleClick: () => {
          }
        }
      })
    },
    beforeRouteLeave (to, from, next){

      let str = to.path.split('/')[1];

      if (str == 'detail' || to.path == 'cart') {
        var scolltop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        window.localStorage.setItem('scolltop', scolltop);
      }
      next(true);
    }
  }
</script>

<style>
  .warpTopPic {
    height: 36vw;
    margin: 0 4vw;
    border-radius: 8px;

   }
  .cart-header {
    margin-top: 3rem;
  }

  .showImg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 103;
  }

  .zxCover {
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    opacity: 0.5;
  }

  .centerImg {
    position: absolute;
    top: 35%;
  }

  .scroll {
  }

  .aui-col-5 {
    width: 25%;
  }

  .swiper-pagination2 {
    position: absolute;
    bottom: 0;
    right: 5%;
    /* -webkit-transform: translatex(-50%);
    -moz-transform: translatex(-50%);
    -ms-transform: translatex(-50%);
    -o-transform: translatex(-50%);
    transform: translatex(-50%); */
    z-index: 99;
  }

  .swiper-pagination2 > li {
    margin: 0 0.18rem !important;
    background: #c7c7c7;
    width: 6px;
    height: 6px;
  }


  .swiper-pagination2 > .swiper-pagination-bullet-active {
    background: limegreen;
  }

  .home_margin_bottom {
    position: relative;
  }

  .noticeSwiper {
    width: 80%;
    height: 100%;
  }

  .see_more {
    width: 13vw !important;
    border-radius: 0 !important;
  }

  .over-font-size {
    font-size: 11px !important;
  }

  @media screen and (max-width: 350px ) {
    .see_more {
      height: 110px;
    }
  }

  .opacity_title {
    background: rgba(255, 255, 255, 1) !important;
  }

  .mint-msgbox-input input{
    text-align: center;
  }
  .aui-bar.aui-bar-light {
    height: 2.75rem;
    line-height: 2.75rem;
  }
  #cjyHomeOuter {
    /* padding-top: 2.75rem; */
    padding-top: 2.75rem;
  }
  .classification {
    margin-bottom: 0;
    border-bottom: 0;
  }
  .classification .aui-grid-label {
    font-size: 10px;
  }
  .classification .aui-col-5 img {
  }
  notice_con.aui-content.aui-margin-b-15 {
    background: #ffffff;
  }
  .home-fn-btns {
    width: 100%;
    height: 9.3vh;
    margin-bottom: 1.5vh;
    text-align: center;
  }
  .btn-qrcode {
    margin-right: 0.5rem;
  }
  .anti-fake, .btn-qrcode {
    height: 100%;
    display: inline-block;
    width: 43.4vw;
    
  }
  .hot-sales-warp {
    background: #ffffff;
    margin-bottom: 0.5rem;
    width: 100%;
    overflow-y: hidden;
    padding-bottom: 2.6vh;
    padding-top: 0.4rem;
  }
  .hot-sales .hot-sales-title {
    background: #ffffff;
    text-align: center;
    padding-top: 0.4rem;
    color: #b50101;
    font-size: 16px;
    font-weight: normal;
  }
  .hot-sales-content {
    min-width:100%;
    overflow-y: hidden;
    overflow-x: auto;
    
  }
  .hot-sales-content .hot-sales-item {
    width: 30vw;
    height: auto;
    
    background: #ebebeb;
    margin-right: 1.13vw;
    float: left;
    font-size: 12px;
  }
  .hot-sales-content .hot-sales-item:nth-child(1) {
    margin-left: 4vw;
  }
  .hot-sales-content .hot-sales-item .goodsPic {
    height: 30vw;
    text-align: center;
    background: #ffffff;
    box-sizing: border-box;
    border: 1px solid #ededed;
  }
  .hot-sales-content .hot-sales-item .goodsPic img {
    height: 100%;
    display: inline-block;
  }
  .hot-sales-content .hot-sales-item .goodsName {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #010101;
    font-size: 0.6rem;
    line-height: 0.6rem;
    height: 1.2rem;
    margin-top: 0.2rem;
    padding: 0 0.2rem;
  }
  .hot-sales-content .hot-sales-item .goodsSales {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 12px;
    height: 8%;
  }
  .hot-sales-content .hot-sales-item .goodsPrice {
    color: #d72121;
    font-size: 14px;
    padding: 0 0.2rem 0.2rem;
  }
  .advert {
    background: #ffffff;
    width: 100%;
    height: 11.24vh;
    margin-bottom: 0.5rem;
  }
  .advert img{
    width: 100%;
    height: 100%;
  }
  .guess-like {
    background: #ffffff;
    width: 100%;
    margin-bottom: 0.5rem;

  }
  .guess-like .guess-like-title{
    background: #ffffff;
    height: 1.4rem;
    text-align: center;
    padding-top: 0.4rem;
    color: #b50101;
    font-size: 16px;
    font-weight: normal;
  }
  .guess-like-subtitle {
    font-size: 12px;
    color: #656464;
    text-align: center;
  }
  .guess-like-content {
    padding: 0 4vw;
    /* display: flex;
    justify-content: space-around;
    flex-wrap: wrap; */
    overflow: hidden;
  }
  .guess-like-content .guess-like-item {
    background: #ebebeb;
    width: 30vw;
    height: auto;
    margin-top: 1vh;
    float: left;
    margin-right: 1vw;
    position: relative;
  }
  .guess-like-content .guess-like-item:nth-child(3n) {
    margin-right: 0;
  }
  .guess-like-content .guess-like-item .goodsPic {
    text-align: center;
    height: 30vw;
    background: #ffffff;
    box-sizing: border-box;
    border: 1px solid #ededed;
    margin-bottom: 0.2rem;
  }
  .guess-like-content .guess-like-item img {
    height: 100%;
    display: inline-block;
    
  }
  .guess-like-content .guess-like-item .goodsName {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #010101;
    line-height: 0.6rem;
    font-size: 0.6rem;
    height: 1.2rem;
    word-break: break-all;
    padding: 0 0.2rem;
  }
  .guess-like-content .guess-like-item .goodsPrice {
    color: #b50101;
    font-size: 14px;
    height: 5.2vh;
    position: relative;
    padding: 0 0.2rem 0.2rem;
    margin-top: 0.8vh;
  }
  .search-more-like {
    width: 100%;
    height: 5.55vh;
    background: #ffffff;
    text-align: center;
    line-height: 5.55vh;
  }
  .search-more-like span {
    font-size: 10px;
    border: 1px solid #d9d9d9;
    color: #4b4b4b;
    padding: 1vw;
    border-radius: 0.8vw;
  }
  .add-goods-to-car {
    /* position: absolute; */
    background: #d72121;
    width: 5vw;
    height: 5vw;
    text-align: center;
    line-height: 5vw;
    border-radius: 2.5vw;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0,-50%)
    
  }
  .add-goods-to-car .nj-gouwuche {
    font-size: 14px;
    color: #ffffff;
  }
  .xiangpu-server {
    background: #ffffff;
    padding-bottom: 0.5rem;

  }
  .xiangpu-server .hot-sales-title {
        background: #ffffff;
        padding: 0.4rem;
        text-align: center;

        color: #b50101;
        font-size: 16px;
        font-weight: normal;
        position: relative;
        
  }
  .more-server-btn {
    position: absolute;
    right: 4vw;
    top: 0;
    height: 100%;
    line-height: 1.85rem;
  }
  .more-serve {
    font-size: 12px;
    color: #ff4141;
    background: #ffc3c3;
    padding: 0 1vw;
  }
  .server-link {
    margin: 0 4vw;
    height: 17.24vh;
  }
  .server-link img {
    height: 100%;
    width: 100%;
    border-radius: 1vw;
  }
  .line-notice {
    display: inline-block;
    height: 14px;
    width: 3px;
    background: #b50101;
  }
  .more-recommed-btn {
    font-size: 10px;
    font-style: normal;
    font-weight: normal;
    position: absolute;
    top: 0.5rem;
    right: 4vw;
  }
  .more-recommed {
    font-size: 12px;
    color: #ff4141;
    background: #ffc3c3;
    padding: 0 1vw;
  }
  #newnewHome .nj-gouwuche {
    font-size: 0.8rem !important;
    width: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;

    bottom: 0.2rem;
  }
  #search-input {
    font-weight: normal;
  }
  #pull-load-note {
    height: 2.8rem;
    text-align: center;
  }
</style>


