import { noteCard } from "./noteCard.js"

export const newNote = (localInsert, saveNoteCallback) => {
    const allBodyElements = [...document.body.children]

    const container = document.createElement('div')
    container.className = 'newNoteContainer'

    const card = noteCard({date: `${new Date().getHours()}:${new Date().getMinutes()}`, contentEditable: true})

    const confirmCreateNote = document.createElement('button')
    confirmCreateNote.type = 'button'
    confirmCreateNote.id = 'confirm'

    confirmCreateNote.innerText = 'Criar anotação'

    confirmCreateNote.addEventListener('click', () => {
        const title = card.querySelector('.title').textContent
        const description = card.querySelector('.card_body').textContent
        const date = card.querySelector('.hour').textContent
        const status = card.querySelector('.status').textContent

        saveNoteCallback({
            title, 
            description, 
            date, 
            status
        })

        localInsert.removeChild(container)

        allBodyElements.forEach(element => {
            if(element !== container) element.classList.toggle('blurredOut')
        })
    })

    const cancelCreateNote = document.createElement('button')
    cancelCreateNote.type = 'button'
    cancelCreateNote.id = 'cancel'

    cancelCreateNote.innerText = 'Cancelar'

    cancelCreateNote.addEventListener('click', () => {
        localInsert.removeChild(container)

        allBodyElements.forEach(element => {
            if(element !== container) element.classList.toggle('blurredOut')
        })
    })

    container.append(card, confirmCreateNote, cancelCreateNote)

    allBodyElements.forEach(element => {
        if(element !== container) element.classList.toggle('blurredOut')
    })

    localInsert.appendChild(container)
}