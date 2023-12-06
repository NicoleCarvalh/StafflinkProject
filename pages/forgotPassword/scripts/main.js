import { allUtils } from "../../../patternScripts/main.js";

// allUtils.sideMenu()

allUtils.toastAlert({message: 'Atenção!', description: 'Essa página está em desenvolvimento.', className: 'danger', options: {duration: -1, close: false}}).then(() => {
    window.location.href = '/'
})