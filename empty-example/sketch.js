function setup() {
  // uncomment this line to make the canvas the full size of the window
   createCanvas(500, 300);
   strokeWeight(1);
   frameRate(30);
}
var y = 100;
var x = 200
var barHeight = 6;

var cellX = {
}
var cellSpeed = {
}
var cellId = 0;

// The statements in the setup() function
// execute once when the program begins
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.

function randomBarNumber(){
  return barHeight*(random(height/barHeight));
}


function randomBarLineArray(){
  numOfBars = Math.floor(height/barHeight);
  var arr = [];
  for(var i=0; i< 10; i++){
    arr.push(random(numOfBars));
  }
  return arr;
}
function createCell(id, startAt, barNum, speed){
  if (!cellX[id]){
    cellX[id] = startAt;
  }
  if (cellX[id] >= width){
    cellX[id] = 0;
    cellSpeed[id] = false;
  }
  if (!cellSpeed[id]){
    cellSpeed[id] = speed
  }
  fill('black')
  // X position, Y position, width, height
  rect(cellX[id], barHeight*barNum, barHeight*3, barHeight);
  cellX[id] = cellX[id] + cellSpeed[id];

}

function createLines(){
  numOfBars = height/barHeight
  for(var i =0;i<numOfBars; i++){
    line(0, i*barHeight, width, i*barHeight)
  }
}
function draw() {
  background(255);
  fill('black');
  //var n = noise(x) * width;
  createLines();
  for(var i = 0; i< height/barHeight; i++){
    createCell(i, 0, i, random(100))
  }
  //createCell(0, 0, 0, 1)
  //createCell(1, 0, 1, 2)
  //createCell(2, 0, 2, 0.5)
  //createCell(3, 0, 3, 1)
  //createCell(4, 0, 4, 2)
  //createCell(5, 0, 5, 10)
}
