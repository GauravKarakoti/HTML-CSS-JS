const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const millisecondsLabel = document.getElementById("milliseconds");

const startButton = document.getElementById("startBtn");
const lapButton = document.getElementById("lapBtn");
const pauseButton = document.getElementById("pauseBtn");
const resetButton = document.getElementById("resetBtn");

const lapList = document.getElementById("laplist");

// stopwatch variables
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let startTime;
let elapsedTime = 0;
let interval;

let isRunning = false;
let isPaused = false;

startButton.addEventListener("click", startTimer);
lapButton.addEventListener("click", addToLapList);
pauseButton.addEventListener("click", togglePause);
resetButton.addEventListener("click", resetTimer);

function startTimer() {
    if (isRunning) return;

    startTime = Date.now() - elapsedTime;

    interval = setInterval(() => {
        elapsedTime = Date.now() - startTime;

        minutes = Math.floor(elapsedTime / 60000);
        seconds = Math.floor((elapsedTime % 60000) / 1000);
        milliseconds = elapsedTime % 1000;

        displayTimer();
    }, 10);

    isRunning = true;

    startButton.disabled = true;
}

function togglePause() {
    if (!isRunning) return;

    if (!isPaused) {
        clearInterval(interval);

        isPaused = true;

        pauseButton.textContent = "Continue";
    } else {
        startTime = Date.now() - elapsedTime;

        interval = setInterval(() => {
            elapsedTime = Date.now() - startTime;

            minutes = Math.floor(elapsedTime / 60000);
            seconds = Math.floor((elapsedTime % 60000) / 1000);
            milliseconds = elapsedTime % 1000;

            displayTimer();
        }, 10);

        isPaused = false;

        pauseButton.textContent = "Pause";
    }
}

function resetTimer() {
    clearInterval(interval);

    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    elapsedTime = 0;

    isRunning = false;
    isPaused = false;

    pauseButton.textContent = "Pause";

    startButton.disabled = false;

    displayTimer();
}

function displayTimer() {
    millisecondsLabel.textContent = padTime(milliseconds, 3);
    secondsLabel.textContent = padTime(seconds, 2);
    minutesLabel.textContent = padTime(minutes, 2);
}

function padTime(time, digits) {
    return time.toString().padStart(digits, '0');
}

function addToLapList() {
    if (!isRunning) return;

    const lapTime =
        `${padTime(minutes, 2)}:` +
        `${padTime(seconds, 2)}:` +
        `${padTime(milliseconds, 3)}`;

    const listItem = document.createElement("li");

    listItem.innerHTML =
        `<span>Lap ${lapList.childElementCount + 1}:</span> ${lapTime}`;

    lapList.prepend(listItem);
}