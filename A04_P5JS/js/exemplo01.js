var ondaX = 0,
    angulo = 0,
    anteX = 0,
    anteY = 0,
    lastFrameMs = 0

function setup() {
  createCanvas(400, 300)
  background(0)
  stroke("#cc0000")
  strokeWeight(5)
  lastFrameMs = Date.now()
}

function draw() {
  newFrameMs = Date.now()
  console.log("elapsed: " + (1000 / (newFrameMs - lastFrameMs)))
  lastFrameMs = newFrameMs
  
  var novoX = ondaX,
      novoY = 100 + (sin(angulo) * 40)
  
  line(anteX, anteY, novoX, novoY)
  
  anteX = novoX
  anteY = novoY
  
  angulo += 0.05
  ondaX += 1
}