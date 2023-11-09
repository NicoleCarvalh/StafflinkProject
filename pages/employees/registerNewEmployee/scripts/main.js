import { allUtils } from "../../../../patternScripts/main.js";

allUtils.sideMenu()
allUtils.notes()
allUtils.access({user: {access: true}})

import { generateEmptyEmployeeForm, throwFormEvents } from '../../../../patternScripts/components/employeeForm/index.js'
import { saveEmployee } from "../../../../patternScripts/api/stafflink.js";

const form = generateEmptyEmployeeForm()

document.querySelector('.formContainer').append(form)
throwFormEvents('newEmployee', saveNewEmployee)

function saveNewEmployee() {
    const allElements = form.querySelectorAll('input, select')
    const employeeData = new FormData()

    allElements.forEach(element => {
        if(element.type == 'checkbox') {
            if(element.checked) {
                employeeData.append('benefits', element.id)
                element.checked = false
            }
        } else if(element.type == 'file') {
            employeeData.append('image', element.files[0])

            // Limpando
            const previewImage = document.getElementById('preview')
            previewImage.src = '#'
            
            const fileName = document.getElementById('fileName')
            fileName.textContent = fileName.getAttribute('data-default-text')

        } else {
            employeeData.append(element.name, element.value)
            element.value = ""
        }
    })

    form.querySelector('input').focus()

    saveEmployee(employeeData)
    .then(() => console.log('Deu certo'))
    .catch((error) => console.log(`Algo deu errado. Erro: ${error.message}`))
}