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
    const popUp = document.createElement('div')
    popUp.className = "popUp"

    let closeButton = document.createElement('button')
    closeButton.innerHTML = "X"
    closeButton.className = "closeButton"

    closeButton.addEventListener('click', () => {
        document.body.removeChild(popUp)
    })

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

    Object.keys(allDatas).forEach(obj => {
        const element = document.createElement('p')
        element.textContent = allDatas[obj]

        allElements.push(element)
    })

    popUp.append(
        closeButton,
        ...allElements
    )

    document.body.append(popUp)
}