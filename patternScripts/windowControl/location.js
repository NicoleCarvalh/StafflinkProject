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
  const pageLinkElement = element.getAttribute("data-link-to");

  if (currentPage === pageLinkElement) {
    element.classList.toggle("current");

    return;
  }

  element.addEventListener("click", (event) => {
    if (pageLinkElement == "logout") {
      let logoutConfirmation = confirm("Deseja realmente sair?");

      if (logoutConfirmation) {
        setCurrentPagePath(pageLinkElement);
      }
    } else {
      setCurrentPagePath(pageLinkElement);
    }
  });
};
