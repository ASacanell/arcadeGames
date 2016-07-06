var canvas=document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var rightPressed= false;
var leftPressed=false;
var upPressed=false;
var downPressed=false;

//Brick Info
var map = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,2,0,2,0,1,2,1,0,1,2,0,2,0,2,0,2,1,2,1,
    1,1,2,1,0,1,0,0,0,1,0,1,0,1,1,1,0,0,0,1,
    1,2,0,1,2,0,2,1,0,0,2,1,2,0,0,2,1,0,1,1,
    1,0,1,1,1,1,0,1,2,1,1,1,1,2,1,1,1,2,0,1,
    1,0,2,0,2,1,2,1,0,0,5,0,2,0,1,1,0,1,0,1,
    1,1,1,1,1,1,0,2,0,1,1,1,1,0,1,1,2,1,2,1,
    1,0,2,0,0,0,0,1,0,1,2,0,0,2,0,0,0,1,0,1,
    1,2,0,0,2,1,0,1,2,1,0,2,0,0,1,1,0,1,2,1,
    1,1,2,1,0,1,0,0,0,1,2,1,2,1,1,0,2,1,0,1,
    1,2,0,1,0,0,0,1,2,0,0,1,0,2,1,0,1,0,0,1,
    1,0,1,1,1,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,
    1,2,1,1,1,1,2,0,2,1,1,1,1,2,0,0,2,0,2,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

var totalPoints = 0;
var brickRowCount = 14;
var brickColumnCount = 20;
var brickWidth = 45;
var brickHeight = 45;
var brickPadding = 5;
var brickOffsetTop = 30;
var brickOffsetLeft = 15;
var score = 0;
var lives = 1;
var positionA = {
    column: 10,
    row: 5
};
var bricks = [];

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
function keyDownHandler(e){
    if(e.keyCode==39){

        rightPressed=true;

    }
    else if(e.keyCode==37){

        leftPressed=true;

    }else if(e.keyCode==38){

        upPressed=true;

    }else if(e.keyCode==40){

        downPressed=true;

    }


}
function keyUpHandler(e){

    if(e.keyCode==39){

        rightPressed=false;
    }
    else if(e.keyCode==37){

        leftPressed=false;

    }else if(e.keyCode==38){

        upPressed=false;

    }else if(e.keyCode==40){

        downPressed=false;

    }
}

function checkRight() {
    var row = positionA.row * brickColumnCount;
    var column = positionA.column;
    var nextPosStatus = map[(row + column)+1];
    if(nextPosStatus == 1){
    }else if(nextPosStatus == 0){
        map[row + column + 1] = 5;
        map[row + column] = 0;
        positionA.column = positionA.column+1;
    }else if(nextPosStatus == 2){
        map[row + column + 1] = 5;
        map[row + column] = 0;
        positionA.column = positionA.column+1;
        score++;
    }
}
function checkLeft() {
    var row = positionA.row * brickColumnCount;
    var column = positionA.column;
    var nextPosStatus = map[(row + column)-1];
    if(nextPosStatus == 1){
    }else if(nextPosStatus == 0){
        map[row + column - 1] = 5;
        map[row + column] = 0;
        positionA.column = positionA.column-1;
    }else if(nextPosStatus == 2){
        map[row + column - 1] = 5;
        map[row + column] = 0;
        positionA.column = positionA.column-1;
        score++;
    }
}
function checkDown() {
    var row = positionA.row * brickColumnCount;
    var column = positionA.column;
    var nextPosStatus = map[(row + column)+brickColumnCount];
    if(nextPosStatus == 1){
    }else if(nextPosStatus == 0){
        map[row + column + brickColumnCount] = 5;
        map[row + column] = 0;
        positionA.row = positionA.row+1;
    }else if(nextPosStatus == 2){
        map[row + column + brickColumnCount] = 5;
        map[row + column] = 0;
        positionA.row = positionA.row+1;
        score++;
    }
}
function checkUp() {
    var row = positionA.row * brickColumnCount;
    var column = positionA.column;
    var nextPosStatus = map[(row + column)-brickColumnCount];
    if(nextPosStatus == 1){
    }else if(nextPosStatus == 0){
        map[row + column - brickColumnCount] = 5;
        map[row + column] = 0;
        positionA.row = positionA.row-1;
    }else if(nextPosStatus == 2){
        map[row + column - brickColumnCount] = 5;
        map[row + column] = 0;
        positionA.row = positionA.row-1;
        score++;
    }
}

function updateBricks(){
    totalPoints = 0;
    for(c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(r=0; r<brickRowCount; r++) {
            var spot = map[c + brickColumnCount * r];
            if( spot == 5) {
                bricks[c][r] = {x: 0, y: 0, status: 5};
            }else if(spot == 0){
                bricks[c][r] = {x: 0, y: 0, status: 0};
            }else if(spot == 1){
                bricks[c][r] = {x: 0, y: 0, status: 1};
            }else if(spot == 2){
                bricks[c][r] = {x: 0, y: 0, status: 2};
                totalPoints++;
            }
        }
    }
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawMap() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            if(bricks[c][r].status == 1) {
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            }else if(bricks[c][r].status == 5) {
                ctx.beginPath();
                //ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.arc(brickX+brickWidth/2, brickY+brickHeight/2,20,0,2*Math.PI);
                ctx.fillStyle = "yellow";
                ctx.fill();
                ctx.closePath();
            }else if(bricks[c][r].status == 2) {
                ctx.beginPath();
                ctx.rect(brickX+brickWidth/4, brickY+brickHeight/4, brickWidth/2, brickHeight/2);
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.closePath();
            }else{
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawScore();
    drawLives();
    updateBricks();
    drawMap();


    if (rightPressed) {
        checkRight();
    }else
    if(leftPressed){
        checkLeft();
    }else
    if(downPressed){
        checkDown();
    }else
    if(upPressed){
        checkUp();
    }



    if(totalPoints == 0){
        alert("CONGRATULATIONS");
        document.location.reload();
    }
    // requestAnimationFrame(draw);
}
// draw();
setInterval(draw, 70);