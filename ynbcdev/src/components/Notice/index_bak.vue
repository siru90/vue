<template>
  <div class="noticeSwiper">
    <swiper :options="swiperOption" ref="mySwiper2" class="noticeWaper" >
      <!-- slides -->
      <swiper-slide v-if="banner" v-for="(item,index) in banner" class="noticeWaper"  >
        <div style=" height: 2.25rem; line-height: 2.25rem;vertical-align: center;width:90vw;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;padding-right:1rem" v-html="item.content">
         <!--{{item.content}}-->
        </div>
      </swiper-slide>


      <!-- Optional controls -->
    </swiper>

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
      	arr: [
      		{content: "111111111111"},
      		{content: "222222222222"},
      	],
        swiperOption: {
          loop: true,
          autoplay: 3500,
          speed: 1000,
          setWrapperSize: true,
          direction : 'vertical',
          pagination: '.swiper-pagination2',
          paginationClickable: true,
          mousewheelControl: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          paginationElement: 'li',
          uniqueNavElements: false,
          onClick: (swiper) => {
//          console.log(this)
//          console.log("---------------", swiper.realIndex);
//          console.log(this.$props.banner);
						//箭頭函數this指向VUE 普通函數this指向
            let dialog = new auiDialog()
//						console.log('公告')
						dialog.alert({
							title: "通知公告",
							msg: this.$props.banner[swiper.realIndex].content,
							buttons: ['我知道了']
						}, function(ret) {
//							console.log(ret)
						})
            
          }
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
//  	console.log(swiper);
    	
    },
    mounted(){
    	
    },
    methods: {
      showNotice(item) {
				let dialog = new auiDialog()
//				console.log('公告')
				dialog.alert({
					title: "通知公告",
					msg: item.content,
					buttons: ['我知道了']
				}, function(ret) {
//					console.log(ret)
				})
			},
			
    }
  }
</script>
<style>
.noticeSwiper{
  width:100%;
  height:100%;
}
  .noticeWaper{
    height: 2.5rem !important;
  }

</style>

