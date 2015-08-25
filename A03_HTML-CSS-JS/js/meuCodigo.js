/*
var minhaVariavel,
    minhaVariavel2,
    minhaVariavel3
*/

/*
var meuNumero = 13
console.log( typeof(meuNumero) )
meuNumero = "um numero"
console.log( typeof(meuNumero) )
*/

/*
var minhaVar = [1, 2, 3]
console.log(typeof(minhaVar))
console.log(minhaVar[0])

minhaVar = {}
minhaVar.nome = "bob"
minhaVar["peso"] = 12
console.log(minhaVar.peso)

minhaVar = {
  "nome" : "bob",
  "peso" : 12
}
*/

var nroAtual = 0
/*
while (nroAtual < 100){
  console.log(nroAtual * 7)
  nroAtual += 1
}
*/
/*
for(nroAtual = 0; nroAtual < 100; nroAtual += 1) {
  console.log(nroAtual * 7)
}
*/

var vetor = ["A", "B", "C", "D"]
for(var posicao in vetor){
  console.log(vetor[posicao])
}

var gato = {
  "nome" : "bichano",
  "peso" : 2,
  "cor" : "branco"
}
for(var propriedade in gato) {
  
  if(propriedade == "nome"){
    console.log("o meu gato se chama " + gato.nome)
  }
  else if(propriedade == "peso") {
    console.log("o gato pesa " + gato.peso + "kg.")
  }
  else {
    console.log(gato[propriedade])
  }
}

function Miar (potencia) {
  switch(potencia){
    case "baixo" : 
      Exibir("miau")
      break
    case "alto" :
      Exibir("MIAU")
      break
    default :
      Exibir("miado invalido")
      break
  }
}

gato.miar = Miar
gato.miar("baixo")
//gato.miar = null
//gato.miar("alto")

gato.morrer = function () {
  console.log(gato.nome + " morreu.")
  gato = null
}

gato.morrer()

function Exibir (msg) {
  //console.log(msg)
  document.getElementById("manchete").innerHTML = msg
}

function ProcessarDados(quandoTerminar) {
  // processamento imaginario
  for(var i = 0; i < 500000; i += 1){
    Exibir(i)
  }
  quandoTerminar()
}

//ProcessarDados(Exibir)
ProcessarDados(Miar)
//Exibir("Olá mundo!")






  
  
  
  
  
  
  
  
  