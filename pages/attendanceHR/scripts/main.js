import { allUtils } from "../../../patternScripts/main.js";

allUtils.access();
allUtils.sideMenu();
allUtils.notes();

console.log("Iniciando requisição do fetch");

fetch("https://employees-api-oite.onrender.com/attendance", {
  method: "GET",
  headers: {
    "Content-Type": "Application/json",
  },
})
  .then((data) => {
    return data.json();
  })
  .then((json) => {
    console.log("Iniciando o 1 then (antes do for)");
    console.log(
      "Console log do data.json (antes do for):" + JSON.stringify(json)
    );

    teste().then(() => {
      console.log("Final do for (antes da listagem)");
    });
  });

function list(list) {
  console.log("Entrou na função list()");
  console.log("Verificacao do parametro recebido na função list(): ");
  console.log(list);

  for (let i = 0; i < list.length; i++) {
    let employeePhoto = list[i].employeePhotoName;
    let empName = list[i].employeeName;
    let empSector = list[i].employeeSector;
    let empJourney =
      list[i].employeeJourneyInit + " - " + list[i].employeeJourneyEnd;
    let registerDate = list[i].attendancedate;
    let empEntrance = list[i].entrance;
    let empExit = list[i].departure;

    let trInfos = document.createElement("tr");

    let tdUser = document.createElement("td");

    let divUserInfos = document.createElement("div");
    divUserInfos.className = "employeeCode";

    let spanEmployeePhoto = document.createElement("span");
    spanEmployeePhoto.className = "employeePhoto";
    let imgEmployeePhoto = document.createElement("img");
    imgEmployeePhoto.src = stafflinkURL_employeePhoto + employeePhoto;
    imgEmployeePhoto.alt = "funcionário";
    spanEmployeePhoto.appendChild(imgEmployeePhoto);

    divUserInfos.appendChild(spanEmployeePhoto);
    divUserInfos.innerText = empName;

    tdUser.appendChild(divUserInfos);

    let tdSector = document.createElement("td");
    tdSector.innerText = empSector;

    let tdJourney = document.createElement("td");
    tdJourney.innerText = empJourney;

    let tdDate = document.createElement("td");
    tdDate.innerText = registerDate;

    let tdEntrance = document.createElement("td");
    tdEntrance.innerText = empEntrance;

    let tdExit = document.createElement("td");
    tdExit.innerText = empExit;

    let elementsToAdd = [
      tdUser,
      tdSector,
      tdJourney,
      tdDate,
      tdEntrance,
      tdExit,
    ];

    for (let i = 0; i < elementsToAdd.length; i++) {
      trInfos.appendChild(elementsToAdd[i]);
    }

    document.getElementById("tbody").appendChild(trInfos);
  }
}

async function teste(json) {
  let attendanceListing = [];

  for (let i = 0; i < json.length; i++) {
    console.log(
      "Entrando no for (começo do for, antes do fetch dos employees)"
    );
    await fetch(
      `https://employees-api-oite.onrender.com/employees/${json[i].employeeidattendance}`
    )
      .then((data) => {
        console.log(
          "Iniciando o 2 then (retornando data.json do fetch de employees)"
        );
        return data.json();
      })
      .then((employee) => {
        let employeePhotoName = employee[0].employeephotoname;
        let employeeName = employee[0].name;
        let employeeSector = employee[0].sector;
        let employeeJourneyInit = employee[0].journeyinit;
        let employeeJourneyEnd = employee[0].journeyend;

        attendanceListing.push({
          ...json[i],
          employeePhotoName,
          employeeName,
          employeeSector,
          employeeJourneyInit,
          employeeJourneyEnd,
          overrun: "00:00",
        });
      })
      .catch((error) => {
        console.log("Erro no then dos employees");
      });
  }

  return attendanceListing;
}
