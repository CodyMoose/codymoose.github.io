let canvSize = 500;
let hour;
let minute;
let second;
let milliseconds;
let hAngle;
let mAngle;
let sAngle;
let hColor;
let mColor;
let sColor;

function setup(){
    createCanvas(canvSize, canvSize);
    hColor = color(24, 221, 0);
    mColor = color(47, 181, 243);
    sColor = color(252, 130, 195);
    angleMode(DEGREES);
}

function draw(){
    background(50);
    hour = new Date().getHours();
    minute = new Date().getMinutes();
    second = new Date().getSeconds();
    milliseconds = new Date().getMilliseconds();

    hAngle = (15 * hour) + (6 / 15 / 60 * minute) + (15 / 60 / 60 * second) + (15 / 60 / 60 / 1000 * milliseconds);
    mAngle = 6 * minute + 6 / 60 * second + 6 / 60 / 1000 * milliseconds;
    sAngle = 6 * second + (6 / 1000 * milliseconds);

    push();
    translate(width / 2, height / 2);
    rotate(-90);

    noFill();
    strokeWeight(10);

    let r = 390;

    stroke(hColor);
    arc(0, 0, r, r, 0, hAngle);

    stroke(mColor);
    arc(0, 0, r + 30, r + 30, 0, mAngle);

    stroke(sColor);
    arc(0, 0, r + 60, r + 60, 0, sAngle);

    pop();
}