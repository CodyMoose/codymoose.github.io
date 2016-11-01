var length = 200;
var angle;
var rVal;
var lVal;
var opac = 51;

function setup() {
  createCanvas(800,800);
  angle = PI/2;
  length = width/4;
}

function draw() {
  background(51);
  rVal = mouseX / width * angle;
  lVal = -mouseY/ height * angle;
  stroke(255,0,0,opac);
  line(0,0,width,height);
  stroke(0,0,255,opac);
  line(width,0,0,height);
  stroke(0,255,0,opac);
  line(width/3,height,width,height/3);
  translate(width/2, height);
  stroke(255);
  branch(length);
}

function branch(len) {
  line(0, 0, 0, -len);
  
  push();
  translate(0, -len);
  rotate(rVal);
  if(len > 4)
    branch(2 * len / 3);
  pop();
  
  push();
  translate(0, -len);
  rotate(lVal);
  if(len > 4)
    branch(2 * len / 3);
  pop();
}