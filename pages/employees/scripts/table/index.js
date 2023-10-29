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
    console.log(allDatas);
    const popUp = document.createElement('form')
    popUp.className = "popUp"

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

    let allElements = []

    const relationalNames = {
        benefits: { 
            label: 'Benefícios',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        name: { 
            label: 'Nome',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        birthday: { 
            label: 'Nascimento',
            className: 'small',
            disabled: false,
            inputType: 'date'
        },
        age: { 
            label: 'Idade',
            className: 'small',
            disabled: true,
            inputType: 'number'
        },
        genderIdentity: { 
            label: 'Identidade de gênero',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        pronoun: { 
            label: 'Pronome',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        motherName: { 
            label: 'Nome da mãe',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        fatherName: { 
            label: 'Nome do pai',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        employeePhoto: { 
            label: 'Foto do funcionário',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        rg: { 
            label: 'RG',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        cpf: { 
            label: 'CPF',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        pis: { 
            label: 'PIS',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        employementCard: { 
            label: 'Carteira de trabalho',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        tel: { 
            label: 'Telefone',
            className: 'big',
            disabled: false,
            inputType: 'tel'
        },
        cel: { 
            label: 'Celular',
            className: 'big',
            disabled: false,
            inputType: 'tel'
        },
        email: { 
            label: 'E-mail',
            className: 'big',
            disabled: false,
            inputType: 'email'
        },
        password: { 
            label: 'Senha',
            className: 'big',
            disabled: false,
            inputType: 'password'
        },
        cep: { 
            label: 'CEP',
            className: 'small',
            disabled: false,
            inputType: 'number'
        },
        address: { 
            label: 'Endereço',
            className: 'big',
            disabled: true,
            inputType: 'text'
        },
        number: { 
            label: 'Número da residência',
            className: 'big',
            disabled: false,
            inputType: 'number'
        },
        neighborhood: { 
            label: 'Bairro',
            className: 'big',
            disabled: true,
            inputType: 'text'
        },
        city: { 
            label: 'Cidade',
            className: 'big',
            disabled: true,
            inputType: 'text'
        },
        state: { 
            label: 'UF',
            className: 'small',
            disabled: true,
            inputType: 'text'
        },
        office: { 
            label: 'Cargo',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        sector: { 
            label: 'Setor',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        contract: { 
            label: 'Contrato',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        journeyInit: { 
            label: 'Jornada - Início',
            className: 'big',
            disabled: false,
            inputType: 'time'
        },
        journeyEnd: { 
            label: 'Jornada - Término',
            className: 'big',
            disabled: false,
            inputType: 'time'
        },
        grossSalary: { 
            label: 'Salário bruto',
            className: 'big',
            disabled: false,
            inputType: 'number'
        },
        hiring: { 
            label: 'Data de contratação',
            className: 'big',
            disabled: false,
            inputType: 'date'
        },
        bankAccount: { 
            label: 'Conta bancária',
            className: 'big',
            disabled: false,
            inputType: 'number'
        },
        bank: { 
            label: 'Banco',
            className: 'big',
            disabled: false,
            inputType: 'text'
        },
        agency: { 
            label: 'Agência' ,
            className: 'small',
            disabled: false,
            inputType: 'number'
        }
    }

    Object.keys(allDatas).forEach(obj => {
        if(!relationalNames[obj]) return

        console.log(`${allDatas[obj]} - ${obj}`)
        const elementLabel = document.createElement('label')
        elementLabel.htmlFor = obj
        elementLabel.innerText = relationalNames[obj].label

        const elementInput = document.createElement('input')
        elementInput.id = obj
        elementInput.type = relationalNames[obj].inputType
        elementInput.value = allDatas[obj]
        elementInput.disabled = relationalNames[obj].disabled
        
        const fieldContainer = document.createElement('div')
        fieldContainer.className = `field ${relationalNames[obj].className}`
        fieldContainer.append(
            elementLabel,
            elementInput
        )

        allElements.push(fieldContainer)
    })

    popUpFormContainer.append(
        ...allElements
    )

    const popFooter = document.createElement('div')
    popFooter.className = 'popUpFooter'

    const submitButton = document.createElement('button')
    submitButton.className = 'submitButton'
    submitButton.type = 'submit'
    submitButton.innerText = 'Atualizar cadastro do funcionário'

    popFooter.appendChild(submitButton)

    popUp.append(
        popUpHeader,
        popUpFormContainer,
        popFooter
    )

    document.body.append(popUp)
}