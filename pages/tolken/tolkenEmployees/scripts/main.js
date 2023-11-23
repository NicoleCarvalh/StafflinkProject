import { allUtils } from "../../../../patternScripts/main.js";

// const baseUrl = 'https://employees-api-oite.onrender.com'

const baseUrl = "http://localhost:4040";

document.getElementById("confirm").addEventListener("click", () => {
  let input = document.getElementById("tolkenEmployee").value;

  document.getElementById("optionsTolken").style.display = 'none';
  document.getElementById("loading-div").innerHTML = ` <div id="loading-bubble">


  <dotlottie-player
    src="https://lottie.host/29e5ec97-c579-4bd4-bba1-a1801849014d/I7wKA6dKTe.json"
    background="transparent"
    speed="1"
    loop
    autoplay
  ></dotlottie-player>
</div>`;

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
      if (input == json[0].tolkennumber) {
        let currentUser = allUtils.getLocalData("user").user;
        let currentDate = new Date().toLocaleDateString();

        let currentHours = new Date().getHours().toString();
        let currentMinutes = new Date()
          .getMinutes()
          .toLocaleString("pt-BR", { minimumIntegerDigits: 2 });
        let currentTime = `${currentHours}:${currentMinutes}`;

        fetch(`${baseUrl}/attendance/${currentUser.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
        })
          .then((data) => {
            return data.json();
          })
          .then((json) => {
            if (
              (json.length != 0 && json[json.length - 1].departure != null) ||
              json.length == 0
            ) {
              fetch(`${baseUrl}/attendance`, {
                method: "POST",
                headers: {
                  "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                  date: currentDate,
                  entrance: currentTime,
                  departure: null,
                  employeeId: currentUser.id,
                }),
              });
            } else if (
              json.length != 0 &&
              json[json.length - 1].departure == null
            ) {
              fetch(`${baseUrl}/attendance/${currentUser.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                  newAttendanceDeparture: currentTime,
                }),
              });
            } else {
              console.log("Fugiu da verificação");
            }
          });

        document.getElementById("tolkenEmployee").value = "";
        alert("Ponto registrado com sucesso :)");
        document.getElementById("loading-div").innerHTML = "";
        document.getElementById("optionsTolken").style.display = 'flex';
      } else {
        alert("Tolken inválido");
        document.getElementById("loading-div").innerHTML = "";
        document.getElementById("optionsTolken").style.display = 'flex';
      }
    });
});
