var smallT = 12.995;
var bigT = 8;
var smallTIn;
var bigTIn;
var smallR = 75;
var smallRSlider;
var bigR = 150;
var bigRSlider;
var smallA = 0;
var bigA = 0;
var smallDiv;
var bigDiv;

function setup() {
  createCanvas(400,400);
  smallTIn = createSlider(0,30,13,0.05);
  smallTIn.position(0,0);
  bigTIn = createSlider(0,30,8,0.05);
  bigTIn.position(0,25);
  var sliderWidth = bigTIn.width;
  
  smallDiv = createDiv(smallT);
  smallDiv.position(sliderWidth + 10, 0);
  smallDiv.style('color','white');
  
  bigDiv = createDiv(bigT);
  bigDiv.position(sliderWidth + 10, 25);
  bigDiv.style('color','white');
  
  angleMode(DEGREES);
  background(51);
  stroke(255);
}

function draw() {
  translate(width/2,height/2);
  
  if(smallT != smallTIn.value() || bigT != bigTIn.value()){
    smallA = 0;
    bigA = 0;
    smallT = smallTIn.value();
    bigT = bigTIn.value();
    smallDiv.html(smallT);
    bigDiv.html(bigT);
    background(51);
  }
  
  line(smallR * cos(smallA), smallR * sin(smallA), bigR * cos(bigA), bigR * sin(bigA));
  smallA += smallT / 2;
  bigA += bigT / 2;
}