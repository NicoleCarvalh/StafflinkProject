// import { mobileDeviceVerify } from "./device.js";
import { backToPreviousPage } from "./location.js";

export const accessControl = ({user = {access: false}}) => {
    if(user.access == false) {
        alert("You don't have access for this page")
        backToPreviousPage()
        return
    }

    console.log('Acesso permitido')
}