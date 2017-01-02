var t = 0;
var points = [];
var pointsAmount = 4;
var hStep = 360 / (pointsAmount - 1);
var percent = .5;

function setup(){
    colorMode(HSB);
    createCanvas(700,700);
    for(var i = 0; i < pointsAmount; i++){
        points.push([]);
    }
    for(var i = 0; i < pointsAmount; i++){
        points[0].push({x: Math.random() * height, y: Math.random() * width});
    }
    points[0] = [{x: 75, y: 625}, {x: 75, y: 75}, {x: 625, y: 75}, {x: 625, y: 625}]
    for(var i = 1; i < pointsAmount; i++){
        for(var j = 0; j < pointsAmount - i; j++){
            var p1 = points[i - 1][j];
            var p2 = points[i - 1][j + 1];
            var newPoint = {x: (p2.x - p1.x) * percent + p1.x, y: (p2.y - p1.y) * percent + p1.y};
            points[i][j] = newPoint;
        }
    }
}

function draw(){
    background(20);
    stroke(0,0,100);
    noFill();
    bezier(points[0][0].x, points[0][0].y, points[0][1].x, points[0][1].y, points[0][2].x, points[0][2].y, points[0][3].x, points[0][3].y);
    
    for(var i = 0; i < pointsAmount; i++){
        for(var j = 0; j < pointsAmount - i - 1; j++){
            stroke(hStep * i, 100, 100);
            var p1 = points[i][j];
            var p2 = points[i][j + 1];
            line(p1.x, p1.y, p2.x, p2.y);
            noStroke();
            fill(0,0,100);
            ellipse(p1.x, p1.y, 5);
        }
        var p = points[i][points[i].length - 1];
        ellipse(p.x, p.y, 5);
    }
    
    for(var i = 1; i < pointsAmount; i++){
        for(var j = 0; j < pointsAmount - i; j++){
            var p1 = points[i - 1][j];
            var p2 = points[i - 1][j + 1];
            var newPoint = {x: (p2.x - p1.x) * percent + p1.x, y: (p2.y - p1.y) * percent + p1.y};
            points[i][j] = newPoint;
        }
    }
}

function updatePercent(per){
    percent = per / 500;
}
