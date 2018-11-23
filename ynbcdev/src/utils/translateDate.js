/**
 * Created by SJay on 2017/9/14.
 */
export default (date) =>{
    var dt = new Date(date)
    var yy = dt.getFullYear()
    var mm = dt.getMonth()+1
    var dd = dt.getDate()
    var hh = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours()
    var min = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes()
    var orderDate = `${yy}.${mm}.${dd} ${hh}:${min}`
    return orderDate
}
