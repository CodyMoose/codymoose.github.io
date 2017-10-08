var pointsAmount = 8;
var centers = [];
var points = [];
var lines = [];
var canvasSize = 700;
var angleShift;
var theta = 0;
var speed = 5;
var thetaOffset;
var circleRad;
var pointSlider;
var modeSlider;
var mode = 2;

function setup(){
    createCanvas(canvasSize,canvasSize);
    angleMode(DEGREES);
    ellipseMode(RADIUS);
    angleShift = 360 / pointsAmount;
    thetaOffset = mode * angleShift;
    circleRad = canvasSize / 10;
    pointSlider = createSlider(1,20,8,1);
    modeSlider = createSlider(1, 8, 2, 1);

    for(var i = 0; i < pointsAmount; i++){
        centers[i] = {x: width / 2 * (1 + 3 / 4 * cos(angleShift * i)), y: height / 2 * (1 + 3 / 4 * sin(angleShift * i))}
    }
    for(var i = 0; i < pointsAmount; i++){
        points[i] = {x: centers[i].x + circleRad * cos(theta + i * thetaOffset), y: centers[i].y + circleRad * sin(theta + i * thetaOffset)};
    }
    var c = 0;
    for(var i = 0; i < pointsAmount; i++){
        for(var j = i + 1; j < pointsAmount; j++){
            lines[c] = {p1: i, p2: j};
            c++;
        }
    }
}

function draw(){
    background(50, 50, 50);
    noFill();
    stroke(255);
    if(pointsAmount != pointSlider.value() || mode != modeSlider.value()){
        pointsAmount = pointSlider.value();
        mode = modeSlider.value();
        reset();
    }
    
    for(var i = 0; i < pointsAmount; i++){
        points[i] = {x: centers[i].x + circleRad * cos(theta + i * thetaOffset), y: centers[i].y + circleRad * sin(theta + i * thetaOffset)};
    }

    for(var i = 0; i < pointsAmount; i++){
        ellipse(centers[i].x, centers[i].y, circleRad);
    }
    // noStroke();
    // fill(255, 0, 0);
    // for(var i = 0; i < pointsAmount; i++){
    //     ellipse(points[i].x, points[i].y, 4);
    // }

    // stroke(255);
    for(var i = 0; i < lines.length; i++){
        p1 = points[lines[i].p1];
        p2 = points[lines[i].p2];
        line(p1.x, p1.y, p2.x, p2.y);
    }

    theta -= speed;
}

function reset(){
    angleShift = 360 / pointsAmount;
    thetaOffset = mode * angleShift;
    circleRad = canvasSize / 10;

    centers = [];
    points = [];
    lines = [];

    for(var i = 0; i < pointsAmount; i++){
        centers[i] = {x: width / 2 * (1 + 3 / 4 * cos(angleShift * i)), y: height / 2 * (1 + 3 / 4 * sin(angleShift * i))}
    }
    for(var i = 0; i < pointsAmount; i++){
        points[i] = {x: centers[i].x + circleRad * cos(theta + i * thetaOffset), y: centers[i].y + circleRad * sin(theta + i * thetaOffset)};
    }
    var c = 0;
    for(var i = 0; i < pointsAmount; i++){
        for(var j = i + 1; j < pointsAmount; j++){
            lines[c] = {p1: i, p2: j};
            c++;
        }
    }
}
