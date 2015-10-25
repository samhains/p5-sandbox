BAR_HEIGHT = 10;
CELL_WIDTH_MIN = 1
CELL_WIDTH_MAX = 1
CELL_HEIGHT_MIN = 1
CELL_HEIGHT_MAX = 1
CELL_SPEED_MIN = 1
CELL_SPEED_MAX = 80

var y = 100;
var x = 200

var cellX = {}
var cellWidth = {}
var cellColor = {}
var cellHeight = {}
var cellSpeed = {}
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
  if (!cellColor[id]){
    cellColor[id] = color;
  }
  if (cellX[id] >= width){
    resetCell(cellX, id)
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
  cellX[id] = 0;
  cellSpeed[id] = false;
  cellWidth[id] = BAR_HEIGHT*random(CELL_WIDTH_MIN, CELL_WIDTH_MAX);
}

function createLines(color){
  numOfBars = height/BAR_HEIGHT
  for(var i =0;i<numOfBars; i++){
    stroke(color);
    line(0, i*BAR_HEIGHT, width, i*BAR_HEIGHT)
  }
}
function draw() {
  background(255);
  createLines(200)
  for(var i = 0; i< height/BAR_HEIGHT; i++){
    createCell(i,random(width) , i, random(CELL_SPEED_MIN, CELL_SPEED_MAX), color([random(200)]))
    createCell(i+'b',random(width) , i, random(CELL_SPEED_MIN, CELL_SPEED_MAX), color([random(200)]))
    createCell(i+'c',random(width) , i, random(CELL_SPEED_MIN, CELL_SPEED_MAX), color([random(200)]))
  }
}
