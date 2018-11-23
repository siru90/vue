<template>
  <div @load="contentLoad">
    <!--<mt-popup
      v-model="popupVisible"
      closeOnClickModal="true" style="width:100vw">
      <img v-lazy="activePic" alt="">
    </mt-popup>-->
    <!--图片弹出层-->
		<div v-if="popupVisible" @click.stop="hideImgCover" class="showImg" :style="{'width': zxPageWidth+'px','height':zxPageHeight+'px'}">
			<!--遮罩-->
			<div class="zxCover" :style="{'width': zxPageWidth+'px','height':zxPageHeight+'px'}"></div>
			<img class="centerImg" :src="activePic"/>
		</div>
    <div style=" height:100vh; overflow: auto; webkit-overflow-scrolling:touch;position: absolute;top:0;width: 100%;padding-top: 3rem" ref="outerScroll">
      <div>
        <!-- 搜索框部分 -->
        <div class="header_con fixed_div" style="position:static;">
          <div class="search_con">
            <!--<li id="authenticity_inquiry">
                        <i class="icon njfont nj-fangwei"></i>
                        <span @click="goIsTrue">真伪查询</span>
                    </li>-->
            <li id="authenticity_inquiry" @click="QCodePlugin('QCode')">
              <i class="icon njfont nj-saoyisao"></i>
              <span>扫一扫</span>
            </li>
            <div class="commodity_search">
              <!--<input type="text" />
                        <i class="icon njfont nj-sousuo"><span>&nbsp;商品搜索</span></i>-->
              <div class="aui-searchbar-input">
                <i class="icon njfont nj-sousuo"></i>
                <input type="search" placeholder="商品搜索" id="search-input" @click="$router.push({path:'/searchbar'})">
                <div class="aui-searchbar-clear-btn">
                  <i class="aui-iconfont aui-icon-close"></i>
                </div>
              </div>
            </div>
            <div class="aui-pull-right">
              <!--<li>
                            <i class="icon njfont nj-saoyisao"></i>
                            <span>扫一扫</span>
                        </li>暂时隐藏8月再开发-->
              <!--<li>
                            <i class="icon njfont nj-fukuanma"></i>
                            <span>付款码</span>
                        </li>-->
            </div>
          </div>
        </div>
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
                          style="height:13rem;overflow: hidden " :key="index">
              <img :src="item.image"
                   class="swiper_img"
                   @click="jumpEvent(item)"
                   style="height: 100% "/>
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination2" slot="pagination2"></div>
        </div>

        <div class="notice_con aui-content aui-margin-b-15">
          <ul class="aui-list aui-list-in">
            <li class="aui-list-item" tapmode>
              <div class="aui-list-item-label-icon">
                <i class="icon njfont nj-gonggao"></i>
              </div>
              <div class="aui-list-item-inner" style=";height: 2.25rem;">
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
        <!-- 分类 -->
        <div class="classification">
          <div class="aui-row">
            <div v-if="cateList" class="aui-col-5" v-for="(item, index) in cateList" :key="index">
              <!--/-->
              <!--`static/image/classify/${index}.png`-->
              <!--classListForPage[index]-->
              <img v-lazy="item.image " @click='jumpEvent(item)'/>
              <div class="aui-grid-label">{{item.title}}</div>
            </div>
            <div class="aui-col-5">
              <router-link to="/main/classify">
                <div class="see_all">
                  <img src="static/image/demo1.png">
                  <i class="icon njfont nj-gengduo"></i>
                  <div class="aui-grid-label">查看全部</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <!-- 特惠 -->
        <!--<div class="classify_con">
                <positiontitle :titleConfig="disTitle"></positiontitle>
                <basescroll class="scroll" :list='discountData' :scrollX="true">
                    <ul class="scroller_list discount_list">
                        <li v-for="item in discountData" @click='jumpEvent(item)'>
                            <img v-lazy="item.image"/>
                            <div class="suggest">
                                <h3>{{item.goodsname}}</h3>
                                <p>{{item.goodsspec}}</p>
                                <p class="original_price">原价
                                    <del>¥{{parseFloat(item.discountprice).toFixed(2)}}</del>
                                </p>
                                <p><span>活动价&nbsp;¥<em>{{parseFloat(item.wsprice).toFixed(2)}}</em></span>/{{item.goodsunit}}</p>
                            </div>
                            <cart-icon-to-add :goodsId="parseInt(item.goodsId)"></cart-icon-to-add>
                        </li>
                        <div class="see_more">
                            <router-link to=""><span>查看更多<i class="icon njfont nj-xianghou"></i></span></router-link>
                        </div>
                    </ul>
                </basescroll>
            </div>-->
        <!-- 特色 -->
        <!--<div class="aui-row hot_recommend">
                <div class="aui-col-xs-6" v-for="item in featuredData">
                    <img v-lazy="item.image" @click='jumpEvent(item)'/>
                </div>
            </div>-->
        <!-- 分类推荐 -->
        <div class="classify_con" v-if="finalList" v-for="(item, index) in finalList" :key="index">
          <positiontitle v-if="item.recomendTitle" :titleConfig="item.recomendTitle"></positiontitle>
          <div class="classify_ad">
            <img v-if="item.bannerImg" src="static/image/no_data_banner.png" v-lazy="item.bannerImg.image"
                 @click='jumpEvent(item.bannerImg)'/>
            <!--显示分类商品件数-->
          </div>
          <div style="height: 50vw;" v-if="item.goodsList" ref="mScroll">
            <div style="width:100%; height: 100%;overflow-x: auto; position:relative;overflow-y: hidden;">
              <div style="position:relative;height:50vw;width:179vw;">
                <ul class="scroller_list cate_list"
                    style="padding: 10px 0 15px 15px;position: absolute;height:50vw;display:block;width:179vw ">
                  <li v-for="(val,index) in item.goodsList" :key="index" style="height:100%;">
                    <img src="static/image/demo1.png" v-lazy="val.image" @click='jumpEvent(val)'/>
                    <h3>{{val.goodsname ? val.goodsname : "&nbsp;"}}</h3>
                    <p><span
                      class="prices_text "
                    >¥<em
                      :style="{'font-size':priceFontSize}">{{val.wsprice ? parseFloat(val.wsprice).toFixed(2) : "&nbsp;"}}</em></span>
                      <span
                        v-if="val.goodsunit " :style="{'font-size':priceFontSize}">/{{val.goodsunit}}</span></p>
                  </li>


                </ul>
                <div class="see_more"
                     style="background-color:transparent;padding: 0;position: absolute;right: 0 ;top:10px; z-index: 2">
                  <router-link tag="div" :to="'/main/goodsclass/' + item.recomendTitle.classificationId"
                               style="width: 100%;height: 100%;display: block!important;"><img
                    src="static/image/slide.png" alt=""
                    style="height: 100%;width: auto;margin: 0"></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright">
          <p>Copyright©2016-2017 All Rights Reseved.</p>
          <p>象翌微链科技发展有限公司</p>
          <!-- <p>客服电话：4006-900-910</p> -->
        </div>
      </div>
    </div>
    <button-top v-if="elements" :elements="elements">

    </button-top>
  </div>
