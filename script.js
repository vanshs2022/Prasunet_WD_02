document.getElementById('clockButton').addEventListener('click', function() {
    document.querySelector('.time-container').style.transform = 'rotateY(0deg)';
    document.querySelector('.stopwatch').style.transform = 'rotateY(-180deg)';
    document.querySelector('.laps').style.display = 'none';
    document.querySelector('#downloadButton').style.display = 'none';

});

document.getElementById('stopwatchButton').addEventListener('click', function() {
    document.querySelector('.time-container').style.transform = 'rotateY(180deg)';
    document.querySelector('.stopwatch').style.transform = 'rotateY(0deg)';
    document.querySelector('.laps').style.display = 'block';
    if(window.innerWidth>'768px'){
        document.querySelector('#downloadButton').style.display = 'block';
    }
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
let stopwatch;
let isRunning = false;
let startTime;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        stopwatch = setInterval(function () {
            let elapsedTime = Date.now() - startTime;
            let minutes = Math.floor((elapsedTime / 1000) / 60);
            let seconds = Math.floor((elapsedTime / 1000) % 60);
            let milliseconds = Math.floor((elapsedTime % 1000) / 10);
            document.getElementById('display').innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds) + ':' + (milliseconds < 10 ? '0' + milliseconds : milliseconds);
        }, 10);
        document.getElementById('startStopwatch').innerHTML = 'Pause';
    } else {
        isRunning = false;
        clearInterval(stopwatch);
        document.getElementById('startStopwatch').innerHTML = 'Resume';
    }
}

let lapCounter = 1;

function lapStopwatch() {
    if (isRunning) {
        let elapsedTime = Date.now() - startTime;
        let minutes = Math.floor((elapsedTime / 1000) / 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);
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
    clearInterval(stopwatch);
    isRunning = false;
    document.getElementById('startStopwatch').innerHTML = 'Start';
    document.getElementById('display').innerHTML = '00:00:00';
    let lapTableBody = document.querySelector('#lapsTable tbody');
    while (lapTableBody.firstChild) {
        lapTableBody.removeChild(lapTableBody.firstChild);
    }
    lapCounter = 1;
}

document.getElementById('lapStopwatch').addEventListener('click', lapStopwatch);
document.getElementById('resetStopwatch').addEventListener('click', resetStopwatch);


function attachEventListeners() {
    document.getElementById('startStopwatch').addEventListener('click', startStopwatch);
    document.getElementById('lapStopwatch').addEventListener('click', lapStopwatch);
    document.getElementById('resetStopwatch').addEventListener('click', resetStopwatch);
}

attachEventListeners();

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

document.addEventListener('DOMContentLoaded',(e)=>{
    if (window.innerWidth<='768px'){
        document.getElementById('downloadButton').style.display = 'none';
    }
});

document.getElementById('downloadButton').addEventListener('click', function() {
    var table = document.querySelector('.laps');
    var tableContent = table.outerHTML;

    console.log("download clicked");

    var blob = new Blob([tableContent], { type: 'text/html' });

    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'laps_table.html';

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

