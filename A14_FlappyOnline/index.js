var express = require("express")
var app = express()
var servidor = require("http").createServer(app)
var jsonfile = require("jsonfile")
var port = process.env.PORT || 3000

// vai ler e escrever num arquivo
var score = {}

// quando o servidor iniciar, le o score do arquivo
jsonfile.readFile("dados/score.json", function(erro, dados){
  if(erro) {
    throw erro
  } 
  score = dados
  console.log("score inicial: " + score.pts + " por " + score.nome)
})

app.use(express.static("public"))

app.get("/score", function(req, res){
  res.send(score)
})

app.post("/score/:pts/:nome", function(req, res){
  if(req.params.pts > Number(score.pts)){
    score.pts = req.params.pts
    score.nome = req.params.nome
    salvarScore()
  }
  res.send(score)
})

function salvarScore() {
  jsonfile.writeFile("dados/score.json", score, function(erro){
    if(erro) {
      throw erro
    }
    else {
      console.log("novo highscore salvo: " + score.pts)   
    }
  })
}

servidor.listen(port, function(){
  console.log("servidor rodando")
})