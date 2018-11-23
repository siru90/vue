/**
 * Created by SJay on 2017/9/6.
 */
import axios from "axios"
import  API  from "./url-router"
const getInforFun = async (url, data, method = "get", header = false) => {
  var api = API()
  var url = api[url]
  var config = {
    method: method,
  }
  if (method == "get") {
    config.url = url + data
  }
  else if (method == "post") {
    config.url = url
    config.data = data
  }
  else {
    config.url = url
    config.data = data
  }

  if (header) {
    config.headers = {sessionId: header}
  }
  try {
    const response_post = await axios(config);
    return response_post.data
  } catch (error) {
    throw new Error(error)
    return {
      data: {
        returnCode: 0,
        message: "数据请求失败"
      }
    }
  }

}

export const getOrder = async (data, sessionId) => {
  return getInforFun("getOrderUrl", "?token=" + new Date().getTime(), "get", sessionId)
}

export const querySubmitedInfor = async (data, sessionId) => {
  return getInforFun("getSubmitedInfor", "?token=" + new Date(), "get", sessionId)
}


