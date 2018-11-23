接收参数：toast: {
            //是否显示上传成功的提示
            type: Boolean,
            default: true
        },
        loading: {
            //上传中是否显示loading
            type: Boolean,
            default: true
        },
        customFn: {
            //接收的函数，用于上传图片成功或者失败后调用
            type: Function,
            default: () => {}
        },
        autoClear: {
            //上传图片之后是否自动清除图片内存
            type: Boolean,
            default: true
        }
调用上传图片的方法：
import引入，然后给组件ref赋值，通过this.$refs.名字.upload()方法上传图片，
该方法内部自动调用传入的customFn，customFn有一个参数代表图传上传的结果：{
    status：1,//0：上传图片失败，1：上传图片成功
    data: []//图片链接的字符串数组，若上传失败，则返回一个空数组
}


其他方法：
deleteImg(index)：删除对应index图片，如果不传入index则清除全部图片