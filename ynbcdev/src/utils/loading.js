

export const showLoading = function () {
    if (document.body.querySelector(".loading-animation")) {
        document.body.removeChild(document.body.querySelector(".loading-animation"));
    }
    // var html='<div class="loading-animation"> <div class="bounce1"></div> <div class="bounce2"></div><div class="bounce3"></div></div>'
    var loadingBox = document.createElement("div");
    loadingBox.setAttribute("class", "loading-animation");
    var bounce1 = document.createElement("div");
    bounce1.setAttribute("class", "bounce1");
    var bounce2 = document.createElement("div");
    bounce2.setAttribute("class", "bounce2");
    var bounce3 = document.createElement("div");
    bounce3.setAttribute("class", "bounce3");
    loadingBox.appendChild(bounce1);
    loadingBox.appendChild(bounce2);
    loadingBox.appendChild(bounce3);
    document.body.appendChild(loadingBox);
}

export const hideLoading = function () {
    if (document.body.querySelector(".loading-animation")) {
        document.body.removeChild(document.body.querySelector(".loading-animation"));
    }
}