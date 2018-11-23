<template>
	 <div class="imgUploadBox" style="overflow:hidden;">
		<ul class="aui-list aui-list-in">
            <li class="aui-list-item aui-content aui-list aui-form-list">
                <div class="aui-list-item-inner">
                    <div class="aui-list-item-label" style="width:30%;">提交凭证：</div>
                    <div class="aui-list-item-input">
                        <p>最多可上传5张</p>
                    </div>
                </div>
            </li>
            <li class="aui-list-item aui-list-item-middle aui-margin-b-15" style="padding-right:0.75rem;">
                <div class="aui-card-list-content-padded aui-border-b aui-border-t aui-padded-l-0 aui-padded-t-0" style="padding:0;width:100%;">
                    <div class="aui-row aui-row-padded" style="display:flex;flex-flow:row wrap;">

                        <div class="aui-col-xs-4 imgItem" v-for="(item, index) in fileArray"
                            style="padding-bottom: 33.33333333%;height: 0;overflow: hidden;" 
                            :key="index" 
                            @touchstart="touchStartEvent($event, index)"
                            @touchmove="touchMoveEvent($event)"
                            @touchend="touchEndEvent($event, index)">
                            <!-- <span @click="deleteImg($event, index)">删除删除</span> -->
                            <img :src="item" ref="imgItem" />
                            
                        </div>
                        <div class="aui-col-xs-4 upload-btn" v-show="fileArray.length !== 5" ref="getHeight">
                            <input type="file" @change="chooseImg" accept="image/gif, image/jpeg, image/png"/>
                            <img src="static/image/suneee-btn.png" />
                        </div>
                    </div>
                </div>
            </li>
        </ul>
         <!-- <input type="button" value="上传" @click="upload"/> -->
        <div ref="gwImgCover" class="gw-img-cover" v-show="coverShow" @click.stop="hideCover" :style="{'height': pageHeight + 'px', 'width': pageWidth + 'px'}">
            <div class="cover" :style="{'height': pageHeight + 'px', 'width': pageWidth + 'px'}"></div>
            <img :src="coverSrc" />
        </div>
        <div class="canvasBox">
            <img src="" ref="tempImg" /> 
            <canvas ref="canvas" background="background: red;"></canvas> 
        </div>
	</div> 
