<template>
    <div>
        <header class="aui-bar aui-bar-nav aui-bar-light opacity_title" style="left: 0px;position:fixed;top:0;height:2.75rem;display:block;">
			<div style="positon:relative; height: 2.75rem;position:relative;">
				<div class="go-back" @click.stop="goBack">
					<i></i>
					<i></i>
					<i></i>
				</div>
				<div class="aui-title">防伪查询</div>
			</div>
		</header>
        <div class="check-content">
            <div class="form-content">
                <div class="form-left">
                    <div class="form-item">
                        <label style="padding-top:0;">标签码<span class="required-icon">*</span></label>
                        <div class="form-item-right">
                            <input v-model="bqCode" id="bqCode" type="text">
                        </div>
                        
                    </div>
                    <div class="form-item">
                        <label>验证码<span class="required-icon">*</span></label>
                        <div class="form-item-right yz-right">
                            <input v-model="yzCodeInput" id="yzCode" type="text">
                            <button  @click="setYzCode">{{yzCode}}</button>
                        </div>
                        
                    </div>
                </div>
                <div :style="!inputEmpty?'background:rgba(181, 1, 0, 1);' :'background:rgba(181, 1, 0, 0.5);'" @click="doCheckTruth" class="form-right">
                    查询
                </div>
            </div>
            <ul class="check-help">
                <li>
                    <div class="help-title">
                        一代防伪查询
                    </div>
                    <div class="help-img">
                        <img src="static/image/gaiban/checktruth1.png" alt="">
                    </div>
                </li>
                <li>
                    <div class="help-title">
                        二代防伪查询
                    </div>
                    <div class="help-img">
                        <img src="static/image/gaiban/checktruth2.png" alt="">
                    </div>
                </li>
                <li>
                    <div class="help-title">
                        三代彩色二维码防伪查询
                        <button @click="gotoYZZW">去验证真伪> ></button>
                    </div>
                    <div class="help-img">
                        <img src="static/image/gaiban/checktruth3.png" alt="">
                    </div>
                </li>
            </ul>      
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            yzCode: this.getCode(),
            bqCode: "",
            yzCodeInput: "",
        }
    },
    computed: {
        inputEmpty() {
            if (this.yzCodeInput.length > 0 && this.bqCode.length > 0 && this.yzCodeInput == this.yzCode) {
                return false
            }
            return true
        }
    },
    methods: {
        gotoYZZW() {
            window.open(`${getHttp()}://`+"wap.cjm.so/Individuation/14571/index.pc.html")
        },
        goBack() {
            this.$router.back()
        },
        getCode() {
            return Math.random().toString().substring(4,8);
        },
        setYzCode() {
            this.yzCode = this.getCode()
        },
        doCheckTruth() {
            if (this.inputEmpty) {
                return
            }
            axios.get(`${getHttp()}://`+"query.yahooapis.com/v1/public/yql?q=select%20*%20from%20jsonpost%20where%20url%3D%22http%3A%2F%2Ft.ppk365.com%2Fyuchai%2FPC%2Freport.php%3F%22%20and%20postdata%3D%22ip_address%3Dwww.yuchaizm.com%26xuliehao%3D"+this.bqCode+"%26key%3Dundefined%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=flyjsonp_3E1AE19A336F4F2A83F005AC9D7454BA")
                .then(res => {
                    let resultStr = ""
                    let postresult = ""

                    try {
                        resultStr = res.data.substring(46, res.data.length-2)
                        postresult = JSON.parse(resultStr).query.results.postresult
                        this.$store.dispatch("jyy/setCheckTruthResult", postresult)
  
                        this.$router.push({name:"checkupTruthResult"})
                    } catch (error) {
                        console.log(error)
                    }                    
                })
                .catch(e => {
                    console.log("跨域失败")
                    console.log(e)
                })
        },
    }
}
</script>
<style>
    .check-content {
        margin-top: 2.75rem;
        background: #ffffff;
        overflow: hidden;
    }
    .form-content {
        background: #f5f5f5;
        margin: 0.8rem;
        height: 4.5rem;
        padding: 0.4rem;
        display: flex;
        border-radius: 0.1rem;
    }
    .form-left {
        flex: 1;
    }
    .form-right {
        
        width: 3.5rem;
        height: 100%;
        background: rgba(181, 1, 0, 0.5);
        border-radius: 0.2rem;
        line-height: 3.5rem;
        text-align: center;
        font-size: 0.8rem;
        color: #ffffff;
    }
    .check-content .form-item {
        height: 1.75rem;
        display: flex;
        margin-right: 0.5rem;
        line-height: 1.75rem;
    }
    .check-content .form-item label {
        width: 2.8rem;
        padding-top: 0.1rem;   
    }
    .check-content .form-item input {
        
        display: inline-block;
        height: 1.4rem;
        background: #ffffff;
        border-radius: 0.2rem;
        padding: 0 0.5rem;
    }
    .check-content .form-item .form-item-right {
        flex: 1;
    }
    .yz-right {
        display: flex;
        margin-top: 0.3rem;
    }
    #yzCode {
        flex: 1;
    }
    .yz-right button {
        width: 3rem;
        background: #dddddd;
        outline: 0;
        border: 0;
        margin-left: 0.5rem;
    }
    .required-icon {
        color: red;
    }
    .check-help {
        width: 100%;
        overflow: hidden;
        border-top: 1px solid #ededed;
        padding: 0.4rem;
    }
    .check-help li {
        border-bottom: 1px dashed #ededed;
    }
    .check-help li .help-title {
        margin-top: 0.5rem;
        overflow: hidden;
        height: 1.5rem;
        line-height: 1.5rem;
    }
    .check-help li .help-title button {
        height: 1.5rem;
        line-height: 1.5rem;
        background: #EA3939;
        border: 0;
        outline: 0;
        color: #ffffff;
        float: right;
    }
    .check-help li .help-img {
        width: 100%;
        overflow: hidden;
        margin: 0.5rem 0;
    }
    .check-help li .help-img img {
        width: 100%;
    }
</style>
