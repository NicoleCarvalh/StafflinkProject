const notesContainer = document.getElementById("notesContainer")
const closeNotesContainer = document.getElementById("closeNotes")
const showNotes = document.getElementById("showNotes")

const handleNotesContainer = () => {
    notesContainer.classList.toggle("visible")
}

export const notesControl = () => {
    showNotes.addEventListener("click", handleNotesContainer)
    closeNotesContainer.addEventListener("click", handleNotesContainer)
}