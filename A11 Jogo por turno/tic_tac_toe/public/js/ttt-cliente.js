// cria conexao com servidor
var socket = io()

var game = new Phaser.Game(
  280, 350, Phaser.AUTO, "jogo",
  { 
    preload : preload, 
    create : create,
    update : update
  })

var btnCriar, 
    btnEntrar,
    gMenuInicial,
    gCasas
    casas = [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    jogador = 0,
    vez = 0,
    msg = {}

function preload() {
  game.load.image("btn_criar", "/assets/btn_criar.jpg")
  game.load.image("btn_entrar", "/assets/btn_entrar.jpg")
  game.load.spritesheet("casas", "/assets/casas.jpg", 80, 80)
}

function create() {
  msg = game.add.text(5, 300, "asdas", {font: "bold 30px Arial", fill : "#f00"})
  //socket.emit("start-game")
  
  // MENU INICIAL
  gMenuInicial = new Phaser.Group(game)
  btnCriar = game.add.button(game.world.centerX - 100, game.world.centerY - 70, 'btn_criar', criarPartida)
  btnEntrar = game.add.button(game.world.centerX - 100, game.world.centerY + 10, 'btn_entrar', entrarPartida)
  gMenuInicial.add(btnCriar)
  gMenuInicial.add(btnEntrar)
  
  // CASAS
  gCasas = new Phaser.Group(game)
  for(var row = 0; row < 3; row++){
    for(var col = 0; col < 3; col++){
      casas[col][row] = 0
      var spriteCasa = game.add.sprite(10 + col * 90, 10 + row * 90, "casas", 0)
      spriteCasa.col = col
      spriteCasa.row = row
      spriteCasa.inputEnabled = true
      spriteCasa.input.useHandCursor = true
      spriteCasa.events.onInputDown.add(cliqueCasa, spriteCasa)
      gCasas.add(spriteCasa)
    }
  }
  gCasas.visible = false
  gCasas.setAll("inputEnabled", false)
  gCasas.setAll("input.useHandCursor", false)
}

function criarPartida() {
  socket.emit("nova-partida")
  gMenuInicial.visible = false
  gCasas.visible = true
}

function entrarPartida() {
  console.log("entrarPartida")
  gMenuInicial.visible = false
  gCasas.visible = true
  socket.emit("procurar-partida")
}

function cliqueCasa() {
  console.log("clique")
  if(casas[this.col][this.row] == 0) {
    socket.emit("clique", {
      col : this.col,
      row : this.row
    })
  }
}

function update() {
}

function atualizarTabuleiro() {
  gCasas.forEach(function(casa){
    console.log(casas[casa.col][casa.row])
    console.log(casa)
    casa.frame  = casas[casa.col][casa.row]
  }, this)
}

socket.on("partida-criada", function(nomePartida){
  msg.text = "Aguardando oponente"
  gCasas.setAll("inputEnabled", false)
  gCasas.setAll("input.useHandCursor", false)
  jogador = 1
})

socket.on("comecar-partida", function(){
  jogador = (jogador == 1)? 1 : 2
  vez = 1
  if(vez == jogador){
    gCasas.setAll("inputEnabled", true)
    gCasas.setAll("input.useHandCursor", true)
  }
})

socket.on("avancar-turno", function(data){
  console.log(data)
  vez = data.vez
  casas = data.tabuleiro
  atualizarTabuleiro()
  if(vez == jogador){
    gCasas.setAll("inputEnabled", true)
    gCasas.setAll("input.useHandCursor", true)
    msg.text = "sua vez"
  }
  else {
    gCasas.setAll("inputEnabled", false)
    gCasas.setAll("input.useHandCursor", false)
    msg.text = "aguarde"
  }
})

socket.on("gameover", function(data){
  casas = data.tabuleiro
  atualizarTabuleiro()
  gCasas.setAll("inputEnabled", false)
  gCasas.setAll("input.useHandCursor", false)
  msg.text = "jogador " + data.vencedor + " ganhou!"
  // delay
  setTimeout(function(){
    gCasas.visible = false
    gMenuInicial = true
  }, 5000)
  
})














