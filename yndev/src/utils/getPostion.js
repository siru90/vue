export const getPostion = () => new Promise((resolve,reject) => {
    if (!navigator.geolocation) {
        reject()
        return
    }
    navigator.geolocation.getCurrentPosition((position) => {
        resolve(position)
    },(e) => {
        reject(e)
    },{
        timeout: 3000,
        maximumAge: 5000,
    })
})