var d = new Date();
var seconds;
var thetaS;
var minutes;
var thetaM;
var hours;
var thetaH;
var sz = 400;
var dia = 7 * sz / 8;
var rad = dia / 2;
var hL = rad / 2;
var mL = rad * .8;
var sL = rad * .8;
var majTicks = 12;
var minTicks = 60;
var majTickL = rad / 10;
var minTickL = rad / 20;
var majTickA;
var minTickA;

function setup() {
  createCanvas(sz, sz);
  majTickA = TWO_PI / majTicks;
  minTickA = TWO_PI / minTicks;
}

function draw() {
  d = new Date();
  seconds = d.getSeconds() + d.getMilliseconds() / 1000;
  minutes = d.getMinutes() + seconds / 60;
  hours = d.getHours() + minutes / 60;
  
  thetaS = seconds / 30 * PI;
  thetaM = minutes / 30 * PI;
  thetaH = hours / 6 * PI;
  
  translate(width/2,height/2);
  stroke(0);
  strokeWeight(3)
  fill(255);
  ellipse(0,0,7 * width / 8, 7 * height / 8);
  
  strokeWeight(4);
  line(0,0,hL * Math.cos(thetaH - PI/2), hL * Math.sin(thetaH - PI/2));
  
  strokeWeight(3);
  line(0,0,mL * Math.cos(thetaM - PI/2), mL * Math.sin(thetaM - PI/2));
  
  stroke(255,0,0);
  strokeWeight(1);
  line(0,0,sL * Math.cos(thetaS - PI/2), sL * Math.sin(thetaS - PI/2));
  
  
  stroke(0);
  strokeWeight(3);
  for(var i = 0; i < majTicks; i++){
    var a = majTickA * i;
    line(rad * Math.cos(a), rad * Math.sin(a), (rad - majTickL) * Math.cos(a), (rad - majTickL) * Math.sin(a));
  }
  
  stroke(0);
  strokeWeight(1);
  for(var i = 0; i < minTicks; i++){
    var a = minTickA * i;
    line(rad * Math.cos(a), rad * Math.sin(a), (rad - minTickL) * Math.cos(a), (rad - minTickL) * Math.sin(a));
  }
  
}