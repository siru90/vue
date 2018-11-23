import {Toast} from './toast2'
function ismobile(test){
    var u = navigator.userAgent, app = navigator.appVersion;
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
        if(window.location.href.indexOf("?mobile")<0){
            try{
                if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
                    return '0';
                }else{
                    return '1';
                }
            }catch(e){}
        }
    }else if( u.indexOf('iPad') > -1){
        return '0';
    }else{
        return '1';
    }
}
export function startCopy(id){
    let num = ismobile(1);
  
    console.log("复制",num)
    if(num == '0'){
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) { //ios  
            var copyDOM = document.querySelector('#'+id);  //要复制文字的节点    
            var range = document.createRange();
            // 选中需要复制的节点    
            range.selectNode(copyDOM);  
           
            // 执行选中元素    
            window.getSelection().addRange(range);    
            // 执行 copy 操作    
            var successful = document.execCommand('copy');   
            try {      
                var msg = successful ? 'successful' : 'unsuccessful';   
            } catch(err) {      
            } 
            if(msg){
                Toast({
                        message: '复制成功',
                        iconClass: "aui-iconfont aui-icon-correct",
                        duration: 1000
                    });
            }
            // 移除选中的元素    
            window.getSelection().removeAllRanges();    
        } 
    }
            
}