<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot>
      </slot>
    </div>
    <div v-if="showDot" class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index" ></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  function addClass(ele, className) {
    ele.setAttribute("class", className)
  }

  const COMPONENT_NAME = 'slide'

  export default {
    name: COMPONENT_NAME,
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      showDot: {
        type: Boolean,
        default: true
      },
      click: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSlideWidth()
        if (this.showDot) {
          this._initDots()
        }
        this._initSlide()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => {
        if (!this.slide || !this.slide.enabled) {
          return
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          if (this.slide.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    },
    activated() {
      if (!this.slide) {
        return
      }
      this.slide.enable()
      let pageIndex = this.slide.getCurrentPage().pageX
      if (pageIndex > this.dots.length) {
        pageIndex = pageIndex % this.dots.length
      }
      this.slide.goToPage(pageIndex, 0, 0)
      if (this.loop) {
        pageIndex -= 1
      }
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      this.slide.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      this.slide.disable()
      clearTimeout(this.timer)
    },
    methods: {
      refresh() {
        this._setSlideWidth(true)
        this.slide.refresh()
      },
      next() {
        this.slide.next()
      },
      _setSlideWidth(isResize) {
        this.children = this.$refs.slideGroup.children

        let width = 0
        let slideWidth = this.$refs.slide.clientWidth
        consol.logzz
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slide-item')

          child.style.width = slideWidth + 'px'
          width += slideWidth
        }
        if (this.loop && !isResize) {
          width += 2 * slideWidth
        }
        this.$refs.slideGroup.style.width = width + 'px'
      },
      _initSlide() {
        this.slide = new BScroll(this.$refs.slide, {
          scrollX: true,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: this.click
        })

        console.log("this.slide++++++++++++++++=", this.slide)

        this.slide.on('scrollEnd', this._onScrollEnd)

        this.slide.on('touchend', () => {
          if (this.autoPlay) {
            this._play()
          }
        })

        this.slide.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd() {
        let pageIndex = this.slide.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      },
      _initDots() {
        this.dots = new Array(this.children.length)
        console.log(this.dots, "+++++++++++++++=")
      },
      _play() {
        let pageIndex = this.slide.getCurrentPage().pageX + 1
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slide.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    }
  }
</script>

<style>
  .slide {
    min-height: 1px
  }

  .slide-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
  }

  .slide-item a {
    display: block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }

  .slide-item img {
    display: block;
    width: 100%;
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;
  }

  .dot {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: yellow;
  }

  .active {
    width: 20px;
    border-radius: 5px;
    background: yellowgreen;
  }

</style>
