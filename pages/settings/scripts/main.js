import { getLocalData } from "../../../patternScripts/localStorageControl/getData.js";
import { allUtils } from "../../../patternScripts/main.js";
allUtils.access()

allUtils.sideMenu()

const currentUser = getLocalData('user').user

// Implementar lógica para preencher os campos do formulário, com os valores salvos


// document.querySelectorAll("input, datalist, select").forEach(element => {
//     console.log(element.name.toLowerCase())
//     console.log(currentUser)
//     // if(element.type !== 'file' && element.type !== 'select') {
//     //     element.value = currentUser[element.name]


//     // }

//     if(currentUser[element.name]) {
//         element.value = currentUser[element.name.toLowerCase()]
//     }
// })