var vazio = document.getElementById("vazio")

var produtos = localStorage.getItem("dado")
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


var cupom_utilizado = 0

var desconto = 1


if (produtos) {
    vazio.remove()
    produtos = JSON.parse(produtos)
    var container = document.getElementById("container_produtos")
    for (let i = 0; i < produtos.carrinho.length; i++) {
        let div = document.createElement("div")
        div.setAttribute("class", "novo_produto")
        container.appendChild(div)
        //criando div conteudo_produto
        let conteudo_produto = document.createElement("div")
        div.appendChild(conteudo_produto)
        conteudo_produto.setAttribute("class", "conteudo_produto")

        //criando div_img_produto
        let div_img_produto = document.createElement("div")
        div_img_produto.setAttribute("class", "img_produto")
        conteudo_produto.appendChild(div_img_produto)
        //criando img_produto
        let img_produto = document.createElement("img")
        img_produto.setAttribute("src", produtos.carrinho[i].imagem)
        div_img_produto.appendChild(img_produto)

        //criando div_nome_produto
        let div_nome_produto = document.createElement("div")
        div_nome_produto.setAttribute("class", "nome_produto")
        conteudo_produto.appendChild(div_nome_produto)
        //criando nome_produto
        let nome_produto = document.createElement("span")
        nome_produto.textContent = produtos.carrinho[i].nomeprod
        div_nome_produto.appendChild(nome_produto)

        //criando div_preco_produto
        let div_preco_produto = document.createElement("div")
        div_preco_produto.setAttribute("class", "preco_produto")
        conteudo_produto.appendChild(div_preco_produto)
        //criando preco_produto
        let preco_produto = document.createElement("span")
        let totalpreco = produtos.carrinho[i].preco.replace(/\D/gim, '')/100 * produtos.carrinho[i].quantidade
        preco_produto.innerHTML = `R$ ${totalpreco.toFixed(2)}`
        div_preco_produto.appendChild(preco_produto)

        //QUANTIDADE
        let quantidade = document.createElement("div")
        quantidade.setAttribute("class", "quantidade")
        div.appendChild(quantidade)

        let aumentar = document.createElement("img")
        aumentar.src = "img/aumentar.png"
        aumentar.setAttribute("class", "aumentar")
        quantidade.appendChild(aumentar)

        let quantidade_valor = document.createElement("span")
        quantidade_valor.textContent = produtos.carrinho[i].quantidade
        quantidade_valor.setAttribute("class", "quantidade_valor")
        quantidade.appendChild(quantidade_valor)

        let diminuir = document.createElement("img")
        diminuir.src = "img/diminuir.png"
        diminuir.setAttribute("class", "diminuir")
        quantidade.appendChild(diminuir)


        //icone lixeira
        let lixo = document.createElement("img")
        div.appendChild(lixo)
        lixo.setAttribute("class", "remover")
        lixo.src = "img/lixeira.png"

    }


    //quantidade de produto
    let aumentar_quantidade = document.querySelectorAll(".aumentar")
    for (el of aumentar_quantidade) {
        el.addEventListener("click", aumenta)
    }
    let diminuir_quantidade = document.querySelectorAll(".diminuir")
    for (el of diminuir_quantidade) {
        el.addEventListener("click", diminui)
    }


    //excluir um produto
    remover = document.querySelectorAll(".remover")
    for (el of remover) {
        el.addEventListener("click", apaga)
    }


    //finalização de pedido
    finalizacao()
    //cupom
    let confirmacao = document.createElement("span")
    confirmacao.setAttribute("id", "linha")
    let cupom = document.getElementById("cupom")
    cupom.appendChild(confirmacao)

    //limpar carrinho
    let limpar_carrinho = document.createElement("button")
    let container_botao = document.getElementById("container_produtos")
    container_botao.appendChild(limpar_carrinho)
    limpar_carrinho.textContent = "Limpar Carrinho"
    limpar_carrinho.setAttribute("id", "limpar_carrinho")
    limpar_carrinho.addEventListener("click", limpaCarrinho)
    limpar_carrinho.addEventListener("click", function () {
        location.reload()
    })
}

