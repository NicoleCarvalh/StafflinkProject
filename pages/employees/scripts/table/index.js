export const employeesTableControl = () => {
    const allActionsButton = document.querySelectorAll('.viewMore')

    allActionsButton.forEach(button => {
        button.addEventListener('click', () => {
            let employeeCode = button.parentNode.parentNode.children[0].textContent
            employeeCode = employeeCode.trim()

            employeePopup(employeeCode)
        })
    })
}

function employeePopup(employeeCode) {
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

    const allDatas = {
        id: employeeCode,
        benefits: [
            "transporte"
        ],
        name: "Arthur Mendes Martins",
        birthday: "2004-03-05",
        age: "19",
        genderIdentity: "transgênero",
        pronoun: "elu/delu",
        motherName: "Arthur Mendes Martins",
        fatherName: "Arthur Mendes Martins",
        employeePhoto: "C:\\fakepath\\20221218_175551.jpg",
        rg: "50.808.218-3",
        cpf: "529.388.298-84",
        pis: "03214253221",
        employementCard: "2321312412",
        tel: "+551141845350",
        cel: "11947823535",
        email: "arthurmendesmartins05@gmail.com",
        password: "123123",
        cep: "06310100",
        address: "Avenida Presidente Vargas",
        number: "182",
        neighborhood: "Vila Caldas",
        city: "Carapicuíba",
        state: "SP",
        office: "Assistente",
        sector: "Administrativo",
        contract: "2123",
        journeyInit: "02:03",
        journeyEnd: "05:03",
        grossSalary: "21321",
        hiring: "2023-09-26",
        bankAccount: "231312",
        bank: "Itaú",
        agency: "213"
    }

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