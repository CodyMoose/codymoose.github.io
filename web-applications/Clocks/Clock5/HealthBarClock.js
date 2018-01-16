let canvasWidth = 400;
let canvasHeight = 50;
let hour;
let minute;
let second;
let milliseconds;
let circles = [];
let myCanvas;
let time;
let sectionWidth = canvasWidth / 3.5;
let gapWidth = (canvasWidth - 3 * sectionWidth) / 4;
let sectionHeight = canvasHeight - 2 * gapWidth;

function setup(){
    myCanvas = createCanvas(canvasWidth, canvasHeight);
    rectMode(CORNERS);
}

function draw(){
    print(hour);

    background(50);
    hour = new Date().getHours() % 12;
    if(hour == 0) hour = 12;
    minute = new Date().getMinutes();
    second = new Date().getSeconds();
    milliseconds = new Date().getMilliseconds();

    translate(gapWidth, gapWidth);
    noStroke();
    fill(0, 255, 0);
    rect(0, 0, sectionWidth * hour / 12, sectionHeight);
    stroke(100);
    noFill();
    rect(0, 0, sectionWidth, sectionHeight);
    for(let i = 0; i <= 12; i++){
        let x = sectionWidth * i / 12;
        line(x, 0, x, sectionHeight);
    }

    translate(gapWidth + sectionWidth, 0);
    noStroke();
    fill(0, 255, 0);
    rect(0, 0, sectionWidth * minute / 60, sectionHeight);
    stroke(100);
    noFill();
    rect(0, 0, sectionWidth, sectionHeight);
    for(let i = 0; i <= 6; i++){
        let x = sectionWidth * i / 6;
        line(x, 0, x, sectionHeight);
    }

    translate(gapWidth + sectionWidth, 0);
    noStroke();
    fill(0, 255, 0);
    rect(0, 0, sectionWidth * (second + milliseconds / 1000) / 60, sectionHeight);
    stroke(100);
    noFill();
    rect(0, 0, sectionWidth, sectionHeight);
    for(let i = 0; i <= 6; i++){
        let x = sectionWidth * i / 6;
        line(x, 0, x, sectionHeight);
    }

}