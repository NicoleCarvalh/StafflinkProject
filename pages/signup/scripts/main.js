import { allUtils } from "../../../patternScripts/main.js";

// url para a API de cep:
// viacep.com.br/ws/01001000/json/

const firstStepFields = getCurrentFields()

function getCurrentFields() {
    return document.querySelectorAll('.fieldsContainer.visible input')
}

const allStepCounters = [...document.querySelectorAll('.step')]
const fieldsContainers = [...document.querySelectorAll('.fieldsContainer')]
let currentStep = 1

let allData = {}

const steps = {
    1: {},
    2: {},
    3: {},
    4: {},
}

firstStepFields.forEach(inp => steps['1'][inp.name] = inp)

const form = document.querySelector('form')

const nextStepButton = document.getElementById('continue')

const previousStepButton = document.getElementById('back')
previousStepButton.addEventListener('click', () => {
    if(currentStep <= 1) return

    nextStepButton.textContent != 'Continuar' && (nextStepButton.textContent = 'Continuar')

    getCurrentFields().forEach((inp, key, node) => {
        node[0].focus()
        inp.required = false
    })

    currentStep > 1 && (currentStep-- && changeStep())
})

const clearButton = document.getElementById('clear')
clearButton.addEventListener('click', (ev) => {
    ev.preventDefault()

    getCurrentFields().forEach((inp, key, node) => {
        inp.value = ''
        node[0].focus()
    })
})

function changeStep() {
    allStepCounters.forEach(step => {
        if(allStepCounters.indexOf(step) + 1 == currentStep) {
            step.classList.toggle('active')
        } else {
            step.classList.remove('active')
        }
    })

    fieldsContainers.forEach(container => {
        if(fieldsContainers.indexOf(container) + 1 == currentStep) {
            container.classList.toggle('visible')
        } else {
            container.classList.remove('visible')
        }
    })

    getCurrentFields().forEach((inp, key, node) => {
        node[0].focus()
        inp.required = true
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if(currentStep <= 3) {
        currentStep == 3 && (nextStepButton.textContent = 'Finalizar')
        currentStep++  

        changeStep()
        return
    }

    alert('Cadastro finalizado')
    const allInputs = document.querySelectorAll('.fieldsContainer input')
    
    allInputs.forEach((inp) => {
        allData[inp.name] = inp.value
    })

    console.log(allData)
})