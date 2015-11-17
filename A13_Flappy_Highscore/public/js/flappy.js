var passaro = {},
    gravidade = {},
    velocidadeX = 4,
    alturaPassagem = 200,
    canos = {},
    fimdejogo = false

function setup() {
  // Criação do canvas
  createCanvas(640, 480)
  background(color("#a0dadd"))
  gravidade = createVector(0, 0.5, 0)
  // Definição do pássaro
  passaro = createSprite(50, height/2, 30, 30)
  passaro.shapeColor = color("#e29858")
  passaro.velocity.x = velocidadeX
  // Inicializa o grupo de canos e cria um timer para criar novos a cada 2000ms
  canos = new Group()
  setInterval(criarCanos, 1400)
}

function draw() {
  passaro.velocity.x = velocidadeX + (passaro.position.x / 2000)
  
  if(fimdejogo){
    background(color("red"))
    if(mouseWentDown(LEFT)){
      fimdejogo = false
      location.reload()
    }
    return
  }
  
  // Quando o mouse accabou de entrar no clique
  if(mouseWentDown(LEFT)) {
    passaro.velocity.y = -10
  }
  // Aplicar aceleração da gravidade
  passaro.velocity.add(gravidade)
  // Checar se saiu da tela por cima ou por baixo
  if(passaro.position.y > height ||
     passaro.position.y < 0){
    TerminouJogo()  
  }
  // Fazer câmera seguir o pássaro
  camera.position.x = passaro.position.x
  // Trata a colisão dos canos e do pássaro
  canos.collide(passaro, function() {
    background(color("red"))
    TerminouJogo()
  })
  // Limpar tela e desenhar sprites
  background(color("#a0dadd"))
  drawSprites()
}

function TerminouJogo() {
  $.post("score/" + floor(passaro.position.x), function(data, status, req){
    console.log(data)
  })
  removeSprite(passaro)
  fimdejogo = true
}

function criarCanos() {
  var canoTopo,
      canoBaixo,
      posicaoX = passaro.position.x + 400,
      posicaoY = height/2 + random(-200, 200)
  canoTopo = createSprite(posicaoX, 
    posicaoY - alturaPassagem/2 - 250, 40, 500)
  canoTopo.shapeColor = color("#00aa00")
  canoBaixo = createSprite(posicaoX, 
    posicaoY + alturaPassagem/2 + 250, 40, 500)
  canoBaixo.shapeColor = color("#00aa00")
  canos.add(canoTopo)
  canos.add(canoBaixo)
}










