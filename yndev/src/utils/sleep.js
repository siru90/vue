export const sleep = (mstime) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, mstime);
    })
}