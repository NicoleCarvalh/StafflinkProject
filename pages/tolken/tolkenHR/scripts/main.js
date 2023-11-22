// import { allUtils } from "../../../patternScripts/main.js"

//tolken number
// function generateTolken() {
//   tolkenNumber = Math.floor(100000 + Math.random() * 900000);
//   const numberSpan = document.getElementById("tolken");
//   numberSpan.innerText = tolkenNumber;
// }

// generateTolken();

// const localUrl = "http://localhost:4040/tolken"

const localUrl = "https://employees-api-oite.onrender.com/tolken"

insertTolken();

function generateTolken() {
  insertTolken().then((data) => {
    fetch(`${localUrl}/${data}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({newTolkenNumber: Math.floor(100000 + Math.random() * 900000)}),
    }).then(() => {
      insertTolken();
    });
  });
}

async function insertTolken() {
  let currentTolken = await fetch(
    `${localUrl}`,
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
      document.getElementById("tolkenId").innerText = json[0].tolkennumber;
      return json[0].tolkennumber;
    });

  return currentTolken;
}

//voce é incrivel SZ

//progress bar
const duration = 64;

let timeLeft = duration;
const progressBar = document.getElementById("progress");

function updateProgress() {
  timeLeft--;
  const barWidth = (timeLeft / duration) * 100;
  progressBar.style.width = barWidth + "%";

  if (timeLeft <= 0) {
    timeLeft = duration;
    progressBar.style.width = "100%";
  }
}

setInterval(generateTolken, 60000);
setInterval(updateProgress, 1000);
