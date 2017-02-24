var dict = {};
var myCanvas;
var strkWt = 3;
var usedWords = [];
var prevMouseX = 0;
var prevMouseY = 0;

function setup() {
    myCanvas = createCanvas(700, 800);
    myCanvas.position(5, 5);
    colorMode(HSB);
    strokeWeight(strkWt);
}

function draw() {
    if(mouseY < height && mouseX < width && usedWords.length > ceil(mouseY / strkWt) && mouseX !== prevMouseX && mouseY !== prevMouseY)
        drawWords();
//    println(ceil(mouseY / strkWt) + " < " + usedWords.length);
    if(mouseY < height && mouseX < width && usedWords.length > ceil(mouseY / strkWt) && mouseX !== prevMouseX && mouseY !== prevMouseY){
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        noStroke();
        fill(0);
        if(mouseX < width/2){
            text(usedWords[ceil(mouseY / strkWt)] + " - " + dict[usedWords[ceil(mouseY / strkWt)]], width * 3 / 8, mouseY)
        } else {
            text(usedWords[ceil((height + mouseY) / strkWt)] + " - " + dict[usedWords[ceil((height + mouseY) / strkWt)]], width * 7 / 8, mouseY)
        }
    }
}

function updateWords() {
    var w = document.getElementById("textBox").value;
    w = w.replace(/[.,\/#!$%\^&\*;:{}=\_`~()"'“”1234567890]/g,"").replace(/\r?\n/g, " ").replace(/[-—]/g," ").replace(/\t/g," "); // remove any and all punctuation
    var words = w.split(" ");
    dict = {};
    for (var i = 0; i < words.length; i++ ) {
        var word = words[i].toLowerCase();
        if ( !dict.hasOwnProperty(word) && word !== ""
                && !/\d+/.test(word.charAt(0))) {
            dict[word] = 1;
        } else {
            dict[word]++ ;
        }
    }
    
    println(Object.keys(dict).sort());
    drawWords();
}

function drawWords() {
    background(255);
    var i = 0;
    usedWords = [];
    for ( var key in dict) {
        if (dict.hasOwnProperty(key)) {
            if (dict[key] > 0) {
                stroke((10 * i) % 360, 100, 100);
                if(strkWt * i < height){
                    line(0, strkWt * i, strkWt * dict[key], strkWt * i);
                } else {
                    line(width / 2, strkWt * i - height, strkWt * dict[key] + width / 2, strkWt * i - height);
                }
                i++ ;
                usedWords.push(key);
            }
        }
    }
}