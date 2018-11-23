<template>
  <div style="width:100%; height: 100% ">
    <div style="height: 100%;position: relative;overflow:hidden"
         id="scrollOuter"
         ref="scrollOuter">
      <div class="transition-group"
           @touchstart="loadPosition"
           @touchend="changeEnd"
           style=" width: 100%;height: 100%;"
           ref="scrollOuter">
        <transition
          :name="className"
          tag="div"
          style="position: relative">
          <div style="position: absolute;top:0; width: 100%;height: 100% "
               v-for="(list,faindex) in lengths"
               :key="faindex"
               v-if="faindex == activeIndex ">
            <vertical-scroll class="ppppp" @scrollBottom="scrollBottom" ref="verticalScroll" >
              <slot>

              </slot>
            </vertical-scroll>
          </div>
        </transition>

      </div>
    </div>
    <button-to-top @goTop="goTop"></button-to-top>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import ButtonToTop from "../ButtonToTopForTest"
  import VerticalScroll from '../VerticalScroll'
  import {mapMutations} from "vuex";
  export default {
    data() {
      return {
        className: 'goleft',
        elements: null,
        timeList: [],
        top: 0,
        newVal: 0,
        oldVal: 0,
        scrollTop: 0,
        startTime: 0,
        oldTm:0
      }
    },

    props: {
      lengths: {
        type: Number,
        default: 1
      }
    },
    components: {
      ButtonToTop,
      VerticalScroll
    },
    beforeCreate () {
//      this.$store.commit('xxy/setstoptouch', true)
    },
    created () {
      console.log( this.lengths,'mmmmmmmmmmmmm')

    },
    mounted() {
      this.elements = this.$refs.scrollOuter
      this.$nextTick(() => {
        var pos = this.$store.state.cjy.returnPos
        this.$store.state.cjy.isReturn && this.returnPos(pos) //调到指定位置
      })
    },

    methods: {
//      ...mapMutations('xxy', [
//        "sethomehid"
//      ]),

      setScrollTop (data) {
        this.scrollTop = data
      },
      //记录位置手指放下的位置
      loadPosition (e)  {
        this.startX = e.changedTouches[0].clientX
        this.startY = e.changedTouches[0].clientY
        this.startTime = (new Date()).getTime()
        this.oldX = this.startX
        this.oldY = this.startY
        this.oldTm = this.startTime
      },
      //改变Activeindex
      changeEnd (e) {
        var isStoptouch = true
        var endX = e.changedTouches[0].clientX
        var endY = e.changedTouches[0].clientY
        var endTm = (new Date()).getTime()
        var X = endX - this.startX;
        var Y = endY - this.startY;
        var TM = endTm - this.startTime
        if (Math.abs(X) > Math.abs(Y) && Math.abs(X) > 60 && this.startX > 50 && isStoptouch) {
          if (X > 0) {
            var index = Math.max(0, this.activeIndex - 1)
          } else {
            var index = Math.min(this.lengths - 1, this.activeIndex + 1)
          }
          this.$store.dispatch('changeClassifyIndex', index)
        }
//        this.$store.commit('xxy/setstoptouch', true)

      },
      //滑动到底部
      scrollBottom () {
        this.$emit('scrollBottom')
      },
      //滑动大顶部
      goTop () {
        this.$refs.verticalScroll[0].goTop()
      },
      //调到指定位置
      returnPos (pos) {
        this.$refs.verticalScroll[0].gotoPosition(pos)
      },
      //刷新页面
      refresh () {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>.')
        this.$nextTick(() => {
          this.$refs.verticalScroll[0].refresh()
        })
      }
    },
    watch: {
      top(newdata, olddata) {
        this.newVal = newdata
        this.oldVal = olddata
      },
      activeIndex(newData, oldData) {
        if (newData - oldData > 0) {
          this.className = "goleft"
        } else {
          this.className = "goright"
        }
      },
    },
    computed: {
      activeIndex() {
        console.log(this.$store.state.jyModules.classifyIndex)
        return this.$store.state.jyModules.classifyIndex
      }
    },
    beforDestory () {
      this.$store.commit('cjy/SET_IS_RETURN', false)
    }
  }
</script>

<style scoped>
  .goleft-enter-active,
  .goleft-leave-active,
  .goright-enter-active,
  .goright-leave-active {
    transition: all 0.3s;
  }

  .goleft-enter,
  .goright-leave-to {
    transform: translatex(100%);
    opacity: 0.8
  }

  .goleft-leave-to,
  .goright-enter {
    transform: translatex(-100%);
    opacity: 0.8
  }
</style>
