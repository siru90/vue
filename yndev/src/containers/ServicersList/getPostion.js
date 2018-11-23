export const getPostion = () => new Promise((resolve,reject) => {
    if (!navigator.geolocation) {
        reject()
        return
    }
    navigator.geolocation.getCurrentPosition((position) => {
        resolve(position)
    },() => {
        reject()
    },{
        timeout: 10000,
        maximumAge: 5000,
    })
})