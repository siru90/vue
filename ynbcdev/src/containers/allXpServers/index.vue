<template>
    <div class="xp-contetnt">
        <ul>
            <li class="server-item" v-for="item in xpServersList" :key="item.rid">
                <div class="serve-name">
                    {{item.advertisementTitle}}
                </div>
                <div class="server-pic">
                    <img @click="gotoAdContext(item)" :src="item.advertisementPicturesUrl" alt="">
                </div>
            </li>
        </ul>
        
    </div>    
</template>
<script>
import {mapMutations} from 'vuex'
import Main from '../Main'
export default {
    computed: {
        xpServersList() {
            let data = this.$store.state.jyy.newHomeXpAdList
            let list = []
            if (data) {
                list = data.contentList
            }
            return list
        }
    },
    created() {
        if (!this.$store.state.jyy.newHomeXpAdList.contentList) {
            this.$store.dispatch('jyy/getXpServerData')
        }
    },
    data() {
        return {
            servesList: [
                {
                    name: '象谱·全程无忧',
                    title: '正品自助查询系统',
                    dir: '扫码或输入防伪查询',
                    path: '/static/img/guangago.49303c2.png'
                }
            ]
        }
    },
    methods: {
        ...mapMutations([
            'SET_HEADER',
        ]),
        gotoAdContext(data) {
        // 点击广告可能是一个商品也可能是一个外链
            if (data.advertisementType == 1) {
                this.gotoGoodsDetailPage(data.advertisementContext)
            } else {
                window.location = data.advertisementContext
            }
        },
    },
    async mounted() {
      console.log('profile', 1);
      this.SET_HEADER({
        titlePart: {
          isHome: false,
          title: '象谱·全程无忧'
        },
        hasSearch: false,
        handlePart: {
          type: '1',
          handleClick: () => {
          }
        }
      });
    }
}
</script>
<style>
.aui-bar.aui-bar-nav.aui-bar-light.opacity_title {
    height: 2.75rem;
    display: block;
}
.server-item {
    padding: 0 4vw 4vw 4vw;
    background: #ffffff;
    margin-bottom: 4vw;
}
.serve-name {
    height: 8.8vw;
    line-height: 8.8vw;
    font-size: 0.6rem;
    color: #000000;
}
.server-pic {
    height: 30.6vw;
    background: #d5dbe5;
}
.server-pic img {
    height: 100%;
    width: 100%;
}
</style>
