
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
}