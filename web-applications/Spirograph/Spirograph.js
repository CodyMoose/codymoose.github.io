var midR = 60;
var outR = 20;
var percentR = 1;
var ratio = midR / outR;
var theta = -90;
//var pointsRTh = [{th: 0, ph: 0}];
var pointsXY = [{x:0,y:0}];
var midSlider;
var outSlider;
var percentSlider;
var midDiv;
var outDiv;
var percentDiv;

function setup() {
  angleMode(DEGREES);
  createCanvas(400,400);
  background(51);
  outSlider = createSlider(-75,75,20,1);
  outSlider.position(0,0);
  
  midSlider = createSlider(1,75,60,1);
  midSlider.position(0,25);
  
  percentSlider = createSlider(0,2,1,0.01);
  percentSlider.position(0,50);
  
  var sliderWidth = midSlider.width;
  
  outDiv = createDiv(outR);
  outDiv.position(sliderWidth + 10, 0);
  outDiv.style('color','white');
  
  midDiv = createDiv(midR);
  midDiv.position(sliderWidth + 10, 25);
  midDiv.style('color','white');
  
  percentDiv = createDiv(percentR * 100 + '%');
  percentDiv.position(sliderWidth + 10, 50);
  percentDiv.style('color','white');
}

function draw() {
  if(outR != outSlider.value() || midR != midSlider.value() || percentR != percentSlider.value()){
    theta = -90;
    outR = outSlider.value();
    midR = midSlider.value();
    percentR = percentSlider.value();
    ratio = midR / outR;
    //pointsRTh = [{th: 0, ph: 0}];
    pointsXY = [{x:0,y:0}];
    outDiv.html(outR);
    midDiv.html(midR);
    percentDiv.html(percentR * 100 + '%');
  }
  translate(width/2,height/2);
  background(51);
  noFill();
  stroke(255);
  ellipse(0, 0, midR * 2);
  ellipse((midR + outR) * cos(theta), (midR + outR) * sin(theta), outR * 2);
  //var rth = {th: theta - 90, ph: (theta + 90) * ratio - 180};
  var xy = {x: (midR + outR) * cos(theta) + outR * percentR * cos((theta + 90) * (ratio + 1) + 90), y: (midR + outR) * sin(theta) + outR * percentR * sin((theta + 90) * (ratio + 1) + 90)};
  //println(points.length);
  //if(points.length <= 1440){
  //  var overlap = false;
  //  for(var i = 0; i < points.length; i++)
  //    if(dist(p.x,p.y,points[i].x,points[i].y) <= 1 && points.length - i >= 36)
  //      overlap = true;
  //  if(!overlap)
      //pointsRTh.push(rth);
      pointsXY.push(xy);
  //}
  //stroke(255);
  //noFill();
  //for(var i = 1; i < pointsRTh.length; i++){
  //  push();
  //  rotate(pointsRTh[i].th);
  //  translate(0, midR + outR);
  //  rotate(pointsRTh[i].ph);
  //  ellipse(0, outR, 0);
  //  pop();
  //}
  
  noFill();
  stroke(255);
  beginShape();
  for(var i = 1; i < pointsXY.length; i++){
    vertex(pointsXY[i].x,pointsXY[i].y);
  }
  endShape();
  line((midR + outR) * cos(theta), (midR + outR) * sin(theta),xy.x,xy.y);
  
  //stroke(255);
  //push();
  //  rotate(rth.th);
  //  translate(0, midR + outR);
  //  rotate(rth.ph);
  //  line(0,0,0,outR);
  //pop();
  
  theta ++;
}