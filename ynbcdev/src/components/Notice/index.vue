<template>
  <div class="noticeSwiper">
    <swiper :options="swiperOption" ref="mySwiper2" class="noticeWaper" >
      <!-- slides -->
      <swiper-slide v-if="banner" v-for="(item,index) in banner" class="noticeWaper">
        <div class="notice-item" style=" height: 1.5rem; line-height: 1.5rem;vertical-align: center;" v-html="item.title">
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
            // let dialog = new auiDialog()
						// dialog.alert({
						// 	title: "通知公告",
						// 	msg: this.$props.banner[swiper.realIndex].content,
						// 	buttons: ['我知道了']
						// }, function(ret) {
						// })
            this.$router.push({name:"noticeContent"})
            this.$store.dispatch("jyy/setNoticeContent", this.$props.banner[swiper.realIndex].content)
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
    height: 1.5rem !important;
    font-size: 14px;
    color: #3f3f3f;
    line-height: 1.5rem;
  }
  .notice-item {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }


</style>

