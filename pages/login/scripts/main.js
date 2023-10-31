import { allUtils } from "../../../patternScripts/main.js";

// allUtils.access({user: {access}})

const form = document.getElementById('loginContainer').querySelector('form')

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const email = event.target.querySelector('input[type=email]')
    const password = event.target.querySelector('input[type=password]')

    const foundEmployee = await fetch('https://employees-api-oite.onrender.com/employees')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return validateLogin({email: email.value, password: password.value}, data)
    })

    if(!foundEmployee) {
        email.style.borderColor = "red"
        password.style.borderColor = "red"
        return
    }

    allUtils.setLocalStorage('user', {user: {...foundEmployee}, access: true})
    allUtils.setPage('employees')
})

function validateLogin({email, password}, datas) {
    const foundEmployee = datas.find(employeeData => employeeData.email === email && employeeData.password === password) ?? false

    return foundEmployee
}