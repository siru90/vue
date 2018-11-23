import gwApi from "./gw-api";
import lhApi from "./lh-api";
import xhApi from "./xh-api";
import jyApi from "./jy-api";
import zxApi from "./zx-api";
import hzhApi from "./hzh-api";
import jyyApi from './jyy-api'
const api = {
    ...gwApi,
    ...lhApi,
    ...xhApi,
    ...jyApi,
    ...zxApi,
    ...hzhApi,
    ...jyyApi,
    // "local_host": "http://mall.yn.weilian.cn",//运营后台地址
    // "local_host": "http://test.mall.yn.weilian.cn",//运营后台地址
    // "local_host": "http://test.njxs.weilian.cn:8112",//运营后台地址
    // "local_host": "http://172.19.5.145:8112",//运营后台地址
    
    "mall_base_host":	    "http://test.base.scn.weilian.cn/",	//商城调用base模块的地址
    "mall_contract_host":	"http://test.contract.scn.weilian.cn/",	 //商城调用contract模块的地址
    "mall_finance_host":	"http://test.finance.scn.weilian.cn/",	 //商城调用finance模块的地址
    "mall_purchase_host":	"http://test.purchase.scn.weilian.cn/",	 //商城调用purchase模块的地址
    "mall_reportform_host":	"http://test.reportform.scn.weilian.cn/",	 //商城调用reportform模块的地址
    "mall_sale_host":	     "http://test.sale.scn.weilian.cn/",	 //商城调用sale模块的地址
    "mall_supplier_host":	"http://test.supplier.scn.weilian.cn/",	  //商城调用supplier模块的地址
    "mall_wholesale_host":	"http://test.wholesale.scn.weilian.cn/",	//商城调用wholesale模块的地址
    "mall_storage_host":	"http://test.storage.scn.weilian.cn/",	//商城调用storage模块的地址,
    "mall_goods_host": "http://test.goods.scn.weilian.cn/", //商城调用goods模块的地址
    // "mall_file_host": "http://test.files.scn.weilian.cn:40899", //商城调用文件服务器地址
    //"mall_file_host": "http://files.scn.weilian.cn", //商城调用文件服务器地址
    "enterpriseid": 138


}
export default api;

