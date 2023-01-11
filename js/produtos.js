var i = 1
var texto_valor_carrinho = document.getElementById("quantidade_carrinho")
var valor_carrinho = JSON.parse(localStorage.getItem("carrinho_quantidade"))
texto_valor_carrinho.textContent = valor_carrinho
var index = 0


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

//ordenação
const produtos_array = []
var produtos_section = document.getElementById("produtos")
for(let i = 0; i<12; i++){
    const produtos_obj = {}   
    let produto_div = produtos_section.children[i]
    produtos_obj.img = produto_div.children[0].src
    produtos_obj.nome = produto_div.children[1].children[0].textContent
    produtos_obj.precoantigo = produto_div.children[1].children[1].children[0].textContent
    produtos_obj.preco = produto_div.children[1].children[2].textContent
    produtos_obj.descricao = produto_div.children[2].children[1].textContent
    produtos_array.push(produtos_obj)
}


var nomeasc = document.getElementById("ordem1")
nomeasc.addEventListener("click", ordemnomeasc)
nomeasc.addEventListener("mouseover", mudacorhover)
nomeasc.addEventListener("mouseout", mudacorhover2)

var nomedesc = document.getElementById("ordem2")
nomedesc.addEventListener("click", ordemnomedesc)
nomedesc.addEventListener("mouseover", mudacorhover)
nomedesc.addEventListener("mouseout", mudacorhover2)

var precoasc = document.getElementById("ordem3")
precoasc.addEventListener("click", ordemprecoasc)
precoasc.addEventListener("mouseover", mudacorhover)
precoasc.addEventListener("mouseout", mudacorhover2)

var precodesc = document.getElementById("ordem4")
precodesc.addEventListener("click", ordemprecodesc)
precodesc.addEventListener("mouseover", mudacorhover)
precodesc.addEventListener("mouseout", mudacorhover2)

var mudacor = document.querySelectorAll(".mudacor")


function mudacorhover2(){
    if(this.style.backgroundColor != "black"){
        this.style.backgroundColor = "rgb(46, 108, 35)"
    }
}

function mudacorhover(){
    if(this.style.backgroundColor != "black"){
        this.style.backgroundColor = "gray"
    }
}



function escreve(produtos_array){
    produtos_section.innerHTML = ""
    for(let i = 0; i<produtos_array.length; i++){
        
        produtos_section.innerHTML += `
            <div class="produto">
               <img src=${produtos_array[i].img} class="imgprod">
               <div class="infoprod">
                  <h3 class="nomeprod">${produtos_array[i].nome}</h3>
                  <span class="precoanterior"><del>${produtos_array[i].precoantigo}</del></span>
                  <span class="preco">${produtos_array[i].preco}</span>
                  <a class="verprod">Comprar</a>
               </div>
               <div class="modal">
                   <strong>Descricao: </strong>
                   <p>${produtos_array[i].descricao}</p>
                   <a class="ocultar">Ocultar Informações</a>
               </div>
            </div>`
    }
    
}

function ordemprecodesc(){
    produtos_array.sort(function compare(a,b){
        if (a.preco.replace(/\D/gim, '')/100 < b.preco.replace(/\D/gim, '')/100){
            return 1
        }
        if (a.preco.replace(/\D/gim, '')/100 > b.preco.replace(/\D/gim, '')/100){
            return -1
        } 
        return 0
    })
    escreve(produtos_array)
    for(el of mudacor){
        el.style.backgroundColor = "rgb(46, 108, 35)"
    }
    this.style.backgroundColor = "black"
    modalEstrutura()
    adicionar_carrinho()
}

function ordemprecoasc(){
    produtos_array.sort(function compare(a,b){
        if (a.preco.replace(/\D/gim, '')/100 < b.preco.replace(/\D/gim, '')/100){
            return -1;
        }
        if (a.preco.replace(/\D/gim, '')/100 > b.preco.replace(/\D/gim, '')/100){
            return 1;
        } 
        return 0;
    })
    escreve(produtos_array)
    for(el of mudacor){
        el.style.backgroundColor = "rgb(46, 108, 35)"
    }
    this.style.backgroundColor = "black"
    modalEstrutura()
    adicionar_carrinho()
}

