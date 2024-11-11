// Get elements by their IDs
let hr = document.getElementById("hr");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let count = document.getElementById("count");

let startStopButton = document.getElementById("startStop");
let resetButton = document.getElementById("reset");
let snapBtn = document.getElementById("snap");

// Initialize time variables
let hours = 0;
let minutes = 0;
let seconds = 0;
let counts = 0;

// Flag to check whether the stopwatch is running
let timerRunning = false;
let interval;

// Start/Stop button function
startStopButton.addEventListener("click", function () {
    if (!timerRunning) {
        timerRunning = true;
        interval = setInterval(stopwatch, 10); // Set interval to 10 milliseconds (count increments every 10 ms)
        startStopButton.textContent = `Stop`;
    }
    else {
        timerRunning = false;
        clearInterval(interval);
        startStopButton.textContent = `Start`;
    }
});

// Reset button function
resetButton.addEventListener("click", function () {
    timerRunning = false;
    clearInterval(interval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    counts = 0;
    updateDisplay();
    document.getElementById("snapsContainer").innerHTML = "";
    startStopButton.textContent = "Start";

});
// Snap to Display the Snaps
snapBtn.addEventListener("click", function () {
    const snapContainer = document.createElement('div');
    snapContainer.className = 'txt';

    const hr = document.createElement('span');
    hr.className = 'digit';
    hr.textContent = formatTime(hours);

    const colon1 = document.createElement('span');
    colon1.className = 'txt';
    colon1.textContent = ":";

    const mn = document.createElement('span');
    mn.className = 'digit';
    mn.textContent = formatTime(minutes);

    const colon2 = document.createElement('span');
    colon2.className = 'txt';
    colon2.textContent = ":";

    const sc = document.createElement('span');
    sc.className = 'digit';
    sc.textContent = formatTime(seconds);

    const colon3 = document.createElement('span');
    colon3.className = 'txt';
    colon3.textContent = ":";

    const msc = document.createElement('span');
    msc.className = 'digit';
    msc.textContent = formatTime(counts);

    // Append time elements to snapContainer
    snapContainer.appendChild(hr);
    snapContainer.appendChild(colon1);
    snapContainer.appendChild(mn);
    snapContainer.appendChild(colon2);
    snapContainer.appendChild(sc);
    snapContainer.appendChild(colon3);
    snapContainer.appendChild(msc);

    // Append snapContainer to the main snaps display container
    document.getElementById("snapsContainer").appendChild(snapContainer);
});

// Stopwatch function to track time
function stopwatch() {
    counts++;

    if (counts === 100) { // 100 counts = 1 second (since it's running at 10ms intervals)
        counts = 0;
        seconds++;
    }

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    updateDisplay();
}

// Update the displayed time
function updateDisplay() {
    hr.textContent = formatTime(hours);
    min.textContent = formatTime(minutes);
    sec.textContent = formatTime(seconds);
    count.textContent = formatTime(counts);
}

// Format time to always display two digits till 10= 01 instead of 1
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}
