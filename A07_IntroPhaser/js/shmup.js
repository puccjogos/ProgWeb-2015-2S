var game = new Phaser.Game(640, 480, Phaser.AUTO, "jogo")

var jogador,
    teclaEsquerda

var estadoShmup = function(game){}
estadoShmup.prototype = {
  preload : function() {
    console.log("rodou preload")
    game.load.image("player", "assets/player.png")
  },
  
  create : function() {
    console.log("rodou create")
    game.stage.backgroundColor = "#7773d4"
    jogador = this.add.sprite(0, 0, "player")
    teclaEsquerda = game.input.keyboard.addKey(Phaser.Keyboard.E)
  },
  
  update : function() {
    console.log("rodou update")
    // game.stage.backgroundColor = Phaser.Color.getRandomColor(1, 255)
    jogador.x += 0.1
    if(teclaEsquerda.isDown){
      jogador.x -= 0.2
    }
  }
}

game.state.add("shmup", estadoShmup)
game.state.start("shmup")












