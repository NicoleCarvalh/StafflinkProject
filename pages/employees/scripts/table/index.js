import { buildFilledEmployeeForm, throwFormEvents } from "../../../../patternScripts/components/employeeForm/index.js";
import { deleteAttendance, deleteEmployee, getEmployee, getEmployees, updateEmployee } from "../../../../patternScripts/api/stafflink.js";
import { list } from "../main.js";
import { deleteLocalData, getLocalData, setLocalData } from "../../../../patternScripts/localStorageControl/getData.js";
import { setUserInfos } from "../../../../patternScripts/components/sideMenu/index.js";
import { setSystemAccess } from "../../../../patternScripts/accessSystemControl/accessByRole.js";

let dataHasChanged = false

export function popUpCaller (employeeCode) {
    getEmployee(employeeCode)
    .then((json) => {
        employeePopup(json);
    })
}

function employeePopup(allDatas) {
    const popUp = document.createElement('div')
    popUp.className = "popUp"

    const employeeForm = buildFilledEmployeeForm(allDatas, "updateEmployee")

    const allElements = employeeForm.querySelectorAll('input, select')

    allElements.forEach(element => {
        element.addEventListener('change', () => {
            if(dataHasChanged !== true) {
                dataHasChanged = true
            }
        })
    })

    const popUpHeader = document.createElement('div')
    popUpHeader.className = 'popUpHeader'

    const popUpTitle = document.createElement('h2')
    popUpTitle.textContent = 'Dados do funcionário'

    const closeButton = document.createElement('button')
    closeButton.innerHTML = "X"
    closeButton.className = "closeButton"
    closeButton.type = "button"

    closeButton.addEventListener('click', () => {
        document.body.removeChild(popUp)
    })

    const popUpFooter = document.createElement('div')
    popUpFooter.className = 'popUpFooter'

    const footerTitle = document.createElement('h2')
    footerTitle.textContent = '🚨 Área perigosa 🚨'

    const deleteEmployeeBtn = document.createElement('button')
    deleteEmployeeBtn.type = 'button'
    deleteEmployeeBtn.textContent = 'Excluir funcionário'
    deleteEmployeeBtn.id = 'deleteEmployee'

    deleteEmployeeBtn.addEventListener('click', () => {
        const deleteConfirm = confirm('Você deseja mesmo exluir este funcionário de todos os dados da empresa?')
        if(!deleteConfirm) return

        Promise.all([
            deleteEmployee(allDatas.id),
            deleteAttendance(allDatas.id)
        ])
        .then(() => {
            alert('O funcionário foi deletado.')

            if(allDatas.id === getLocalData('user').user.id) {
                deleteLocalData('user')
                window.location.href = '/'
            } else {
                getEmployees().then(data => list(data))
                closeButton.click()
            }
        })
    })

    popUpFooter.append(
        footerTitle,
        deleteEmployeeBtn
    )

    popUpHeader.append(
        popUpTitle,
        closeButton
    )

    const popUpFormContainer = document.createElement('div')
    popUpFormContainer.className = 'formContainer'

    // Adaptando formulário clonado
    employeeForm.querySelector('#register').innerText = 'Atualizar dados do funcionário'

    popUpFormContainer.appendChild(employeeForm)

    const submitButton = document.createElement('button')
    submitButton.className = 'submitButton'
    submitButton.type = 'submit'
    submitButton.innerText = 'Atualizar cadastro do funcionário'

    popUp.append(
        popUpHeader,
        popUpFormContainer,
        popUpFooter
    )

    document.body.append(popUp)

    throwFormEvents('updateEmployee', (ev) => updateEmployeeForm(ev, allDatas))
}

function updateEmployeeForm(ev, employee) {
    document.getElementById("loader").style.display = 'inline-block';
    document.getElementById("register").style.display = "none";

    const form = ev.target
    const employeeData = new FormData()

    const allElements = form.querySelectorAll('input, select')

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

    updateEmployee(employee.id, employeeData)
    .then(() => {
        alert('Os dados do(a) funcionário(a) foram alterados')

        const currentUser = getLocalData('user')
        if(employee.id == currentUser.user.id) {
            getEmployee(employee.id)
            .then(newEmployeeData => {
                setLocalData('user', {
                    ...currentUser,
                    user: newEmployeeData
                })

                setSystemAccess()
                setUserInfos()
            })
        }

        document.getElementById("loader").style.display = 'none';
        document.getElementById("register").style.display = "block";

        getEmployees().then(data => list(data))
    })
    .catch((error) => {
        alert(`Infelizmente algo deu errado :/ \n  Erro: ${error.message}`)

        console.log(`Algo deu errado. Erro: ${error.message}`)
    })
}