var game = new Phaser.Game(400, 300, Phaser.AUTO, "jogo", {preload: preload, create: create, update: update})

var bola,
    setas,
    direita,
    historico = []

function preload() {
  // console.log("preload")
  game.load.image("circulo", "assets/circulo.png")
}

function create() {
  // console.log("create")
  bola = game.add.sprite(50, 50, "circulo")
  setas = game.input.keyboard.createCursorKeys()
  //setas.right.onHoldCallback = mover
  setas.right.onDown.add(cmdMover, this, 0, bola, 15)
  setas.left.onDown.add(cmdMover, this, 0, bola, -15)
  setas.up.onDown.add(replay, this, 0, 0)
}

function update() {
  // console.log("update")
  /* if dentro do update
  if(setas.right.isDown){
    bola.position.x += 10
  }
  */
}

function mover(contexto, deslocamento){
  bola.position.x += deslocamento
}

function replay(cont, i) {
  console.log(i);
  if(i == historico.length){
    return;
  }
  if(i == 0){
    bola.position.x = 50
  }
  bola.position.x += historico[i].delta
  setTimeout(function() {
    replay(this, i+1)
  }, 500)
}

function cmdMover(contexto, sprite, deslocamento) {
  sprite.position.x += deslocamento
  historico.push({
    obj: sprite,
    delta: deslocamento
  })
}












