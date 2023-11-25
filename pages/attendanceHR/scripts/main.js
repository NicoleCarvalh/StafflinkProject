import { getAllAttendances, getEmployee, stafflinkURL_employeePhoto } from "../../../patternScripts/api/stafflink.js";
import { allUtils } from "../../../patternScripts/main.js";

allUtils.access();
allUtils.sideMenu();
allUtils.notes();

getAllAttendances()
.then((attendances) => {
  if(attendances.length > 0) {
    // createCompleteAttendanceObject(attendances).then((attendanceList) => {
    //   listAttendance(attendanceList);
    // });

    listAttendance(attendances);
  }
});

function listAttendance(attendanceList) {
  document.getElementById("tbody").innerHTML = "";

  for (let i = 0; i < attendanceList.length; i++) {
    let employeePhoto = attendanceList[i].employeephotoname;
    let empName = attendanceList[i].name;
    let empSector = attendanceList[i].sector;
    let empJourney =
      attendanceList[i].journeyinit +
      " - " +
      attendanceList[i].journeyend;
    let registerDate = attendanceList[i].attendancedate;
    registerDate = registerDate.split("-").reverse().join("/");
    let empEntrance = attendanceList[i].entrance;
    let empExit = attendanceList[i].departure;

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

    divUserInfos.append(spanEmployeePhoto, empName);

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

    let tdOverrun = document.createElement("td");
    tdOverrun.className = "additional";

    if (empExit == null) {
      tdExit.innerText = "-";
      tdOverrun.innerText = "-";
    } else {
      tdExit.innerText = empExit;
      let overrun = calculateOverrun(empJourney, empEntrance, empExit);
      tdOverrun.innerText = overrun.toFixed(2).toString().replace('.', ':');

      overrun > 0.00 ? tdOverrun.classList.add('positive') : tdOverrun.classList.add('negative')
    }

    let elementsToAdd = [
      tdUser,
      tdSector,
      tdJourney,
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
}

// async function createCompleteAttendanceObject(attendances) {
//   let attendanceList = [];

//   for (let i = 0; i < attendances.length; i++) {
//     await getEmployee(attendances[i].employeeidattendance)
//       .then((employee) => {
//         let employeePhotoName = employee.employeephotoname;
//         let employeeName = employee.name;
//         let employeeSector = employee.sector;
//         let employeeJourneyInit = employee.journeyinit;
//         let employeeJourneyEnd = employee.journeyend;

//         attendanceList.push({
//           ...attendances[i],
//           employeePhotoName,
//           employeeName,
//           employeeSector,
//           employeeJourneyInit,
//           employeeJourneyEnd,
//           overrun: "00:00",
//         });
//       })
//       .catch((error) => {
//         console.log("Erro no then dos employees");
//         console.log(error.message);
//       });
//   }

//   return attendanceList;
// }

function calculateOverrun(journey, entrance, exit) {
  // const journeyInit = new Date(`01/01/2023 ${journey.split(" - ")[0]}`);
  // const journeyEnd = new Date(`01/01/2023 ${journey.split(" - ")[1]}`);
  // const entranceTime = new Date(`01/01/2023 ${entrance}`);
  // const exitTime = new Date(`01/01/2023 ${exit}`);

  // const expectedJourneyTime = journeyEnd - journeyInit;

  // const actualJourneyTime = exitTime - entranceTime;

  // const differenceInHours =
  //   (actualJourneyTime - expectedJourneyTime) / 1000 / 60 / 60;

  // const differenceInMinutes = Math.round((differenceInHours % 1) * 60);

  // const sign = differenceInHours >= 0 ? "+" : "-";
  // const formattedHours = Math.floor(Math.abs(differenceInHours)).toString().padStart(2, "0");;
  // const formattedMinutes = differenceInMinutes.toString().padStart(2, "0");

  // return `${sign}${formattedHours}:${formattedMinutes}`;

  const completejourney = journey.split(' - ')
  const journeyInit = journey.split(' - ')[0]
  const journeyExit = journey.split(' - ')[1]

  const journeyInitOnDate = new Date(`01/01/2023 ${journeyInit}`)
  const journeyExitOnDate = new Date(`01/01/2023 ${journeyExit}`)

  const journeyDifference = journeyExitOnDate.getTime() - journeyInitOnDate.getTime()
  const journeyInHours = journeyDifference / 1000 / 60 / 60

  // console.log(journeyInHours)
  

  const entranceAttendanceOnDate = new Date(`01/01/2023 ${entrance}`)
  const exitAttendanceOnDate = new Date(`01/01/2023 ${exit}`)

  const attendanceDifference = exitAttendanceOnDate.getTime() - entranceAttendanceOnDate.getTime()
  const attendanceDifferenceInHours = attendanceDifference / 1000 / 60 / 60
  const attendanceInHours = Math.abs(attendanceDifferenceInHours)

  const difference = attendanceInHours - journeyInHours
  // console.log(difference)
  // const difference = journeyInHours - (journeyInHours - attendanceInHours)

  // console.log(`Jornada (H) prevista: ${journeyInHours}`)
  // console.log(`Jornada (H) feita: ${attendanceInHours}`)
  // console.log(`Diferença: ${difference}`)
  // console.log('---------------------')


  // journeyInHours - differenceInHours
  return difference
}
