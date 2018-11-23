// export const getSearchParamFromApp = (param) => {
//     const search = window.location.search
//     // alert(search)
//     const searchParam = parseQuery(search.substring(1,search.length))
//     return searchParam[param]
// }

function parseQuery(query){
    var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
    var obj = {};
    while(reg.exec(query)){
        obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
}

export const getSearchParamFromApp = (param) => {
    try {
        const searchStr = window.location.href.split("?")[1].split("#")[0]
        const searchParam = parseQuery(searchStr)
        return searchParam[param]
    } catch (error) {
        return ""
    }
    
}