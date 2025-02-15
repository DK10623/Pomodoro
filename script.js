let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const workModeButton = document.getElementById('work-mode');
const restModeButton = document.getElementById('rest-mode');
const modeToggleButton = document.getElementById('mode-toggle');
const addFiveButton = document.getElementById('add-five');

modeToggleButton.classList.add('work-mode');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function toggleMode() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 30 * 60 : 5 * 60;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    modeToggleButton.textContent = isWorkTime ? 'Switch to Break Mode' : 'Switch to Work Mode';
    
    // Update button color
    modeToggleButton.className = isWorkTime ? 'work-mode' : 'break-mode';
    
    // Add emoji animation
    const emojiContainer = document.querySelector('.mode-emoji');
    emojiContainer.textContent = '🎉';
    emojiContainer.classList.remove('animate');
    void emojiContainer.offsetWidth; // Trigger reflow
    emojiContainer.classList.add('animate');
    
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = isWorkTime ? 30 * 60 : 5 * 60;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? 30 * 60 : 5 * 60;
    updateDisplay();
}

function setWorkMode() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = 30 * 60;
    modeText.textContent = 'Work Time';
    updateDisplay();
}

function addFiveMinutes() {
    if (timeLeft === undefined) {
        timeLeft = isWorkTime ? 30 * 60 : 5 * 60;
    }
    timeLeft += 5 * 60; // Add 5 minutes (300 seconds)
    updateDisplay();
}

// Event Listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', toggleMode);
addFiveButton.addEventListener('click', addFiveMinutes);