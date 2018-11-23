
// let mToast;
// let mToastTimer = null;
// export const Toast = function (options) {
//     if (document.body.querySelector(".m-toast")) {
//         document.body.removeChild(document.body.querySelector(".m-toast"));
//         clearTimeout(mToastTimer);
//         mToastTimer = null;
//     }
//     let _default = {
//         duration: 2000,
//         message: "处理成功",
//         iconClass: "icon njfont nj-chenggong"
//     }
//     let config = Object.assign({}, _default);

//     if (options) {
//         config = Object.assign({}, config, options);
//     }
//     mToast = document.createElement("div");
//     let mToastStyle = `margin-top: -24px;display: block;max-width: 175px;white-space: normal;`
//     mToast.setAttribute("style", mToastStyle);
//     //根据不同的toast类别添加不同的样式
//     let toastClassName = "m-toast toast_success aui-toast";
//     let iClassName = "icon njfont nj-chenggong";
//     if (config.iconClass === "aui-iconfont aui-icon-close") {
//         toastClassName = "m-toast toast_fail aui-toast";
//         iClassName = "icon njfont nj-shibai";
//     } else if (config.iconClass === "aui-iconfont aui-icon-warn") {
//         toastClassName = "m-toast toast_warning aui-toast";
//         iClassName = "icon njfont nj-tishi";
//     }
//     mToast.setAttribute("class", toastClassName);
//     let i = document.createElement("i");
//     //成功和失败是两种不同的样式
//     // let iStyle = `font-size:52px;margin-top:25px !important;display:block;`;
//     let iStyle = "";
//     // if (config.iconClass === "aui-iconfont aui-icon-close") {
//     //     iStyle = `font-size:52px;margin-top:25px !important;`;
//     // }
//     i.setAttribute("class", iClassName);
//     i.setAttribute("style", iStyle);
//     let text = document.createElement("div");
//     //成功和失败是两种不同的样式
//     let textStyle = `text-align: left;line-height: 1.3rem;`;
//     text.setAttribute("style", textStyle);
//     text.setAttribute("class", "aui-toast-content");
//     text.innerHTML = config.message;
//     mToast.appendChild(i);
//     mToast.appendChild(text);
//     document.body.appendChild(mToast);
//     mToastTimer = setTimeout(() => {
//         if (document.body.querySelector(".m-toast")) {
//             document.body.removeChild(document.body.querySelector(".m-toast"));
//         }
//     }, config.duration);
// }



let mToast;
let mToastTimer = null;
export const Toast = function (options) {
	// console.log("0-0-0-0-0-0-0-0-0-0-0-0-0-0", options);
	if (document.body.querySelector(".m-toast")) {
		document.body.removeChild(document.body.querySelector(".m-toast"));
		clearTimeout(mToastTimer);
		mToastTimer = null;
	}
	let _default = {
		duration: 2000,
		message: "处理成功",
		type: "success"
	}
	let config = Object.assign({}, _default);

	if (options) {
		config = Object.assign({}, config, options);
	}
	mToast = document.createElement("div");
	let mToastStyle = `display: flex;align-items: center;`
	mToast.setAttribute("style", mToastStyle);
	// if(options.width){
	// 	mToast.setAttribute("style", "margin-top: -24px;display: block;white-space: normal;min-width:" + options.width);
	// }
	//根据不同的toast类别添加不同的样式
	let toastClassName = "m-toast toast_success";
	let iClassName = "icon njfont nj-chenggong";
	if (config.type === "fail" || config.iconClass === "aui-iconfont aui-icon-close") {
		toastClassName = "m-toast toast_fail";
		iClassName = "icon njfont nj-shibai";
	} else if (config.type === "warn" || config.iconClass === "aui-iconfont aui-icon-warn") {
		toastClassName = "m-toast toast_warning";
		iClassName = "icon njfont nj-tishi";
	}
	mToast.setAttribute("class", toastClassName);
	let i = document.createElement("i");
	//成功和失败是两种不同的样式
	let iStyle = "";
	i.setAttribute("class", iClassName);
	i.setAttribute("style", iStyle);
	let text = document.createElement("div");
	//成功和失败是两种不同的样式
	let textStyle = `text-align: left;font-size: 14px;margin-left: 0.5rem;`;
	text.setAttribute("style", textStyle);
	// text.setAttribute("class", "aui-toast-content");
	text.innerHTML = config.message;
	mToast.appendChild(i);
	mToast.appendChild(text);
	document.body.appendChild(mToast);
	mToastTimer = setTimeout(() => {
		if (document.body.querySelector(".m-toast")) {
            document.body.removeChild(document.body.querySelector(".m-toast"));
		}
	}, config.duration);
}