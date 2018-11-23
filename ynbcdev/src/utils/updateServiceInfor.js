/**
 * Created by SJay on 2017/8/24.
 */

const updateServiceInfor = (serviceInfor, sessionId) => {
  var config = {
    "sessionId": sessionId,
    "dtuid": serviceInfor.teamno ? serviceInfor.teamno : "",  // 终端编号
    "servicecid": serviceInfor.serviceid ? serviceInfor.serviceid : "", //服务商企业id
    "installdate": getDateTime(), // 推广安装时间
    "carid": serviceInfor.carno ? serviceInfor.carno : "", // 汽车号码
    "cartype": serviceInfor.cartype ? changeCarType(serviceInfor.cartype) : "客车", // 车辆类型
    "engineno": serviceInfor.engineno ? serviceInfor.engineno : "", //引擎编号
    "carframeno": serviceInfor.carframeno ? serviceInfor.carframeno : "", //驾驶证号码
    "gearboxmodel": serviceInfor.gearbox ? serviceInfor.gearbox : "", //变速箱编号
    "tyremodel": serviceInfor.tiresize ? serviceInfor.tiresize : "", // 轮胎型号
    "totalmileage": serviceInfor.cycle ? serviceInfor.cycle : "",//驾驶里程 *
    "lastbymileage": serviceInfor.servicecycle ? serviceInfor.servicecycle : "", //已保养里程 *
    "lastbytime": serviceInfor.lastmandedate ? serviceInfor.lastmandedate : "", //上次保养日期 *
    "buydate": serviceInfor.buydate ? serviceInfor.buydate : "", //购车日期
    "openservice": serviceInfor.serviceno ? serviceInfor.serviceno : "", // 开通服务类型
    "opentime": "", //开通时间
    "bindrole": "1" //绑定关系
  }
  return config
}

function getDateTime() {
  var dt = new Date()
  console.log("+++++++++++", dt)
  // 先获取我们需要的所有的元素哦~
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  var h = dt.getHours();
  var m = dt.getMinutes();
  var s = dt.getSeconds();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
}

function changeCarType(type) {
  var carType = "客车"
  switch (type) {
    case "1":
      carType = "客车";
      break;
    case "1":
      carType = "货车";
      break
    case "1":
      carType = "工程机械";
      break
    case "1":
      carType = "特种车";
      break
    case "1":
      carType = "农机";
      break
    default:
      carType = "客车";
  }
  return carType

}
export {updateServiceInfor}
