// testar jsonfile do NPM depois
var fs = require("fs")
var express = require("express")
var app = express()
var servidor = require("http").createServer(app)

app.use(express.static("public"))

var usuarios = {}
fs.readFile("data/usuarios.json", "utf8", function(err, data){
  if(err){
    throw err
  }
  usuarios = JSON.parse(data)
})

setInterval(function(){
  fs.writeFile(
    "data/usuarios.json", 
    JSON.stringify(usuarios), 
    "utf8",
    function(err) {
      if(err) {
          return console.log(err)
      }
      console.log("Usuarios.json foi salvo!")
  })
}, 10000)

app.get('/user/:id', function(req, res) {
  console.log(req.params.id)
  if(usuarios.hasOwnProperty(req.params.id)){
    res.send('Olá, ' + usuarios[req.params.id].fullname + "!")
  }
  else {
    res.status(404).send("Usuario não encontrado")
  }
})

app.post('/user/:id', function(req, res) {
  var nome = req.params.id
  if(!usuarios.hasOwnProperty(nome)){
    usuarios[nome] = {
      fullname : "nome completo"
    }
    res.send('Novo usuário: ' + nome + " -> " + usuarios[nome].fullname)
  }
  else {
    res.sendStatus(403)
  }
})

servidor.listen(3000, function(){
  console.log("servidor rodando.")
})