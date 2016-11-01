var sectors = 30;
var sectorA = 360 / sectors;
var pMX;
var pMY;
var resetBtn;

function setup(){
	angleMode(DEGREES);
	createCanvas(600, 600);
	translate(width / 2, height / 2);
	reset();
	resetBtn = createButton("Reset");
	resetBtn.position(5, 605);
	resetBtn.mousePressed(reset);
}

function draw() {
	translate(width/2,height/2);
	pMX = mouseX - width / 2;
	pMY = mouseY - height / 2;
}

function mouseDragged() {
	push();
	for(var i = 0; i < sectors; i++){
		line(pMX, pMY, mouseX - width / 2, mouseY - height / 2);
		rotate(sectorA);
	}
	pop();
	
	push();
	for(var i = 0; i < sectors; i++){
		line(pMY, pMX, mouseY - height / 2, mouseX - width / 2);
		rotate(sectorA);
	}
	pop();
}

function reset(){
	background(51);
	stroke(255);	
	push();
	for(var i = 0; i < sectors; i++){
		line(0, 0, width, height);
		rotate(sectorA);
	}
	pop();
}