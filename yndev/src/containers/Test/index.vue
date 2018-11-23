<template>
    <div>
        
        <p @click="clickEvent">sdsdsafdddd</p>
        <ch ref="ch"></ch>
    </div>
</template>
<script>
    import ch from "../../components/Recharge";
    export default {
        methods: {
            clickEvent() {
                this.$refs.ch.rToast({state: 1,number: 100});
            }
        },
        components: {
            ch
        }
    }
</script>
<style>
</style>