</template>
<script>
    // const pageHeight = window.screen.height;
    // const pageWidth = window.screen.width;
    import {uploadImg} from "../../utils/uploadImg";
    import { MessageBox } from 'mint-ui';
    import {Toast} from "../../utils/toast2";
    import {showLoading, hideLoading} from "../../utils/loading";
	export default {
		props: {
            toast: {
                type: Boolean,
                default: true
            },
            loading: {
                type: Boolean,
                default: true
            },
            customFn: {
                type: Function,
                default: () => {}
            },
            autoClear: {
                type: Boolean,
                default: true
            },
            notEmpty: {
                type: Boolean,
                default: false
            }
		},
		data () {
			return {
                fileArray: [],
                uploadArray: [],
                result: null,
                longPressTimer: null,
                longPressTime: 1000,
                eventUtils: null,
                shortClickTime: 300,//用户做一次点击操作所允许的最大值，单位毫秒
                slideDistance: 30,//用户做一次点击操作所允许滑动的最大距离，单位px,
                maxSize: 2 * 1024 * 1024,//图片超过2MB就进行压缩处理
                coverSrc: "",
                coverShow: false,
                context: "",//canvas绘制上下文,
                maxWidth: 1000,//canvas允许绘制的最大宽度
                maxHeight: 1000,//canvas允许绘制的最大高度
			}
		},
		computed: {
            pageHeight() {
                return window.screen.height;
            },
            pageWidth() {
                return window.screen.width;
            }
		},
		methods: {
            //使用单例模式创建一个FileReader对象
            getFileReaderSingle(fn) {
                return () => {
                    return this.result || (this.result = fn());
                }
            },
            //创建一个FileReader对象
            createFileReader() {
                console.log("单例模式，只调用一次new FileReader");
                return new FileReader();
            },
            //选择图片
            chooseImg(event) {
                // console.log(event.target.files);
                if (event.target.files[0]) {
                    //判断是否需要进行图片压缩，默认不进行压缩处理
                    let needCompress = false;
                    if (event.target.files[0].size > this.maxSize) {
                        needCompress = true;
                    }
                    var reader = this.getFileReaderSingle(this.createFileReader)();
                    reader.onload = event2 => {
                        
                        if (needCompress) {
                            //开始进行压缩操作
                            // console.log("开始进行压缩处理");
                            this.compressImg(event2.target.result);

                        } else {
                            //这个数组用于图片展示
                            this.fileArray.push(event2.target.result);
                            //这个数组用于存储上传的数据
                            this.uploadArray.push(event.target.files[0]);
                        }
                        
                    }
                    reader.onerror = () => {
                        //预览图片失败
                        this.failToast("图片选择失败");
                    }
                    reader.onloadend = () => {
                        //读取完成，无论成功还是失败
                        event.target.value = "";
                    }
                    reader.readAsDataURL(event.target.files[0]);
                }
                
            },
            //拿到当前暂存图片的img标签
            getTempImg() {
                return this.$refs.tempImg;
            },
            //拿到当前canvas
            getCanvas() {
                return this.$refs.canvas;
            },
            //设置canvas的宽高
            setCanvas(w, h) {
                this.getCanvas().width = w;
                this.getCanvas().height = h;
            },
            //清除画布上的内容
            clearCanvasContent(w, h) {
                //如果没有传参数，默认清空画布
                if (!w || !h) {
                    w = this.getCanvas().width;
                    h = this.getCanvas().height;
                }
                this.getContext().clearRect(0, 0, w, h);
            },
            //清除tempImg暂存的内容
            clearTempImgContent() {
                this.getTempImg().src = "";
            },
            //开始进行压缩处理，接收FileReader读取生成的URL
            compressImg(src) {
                console.log("开始进行压缩处理");
                //使用暂存Img标签显示出图片
                this.getTempImg().onload = () => {
                    //图片加载完毕，进行canvas绘制
                    console.log("图片加载完毕，进行canvas绘制");
                    let context = this.getContext();
                    let callback = (w, h) => {
                        //拿到计算后的宽高
                        console.log("拿到计算后的宽高", w, h);
                        //设置画布大小
                        this.setCanvas(w, h);
                        //开始canvas绘制
                        context.drawImage(this.getTempImg(), 0, 0, w, h);
                        //绘制完毕后拿到生成的url，压缩指数为0.4
                        let compressSrc = this.getCanvas().toDataURL("image/jpeg", 0.4);
                        //压缩后的url放到预览数组里
                        this.fileArray.push(compressSrc);
                        //将压缩后的url进行二进制转码，放到uploadArray（上传数组）里
                        this.uploadArray.push(this.dataURLtoBlob(compressSrc)); 
                        console.log("拿到转换后的blob", this.dataURLtoBlob(compressSrc));
                        //进行清空操作
                        this.clearCanvasContent();
                        this.clearTempImgContent();
                    }
                    this.getCompressTargetSize(src, callback);
                }
                console.log("图片暂存标签拿到src");
                this.getTempImg().src = src;
            },
            //以单例模式获取canvas绘制上下文
            getContext() {
                if (this.context) {
                    return this.context;
                } else {
                    return this.getCanvas().getContext("2d");
                }
            },
            //根据图片的原始大小进行按比例绘制
            getCompressTargetSize(src, callback) {
                let img = new Image();
                img.onload = () => {
                    if (callback) {
                        let width = img.width;
                        let height = img.height;
                        let paintWidth = width;//绘制的宽度
                        let paintHeight = height;//绘制的高度
                        if (width >= height && width > this.maxWidth) {
                            // if (width > this.maxWidth) {
                                //如果图片宽大于最大宽度，则进行宽高等比例缩放
                                paintWidth = this.maxWidth;
                                paintHeight = (height / width) * paintWidth;
                            // }

                        } else if (height > width && height > this.maxHeight) {
                            //如果图片高大于最大高度，则进行宽高等比例缩放
                            paintHeight = this.maxHeight;
                            paintWidth = (width / height) * paintHeight;
                        }
                        callback(paintWidth, paintHeight);
                    }
                }
                img.src = src;
            },
            //base64转blob二进制
            dataURLtoBlob(dataurl) {
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type:mime});
            },
            //删除选中的图片
            deleteImg(index) {
                if (index == undefined) {
                    this.fileArray = [];
                    this.uploadArray = [];
                    return;
                }
                this.fileArray.splice(index, 1);
                this.uploadArray.splice(index, 1);
            },
            //上传所选图片
            upload() {
                if (this.loading) {
                    // console.log("fghjkliuy");
                    showLoading();
                }
                //如果图片为空，点击上传按钮则返回status：2
                if (!this.fileArray.length) {
                    hideLoading();
                    let returnObj = {
                        status: 2,
                        data: []
                    }
                    this.customFn(returnObj);
                    return;
                }
                let callback = data => {
                    hideLoading();
                    if (this.toast) {
                        this.successToast("图片上传成功");
                    }
                    console.log("拿到上传成功后的图片链接", data);
                    let returnObj = {
                        status: 1,
                        data
                    }
                    this.customFn(returnObj);
                    if (this.autoClear) {
                        this.deleteImg();
                    }
                }
                let errFn = () => {
                    hideLoading();
                    if (this.toast) {
                        this.failToast("图片上传失败");
                    }
                    let returnObj = {
                        status: 0,
                        data: []
                    }
                    this.customFn(returnObj);
                    
                }
                uploadImg(this.uploadArray, callback, errFn);
            },
            //自定义touch事件，模拟长按和点击
            touchStartEvent(event, index) {
                this.longPressTimer = setTimeout(() => {
                    console.log(`第${index}个长按事件触发`);
                    MessageBox.confirm('要删除这张图片吗？').then(action => {
                        //确定事件
                        this.deleteImg(index);
                    }, cancel => {
                        //取消删除
                    });
                    this.clearLongPressTimer();
                }, this.longPressTime);
                //定义一个时间戳，代表用户按下手指的起始时间
                this.startTime = new Date().getTime();
                //定义一个对象，代表用户按下的手指位置
                // console.log(event);
                this.startPos = {
                    posX: event.touches[0].clientX,
                    posY: event.touches[0].clientY
                }
            },
            touchMoveEvent(event) {
                this.clearLongPressTimer();
            },
            touchEndEvent(event, index) {
                this.clearLongPressTimer();
                //如果用户手指抬起的结束时间小于this.shortClickTime并且滑动距离不大于this.slideDistance
                //可以认为用户做了一次点击事件
                let endPos = {
                    posX: event.changedTouches[0].clientX,
                    posY: event.changedTouches[0].clientY
                }
                let endTime = new Date().getTime();
                if (endTime - this.startTime < this.shortClickTime && Math.abs(endPos.posX - this.startPos.posX) < this.slideDistance && Math.abs(endPos.posY - this.startPos.posY) < this.slideDistance) {
                    console.log("用户触发了点击事件");
                    //弹出一个遮罩层，显示用户点击的图片大图
                    // setTimeout(() => {
                        this.showCover(index);
                    // }, 150);
                    
                }

                //做一下清理操作
                this.startPos = null;
                this.startTime = null;
            },
            //给具体的img绑定longPress事件
            bindLongPress(dom, index) {
                dom.ontouchstart = event => {
                    event.stopPropagation();
                    this.longPressTimer = setTimeout(() => {
                        console.log(`第${index}个长按事件触发`);
                        MessageBox.confirm('要删除这张图片吗？').then(action => {
                            //确定事件
                            this.deleteImg(index);
                        }, cancel => {
                            //取消删除
                        });
                        this.clearLongPressTimer();
                    }, this.longPressTime);
                    //定义一个时间戳，代表用户按下手指的起始时间
                    this.startTime = new Date().getTime();
                    //定义一个对象，代表用户按下的手指位置
                    // console.log(event);
                    this.startPos = {
                        posX: event.touches[0].clientX,
                        posY: event.touches[0].clientY
                    }
                }
                dom.ontouchmove = event => {
                    event.stopPropagation();
                    this.clearLongPressTimer();
                }
                dom.ontouchend = event => {
                    event.stopPropagation();
                    this.clearLongPressTimer();
                    //如果用户手指抬起的结束时间小于this.shortClickTime并且滑动距离不大于this.slideDistance
                    //可以认为用户做了一次点击事件
                    let endPos = {
                        posX: event.changedTouches[0].clientX,
                        posY: event.changedTouches[0].clientY
                    }
                    let endTime = new Date().getTime();
                    if (endTime - this.startTime < this.shortClickTime && Math.abs(endPos.posX - this.startPos.posX) < this.slideDistance && Math.abs(endPos.posY - this.startPos.posY) < this.slideDistance) {
                        console.log("用户触发了点击事件");
                        //弹出一个遮罩层，显示用户点击的图片大图

                        this.showCover(index);
                    }

                    //做一下清理操作
                    this.startPos = null;
                    this.startTime = null;
                }
            },
            //初始化长按事件
            initLongPressEvent() {
                let imgs = document.querySelectorAll(".imgItem");
                for (let i = 0; i < this.fileArray.length; i++) {
                    this.bindLongPress(imgs[i], i);
                }    
            },
            //清除计时器
            clearLongPressTimer() {
                clearTimeout(this.longPressTimer);
                this.longPressTimer = null;
            },
            //显示成功Toast
            successToast(msg) {
                Toast({
                    duration: 1000,
                    message: msg,
                    iconClass: "aui-iconfont aui-icon-correct"
                });
            },
            //显示失败Toast
            failToast(msg) {
                Toast({
                    duration: 1000,
                    message: msg,
                    iconClass: "aui-iconfont aui-icon-close"
                });
            },
            //显示遮罩层
            showCover(index) {
                setTimeout(() => {
                    this.coverShow = true;
                    this.coverSrc = this.fileArray[index];
                    document.body.appendChild(this.$refs.gwImgCover);
                }, 400);
            },
            //隐藏遮罩层
            hideCover() {
                setTimeout(() => {
                    this.coverShow = false;
                    this.coverSrc = "";
                }, 300);
                
            },
            hideCoverBeforeDestroy() {
                this.coverShow = false;
                this.coverSrc = "";
                this.$refs.gwImgCover.style.display = "none";
            }
        },
        created () {
            setTimeout(() => {
                this.$refs.canvas.width = 1000;
                this.$refs.canvas.height = 1000;
            }, 500);
        },
        mounted () {
        },
        beforeDestroy() {
            this.hideCoverBeforeDestroy();
        },
        watch: {
        }

	}
</script>

<style scoped>
    .upload-btn {
        position: relative;
        overflow: hidden;
    }
    .upload-btn input {
        position: absolute;
        top:0;
        left:0;
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .aui-row-padded {
        margin: 0;
    }
    .gw-img-cover {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99999;
        width: 100vw;
        height: 100vh;
    }
    .gw-img-cover .cover {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.6;
    }
    .gw-img-cover img {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
    }
    .canvasBox {
        width: 1px;
        height: 1px;
        overflow: hidden;
    }
</style>


