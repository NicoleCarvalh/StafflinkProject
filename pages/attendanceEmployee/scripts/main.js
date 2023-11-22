import { allUtils } from "../../../patternScripts/main.js";

allUtils.access();

allUtils.sideMenu();
allUtils.notes();

let currentUser = allUtils.getLocalData("user").user;

fetch(`https://employees-api-oite.onrender.com/attendance/${currentUser.id}`, {
  method: "GET",
  headers: {
    "Content-Type": "Application/json",
  },
})
  .then((data) => {
    return data.json();
  })
  .then((attendance) => {
    document.getElementById("tbody").innerHTML = "";

    for (let i = 0; i < attendance.length; i++) {
      let registerDate = attendance[i].attendancedate;
      registerDate = registerDate.split("-").reverse().join("/");
      let empEntrance = attendance[i].entrance;
      let empExit = attendance[i].departure;
      let empJourney = currentUser.journeyinit + " - " + currentUser.journeyend;

      // console.log(empJourney);

      let trInfos = document.createElement("tr");

      let tdDate = document.createElement("td");
      tdDate.innerText = registerDate;

      let tdEntrance = document.createElement("td");
      tdEntrance.innerText = empEntrance;

      let tdExit = document.createElement("td");
      tdExit.innerText = empExit;

      let tdOverrun = document.createElement("td");
      tdOverrun.className = "additional positive";
      let overrun = calculateOverrun(empJourney, empEntrance, empExit);
      tdOverrun.innerText = overrun;

      let elementsToAdd = [
        tdDate,
        tdEntrance,
        tdExit,
        tdOverrun,
      ];
  
      for (let i = 0; i < elementsToAdd.length; i++) {
        trInfos.appendChild(elementsToAdd[i]);
      }
  
      document.getElementById("tbody").appendChild(trInfos);
    }
  });

function calculateOverrun(journey, entrance, exit) {
  const journeyInit = new Date(`01/01/2023 ${journey.split(" - ")[0]}`);
  const journeyEnd = new Date(`01/01/2023 ${journey.split(" - ")[1]}`);
  const entranceTime = new Date(`01/01/2023 ${entrance}`);
  const exitTime = new Date(`01/01/2023 ${exit}`);

  const expectedJourneyTime = journeyEnd - journeyInit;

  const actualJourneyTime = exitTime - entranceTime;

  const differenceInHours =
    (actualJourneyTime - expectedJourneyTime) / 1000 / 60 / 60;

  const differenceInMinutes = Math.round((differenceInHours % 1) * 60);

  const sign = differenceInHours >= 0 ? "+" : "-";
  const formattedHours = Math.floor(Math.abs(differenceInHours));
  const formattedMinutes = differenceInMinutes.toString().padStart(2, "0");

  return `${sign}${formattedHours}:${formattedMinutes}`;
}
