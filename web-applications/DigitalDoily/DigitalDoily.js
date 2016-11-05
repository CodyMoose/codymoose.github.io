var sectors = 30;
var sectorAngle = 360 / sectors;
var myCanvas;
var resetBtn;
var sectorSlider;
var sectorDiv;
var drawColorR = drawColorG = drawColorB = 255;
var downloadBtn;
var toggleBtn;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var sectorReflectionMode = 0;
var sectorReflectionModeSlider;
var sectorReflectionModeDiv;
var sectorsOn = true;
var sectorToggle;
var strkWt = 1;
var strkWtSlider;
var strkWtDiv;
var coords = [];
var undoBtn;
var backgroundColor;

function setup(){
	backgroundColor = color(51,51,51);
	document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
	angleMode(DEGREES);
	myCanvas = createCanvas(600, 600);
	translate(width / 2, height / 2);
	reset();
	resetBtn = createButton("Reset");
	resetBtn.position(width + 5, 5);
	resetBtn.mousePressed(reset);
	sectorSlider = createSlider(0, 150, 30, 1);
	sectorSlider.position(resetBtn.x, resetBtn.y + resetBtn.height + 5)
	sectorDiv = createDiv("Sectors: " + sectors);
	sectorDiv.position(sectorSlider.x + sectorSlider.width + 5, sectorSlider.y);
	
	var elem1 = document.getElementById('drawColor');
	elem1.style.left = sectorSlider.x + 'px';
	elem1.style.top =  sectorSlider.y + sectorSlider.height + 5 + 'px';
	
	var elem2 = document.getElementById('backgroundColor');
	elem2.style.left = sectorSlider.x + 'px';
	elem2.style.top = sectorSlider.y + 2 * (sectorSlider.height + 6) + 'px';
	
	toggleBtn = createButton("Toggle Canvas Size");
	toggleBtn.position(sectorSlider.x, sectorSlider.y + 3 * (sectorSlider.height + 7));
	toggleBtn.mousePressed(toggleSize);
	
	downloadBtn = createButton("Download");
	downloadBtn.position(toggleBtn.x + toggleBtn.width + 5, toggleBtn.y);
	downloadBtn.mousePressed(download);
	
	sectorToggle = createButton("Toggle Sector Lines");
	sectorToggle.position(sectorDiv.x + sectorSlider.width + 20, sectorSlider.y);
	sectorToggle.mousePressed(toggleSectors);
	
	sectorReflectionModeSlider = createSlider(0,1,0,1);
	sectorReflectionModeDiv = createDiv("Reflection Mode: Both");
	
	sectorReflectionModeSlider.size(sectorReflectionModeSlider.width / 3, sectorReflectionModeSlider.height);
	sectorReflectionModeSlider.position(sectorToggle.x, sectorToggle.y + sectorToggle.height + 5);
	sectorReflectionModeDiv.position(sectorReflectionModeSlider.x + sectorReflectionModeSlider.width + 5, sectorReflectionModeSlider.y);
	
	strkWtSlider = createSlider(0,40,1,1);
	strkWtDiv = createDiv("Line Width: " + strkWt);
	
	strkWtSlider.position(sectorReflectionModeSlider.x, sectorReflectionModeSlider.y + sectorReflectionModeSlider.height + 5);
	strkWtDiv.position(strkWtSlider.x + strkWtSlider.width + 5, strkWtSlider.y);
	
	undoBtn = createButton("Undo");
	undoBtn.position(strkWtSlider.x, strkWtSlider.y + strkWtSlider.height + 5);
	undoBtn.mousePressed(undo);

	noFill();
}

