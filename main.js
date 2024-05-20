'use strict'

var gNextNum = 1

var LEVEL_SIZE

var gNums

var gStartTime

var gTimerInterval

function onInit() {
    clearInterval(gTimerInterval)
    LEVEL_SIZE = 16
    gNums = createOrderedNums(LEVEL_SIZE)
    renderBoard(LEVEL_SIZE)
    var elSpan = document.querySelector('.timer')
    elSpan.innerText = '0.00'
}

function renderBoard(LEVEL_SIZE) {
    var strHTML = ''
    for (var i = 0; i < Math.sqrt(LEVEL_SIZE); i++) {
        strHTML += '<tr>'
        for (var j = 0; j < Math.sqrt(LEVEL_SIZE); j++) {
            strHTML += `<td class=""onclick="onCellClicked(this)">${shuffle(gNums)}</td>`
        }
        strHTML += '</tr>'
    }
    var elContainer = document.querySelector('tbody')
    elContainer.innerHTML = strHTML
}

function onCellClicked(clickedNum) {
    if (+clickedNum.innerText === 1) {
        gStartTime = Date.now()
        startTimer()
    }
    if (+clickedNum.innerText === gNextNum) {
        console.log('CLICK')
        clickedNum.classList.add('clicked')
        gNextNum++
    }
    if (gNextNum === LEVEL_SIZE + 1) {
        console.log('IT WORKS')
        clearInterval(gTimerInterval)
    }
}

function chooseLevelSize(elBtn) {
    switch (elBtn.innerText) {
        case "EASY":
            LEVEL_SIZE = 16
            break
        case "MEDIUM":
            LEVEL_SIZE = 25
            break
        case "NIGHTMARE":
            LEVEL_SIZE = 36
            break
        default:
            console.log("Unexpected level size:", elBtn.innerText);
            break
    }
   newGame()
}

function createOrderedNums(LEVEL_SIZE) {
    var nums = []
    for (var i = 1; i <= LEVEL_SIZE; i++) {
        nums.push(i)
    }
    return nums
}

function newGame() {
    console.log('RESTART')
    var elSpan = document.querySelector('.timer')
    elSpan.innerText = '0.00'
    clearInterval(gTimerInterval)
    gNextNum = 1
    gNums = createOrderedNums(LEVEL_SIZE)
    renderBoard(LEVEL_SIZE)
}

function startTimer() {
    gStartTime = Date.now()
    gTimerInterval = setInterval(() => {
        var seconds = ((Date.now() - gStartTime) / 1000).toFixed(2);
        var elSpan = document.querySelector('.timer');
        elSpan.innerText = seconds
    }, 10);
}

function shuffle(arr) {
    var i = arr.length, j, temp
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1))
        temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
    }
    return arr.pop()
}
