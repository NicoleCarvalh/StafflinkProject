import { getLocalData, setLocalData } from "../../localStorageControl/getData.js"
import { handlePageByLink } from "../../windowControl/location.js"

const handleSideMenu = (button = document.getElementById("analysisMode")) => {
    const sideMenu = document.getElementById("side_menu")
    const analysisClass = "analysisMode"

    sideMenu.classList.toggle(analysisClass)

    button.classList.toggle("active")
}

const preLoadSideMenuStatus = () => {
    const analysisModeStatus = getLocalData("analysisModeStatus")

    analysisModeStatus && handleSideMenu()
}

export const sideMenuControl = () => {
    preLoadSideMenuStatus()

    const analysisModeButton = document.getElementById("analysisMode")
    const allCustomLinks = document.querySelectorAll("[data-link-to]")

    const analysisModeStatus = getLocalData("analysisModeStatus")

    analysisModeButton?.addEventListener("click", () => {
        handleSideMenu()

        analysisModeStatus ? setLocalData("analysisModeStatus", false) : setLocalData("analysisModeStatus", true)
    })
    
    allCustomLinks?.forEach(element => handlePageByLink(element))
}