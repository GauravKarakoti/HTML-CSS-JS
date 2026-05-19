const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const millisecondsLabel = document.getElementById("milliseconds");
const startButton = document.getElementById("startBtn");
const stopButton = document.getElementById("stopBtn");
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
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
function startTimer() {
    startTime = Date.now() - elapsedTime;

    interval = setInterval(() => {
        elapsedTime = Date.now() - startTime;

        minutes = Math.floor(elapsedTime / 60000);
        seconds = Math.floor((elapsedTime % 60000) / 1000);
        milliseconds = elapsedTime % 1000;

        displayTimer();
    }, 10);

    startButton.disabled = true;
}
function stopTimer() {
    clearInterval(interval);
    addToLapList();
    resetTimerData();
    startButton.disabled = false;
}
function pauseTimer() {
    clearInterval(interval);
    startButton.disabled = false;
}
function resetTimer() {
    clearInterval(interval);
    resetTimerData();
    startButton.disabled = false;
}
function updateTimer() {
    milliseconds++;
    if(milliseconds == 1000) {     // 1000 -> 1 second = 1000 milliseconds
        milliseconds = 0;
        seconds++;
        if(seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }
    displayTimer();
}
function displayTimer() {
    millisecondsLabel.textContent = padTime(milliseconds, 3);
    secondsLabel.textContent = padTime(seconds, 2);
    minutesLabel.textContent = padTime(minutes, 2);
}
function padTime(time, number) {
    return time.toString().padStart(number, '0');
}
function resetTimerData() {
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    elapsedTime = 0;
    displayTimer();
}
function addToLapList() {
    const lapTime = `${padTime(minutes, 2)}:${padTime(seconds, 2)}:${padTime(milliseconds, 3)}`;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>${lapTime}`;
    lapList.appendChild(listItem);
}