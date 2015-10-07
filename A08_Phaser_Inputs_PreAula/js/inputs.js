var game = new Phaser.Game(400, 300, Phaser.AUTO, "jogo", {preload: preload, create: create, update: update, render: render})

var agente

function preload() {
  game.load.image("quadrado", "assets/quadrado.png")
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)
  agente = game.add.sprite(120, 120, "quadrado")
  agente.anchor.set(0.5, 0.5)
  game.physics.enable(agente, Phaser.Physics.ARCADE)
  agente.inputEnabled = true
  agente.input.enableDrag()
}

function update() {
  var ponteiro = game.input.activePointer
  //agente.position.x = ponteiro.worldX
  //agente.position.y = ponteiro.worldY
  /*
  if(ponteiro.isDown){
    console.log("clicando : " + ponteiro.duration)
    game.physics.arcade.accelerateToPointer(agente, ponteiro, 50, 100)
  }
  */
}

function render() {
  game.debug.inputInfo(32, 32)
  game.debug.pointer(game.input.activePointer)
  game.debug.body(agente)
}







