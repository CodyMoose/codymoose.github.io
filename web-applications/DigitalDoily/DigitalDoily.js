var sectors = 30;
var sectorAngle = 360 / sectors;
var pMX;
var pMY;
var myCanvas;
var resetBtn;
var sectorSlider;
var sectorDiv;
var r = 255;
var g = 255;
var b = 255;
var rSlider;
var rDiv;
var gSlider;
var gDiv;
var bSlider;
var bDiv;
var downloadBtn;
var toggleBtn;
var w = window.innerWidth;
var h = window.innerHeight;
var mode = 0;
var modeSlider;
var modeDiv;
var sectorsOn = true;
var sectorToggle;
var strkWt = 1;
var strkWtSlider;
var strkWtDiv;
var coords = [];

function setup(){
	document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
	angleMode(DEGREES);
	myCanvas = createCanvas(600, 600);
	translate(width / 2, height / 2);
	reset();
	resetBtn = createButton("Reset");
	resetBtn.position(width + 5, 5);
	resetBtn.mousePressed(reset);
	sectorSlider = createSlider(1, 450, 30, 1);
	sectorSlider.position(resetBtn.x, resetBtn.y + resetBtn.height + 5)
	sectorDiv = createDiv("Sectors: " + sectors);
	sectorDiv.position(sectorSlider.x + sectorSlider.width + 5, sectorSlider.y);

	rSlider = createSlider(0,255,255,1);
	rSlider.position(sectorSlider.x, sectorSlider.y + sectorSlider.height + 5)
	rDiv = createDiv("Red: " + r);
	rDiv.position(rSlider.x + rSlider.width + 5, rSlider.y);

	gSlider = createSlider(0,255,255,1);
	gSlider.position(rSlider.x, rSlider.y + rSlider.height + 5)
	gDiv = createDiv("Green: " + g);
	gDiv.position(gSlider.x + gSlider.width + 5, gSlider.y);

	bSlider = createSlider(0,255,255,1);
	bSlider.position(gSlider.x, gSlider.y + gSlider.height + 5)
	bDiv = createDiv("Blue: " + b);
	bDiv.position(bSlider.x + bSlider.width + 5, bSlider.y);
	
	var red = color(r,0,0);
	rDiv.style('color', red);
	var green = color(0,g,0);
	gDiv.style('color', green);
	var blue = color(0,0,b);
	bDiv.style('color', blue);
	
	toggleBtn = createButton("Toggle Canvas Size");
	toggleBtn.position(bSlider.x, bSlider.y + bSlider.height + 5);
	toggleBtn.mousePressed(toggleSize);
	
	downloadBtn = createButton("Download");
	downloadBtn.position(toggleBtn.x + toggleBtn.width + 5, bSlider.y + bSlider.height + 5);
	downloadBtn.mousePressed(download);
	
	modeSlider = createSlider(0,1,0,1);
	modeDiv = createDiv("Reflection Mode: Both");
	
	modeSlider.size(modeSlider.width / 3, modeSlider.height);
	modeSlider.position(sectorDiv.x + sectorSlider.width + 20, sectorSlider.y);
	modeDiv.position(modeSlider.x + modeSlider.width + 5, modeSlider.y);
	
	sectorToggle = createButton("Toggle Sector Lines");
	sectorToggle.position(modeSlider.x, modeSlider.y + modeSlider.height + 5);
	sectorToggle.mousePressed(toggleSectors);
	
	strkWtSlider = createSlider(0,40,1,1);
	strkWtDiv = createDiv("Line Width: " + strkWt);
	
	strkWtSlider.position(sectorToggle.x, sectorToggle.y + sectorToggle.height + 5);
	strkWtDiv.position(strkWtSlider.x + strkWtSlider.width + 5, strkWtSlider.y);
}

