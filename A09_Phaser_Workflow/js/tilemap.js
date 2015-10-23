var game  = new Phaser.Game(640, 480, Phaser.AUTO, "jogo", {preload : preload, create: create, update: update, render: render})

var mapa, layerChao, bola, num

function preload() {
  game.load.tilemap("mapa_json", "assets/mapa_JSON.json", null, Phaser.Tilemap.TILED_JSON)
  game.load.image("tiles", "assets/tiles.png")
  
  game.load.image("circulo", "assets/circulo.png")
}

function create() {
  num = new Number(localStorage.getItem("contador"))
  if(num == 0) {
    num = 1
  }
  num++
  localStorage.setItem("contador", num + "")
  
  
  game.physics.startSystem(Phaser.Physics.P2JS)
  game.physics.p2.restitution = 0.1;
  game.physics.p2.gravity.y = 400;
  
  mapa = game.add.tilemap("mapa_json")
  mapa.addTilesetImage("tiles", "tiles")
  mapa.createLayer("fundo")
  layerChao = mapa.createLayer("chao")
  mapa.createLayer("detalhes")
  mapa.setCollisionBetween(0, 99, true, layerChao)
  game.physics.p2.convertTilemap(mapa, layerChao);
  
  bola = game.add.sprite(80, 50, "circulo")
  game.physics.p2.enable(bola)
  bola.body.setCircle(50)
  bola.body.debug = false
}

function update(){

}

function render(){
}