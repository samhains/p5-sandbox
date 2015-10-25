LINES_ON = false;

BACKGROUND_COLOR = 'white'
LINE_COLOR = 230

BAR_HEIGHT = 10;

JITTER_ON = false;
NUM_OF_JITTERS = 40;
JITTER_LINE_MIN = 1;
JITTER_LINE_MAX = 4;

CELL_WIDTH_MIN = 1
CELL_WIDTH_MAX = 1
CELL_HEIGHT_MIN = 1
CELL_HEIGHT_MAX = 1
CELL_SPEED_MIN = 1
CELL_SPEED_MAX = 4

var y = 100;
var x = 200

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
   frameRate(30);
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
  if (!cellSpeed[id]){
    cellSpeed[id] = speed/(cellWidth[id]/4);
  }
  stroke(cellColor[id])
  fill(cellColor[id])
  // X position, Y position, width, height
  rect(cellX[id], BAR_HEIGHT*barNum, cellWidth[id], cellHeight[id]);
  cellX[id] = cellX[id] + cellSpeed[id];

}

function resetCell(cellX, id){
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
  var speed = random(CELL_SPEED_MIN, CELL_SPEED_MAX);

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
  for(var i = 0; i< height/BAR_HEIGHT; i++){
    var speed = calculateSpeed(CELL_SPEED_MIN, CELL_SPEED_MAX, i);
    createCell(i,random(width) , i, speed, color('black'))
    createCell(i+'a', random(width) , i, speed, color('black'))
    createCell(i+'b', random(width) , i, speed, color('black'))
    createCell(i+'c', random(width) , i, speed, color('black'))
    createCell(i+'d', random(width) , i, speed, color('black'))
    createCell(i+'e', random(width) , i, speed, color('black'))
    createJitterLines(i)
  }
}