function draw() {
	translate(width/2,height/2);
	if(sectorsOn){
		refresh();
	}
	if(sectors != sectorSlider.value() || mode != modeSlider.value()){
		sectors = sectorSlider.value();
		mode = modeSlider.value();
		switch(mode){
			case 0:
				modeDiv.html("Reflection Mode: Both");
				break;
			case 1:
				modeDiv.html("Reflection Mode: Single");
				break;
		}
		sectorAngle = 360 / sectors;
		sectorDiv.html("Sectors: " + sectors);
		refresh();
	}
	
	if(r != rSlider.value() || g != gSlider.value() || b != bSlider.value()){
		r = rSlider.value();
		g = gSlider.value();
		b = bSlider.value();
		rDiv.html("Red: " + r);
		gDiv.html("Green: " + g);
		bDiv.html("Blue: " + b);
		
		var red = color(r,0,0);
		rDiv.style('color', red);
		
		var green = color(0,g,0);
		gDiv.style('color', green);
		
		var blue = color(0,0,b);
		bDiv.style('color', blue);
		
		var result = color(r,g,b);
		rDiv.style('background-color',result);
		gDiv.style('background-color',result);
		bDiv.style('background-color',result);
		
	}
	
	strkWtDiv.html("Line Width: " + strkWt);
	strkWt = strkWtSlider.value();
	strokeWeight(strkWt);
	
	stroke(r,g,b);
	pMX = mouseX - width / 2;
	pMY = mouseY - height / 2;
	

	for(var j = 1; j < coords.length - 1; j++) {
		if(coords[j].x != -1 && coords[j].y != -1 && coords[j + 1].x != -1 && coords[j + 1].y != -1) {
		stroke(coords[j].c);
		strokeWeight(coords[j].s);
//		print(coords[j]);
		push();
		for(var i = 0; i < sectors; i++){
			line(coords[j].x, coords[j].y, coords[j + 1].x, coords[j + 1].y);
			rotate(sectorAngle);
		}
		pop();
	
		if(mode == 0) {
			push();
			for(var i = 0; i < sectors; i++){
				line(coords[j].y, coords[j].x, coords[j + 1].y, coords[j + 1].x);
				rotate(sectorAngle);
			}
			pop();
		}
		}
	}
}

function mouseDragged() {
	if(mouseX <= width && mouseY <= height) {
		var p = {x: mouseX - width / 2, y: mouseY - height / 2, c: color(r,g,b), s: strkWt};
		coords.push(p);
//			push();
//			for(var i = 0; i < sectors; i++){
//				line(pMX, pMY, mouseX - width / 2, mouseY - height / 2);
//				rotate(sectorAngle);
//			}
//			pop();
//		
//		if(mode == 0) {
//			push();
//			for(var i = 0; i < sectors; i++){
//				line(pMY, pMX, mouseY - height / 2, mouseX - width / 2);
//				rotate(sectorAngle);
//			}
//			pop();
//		}
	}
}

function refresh() {
	background(51);
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
	stroke(r, g, b);
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
		myCanvas.size(w, h);
		resetBtn.position(5, height + 5);
	} else {
		myCanvas.size(600, 600);
		resetBtn.position(width + 5, 5);
	}
	sectorSlider.position(resetBtn.x, resetBtn.y + resetBtn.height + 5)
	sectorDiv.position(sectorSlider.x + sectorSlider.width + 5, sectorSlider.y);
	rSlider.position(sectorSlider.x, sectorSlider.y + sectorSlider.height + 5)
	rDiv.position(rSlider.x + rSlider.width + 5, rSlider.y);
	gSlider.position(rSlider.x, rSlider.y + rSlider.height + 5)
	gDiv.position(gSlider.x + gSlider.width + 5, gSlider.y);
	bSlider.position(gSlider.x, gSlider.y + gSlider.height + 5)
	bDiv.position(bSlider.x + bSlider.width + 5, bSlider.y);
	toggleBtn.position(bSlider.x, bSlider.y + bSlider.height + 5);
	downloadBtn.position(toggleBtn.x + toggleBtn.width + 5, bSlider.y + bSlider.height + 5);
	modeSlider.position(sectorDiv.x + sectorSlider.width + 20, sectorDiv.y);
	modeDiv.position(modeSlider.x + modeSlider.width + 5, modeSlider.y);
	sectorToggle.position(modeSlider.x, modeSlider.y + modeSlider.height + 5);
	strkWtSlider.position(sectorToggle.x, sectorToggle.y + sectorToggle.height + 5);
	strkWtDiv.position(strkWtSlider.x + strkWtSlider.width + 5, strkWtSlider.y);
	
	background(51);
	translate(width/2,height/2);
	refresh();
}

function toggleSectors() {
	sectorsOn = !sectorsOn;
	background(51);
}

function mouseReleased() {
	var p = {x: -1, y: -1, c: color(0,0,0,0), s: 0};
	coords.push(p);
	println(coords);
}