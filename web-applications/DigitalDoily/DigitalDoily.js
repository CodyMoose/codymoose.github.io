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
var undoBtn;
var bkgd;
var drawPicker;

function setup(){
	bkgd = color(51,51,51);
	document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
	angleMode(DEGREES);
	myCanvas = createCanvas(600, 600);
	translate(width / 2, height / 2);
	reset();
	resetBtn = createButton("Reset");
	resetBtn.position(width + 5, 5);
	resetBtn.mousePressed(reset);
	sectorSlider = createSlider(0, 450, 30, 1);
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
	
	modeSlider = createSlider(0,1,0,1);
	modeDiv = createDiv("Reflection Mode: Both");
	
	modeSlider.size(modeSlider.width / 3, modeSlider.height);
	modeSlider.position(sectorToggle.x, sectorToggle.y + sectorToggle.height + 5);
	modeDiv.position(modeSlider.x + modeSlider.width + 5, modeSlider.y);
	
	strkWtSlider = createSlider(0,40,1,1);
	strkWtDiv = createDiv("Line Width: " + strkWt);
	
	strkWtSlider.position(modeSlider.x, modeSlider.y + modeSlider.height + 5);
	strkWtDiv.position(strkWtSlider.x + strkWtSlider.width + 5, strkWtSlider.y);
	
	undoBtn = createButton("Undo");
	undoBtn.position(strkWtSlider.x, strkWtSlider.y + strkWtSlider.height + 5);
	undoBtn.mousePressed(undo);
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
	
	strkWtDiv.html("Line Width: " + strkWt);
	strkWt = strkWtSlider.value();
	strokeWeight(strkWt);
	pMX = mouseX - width / 2;
	pMY = mouseY - height / 2;
	

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
	}
}

function refresh() {
	background(bkgd);
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
	println(sectorSlider.x);
	println(sectorSlider.y + sectorSlider.height + 5);
	sectorDiv.position(sectorSlider.x + sectorSlider.width + 5, sectorSlider.y);
//	rSlider.position(sectorSlider.x, sectorSlider.y + sectorSlider.height + 5)
//	rDiv.position(rSlider.x + rSlider.width + 5, rSlider.y);
//	gSlider.position(rSlider.x, rSlider.y + rSlider.height + 5)
//	gDiv.position(gSlider.x + gSlider.width + 5, gSlider.y);
//	bSlider.position(gSlider.x, gSlider.y + gSlider.height + 5)
//	bDiv.position(bSlider.x + bSlider.width + 5, bSlider.y);
	toggleBtn.position(sectorSlider.x, sectorSlider.y + 3 * (sectorSlider.height + 7));
	downloadBtn.position(toggleBtn.x + toggleBtn.width + 5, toggleBtn.y);
	sectorToggle.position(sectorDiv.x + sectorSlider.width + 20, sectorSlider.y);
	modeSlider.position(sectorToggle.x, sectorToggle.y + sectorToggle.height + 5);
	modeDiv.position(modeSlider.x + modeSlider.width + 5, modeSlider.y);
	strkWtSlider.position(modeSlider.x, modeSlider.y + modeSlider.height + 5);
	strkWtDiv.position(strkWtSlider.x + strkWtSlider.width + 5, strkWtSlider.y);
	undoBtn.position(strkWtSlider.x, strkWtSlider.y + strkWtSlider.height + 5);
	
	var elem1 = document.getElementById('drawColor');
	elem1.style.left = sectorSlider.x + 'px';
	elem1.style.top =  sectorSlider.y + sectorSlider.height + 5 + 'px';
	
	var elem2 = document.getElementById('backgroundColor');
	elem2.style.left = sectorSlider.x + 'px';
	elem2.style.top = sectorSlider.y + 2 * (sectorSlider.height + 6) + 'px';
	
	background(bkgd);
	translate(width/2,height/2);
	refresh();
}

function toggleSectors() {
	sectorsOn = !sectorsOn;
	background(bkgd);
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

function updateDrawColor(ri, gi, bi) {
	r = ri;
	g = gi;
	b = bi;
	stroke(r, g, b);
}

function updateBackgroundColor(ri, gi, bi) {
	bkgd = color(ri, gi, bi);
	background(bkgd);
}