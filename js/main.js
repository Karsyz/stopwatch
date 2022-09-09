// selectors
const startStop = document.querySelector('#startStop')
const reset = document.querySelector('#reset')
const deleteLapBtn = document.querySelector('#deleteLaps')
const displayHours = document.querySelector('#dispHrs')
const displayMinutes = document.querySelector('#dispMin')
const displaySeconds = document.querySelector('#dispSec')
const displayCentiseconds = document.querySelector('#dispCs')

// event listeners
startStop.addEventListener('click', startStopTimer)
reset.addEventListener('click', resetLap)
reset.addEventListener('mousedown', mouseDown)
reset.addEventListener('touchstart', mouseDown)
reset.addEventListener('mouseup', mouseUp)
reset.addEventListener('touchend', mouseUp)

// variables
let dispHr = 0
let dispHrOut = ''
let dispMin = 0
let dispMinOut = ''
let dispSec = 0
let dispSecOut = ''
let dispCs = 0
let dispCsOut = ''
let timerActive = false
let laps = 0
let timer

// functions
function startStopTimer() {
    if(!timerActive) {
        startTimer()
    }else {
        stopTimer()
    }
}

function resetLap() {
    if(!timerActive) {
        resetTimer()
    }else {
        lapTime()
    }
}

function startTimer() {
    timerActive = true

    csCounter = setInterval( () => {
    if (dispCs === 99) {
        dispCs = 0
        if (dispSec === 59) {
            dispSec = 0            
            if (dispMin === 59) {
                dispMin = 0
                dispHr++
            }else {
                dispMin++
            }
        }else {
            dispSec++
        }
    }else {
        dispCs++
    }

    dispHrOut =  dispHr.toString().padStart(2, "0") 
    dispMinOut = dispMin.toString().padStart(2, "0")
    dispSecOut = dispSec.toString().padStart(2, "0") 
    dispCsOut = dispCs.toString().padStart(2, "0")

    displayHours.innerHTML =  dispHrOut
    displayMinutes.innerHTML = dispMinOut
    displaySeconds.innerHTML = dispSecOut 
    displayCentiseconds.innerHTML = dispCsOut
    
    }, 10)
}

function stopTimer() {
    timerActive = false
    clearInterval(csCounter)
}

function resetTimer() {
    dispHr = 0
    dispHrOut = '00'
    dispMin = 0
    dispMinOut = '00'
    dispSec = 0
    dispSecOut = '00'
    dispCs = 0
    dispCsOut = '00'
    displayHours.innerHTML =  dispHrOut
    displayMinutes.innerHTML = dispMinOut
    displaySeconds.innerHTML = dispSecOut 
    displayCentiseconds.innerHTML = dispCsOut
}

function lapTime() {
    laps++
    const elementLi = document.createElement("li")
    const lapTimeText = document.createTextNode(`Lap ${laps} - ${dispHrOut}:${dispMinOut}:${dispSecOut}:${dispCsOut}`)
    elementLi.appendChild(lapTimeText)
    document.querySelector("#laps").appendChild(elementLi)
}

function mouseDown() {
    fade()
    timer = setTimeout(mouseHeld, 1500)
}

function mouseUp() {
    clearTimeout(timer)
    fadeCancel() 
}

function mouseHeld() {
    deleteLaps()
}

function fade() {
    const lies = document.querySelectorAll('#laps>li')
    lies.forEach( (e) => { e.classList.add('liFadeOut') } )
}

function fadeCancel() {
    const lies = document.querySelectorAll('#laps>li')
    lies.forEach( (e) => { e.classList.remove('liFadeOut') } )
}

function deleteLaps() {
    const lies = document.querySelectorAll('#laps>li')
    lies.forEach( (e) => { e.remove() } )
    laps = 0
}