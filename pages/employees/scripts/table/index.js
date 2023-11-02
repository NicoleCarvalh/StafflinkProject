import { buildFilledEmployeeForm, throwFormEvents } from "../../../../patternScripts/components/employeeForm/index.js";

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
        popUpFormContainer
    )

    document.body.append(popUp)

    throwFormEvents('updateEmployee', updateEmployee)
}

function updateEmployee() {
    console.log('Alterando dados de um funcionário')
}