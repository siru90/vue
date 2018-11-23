<template>
    <div>
        <header class="aui-bar aui-bar-nav aui-bar-light opacity_title" style="left: 0px;position:fixed;top:0;height:2.75rem;display:block;">
			<div style="positon:relative; height: 2.75rem;position:relative;">
				<div class="go-back" @click.stop="goBack">
					<i></i>
					<i></i>
					<i></i>
				</div>
				<div class="aui-title">防伪查询结果</div>
			</div>
		</header>
        <div id="fraHtml" style="padding-top: 2.75rem" v-html="result">
        
        </div>
    </div>

</template>
<script>
export default {
    computed: {
        result() {
            return this.$store.state.jyy.checkTruthResult
        }
    },
    methods: {
        goBack() {
            this.$router.back()
        },
    },
    mounted() {
        // 删除原始样式
        if (document.querySelector("#fraHtml style")) {
            document.querySelector("#fraHtml style").remove()
        }
        if (document.querySelectorAll('.main_d.bg div')[2]) {
            document.querySelectorAll('.main_d.bg div')[2].style.width = "auto"
        }
        
    }
}
</script>
<style>
    #fraHtml h1{
        color: red;
        text-align: center;
    }
    .main_d.bg  div:nth-child(3) {
        background: red;
    }
</style>

