import { buildFilledEmployeeForm, throwFormEvents } from "../../../../patternScripts/components/employeeForm/index.js";
import { getAllEmployees } from "../main.js";

let dataHasChanged = false

export function popUpCaller (employeeCode) {
    fetch(`https://employees-api-oite.onrender.com/employees/${employeeCode}`, {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        },
    }).then((data) => {
        return data.json();
    }).then((json) => {
        employeePopup(json[0]);
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

        // fetch(`http://localhost:5432/employees/${allDatas.id}`, {
        fetch(`https://employees-api-oite.onrender.com/employees/${allDatas.id}`, {
            method: 'DELETE'
        }).then(() => {
            alert('O funcionário foi deletado.')
            window.location.reload()
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

    throwFormEvents('updateEmployee', (ev) => updateEmployee(ev, allDatas))
}

function updateEmployee(ev, employee) {
    console.log('Entrou na função que altera')
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

    console.log(`dataHasChanged : ${dataHasChanged}`)

    if(dataHasChanged !== true) {
        return
    }
    
    // fetch(`http://localhost:5432/employees/${employee.id}`, {
    fetch(`https://employees-api-oite.onrender.com/employees/${currentUser.id}`, {
        method: 'PUT',
        body: employeeData
    })
    .then(() => {
        getAllEmployees()
        alert('Os dados do(a) funcionário(a) foram alterados')
    })
    .catch((error) => {
        alert(`Infelizmente algo deu errado :/ \n  Erro: ${error.message}`)

        console.log(`Algo deu errado. Erro: ${error.message}`)
    })
}