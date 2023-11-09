import { getEmployee } from "../../../patternScripts/api/stafflink.js";
import { allUtils } from "../../../patternScripts/main.js";

// allUtils.access({user: {access}})

const form = document.getElementById('loginContainer').querySelector('form')

form.addEventListener('submit', async (event) => {
    document.getElementById("loader").style.display = 'inline-block';
    document.getElementById("btnLogin").style.display = "none";

    event.preventDefault()

    const email = event.target.querySelector('input[type=email]')
    const password = event.target.querySelector('input[type=password]')

    setTimeout(() => {
        alert('Parece que houve algum problema de conexão :/ \nRecarregue a página e tente novamente')

        document.getElementById("loader").style.display = 'none';
        document.getElementById("btnLogin").style.display = "block";
    }, 25 * 1000)

    const foundEmployee = await getEmployee(null, {email: email.value, password: password.value})
    .then(data => {
        return data ?? false
    })
    .catch((error) => {
        alert(`Parece que algo deu errado :/ \nFavor, tente novamente \n\nErro: ${error.message}`)
        
        document.getElementById("loader").style.display = 'none';
        document.getElementById("btnLogin").style.display = "block";
    })

    if(!foundEmployee) {
        email.style.borderColor = "red"
        password.style.borderColor = "red"

        document.getElementById("loader").style.display = 'none';
        document.getElementById("btnLogin").style.display = "block";
        return
    }

    email.style.borderColor = "green"
    password.style.borderColor = "green"

    delete foundEmployee.employeephoto

    allUtils.setLocalStorage('user', {user: {...foundEmployee}, access: true})
    allUtils.setPage('employees')

    document.getElementById("loader").style.display = 'none';
    document.getElementById("btnLogin").style.display = "block";
})