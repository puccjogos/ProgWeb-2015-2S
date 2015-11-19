var passaro = {},
    gravidade = {},
    velocidadeX = 4,
    alturaPassagem = 200,
    canos = {},
    fimdejogo = false,
    telaAtual = 1,
    primeiroFrame = true,
    timerCanos = {},
    fonte = {},
    recorde = {},
    pontos = 0,
    nome = "alguém"

// funcao que checa como está o login,
// se conectado, puxa o nome do jogador
function receberEstadoLogin() {
  FB.getLoginStatus(function(resposta) {
    console.log(resposta)
    if(resposta.status == "connected") {
      FB.api("/me", function (data){
        nome = data.name
      })
    }
    else {
      nome = "alguém"
    }
  })
}

function setup() {
  // inicializa a SDK do FB
  FB.init({
    appId      : '1645525769036317', // criada no dev/FB
    cookie     : true,  // cookies para sessão
    xfbml      : true,  // plugins sociais
    version    : 'v2.5' // usar versão 2.5
  })
  
  // Criação do canvas
  var cnv = createCanvas(640, 480)
  cnv.parent("jogo")
  fonte = loadFont("assets/Montserrat-UltraLight.otf")
  textFont(fonte)
  // puxa estado do login do jogador
  receberEstadoLogin()
}



function draw() {
  
  switch(telaAtual){
    // inicio
    case 1:
      background(color("#fddd29"))
      if(primeiroFrame){
        primeiroFrame = false
        fill(0)
        textFont(fonte)
        camera.position.x = 0
        httpGet("score", null, "json", function(data) {
          recorde = data
          console.log("recorde " + recorde.pts + 
                      " por " + recorde.nome)
        })
      }
      drawSprites()
      fill(0, 0, 0)
      textSize(24)
      if(nome == "") {
          text("Logue no FB abaixo para salvar seus recordes.",
               -240, 410)
      }
      else {
          text(nome + ", sua vez!", -240, 410)
      }
      textSize(72)
      text("Flappy Treco", -244, 200)
      textSize(36)
      var nomeDisplay = recorde.nome || "alguém"
      text("recorde atual é "+ recorde.pts + 
           ",\nde " + nomeDisplay, -240, 300)
      if(mouseWentDown(LEFT)){
        telaAtual = 2
        primeiroFrame = true
      }
    break
    // gameplay
    case 2:
      // Limpar tela e desenhar sprites
    // "#fd0044"
      background(color("#7bd7e8"))
      if(primeiroFrame){
        primeiroFrame =  false
        gravidade = createVector(0, 0.5, 0)
        // Definição do pássaro
        passaro = createSprite(50, height/2, 30, 30)
        passaro.shapeColor = color("#fd0044")
        passaro.velocity.x = velocidadeX
        // Inicializa o grupo de canos e 
        // cria um timer para criar novos a cada X tempo
        canos = new Group()
        timerCanos = setTimeout(criarCanos, 1400)
      }
      pontos = Math.floor(passaro.position.x)
      fill(0, 0, 0)
      textSize(64)
      text(pontos+"", passaro.position.x - 300, 65)
      passaro.velocity.x = velocidadeX +
        (passaro.position.x / 2000)
      // Quando o mouse acabou de entrar no clique
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
      drawSprites()
    break
    // gameover
    case 3:
      if(primeiroFrame){
        primeiroFrame = false
        // setup gameover
        clearTimeout(timerCanos)
        timerCanos = {}
        for (var i = canos.length; i--; canos[i].remove())
        httpPost("score/" + pontos + "/" + nome, null, "json", 
          function(data){
            recorde.pts = data.pts
          })
      }
      // resetar camera
      camera.position.x = 0
      // se é o novo recordista
      if(recorde.pts == pontos) {
        background(color("#36f5ac"))
        fill(0, 0, 0)
        textSize(72)
        text("Game over", -244, 200)
        textSize(36)
        text("novo recorde!\n"+recorde.pts+"\nparabéns, " + 
          nome + "!", -240, 300)
      }
      // fim normal
      else {
        background(color("#fd0044"))
        fill(0, 0, 0)
        textSize(72)
        text("Game over", -244, 200)
        textSize(36)
        text("tente outra vez!\n\nsua pontuação: " + pontos + 
          "\nrecorde atual: " + recorde.pts, -240, 270)
      }
      if(mouseWentDown(LEFT)){
        telaAtual = 1
        primeiroFrame = true
      }
      drawSprites()
    break
  }
  
}

function TerminouJogo() {
  removeSprite(passaro)
  telaAtual = 3
  primeiroFrame = true
}

function criarCanos() {
  var canoTopo,
      canoBaixo,
      posicaoX = passaro.position.x + 400,
      posicaoY = height/2 + random(-120, 120)
  canoTopo = createSprite(posicaoX, 
    posicaoY - alturaPassagem/2 - 250, 40, 500)
  canoTopo.shapeColor = color("#000")
  canoBaixo = createSprite(posicaoX, 
    posicaoY + alturaPassagem/2 + 250, 40, 500)
  canoBaixo.shapeColor = color("#000")
  canos.add(canoTopo)
  canos.add(canoBaixo)
  // define o intervalo para o proximo cano
  timerCanos = setTimeout(criarCanos, 1400 - passaro.velocity.x * 80)
}
