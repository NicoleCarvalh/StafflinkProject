import { allUtils } from "../../../patternScripts/main.js";
allUtils.access();

allUtils.sideMenu();
allUtils.notes();
allUtils.handlePageByCustomLink(document.querySelector(".newNews"));

fetch("https://employees-api-oite.onrender.com/news", {
  method: "GET",
  headers: {
    "Content-Type": "Application/json",
  },
})
.then((data) => {
  return data.json();
})
.then((json) => {
  let newsList = [];

  for(let i = 0; i < json.length; i++){
    let currentDate = new Date();
    
    let newsExpirationDate = new Date(json[i].expirationdate);

    if(currentDate > newsExpirationDate){
      fetch(`https://employees-api-oite.onrender.com/news/${json[i].id}`, {
        method: "DELETE",
      })
    } else {
      newsList.push(json[i]);
    }
  }

  list(newsList);
})

function list(json) {
  for(let i = 0; i < json.length; i++){
    let newsTitle = json[i].title;
    let newsDescription = json[i].description;
    let newsImg = json[i].bannerfilename;

    let title = document.createElement("h2");
    title.innerText = newsTitle;
    
    let description = document.createElement("p");
    description.innerText = newsDescription;
    
    let divNewsText = document.createElement("div");
    divNewsText.className = "newsText";

    divNewsText.appendChild(title);
    divNewsText.appendChild(description);

    let divNewsImg = document.createElement("div");
    divNewsImg.className = "newsImg";

    let imgNews = document.createElement("img");
    imgNews.src = `https://employees-api-oite.onrender.com/news/bannerFile/${newsImg}`;
    imgNews.alt = "Imagem da notícia";

    divNewsImg.appendChild(imgNews);

    
    let divNewsContent = document.createElement("div");
    divNewsContent.className = "newsContent";

    divNewsContent.appendChild(divNewsText);
    divNewsContent.appendChild(divNewsImg);
        

    document.getElementById("news").appendChild(divNewsContent)
  }
}