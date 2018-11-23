<template>
  <div>
    <div style="width: 100%;overflow: hidden" v-if="finalList" v-for="item in finalList">
      <position-title v-if="item.titleConfig" :titleConfig="item.titleConfig"></position-title>
      <div class="classify_ad">
        <img v-if="item.bannerConfig" src="static/image/no_data_banner.png" v-lazy="item.bannerConfig.image"
             @click='jumpEvent(item.bannerConfig)'/>
        <!--显示分类商品件数-->
      </div>


      <deatil-list v-if="item.goodsConfig" :goodsList="item.goodsConfig"
                   :routerWay=" { path:'goodsclass/'+ item.classificationId}" :scrollTop="scrollTop">
      </deatil-list>

      <!-- <div style="height: 50vw;" v-if="item.goodsList" ref="mScroll">
         <div style="width:100%; height: 100%;overflow-x: auto; position:relative;overflow-y: hidden;">
           <div style="position:relative;height:50vw;width:179vw;">

             <ul class="scroller_list cate_list"
                 style="padding: 10px 0 15px 15px;position: absolute;height:50vw;display:block;width:179vw ">
               <li v-for="val in item.goodsList" style="height:100%;">
                 <img src="static/image/demo1.png" v-lazy="val.image" @click='jumpEvent(val)'/>
                 <h3>{{val.goodsname ? val.goodsname : "&nbsp"}}</h3>
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
                            style="width: 100%;height: 100%;display: block!important;">
                 <img src="static/image/slide.png" alt="" style="height: 100%;width: auto;margin: 0"></router-link>
             </div>

           </div>
         </div>
       </div> -->
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import positionTitle from "@/components/PositionTitle"
  import DeatilList from './DetailList'
  export default {
    data () {
      return {
        finalList: [],
        scrollTop: 0
      }
    },
    components: {positionTitle, DeatilList},
    methods: {
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
          let source = res.data.data[0] || []
          let finalList = []
          if (source) {
            for (let key in source) {
              if (source[key].categoryName === '虚拟商品') {
              } else {
                source[key].keys = key
                finalList.push(source[key])
              }
            }
          }
          this.finalList = finalList.map((item) => {
            var imageData = item.imageList[0]
            var titleData = item.title
            return {
              index: item.keys,
              classificationId: item.classificationId,
              titleConfig: titleData,
              bannerConfig: imageData,
              goodsConfig: item.prod,
            }
          })
          // console.log(this.finalList, 'fffffffffffffffffff', finalList)
        })
      },
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
    },
    created () {
      this.queryRecomend()
    },
    mounted() {
      this.$nextTick(() => {
        var cjyHomeOuter = document.querySelector('#cjyHomeOuter')
        cjyHomeOuter && cjyHomeOuter.addEventListener('scroll', () => {
          this.scrollTop = cjyHomeOuter.scrollTop
        })
      })
    }
  }
</script>

<style>

</style>
