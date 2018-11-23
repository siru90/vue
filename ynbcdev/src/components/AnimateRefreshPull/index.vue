<template>
  <div style=" width: 100%;overflow:hidden;position: relative"
       :class="{'cjy-animat' : lastAnimate}"
       :style="{height:boxHeight+ 'px',background:backgroundColor}">
    <div style="position:absolute;left: 50%;bottom:0;height:35px;transform: translateX(-4rem)">
      <Corw v-if="!touchEnd"
            class="cjy-corw cjy-corw-bottom" :class="{cjyCorwTop:boxHeight>=criticalHeight }"></Corw>
      <LoadMoreAnimate
        v-if="touchEnd && !lastAnimate"
        :backgroundColor="backgroundColor" style="position: absolute;bottom:0;left:0">
      </LoadMoreAnimate>
    </div>
    <div style="position: absolute;bottom:10px;width: 100%;color:#999">
      <div v-if="boxHeight<criticalHeight && !touchEnd">下拉刷新</div>
      <div v-if="boxHeight>=criticalHeight && !touchEnd">释放立即刷新</div>
      <div v-if="touchEnd && !lastAnimate">
       <span style="position:relative">

         正在加载
       </span>
      </div>
      <div v-if="touchEnd && lastAnimate">
       <span>
         刷新成功
       </span>
      </div>
      <!--<div > ok</div>-->
    </div>
  </div>
</template>

<script>
  import LoadMoreAnimate from '../LoadMoreAnimate/index';
  import Corw from './corw'

  export default {
    data() {
      return {
        boxHeight: 0,
        maxHeight: 150,
        criticalHeight: 45,
        size: 1.3,
        context: '',
        touchEnd: false,
        timeover: true,
        lastAnimate: false,
      }
    },

    components: {LoadMoreAnimate, Corw},
    props: {
      timeDeleat: {
        type: Number,
        default: 8000,
      },
      backgroundColor: {
        type: String,
        default: '#f5f5f5',
      }

    },
    methods: {

      changeMoveNow(data) {
        if (!this.touchEnd) {
          this.boxHeight = Math.min(this.maxHeight, data * 0.5)
        }
      },

      //当手指抬起时执行
      handUp() {
        console.log(this.touchEnd)
        if (!this.touchEnd) {
          if (this.boxHeight > this.criticalHeight) {
            console.log(this.boxHeight, this.criticalHeight, '.....')
            this.refreshAnimate()
            this.loadingNow()
            this.touchEnd = true // 触摸结束状态冻结
            this.tiemOut = setTimeout(() => {
              this.loadingOver()
            }, 8000)
          } else {
            this.lastAnimate = true
            this.boxHeight = 0
            setTimeout(() => {
              this.lastAnimate = false
              this.touchEnd = false
            }, 1500)
          }
        }
      },


      refreshAnimate() {
        var stateTime = 300
        var boxHeightStart = this.boxHeight

        function goBack(targetPos, startTime) {
          startTime = startTime || new Date().getTime()
          var nowTime = new Date().getTime()
          var passTiem = nowTime - startTime
          this.boxHeight = this.boxHeight - passTiem / stateTime * (boxHeightStart - this.criticalHeight)
          if (this.boxHeight > targetPos) {
            requestAnimationFrame(goBack.bind(this, targetPos, nowTime))
          } else {
            this.boxHeight = targetPos
          }
        }

        requestAnimationFrame(goBack.bind(this, this.criticalHeight, new Date().getTime()))
      },
      loadingNow() {
        this.$emit('dataRefresh')
      },
      overAnimate() {
        this.lastAnimate = true
        this.tiemOut && clearTimeout(this.tiemOut)
        this.boxHeight = this.criticalHeight
        setTimeout(() => {
          this.boxHeight = 0
        }, 1000)
        setTimeout(() => {
          this.lastAnimate = false
          this.touchEnd = false
        }, 1500)
      },
      loadingOver() {
        window.PSEvent.trigger('refreshOver')
      },

    },
    watch: {},
    computed: {},
    mounted() {
      window.PSEvent.listen('verticalPllDown', this.changeMoveNow)
      window.PSEvent.listen('verticalPllDownEnd', this.handUp)
      window.PSEvent.listen('refreshOver', this.overAnimate)
    }
  }
</script>


<style scoped>
  .cjy-animat {
    transition: all 0.5s;
  }

  .cjy-corw {
    transition: all 0.2s;
  }

  .cjy-corw-bottom {
    transform: scale(0.8) rotateZ(-180deg);
  }

  .cjyCorwTop {
    transform: scale(0.8) rotateZ(0deg);
  }
</style>
