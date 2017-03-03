
// CONTEXT GAME PLAY
var CANVAS = document.getElementById('canvas');
var CONTEXT = CANVAS.getContext('2d');
// CONTEXT GAME ACTION
var ACTION = document.getElementById('action');
var CONTEXT_ACTION = ACTION.getContext('2d');
// GAME CONTROl
var SPEED = 1;
var LEVEL = 1;
var NUM_MONSTER_SHOW;
var SCORE = 50;
var BESTSCORE = 50;
var LIST_BLOOD = new Array();
var NUM_BOOM = 3;
var NUM_STOP = 3;
var NUM_HEART = 5;
var IS_BOOM = false;
var IS_STOP = false;
var IS_PAUSE = false;
var IS_RUN = true;
var FPS = 144;
var TICKS = 1000/FPS;
var TIME_OUT;
if (typeof(Storage) !== "underfined") {
	localStorage.setItem("BESTSCORE", BESTSCORE);
}
//create BACKGROUND_IMAGE
var BACKGROUND_IMAGE = new Image();
BACKGROUND_IMAGE.onload = function(){};
BACKGROUND_IMAGE.src = 'image/background.jpg';
//create MONSTER_IMAGE
var MONSTER_IMAGE = new Image();
MONSTER_IMAGE.onload = function(){};
MONSTER_IMAGE.src = 'image/boom.jpg';
//create BLOOD_IMAGE
var BLOOD_IMAGE = new Image();
BLOOD_IMAGE.onload = function(){};
BLOOD_IMAGE.src = 'image/blood.png';
// create HEART_IMAGE
var HEART = new Image();
HEART.onload = function(){};
HEART.src = 'image/heart.png';
// create BOOM BUTTON
var BOOM = new Image();
BOOM.onload = function(){};
BOOM.src = 'image/boom.jpg';
var BOOM_BUTTON = {
	startX: 290,
	startY: 60,
	stopX: 340,
	stopY: 100,
	width: 50,
	height: 40
}
// create PAUSE BUTTON
var PAUSE = new Image();
PAUSE.onload = function(){};
PAUSE.src = 'image/pause.png';
var PAUSE_BUTTON = {
	startX: 400,
	startY: 60,
	stopX: 440,
	stopY: 100,
	width: 40,
	height: 40
}
// create RESTART BUTTON
var RESTART = new Image();
RESTART.onload = function(){};
RESTART.src = 'image/restart.png';
var RESTART_BUTTON = {
	startX: 450,
	startY: 60,
	stopX: 490,
	stopY: 100,
	width: 40,
	height: 40
}
// create STOP BUTTON
var STOP = new Image();
STOP.onload = function(){};
STOP.src = 'image/heart.png';
var STOP_BUTTON = {
	startX: 350,
	startY: 60,
	stopX: 390,
	stopY: 100,
	width: 40,
	height: 40
}
// create MONSTERS
var MONSTER_1 = {
	startX: 0,
	startY: 0,
	stopX: 100,
	stopY: 100,
	currentX: 0,
	currentY: 0,
	click: false,
	show: true,
	dieX: 0,
	dieY: 0,
	endX: 100,
	endY: 100,
	num: 1
}
var MONSTER_2 = {
	startX: 200,
	startY: 0,
	stopX: 200,
	stopY: 100,
	currentX: 200,
	currentY: 0,
	click: false,
	show: false,
	dieX: 200,
	dieY: 0,
	endX: 200,
	endY: 100,
	num: 2
}
var MONSTER_3 = {
	startX: 400,
	startY: 0,
	stopX: 300,
	stopY: 100,
	currentX: 400,
	currentY: 0,
	click: false,
	show: false,
	dieX: 400,
	dieY: 0,
	endX: 300,
	endY: 100,
	num: 3
}
var MONSTER_4 = {
	startX: 400,
	startY: 200,
	stopX: 300,
	stopY: 200,
	currentX: 400,
	currentY: 200,
	click: false,
	show: false,
	dieX: 400,
	dieY: 200,
	endX: 300,
	endY: 200,
	num: 4
}
var MONSTER_5 = {
	startX: 400,
	startY: 400,
	stopX: 300,
	stopY: 300,
	currentX: 400,
	currentY: 400,
	click: false,
	show: false,
	dieX: 400,
	dieY: 400,
	endX: 300,
	endY: 300,
	num: 5
}
var MONSTER_6 = {
	startX: 200,
	startY: 400,
	stopX: 200,
	stopY: 300,
	currentX: 200,
	currentY: 400,
	click: false,
	show: false,
	dieX: 200,
	dieY: 400,
	endX: 200,
	endY: 300,
	num: 6
}
var MONSTER_7 = {
	startX: 0,
	startY: 400,
	stopX: 100,
	stopY: 300,
	currentX: 0,
	currentY: 400,
	click: false,
	show: false,
	dieX: 0,
	dieY: 400,
	endX: 100,
	endY: 300,
	num: 7
}
var MONSTER_8 = {
	startX: 0,
	startY: 200,
	stopX: 100,
	stopY: 200,
	currentX: 0,
	currentY: 200,
	click: false,
	show: false,
	dieX: 0,
	dieY: 200,
	endX: 100,
	endY: 200,
	num: 8
}
var MONSTER_9 = {
	startX: Math.floor(Math.random()*400 +1),
	startY: Math.floor(Math.random()*400 +1),
	stopX: Math.floor(Math.random()*400 +1),
	stopY: Math.floor(Math.random()*400 +1),
	currentX: Math.floor(Math.random()*400 +1),
	currentY: Math.floor(Math.random()*400 +1),
	click: false,
	show: false,
	dieX: 0,
	dieY: 0
}
/*
	CHOOSE MONSTER SHOW
*/
function randomMonster() {
	//REFRESH MONSTER INFO IF MOSTER NOT SHOW
	if (!MONSTER_1.show) {
		refreshMonster(MONSTER_1);	
	}
	if (!MONSTER_2.show) {
		refreshMonster(MONSTER_2);	
	}
	if (!MONSTER_3.show) {
		refreshMonster(MONSTER_3);	
	}
	if (!MONSTER_4.show)  {
		refreshMonster(MONSTER_4);	
	}
	if (!MONSTER_5.show) {
		refreshMonster(MONSTER_5);	
	}
	if (!MONSTER_6.show) {
		refreshMonster(MONSTER_6);	
	}
	if (!MONSTER_7.show) {
		refreshMonster(MONSTER_7);	
	}
	if (!MONSTER_8.show) {
		refreshMonster(MONSTER_8);	
	}
	if (!MONSTER_9.show) {
		refreshRandomMonster();
	}
	//CHOOSE MONSTER SHOW
	var monsterNumber = Math.floor(Math.random() * 9 + 1);
	switch (monsterNumber) {
		case 1: {
			if (!MONSTER_1.show) {
				MONSTER_1.show = true;
			}
			break;
		}
		case 2: {
			if (!MONSTER_2.show) {
				MONSTER_2.show = true;
			}
			break;
		}
		case 3: {
			if (!MONSTER_3.show) {
				MONSTER_3.show = true;
			}
			break;
		}
		case 4: {
			if (!MONSTER_4.show) {
				MONSTER_4.show = true;
			}
			break;
		}
		case 5: {
			if (!MONSTER_5.show) {
				MONSTER_5.show = true;
			}
			break;
		}
		case 6: {
			if (!MONSTER_6.show) {
				MONSTER_6.show = true;
			}
			break;
		}
		case 7: {
			if (!MONSTER_7.show) {
				MONSTER_7.show = true;
			}
			break;
		}
		case 8: {
			if (!MONSTER_8.show) {
				MONSTER_8.show = true;
			}
			break;
		}
		case 9: {
			if (!MONSTER_9.show) {
				MONSTER_9.show = true;
			}
			break;
		}
	}
}
/*
	UPDATE NEXT POSITION MONSTERS 1->8
	@param {monster} monster
*/
function updateMonster(monster) {
	if (monster.currentX < monster.stopX) {
		monster.currentX += SPEED;
	} else if (monster.currentX > monster.stopX) {
		monster.currentX -= SPEED;
	}
	if (monster.currentY < monster.stopY) {
		monster.currentY += SPEED;
	} else if (monster.currentY > monster.stopY) {
		monster.currentY -= SPEED;
	}
	if (monster.currentX == monster.stopX && monster.currentY == monster.stopY) {
		var temp = monster.stopX;
		monster.stopX = monster.startX;
		monster.startX = temp;
		temp = monster.stopY;
		monster.stopY = monster.startY;
		monster.startY = temp;
	}
	if (monster.currentX == monster.dieX && monster.currentY == monster.dieY) {
		SCORE -= 10;
		NUM_HEART--;
		refreshMonster(monster);
		randomMonster();
	}
}
/*
	UPDATE NEXT POSITION MONSTER 9
	@param {monster} monster
*/
function updateRandomMonster(monster) {
	if (monster.currentX < monster.stopX) {
		monster.currentX += SPEED;
	} else if (monster.currentX > monster.stopX) {
		monster.currentX -= SPEED;
	}
	if (monster.currentY < monster.stopY) {
		monster.currentY += SPEED;
	} else if (monster.currentY > monster.stopY) {
		monster.currentY -= SPEED;
	}
	if (monster.currentX == monster.stopX && monster.currentY == monster.stopY) {
		SCORE -=10;
		NUM_HEART--;
		refreshRandomMonster();
		randomMonster();
	}
}
/*
	ADD BLOOD IMAGE WHEN MONSTER HAS BEEN CLICKED
	@param {number} x is position x monster die
	@param {number} y is position y monster die
*/
function addBlood(x, y) {
	var blood = {
		x: x,
		y: y
	}
	LIST_BLOOD[LIST_BLOOD.length] = blood;
}
/*
	DRAW BLOOD IMAGE
*/
function updateBlood() {
	if (LIST_BLOOD.length > 0) {
		for (var i = 0; i < LIST_BLOOD.length; i++) {
			CONTEXT.drawImage(BLOOD_IMAGE, LIST_BLOOD[i].x, LIST_BLOOD[i].y);
		}
	}
	if (IS_STOP) {
		executeStop(false);
	}
}
/*
	EXECUTE WHEN BOOM BUTTON WAS CLICK
	@param {monster} monster
*/
function executeBoomClick(monster) {
	if (monster.show) {
		SCORE -=10;
		executeMonsterClick(monster, monster.currentX, monster.currentY);
	}
}
/*
	REFRESH INFO MONSTERS 1->8
	@param {monster} monster
*/
function refreshMonster(monster) {
	monster.show = false;
	monster.startX = monster.dieX;
	monster.startY = monster.dieY;
	monster.stopX = monster.endX;
	monster.stopY = monster.endY;
	monster.currentX = monster.startX;
	monster.currentY = monster.startY;
}
/*
	REFRESH INFO MONSTER 9
*/
function refreshRandomMonster() {
	MONSTER_9.show = false;
	MONSTER_9.startX = Math.floor(Math.random()*400 +1);
	MONSTER_9.startY = Math.floor(Math.random()*400 +1);
	MONSTER_9.stopX = Math.floor(Math.random()*400 +1);
	MONSTER_9.stopY = Math.floor(Math.random()*400 +1);
	MONSTER_9.currentX = Math.floor(Math.random()*400 +1);
	MONSTER_9.currentY = Math.floor(Math.random()*400 +1);
}
/*
	EXECUTE WHEN BUTTON HAS BEEN CLICKED
*/
ACTION.addEventListener("click", function(e) {
	locationX = e.pageX - this.offsetLeft;
	locationY = e.pageY - this.offsetTop;
	//EXECUTE BOOM BUTTON CLICK
	if (locationX >= BOOM_BUTTON.startX && locationX <= BOOM_BUTTON.stopX && !IS_PAUSE) {
		if (locationY >= BOOM_BUTTON.startY && BOOM_BUTTON.stopY) {
			if (NUM_BOOM > 0) {
				IS_BOOM = true;
				NUM_BOOM--;
				executeBoomClick(MONSTER_1);
				executeBoomClick(MONSTER_2);
				executeBoomClick(MONSTER_3);
				executeBoomClick(MONSTER_4);
				executeBoomClick(MONSTER_5);
				executeBoomClick(MONSTER_6);
				executeBoomClick(MONSTER_7);
				executeBoomClick(MONSTER_8);
				executeBoomClick(MONSTER_9);
			}
			IS_BOOM = false;
			for (var i = 0; i < NUM_MONSTER_SHOW; i++) {
				randomMonster();
			}
		}
	}
	//EXECUTE STOP BUTTON CLICK
	if (locationX >= STOP_BUTTON.startX && locationX <= STOP_BUTTON.stopX && !IS_PAUSE) {
		if (locationY >= STOP_BUTTON.startY && STOP_BUTTON.stopY && NUM_STOP > 0) {
			// if (IS_RUN) {
			// 	IS_RUN = false;
			// 	IS_STOP = true;
			// 	NUM_STOP --;
			// }
			// TIME_OUT = setTimeout(function() {
			// 	IS_RUN = true;
			// 	IS_STOP = false;
			// 	main();
			// },5000);
			executeStop(true);
		}
	}
	//EXECUTE PAUSE BUTTON CLICK
	if (locationX >= PAUSE_BUTTON.startX && locationX <= PAUSE_BUTTON.stopX && !IS_STOP) {
		if (locationY >= PAUSE_BUTTON.startY && PAUSE_BUTTON.stopY) {
			if (IS_RUN) {
				IS_RUN = false;
				IS_PAUSE = true;
			} else {
				IS_RUN = true;
				IS_PAUSE = false;
				main();
			}
		}
	}
	//EXECUTE RESTART BUTTON CLICK
	if (locationX >= RESTART_BUTTON.startX && locationX <= RESTART_BUTTON.stopX) {
		if (locationY >= RESTART_BUTTON.startY && RESTART_BUTTON.stopY) {
			setTimeout(function() {
			SPEED = 1;
			LEVEL = 1;
			NUM_MONSTER_SHOW = 2;
			SCORE = 50;
			LIST_BLOOD = new Array();
			NUM_BOOM = 3;
			NUM_STOP = 3;
			NUM_HEART = 5;
			IS_STOP = false;
			IS_PAUSE = false;
			IS_RUN = true;
			refreshMonster(MONSTER_1);
			refreshMonster(MONSTER_2);
			refreshMonster(MONSTER_3);
			refreshMonster(MONSTER_4);
			refreshMonster(MONSTER_5);
			refreshMonster(MONSTER_6);
			refreshMonster(MONSTER_7);
			refreshMonster(MONSTER_8);
			refreshRandomMonster();
			MONSTER_1.show = true;
				main();
			}, 1000);
		}
	}
});

