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
let fontSize = canvasWidth / 4;
let initialVelocity = 20;
let minMouseDist = fontSize / 4;
let g1Index = 65;
let g1Points = [];
let o1Index = 107;
let o1Points = [];
let o2Index = 149;
let o2Points = [];
let g2Index = 212;
let g2Points = [];
let lIndex = 237;
let lPoints = [];
let ePoints = [];
let G;

function preload(){
    font = loadFont('ProductSansFiles/Product Sans Regular.ttf');
}

function setup(){
    G =  6.674 * Math.pow(10, -11);
    myCanvas = createCanvas(canvasWidth, canvasHeight);
    ellipseMode(RADIUS);
    stroke(255);
    textSize(fontSize);
    textAlign(CENTER, CENTER);
    textFont(font);

    let bbox = font.textBounds("Google", width / 2, height / 2, fontSize, 0);

    targets = font.textToPoints("Google", (width - bbox.w) / 2, height / 2 + bbox.h / 2, fontSize);
    points = [];
    for(let i = 0; i < targets.length; i++){
        let t = targets[i];
        points[i] = new myPoint(t.x, t.y, i);
    }
    g1Points = points.slice(0, g1Index);
    o1Points = points.slice(g1Index + 1, o1Index);
    o2Points = points.slice(o1Index + 1, o2Index);
    g2Points = points.slice(o2Index + 1, g2Index);
    lPoints = points.slice(g2Index + 1, lIndex);
    ePoints = points.slice(lIndex + 1, points.length);
}

function draw(){
    background(55);
    strokeWeight(canvasWidth / 120);
    let mouseVec = createVector(mouseX, mouseY);

    stroke(72, 133, 237);
    g1Points.forEach(p => {
        let distToMouse = p.position.dist(mouseVec);
        p.seekMouse(distToMouse, mouseVec);
        p.steer();
        p.applyForce();
        p.movePoint();
        point(p.position.x, p.position.y);
    });
    g2Points.forEach(p => {
        let distToMouse = p.position.dist(mouseVec);
        p.seekMouse(distToMouse, mouseVec);
        p.steer();
        p.applyForce();
        p.movePoint();
        point(p.position.x, p.position.y);
    });

    stroke(219, 50, 54);
    o1Points.forEach(p => {
        let distToMouse = p.position.dist(mouseVec);
        p.seekMouse(distToMouse, mouseVec);
        p.steer();
        p.applyForce();
        p.movePoint();
        point(p.position.x, p.position.y);
    });
    ePoints.forEach(p => {
        let distToMouse = p.position.dist(mouseVec);
        p.seekMouse(distToMouse, mouseVec);
        p.steer();
        p.applyForce();
        p.movePoint();
        point(p.position.x, p.position.y);
    });

    stroke(244, 194, 13);
    o2Points.forEach(p => {
        let distToMouse = p.position.dist(mouseVec);
        p.seekMouse(distToMouse, mouseVec);
        p.steer();
        p.applyForce();
        p.movePoint();
        point(p.position.x, p.position.y);
    });

    stroke(60, 186, 84);
    lPoints.forEach(p => {
        let distToMouse = p.position.dist(mouseVec);
        p.seekMouse(distToMouse, mouseVec);
        p.steer();
        p.applyForce();
        p.movePoint();
        point(p.position.x, p.position.y);
    });
}

class myPoint{
    constructor(x, y, index){
        this.i = index;
        this.position = createVector(width / 2, height / 2);
        this.target = createVector(targets[index].x, targets[index].y);

        this.velocity = createVector(map(random(), 0, 1, -initialVelocity, initialVelocity), map(random(), 0, 1, -initialVelocity, initialVelocity));
        this.force = createVector(0,0);
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
        this.force.add(steeringForce);
    }

    seekMouse(d, mVec){
        let pointMass = 1000;
        let mouseMass = 1 / G;
        let seekForceMag = G * mouseMass * pointMass / (d * d);
        let seekForce = p5.Vector.sub(this.position, mVec);
        seekForce.setMag(seekForceMag);
        seekForce.limit(25);
        this.force.sub(seekForce);
    }

    applyForce(){
        this.velocity.add(this.force);
        this.force = createVector(0,0);
    }
}
