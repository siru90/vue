<template>
  <div class="cjy-load-more" style="position: relative">
    <div class="cjy-load-outer">
      <span class="cjy-load-inner"
            v-for="(item, index) in 12" :key="index"
            :style="{'transform': 'translatey(-50%)' + ` rotate(${index*30}deg)`,
            'opacity':index*0.08 + 0.3} ">
      </span>
      <div
        style="position: absolute; transform:translate(-50% ,-50%);width: 0.5rem;height: 0.5rem ;left: 0;right: 0;border-radius:50%"
        :style="{background:backgroundColor}">

      </div>
    </div>
  </div>
</template>

<script>
  // import Hello from './components/Hello'

  export default {
    data() {
      return {}
    },
    components: {},
    props: {
      backgroundColor: {
        type: String,
        default: 'white'
      }
    }
  }
</script>

<style>
  .cjy-load-more {
    color: #0f8de0;
    display: inline-block;
    height: 2rem !important;
    width: 2rem;
    text-align: center;
    line-height: 2rem;
    vertical-align: middle;
  }

  .cjy-load-inner {
    background: #8b8781;
    width: 0.5rem;
    border-radius: 0.1rem;
    height: 0.12rem;
    display: inline-block;
    position: absolute;
    left: 0;
    right: 0;
    transform-origin: 0rem 50%;
    left: 0rem;
  }

  .cjy-load-outer {
    top: 50%;
    position: absolute;
    left: 50%;
    animation: mymove 1.5s linear infinite;
    -webkit-animation: mymove 1.5s linear infinite;
    animation-timing-function: steps(12, start);
    -webkit-animation-timing-function: steps(12, start);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    transform-style: preserve-3d;
    width: 0.5rem;
    height: 0.5rem;
  }

  @keyframes mymove {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }

</style>
