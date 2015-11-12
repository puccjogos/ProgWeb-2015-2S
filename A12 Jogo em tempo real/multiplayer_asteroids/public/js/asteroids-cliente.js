var socket = io()

var game = new Phaser.Game(
  500, 500, "jogo", Phaser.AUTO, 
{
  preload : preload,
  create : create,
  update : update
})

var naveJogador,
    setas,
    intervaloUpdate = 50,
    timerUpdate = 0,
    outros = {},
    prontoParaUpdate = false // variavel usada para nao ler updates do server durante preload

function preload() {
  // carregando imagens
  game.load.image("nave", "assets/nave.png")
  game.load.image("asteroide", "assets/asteroide.png")
  game.load.image("bala", "assets/bala.png")
  game.stage.disableVisibilityChange = true
}

function create() {
  // ativar sistema de fisica
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  // configuracao da nave do jogador
  naveJogador = game.add.sprite(250, 250, "nave")
  naveJogador.tint = 0xff0000
  naveJogador.anchor.set(0.5)
  game.physics.enable(naveJogador, Phaser.Physics.ARCADE)
  naveJogador.body.drag.set(50)
  naveJogador.body.angularDrag = 1000
  naveJogador.body.maxVelocity.set(200)

  //  Game input
  setas = game.input.keyboard.createCursorKeys();
  //game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
  prontoParaUpdate = true
}

function update() {
  // movimento do jogador
  if (setas.up.isDown) {
    game.physics.arcade.accelerationFromRotation(
      naveJogador.rotation, 200, naveJogador.body.acceleration)
  }
  else {
    naveJogador.body.acceleration.set(0)
  }
  if (setas.left.isDown) {
    naveJogador.body.angularVelocity = -300
  }
  else if (setas.right.isDown) {
    naveJogador.body.angularVelocity = 300
  }
  // faz o teletransporte da nave
  screenWrap(naveJogador)
  
  // envia as infos desta nave para o servidor a cada X tempo
  timerUpdate -= game.time.physicsElapsedMS
  if(timerUpdate <= 0){
    socket.emit("updateJogador", {
      pos_x   : naveJogador.position.x,
      pos_y   : naveJogador.position.y,
      vel_x   : naveJogador.body.velocity.x,
      vel_y   : naveJogador.body.velocity.y,
      rot     : naveJogador.angle,
      angVel  : naveJogador.body.angularVelocity
    })
    timerUpdate = intervaloUpdate
  }
  
  // percorro todas as outras naves e uso os dados do servidor 
  // para alterar velocidades
  /*
  for(var id in outros){
    outros[id].body.velocity.set(
      outros[id].dados.vel_x, outros[id].dados.vel_y)
    outros[id].body.angularVelocity = outros[id].dados.angVel
  }
  */
}

function screenWrap (sprite) {
  if (sprite.x < 0) {
    sprite.x = game.width
  }
  else if (sprite.x > game.width) {
    sprite.x = 0
  }
  if (sprite.y < 0) {
    sprite.y = game.height
  }
  else if (sprite.y > game.height) {
    sprite.y = 0
  }
}

function criarOutro(id, dados) {
  console.log("jogador criado")
  outros[id] = {}
  outros[id] = game.add.sprite(dados.pos_x, dados.pos_y, "nave")
  outros[id].tint = 0x0000ff
  outros[id].anchor.set(0.5)
  game.physics.enable(outros[id], Phaser.Physics.ARCADE)
  outros[id].body.drag.set(50)
  outros[id].body.angularDrag = 1000
  outros[id].body.maxVelocity.set(200)
  outros[id].antes = game.time.now
  updateOutro(id, dados)
}

function updateOutro(id, dados) {
  outros[id].dados = dados
  /*
  outros[id].position.set(dados.pos_x, dados.pos_y)
  outros[id].angle = dados.rot
  */
  var duracao = game.time.now - outros[id].antes
  console.log(duracao)
  if(duracao <= 0) {
    return
  }
  game.add.tween(outros[id]).to(
    { 
      x : dados.pos_x + dados.vel_x * game.time.physicsElapsed, 
      y : dados.pos_y + dados.vel_y * game.time.physicsElapsed,
      angle : dados.rot + dados.angVel * game.time.physicsElapsed
    }, duracao, "Linear", true)
  outros[id].antes = game.time.now
}

socket.on("novasInfos", function(jogadores){
  // ignora infos antes da hora
  if(!prontoParaUpdate){
    return
  }
  for(var id in jogadores){
    // soh usa os dados do servidor para as outras naves
    if(id != socket.id){
      // se ainda nao existe uma nave com esse id, cria uma
      if(!outros.hasOwnProperty(id)){
        console.log("criar outro " + id)
        criarOutro(id, jogadores[id])
      }
      else {
        // apenas atualiza infos
        updateOutro(id, jogadores[id])
      }
    }
  }
})

// por enquanto só eh destruido quando desconecta
socket.on("destruirJogador", function(id){
  console.log("jogador destruido")
  // remove o sprite e a fisica
  outros[id].body = null
  outros[id].destroy()
  //remove da lista de outras naves
  delete outros[id]
})








