// server preparado
var express = require("express") 
var app = express()
var server = require("http").createServer(app)
var io = require("socket.io")(server)

var partidas = {}

app.use(express.static('public'))

// QUALQUER JOGADOR
io.on("connection", function(socket){
  console.log("usuario conectado: " + socket.id)
  
  // JOGADOR QUE CRIOU A PARTIDA
  socket.on("nova-partida", function() {
    var nova = new Partida(socket.id)
    console.log(nova)
    partidas[nova.nome] = nova
    socket.room = nova.nome
    socket.join(socket.room)
    socket.emit("partida-criada", nova.nome)
  })
  
  // JOGADOR QUE ESTÁ ENTRANDO NA PARTIDA
  socket.on("procurar-partida", function() {
    for(var id in partidas){
      if(partidas[id].jogadores.length == 1){
        partidas[id].jogadores.push(socket.id)
        socket.room = id
        socket.join(id)
        partidas[id].jogadorAtual = 1
        io.to(id).emit("comecar-partida")
      }
    }
  })
  
  // QUALQUER JOGADOR
  socket.on("clique", function(casa){
    console.log("clique " + casa.col + ":" + casa.row)
    partidas[socket.room].tabuleiro[casa.col][casa.row] =
      partidas[socket.room].jogadorAtual
    if(checarFimDeJogo(partidas[socket.room].tabuleiro)){
      console.log("gameover")
      var sala = socket.room
      io.to(socket.room).emit("gameover", { 
        vencedor : partidas[socket.room].jogadorAtual,
        tabuleiro : partidas[socket.room].tabuleiro
      })
      io.to(socket.room).leave(socket.room)
      partidas[sala] = null
      delete partidas[sala]
    }
    else {
      var acabouDeJogar = partidas[socket.room].jogadorAtual
      partidas[socket.room].jogadorAtual = (acabouDeJogar == 1)? 2 : 1
      io.to(socket.room).emit("avancar-turno", { 
        tabuleiro : partidas[socket.room].tabuleiro,
        vez : partidas[socket.room].jogadorAtual 
      })
    } 
  })
  
  // QUALQUER JOGADOR
  socket.on("disconnect", function(){
    console.log("usuario desconectado: " + socket.id)
  })
})

server.listen(3000, function(){
  console.log("servidor rodando em localhost:3000")
})

function Partida(jogador1) {
  this.jogadorAtual = 0
  this.tabuleiro = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  this.jogadores = [ jogador1 ]
  this.nome = "P:" + jogador1
}

function checarFimDeJogo(tabuleiro) {
  if(
((tabuleiro[0][0] == tabuleiro[0][1] == tabuleiro[0][2]) && tabuleiro[0][2] > 0) ||
((tabuleiro[1][0] == tabuleiro[1][1] == tabuleiro[1][2]) && tabuleiro[1][2] > 0) ||
((tabuleiro[2][0] == tabuleiro[2][1] == tabuleiro[2][2]) && tabuleiro[2][2] > 0) ||
    
((tabuleiro[0][0] == tabuleiro[1][0] == tabuleiro[2][0]) && tabuleiro[2][0] > 0) ||
((tabuleiro[0][1] == tabuleiro[1][1] == tabuleiro[2][1]) && tabuleiro[2][1] > 0) ||
((tabuleiro[0][2] == tabuleiro[1][2] == tabuleiro[2][2]) && tabuleiro[2][2] > 0) ||
    
((tabuleiro[0][0] == tabuleiro[1][1] == tabuleiro[2][2]) && tabuleiro[1][1] > 0) ||
((tabuleiro[2][0] == tabuleiro[1][1] == tabuleiro[0][2]) && tabuleiro[1][1] > 0)) {
    return true
  }
  return false
}








