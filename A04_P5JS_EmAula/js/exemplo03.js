var bolaX = 0,
    bolaY = 0,
    tamanhoBola = 50,
    tempo = 0,
    sinal = 1

function setup() {
  createCanvas(600, 400)
  background(50)
}

function draw() {
  // bateu na parede da direita
  if(bolaX >= 600){
    sinal = -1
    bolaX = 599
  }
  // bateu na parede da esquerda
  if(bolaX <= 0){
    sinal = 1
    bolaX = 1
  } 
  tempo += sinal
  bolaX = tempo
  bolaY = (sin(tempo/20) * 100) + 150
  
  if (mouseIsPressed) {
    fill('red')
    var tamanhoFinal = 60 + tamanhoBola * sin(tempo/50)
    ellipse(bolaX, bolaY, tamanhoFinal, tamanhoFinal)  
  }
  else {
    fill(`white`)
    ellipse(bolaX, bolaY, tamanhoBola, tamanhoBola)  
  } 
}