function executeStop(isClick) {
	if (IS_RUN) {
		IS_RUN = false;
		IS_STOP = true;
		if (isClick) {
			NUM_STOP --;
		}
	}
	TIME_OUT = setTimeout(function() {
		IS_RUN = true;
		IS_STOP = false;
		main();
	},5000);
}
/*
	EXECUTE WHEN MONSTER WAS CLICKED
	@PARAM {MONSTER}
*/
function executeMonsterClick(monster, locationX, locationY) {
	if (IS_STOP) {
		clearTimeout(TIME_OUT);
	}
	if (locationX >= monster.currentX && locationX <= monster.currentX + 100) {
		if (locationY >= monster.currentY && locationY <= monster.currentY +100) {
			SCORE +=20;
			addBlood(monster.currentX, monster.currentY);
			refreshMonster(monster);
			if (!IS_BOOM) {
				for (var i = 0; i < NUM_MONSTER_SHOW; i++) {
					randomMonster();
				}
			}
		}
	}
	if (IS_STOP) {
		IS_RUN = true;
		main();
	}
}
/*
	EXECUTE WHEN USER CLICK ON GAMEPLAY ZONE
*/
CANVAS.addEventListener("click", function(e){
	if (!IS_PAUSE || IS_STOP) {
		locationX = e.pageX - this.offsetLeft;
		locationY = e.pageY - this.offsetTop;
		SCORE -=10;
		if (MONSTER_1.show) {
			executeMonsterClick(MONSTER_1, locationX, locationY);
		}
		if (MONSTER_1.show) {
			executeMonsterClick(MONSTER_1, locationX, locationY);
		}
		if (MONSTER_2.show) {
			executeMonsterClick(MONSTER_2, locationX, locationY);
		}
		if (MONSTER_3.show) {
			executeMonsterClick(MONSTER_3, locationX, locationY);
		}
		if (MONSTER_4.show) {
			executeMonsterClick(MONSTER_4, locationX, locationY);
		}
		if (MONSTER_5.show) {
			executeMonsterClick(MONSTER_5, locationX, locationY);
		}
		if (MONSTER_6.show) {
			executeMonsterClick(MONSTER_6, locationX, locationY);
		}
		if (MONSTER_7.show) {
			executeMonsterClick(MONSTER_7, locationX, locationY);
		}
		if (MONSTER_8.show) {
			executeMonsterClick(MONSTER_8, locationX, locationY);
		}
		if (MONSTER_9.show) {
			executeMonsterClick(MONSTER_9, locationX, locationY);
		}
	}
});
/*
	EXECUTE NUMBER OF MONSTER SHOW
*/
function executeLevel() {
	LEVEL = Math.floor(SCORE / 50);
	switch (LEVEL) {
		case 1 : {
			NUM_MONSTER_SHOW = 1;
			break;
		}
		case 2 : {
			NUM_MONSTER_SHOW = 2;
			break;
		}
		case 3 : {
			NUM_MONSTER_SHOW = 3;
			break;
		}
		case 4 : {
			NUM_MONSTER_SHOW = 4;
			break;
		}
		case 5 : {
			NUM_MONSTER_SHOW = 5;
			break;
		}
		case 6 : {
			NUM_MONSTER_SHOW = 6;
			break;
		}
		case 7 : {
			NUM_MONSTER_SHOW = 7;
			break;
		}
		case 8 : {
			NUM_MONSTER_SHOW = 8;
			break;
		}
		case 9 : {
			NUM_MONSTER_SHOW = 9;
			break;
		}
	}
}
/*
	DRAW ACTION FORM
*/
function renderAction() {
	CONTEXT_ACTION.clearRect(0, 0, ACTION.width, ACTION.height);
	CONTEXT_ACTION.fillStyle = "rgb(29, 214, 4)";
	CONTEXT_ACTION.font = "20px Arial";
	CONTEXT_ACTION.fillText("Score: " + SCORE, 10, 30);
	CONTEXT_ACTION.fillText("Random Monster: " + 1, 300, 30);
	CONTEXT_ACTION.fillText("Heart: ", 10, 60);
	CONTEXT_ACTION.fillText("Speed: " + SPEED, 10, 90);
	var temp = 0;
	for (var i = 0; i < NUM_HEART; i++) {
		CONTEXT_ACTION.drawImage(HEART, (70 + temp), 45, 20, 20);
		temp += 20;
	}
	CONTEXT_ACTION.drawImage(BOOM, BOOM_BUTTON.startX, BOOM_BUTTON.startY, BOOM_BUTTON.width, BOOM_BUTTON.height);
	CONTEXT_ACTION.drawImage(STOP, STOP_BUTTON.startX, STOP_BUTTON.startY, STOP_BUTTON.width, STOP_BUTTON.height);
	CONTEXT_ACTION.drawImage(PAUSE, PAUSE_BUTTON.startX, PAUSE_BUTTON.startY, PAUSE_BUTTON.width, PAUSE_BUTTON.height);
	CONTEXT_ACTION.drawImage(RESTART, RESTART_BUTTON.startX, RESTART_BUTTON.startY, RESTART_BUTTON.width, RESTART_BUTTON.height);
	CONTEXT_ACTION.fillStyle = "#FFFFFF";
	CONTEXT_ACTION.font = "35px Arial";
	CONTEXT_ACTION.fillText(NUM_BOOM, 300, 75);
	CONTEXT_ACTION.fillText(NUM_STOP, 360, 75);
	CONTEXT_ACTION.fillStyle = "rgb(230, 221, 240)";
	CONTEXT_ACTION.font = "20px Arial";
	if (IS_PAUSE) {
		CONTEXT.fillStyle = "#FFFFFF";
		CONTEXT.font = "50px Arial";
		CONTEXT.fillText("Pause!!!", 180, 240);
	}

	if (IS_STOP) {
		CONTEXT.fillStyle = "#FFFFFF";
		CONTEXT.font = "50px Arial";
		CONTEXT.fillText("STOP!!!", 180, 240);
	}
}
/*
	DRAW MONSTER
*/
function renderMonster() {
	CONTEXT.drawImage(BACKGROUND_IMAGE, 0, 0);
	updateBlood();
	if (MONSTER_1.show) {
		CONTEXT.drawImage(MONSTER_IMAGE, MONSTER_1.currentX, MONSTER_1.currentY, 100, 100);
	}
	if (MONSTER_2.show) {
		CONTEXT.drawImage(MONSTER_IMAGE, MONSTER_2.currentX, MONSTER_2.currentY, 100, 100);
	}
	if (MONSTER_3.show) {
		CONTEXT.drawImage(MONSTER_IMAGE, MONSTER_3.currentX, MONSTER_3.currentY, 100, 100);
	}
	if (MONSTER_4.show) {
		CONTEXT.drawImage(MONSTER_IMAGE, MONSTER_4.currentX, MONSTER_4.currentY, 100, 100);
	}
	if (MONSTER_5.show) {
		CONTEXT.drawImage(MONSTER_IMAGE, MONSTER_5.currentX, MONSTER_5.currentY, 100, 100);
	}
	if (MONSTER_6.show) {
		CONTEXT.drawImage(MONSTER_IMAGE, MONSTER_6.currentX, MONSTER_6.currentY, 100, 100);
	}
	if (MONSTER_7.show) {
		CONTEXT.drawImage(MONSTER_IMAGE, MONSTER_7.currentX, MONSTER_7.currentY, 100, 100);
	}
	if (MONSTER_8.show) {
		CONTEXT.drawImage(MONSTER_IMAGE, MONSTER_8.currentX, MONSTER_8.currentY, 100, 100);
	}
	if (MONSTER_9.show) {
		CONTEXT.drawImage(MONSTER_IMAGE, MONSTER_9.currentX, MONSTER_9.currentY, 100, 100);
	}
	renderAction();
}

