// import { allUtils } from "../../../patternScripts/main.js"

let tolkenNumber = 0;

//tolken number
// function generateTolken() {
//   tolkenNumber = Math.floor(100000 + Math.random() * 900000);
//   const numberSpan = document.getElementById("tolken");
//   numberSpan.innerText = tolkenNumber;
// }

tolkenNumber = Math.floor(100000 + Math.random() * 900000)

console.log(tolkenNumber);
// generateTolken();

export { tolkenNumber };

//progress bar
const duration = 60;

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