function draw() {
	translate(width/2,height/2);
	if(sectors != sectorSlider.value() || sectorReflectionMode != sectorReflectionModeSlider.value()){
		sectors = sectorSlider.value();
		sectorReflectionMode = sectorReflectionModeSlider.value();
		switch(sectorReflectionMode){
			case 0:
				sectorReflectionModeDiv.html("Reflection Mode: Both");
				break;
			case 1:
				sectorReflectionModeDiv.html("Reflection Mode: Single");
				break;
		}
		sectorAngle = 360 / sectors;
		sectorDiv.html("Sectors: " + sectors);
	}
	
    refresh();
	
	strkWtDiv.html("Line Width: " + strkWt);
	strkWt = strkWtSlider.value();
	strokeWeight(strkWt);

	for(var i = 0; i <= sectors; i++){
		if(coords.length > 0) {
			stroke(coords[0].c);
            strokeWeight(coords[0].s);
		}
		beginShape();
		for(var j = 0; j < coords.length; j++) {
			if(coords[j].x != -1 && coords[j].y != -1 && coords[j].s != 0) {
                vertex(coords[j].x, coords[j].y);
			}
			else {
				endShape();
				if(coords.length - j > 1) {
					stroke(coords[j + 1].c);
					strokeWeight(coords[j + 1].s);
				}
				beginShape();
			}
		}
		endShape();
		
		if(coords.length > 0) {
			stroke(coords[0].c);
            strokeWeight(coords[0].s);
		}
		beginShape();
		if(sectorReflectionMode == 0) {
			for(var j = 0; j < coords.length; j++) {
				if(coords[j].x != -1 && coords[j].y != -1 && coords[j].s != 0) {
				    vertex(coords[j].y, coords[j].x);
				}
				else {
					endShape();
					if(coords.length - j > 1) {
						stroke(coords[j + 1].c);
	                    strokeWeight(coords[j + 1].s);
					}
					beginShape();
				}			
			}
		}
		endShape();
        rotate(sectorAngle);
	}
	
	/*-
	for(var j = 0; j < coords.length - 1; j++) {
		if(coords[j].x != -1 && coords[j].y != -1 && coords[j + 1].x != -1 && coords[j + 1].y != -1) {
			stroke(coords[j].c);
			strokeWeight(coords[j].s);
			line(coords[j].x, coords[j].y, coords[j + 1].x, coords[j + 1].y);
			push();
			for(var i = 0; i < sectors; i++){
				line(coords[j].x, coords[j].y, coords[j + 1].x, coords[j + 1].y);
				rotate(sectorAngle);
			}
			pop();
			
			if(sectorReflectionMode == 0) {
				push();
				for(var i = 0; i < sectors; i++){
					line(coords[j].y, coords[j].x, coords[j + 1].y, coords[j + 1].x);
					rotate(sectorAngle);
				}
				pop();
			}
		}
	}
	// */
}

function mouseDragged() {
	if(mouseX <= width && mouseY <= height) {
		var p = {x: mouseX - width / 2, y: mouseY - height / 2, c: color(drawColorR,drawColorG,drawColorB), s: strkWt};
		coords.push(p);
	}
}

function refresh() {
	background(backgroundColor);
	strokeWeight(1);
	if(sectorsOn){
		stroke(100);	
		push();
		for(var i = 0; i < sectors; i++){
			line(0, 0, width, height);
			rotate(sectorAngle);
		}
		pop();
	}
	stroke(drawColorR, drawColorG, drawColorB);
	strokeWeight(strkWt);
}

function reset() {
	refresh();
	coords = [];
}

function download() {
	saveCanvas(myCanvas,'DigitalDoily', 'jpg');
}

function toggleSize() {
	if(myCanvas.width == 600){
		myCanvas.size(windowWidth, windowHeight);
		resetBtn.position(5, height + 5);
	} else {
		myCanvas.size(600, 600);
		resetBtn.position(width + 5, 5);
	}
	
	sectorSlider.position(resetBtn.x, resetBtn.y + resetBtn.height + 5);
	sectorDiv.position(sectorSlider.x + sectorSlider.width + 5, sectorSlider.y);
	
	toggleBtn.position(sectorSlider.x, sectorSlider.y + 3 * (sectorSlider.height + 7));
	downloadBtn.position(toggleBtn.x + toggleBtn.width + 5, toggleBtn.y);
	sectorToggle.position(sectorDiv.x + sectorSlider.width + 20, sectorSlider.y);
	sectorReflectionModeSlider.position(sectorToggle.x, sectorToggle.y + sectorToggle.height + 5);
	sectorReflectionModeDiv.position(sectorReflectionModeSlider.x + sectorReflectionModeSlider.width + 5, sectorReflectionModeSlider.y);
	strkWtSlider.position(sectorReflectionModeSlider.x, sectorReflectionModeSlider.y + sectorReflectionModeSlider.height + 5);
	strkWtDiv.position(strkWtSlider.x + strkWtSlider.width + 5, strkWtSlider.y);
	undoBtn.position(strkWtSlider.x, strkWtSlider.y + strkWtSlider.height + 5);
	
	var drawColorPicker = document.getElementById('drawColor');
	drawColorPicker.style.left = sectorSlider.x + 'px';
	drawColorPicker.style.top =  sectorSlider.y + sectorSlider.height + 5 + 'px';
	
	var backgroundColorPicker = document.getElementById('backgroundColor');
	backgroundColorPicker.style.left = sectorSlider.x + 'px';
	backgroundColorPicker.style.top = sectorSlider.y + 2 * (sectorSlider.height + 6) + 'px';
	
	background(backgroundColor);
	translate(width/2,height/2);
	refresh();
}

function toggleSectors() {
	sectorsOn = !sectorsOn;
	refresh();
}

function mouseReleased() {
	var p = {x: -1, y: -1, c: color(0,0,0,0), s: 0};
	coords.push(p);
}

function undo() {
	if(coords.length > 0) {
		coords.pop();
		while(coords[coords.length - 1].x != -1){
			coords.pop();
		}
		coords.pop();
	}
}

function updateDrawColor(rIn, gIn, bIn) {
	drawColorR = rIn;
	drawColorG = gIn;
	drawColorB = bIn;
	stroke(drawColorR, drawColorG, drawColorB);
}

function updateBackgroundColor(gInn, gIn, bIn) {
	backgroundColor = color(rIn, gIn, bIn);
	background(backgroundColor);
}