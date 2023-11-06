import { allUtils } from "../../../patternScripts/main.js";
import { backToPreviousPage } from "../../../patternScripts/windowControl/location.js";

allUtils.deleteLocalData("user");

const loginAccess = document.getElementById("loginAccess");

loginAccess.addEventListener("click", () => {
  window.location.href = "/";
});
