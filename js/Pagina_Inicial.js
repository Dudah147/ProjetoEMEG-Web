var banner = document.getElementById("banner")
var i = 1
var loop
var verifica = 0

var imagens = []
imagens.push("img/banner.jpg")
imagens.push("img/banner2.jpg")
imagens.push("img/banner3.jpg")

var texto_valor_carrinho = document.getElementById("quantidade_carrinho")
var valor_carrinho = JSON.parse(localStorage.getItem("carrinho_quantidade"))
texto_valor_carrinho.textContent = valor_carrinho

var logado = document.getElementById("login")
var clientes = localStorage.getItem("clientes")
if(clientes){
    clientes = JSON.parse(clientes)
    for(let i = 0; i<clientes.length; i++){
        if(clientes[i].login == true){
            logado.textContent = "Logado"
        }
    }
}

var numerobanner = document.querySelectorAll(".numbanner")

if(verifica == 0){
    carrossel()
    verifica = 1
}

for(el of  numerobanner){
    el.addEventListener("click", selecaobanner)
}

function selecaobanner(){
    clearInterval(loop)
    banner.src = imagens[this.textContent-1]
    i = this.textContent

    setTimeout(carrossel, 2000)

    for(el of  numerobanner){
        el.style.backgroundColor = "rgb(189, 188, 188)"
    }
    this.style.backgroundColor = "black"

}   

function mudaimg() {
    if(i == 3){
        i = 0
    }
    banner.src = imagens[i]


    let select = document.getElementById(`banner${i}`)
    for(el of  numerobanner){
        el.style.backgroundColor = "rgb(189, 188, 188)"
    }
    select.style.backgroundColor = "black"

    i++
    if (i == 3) {
        i = 0
    }
}


function carrossel(){
    clearInterval(loop)
    loop = setInterval(mudaimg, 3000)
}


var teste = document.querySelectorAll("")