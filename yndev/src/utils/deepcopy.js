export const deepCopy= function(source) { 
    let result={};
    for (var key in source) {
        result[key] = source[key]
    } 
   return result; 
}

