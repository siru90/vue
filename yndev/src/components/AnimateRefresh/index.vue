<template>
  <div style="position:relative;height: 0">
    <!--<div class="cjy-show-refresh">刷新</div>-->
    <canvas id="cjyRefresh" class="cjy-refresh-canvas" :width="34*size*ratio" :height="150*size*ratio"
            :style="{width:34*size+'px',height:150*size+'px'}"></canvas>
  </div>
</template>

<script>
  // import Hello from './components/Hello'
  function createRectLinerarGradient(context, x, y, widht, height) {
    return context.createLinearGradient(x, y, x + width, y + height)
  }
  export default {
    data () {
      return {
        ratio: 2,
        size: 1.3,
        context: '',
        maxMove: 90,
        moveNow: 0,
        maxLong: 120,
        scale: 0,
        rotate: 0,
        touchEnd: false,
        changePI: 0,
        timeover: true,
      }
    },

    components: {},
    props: {
      timeDeleat: {
        type: Number,
        default: 8000,

      }
    },
    methods: {
      createdCanvas(){
        var canvas = document.querySelector('#cjyRefresh')
        if (!canvas.getContext) {
          return
        }
        var context = canvas.getContext('2d')
        var devicePixelRatio = window.devicePixelRatio || 1
        var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1
        this.ratio = devicePixelRatio / backingStoreRatio
        this.context = context
        setTimeout(() => {
          this.initCanvas()
        })
      },
      initCanvas (){
        var size = this.size
        var context = this.context
        context.beginPath()
        context.scale(this.ratio, this.ratio);
        context.translate(17 * size, -17 * size)
        context.save()
      },


      // 执行动画1帧的绘制
      drawCanvas () {
        this.clearCanvas()
        this.drawCile()
        this.drawArrow()
        this.drawStrokeCile()
      },
      //绘制圆形白色背景
      drawCile () {
        var context = this.context
        var size = this.size
        context.save()
        context.beginPath()
        this.context.translate(0, this.moveNow)
        var gradient = context.createRadialGradient(0, 0, 0, 0.5, 1.5, 15 * size) //渐变色
        gradient.addColorStop(0, 'rgba(0,0,0,0.6)')
        gradient.addColorStop(1, 'transparent')
        context.fillStyle = gradient
        context.arc(0, 0, 15 * size, 0, 2 * Math.PI, false) // 阴影
        context.fill()
        context.beginPath()
        context.fillStyle = 'white'
        context.arc(0, 0, 12 * size, 0, 2 * Math.PI, false) // 白色背景
        context.fill()
        context.restore()
      },
      //清除画布
      clearCanvas () {
        var size = this.size
        this.context.clearRect(-15 * size, -15 * size, 30 * size, 200 * size)
      },
      //绘制箭头的尾部
      drawStrokeCile () {
        var size = this.size
        var context = this.context
        var nowPI = -0.5 * Math.PI + this.changePI
        context.save()
        context.beginPath()
        this.context.translate(0, this.moveNow)
        context.rotate(this.rotate * Math.PI)
        context.lineWidth = 2.5 * size
        context.strokeStyle = this.arrowColor
        context.arc(0, 0, 6 * size, -0.5 * Math.PI, nowPI, false)
        context.stroke()
        context.restore()
      },
      //箭头部分
      drawArrow () {
        var size = this.size
        var height = 5 * this.scale * size
        var r = 6 * size
        var context = this.context
        context.save()
        context.fillStyle = this.arrowColor
//        context.rotate(0.3 * Math.PI)
        this.context.translate(0, this.moveNow)
        context.rotate(this.changePI + this.rotate * Math.PI)
        context.translate(0, -r)
        context.rotate(0.25 * Math.PI)
        context.fillRect(-height * 0.5, -height * 0.5, height, height)
        context.rotate(-0.25 * Math.PI)
        context.fillStyle = 'white'
        context.fillRect(0, -0.8 * height, -height, 1.6 * height)
        context.restore()
      },
      // 当手指移动的时候调用
      changeMoveNow(data){
        if (!this.touchEnd) {
          this.moveNow = Math.min(this.maxLong, data)
        }
      },

      //当手指抬起时执行
      handUp () {
        if (!this.touchEnd) {
          this.touchEnd = true
          if (this.moveNow > this.maxMove) {
            this.refreshAnimate()
          } else {
            this.overAnimate()
          }
        }
      },
      //结束动画方法 需要手动调用
      overAnimate () {
        function goBack(targetPos, startTime) {
          startTime = startTime || new Date().getTime()
          var nowTime = new Date().getTime()
          var passTiem = nowTime - startTime
          this.moveNow = this.moveNow - passTiem * 0.2
          if (this.moveNow > targetPos) {
            requestAnimationFrame(goBack.bind(this, targetPos, nowTime))
          } else {
            this.touchEnd = false
          }
        }

        setTimeout(() => {
          requestAnimationFrame(goBack.bind(this, 0, new Date().getTime()))
        }, 20)

      },
      refreshAnimate () {
        function goBack(targetPos, startTime) {
          startTime = startTime || new Date().getTime()
          var nowTime = new Date().getTime()
          var passTiem = nowTime - startTime
          this.moveNow = this.moveNow - passTiem * 0.2
          if (this.moveNow > targetPos) {
            requestAnimationFrame(goBack.bind(this, targetPos, nowTime))
          } else {
            this.loadingNow()
          }
        }

        requestAnimationFrame(goBack.bind(this, this.maxMove, new Date().getTime()))
      },
      loadingNow () {
        this.maxMove
        this.timeover = false
        this.$emit('dataRefresh')
        function goBack(targetPos, startTime) {
          startTime = startTime || new Date().getTime()
          var nowTime = new Date().getTime()
          var passTiem = nowTime - startTime
          this.rotate = this.rotate + passTiem * 0.0008 * Math.PI
          this.drawCanvas()
          if (!this.timeover) {
            requestAnimationFrame(goBack.bind(this, targetPos, nowTime))
          }
        }

        requestAnimationFrame(goBack.bind(this, 0, new Date().getTime()))
        setTimeout(() => {
          this.loadingOver()
        }, this.timeDeleat)
      },
      loadingOver () {
        this.timeover = true
        this.overAnimate()
      },

    },
    watch: {
      moveNow () {
        var maxMove = this.maxMove
        var moveNow = this.moveNow
        var scale = Math.max(moveNow / maxMove, 0)
        this.scale = Math.min(scale, 1)
        this.rotate = scale
        this.drawCanvas()
      },
      scale () {
        var beginPI = 0.2 * Math.PI
        var maxPI = 1.5 * Math.PI
        var scale = this.scale
        this.changePI = (maxPI - beginPI) * scale + beginPI
      }

    },
    computed: {


      arrowColor() {
        var scale = this.scale
        return `rgba(28, 162, 97 , ${  scale })`
      }
    },
    mounted () {
      window.PSEvent.listen('verticalPllDown',this.changeMoveNow)
      window.PSEvent.listen('verticalPllDownEnd', this.handUp)
      this.$nextTick(() => {
        this.createdCanvas()
      })


    }
  }
</script>

<style scoped>
  .cjy-show-refresh {
    width: 1.5rem;
    height: 1.5rem;
    background: white;
    border-radius: 50%;
  }

  .cjy-refresh-canvas {
    pointer-events: none;
  }
</style>
