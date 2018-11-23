import { Toast, Indicator } from 'mint-ui';
/*
    message	    文本内容	String		
    position	Toast 的位置	String	'top' 'bottom' 'middle'	'middle'
    duration	持续时间（毫秒），若为 -1 则不会自动关闭	Number	3000
    showCover	是否显示遮罩层。 Boolean （遮罩层已经设死透明度为0）		
    iconClass	icon 图标的类名	String		
*/
var toast, loading;
export const gwToast = function (options) {
    // var toast;
    if (toast) {
        toast.close;
    }
    let _default = {
        message: "正在加载",
        duration: -1,
        iconClass: "",
        showCover: true,
        position: "middle",
        type: "loading"
    }
    //配置icon图标

    let _config;
    if (options) {
        //用户有没有自定义iconClass
        if (!options.iconClass) {
            let type = _default.type;
            if (options.type) {
                type = options.type;
            }
            switch (type) {
                case "success":
                    _default.iconClass = "aui-iconfont aui-icon-correct"
                    break;
                case "fail":
                    _default.iconClass = "aui-iconfont aui-icon-close"
                    break;
                default :
                    // _default.iconClass = "ivu-icon ivu-icon-load-d"
            }
            _config = Object.assign({}, _default, options);
        }
        
    } else {
        _config = Object.assign({}, _default);
    }
    //是否显示遮罩层
    if (_config.showCover) {
        let cover = document.createElement("div");
        cover.style = "width:100vw;height:100vh;background:#fff;opacity:0;position:fixed;top:0;left:0;z-index:100000";
        cover.setAttribute("class", "gw-cover");
        document.body.appendChild(cover);
    }
    //如果显示了遮罩层，并且duration不为-1，这里自动去掉
    if (_config.duration !== -1) {
        setTimeout(() => {
            if (document.querySelector(".gw-cover")) {
                document.body.removeChild(document.querySelector(".gw-cover"));
            }
        }, _config.duration);
    }

    //判定是否是loading
    if (options && options.type === "loading") {
        // console.log(111111111);
        let _config2 = {
            text: "loading"
        }
        if (options.message) {
            _config2 = Object.assign({}, _config2, {
                text: options.message
            });
        }
        Indicator.open(_config2);
        if (options.duration !== -1) {
           setTimeout(() => {
               Indicator.close();
           }, options.duration);
        }
        return false;
    }

    return toast = Toast(_config);
}

export const gwClose = function () {
    Indicator.close();
    if (toast) {
        toast.close();
    }
    if (document.querySelector(".gw-cover")) {
        document.body.removeChild(document.querySelector(".gw-cover"));
    }
} 