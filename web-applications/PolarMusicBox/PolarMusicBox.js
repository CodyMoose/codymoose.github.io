var amountOfTines = 40;
var maxDTheta = 1.5;
var tines = [];
var canvasSize = 600;

function setup() {
    createCanvas(canvasSize,canvasSize);
//    frameRate(15);
    colorMode(HSB);
    angleMode(DEGREES);
    setTines();
    var tineSlider = document.getElementById("tineSlider");
    tineSlider.style.top = canvasSize + 5 + "px";
    tineSlider.style.left = 5 + "px";
    var tineDiv = document.getElementById("tineDiv");
    tineDiv.style.top = canvasSize + 5 + "px";
    tineDiv.style.left = 5 + 150 + "px";
    println(tineDiv.style.left);
}

function draw() {
    background(0);
    translate(width/2, height/2);
    stroke(0,0,20);
    line(0,0,width/2,0);
    for(var i = 0; i < tines.length; i++){
        noStroke();
        fill(tines[i].c);
        if(tines[i].theta < 30 * tines[i].dTheta){
            fill(0, 0, 100);
        }
        ellipse(tines[i].pathRadius * cos(tines[i].theta), tines[i].pathRadius * sin(tines[i].theta), tines[i].circleDiameter, tines[i].circleDiameter);
        tines[i].theta += tines[i].dTheta;
        tines[i].theta = tines[i].theta % 360;
    }
}

function doSum(a, b){
    var sum = (b * b + b - a * a + a) / 2;
    return sum;
}

function changeTines(){
    amountOfTines = parseInt(document.getElementById("tineSlider").value);
    println("Tines: " + document.getElementById("tineSlider").value);
    document.getElementById("tineSpan").innerHTML = document.getElementById("tineSlider").value;
    setTines();
}

function setTines() {
    tines = [];
    var totalRadii = doSum(0,amountOfTines + 1);
    for(var i = 1; i <= amountOfTines; i++){
        var partialRadii = doSum(0,i);
        var pathRad = canvasSize / 2 * partialRadii / totalRadii;
        var circleDia = i / totalRadii * canvasSize;
        circleDia = map(i / totalRadii * canvasSize, 0, amountOfTines / totalRadii * canvasSize, 0, 20);
        var tine = {circleDiameter: circleDia * 2, c: color(360 / amountOfTines * i, 100, 100), theta: 0, pathRadius: pathRad, dTheta: maxDTheta * (1 - i / (amountOfTines + 1))};
        tines.push(tine);
    }
    
}