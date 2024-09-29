let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let intervalId = 0;
let isRunning = false;

function startStopwatch() {
  if (!isRunning) {
    startTime = new Date().getTime();
    intervalId = setInterval(() => {
      currentTime = new Date().getTime() - startTime;
      document.getElementById('display').innerText = formatTime(currentTime);
    }, 10);
    isRunning = true;
  }
}

function pauseStopwatch() {
  clearInterval(intervalId);
  isRunning = false;
}

function restartStopwatch() {
  clearInterval(intervalId);
  startTime = 0;
  currentTime = 0;
  lapTimes = [];
  document.getElementById('display').innerText = '00:00:00.00';
  document.getElementById('lap-times').innerHTML = '';
  isRunning = false;
}

function lapStopwatch() {
  if (isRunning) {
    const lapTime = currentTime;
    lapTimes.push(lapTime);
    document.getElementById('lap-times').innerHTML += `<li>Lap ${lapTimes.length}: ${formatTime(lapTime)}</li>`;
    if (lapTimes.length >= 5) {
      document.getElementById('lap-button').disabled = true;
    }
  } else {
    alert('Please start the stopwatch before taking a lap!');
  }
}

function resetStopwatch() {
  lapTimes = [];
  document.getElementById('lap-times').innerHTML = '';
  document.getElementById('lap-button').disabled = false;
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

document.getElementById('start-button').addEventListener('click', startStopwatch);
document.getElementById('pause-button').addEventListener('click', pauseStopwatch);
document.getElementById('restart-button').addEventListener('click', restartStopwatch);
document.getElementById('lap-button').addEventListener('click', lapStopwatch);
document.getElementById('reset-button').addEventListener('click', resetStopwatch);