function limpaCarrinho() {
    localStorage.removeItem("dado")
    localStorage.removeItem("cupom")
    localStorage.removeItem("carrinho_quantidade")
}

function finalizacao() {
    let div_finalizacao = document.createElement("div")
    div_finalizacao.setAttribute("id", "finalizacao")
    var container = document.getElementById("container")
    container.appendChild(div_finalizacao)
    let finalizacao_container = document.getElementById("finalizacao")
    let resumo = document.createElement("div")
    resumo.setAttribute("id", "resumo")
    finalizacao_container.appendChild(resumo)

    calculaTotal()

    let cupom = document.createElement("div")
    cupom.setAttribute("id", "cupom")
    div_finalizacao.appendChild(cupom)
    cupom.innerHTML = `<label>Cupom de desconto</label><input id="codigo_cupom" type="text"><a id="aplicar_cupom">Aplicar Cupom</a>`

    let aplicar_cupom = document.getElementById("aplicar_cupom")
    aplicar_cupom.addEventListener("click", verificarCupom)

    let finalizar_botao = document.createElement("button")
    div_finalizacao.appendChild(finalizar_botao)
    finalizar_botao.setAttribute("id", "botao_compra")
    finalizar_botao.textContent = "Finalizar Compra"

    finalizar_botao.addEventListener("click", finalizar_compra)
}

var verifica_msgFalha = 0
var verifica_msgSucesso = 0

function finalizar_compra() {
    let verifica_login = JSON.parse(localStorage.getItem("clientes"))

    let container_main = document.querySelector("main")
    const div_mensagem = document.createElement("div")
    div_mensagem.setAttribute("id", "div_mensagem")
    let first_child = document.getElementById("container")
    container_main.insertBefore(div_mensagem, first_child)

    if (verifica_login) {
        let logado = 0
        for (let i = 0; i < verifica_login.length; i++) {
            if (verifica_login[i].login == true) {
                logado = 1
            }
        }
        if (logado == 1) {
            limpaCarrinho()
            if (verifica_msgSucesso == 0) {
                div_mensagem.style.color = "green"
                div_mensagem.textContent = "Seu pedido de compra foi gerado com sucesso!"
                setTimeout(function () {
                    div_mensagem.remove()
                    location.reload()
                }, 3000)
                verifica_msgSucesso = 1
            }
        }
        else {
            if (verifica_msgFalha == 0) {
                div_mensagem.style.color = "red"
                div_mensagem.textContent = "Faça login para finalizar sua compra!"
                setTimeout(function () {
                    div_mensagem.remove()
                }, 5000)
                verifica_msgFalha = 1
            }
        }
    }
    else {
        if (verifica_msgFalha == 0) {
            div_mensagem.style.color = "red"
            div_mensagem.textContent = "Faça login para finalizar sua compra!"
            setTimeout(function () {
                div_mensagem.remove()
            }, 5000)
            verifica_msgFalha = 1
        }
    }
}

function verificarCupom() {
    let codigo_cupom = document.getElementById("codigo_cupom")
    let confirmacao = document.getElementById("linha")
    if (codigo_cupom.value == "UTFPR" && cupom_utilizado == 0) {
        desconto = 0.15

        calculaTotal()

        confirmacao.textContent = "Cupom aplicado"
        confirmacao.style.color = "green"
        cupom_utilizado++
    }
    else if (codigo_cupom.value != "UTFPR") {
        confirmacao.textContent = "Cupom não encontrado"
        confirmacao.style.color = "red"
    }
}


