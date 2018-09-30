speed = 2;
robotCount = 40;
robots = [];
bck = 100;
a = 0.2;
scareDist = 25;
scarePushScale = 0.1;
targetPullScale = 0.1;
scary = false;
sustain = true;
dangerWalls = false;
wallForce = scareDist / 2;

function setup() {
    robots = [];
    createCanvas(600, 500)
    colorMode(HSB)
    background(bck);
    for (let i = 0; i < robotCount; i++) {
        robots[i] = new Robot();
    }
    for (let i = 0; i < robotCount; i++) {
        robots[i].establishTarget(i);
    }
}

function draw() {
    if(robotCount != robots.length){
        setup();
    }
    if(!sustain)
        background(bck);
    noFill();
    for (i = 0; i < robotCount; i++) {
        robots[i].show();
        robots[i].setTargetPosition();
        robots[i].steer();
    }
    for (i = 0; i < robotCount; i++) {
        robots[i].move();
    }
}

class Robot {
    constructor() {
        this.color = color(random(360), 100, 100, a);
        this.position = createVector(random(width), random(height));
        this.heading = random(TWO_PI);
        this.velocity = p5.Vector.fromAngle(this.heading).mult(speed);
    }

    establishTarget(i) {
        this.index = i;
        let index = floor(random(robotCount));
        while (index == i) {
            index = floor(random(robotCount));
        }
        this.targetIndex = index;
        this.target = robots[this.targetIndex];
    }

    move() {
        this.position.add(this.velocity);

        if (this.position.x < 0) {
            this.position.add(createVector(width, 0));
        } else if (this.position.x > width) {
            this.position.sub(createVector(width, 0));
        }

        if (this.position.y < 0) {
            this.position.add(createVector(0, height));
        } else if (this.position.y > height) {
            this.position.sub(createVector(0, height));
        }
    }

    steer() {
        if (!!this.target.position) {
            let deltaVec = p5.Vector.sub(this.target.position, this.position);
            this.velocity = this.velocity.add(deltaVec.setMag(speed * targetPullScale));
        }

        //*-
        if(scary){
            for(let i = 0; i < robotCount; i++){
                if(i != this.index){
                    let tempPos = robots[i].position.copy();
                    let deltaPos = p5.Vector.sub(this.position, tempPos);
                    if(deltaPos.mag() < scareDist){
                        this.velocity.add(deltaPos.setMag(speed * scarePushScale));
                    }
                }
            }
        }
        // */
        if(dangerWalls){
            if(width - this.position.x < scareDist){
                this.velocity.add(createVector(-wallForce, 0));
            }
            else if(this.position.x < scareDist){
                this.velocity.add(createVector(wallForce, 0));
            }

            if(height - this.position.y < scareDist){
                this.velocity.add(createVector(0, -wallForce));
            }
            else if(this.position.y < scareDist){
                this.velocity.add(createVector(0, wallForce));
            }
        }

        this.velocity.setMag(speed);
    }

    setTargetPosition() {
        this.targetPosition = robots[this.targetIndex].position.copy();
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());

        stroke(this.color);
        beginShape();
        vertex(4, 0);
        vertex(-2, -2);
        vertex(-2, 2);
        endShape(CLOSE);
        pop();

        //*
        if (!!this.target.position && !sustain) {
            stroke(this.color);
            line(this.position.x, this.position.y, this.target.position.x, this.target.position.y);
        }
        // */
    }
}