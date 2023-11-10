import { setSystemAccess } from "../accessSystemControl/accessByRole.js";
import { getLocalData } from "../localStorageControl/getData.js";

export const getCurrentPagePath = () => {
  const currentPath = window.location.href;
  const regexPagePathVerify = RegExp(/\w{0,}\/index.html/g);
  const regexPagePathVerifyWithoutIndex = RegExp(/\w{0,}\//g);
  let currentPage;

  if (currentPath.match(regexPagePathVerify)) {
    currentPage = currentPath.match(regexPagePathVerify)[0].split("/")[0];
  } else {
    const length = currentPath.match(regexPagePathVerifyWithoutIndex).length;
    currentPage = currentPath
      .match(regexPagePathVerifyWithoutIndex)
      [length - 1].split("/")[0];
  }

  return {
    currentPath: currentPath,
    currentPage: currentPage,
  };
};

export const setCurrentPagePath = (page) => {
  window.location.href = `/pages/${page}/index.html`;
};

export const backToPreviousPage = () => {
  history.back();
};

export const handlePageByLink = (element) => {
  const { currentPath, currentPage } = getCurrentPagePath();
  let pageLinkElement = element.getAttribute("data-link-to");

  if (currentPage === pageLinkElement) {
    element.classList.toggle("current");

    return;
  }

  element.addEventListener("click", (event) => {
    switch (pageLinkElement){
      case "logout":
          let logoutConfirmation = confirm("Deseja realmente sair?");

          if (logoutConfirmation) {
            setCurrentPagePath(pageLinkElement);
          }
        break
      case "attendanceHR":
          setSystemAccess()

          console.log('Acesso do usuário logado:')
          console.log(getLocalData('user').access.sector)
          console.log('-----------------------')

          if(getLocalData('user').access.sector !== "Recursos Humanos") {
            console.log('Setor NÃO é o de RH')
            console.log('-----------------------')
            console.log('-----------------------')

            console.log('Setor:')
            console.log(getLocalData('user').access.sector)
            console.log('-----------------------')

            pageLinkElement = 'attendanceEmployee'

            console.log('Página destino:')
            console.log(pageLinkElement)
            console.log('-----------------------')
          } else {
            console.log('Setor É o de RH')
            console.log('-----------------------')
            console.log('-----------------------')

            console.log('Setor:')
            console.log(getLocalData('user').access.sector)
            console.log('-----------------------')

            console.log('Página destino:')
            console.log(pageLinkElement)
            console.log('-----------------------')

            console.log('Página destino:')
            console.log(pageLinkElement)
            console.log('-----------------------')
          }

        break
      case "attendanceEmployee":

        break
    }

    // setCurrentPagePath(pageLinkElement);
  });
};
