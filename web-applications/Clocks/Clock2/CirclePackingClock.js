let canvasHeight = 200;
let hour;
let minute;
let second;
let milliseconds;
let circles = [];
let myCanvas;

function setup(){
    myCanvas = createCanvas(3 * canvasHeight, canvasHeight);
    // for(let i = 0; i < 50; i++){
    //     let x = map(random(), 0, 1, 0, width);
    //     let y = map(random(), 0, 1, 0, height);
    //     let r = map(random(), 0, 1, 0, 0);
        
    //     circles[i] = new Circle(x, y, r);
    // }
    textAlign(CENTER, CENTER);
    textSize(canvasHeight);
}

function draw(){
    background(50);
    stroke(255);
    fill(255);
    // text(hour + ":" + minute, width / 2, height / 2);
    if(minute != new Date().getMinutes()){
        reDraw();
    }

    stroke(255, 0, 0);
    noFill();
    ellipseMode(RADIUS);
    for(let i = 0; i < circles.length; i++){
        circles[i].drawCircle();
    }

    growCircles();
}

function reDraw(){
    background(50);
    hour = new Date().getHours() % 12;
    if(hour == 0) hour = 12;
    minute = new Date().getMinutes();
    second = new Date().getSeconds();
    milliseconds = new Date().getMilliseconds();

    stroke(255);
    fill(255);

    let time = hour + ":" + minute;
    if(minute < 10){
        time  = hour + ":0" + minute
    }
    text(time, width / 2, height / 2);
    print(time);

    loadPixels();
    circles = [];
    for(let i = 0; i < 250; i++){
        // let x = floor(map(random(), 0, 1, width / 4, 3 * width / 4));
        // let y = floor(map(random(), 0, 1, height / 2 - 50, height / 2 + 50));
        let x = floor(width * random());
        let y = floor(height * random());

        let isWhite = get(x, y)[0] > 60;
        while(!isWhite){
            x = floor(width * random());
            y = floor(height * random());
            isWhite = get(x, y)[0] > 60;
        }
        print(pixels[x + y * width]);
        // if(!isWhite)
        circles[circles.length] = new Circle(x, y, 0);
    }
    background(50);
}

function growCircles(){
    for(let i = 0; i < circles.length; i++){
        if(!circles[i].isTouchingEdge && !circles[i].isTouchingCircle)
            circles[i].r += 0.25;
    }
}

class Circle {

    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    drawCircle(){
        ellipse(this.x, this.y, this.r, this.r);
    }

    get isTouchingEdge(){
        let touch = false;
        return (this.x + this.r >= width || this.x - this.r <= 0 || this.y + this.r >= height || this.y - this.r <= 0);
    }

    get isTouchingCircle(){
        let touch = false;
        for(let i = 0; i < circles.length; i++){
            if(circles[i] != this){
                if(dist(this.x, this.y, circles[i].x, circles[i].y,) < this.r + circles[i].r){
                    touch = true;
                    break;
                }
            }
        }
        return touch;
    }
}