function setup() {
  createCanvas(640, 480)
  background("#555")
}

function draw() {
  background(50)
  if(mouseIsPressed){
    fill("#c00")
    ellipse(mouseX, mouseY, 50, 50)
  }
  else {
    fill("#fff")
  }
}