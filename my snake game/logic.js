// game constant and variable

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 2;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [{ x: 13, y: 15 }];
food = { x: 5, y: 8 }


// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return
    }
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime)
}

function iscollide(snake) {
    // if you bump into yourself
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if you bump into the outer border
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

}
function gameEngine() {
    // part-1:updating the snakearray and food
    if (iscollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert(" game is over ! press any key to start the game");
        snakeArray = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;

    }
    // if you have eaten the food increment the score and regenerate the food
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        score = +1;
        // speedofsnake();
        scoreBox.innerHTML = `<b> score </b>: ${score}`;
        score.innerHTML =
            foodSound.play();
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    //  moving snake 
    for (let i = snakeArray.length - 2; i >= 0; i--) {

        snakeArray[i + 1] = { ...snakeArray[i] };
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // part-2:display the snake and food
    // 1.display the snake
    bord.innerHTML = "";
    snakeArray.forEach((e, idx) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (idx === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        bord.appendChild(snakeElement);

    })

    // 2.for making food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    bord.appendChild(foodElement);
}









// game logic 
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
});


let button1 = document.querySelector('.menu-button-1');
button1.addEventListener("click",()=>{
    speed=4;
});
let button2 = document.querySelector('.menu-button-2');
button2.addEventListener("click",()=>{
    speed=10;
});
let button3 = document.querySelector('.menu-button-3');
button3.addEventListener("click",()=>{
    speed=15;
});