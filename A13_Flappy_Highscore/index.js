var express = require("express")
var app = express()
var servidor = require("http").createServer(app)
var jsonfile = require("jsonfile")

// vai ler e escrever num arquivo
var score

// quando o servidor iniciar, le o score do arquivo
jsonfile.readFile("dados/score.json", function(erro, dados){
  if(erro) throw erro
  score = dados
  console.log("score inicial: " + score.pts)
})

app.use(express.static("public"))

app.post("/score/:pts", function(req, res){
  if(req.params.pts > Number(score.pts)){
    score.pts = req.params.pts
    salvarScore()
    res.send("Novo highscore!")
  }
  else {
    res.send("Tente outra vez.")
  }
})

function salvarScore() {
  jsonfile.writeFile("dados/score.json", score, function(erro){
    if(erro) {
      throw erro
    }
    else {
      console.log("novo highscore salvo: " + score)   
    }
  })
}

servidor.listen(3000, function(){
  console.log("servidor rodando")
})