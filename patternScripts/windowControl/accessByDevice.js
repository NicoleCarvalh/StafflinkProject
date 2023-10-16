import { getLocalData } from "../localStorageControl/getData.js"

const user = getLocalData('user') ?? {access: false}

export const accessControl = () => {
    if(user.access == false) {
        window.location.href = '/'
        return
    }

    console.log('Acesso permitido')
}