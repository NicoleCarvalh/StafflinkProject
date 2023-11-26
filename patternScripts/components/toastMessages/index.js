export function showToastAlert(props) {
    return new Promise((resolve) => {
        createCustomToastfy({...props, confirmActions: {onClickConfirm: resolve}}).showToast()
    });
}

export function showToastConfirm(props) {
    return new Promise((resolve, reject) => {
        createCustomToastfy({...props, confirmActions: {onClickConfirm: resolve, onClickCancel: reject}}).showToast()
    });
}

function createCustomToastfy({
    message = 'Alertaaa',
    description = 'O alerta foi chamado.',
    className = 'info',
    confirmActions = false,
    options = {
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true,
    },
    styles,
}) {
    const customToast = Toastify({
        text: message,
        ...{
            ...options,
            // duration: 3000,
            duration: -1,
            gravity: "top",
            position: "right",
            // close: true,
        },
        className,
        style: {
            ...styles ?? {},
        },
        node: createToastElements(message, description, {confirmEvent: confirmActions?.onClickConfirm, cancelEvent: confirmActions?.onClickCancel})
    })

    return customToast
}

function createToastElements(message, description, {confirmEvent, cancelEvent}) {
    const allElements = []
    const toastContainer = document.createElement('div')

    const messageContainer = document.createElement('div')
    messageContainer.className = 'messageContainer'
    
    const title = document.createElement('h1')
    title.innerText = message

    const paragraph = document.createElement('p')
    paragraph.innerText = description

    messageContainer.append(title, paragraph)
    allElements.push(messageContainer)

    const optionsContainer = document.createElement('div')
    optionsContainer.className = 'optionsContainer'

    if(cancelEvent) {
        const closeButton = document.createElement('button')
        closeButton.innerText = 'Cancelar'
        closeButton.className = 'closeButton'
    
        closeButton.addEventListener('click', () => {
            if(cancelEvent) {
                cancelEvent(false)
            }
    
            document.querySelector('.toastify').remove()
        })

        optionsContainer.appendChild(closeButton)
    }

    const confirmButton = document.createElement('button')
    confirmButton.innerText = 'Ok'
    confirmButton.className = 'confirmButton'

    confirmButton.addEventListener('click', () => {
        if(confirmEvent) {
            confirmEvent(true)
        }

        document.querySelector('.toastify').remove()
    })
    
    optionsContainer.appendChild(confirmButton)

    allElements.push(optionsContainer)

    toastContainer.append(...allElements)

    return toastContainer
}