var canvas=document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var x=canvas.width/2;
var y=canvas.height-30;
//Ball Info
var ballRadius=10;
var dx=4;
var dy=-4;
//Paddle Info
var paddleHeight=20;
var paddleWidth=100;
var paddleX=(canvas.width-paddleWidth)/2;

var rightPressed= false;
var leftPressed=false;

//Brick Info
var bricksMap = [
                1,1,1,1,1,1,1,1,1,
                1,1,1,0,0,0,1,1,1,
                0,0,0,0,1,0,0,0,0,
                0,1,1,1,1,1,1,1,0,
                0,0,1,1,1,1,1,0,0
                ];
var totalBricks = 0;
var brickRowCount = 5;
var brickColumnCount = 9;
var brickWidth = 95;
var brickHeight = 30;
var brickPadding = 15;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler, false);

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
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        if(bricksMap[c + brickColumnCount * r] == 1) {
            bricks[c][r] = {x: 0, y: 0, status: 1};
            totalBricks++;
        }else{
            bricks[c][r] = {x: 0, y: 0, status: 0};
        }
    }
}

function keyDownHandler(e){
    if(e.keyCode==39){

        rightPressed=true;

    }
    else if(e.keyCode==37){

        leftPressed=true;

    }

}

function keyUpHandler(e){

    if(e.keyCode==39){

        rightPressed=false;
    }
    else if(e.keyCode==37){

        leftPressed=false;

    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,2*Math.PI);
    ctx.fillstyle="#0033FF";
    ctx.fillStroke="#0033FF";
    ctx.Stroke="10"
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillstyle="red";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#ffffff";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == totalBricks) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}


function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            if(y= y-paddleHeight){
                dy = -dy  ;
            }
        }
        else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = Math.abs(dx);
                dy = -dx;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    if(rightPressed && paddleX<canvas.width-paddleWidth){

        paddleX+=7;
    }
    else if(leftPressed && paddleX>0 ){
        paddleX-=7;

    }

    x=x+dx;
    y=y+dy;
    requestAnimationFrame(draw);
}
draw();