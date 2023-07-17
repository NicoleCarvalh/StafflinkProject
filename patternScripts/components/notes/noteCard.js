export const noteCard = ({title = 'Título', description = 'Descrição da anotação', date = 'XX:XX', status = 'pendente', contentEditable = false}) => {
    const card = document.createElement('div')
    card.className = 'card'

    // Cabeçalho do card da anotação
    const header = document.createElement('div')
    header.className = 'card_header'

    const headerTitle = document.createElement('div')
    headerTitle.className = 'title'
    const titleContent = document.createElement('h3')
    titleContent.setAttribute('contenteditable', contentEditable)
    titleContent.innerHTML = title

    titleContent.addEventListener('keyup', () => {
        if(titleContent.textContent.length >= 25) 
            titleContent.setAttribute('contenteditable', false)
    })

    headerTitle.appendChild(titleContent)

    header.appendChild(headerTitle)

    const headerActions = document.createElement('div')
    headerActions.className = 'actions'

    const editOption = document.createElement('button')
    editOption.type = "button"
    editOption.className = "actions_option"

    editOption.innerHTML = `
        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3L12.5 6" stroke="black" stroke-linecap="round"/>
            <path d="M9.35907 1.77111L1.48902 10.8463C1.17363 11.21 1 11.6753 1 12.1567V14.6C1 14.8209 1.17909 15 1.4 15H4.39599C4.98989 15 5.55307 14.7361 5.93305 14.2796L13.3857 5.32768C13.7289 4.91537 13.6856 4.30566 13.2876 3.94595L10.785 1.68435C10.3693 1.30868 9.72615 1.34782 9.35907 1.77111Z" stroke="black" stroke-linecap="round"/>
        </svg>   
    `

    contentEditable && editOption.setAttribute('disabled', true)

    const checkOption = document.createElement('button')
    checkOption.type = "button"
    checkOption.className = "actions_option"

    checkOption.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 8L4.53251 12.8171C5.42451 14.0334 7.29066 13.8622 7.94643 12.5038L13.5 1" stroke="#039A00" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 8L6.53251 12.8171C7.42451 14.0334 9.29066 13.8622 9.94643 12.5038L15.5 1" stroke="#6CFF69" stroke-linecap="round"/>
        </svg> 
    `

    contentEditable && checkOption.setAttribute('disabled', true)

    headerActions.append(editOption, checkOption)
    header.appendChild(headerActions)

    // Conteúdo principal da anotação
    const body = document.createElement('div')
    body.className = 'card_body'
    const bodyContent = document.createElement('p')
    bodyContent.setAttribute('contenteditable', contentEditable)

    bodyContent.addEventListener('keyup', () => {
        if(bodyContent.textContent.length >= 100) 
            bodyContent.setAttribute('contenteditable', false)
    })

    bodyContent.innerHTML = description

    body.appendChild(bodyContent)

    // Rodapé da anotação
    const footer = document.createElement('div')
    footer.className = 'card_footer'

    const createdAt = document.createElement('div')
    createdAt.className = 'createdAt'
    createdAt.innerHTML = `<h5>Criado às <span class='hour'>${date}</span></h5>`

    const statusElement = document.createElement('div')
    statusElement.className = 'status'
    statusElement.innerHTML = `<h5>${status}</h5>`

    footer.append(createdAt, statusElement)

    card.append(header, body, footer)

    return card
}