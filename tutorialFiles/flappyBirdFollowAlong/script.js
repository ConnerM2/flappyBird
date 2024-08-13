
// board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// bird, we are defining the demesions and positions in JS
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

// pipes
let pipeArray = [];
let pipeHeight = 512;
let pipeWidth = 64;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// physics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.2;

let gameOver = false;
let score = 0;

// object of bird to easlily acces the data above
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

window.onload = function () {
    board = document.getElementById('board');
    board.height = boardHeight
    board.width = boardWidth
    context = board.getContext('2d'); //this is used for drawing on the canvas

    // this draws the bird PNG onto the canvas
    // it creates an object that lets us manipulate it
    birdImg = new Image();
    birdImg.src = "../flappy-bird/flappybird.png"
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    }

    topPipeImg = new Image();
    topPipeImg.src = "../flappy-bird/toppipe.png"

    bottomPipeImg = new Image();
    bottomPipeImg.src = "../flappy-bird/bottompipe.png"

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    document.addEventListener("keydown", moveBird)
}

// this is the code that refreshes every frame and sets the canvas and movement
// "main game loop"
function update () {
    requestAnimationFrame(update);    
    if (gameOver) {
        return;
    }

    // this clear the current frame so it doesnt just keep stacking
    context.clearRect (0, 0, board.width, board.height)

    // bird 
    velocityY += gravity;
    bird.y += Math.max(bird.y + velocityY, 0); //applys gravity to the bird, but also stop the bird from going over the screen
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    if (bird.y > board.height) {
        gameOver = true;
    }
    //pipes 
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i]
        pipe.x += velocityX
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }
}

function placePipes () {

    if (gameOver) {
        return;
    }

    // this sets the pipe at a random position
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe)

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe)
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        velocityY = -6
    }

    if (gameOver) {
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y; 
}