function calculaTotal() {
    let resumo = document.getElementById("resumo")
    let total = 0
    produtos = JSON.parse(localStorage.getItem("dado"))
    for (let i = 0; i < produtos.carrinho.length; i++) {
        total = total + ((produtos.carrinho[i].preco.replace(/\D/gim, '') / 100) * produtos.carrinho[i].quantidade)
    }
    if (desconto != 1) {
        total = total * (1 - desconto)
    }

    resumo.innerHTML = `<span id="text_resumo">Resumo</span>
    <div class="total quantidade_total"><span>Quantidade:</span><strong>${valor_carrinho} itens</strong></div>
    <div class="total valor_total"><span>Total:</span><strong>R$${total.toFixed(2)}</strong>
    </div>`
}

function aumenta() {
    this.parentNode.children[1].textContent++
    for (let i = 0; i < produtos.carrinho.length; i++) {
        if (produtos.carrinho[i].nomeprod == this.parentNode.parentNode.children[0].children[1].textContent) {
            produtos.carrinho[i].quantidade = produtos.carrinho[i].quantidade + 1
            localStorage.setItem("dado", JSON.stringify(produtos))

            let preco_produto = this.parentNode.parentNode.children[0].children[2]
            let totalpreco = produtos.carrinho[i].preco.replace(/\D/gim, '')/100 * produtos.carrinho[i].quantidade
            preco_produto.innerHTML = `R$ ${totalpreco.toFixed(2)}`
        }
    }

    
    

    valor_carrinho = valor_carrinho + 1
    localStorage.setItem("carrinho_quantidade", JSON.stringify(valor_carrinho))

    let texto_valor_carrinho = document.getElementById("quantidade_carrinho")
    texto_valor_carrinho.textContent = valor_carrinho


    //console.log(this.parentNode.parentNode.children[0].children[2].children[0].textContent)
    calculaTotal()
}

function diminui() {
    if (this.parentNode.children[1].textContent != 1) {
        this.parentNode.children[1].textContent--
        
        for (let i = 0; i < produtos.carrinho.length; i++) {
            if (produtos.carrinho[i].nomeprod == this.parentNode.parentNode.children[0].children[1].textContent) {
                produtos.carrinho[i].quantidade = produtos.carrinho[i].quantidade - 1
                localStorage.setItem("dado", JSON.stringify(produtos))

                let preco_produto = this.parentNode.parentNode.children[0].children[2]
                let totalpreco = produtos.carrinho[i].preco.replace(/\D/gim, '')/100 * produtos.carrinho[i].quantidade
                preco_produto.innerHTML = `R$ ${totalpreco.toFixed(2)}`
            }
        }


        valor_carrinho = valor_carrinho - 1
        localStorage.setItem("carrinho_quantidade", JSON.stringify(valor_carrinho))

        let texto_valor_carrinho = document.getElementById("quantidade_carrinho")
        texto_valor_carrinho.textContent = valor_carrinho

        calculaTotal()
    }
}

function apaga(){
    let pai_produto_removido = this.parentNode
    pai_produto_removido.remove()

    valor_carrinho = valor_carrinho - this.parentNode.children[1].children[1].textContent
    localStorage.setItem("carrinho_quantidade", JSON.stringify(valor_carrinho))

    let texto_valor_carrinho = document.getElementById("quantidade_carrinho")
    if (valor_carrinho != 0) {
        texto_valor_carrinho.textContent = valor_carrinho
    }
    else {
        localStorage.removeItem("dado")
        localStorage.removeItem("carrinho_quantidade")

        location.reload()
    }
    for (let i = 0; i < produtos.carrinho.length; i++) {
        if (produtos.carrinho[i].nomeprod == this.parentNode.children[0].children[1].textContent) {
            produtos.carrinho.splice(i, 1)
            localStorage.setItem("dado", JSON.stringify(produtos))
        }
    }
    if(!valor_carrinho){
        localStorage.removeItem("dado")
    }
    calculaTotal()
}
