<template>
  <div class="home_swiper home_margin_bottom" style="width: 100%; height: 0;padding-bottom:100% ">
    <swiper :options="swiperOption" ref="mySwiper2" style="min-height:220px ">
      <!-- slides -->
      <swiper-slide v-if="banner" v-for="(item,index) in banner" class="aui-slide-node bg-dark" >
        <img :src="item" alt=""
             class="swiper_img" click="returnItem(index)" style="width: 100%;height: auto"/>
      </swiper-slide>

      <!-- Optional controls -->
    </swiper>
    <div class="swiper-pagination3" slot="pagination3"></div>


  </div>
</template>
<script>
  import {swiper, swiperSlide} from "vue-awesome-swiper"
  export default {
    name: 'carrousel',
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: {
          loop: true,
          autoplay: 3500,
          speed: 1000,
          setWrapperSize: true,
          pagination: '.swiper-pagination3',
          paginationClickable: true,
          mousewheelControl: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          paginationElement: 'li',
          uniqueNavElements: false
        },
        swiperSlides: null
      }
    },
    props: {
      banner: {
        type: Array,
        default: () => {
          return []
        }
      },
      items: {
        type: Array,
        default: () => {
          return [0]
        }
      }
    } ,
    created () {
    },
    methods: {
      returnItem (index) {
      }
    }
  }
</script>
<style scoped>
  .swiper-wrapper{
    position: static!important;
  }

  .swiper-pagination3 {
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

  .swiper-pagination-bullet {
    margin: 0 0.18rem;
    background: #c7c7c7 !important;
    width: 6px;
    height: 6px;
  }

  .swiper-pagination3> .swiper-pagination-bullet-active {
    background: limegreen;
  }

  .home_margin_bottom {
    position: relative;
  }
</style>

