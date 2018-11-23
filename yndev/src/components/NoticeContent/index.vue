<template>
    <div id="noticeContent">
        <header class="aui-bar aui-bar-nav aui-bar-light opacity_title" style="left: 0px;position:fixed;top:0;height:2.75rem;display:block;">
			<div style="positon:relative; height: 2.75rem;position:relative;">
				<div class="go-back" @click.stop="goBack">
					<i></i>
					<i></i>
					<i></i>
				</div>
				<div class="aui-title">公告详情</div>
			</div>
		</header>
        <div class="notice-main" style="padding-top:3rem;padding-left:4vw;padding-right:4vw;" v-html="notice">

        </div>
    </div>
</template>
<script>
export default {
    computed: {
        notice() {
            return this.$store.state.jyy.noticeContent
        }
    },
    methods: {
        goBack() {
            // this.$router.back()
            window.history.back();
        }
    },
    mounted() {

    }
}
</script>

<style>

</style>
