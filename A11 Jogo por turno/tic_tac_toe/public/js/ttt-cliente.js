var socket = io()

var game = new Phaser.Game(
  280, 280, Phaser.AUTO, "jogo",
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
    jogador = 1

function preload() {
  game.load.image("btn_criar", "/assets/btn_criar.jpg")
  game.load.image("btn_entrar", "/assets/btn_entrar.jpg")
  game.load.spritesheet("casas", "/assets/casas.jpg", 80, 80)
}

function create() {
  //var txt = game.add.text(5, 410, "Seu turno", {font: "bold 30px Arial", fill : "#f00"})
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
      spriteCasa.valor = 0
      spriteCasa.inputEnabled = true
      spriteCasa.input.useHandCursor = true
      spriteCasa.events.onInputDown.add(cliqueCasa, spriteCasa)
      gCasas.add(spriteCasa)
      console.log(spriteCasa)
    }
  }
  gCasas.visible = false
  gCasas.setAll("inputEnabled", false)
  gCasas.setAll("input.useHandCursor", false)
}

function criarPartida() {
  gMenuInicial.visible = false
  gCasas.visible = true
  gCasas.setAll("inputEnabled", true)
  gCasas.setAll("input.useHandCursor", true)
}

function entrarPartida() {
  console.log("entrarPartida")
}

function cliqueCasa() {
  if(this.valor == 0) {
    this.valor = jogador
    this.frame = this.valor
    checarFimDeJogo() //vai pro servidor
    jogador = (jogador == 1)? 2 : 1
  }
}

function update() {
  
}