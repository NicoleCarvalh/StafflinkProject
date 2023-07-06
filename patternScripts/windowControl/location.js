export const getCurrentPagePath = () => {
    const currentPath = window.location.href
    const regexPagePathVirify = RegExp(/\w{0,}\/index.html/g)
    const currentPage = currentPath.match(regexPagePathVirify)[0].split("/")[0]

    return {
        currentPath: currentPath,
        currentPage: currentPage
    }
}

export const setCurrentPagePath = (page) => {
    window.location.href = `/pages/${page}/index.html`
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