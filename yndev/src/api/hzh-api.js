const hzhApi = {
	addBills: "/orderInvoiceTitle/insertOrderInvoiceTitle",
	lookUpBills: "/orderInvoiceTitle/selectOrderInvoiceTitleList",
    putBills: "/orderInvoiceTitle/updateOrderInvoiceTitle",
    deleteBills: "/orderInvoiceTitle/deleteOrderInvoiceTitle/",
    setEmail:"/orderElectronicInvoice/sendMail/",
    getBills:"orderElectronicInvoice/selectElectronicInvoice",
    BillAplys:"/orderElectronicInvoice/pubElectronicInvoice",
    BillNeedKonw:"/orderElectronicInvoice/selectInvoiceNotice"
}

//export const getBills = "orderElectronicInvoice/selectElectronicInvoice";
export default hzhApi;

//import {getBills} from ""
