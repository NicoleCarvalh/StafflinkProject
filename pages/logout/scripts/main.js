import { allUtils } from "../../../patternScripts/main.js";
import { backToPreviousPage } from "../../../patternScripts/windowControl/location.js";
allUtils.access()

const logOutConfirm = document.getElementById('logOutConfirm')
const backButton = document.getElementById('back')

backButton.addEventListener('click', () => {
    backToPreviousPage()
})

logOutConfirm.addEventListener('click', () => {
    allUtils.deleteLocalData('user')
    window.location.href = '/'
})