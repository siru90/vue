<template>
    <span>{{currentNum}}</span>    
</template>
<script>
export default {
    data() {
        return {
            currentNum: 0
        }
    },
    props: {
        num: {
            type: Number,
        },
        duration: {
            type: Number,
            default: 500
        }
    },
    watch: {
        num(v) {
            if (v != 0) {
                let tt = this.duration/16
                let speedFloat = (this.num-this.currentNum)/tt
                let speed = parseInt(speedFloat) || 1
                let t = setInterval(() => {
                    
                    if ((this.num - this.currentNum) > speed) {
                        this.currentNum+=speed
                    } else {
                        this.currentNum = this.num
                        clearInterval(t)
                    }
                    
                },16)
            }
        }
    },
    mounted() {
       if (this.num != 0) {
            let tt = this.duration/16
            let speedFloat = (this.num-this.currentNum)/tt
            let speed = parseInt(speedFloat)
            let t = setInterval(() => {
                
                if ((this.num - this.currentNum) > speed) {
                    this.currentNum+= (speed || 1)
                } else {
                    this.currentNum = this.num
                    clearInterval(t)
                }
                
            },16)
        }
    },
}
</script>
<style>

</style>
