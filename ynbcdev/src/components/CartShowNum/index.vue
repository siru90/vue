<template>
  <div class="right_icon"  style="overflow: visible;top: 0;right:2vw;" ref="cartIcon">
    <a class="shopping_cart" :class="{'card-bounce': isClass } " style="position: relative;z-index: 5; " @click="goToCart">
      <i class="icon njfont nj-gouwuche"></i>
      <div class="aui-badge" style="left: 1.5rem;transform: translateX(-50%);">{{cartNum}}</div>
    </a>
    <div class="animate_ball_temp" ref="ballIcon">
      <transition-group v-if="transitionName" :name="transitionName" style=" position:absolute;width: 2rem;height:2rem;pointer-events:none" @beforeLeave="leave">
            <div class="animate_ball"  v-for=" item in array" :key="item">+{{addNum}}</div>
        <!--采购车动画 end-->
      </transition-group>
    </div>
  </div>
</template>
<script >
  import {mapGetters} from "vuex";
  //  import AnimateBalls from "../AnimateBall"

  export default {

    props: {},
    components: {
//      AnimateBalls
      transitionName: null
    },

    data() {
      return {
        isClass: false,
        transitionName:null
      }
    },
    computed: {
      ...mapGetters([]),
      ...mapGetters({
        cartNum: 'gwModules/cartNum'
      }),
      animateNum () {
        return this.$store.state.jyModules.cartanimateNumber
      },
      array() {
        return this.$store.state.jyModules.cartanimateArray
      },
      addNum() {
        return this.$store.state.jyModules.cartAddNum
      }
    },
    methods: {
      //点击事件跳转进入我的采购车


      goToCart () {
        this.$router.push({path: "/cart"});
      },
      addAnimate() {
        setTimeout(() => {
          if (this.clearTimeOut) {
            clearTimeout(this.setTimeOut)
          }
//          this.isClass = false
          this.isClass = true
          this.setTimeOut = setTimeout(() => {
            this.isClass = false
          }, 480)
        }, 1800)
        // console.log(this.$store);
      },
      leave (ele, done) {
//        Velocity(ele, {translateY: "-15rem"},{complete: done})
//        Velocity(ele, {translateY: "-15rem"})
        var Y = this.$refs.cartIcon.getBoundingClientRect().top - this.$refs.ballIcon.getBoundingClientRect().top
        ele.style.WebkitTransform = `translateY(${Y-10}px) scale(0.2,0.2)`
      }
    },
    watch: {
      animateNum () {
        this.addAnimate()
      }
    },
    mounted () {
      if(this.$refs.cartIcon.getBoundingClientRect().left < 150){
        this.transitionName = "add-to-cart-left"

      }else{
        this.transitionName = "add-to-cart"

      }
    }


  }
</script>

<style lang="less">
  @fjewo: 3rem;
  .add-add-cart-enter, .add-to-cart-left-enter {
    transition: 0.35s;
  }

  .add-to-cart-enter-active, .add-to-cart-left-enter-active {
    transform-origin: center;
    animation: bounce 200ms cubic-bezier(0.46, 0.59, 0.93, 0.35);
    -webkit-animation: bounce 150ms cubic-bezier(0.46, 0.59, 0.93, 0.35);
  }

  .add-to-cart-leave-active  {
    transition: 1s;
    animation: goright 1s cubic-bezier(0.7, 0.3, 0.7, 0.4);
    -webkit-animation: goright 1s cubic-bezier(0.7, 0.3, 0.7, 0.4);
  }

  .add-to-cart-left-leave-active{
    transition: 1s;
    animation: goleft 1s cubic-bezier(0.7, 0.3, 0.7, 0.4);
    -webkit-animation: goleft 1s cubic-bezier(0.7, 0.3, 0.7, 0.4);
  }


  @keyframes goright {
    from {
      left: 0
    }
    to {
      left: 7rem
    }
  }

  @keyframes goleft {
    from {
      left: 0
    }
    to {
      left: -12rem
    }
  }

  @keyframes adddata {
    from {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
    to {
      transform: scale(1.2);
      -webkit-transform: scale(1.2);
    }
  }

  @keyframes bounce {
    from {
      transform: scale(0);
      -webkit-transform: scale(0);
    }

    65% {
      transform: scale(1.4);
      -webkit-transform: scale(1.4);
    }
    85% {
      transform: scale(0.8);
      -webkit-transform: scale(0.8);
    }
    to {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }

  .animate_ball_temp {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0rem;
    height: 0rem;
    margin: auto;
    -webkit-transform: translate(-1rem);
    -moz-transform: translate(-1rem);
    -ms-transform: translate(-1rem);
    -o-transform: translate(-1rem);
    transform: translate(-1rem);
    z-index: 2;
    transform-origin: center;
  }

  .animate_ball {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    background: rgba(234, 57, 57, 0.8);
    position: absolute;
    left: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 1rem;
    color: white;
    line-height: 2rem;
    text-align: center;
    vertical-align: middle;
    -webkit-transform-origin: center;
    transform-origin: center;
    pointer-events: none
  }
</style>


