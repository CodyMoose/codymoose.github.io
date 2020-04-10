let canvasHeight = 200;
let hour;
let minute;
let second;
let milliseconds;
let circles = [];
let myCanvas;
let time;

function setup(){
    myCanvas = createCanvas(3 * canvasHeight, canvasHeight);
    textAlign(CENTER, CENTER);
    textSize(canvasHeight);
    refresh();
}

function draw(){
    background(50);
    stroke(255);
    fill(255);
    if(minute != new Date().getMinutes()){
        refresh();
    }
    text(time, width / 2, height / 2);
    loadPixels();
    
    for(let i = 0; i < floor(map(second, 60, 0, 0, 9)); i++){
        let x = floor(random() * width);
        let y = floor(random() * height);
        circles[circles.length] = new Circle(x, y, 0);
    }
    background(50);

    stroke(255);
    noFill();
    ellipseMode(RADIUS);

    for(let i = 0; i < circles.length; i++){
        circles[i].drawCircle();
    }

    growCircles();
}

function refresh(){
    background(50);
    hour = new Date().getHours() % 12;
    if(hour == 0) hour = 12;
    minute = new Date().getMinutes();
    second = new Date().getSeconds();
    milliseconds = new Date().getMilliseconds();

    time = hour + ":" + minute;
    if(minute < 10){
        time  = hour + ":0" + minute
    }
    
    print(time);
    circles = [];
}

function growCircles(){
    for(let i = 0; i < circles.length; i++){
        if(!circles[i].isTouchingEdge && !circles[i].isTouchingCircle && circles[i].r < map(random(), 0, 1, 7, 10)){
            circles[i].r += 0.5;
        } else circles[i].growing = false;
    }
}

class Circle {

    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.growing = true;
        loadPixels();
        let col = get(x, y);
        if(col[0] < 255){
            col = color(55);
        } else col = color(255)
        this.c = col;
    }

    

    drawCircle(){
        noStroke();
        fill(this.c);
        ellipse(this.x, this.y, this.r, this.r);
    }

    get isTouchingEdge(){
        let touch = false;
        if(this.growing){
            touch = (this.x + this.r >= width || this.x - this.r <= 0 || this.y + this.r >= height || this.y - this.r <= 0);
            if(touch) this.growing = false;
        }
        return touch || !this.growing;
    }

    get isTouchingCircle(){
        let touch = false;
        if(this.growing){
            for(let i = 0; i < circles.length; i++){
                if(circles[i] != this){
                    if(dist(this.x, this.y, circles[i].x, circles[i].y,) < this.r + circles[i].r){
                        touch = true;
                        break;
                    }
                }
            }
            if(touch) this.growing = false;
        }
        return touch || !this.growing;
    }
}