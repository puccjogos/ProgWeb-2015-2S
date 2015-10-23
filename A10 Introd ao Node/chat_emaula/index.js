var app = require("express")()
var http = require("http").Server(app)
var io = require("socket.io")(http)
var nicknames = {}

app.get("/", function(req, res){
  //res.send("<h1>Olá mundo</h1>")
  res.sendFile(__dirname + "/index.html")
})

io.on("connection", function(socket){
  console.log("usuario conectado: " + socket.id)
  nicknames[socket.id] = "guest" + Math.random()*200000
  socket.on("disconnect", function() {
    console.log("usuario " + socket.id +  " desconectado")
  })
  // quando trocar de nome
  socket.on("trocar-nome", function(novoNome){
    var nomeAntigo = nicknames[socket.id]
    nicknames[socket.id] = novoNome
    io.emit("msg-chat", nomeAntigo + " agorea se chama " + novoNome)
  })
  //recebeu msg e envia para todos os clientes
  socket.on("msg-chat", function(txt){
    console.log("msg: " + txt)
    io.emit("msg-chat", nicknames[socket.id] + " -> " + txt)
  })
})

http.listen(3000, function(){
  console.log("servidor rodando")
})