<template>
    <div>
        
    </div>
</template>
<script>
    import getXieYi from "../../utils/getXieyi";
    export default {
        data() {
            return {
                text: ""
            }
        },
        created() {
            //请求协议
            getXieYiFn();
        },
        methods: {
            getXieYiFn() {
                let callback = (data) => {
                    this.text = data.protocol;
                }
            }
        }

    }
</script>
<style lang="">
    
</style>