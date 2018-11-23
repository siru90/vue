<template>
    <div id="recommendGoodsPage">
        <div class="recommend-content">
            <ul class="aui-list aui-media-list wares_list">
                <commodity-list 
                            v-for="item in goodsList"
                            :key="item.goodsCode"
                            :detailInfor="translateDetailData(item)">
                </commodity-list>
            </ul>
        </div>
    </div>
</template>
<script>
import commodityList from "../../components/CommodityList/index"
import {translateDetailData} from "../../utils/translateDetailData"
import {mapMutations} from 'vuex'
export default {
    components: {commodityList},
    computed: {
        goodsList() {
            const list = this.$store.state.jyy.guessYouLikeList
            list.forEach(element => {
                
            });
            // if (list.length == 0) {
            //     this.$store.dispatch("jyy/getGuessYouLikeList")
            //     return []
            // }
            return list
        }
    },
    methods: {
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
        goBack() {
            this.$router.back()
        },
        translateDetailData,
        ...mapMutations([

            'SET_HEADER',
    
        ]),
    },
    async mounted() {
      // console.log('beforeounted');
      this.SET_HEADER({
        titlePart: {
          isHome: false,
          title: '推荐商品'
        },
        hasSearch: false,
        handlePart: {
          type: '1',
          handleClick: () => {
          }
        }
      })
    }
}
</script>
<style>
    .recommend-content {
        background: #ffffff;
    }
    #recommendGoodsPage .cjy-opacity {
        opacity: 1 !important;
    }

</style>