function main(){
	var NOW = Date.now();
	var differentTime = NOW - lastUpdateTime;
	if(differentTime >= TICKS) {	
		executeLevel();
		if (MONSTER_1.show) {
			updateMonster(MONSTER_1);
		}
		if (MONSTER_2.show) {
			updateMonster(MONSTER_2);
		}
		if (MONSTER_3.show) {
			updateMonster(MONSTER_3);
		}
		if (MONSTER_4.show) {
			updateMonster(MONSTER_4);
		}
		if (MONSTER_5.show) {
			updateMonster(MONSTER_5);
		}
		if (MONSTER_6.show) {
			updateMonster(MONSTER_6);
		}
		if (MONSTER_7.show) {
			updateMonster(MONSTER_7);
		}
		if (MONSTER_8.show) {
			updateMonster(MONSTER_8);
		}
		if (MONSTER_9.show) {
			updateRandomMonster(MONSTER_9);
		}
		renderMonster();
		lastUpdateTime = NOW;
	}
	var sleepTime = TICKS - differentTime;
	if(sleepTime < 0) {
		sleepTime = 0;
	}
	//EXECUTE IF END GAME
	if (SCORE <= 0) {
		CONTEXT.fillStyle = "#FFFFFF";
		CONTEXT.font = "40px Arial";
		CONTEXT.fillText("Game Over!!!", 130, 200);
		CONTEXT.font = "20px Arial";
		CONTEXT.fillStyle = "#5bfa3f";
		CONTEXT.fillText("Score = " + SCORE, 130, 240);
		CONTEXT.fillText("Best score = " + localStorage.getItem("BESTSCORE"), 130, 280);
	} else if (NUM_HEART == 0) {
		var temp = parseInt(localStorage.getItem("BESTSCORE"));
		if (temp < SCORE) {
			localStorage.setItem("BESTSCORE", SCORE);
		}
		CONTEXT.fillStyle = "#FFFFFF";
		CONTEXT.font = "40px Arial";
		CONTEXT.fillText("Game Over!!!", 130, 200);
		CONTEXT.font = "20px Arial";
		CONTEXT.fillStyle = "#5bfa3f";
		CONTEXT.fillText("Score = " + SCORE, 130, 240);
		CONTEXT.fillText("Best score = " + localStorage.getItem("BESTSCORE"), 130, 280);
	} else {	                        //CONTINUE GAME
		if (IS_RUN) {
			requestAnimationFrame(main);
		}
	}
	
}
// RUN GAME
var lastUpdateTime = Date.now();
var windows = window;
requestAnimationFrame = windows.requestAnimationFrame || windows.webkitRequestAnimationFrame 
						|| windows.msRequestAnimationFrame || windows.mozRequestAnimationFrame;
main();
