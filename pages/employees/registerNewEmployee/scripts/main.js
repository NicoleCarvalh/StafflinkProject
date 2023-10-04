import { allUtils } from "../../../../patternScripts/main.js";

allUtils.sideMenu()
allUtils.notes()
allUtils.access({user: {access: true}})

const cepInput = document.getElementById('cep')
cepInput.addEventListener('keyup', () => {
    if(cepInput.value.length >= 8) {
        allUtils.getCepInfos(cepInput.value).then(infos => {

            if(infos.erro) {
                cepInput.style.borderColor = "red"
                cepInput.style.outlineColor = "red"
                return
            }

            cepInput.style.borderColor = "green"
            cepInput.style.outlineColor = "green"

            document.getElementById('address').value = infos.logradouro
            document.getElementById('neighborhood').value = infos.bairro
            document.getElementById('city').value = infos.localidade
            document.getElementById('state').value = infos.uf
        }).catch(error => {
            alert('CEP inválido')
            cepInput.style.borderColor = "red"
            return
        })
    }
})

const birthdayInput = document.getElementById('birthday')
birthdayInput.addEventListener('blur', () => {
    if(!birthdayInput.value) {
        return
    }

    const date = new Date(birthdayInput.value)
    const diff = new Date(Date.now() - date)
    const diffInYears = Math.abs(diff.getUTCFullYear() - 1970)
    
    document.getElementById('age').value = diffInYears
})

const form = document.querySelector('form#newEmployee')
form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    let allData = {
        benefits: []
    }

    const allElements = form.querySelectorAll('input, select')
    const photoFormData = new FormData()

    allElements.forEach(element => {
        if(element.type == 'checkbox') {
            if(element.checked) {
                photoFormData.append('benefits', element.id)
            }
        } else if(element.type == 'file') {
            // allData.employeePhoto = element.files[0]
            // photoFormData.append("image", element.files[0])
            // allData.employeePhoto = photoFormData

            photoFormData.append('image', element.files[0])

        } else {
            photoFormData.append(element.name, element.id)
        }
    })

    console.log(allData)

    fetch('https://employees-api-oite.onrender.com/employees', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: photoFormData
    })
    .then(() => console.log('Deu certo'))
    .catch((error) => console.log(`Algo deu errado. Erro: ${error.message}`))
})


const employeePhoto = document.getElementById('employeePhoto')
const previewImage = document.getElementById('preview')
const fileName = document.getElementById('fileName')
const clearButton = document.getElementById('clear')

employeePhoto.addEventListener('change', () => {
    if(!employeePhoto.files[0]) return

    previewImage.src = URL.createObjectURL(employeePhoto.files[0])

    fileName.textContent = employeePhoto.files[0].name
    // console.log(bannerFileInput.files[0])
})

clearButton.addEventListener('click', () => {
    previewImage.src = '#'
    fileName.textContent = fileName.getAttribute('data-default-text')
    form.querySelector('input').focus()
})
