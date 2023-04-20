'use strict'
// timer 
var timer = 0;
var intervalId; // store the interval ID in a variable
var isTimer = false

// counting the clicks inside the onCheckNumber function in order to track the array
var countClick16 = 0
var checkCounts = 0;
var randArrNums = randNums(16)

// on html page load run this function 
function onInit() {
    renderBoard(4, 4)
    tdChangeText(16)
    checkCounts = 16
    randArrNums = randNums(16)
}

// *** Board Levels Buttons *** 
function onHardClick() {
    renderBoard(4, 9)
    tdChangeText(36)
    checkCounts = 36
    countClick16 = 0
    randArrNums = randNums(36)
    resetTimerAndText() // clear timer and victory text
}

function onMediumClick() {
    renderBoard(5, 5)
    tdChangeText(25)
    checkCounts = 25
    countClick16 = 0
    randArrNums = randNums(25)
    resetTimerAndText() 
}

function onEasyClick() {
    renderBoard(4, 4)
    tdChangeText(16)
    checkCounts = 16
    countClick16 = 0
    randArrNums = randNums(16)
    resetTimerAndText()
}
// *** END OF board levels buttons *** 

// Creating board # boardSize = number of columns & tdSize = number on tds in each row 
function renderBoard(boardSize, tdSize) {
    var strHtml = '<table>'

    for (var i = 0; i < boardSize; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < tdSize; j++) {
            strHtml += `
            <td onclick="onCheckNumber(this)">${i}</td>`
        }
        strHtml += `</tr>`
    }

    strHtml += `</table>`
    var elDivBoard = document.querySelector('.div-board')
    elDivBoard.innerHTML = strHtml
}

// on click - function check each cell that gets clicked and handle the victory 
function onCheckNumber(element) {
    var isVictory16 = false
    var sortArr = sortArray(randArrNums) // sorting the array using Bubble sort
    var elTdText = element.innerText
    var elSpanVictory = document.querySelector('.span-victory')
    elTdText = +elTdText // convert to type number 

    if (!isTimer){
        isTimer = true
        startTime()
    }
    if (elTdText === sortArr[countClick16]) {
        element.style.color = 'white'
        element.style.backgroundColor = 'dodgerblue'
        countClick16++
        
        if (countClick16 === checkCounts) {
            console.log('clearInterval(intervalId)', clearInterval(intervalId))
            isVictory16 = true
            stopTime() // stop timer 
            isTimer = false
            elSpanVictory.innerText = 'Victory :)'
        }
    }
}

// Placeing the random numbers in the TD Elements - 
function tdChangeText(number) {
    var elTableTd = document.querySelectorAll('table td')
    var randArr16 = randNums(number)

    for (var i = 0; i < elTableTd.length; i++) {
        elTableTd[i].innerText = randArr16[i]
    }
    return elTableTd
}

// Timer functions
function updateTimer() {
    const elTimerDisplay = document.querySelector('.span-timer')
    timer += 1; 
    elTimerDisplay.innerHTML = timer
}

function startTime() {
    intervalId = setInterval(updateTimer, 1000)
    setInterval(intervalId)
}

function stopTime() {
    clearInterval(intervalId)
}

// reset timer and victory text
function resetTimerAndText(){
    var elSpanVictory = document.querySelector('.span-victory')
    const elTimerDisplay = document.querySelector('.span-timer')
    elSpanVictory.innerText = ''
    timer = 0
    elTimerDisplay.innerHTML = timer
    
}

// generate shuffle random numbers - size #PARAMETER determines the size of the random numbers array 
function randNums(size) {
    var num = 1
    var numsArr16 = []
    for (var i = 0; i < size; i++) {
        numsArr16.push(num)
        num++
    }
    shuffle(numsArr16) // shuffle the arrays
    return numsArr16
}

// Shuffle Array 
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Bubble sort function
// sortArray()
function sortArray(arr) {
    var copyRand = arr.slice()
    var preview = 0
    for (var i = 0; i < copyRand.length; i++) {
        for (var j = i + 1; j < copyRand.length; j++) {
            if (copyRand[j] < copyRand[i]) {
                preview = copyRand[i]
                copyRand[i] = copyRand[j]
                copyRand[j] = preview
            }
        }
    }
    return copyRand
}

// Utils 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}