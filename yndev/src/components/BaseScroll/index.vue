<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from "better-scroll";

    export default {
        props : {
            probeType : {
                type : Number,
                default : 1
            },
            click : {
                type : Boolean,
                default : true
            },
            list : {
                type : Array,
                default : function () {
                    return [];
                }
            },
            listenScroll : {
                type : Boolean,
                default : false
            },
            scrollX : {
                type : Boolean,
                default : false
            }
        },
        methods : {
            initScroll () {
                if (!this.$refs.wrapper) {
                    console.log("还没有拿到dom");
                    return false;
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType : this.probeType,
                    click : this.click,
                    scrollX: this.scrollX,
                    scrollY: !this.scrollX,
                    preventDefault: false
                });
                // console.log(this.scroll);
                //如果监听scroll，绑定一个滚动事件
                if (this.listenScroll) {
                    // console.log("ssss");
                    this.scroll.on('scroll', (pos) => {
                        // console.log("ssss");
                        this.$emit('mscroll', pos)
                    });
                }
            },
            enable () {
                this.scroll && this.scroll.enable();
            },
            refresh () {
                // console.log("this.scroll", this.scroll);
                this.scroll && this.scroll.refresh();
            },
            disable () {
                this.scroll && this.scroll.disable();
            },
            scrollTo () {
                //x, y, time, easing
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
            },
            scrollToElement () {
                //el, time, offsetX, offsetY, easing
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
            }
        },
        mounted () {
            setTimeout(() => {
                this.initScroll();
            }, 20);
        },
      updated () {
          this.scroll.refresh()
      },
        watch : {
            list : function () {
                setTimeout(() => {
                    //  console.log("data变化");
                    // console.log(this.list.length);
                    this.refresh();
                }, 20);
            }
        }
    }
</script>

<style>

</style>
