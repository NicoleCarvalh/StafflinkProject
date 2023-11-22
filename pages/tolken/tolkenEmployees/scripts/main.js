import { allUtils } from "../../../../patternScripts/main.js";

// const baseUrl = 'https://employees-api-oite.onrender.com'

const baseUrl = 'http://localhost:4040'


document.getElementById("confirm").addEventListener("click", () => {
  let input = document.getElementById("tolkenEmployee").value;

  fetch(`${baseUrl}/tolken`, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      if (input == json[0].tolkenNumber) {
        let currentUser = allUtils.getLocalData("user").user;
        let currentDate = new Date();

        fetch(
          `${baseUrl}/attendance/${currentUser.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
            },
          }
        )
          .then((data) => {
            return data.json();
          })
          .then((json) => {
            if (json[0] && json[0].departure != null) {
              // criar novo registro de ponto (post)
            } else if (json[0] && json[0].departure == null) {
              // só adiciona saida no campo já existente (put)
            } else {
              // criar novo registro (com campo SAIDA NULLO)
            }
          });

        fetch(`${baseUrl}/attendance`, {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: {},
        });
      }
    });
});
