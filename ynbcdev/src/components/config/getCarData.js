import axios from './carAxios.js'

//获取车辆信息
export const getCarInfo = param => axios('/getvipcarinfo', param, 'get');

//增删改车辆信息
export const changeCarInfo = param => axios('/updatevipcarinfo', param, 'post');

