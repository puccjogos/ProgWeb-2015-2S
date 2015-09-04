var raquete = {},
    bola = {},
    paredeDireita,
    paredeTopo,
    paredeEsquerda,
    paredes,
    blocos,
    velocidadeMaxima = 3,
    INCREMENTO_VELOCIDADE = 0.1

function setup() {
  createCanvas(800, 450)
  noCursor()
  
  // definicao da raquete
  raquete.sprite = createSprite(width/2, height - 30, 80, 20)
  raquete.sprite.immovable = true
  raquete.sprite.shapeColor = color('white')
  // definicao da bola
  bola.sprite = createSprite(width/2, height/2 + 30, 10, 10)
  bola.sprite.shapeColor = color('white')
  bola.sprite.setVelocity(2, 2)
  // bola.sprite.restitution = 1.01
  // paredes: imoveis, invisiveis
  paredes = new Group()
  paredeTopo = createSprite(width/2, -20, width, 50)
  paredeTopo.immovable = true
  paredeEsquerda = createSprite(-20, height/2, 50, height)
  paredeEsquerda.immovable = true
  paredeDireita = createSprite(width+20, height/2, 50, height)
  paredeDireita.immovable = true
  paredeTopo.shapeColor = 
    paredeDireita.shapeColor = 
    paredeEsquerda.shapeColor = 
    color('red')
  // adicionando todos os sprites a um grupo
  paredes.add(paredeTopo)
  paredes.add(paredeEsquerda)
  paredes.add(paredeDireita)
  bola.grande = false
  // definicao e posicionamento dos blocos
  blocos = new Group()
  for(var linha = 1;  linha < 7; linha++) {
    for(var coluna = 1; coluna < 12; coluna++) {
      var novoBloco = createSprite(40 + coluna * 60, linha * 40, 40, 20)
      var corNova = color(100 + random(100), 100 + random(100), 100 + random(100))
      novoBloco.immovable = true
      novoBloco.shapeColor = corNova
      blocos.add(novoBloco)
    }
  }
}

function draw() {
  background(0)
  // limita posicao X da raquete
  raquete.sprite.position.x = constrain(mouseX, 50, 750)
  // trata colisoes da bola com raquete
  bola.sprite.bounce(raquete.sprite, function() {
    // rebate em duas direcoes diferentes
    if(bola.sprite.velocity.x > 0 && 
       raquete.sprite.position.x > bola.sprite.position.x){
      bola.sprite.velocity.x *= -1
    }
    else {
      if(bola.sprite.velocity.x < 0 && 
       raquete.sprite.position.x < bola.sprite.position.x){
        bola.sprite.velocity.x *= -1
      }
    }
    raquete.sprite.scale = 1.5
    setTimeout(function(){
      raquete.sprite.scale = 1
    }, 50)
  })
  // trata colisoes com blocos, aumentando a velocidade permitida
  bola.sprite.bounce(blocos, function(pBola, pBloco) {
    pBloco.remove()
    velocidadeMaxima += INCREMENTO_VELOCIDADE
    bola.sprite.velocity.mult(velocidadeMaxima)
    bola.sprite.limitSpeed(velocidadeMaxima)
  })
  // trata as colisoes da bola com as paredes
  bola.sprite.bounce(paredes, function() {
    if(!bola.grande){
      bola.grande = true
      bola.sprite.scale = 1.5
      setTimeout(function(){
        bola.grande = false
        bola.sprite.scale = 1
      }, 100)
    }
  })
  
  // desenha todos os sprites na tela
  drawSprites()
}

function mousePressed() {
  // recarrega a página quando a bolinha se perde
  if(bola.sprite.position.y > height && mouseIsPressed){
    location.reload()
  }
  else {
    fullscreen(true)
  }
}