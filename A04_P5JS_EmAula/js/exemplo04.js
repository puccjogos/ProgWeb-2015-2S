var oscilador,
    gerador1,
    tamanhoMaximo = 200,
    geradores = []

function Gerador(pX, pY, pCor, pFreq, pAmp) {
  this.duracao = pAmp * 2000
  this.x = pX
  this.y = pY
  this.cor = pCor
  
  this.osc = new p5.SinOsc()
  this.osc.freq(pFreq)
  this.osc.amp(pAmp)
}

Gerador.prototype.inicializar = function () {
  this.osc.start()
}

Gerador.prototype.desenhar = function () {
  fill(this.cor)
  ellipse(this.x, this.y, tamanhoMaximo * this.osc.getAmp(), tamanhoMaximo * this.osc.getAmp())
  this.duracao -= 1
  if(this.duracao <= 0) {
    this.duracao = 0
  }
  this.osc.amp(this.duracao / 2000)
}



function setup() {
  createCanvas(500, 500)
  background(210)
  //gerador1.inicializar()
  /*
  oscilador = new p5.SinOsc()
  oscilador.amp(1)
  oscilador.freq(440)
  oscilador.start()
  */
}

function draw() {
  background(210)
  for (var indice in geradores) {
    geradores[indice].desenhar()
  }
  //oscilador.freq(mouseX)
  /*
  if (mouseIsPressed) {
    oscilador.amp(1)
  }
  else {
    oscilador.amp(0)
  }
  */
}

function mouseClicked() {
  var frequencia = 300 + mouseX
  var volume = mouseY/height
  var temp = new Gerador(mouseX, mouseY, 'blue', frequencia, volume)
  temp.inicializar()
  geradores.push(temp)
}
