function ordemnomeasc(){
    produtos_array.sort(function compare(a,b){
        if (a.nome < b.nome){
            return -1;
        }
        if (a.nome > b.nome){
            return 1;
        } 
        return 0;
    })
    escreve(produtos_array)
    for(el of mudacor){
        el.style.backgroundColor = "rgb(46, 108, 35)"
    }
    this.style.backgroundColor = "black"
    modalEstrutura()
    adicionar_carrinho()
}

function ordemnomedesc(){
    produtos_array.sort(function compare(a,b){
        if (a.nome < b.nome){
            return 1;
        }
        if (a.nome > b.nome){
            return -1;
        } 
        return 0;
    })
    escreve(produtos_array)
    for(el of mudacor){
        el.style.backgroundColor = "rgb(46, 108, 35)"
    }
    this.style.backgroundColor = "black"
    modalEstrutura()
    adicionar_carrinho()
}

adicionar_carrinho()
//adicionar carrinho
function adicionar_carrinho(){
    var botao = document.querySelectorAll(".verprod")
    for(el of botao){
        el.addEventListener("click", armazena)
    }
}

function armazena(){
    let pai = this.parentNode.parentNode
    const valores = {}
    valores.imagem = pai.children[0].src
    valores.nomeprod = pai.children[1].children[0].textContent
    valores.preco = pai.children[1].children[2].textContent
    valores.quantidade = 1
    let dadosAntigos = localStorage.getItem("dado")
	if (dadosAntigos) {
		dadosAntigos = JSON.parse(dadosAntigos)	
	} else {
  	    dadosAntigos = {
            carrinho: []
        }
	}
    index = 0
    for(let i = 0; i<dadosAntigos.carrinho.length;i++){
        if(valores.nomeprod == dadosAntigos.carrinho[i].nomeprod){
            dadosAntigos.carrinho[i].quantidade = dadosAntigos.carrinho[i].quantidade + 1
            index = 1
        }
    }
    if(index == 0){
        dadosAntigos.carrinho.push(valores)
    }
	localStorage.setItem("dado", JSON.stringify(dadosAntigos))



    let valor_carrinho = localStorage.getItem("carrinho_quantidade")
    if(valor_carrinho){
        valor_carrinho = JSON.parse(valor_carrinho)
    }
    else{
        valor_carrinho = 0
    }
    valor_carrinho = valor_carrinho + 1
    localStorage.setItem("carrinho_quantidade", JSON.stringify(valor_carrinho))

    let texto_valor_carrinho = document.getElementById("quantidade_carrinho")
    texto_valor_carrinho.textContent = valor_carrinho

    let mensagem = document.createElement("div")
    mensagem.setAttribute("id", "mensagemcarrinho")
    mensagem.textContent = "Produto adicionado ao carrinho"
    let antes = produtos_section.children[0]
    produtos_section.insertBefore(mensagem,antes)
    setTimeout(function(){
        mensagem.remove()
    },1500)
}  
//fim adicionar carrinho
modalEstrutura()
//modal
function modalEstrutura(){
    var nomeprod = document.querySelectorAll(".nomeprod")
    for(el of nomeprod){
        el.addEventListener("click", modal)
    }

    var imgprod = document.querySelectorAll(".imgprod")
    for(el of imgprod){
        el.addEventListener("click", modal_img)
    }

    var ocultarinf = document.querySelectorAll(".ocultar")
    for(el of ocultarinf){
        el.addEventListener("click", ocultarmodal)
    }
}


function modal(){
    let produto_modal = this.parentNode.parentNode
    produto_modal.setAttribute("class", "produto modal_ativo")
}

function modal_img(){
    let produto_modal = this.parentNode
    produto_modal.setAttribute("class", "produto modal_ativo")
}

function ocultarmodal(){
    let produto_modal = this.parentNode.parentNode
    produto_modal.setAttribute("class", "produto")
}
//fim modal
