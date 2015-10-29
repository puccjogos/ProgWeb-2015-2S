// server preparado
var express = require("express") 
var app = express()
var server = require("http").createServer(app)
var io = require("socket.io")(server)

var rooms = {}

app.use(express.static('public'))

io.on("connection", function(socket){
  console.log("usuario conectado: " + socket.id)
  
  //console.log(Object.keys(io.nsps["/"].adapter.rooms[socket.room]).length)
  /*console.log(socket.room + " has " + clients_in_the_room + " clients")
  if(clients_in_the_room < 2){
    socket.join(socket.room)
    console.log("connected to " + socket.room)
  }
  */
  
  socket.on("disconnect", function(){
    console.log("usuario desconectado: " + socket.id)
  })
})

server.listen(3000, function(){
  console.log("servidor rodando em localhost:3000")
})