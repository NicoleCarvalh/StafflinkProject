export const getCurrentPagePath = () => {
    const currentPath = window.location.href
    const regexPagePathVirify = RegExp(/\w{0,}\/index.html/g)
    const regexPagePathVirifyWithoutIndex = RegExp(/\w{0,}\//g)
    let currentPage;

    if(currentPath.match(regexPagePathVirify)) {
        currentPage = currentPath.match(regexPagePathVirify)[0].split("/")[0]
    } else {
        const length = currentPath.match(regexPagePathVirifyWithoutIndex).length
        currentPage = currentPath.match(regexPagePathVirifyWithoutIndex)[length - 1].split("/")[0]
    }

    return {
        currentPath: currentPath,
        currentPage: currentPage
    }
}

export const setCurrentPagePath = (page) => {
    window.location.href = `/pages/${page}/index.html`
}

export const backToPreviousPage = () => {
    history.back()
}

export const handlePageByLink = (element) => {
    const {currentPath, currentPage} = getCurrentPagePath()
    const pageLinkElement = element.getAttribute("data-link-to")

    if(currentPage === pageLinkElement) {
        element.classList.toggle('current')

        return
    } 

    element.addEventListener("click", () => setCurrentPagePath(pageLinkElement))
}