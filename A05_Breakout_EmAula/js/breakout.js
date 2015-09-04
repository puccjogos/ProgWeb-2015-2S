var bola,
    paredeTopo,
    paredeDireita,
    paredeEsquerda,
    paredes,
    plataforma,
    blocos

function setup() {
  noCursor()
  createCanvas(640, 480)
  background(0)
  
  // definir a bola
  bola = createSprite(width/2, height - 50, 12, 12)
  bola.velocity.set(-2, -2)
  
  // definir paredes
  paredes = new Group()
  paredeDireita = createSprite(width, height/2, 30, height)
  paredeDireita.immovable = true
  paredes.add(paredeDireita)
  paredeEsquerda = createSprite(0, height/2, 30, height)
  paredeEsquerda.immovable = true
  paredes.add(paredeEsquerda)
  paredeTopo = createSprite(width/2, 0, width, 30)
  paredeTopo.immovable = true
  paredes.add(paredeTopo)
  
  // definir plataforma
  plataforma = createSprite(width/2, height-20, 80, 20)
  plataforma.immovable = true
  
  //definicao dos blocos
  blocos = new Group()
  for(var linha = 1; linha < 2; linha++){
    for(var coluna = 1; coluna < 2; coluna++) {
      var novoBloco = createSprite(coluna * 50 - 4, linha * 30 +4, 40, 20)
      novoBloco.immovable = true;
      blocos.add(novoBloco)
    }
  }
}

function draw() {
  background(0)
  if(keyDown(KEY.SPACE)){
    background('cyan')
  }

  // se perdeu
  if(bola.position.y > height){
    background('red')
    /*
    if(mouseIsPressed){
      location.reload()
    }
    */
    setTimeout(function() {
      //location.reload()
    },
    1000)
  }
  //ganhou
  if(blocos.length == 0){
    background('blue')
    bola.remove()
  }
  
  plataforma.position.x = constrain(mouseX, 50, width - 50)
  bola.bounce(paredes)
  bola.bounce(plataforma, function(){
    // estah vindo da direita
    if(bola.velocity.x > 0) {
      if(bola.position.x < plataforma.position.x){
        bola.velocity.x *= -1
      }
    }
    // estah vindo da esquerda
    else {
      if(bola.position.x > plataforma.position.x){
        bola.velocity.x *= -1
      }
    }
  })
  // bola bateu num bloco
  bola.bounce(blocos, function(pBola, pBloco){
    pBloco.remove()
    bola.velocity.mult(1.02)
  })
  drawSprites()
}

/*
andre
andrew
daniel
*/








