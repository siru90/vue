/**
 * Created by SJay on 2017/8/15.
 */
let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios
let isScript = document.querySelector(".isScript")

if(!isScript){
  if(isiOS) {
    let scriptLabel = document.createElement("script")
    scriptLabel.setAttribute("src", 'static/script/cordova/android/cordova.js')
    scriptLabel.setAttribute("class", 'isScript')
    console.log(scriptLabel)
  document.body.appendChild(scriptLabel)
  }else if( isAndroid) {
    let scriptLabel = document.createElement("script")
    scriptLabel.setAttribute("src", 'static/script/cordova/android/cordova.js')
    scriptLabel.setAttribute("class", 'isScript')
    console.log(scriptLabel)
    document.body.appendChild(scriptLabel)
  }
  else {
    console.log("可能是windows")
  }
}

