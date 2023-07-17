import { getLocalData, setLocalData } from "../../localStorageControl/getData.js"
import { newNote } from "./createNewNote.js"
import { noteCard } from "./noteCard.js"

const notesContainer = document.getElementById("notesContainer")
const notesList = document.querySelector("#notesContainer .notes")
const closeNotesContainer = document.getElementById("closeNotes")
const showNotes = document.getElementById("showNotes")
const showNewNotesForm = document.getElementById("showNewNotesForm")

const handleNotesContainer = () => {
    notesContainer.classList.toggle("visible")
}

const listAllNotes = () => {
    const allSavedNotes = getLocalData('notes')

    if(!allSavedNotes){
        notesList.innerHTML = "<p>Ainda não existem anotações salvas</p>"
        return
    }
    
    notesList.innerHTML = ""

    allSavedNotes.forEach(note => {
        notesList.appendChild(noteCard({...note}))
    })
}

const saveNote = (note) => {
    const allSavedNotes = getLocalData('notes') ?? []
    allSavedNotes.push(note)

    setLocalData('notes', allSavedNotes)

    listAllNotes()
}

export const notesControl = () => {
    showNotes.addEventListener("click", handleNotesContainer)
    closeNotesContainer.addEventListener("click", handleNotesContainer)

    showNewNotesForm.addEventListener("click", () => {
        newNote(document.body, saveNote)
    })

    window.addEventListener('load', listAllNotes)
}