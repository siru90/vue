<template>
  <!--购物车动画-->
  <div class="animate_ball_temp">

    <transition-group name="add-to-cart" style=" position:absolute;width: 2rem;height:2rem;" >
        <div class="animate_ball"  v-for="item in array" :key="item">+{{addNum}}</div>

      <!--购物车动画 end-->
    </transition-group>
  </div>
</template>

<script>
  //  import fly from "../../utils/fly"


  export default {
    data () {
      return {
        number: 0,
      }
    },
    components: {},
    methods: {

      dddd () {
        this.$store.dispatch("addCartAnimate", 1)
  }
    },
    computed: {
      array() {
        console.log(this.$store.state.jyModules.cartanimateArray)
        return this.$store.state.jyModules.cartanimateArray
      },
      addNum() {
        return this.$store.state.jyModules.cartAddNum
      }

    }
  }
</script>

<style>
  .add-add-cart-enter {
    transition: 0.35s;
  }

  .add-to-cart-enter-active {
    transform-origin: center;
    animation: bounce 200ms cubic-bezier(0.46, 0.59, 0.93, 0.35);
    /*-webkit-animation: bounce 150ms cubic-bezier(0.46, 0.59, 0.93, 0.35);*/
  }

  .add-to-cart-leave-active {
    transition: 1.5s ;
    animation: goleft 1.5s cubic-bezier(0.21, 0.85, 0.35, 0.97);
  }

  .add-to-cart-leave-to {
    /*-webkit-transform: translate(20rem,-50rem);*/
    /*-moz-transform: translate(20rem, -50rem);*/
    /*-ms-transform: translate(20rem, -50rem);*/
    /*-o-transform: translate(20rem, -50rem);*/
    transform: translate(-7.5rem,0) scale(0.2,0.2);
    /*-15*/
  }
  @keyframes  goleft {
    from {top:0}
    to{top:30rem}
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
    width: 2rem;
    height: 2rem;
    margin: auto;
    z-index: 2;
    transform-origin: center;
  }

  .animate_ball {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    background: rgba(234, 57, 57, 0.8);
    position: absolute;
    left:0;
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
    transform-origin:  center;

  }

</style>
