import { getLocalData, setLocalData } from "../../../patternScripts/localStorageControl/getData.js";
import { allUtils } from "../../../patternScripts/main.js";
allUtils.access()

allUtils.sideMenu()

import { buildFilledEmployeeForm, throwFormEvents } from "../../../patternScripts/components/employeeForm/index.js";
import { findUser } from "../../../patternScripts/api/stafflink.js";

const currentUser = getLocalData('user').user

const currentUserForm = buildFilledEmployeeForm(currentUser, 'updateUserData')
currentUserForm.querySelector('#register').textContent = 'Atualizar dados'

document.querySelector('.formContainer').append(currentUserForm)

const allElements = currentUserForm.querySelectorAll('input, select')
let dataHasChanged = false

allElements.forEach(element => {
    element.addEventListener('change', () => {
        if(dataHasChanged !== true) {
            dataHasChanged = true
        }
    })
})


throwFormEvents(currentUserForm.id, updateUserData)

function updateUserData(event) {
    const employeeData = new FormData()

    allElements.forEach(element => {
        if(element.type == 'checkbox') {
            if(element.checked) {
                employeeData.append('benefits', element.id)
            }
        } else if(element.type == 'file') {
            employeeData.append('image', element.files[0])
        } else {
            employeeData.append(element.name, element.value)
        }
    })

    if(dataHasChanged !== true) {
        return
    }

    // fetch(`http://localhost:5432/employees/${currentUser.id}`, {
    fetch(`https://employees-api-oite.onrender.com/employees/${currentUser.id}`, {
        method: 'PUT',
        body: employeeData
    })
    .then(() => {
        findUser(currentUser.id).then(data => {
            const newData = {...data}
            delete newData.employeephoto

            setLocalData('user', {
                ...getLocalData('user'),
                user: {
                    ...newData
                }
            })

        })

        alert('Seus dados foram alterados')
    })
    .catch((error) => {
        alert(`Infelizmente algo deu errado :/ \n  Erro: ${error.message}`)

        console.log(`Algo deu errado. Erro: ${error.message}`)
    })
}