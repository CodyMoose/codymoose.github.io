var points = [];
var drawingPoints = [];
var pointsAmount = 4;
var hStep = 360 / (pointsAmount - 1);
var percent = .5;
var mousePress = {x: 0, y: 0};
var grabRad = 12.5;
var circleGrabbed = -1;
var bezierCurvePoints = [];
var doTheDraw = true;

function setup(){
    hStep = 360 / (pointsAmount - 1);
    points = [];
    colorMode(HSB);
    createCanvas(700,700);
    for(var i = 0; i < pointsAmount; i++){
        points[i] = [];
    }
    for(var i = 0; i < pointsAmount; i++){
        points[0][i] = {x: Math.random() * height, y: Math.random() * width};
    }
//    points[0] = [{x: 75, y: 625}, {x: 75, y: 75}, {x: 625, y: 75}, {x: 625, y: 625}]
    for(var i = 1; i < pointsAmount; i++){
        for(var j = 0; j < pointsAmount - i; j++){
            var p1 = points[i - 1][j];
            var p2 = points[i - 1][j + 1];
            points[i][j] = nextPoint(p1, p2, percent);
        }
    }
    drawingPoints = points;
    calcBezierPoints();
}

function draw(){
    if(doTheDraw)
        drawStuff();
    drawSecondaries();
}

function drawStuff(){
    background(20);
    stroke(0,0,100);
    noFill();
    calcBezierPoints();
    drawBezierPoints();
    
    drawSecondaries();
    
    for(var i = 1; i < pointsAmount; i++){
        for(var j = 0; j < pointsAmount - i; j++){
            var p1 = points[i - 1][j];
            var p2 = points[i - 1][j + 1];
            var newPoint = {x: (p2.x - p1.x) * percent + p1.x, y: (p2.y - p1.y) * percent + p1.y};
            points[i][j] = newPoint;
        }
        
        for(var j = 0; j < pointsAmount - i; j++){
            var p1 = drawingPoints[i - 1][j];
            var p2 = drawingPoints[i - 1][j + 1];
            var newPoint = {x: (p2.x - p1.x) * percent + p1.x, y: (p2.y - p1.y) * percent + p1.y};
            drawingPoints[i][j] = newPoint;
        }
    }
}

function updatePercent(per){
    percent = per / 500;
    document.getElementById("percentDiv").innerHTML = Math.round(percent * 10000) / 100 + "%";
}

function mousePressed(){
    for(var i = 0; i < pointsAmount; i++){
        var p = points[0][i];
        var dX = mouseX - p.x;
        var dY = mouseY - p.y;
        var distance = Math.pow(dX * dX + dY * dY, .5);
        if(distance <= grabRad){
            circleGrabbed = i;
        }
    }
}

function mouseReleased(){
    circleGrabbed = -1;
}

function mouseDragged(){
    if (circleGrabbed != -1) {
//        var dMX = mouseX - pmouseX;
//        var dMY = mouseY - pmouseY;
//        points[0][circleGrabbed].x += dMX;
//        points[0][circleGrabbed].y += dMY;
        points[0][circleGrabbed].x = mouseX;
        points[0][circleGrabbed].y = mouseY;
        
        drawingPoints[0][circleGrabbed].x = mouseX;
        drawingPoints[0][circleGrabbed].y = mouseY;
    }
}

function nextPoint(p1, p2, per){
    var newX = nextCoord(p1.x, p2.x, per);
    var newY = nextCoord(p1.y, p2.y, per);
    var newPoint = {x: newX, y: newY};
    return newPoint;
}

function nextCoord(x1, x2, per){
    var newX = (x2 - x1) * per + x1;
    return newX;
}

function calcBezierPoints(){
    bezierCurvePoints = points;
    var temp = bezierCurvePoints;
    for(var i = 1; i < pointsAmount; i++){
        for(var j = 0; j < temp[i].length; j++){
            temp[i][j] = [];
        }
    }
    for (var j = 0; j < temp[1].length; j++ ) {
        for (var i = 0.0; i <= 100.0; i++ ) {
            temp[1][j][i] = nextPoint(points[0][j], points[0][j + 1], i / 100);
        }
    }
    for (var j = 2; j < pointsAmount; j++ ) {
        for (var k = 0; k < temp[j].length; k++ ) {
            for (var i = 0; i <= 100; i++ ) {
                temp[j][k][i] = nextPoint(temp[j - 1][k][i], temp[j - 1][k + 1][i], i / 100);
            }
        }
    }
    bezierCurvePoints = temp;
}

function drawBezierPoints(){
    noFill();
    stroke(0, 0, 100);
    beginShape();
    var index = pointsAmount - 1;
    for (var i = 0; i <= 100; i++) {
        curveVertex(bezierCurvePoints[index][0][i].x, bezierCurvePoints[index][0][i].y);
    }
    endShape();
}

function drawSecondaries(){
    for(var i = 0; i < pointsAmount; i++){
        for(var j = 0; j < pointsAmount - i - 1; j++){
            stroke(hStep * i, 100, 100);
            var p1 = points[i][j];
            var p2 = points[i][j + 1];
            line(p1.x, p1.y, p2.x, p2.y);
            noStroke();
            fill(0,0,100);
            if(i == 0){
                ellipse(p1.x, p1.y, grabRad);
            } else ellipse(p1.x, p1.y, 5);
        }
        var p = points[i][points[i].length - 1];
        if(i == 0){
            ellipse(p.x, p.y, grabRad);
        } else ellipse(p.x, p.y, 5);
    }
}

function updatePoints(amount){
    pointsAmount = amount;
    document.getElementById("pointsDiv").innerHTML = pointsAmount + " points";
    setup();
}