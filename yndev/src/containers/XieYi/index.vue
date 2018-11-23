<template>
    <div>
        <header class="aui-bar aui-bar-nav aui-bar-light">
            <div class="go-back" @click.stop="goBack">
                <i></i>
                <i></i>
                <i></i>
            </div>
            <div class="aui-title">推广协议</div>
        </header>
        <div style="height: 3rem;"></div>
        <div>
            <pre style="width:100%; overflow: hidden;white-space: pre-wrap">{{text}}</pre>
        </div>
    </div>
</template>
<script>
    import getXieYi from "../../utils/getXieyi";
    export default {
        data() {
            return {
                // text: ""
            }
        },
        created() {
            //请求协议
            // this.getXieYiFn();
        },
        computed: {
            text() {
                return this.$route.params.text;
            }
        },
        methods: {
            getXieYiFn() {
                let callback = (data) => {
                    this.text = data.protocol;
                }
                getXieYi(callback);
            },
            goBack() {
                window.history.go(-1);
            }
        }

    }
</script>
<style lang="">

</style>
