var length = 200;
var aslider;
var angle;
var bslider;
var branches;
var sslider;
var size;

function setup() {
  createCanvas(800, 800)
  length = width/4;
  aslider = createSlider(0,TWO_PI, PI/4, PI/60);
  bslider = createSlider(1, 6, 2, 1);
  sslider = createSlider(0.1, 0.70, 0.70, 0.05);
}

function draw() {
  angle = aslider.value();
  branches = bslider.value();
  size = sslider.value();
  background(51);
  stroke(255);
  translate(width/2, height);
  branch(length);
}

function branch(len) {
  line(0, 0, 0, -len);
  
  for(var i = 0; i < branches; i++){
    push();
    translate(0, -len);
    if(branches > 1)
      rotate(-angle + 2 * i * angle / (branches - 1));
    if(len > 10)
      branch(len * size);
    pop();
  }
  
  //push();
  //translate(0, -len);
  //rotate(angle);
  //if(len > 10)
  //  branch(2 * len / 4);
  //pop();
  
  //push();
  //translate(0, -len);
  //rotate(angle / 3);
  //if(len > 10)
  //  branch(2 * len / 4);
  //pop();
  
  //push();
  //translate(0, -len);
  //rotate(-angle);
  //if(len > 10)
  //  branch(2 * len / 4);
  //pop();
  
  //push();
  //translate(0, -len);
  //rotate(-angle / 3);
  //if(len > 10)
  //  branch(2 * len / 4);
  //pop();
}