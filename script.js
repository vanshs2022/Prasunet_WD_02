document.getElementById('clockButton').addEventListener('click', function() {
    document.querySelector('.time-container').style.transform = 'rotateY(0deg)';
    document.querySelector('.stopwatch').style.transform = 'rotateY(-180deg)';
    document.querySelector('.laps').style.display = 'none';
});

document.getElementById('stopwatchButton').addEventListener('click', function() {
    document.querySelector('.time-container').style.transform = 'rotateY(180deg)';
    document.querySelector('.stopwatch').style.transform = 'rotateY(0deg)';
    document.querySelector('.laps').style.display = 'block';
});

// Clock
function updateClock() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.querySelector('.clock').innerHTML = h + ":" + m + ":" + s;
    setTimeout(updateClock, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

updateClock();

// World Clock
function updateWorldClock() {
    const select = document.getElementById('countrySelect');
    const selectedTimezone = select.value;
    const now = new Date().toLocaleString("en-US", { timeZone: selectedTimezone });
    document.getElementById('worldClockDisplay').innerHTML = now;
    setTimeout(updateWorldClock, 1000);
}

document.getElementById('countrySelect').addEventListener('change', updateWorldClock);

// Stopwatch
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let stopwatch;
let lapCounter = 1;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (elapsedTime || 0);
        stopwatch = setInterval(updateStopwatch, 10);
        document.getElementById('startStopwatch').innerHTML = 'Pause';
    } else {
        isRunning = false;
        clearInterval(stopwatch);
        document.getElementById('startStopwatch').innerHTML = 'Resume';
    }
}

function updateStopwatch() {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    let minutes = Math.floor((elapsedTime / 1000) / 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    document.getElementById('display').innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds) + ':' + (milliseconds < 10 ? '0' + milliseconds : milliseconds);
}

function lapStopwatch() {
    if (isRunning) {
        let lapTime = elapsedTime;
        let minutes = Math.floor((lapTime / 1000) / 60);
        let seconds = Math.floor((lapTime / 1000) % 60);
        let milliseconds = Math.floor((lapTime % 1000) / 10);
        let lapTableBody = document.querySelector('#lapsTable tbody');
        let row = lapTableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = 'Lap ' + lapCounter;
        cell2.innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds) + ':' + (milliseconds < 10 ? '0' + milliseconds : milliseconds);
        lapCounter++;
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(stopwatch);
    elapsedTime = 0;
    document.getElementById('startStopwatch').innerHTML = 'Start';
    document.getElementById('display').innerHTML = '00:00:00';
    let lapTableBody = document.querySelector('#lapsTable tbody');
    lapTableBody.innerHTML = '';
    lapCounter = 1;
}

document.getElementById('startStopwatch').addEventListener('click', startStopwatch);
document.getElementById('lapStopwatch').addEventListener('click', lapStopwatch);
document.getElementById('resetStopwatch').addEventListener('click', resetStopwatch);

var dialLines = document.getElementsByClassName('diallines');
var clockEl = document.getElementsByClassName('anaclock')[0];

for (var i = 1; i < 60; i++) {
    clockEl.innerHTML += "<div class='diallines'></div>";
    dialLines[i].style.transform = "rotate(" + 6 * i + "deg)";
}

function clock() {
    var weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
        d = new Date(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds(),
        date = d.getDate(),
        month = d.getMonth() + 1,
        year = d.getFullYear(),

        hDeg = h * 30 + m * (360 / 720),
        mDeg = m * 6 + s * (360 / 3600),
        sDeg = s * 6,

        hEl = document.querySelector('.hour-hand'),
        mEl = document.querySelector('.minute-hand'),
        sEl = document.querySelector('.second-hand'),
        dateEl = document.querySelector('.date'),
        dayEl = document.querySelector('.day');

    var day = weekday[d.getDay()];

    if (month < 9) {
        month = "0" + month;
    }

    hEl.style.transform = "rotate(" + hDeg + "deg)";
    mEl.style.transform = "rotate(" + mDeg + "deg)";
    sEl.style.transform = "rotate(" + sDeg + "deg)";
    dateEl.innerHTML = date + "/" + month + "/" + year;
    dayEl.innerHTML = day;
}

setInterval("clock()", 100);


