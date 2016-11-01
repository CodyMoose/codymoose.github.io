var segs = [{x:0,y:0}];
var scl = 20;
var ud = 0;
var lr = 1;
var fx;
var fy;
var spot;
var spotsX;
var spotsY;
var pressed = false;

function setup() {
  createCanvas(400,400);
  background(51);
  frameRate(10);
  spotsX = floor(width/scl);
  spotsY = floor(height/scl);
  resetFood();
  noStroke();
}

function draw() {
  pressed = false;
  background(51);
  move();
  eat();
  
  fill(0,255,0);
  rect(food.x * scl + 1, food.y * scl + 1, scl - 2, scl - 2);
  
  drawSnake();
  checkCrash();
}

function move() {
  for(var i = segs.length - 1; i > 0; i--){
    segs[i].x = segs[i-1].x;
    segs[i].y = segs[i-1].y;
  }
  segs[0].x += lr;
  segs[0].y += ud;
  
  if(segs[0].x >= width/scl || segs[0].x < 0) {
    doCrash();
    //segs[0].x -= lr;
  }
  
  if(segs[0].y >= height/scl || segs[0].y < 0) {
    doCrash();
    //segs[0].y -= ud;
  }
}

function drawSnake() {
  fill(255,255,0);
  for(var i = 1; i < segs.length; i++){
    rect(segs[i].x * scl + 1, segs[i].y * scl + 1,scl-2,scl-2);
  }
  
  fill(255,0,0);
  rect(segs[0].x * scl + 1, segs[0].y * scl + 1,scl-2,scl-2);
}

function keyPressed() {
  if(keyCode == UP_ARROW && ud != 1 && !pressed){
    pressed = true;
    ud = -1;
    lr = 0;
  } else if(keyCode == DOWN_ARROW && ud != -1 && !pressed){
    pressed = true;
    ud = 1;
    lr = 0;
  } else if(keyCode == RIGHT_ARROW && lr != -1 && !pressed){
    pressed = true;
    ud = 0;
    lr = 1;
  } else if(keyCode == LEFT_ARROW && lr != 1 && !pressed){
    pressed = true;
    ud = 0;
    lr = -1;
  } else if(key == 'P' || key == 'p'){
    eat();
  }
}

function eat() {
  if(segs[0].x == food.x && segs[0].y == food.y){
    var lastSeg = {x: segs[segs.length-1].x, y: segs[segs.length-1].y};
    segs.push(lastSeg);
    resetFood();
  }
}

function resetFood() {
  food = {x:floor(random(spotsX)), y:floor(random(spotsY))};
  var overlap = false;
  for(var i = 0; i < segs.length; i++){
    if(segs[i].x == food.x && segs[i].y == food.y)
      overlap = true;
  }
  if(overlap)
    resetFood();
}

function checkCrash() {
  var crash = false;
  if(segs != null)
  
  for(var i = 2; i < segs.length; i++) {
    if(segs[i].x == segs[0].x && segs[i].y == segs[0].y) {
      crash = true;
    }
  }
  
  if(crash)
    doCrash();
}

function doCrash() {
  segs = [{x:0,y:0}];
  ud = 0;
  lr = 1;
  resetFood();
}