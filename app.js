let timer;
let isRunning = false;
let seconds = 1 * 60; // Start with 25 minutes
let isBreak = false; // Flag to track if it's a break time

// Update the timer display
function updateTimer() {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  document.getElementById('time-left').textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Start or stop the timer
function startTimer() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById('start-btn').textContent = 'Start';
  } else {
    timer = setInterval(() => {
      seconds--;
      updateTimer();

      if (seconds <= 0) {
        clearInterval(timer);
        isBreak = !isBreak;
        seconds = isBreak ? 5 * 60 : 25 * 60; // Switch between work and break periods
        document.getElementById('status').textContent = isBreak ? 'Break Time!' : 'Work Time!';
        new Notification('Pomodoro Timer', {
          body: isBreak ? 'Take a break!' : 'Back to work!',
        });
        startTimer();
      }
    }, 1000);

    document.getElementById('start-btn').textContent = 'Pause';
  }

  isRunning = !isRunning;
}

// Reset the timer
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  seconds = 25 * 60;
  updateTimer();
  document.getElementById('start-btn').textContent = 'Start';
  document.getElementById('status').textContent = '';
}




document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);

// Initial call to update timer display
updateTimer();
