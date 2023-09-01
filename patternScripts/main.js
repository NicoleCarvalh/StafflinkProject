import { getCepInfos } from "./api/viacep.js";
import { notesControl } from "./components/notes/index.js";
import { sideMenuControl } from "./components/sideMenu/index.js";
import { getLocalData, setLocalData } from "./localStorageControl/getData.js";
import { accessControl } from "./windowControl/accessByDevice.js";
import { mobileDeviceVerify } from "./windowControl/device.js";
import { getCurrentPagePath, setCurrentPagePath, handlePageByLink } from "./windowControl/location.js";

export const allUtils = {
    sideMenu: sideMenuControl,
    access: accessControl,
    setLocalStorage: setLocalData,
    getLocalData: getLocalData,
    isMobile: mobileDeviceVerify,
    getPage: getCurrentPagePath,
    setPage: setCurrentPagePath,
    handlePageByCustomLink: handlePageByLink,
    notes: notesControl,
    getCepInfos: getCepInfos
}