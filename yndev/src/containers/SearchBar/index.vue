<template>
  <div>
    <div class="aui-searchbar searchbar" id="search">
      <div class="aui-searchbar-input aui-border-radius">
        <i class="icon njfont nj-sousuo"></i>
        <input type="search" v-model="searchWord" placeholder="想买什么" id="search-input" autofocus>
        <div class="aui-searchbar-clear-btn" style="display:block" v-show="searchWord != '' "
             @click="searchWord = ''">
          <i class="aui-iconfont aui-icon-close"></i>
        </div>
      </div>
      <div v-if="delSpace(searchWord) == ''" class="aui-searchbar-btn " :class="{'animate-left': isappear}"
           @click="$router.go(-1)" tapmode>取消
      </div>
      <div v-else class="aui-searchbar-btn aui-text-info" :class="{'animate-left': isappear}" @click="saveLocal"
           tapmode>搜索
      </div>
    </div>
    <transition name="fade">
      <div v-show="iii">
        <div style="height:2.9rem;"></div>
        <div class="centent">
        </div>
        <!--搜索历史-->
        <div class="aui-content-padded">
          <div class="search_history"><p>搜索历史</p><i class="icon njfont nj-shanchu" @click="delHistoryInfor ()"></i>
          </div>
          <div :key="index" class="aui-btn" v-for="(item,index) in historySearch" v-if="historySearch" @click=" changeSearchWord(item) ">{{item}}</div>
        </div>
        <!--搜索历史 end-->
        <!--热门搜索-->
        <div class="aui-content-padded">
          <p>热门搜索</p>
          <div :key="index" class="aui-btn" v-for="(item,index) in hotSearch" @click=" changeSearchWord(item) ">{{item}}</div>
          &nbsp;

        </div>
        <!--热门搜索 end-->
      </div>
    </transition>
  </div>
</template>

<script>
  // import Hello from './components/Hello'
  export default {
    data () {
      return {
        iii: false,
        searchWord: "",
        hotSearch: [
          "轮胎", "发动机", "润滑油", "雨刷"
        ],
        historySearch: [],
        isappear: true

      }
    },
    components: {},
    methods: {
      //初始化历史搜索记录
      initHistorouSearch () {
        var historySearch = JSON.parse(localStorage.getItem('ynsearchHistory'))
        if (historySearch) {
          this.historySearch = historySearch
        }
      },
      //保存到历史记录中
      saveLocal (count = 8) {
        console.log("执行")
        var searchWord = this.delFESpace(this.searchWord)
        var localSearchData = JSON.parse(localStorage.getItem('ynsearchHistory'))
        if (searchWord) {
          if (localSearchData) {
            var index = localSearchData.indexOf(searchWord)
            //   历史记录去重
            if (index != -1) {
              localSearchData.splice(index, 1)
            }
            localSearchData.unshift(searchWord)
            //限制历史搜索长度
            if (localSearchData.length > count) {
              //当超出规定长度将被删除
              localSearchData.pop()
            }
            localStorage.setItem('ynsearchHistory', JSON.stringify(localSearchData))
          }
          else {
            localStorage.setItem('ynsearchHistory', JSON.stringify([searchWord]))
          }
        }
        // 跳转到详情页
        this.$router.replace("/searchresult?keyword=" + searchWord + '&from=phone')
      },
      //删除历史记录
      delHistoryInfor () {
        localStorage.removeItem('ynsearchHistory')
        this.historySearch = []
      },
      changeSearchWord (item) {
        this.searchWord = item

        this.saveLocal()
      },
      //去掉空格
      delSpace (str) {
        return str.replace(/(\s+)/g, "")
      },
      // 去掉首位空格
      delFESpace (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "")
      }
    },

    computed: {},
    mounted () {
      setTimeout(() => {
        this.iii = true
      }, 20)

    },
    created () {
      this.initHistorouSearch()
    }

  }
</script>

<style scoped>
  .aui-btn {
    margin-right: 0.3rem;
  }

  .aui-border-radius {
    width: 200px !important;
    -webkit-box-flex: 1;
  }

  .animate-left {
    isplay: block;
    margin-right: 0 !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: transform 0.5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
  {
    transform: translatex(100%);
  }

  /*#search{*/
  /*width: 18rem;*/
  /*}*/
</style>
