let canvasWidth = 356;
let canvasHeight = 357;
let hour;
let minute;
let second;
let milliseconds;
let sectionGapWidth = 20;
let gapWidth = 7;
let circleRad = 10;

function setup(){
    myCanvas = createCanvas(canvasWidth, canvasHeight);
    ellipseMode(RADIUS);
    print(sectionGapWidth + (gapWidth + 2 * circleRad) * 11);
    angleMode(DEGREES);
}

function draw(){
    print(hour);

    background(50);
    hour = new Date().getHours() % 12;
    if(hour == 0) hour = 12;
    minute = new Date().getMinutes();
    second = new Date().getSeconds();
    milliseconds = new Date().getMilliseconds();
    
    stroke(100);
    translate(sectionGapWidth + circleRad, 0);
    for(let i = 1; i <= 12; i++){
        if(i <= hour){
            fill(255);
        } else noFill();
        ellipse(0, height - (sectionGapWidth + circleRad + (gapWidth + 2 * circleRad) * (i - 1)), circleRad);
    }
    
    translate(sectionGapWidth + 2 * circleRad, 0);

    noStroke();
    fill(255);
    let fillingMinutesX = minute % 5;
    let fillingMinutesY = floor(minute / 5);
    let fillingMinutesArcX = (2 * circleRad + gapWidth) * fillingMinutesX;
    let fillingMinutesArcY = height - (sectionGapWidth + circleRad + (2 * circleRad + gapWidth) * fillingMinutesY);
    arc(fillingMinutesArcX, fillingMinutesArcY, circleRad, circleRad, -90, -90 + (second + milliseconds / 1000) / 60 * 360, PIE);
    
    stroke(100);
    for(let y = 0; y < 12; y++){
        for(let x = 0; x < 5; x++){
            if(1 + x + y * 5 <= minute){
                fill(255);
            } else noFill();
            ellipse((2 * circleRad + gapWidth) * x, height - (sectionGapWidth + circleRad + (2 * circleRad + gapWidth) * y), circleRad);
        }
    }

    translate(sectionGapWidth + 10 * circleRad + 4 * gapWidth, 0);
    
    noStroke();
    fill(255);
    let fillingSecondsX = second % 5;
    let fillingSecondsY = floor(second / 5);
    let fillingSecondsArcX = (2 * circleRad + gapWidth) * fillingSecondsX;
    let fillingSecondsArcY = height - (sectionGapWidth + circleRad + (2 * circleRad + gapWidth) * fillingSecondsY);
    arc(fillingSecondsArcX, fillingSecondsArcY, circleRad, circleRad, -90, -90 + milliseconds / 1000 * 360, PIE);
    stroke(100);
    for(let y = 0; y < 12; y++){
        for(let x = 0; x < 5; x++){
            if(1 + x + y * 5 <= second){
                fill(255);
            } else noFill();
            ellipse((2 * circleRad + gapWidth) * x, height - (sectionGapWidth + circleRad + (2 * circleRad + gapWidth) * y), circleRad);
        }
    }
}