// configuracao de bibliotecas
var express = require("express") 
var app = express()
var server = require("http").createServer(app)
var io = require("socket.io")(server)

// enviar arquivos estaticos da pasta "public"
app.use(express.static('public'))

// variaveis da logica do jogo
var jogadores = {},
    numJogadores = 0,
    maxJogadores = 3,
    objetos = {}

// quando um jogador se conecta
io.on("connection", function(socket){
  console.log("conectado: " + socket.id)
  if(numJogadores < maxJogadores) {
    numJogadores++
    jogadores[socket.id] = {}
  }
  // quando recebe um update, guarda na lista de jogadores
  socket.on("updateJogador", function(data){
    jogadores[socket.id] = data
  })
  
  // a cada X tempo, encaminha infos para todos os conectados
  setInterval(function(){
    io.emit("novasInfos", jogadores)
  }, 50)
  
  // quando um jogador se desconecta
  socket.on("disconnect", function(){
    numJogadores--
    console.log("desconectado: " + socket.id)
    // avisa todo mundo que esse jogador deve ser destruido localmente
    io.emit("destruirJogador", socket.id)
    // remove da lista do servidor
    delete jogadores[socket.id]
  })
})

//ativa o servidor
server.listen(3000, function(){
  console.log("servidor rodando em localhost:3000")
})
