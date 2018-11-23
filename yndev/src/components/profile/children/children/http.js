import axios from 'axios'
export const upLoadImg = (formData) => new Promise((resolve, reject) => {
        const date = new Date().getTime();
        axios({
            url: window.api.mall_file_host+'/upload?token='+ date,
            method: "post",
            data: formData
        })
        .then(res => {
            if (res.data.code !== 200) {
                reject("图片上传失败")
            } else {
                resolve(res.data)
            }
    
        })
        .catch(e => {
            reject("图片上传失败")
        })
})

export const imageRecognition = (downloadPath) => new Promise((resolve, reject) => {
    const date = new Date().getTime();
    axios({
        url: window.api.mall_base_host + 'linkCarsIplat/getImageInfo',
        method: "post",
        data: {
            downloadPath,
            fileName: date + '.jpg'
        }
    })
    .then(res => {
        // 此接口返回code有问题
        if (!res.data.data.carno) {
            reject("图片识别失败")
        } else {
            resolve(res.data)
        }
    })
    .catch(e => {
        reject("图片识别失败")
    })
})

export const getTerminalInfo = (carNo) => new Promise((resolve, reject) => {
    axios({
        url: window.api.local_host+'/valueAdded/findCarByCarNoOrTerminalNo',
        method: "get",
        headers: {
            "sessionId": window.localStorage.getItem("sessionId")
        },
        params: {
            carNo,
            terminalNo: null,
        }
    })
    .then(res => {
        if (res.data.returncode !== 1) {
            reject("查询失败")
            return
        }
        resolve(res.data.data[0])
    })
    .catch(e => {
        reject(e)
    })
})

export const saveCar = (data) => new Promise((resolve, reject) => {
    axios({
        url: window.api.mall_base_host + 'clientotherinfo/updatevipcarinfo',
        method: "post",
        data
    })
    .then(res => {
        if (res.data.message === "操作成功") {
            resolve()
        } else {
            reject()
        }
    })
    .catch(e => {
        reject()
    })
})