//settings
var snakeX = 2;
var snakeY = 2;
var height = 30;
var width = 30;
var interval = 100;
var increment = 2;

//game variables
var length = 0;
var tailX = [snakeX];
var tailY = [snakeY];
var fX;
var fY;
var running = false;
var gameOver = false;
var direction = -1; // up = 0, down = -1, left = 1, right = 2
var int;
var score = 0;
var instructions = "Collect the fruit to become bigger. If the snake touches the wall or part of itself you must restart. Controls: W=Up S=Down D=Right A=Left Spacebar=Pause/Play R=Restart";

/*
entry point of the game
*/
function run() {
	init();
	int = setInterval(gameLoop, interval);
}

function init() {
	createHeader();
	createMap();
	createSnake();
	createFruit();
}

/*
Generate map for the snake
*/
function createHeader() {
	document.write("<h1 class='title'>The Snake Game</h1>");
}

function createMap() {
	document.write("<table>");
	for(var  y = 0; y < height; y++) {
		document.write("<tr>");
		for(var x = 0; x < width; x++) {
			if (x == 0 || x == width - 1 || y == 0 || y == height - 1) {
				document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
			}else{
				document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
			}
		}
		document.write("</tr>");
	}
	document.write("</table>");
}

function createSnake() {
	 set(snakeX, snakeY, "snake");
}

function get(x,y) {
	return document.getElementById(x+'-'+y);
}

function set(x,y,value) {
	if(x != null && y != null) {
		get(x,y).setAttribute("class",value);
	}
}

function rand(min,max) {
	return Math.floor(Math.random() * (max-min) + min);
}

function getType(x,y) {
	return get(x,y).getAttribute("class");
}

function createFruit() {
	var found = false;
	while(!found && (length < (width-2)*(height-2)+1)) {
		var fruitX = rand(1, width-1);
		var fruitY = rand(1, height-1);
		if (getType(fruitX, fruitY) == "blank") {
			found = true;
		}
	}
	set(fruitX, fruitY, "fruit");
	fX = fruitX;
	fY = fruitY;
}

function instruction() {
	alert(instructions);
}

window.addEventListener('keypress', function key() {
	var key = event.keyCode;
	//if key is W set direction up
	if(direction != -1 && (key == 119 || key == 87)) {
		direction = 0;
	}
	//if key is S set direction down
	else if(direction != 0 && (key == 115 || key == 83)) {
		direction = -1;
	}
	//if key is A set direction left
	else if(direction != 2 && (key == 97 || key == 65)) {
		direction = 1;
	} 
	//if key is D set direction right
	else if(direction != 1 && (key == 100 || key == 68)) {
		direction = 2;
	} 
	if (!running) {
		running = true;
	}else if(key == 32){
		running = false;
	}else if(key == 82){
		restart();
	}
});

function gameLoop() {
	if (running && !gameOver) {
		update();
	}else if(gameOver == true){
		clearInterval(int);
		window.addEventListener('click', restart);
		document.getElementById("message").textContent = "Click anywhere to restart. ";
	}
}

function restart() {
	location.reload();
}

function update() {
	set(fX, fY, "fruit");
	updateTail();
	set(tailX[length], tailY[length], "blank");
	if(direction == 0) {
		snakeY--;
	}else if(direction == -1) {
		snakeY++;
	}else if(direction == 1) {
		snakeX--;
	}else if(direction == 2) {
		snakeX++;
	}
	set(snakeX, snakeY, "snake");
	for(var i = tailX.length-1; i >= 0; i--) {
		if (snakeX == tailX[i] && snakeY == tailY[i]) {
			gameOver = true;
			break;
		}
	}
	if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1) {
		gameOver = true;
	}
	if (snakeX == fX && snakeY == fY) {
		createFruit();
		length += increment;
		score += increment;
	}
	document.getElementById("score").innerHTML = "Score: " + score;
}

function updateTail() {
	for(var i = length; i > 0; i--) {
		tailX[i] = tailX[i-1];
		tailY[i] = tailY[i-1];
	}
	tailX[0] = snakeX;
	tailY[0] = snakeY;
}

run();
