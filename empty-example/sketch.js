LINES_ON = true;

BACKGROUND_COLOR = 'white'
LINE_COLOR = 230

BAR_HEIGHT = 2;

JITTER_ON = false;
NUM_OF_JITTERS = 100;
JITTER_LINE_MIN = 1;
JITTER_LINE_MAX = 10;

FLICKER_BARS_ON = false
TURN_SLIDERS_ON = true
FREQUENCY_FLICKER_BAR_1 = 1
FREQUENCY_FLICKER_BAR_2 = 3
FREQUENCY_FLICKER_BAR_3 = 8
CELL_WIDTH_MIN = 1
CELL_WIDTH_MAX = Math.random()*30
CELL_HEIGHT_MIN = 1
CELL_HEIGHT_MAX = Math.random()*30
CELL_SPEED_MIN = 1
CELL_SPEED_MAX = 1

var y = 100;
var xoff = 0.0;
var boff = 0.0;
var coff = 0.0;
var x = 200

//var globals = {
  //CELL_WIDTH_MAX: Math.random()*50
  //CELL_HEIGHT_MAX: Math.random()*50
//}
var cellX = {}
var cellWidth = {}
var cellColor = {}
var cellHeight = {}
var cellSpeed = {}
var reverseRow = {}
var cellId = 0;

function setup() {
  // uncomment this line to make the canvas the full size of the window
   createCanvas(600, 500);
   strokeWeight(1);
   frameRate(3);
}
// The statements in the setup() function
// execute once when the program begins
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.

function randomBarNumber(){
  return BAR_HEIGHT*(random(height/BAR_HEIGHT));
}


function randomBarLineArray(){
  numOfBars = Math.floor(height/BAR_HEIGHT);
  var arr = [];
  for(var i=0; i< 10; i++){
    arr.push(random(numOfBars));
  }
  return arr;
}
function createCell(id, startAt, barNum, speed, color){
  if (!cellX[id]){
    cellX[id] = startAt;
  }
  if (!cellHeight[id]){
    cellHeight[id] = BAR_HEIGHT*random(CELL_HEIGHT_MIN, CELL_HEIGHT_MAX);
  }
  if (!cellWidth[id]){
    cellWidth[id] = BAR_HEIGHT*random(CELL_WIDTH_MIN, CELL_WIDTH_MAX);
  }
  if (cellX[id] >= width){
    resetCell(cellX, id)
  }
  if (!cellColor[id]){
    cellColor[id] = color;
  }
  stroke(cellColor[id])
  fill(cellColor[id])
  // X position, Y position, width, height
  rect(cellX[id], BAR_HEIGHT*barNum, cellWidth[id], cellHeight[id]);
  cellX[id] = cellX[id] + cellSpeed[id];

}

function resetCell(cellX, id){
  if (!cellSpeed[id]){
    cellSpeed[id] = calculateSpeed(CELL_SPEED_MIN, CELL_SPEED_MAX, id[0] || id);
  }
  cellSpeed[id] = false;
  cellColor[id] = false;
  cellWidth[id] = BAR_HEIGHT*random(CELL_WIDTH_MIN, CELL_WIDTH_MAX);
  cellX[id] = 0- cellWidth[id];
}

function createLines(color){
  if(LINES_ON){
    numOfBars = height/BAR_HEIGHT
    for(var i =0;i<numOfBars; i++){
      stroke(color);
      line(0, i*BAR_HEIGHT, width, i*BAR_HEIGHT)
    }
  }
}
function createJitterLines(currentLine){
  if (JITTER_ON){
    for(var j =0; j < random(JITTER_LINE_MIN, JITTER_LINE_MAX); j++){
      createCell(currentLine+' '+j, random(width), currentLine, random(CELL_SPEED_MIN, CELL_SPEED_MAX), color(298));
    }
  }
}
function calculateSpeed(min, max, i){
  var speed = random(CELL_SPEED_MIN, CELL_SPEED_MAX)/(cellWidth[i]/4);

  if (!reverseRow[i]){
    reverseRow[i] = Math.floor(random(1,3));
  }
  if (reverseRow[i] == 2){
    speed = -speed
  }
  return speed;
}

function draw() {
  background(BACKGROUND_COLOR);
  createLines(LINE_COLOR)
  fill('black')
  xoff = xoff - 0.01;
  boff = boff + 0.001;
  var b = 8*sin(boff/5)
  coff = coff + 3.01;
  var c = 100*cos(coff)
  var n = noise(xoff) * width/4 + width
  if (TURN_SLIDERS_ON){
    fill([220,220, 255])
  console.log(CELL_WIDTH_MAX)
  //rect(n*b, 1, n, height/8) 
    //rect(n*b, 1, width/16, n)
      //fill('black')
    rect(0, 0, width, height/2)
    //rect(0, b, width, height/8)
  // X position, Y position, width, height
  //rect(-n*3*b, 0, n, height/16)
  }
  if (FLICKER_BARS_ON) {
    fill('black')
    rect(0, FREQUENCY_FLICKER_BAR_2*c, n, random(height)/2)
    //rect(0, FREQUENCY_FLICKER_BAR_3*c, n, random(height)/20)
    rect(0, FREQUENCY_FLICKER_BAR_1*c, n, height/12)
  }
  //rect(0, n*2*b, n, height/16)
  for(var i = 0; i< height/BAR_HEIGHT; i++){
    var speed = calculateSpeed(CELL_SPEED_MIN, CELL_SPEED_MAX, i);
    createCell(i,random(width) , i, speed,[255])
    createCell(i+'a', random(width) , i, speed,[200,200, 255])
    createCell(i+'b', random(width) , i, speed,[255])
    createCell(i+'c', random(width) , i, speed,[0])
    createCell(i+'d', random(width) , i, speed,[0])
    createCell(i+'e', random(width) , i, speed,[0])
    createJitterLines(i)
  }
}
