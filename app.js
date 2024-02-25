const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const StartPauseButton = document.querySelector('#start-pause');
const Squares = document.querySelectorAll('.grid div');
console.log(Squares);
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');
let currentIndex = 76;
const width = 9;
let timer = 1;
let outComeTimerId;
let currentTime = 20;

//moving frog as per the key pressed.
function moveFrog(e){
    Squares[currentIndex].classList.remove('frog');
    switch(e.key){
        case 'ArrowLeft':
            if(currentIndex % width != 0){
                console.log('left');
                currentIndex -= 1;
            }
            break;
        case 'ArrowRight':
            if(currentIndex % width != width - 1){   
                console.log('right');
                currentIndex += 1;
            }
            break;
        case 'ArrowUp':
            if(currentIndex > width - 1){
                console.log('up');
                currentIndex -= width;
            }
            break;
        case 'ArrowDown':
            if(currentIndex < width * 8){
                console.log('down');
                currentIndex += width;
            }
            break;
            
    }
    Squares[currentIndex].classList.add('frog');
}

//moving hindrances as per their directions
function autoMove(){
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
    logsLeft.forEach(logleft => moveLogsLeft(logleft));
    logsRight.forEach(logright => moveLogsRight(logright));
    carsLeft.forEach(carleft => moveCarsLeft(carleft));
    carsRight.forEach(carright => moveCarsRight(carright));
}

function moveLogsLeft(logleft){
    switch(true){
        case logleft.classList.contains('l1'):
            logleft.classList.remove('l1');
            logleft.classList.add('l2');
            break;
        case logleft.classList.contains('l2'):
            logleft.classList.remove('l2');
            logleft.classList.add('l3');
            break;
        case logleft.classList.contains('l3'):
            logleft.classList.remove('l3');
            logleft.classList.add('l4');
            break;
        case logleft.classList.contains('l4'):
            logleft.classList.remove('l4');
            logleft.classList.add('l5');
            break;
        case logleft.classList.contains('l5'):
            logleft.classList.remove('l5');
            logleft.classList.add('l1');
            break;
    }
}

function moveLogsRight(logright){
    switch(true){
        case logright.classList.contains('l1'):
            logright.classList.remove('l1');
            logright.classList.add('l5');
            break;
        case logright.classList.contains('l2'):
            logright.classList.remove('l2');
            logright.classList.add('l1');
            break;
        case logright.classList.contains('l3'):
            logright.classList.remove('l3');
            logright.classList.add('l2');
            break;
        case logright.classList.contains('l4'):
            logright.classList.remove('l4');
            logright.classList.add('l3');
            break;
        case logright.classList.contains('l5'):
            logright.classList.remove('l5');
            logright.classList.add('l4');
            break;
    }
}

function moveCarsLeft(carleft){
    switch(true){
        case carleft.classList.contains('c1'):
            carleft.classList.remove('c1');
            carleft.classList.add('c2');
            break;
        case carleft.classList.contains('c2'):
            carleft.classList.remove('c2');
            carleft.classList.add('c3');
            break;
        case carleft.classList.contains('c3'):
            carleft.classList.remove('c3');
            carleft.classList.add('c1');
            break;
    }
}

function moveCarsRight(carright){
    switch(true){
        case carright.classList.contains('c1'):
            carright.classList.remove('c1');
            carright.classList.add('c3');
            break;
        case carright.classList.contains('c2'):
            carright.classList.remove('c2');
            carright.classList.add('c1');
            break;
        case carright.classList.contains('c3'):
            carright.classList.remove('c3');
            carright.classList.add('c2');
            break;
    }
}

//checking for results
function checkOutCome(){
    lose();
    win();
}

function lose(){
    if(
        Squares[currentIndex].classList.contains('c1')||
        Squares[currentIndex].classList.contains('l4')||
        Squares[currentIndex].classList.contains('l5')||
        currentTime <= 0
        ){
        resultDisplay.textContent = 'You Lose';
        Squares[currentIndex].classList.remove('frog');
        clearInterval(timer);
        document.removeEventListener('keyup',moveFrog);
        clearInterval(outComeTimerId);
    }
}

function win(){
    if(Squares[currentIndex].classList.contains('ending-block')){
        resultDisplay.textContent = 'You Win';
        clearInterval(timer);
        document.removeEventListener('keyup',moveFrog);
        clearInterval(outComeTimerId);
    }
}

//managing start/pause button
StartPauseButton.addEventListener('click',() =>{
    if(timer){
        clearInterval(timer);
        clearInterval(outComeTimerId);
        document.removeEventListener('keyup',moveFrog);
        timer = null
    }else{
        timer = setInterval(autoMove,1000);
        outComeTimerId = setInterval(checkOutCome,100);
        document.addEventListener('keyup',moveFrog);
    }
})
