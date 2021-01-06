window.onload = window.onresize = function () {
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.7;
    canvas.height = window.innerHeight * 0.6;
}
//to get started with the canvas 
var can = document.getElementById("canvas");
var ctx = can.getContext("2d");


//these are the images for the project
var bg = new Image();
var bird = new Image();
var gameover = new Image();

//the code below to define the source for the images
bg.src = 'images/snake.png';
bird.src = 'images/bird2.png';
gameover.src = 'images/benten.png';


//Here bx and by are the variables to define the x and y co-ordinates of the food
var bx = 30;
var by = 40;
//gameplay is a variable set to "1" initially to check if the game is over or not
var gameplay = 1;
//to check if the sake had eaten the food or not if "eatfood=1" than food is eated
var eatfood = 0;
//the snake array will be used to draw the snake on canvas 
var snake = [
    { x: 50, y: 150 },
    { x: 40, y: 150 },
    { x: 30, y: 150 },
    { x: 20, y: 150 },

];
//dx and dy is the horizontal and vertical velocity of the snake
var dx = 10;
var dy = 0;
var plyerscore = 0;
//these variables will be used to store the dx and dy values below
var px = 0;
var py = 0;
//now we add some controls to move the snake in the direction we want


document.addEventListener("keypress", function () {


    //now storing the current value of dx and dy below
    px = dx;
    py = dy;
    //100 is the keycode for key "D" on keyboard,you can verify it by "console.log(event.keyCode);" 
    if (event.keyCode === 100) { dx = 10; dy = 0; }
    else if (event.keyCode === 119) { dx = 0; dy = -10; }
    else if (event.keyCode === 97) { dx = -10; dy = 0 }
    else if (event.keyCode === 115) { dx = 0; dy = 10; }
    //this else if statement is to reload the game 
    else if (event.keyCode === 114) { window.location.reload(); }

    var x = snake[0].x + dx;
    var y = snake[0].y + dy;
    if (x === snake[1].x && y === snake[1].y) {
        console.log("snake is not allowed to move back");
        //resetting the dx and dy that we changed in keypress event
        dx = px;
        dy = py;
    }


});
//this event listner is for getting touch controls when using mobile

document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchmove", handleTouchMove);
var xDown = null;
var yDown = null;
function handleTouchStart(evt) {
    // evt.preventDefault();
    console.log(evt.cancelable);

    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
   // evt.preventDefault();
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* left swipe */
            { dx = -10; dy = 0; }
        } else {
            /* right swipe */
            { dx = 10; dy = 0; }
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
            { dx = 0; dy = -10; }
        } else {
            /* down swipe */
            { dx = 0; dy = 10; }
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;

};

//to create the food at random positions
function randomTen(min, max) { return Math.round((Math.random() * (max - min) + min) / 10) * 10; }
function createFood() {
    bx = randomTen(0, can.width - 10);
    by = randomTen(0, can.height - 10);
}

//heart of the game

/*Let's talk in detail here

1)we used setTimeout funtion to control the speed of the snake remove it and do some hit and trials
2)we called gameover() function to check wheather the snake had hiten some wall or not
3)we than check the gameplay variable value if game is over than the "gameover()" function will return "gameplay=0"
..................rest you search :) after all you need to learn something right :)

*/
function draw() {
    setTimeout(function () {
        gameover1();
        if (gameplay === 1) {
            ctx.drawImage(bg, 0, 0);

            ctx.fillStyle = 'red';
            ctx.fillRect(bx, by, 10, 10);

            // Create the new Snake's head
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            // Add the new head to the beginning of snake body
            snake.unshift(head);
            const didEatFood = snake[0].x === bx && snake[0].y === by;
            if (didEatFood) {
                plyerscore++;
                document.getElementById("myscore").innerHTML = plyerscore;
                createFood();
            }
            else { snake.pop(); }

            ctx.fillStyle = 'green';
            for (i = 0; i < snake.length; i++) {

                ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
                ctx.strokeRect(snake[i].x, snake[i].y, 10, 10);
            }

            requestAnimationFrame(draw);
        }
    }, 60);

}


draw();


function gameover1() {

    if (snake[0].x >= can.width || snake[0].y >= canvas.height || snake[0].x === 0 || snake[0].y === 0) {
        ctx.fillStyle = 'darkgreen';
        ctx.fillRect(0, 0, can.width, can.height);
        ctx.drawImage(gameover, can.width / 4, can.height / 4, 100, 100);
        ctx.font = "14px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", can.width / 4, can.height / 4);
        gameplay = 0;
    }
}




