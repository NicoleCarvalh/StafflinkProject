import { getLocalData, setLocalData } from "../../localStorageControl/getData.js"
import { mobileDeviceVerify } from "../../windowControl/device.js"
import { handlePageByLink } from "../../windowControl/location.js"

const handleSideMenu = (button = document.getElementById("analysisMode")) => {
    const sideMenu = document.getElementById("side_menu")
    const analysisClass = "analysisMode"
    const headerMainContent = document.querySelector("main header")

    sideMenu.classList.toggle(analysisClass)
    button.classList.toggle("active")

    // Se não for mobile
    !mobileDeviceVerify() && headerMainContent.classList.toggle('analysisMode')
}

const preLoadSideMenuStatus = () => {
    const analysisModeStatus = getLocalData("analysisModeStatus")

    analysisModeStatus && handleSideMenu()
}

export const sideMenuControl = () => {
    const analysisModeButton = document.getElementById("analysisMode")
    const allCustomLinks = document.querySelectorAll("[data-link-to]")
    const analysisModeStatus = getLocalData("analysisModeStatus")
    const analysisModeButtonElements = [...analysisModeButton.children]

    // Somente se não for mobile, carrega o status do menu
    !mobileDeviceVerify() && preLoadSideMenuStatus()

    // Somente se for mobile, realiza a troca do conteúdo textual do botão para "menu"
    mobileDeviceVerify() && analysisModeButtonElements.forEach(element => element.className === "name" ? element.innerHTML = "Menu" : null)

    analysisModeButton?.addEventListener("click", () => {
        handleSideMenu()

        // If mobile, not continue
        if(mobileDeviceVerify()) return
       
        analysisModeStatus ? setLocalData("analysisModeStatus", false) : setLocalData("analysisModeStatus", true)
    })
    
    allCustomLinks?.forEach(element => handlePageByLink(element))
}