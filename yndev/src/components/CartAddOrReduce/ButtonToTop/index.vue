<template>

    <transition name="showOrHide">
      <div @click="goToTop" class="go-to-top" style="" v-show=" top > 200 ">
        <i class="icon njfont nj-huidaodingbu"></i>
      </div>
    </transition>

</template>

<script>
  // import Hello from './components/Hello'

  export default {
    data () {
      return {
        isShow: true,
        top: 0
      }
    },
    components: {},
    created () {
    },
    methods: {
      goToTop () {
        var scrollTop = document.body.scrollTop
        var moveUnit = scrollTop/50
         function Timeout () {
          setTimeout(() => {
              scrollTop = scrollTop -  moveUnit
              document.body.scrollTop = scrollTop
              if (scrollTop > 0) {
                Timeout()
              }
            }, 10
          )
        }
        Timeout()
      }
    },
    watch: {
      changTop (newdata) {
        this.top = newdata

      },
      $route(from){
        this.top = document.body.scrollTop
      }
    },
    computed: {
      changTop (){
        return this.$store.state.jyModules.scrollTop
      }
    },
    mounted() {

      document.body.onscroll = () => {
        this.top = document.body.scrollTop
      }
    }
  }
</script>

<style>
  .go-to-top{
    display: inline-block;
    height: 2rem;
    width: 2rem;
    position: fixed;
    bottom: 3.5rem;
    right: 0.75rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.05);
    overflow: hidden;
    text-indent: 100%;
    white-space: nowrap;
    background: rgba(255, 255, 255, 0.8);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
    z-index: 99;
    border-radius: 50%;
    text-align: center;
    border: 1px solid #cfcfcf;
  }
  .go-to-top i {
    display: inline-block;
    color: #444444;
    opacity: 0.7;
    position: absolute;
    text-align: center;
    width: 2rem;
    height: 2rem;
    left: -1px;
    top: 0.45rem;
    text-indent: 0;
  }

  .showOrHide-enter-active, .showOrHide-leave-active {
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    -ms-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
    transition: 0.5s;
  }

  .showOrHide-enter, .showOrHide-leave-to {
    opacity: 0;
  }

</style>
