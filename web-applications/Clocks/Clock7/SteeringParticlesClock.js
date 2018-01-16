let canvasWidth = 600;
let canvasHeight = canvasWidth / 2;
let hour;
let minute;
let second;
let milliseconds;
let circleRad = 3;
let targets = [];
let points = [];
let font;
let fontSize = canvasWidth / 3;
let initialVelocity = 20;
let minMouseDist = fontSize / 4;

function preload(){
    font = loadFont('Avenir-Next-LT-Pro-Demi.ttf');
}

function setup(){
    myCanvas = createCanvas(canvasWidth, canvasHeight);
    ellipseMode(RADIUS);
    stroke(255);
    textSize(fontSize);
    textAlign(CENTER, CENTER);
    textFont(font);
    updateTime();
}

function draw(){
    if(minute != new Date().getMinutes()){
        updateTime();
    }

    background(50);

    strokeWeight(canvasWidth / 120);
    colorMode(HSB);

    second = new Date().getSeconds();
    milliseconds = new Date().getMilliseconds();

    stroke(second * 6, 100, 100);
    let mouseVec = createVector(mouseX, mouseY);
    let center = createVector(width / 2, height / 2);
    points.forEach(p => {
        if(second + milliseconds / 1000 >= 59.875){
            p.target = center;
        }
        let distToMouse = p.position.dist(mouseVec);
        if(distToMouse <= minMouseDist){
            p.fleeMouse(distToMouse, mouseVec);
        }
        p.steer();
        p.movePoint();
        point(p.position.x, p.position.y);
    });
    colorMode(RGB);
}

function updateTime(){
    hour = new Date().getHours() % 12;
    if(hour == 0) hour = 12;
    minute = new Date().getMinutes();
    second = new Date().getSeconds();
    milliseconds = new Date().getMilliseconds();
    if(minute < 10) minute = "0" + minute;
    if(second < 10) second = "0" + second;
    time = hour + ":" + minute;

    let bbox = font.textBounds(time, width / 2, height / 2, fontSize, 0);
    rect(bbox.x, bbox.y, bbox.w + bbox.x, bbox.h + bbox.y);

    targets = font.textToPoints(time, (width - bbox.w) / 2, height / 2 + bbox.h / 2, fontSize);

    points = [];
    for(let i = 0; i < targets.length; i++){
        let t = targets[i];
        points[i] = new myPoint(t.x, t.y, i);
    }
}

class myPoint{
    constructor(x, y, index){
        this.i = index;
        this.position = createVector(width / 2, height / 2);
        this.target = createVector(targets[index].x, targets[index].y);

        this.velocity = createVector(map(random(), 0, 1, -initialVelocity, initialVelocity), map(random(), 0, 1, -initialVelocity, initialVelocity));
    }

    get desired(){
        let d = createVector((this.target.x - this.position.x) / 2, (this.target.y - this.position.y) / 2);
        return d;
    }

    movePoint(){
        this.position.add(p5.Vector.mult(this.velocity, 0.5));
    }

    steer(){
        let steeringForce = p5.Vector.mult(p5.Vector.sub(this.desired, this.velocity), 0.1);
        this.velocity.add(steeringForce);
    }

    fleeMouse(d, mVec){
        let fleeForceMag = map(d, 0, minMouseDist, minMouseDist / 2, 0);
        let fleeForce = p5.Vector.sub(this.position, mVec);
        fleeForce.setMag(fleeForceMag);
        this.velocity.add(fleeForce);
    }
}
