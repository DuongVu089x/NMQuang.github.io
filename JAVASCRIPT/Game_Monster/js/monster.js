var canvas = document.getElementById("canvas");
var context_canvas = canvas.getContext("2d");

var action = document.getElementById("action");
var context_action = action.getContext("2d");

//create background image
var background_image = new Image();
background_image.onload = function() {};
background_image.src = "image/background.jpg";

//create monster image
var monster_image = new Image();
monster_image.onload = function() {};
monster_image.src = "";

//create blood monster
var blood_image = new Image();
blood_image.onload = function() {};
blood_image.src = "image/blood.png";

//create heart image
var heart_image = new Image();
heart_image.onload = function() {};
heart_image.src = "image/heart.png";

//Create all buttons as boom, stop, pause, refresh
//create boom button
var boom = new Image();
boom.onload = function() {};
boom.src = "image/boom.jpg";
var boom_button = {
	x_start: 290,
	y_start: 60,
	x_stop: 340,
	y_stop: 100,
	height: 50,
	width: 40
}

//create stop button
var stop = new Image();
stop.onload = function() {};
stop.src = "image/stop.png";
var stop_button = {
	x_start: 350,
	y_start: 60,
	x_stop: 400,
	y_stop: 100,
	height: 50,
	width: 40
}

//create pause button
var pause = new Image();
pause.onload = function() {};
pause.src = "image/pause.png";
var pause_button = {
	x_start: 410,
	y_start: 60,
	x_stop: 460,
	y_stop: 100,
	height: 50,
	width: 40
}

//create restart button
var restart = new Image();
restart.onload = function() {};
restart.src = "image/restart.png";
var restart_button = {
	x_start: 470,
	y_start: 60,
	x_stop: 520,
	y_stop: 100,
	height: 50,
	width: 40
}

//Draw all buttons in div action
function drawAction() {
	context_action.drawImage(boom, boom_button.x_start, boom_button.y_start, boom_button.width, boom_button.height);
	context_action.drawImage(boom, boom_button.x_start, boom_button.y_start, boom_button.width, boom_button.height);
	context_action.drawImage(boom, boom_button.x_start, boom_button.y_start, boom_button.width, boom_button.height);
	context_action.drawImage(boom, boom_button.x_start, boom_button.y_start, boom_button.width, boom_button.height);
}

function main() {
	drawAction();
}

//Run game
var windows = window;
requestAnimationFrame = windows.webkitRequestAnimationFrame;
main();