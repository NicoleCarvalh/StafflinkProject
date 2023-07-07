export const mobileDeviceVerify = () => {
    const userAgent = window.navigator.userAgent
    const regExp = RegExp(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini))/gm)

    return userAgent.match(regExp) ? true : false
}
