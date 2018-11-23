import axios from "axios";
import api from "../api/lh-api"
import API from "../utils/url-router"
var {H5_HOST_URL} = API()
export  default (label , type = "Sec") => {
  return axios.post(H5_HOST_URL + '/resourceLevel/resourceLevelListH5', {
    enterpriseId: api.enterpriseId,
    relPosition: label + type
  })
}
