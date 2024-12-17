
# Basic JavaScript Timer Logic

This document explains the basic steps and logic for creating a simple timer using JavaScript. The timer will start, update every second, and notify the user when time is up.

## Key Concepts

- **`setInterval()`**: Used to repeatedly call a function at regular intervals (in this case, every second).
- **`clearInterval()`**: Stops the timer.
- **Time Format**: Convert seconds into minutes and seconds for display.

## Steps to Create a Timer

### 1. Define Variables

To start, define the variables for the timer, including the initial time and a reference to the interval.

```javascript
let timeLeft = 60; // 1 minute in seconds
let timer; // Will hold the setInterval reference
let isRunning = false;
```

### 2. Start the Timer

Use `setInterval()` to decrease the time by 1 second every 1000 milliseconds (1 second). Each time the interval is triggered, update the display.

```javascript
function startTimer() {
  timer = setInterval(function() {
    timeLeft--; // Decrease time by 1 second
    updateDisplay(); // Update the display to show the new time
    
    if (timeLeft <= 0) {
      clearInterval(timer); // Stop the timer
      alert("Time's up!"); // Notify the user
    }
  }, 1000); // 1000 milliseconds = 1 second
}
```

### 3. Update the Display

Create a function to update the time display. The time will be shown in `minutes:seconds` format.

```javascript
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60); // Get full minutes
  const seconds = timeLeft % 60; // Get remaining seconds
  document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
```

### 4. Stop or Pause the Timer

You can stop or pause the timer by clearing the interval.

```javascript
function stopTimer() {
  clearInterval(timer); // Stop the timer
  isRunning = false;
}
```

### 5. Reset the Timer

To reset the timer, set the time back to the initial value and update the display.

```javascript
function resetTimer() {
  clearInterval(timer);
  timeLeft = 60; // Reset to initial time
  updateDisplay();
  isRunning = false;
}
```

### 6. Start/Stop Button Logic

Use a button to toggle between starting and stopping the timer.

```javascript
document.getElementById('start-stop-btn').addEventListener('click', function() {
  if (isRunning) {
    stopTimer();
    this.textContent = 'Start';
  } else {
    startTimer();
    this.textContent = 'Stop';
  }
  isRunning = !isRunning;
});
```

### Full Example: Simple Timer with Start, Stop, and Reset Buttons

Here’s the full code for a simple timer that allows the user to start, stop, and reset the timer:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Timer Example</title>
</head>
<body>
  <h1>Simple Timer</h1>
  <div id="timer">1:00</div>
  <button id="start-stop-btn">Start</button>
  <button id="reset-btn">Reset</button>

  <script>
    let timeLeft = 60; // 1 minute in seconds
    let timer;
    let isRunning = false;

    // Start the timer
    function startTimer() {
      timer = setInterval(function() {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
          clearInterval(timer);
          alert("Time's up!");
        }
      }, 1000); // Update every second
    }

    // Update the timer display
    function updateDisplay() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    // Stop the timer
    function stopTimer() {
      clearInterval(timer);
      isRunning = false;
    }

    // Reset the timer
    function resetTimer() {
      clearInterval(timer);
      timeLeft = 60; // Reset to initial time
      updateDisplay();
      isRunning = false;
    }

    // Button actions
    document.getElementById('start-stop-btn').addEventListener('click', function() {
      if (isRunning) {
        stopTimer();
        this.textContent = 'Start';
      } else {
        startTimer();
        this.textContent = 'Stop';
      }
      isRunning = !isRunning;
    });

    document.getElementById('reset-btn').addEventListener('click', resetTimer);

    // Initialize the display
    updateDisplay();
  </script>
</body>
</html>
```

## Enhancements

### 1. Sound Notification
You can add a sound to notify the user when the timer reaches zero using the `Audio` object:

```javascript
const beepSound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Replace with desired sound URL

function playSound() {
  beepSound.play();
}
```

### 2. Browser Notifications
You can display browser notifications when the timer finishes:

```javascript
function showNotification() {
  if (Notification.permission === "granted") {
    new Notification("Pomodoro Timer", {
      body: "Time's up! Take a break!",
      icon: "https://example.com/icon.png",
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("Pomodoro Timer", {
          body: "Time's up! Take a break!",
        });
      }
    });
  }
}
```

---

## Conclusion

This is the basic structure of creating a timer with JavaScript. You can extend this logic by adding more features like configurable time, customizable sounds, or integrating a user interface for better user interaction.

Feel free to enhance or modify this timer for your own needs!