</template>
<script>
  import baseScroll from "../../components/BaseScroll"
  import positionTitle from "../../components/PositionTitle"
  import ButtonTop from "../../components/ButtonToTop"
  import axios from 'axios'
  import {mapMutations, mapGetters} from 'vuex'
  import {Popup, MessageBox} from 'mint-ui'
  import {swiper, swiperSlide} from "vue-awesome-swiper"
  import Notice from "../../components/Notice"
  import {Toast} from "../../utils/toast2.js"
  import  API from '../../utils/url-router'
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
    },
    data () {
      return {
        classListForPage : [
          '曲柄连杆机构',
          '配气机构',
          '进排气系统',
          '润滑系统',
          '后处理系统',
          '点火系统',
          '启动系统',
        ],
        elements:'',
        priceFontSize: "13px",
        targetValue: 0,
        timer: null,
        domCount: 0,
        myBanner: null,
        getDate: null,
        swiperOption: {
          loop: true,
          autoplay: 3500,
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
        cateList: [0, 1, 2, 3, 4, 5, 6],
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
				return window.screen.height;
			},
			zxPageWidth(){
				return window.screen.width;
			}
    },
    watch: {
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
      }

    },

    methods: {
      ...mapMutations([
        'CATE_LIST',
        'SET_HEADER',
        'ADD_BANNER'
      ]),
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
//					console.log(this)
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

      // 特惠模块
      // queryDiscount() {
      // 	// 商品列表
      // 	axios.post(api.local_host + '/resourceLevel/resourceLevelListH5', {
      // 		enterpriseId: api.enterpriseId,
      // 		relPosition: 'preferential'
      // 	}).then((res) => {
      // 		let data = res.data.data[0]
      // 		this.renderDiscound(data)
      // 	})
      // 	// 资源位标题
      // 	axios.post(api.local_host + '/resourceLevel/resourceLevelListH5', {
      // 		enterpriseId: api.enterpriseId,
      // 		relPosition: 'preferentialTitle'
      // 	}).then((res) => {
      // 		let data = res.data.data[0][0]
      // 		this.disTitle = data
      // 	})
      // },

      // renderDiscound(configData) {
      // 	let ids = ''
      // 	configData && configData.map((item) => {
      // 		if(item.goodsNo!=null){
      // 			ids += item.goodsNo + ','
      // 		} else {
      // 			ids += '0900002,'
      // 		}
      // 	})
      // 	const self = this
      // 	axios.get(api.mall_goods_host + 'goodsRestApi/queryGoodsList?enterpriseid=' + api.enterpriseId +"&goodscode=" + ids).then((res) => {
      // 		var dataSource = res.data.data
      // 		dataSource && dataSource.map((item,index) => {
      // 			let val = configData[index]
      // 			val.goodsname = item.goodsname
      // 			val.goodsspec = item.goodsspec
      // 			val.goodsunit = item.goodsunit
      // 			val.wsprice = item.wsprice
      // 			val.discountprice = item.discountprice
      // 			val.goodsId = item.goodsid
      // 		})
      // 		self.discountData = configData
      // 	})
      // },

      // queryFeatured() {
      // 	axios.post(api.local_host + '/resourceLevel/resourceLevelListH5', {
      // 		enterpriseId: api.enterpriseId,
      // 		relPosition: 'FeaturedRec'
      // 	}).then((res) => {
      // 		let data = res.data.data[0]
      // 		this.featuredData = data
      // 	})
      // },


//      api.local_host
      queryRecomend() {
        let queryClassifyPic = api.local_host + "/resourceLevel/queryResourceLevel"
        axios({
          url: queryClassifyPic,
          method: "post",
          data: {
            "enterpriseId": api.enterpriseId,
            "pc": false
          }
        }).then((res) => {
          let source = res.data.data[0]
          if (source) {
            for (let key in source) {
              if (source[key].categoryName === '虚拟商品') {
              } else {
                this.countLength += 1
                let titleConfig = source[key].title
                let bannerConfig = source[key].imageList[0]
                let goodsConfig = source[key].prod
                titleConfig.classificationId = source[key].classificationId
                this.renderRecomendCate(titleConfig, bannerConfig, goodsConfig, key)
              }
            }
          }
        })
      },

      renderRecomendCate(titleConfig, bannerConfig, configData, index, classificationId) {
        let ids = ''
        configData && configData.map((item) => {
          if (item.goodsNo) {
            ids += item.goodsNo + ','
          }
        })
        let self = this
        if (ids) {
          axios.get(goodsList + "&goodscode=" + ids).then((res) => {
            let dataSource = res.data.data
            console.log(dataSource , 'dataSource')
            dataSource && configData.map((pp, i) => {
              let val = configData[i]
              var goodsNo = val.goodsNo
              var item = dataSource.find((ele) => {
                  return parseInt(ele.goodscode) == parseInt(goodsNo)
                }) || {}

//              console.log("index",i,"vae",goodsNo , item.goodscode)
              if (val) {
                val.goodsname = item.goodsname
                val.goodsspec = item.goodsspec
                val.goodsunit = item.goodsunit
                val.wsprice = item.wsprice
                val.discountprice = item.discountprice
              }
            })
            self.recomendData.push({
              recomendTitle: titleConfig,
              bannerImg: bannerConfig,
              goodsList: configData,
              index
            })
//            console.log("self.recomendData", self.recomendData)
            if (self.countLength == self.recomendData.length) {
              self.sortList()
            }
          })
        } else {
          self.recomendData.push({
            recomendTitle: titleConfig,
            bannerImg: bannerConfig,
            goodsList: [],
            index
          })
          if (self.countLength == self.recomendData.length) {
            self.sortList()
          }
        }
      },

      sortList(){
        let list = this.recomendData
        console.log("++++++++++++===", list)
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

      //扫一扫
       QCodePlugin(url, opts, className){
         if (!this.login) {
           this.$router.push({path: '/login'});
           return
         }
         let that = this;
         cordova.exec(success, fail,"QCodePlugin", "start", [className, url, opts || {}]);
         function test(request) {
           let req = JSON.parse(request);
           alert(req);
         };
         function success(request) {
           let req = JSON.parse(request);
           let date = new Date().getTime();
           axios.get(window.api.mall_sale_host + "couponManagement/getvoucherreceivelist?enterpriseid=" + req.enterpriseid + "&phone=" + window.phone + "&voucherid=" + req.voucherid + "&token=" + date)
             .then(res => {
               if (res.data.returnCode == 1 || res.data.returnCode == '1') {
                 MessageBox.confirm('优惠券领取成功！').then(action => {
                   that.$router.push('/discount');
                 });
               }
               if (res.data.returnCode == -1 || res.data.returnCode == '-1') {
                  MessageBox.alert(res.data.returnMsg);
               }

             })
             .catch(function (error) {
               MessageBox.confirm('优惠券领取失败！');
             });

         };
         function fail(e) {
          MessageBox.confirm('优惠券领取失败！');
         };
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
        console.log(this.priceFontSize)
      }
    },
    created () {
      this.initFontSize()
    },
    mounted () {
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
      this.renderCate()
      //this.queryDiscount()
      //this.queryFeatured()
      this.queryRecomend()
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

<style >
  .cart-header {
    margin-top: 3rem;
  }
	.showImg{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 103;
	}
	.zxCover{
		position: absolute;
		top: 0;
		left: 0;
		background: black;
		opacity: 0.5;
	}
	.centerImg{
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
    bottom: 0.6rem;
    left: 50%;
    -webkit-transform: translatex(-50%);
    -moz-transform: translatex(-50%);
    -ms-transform: translatex(-50%);
    -o-transform: translatex(-50%);
    transform: translatex(-50%);
    z-index: 99;
  }
  .swiper-pagination2>li {
    margin: 0 0.18rem!important;
    background: #c7c7c7;
    width: 6px;
    height: 6px;
  }

  /*.swiper-pagination-bullet {*/
    /*margin: 0 0.18rem!important;*/
    /*background: #c7c7c7;*/
    /*width: 6px;*/
    /*height: 6px;*/
  /*}*/

  .swiper-pagination2>.swiper-pagination-bullet-active {
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
</style>


